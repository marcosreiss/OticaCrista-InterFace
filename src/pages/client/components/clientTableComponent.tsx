import React, { useState } from "react";
import {
  Menu,
  Table,
  TableRow,
  Checkbox,
  MenuItem,
  TableHead,
  TableCell,
  TableBody,
  IconButton,
  LinearProgress,
} from "@mui/material";
import ConfirmationDialog from "../../../components/confirmationDialog";
import { useNotification } from "../../../context/NotificationContext";
import { useDeleteClient } from "../../../hooks/useClient";
import { Client } from "../../../models/clientModel";
import { useRouter } from "../../../routes/hooks";

interface TableComponentProps {
  clients: Client[];
  isLoading: boolean;
  selectedClients: Client[]; // ✅ Adicionado aqui
  setSelectedClients: React.Dispatch<React.SetStateAction<Client[]>>;
}


const ClientTableComponent: React.FC<TableComponentProps> = ({
  clients,
  isLoading,
  setSelectedClients,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedClientIds, setSelectedClientIds] = useState<number[]>([]);

  const navigate = useRouter();
  const deleteClient = useDeleteClient();
  const notification = useNotification();

  const handleClick = (event: React.MouseEvent<HTMLElement>, clientId: number) => {
    setAnchorEl(event.currentTarget);
    setSelectedItem(clientId);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedItem(null);
  };

  const handleDetailsClick = (clientId: number) => {
    navigate.push(`details/${clientId}`);
    handleClose();
  };

  const handleEditClick = (clientId: number) => {
    navigate.push(`edit/${clientId}`);
    handleClose();
  };

  const handleDeleteClient = (clientId: number) => {
    handleClose();
    deleteClient.mutate(clientId, {
      onSuccess: () => {
        notification.addNotification("Cliente deletado com sucesso", "success");
        setDeleteModalOpen(false);
      },
      onError: () => {
        notification.addNotification("Erro ao deletar cliente, tente novamente mais tarde", "error");
      },
    });
  };

  const handleDeleteClick = (clientId: number) => {
    setDeleteModalOpen(true);
    setSelectedItem(clientId);
  };

  /**
   * Selecionar ou desmarcar todos os clientes da tabela
   */
  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const allIds = clients.map((c) => c.id);
      setSelectedClientIds(allIds);
      setSelectedClients(clients);
    } else {
      setSelectedClientIds([]);
      setSelectedClients([]);
    }
  };

  /**
   * Selecionar ou desmarcar um único cliente
   */
  const handleSelectClient = (event: React.ChangeEvent<HTMLInputElement>, client: Client) => {
    if (event.target.checked) {
      setSelectedClientIds((prev) => [...prev, client.id]);
      setSelectedClients((prev) => [...prev, client]);
    } else {
      setSelectedClientIds((prev) => prev.filter((id) => id !== client.id));
      setSelectedClients((prev) => prev.filter((c) => c.id !== client.id));
    }
  };
  
  return (
    <>
      <Table stickyHeader aria-label="clients table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: "5%", minWidth: "50px" }}>
              <Checkbox
                checked={clients.length > 0 && selectedClientIds.length === clients.length}
                indeterminate={selectedClientIds.length > 0 && selectedClientIds.length < clients.length}
                onChange={handleSelectAll}
              />
            </TableCell>
            <TableCell sx={{ width: "40%", minWidth: "150px" }}>Nome</TableCell>
            <TableCell sx={{ width: "30%", minWidth: "150px" }}>CPF</TableCell>
            <TableCell sx={{ width: "20%", minWidth: "150px" }}>Contato</TableCell>
            <TableCell sx={{ width: "5%" }} />
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={5} sx={{ padding: 0 }}>
                <LinearProgress sx={{ width: "100%" }} />
              </TableCell>
            </TableRow>
          ) : clients.length > 0 ? (
            clients.map((client) => (
              <TableRow key={client.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedClientIds.includes(client.id)}
                    onChange={(e) => handleSelectClient(e, client)}
                  />
                </TableCell>
                <TableCell>{client.name || "-"}</TableCell>
                <TableCell>{client.cpf || "-"}</TableCell>
                <TableCell>{client.phoneNumber1 || "-"}</TableCell>
                <TableCell>
                  <IconButton onClick={(event) => handleClick(event, client.id)}>︙</IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl && selectedItem === client.id)}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                  >
                    <MenuItem onClick={() => handleDetailsClick(client.id)}>Detalhes</MenuItem>
                    <MenuItem onClick={() => handleEditClick(client.id)}>Editar</MenuItem>
                    <MenuItem onClick={() => handleDeleteClick(client.id)}>Deletar</MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} align="center">
                <div style={{ textAlign: "center", padding: "20px" }}>
                  <img
                    src="/assets/icons/ic-content.svg"
                    alt="Sem dados"
                    style={{ maxWidth: "150px", marginBottom: "10px" }}
                  />
                  <p>Nenhum Cliente Cadastrado</p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <ConfirmationDialog
        open={deleteModalOpen}
        confirmButtonText="Deletar"
        description="Tem certeza que deseja deletar este cliente?"
        onClose={() => {
          setDeleteModalOpen(false);
          handleClose();
        }}
        onConfirm={() => selectedItem && handleDeleteClient(selectedItem)}
        title="Deletar Cliente"
      />
    </>
  );
};

export default ClientTableComponent;
