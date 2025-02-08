import { useState } from 'react';

import { Paper, Box, Grid, Alert, TableContainer } from '@mui/material';
import { useGetClientsPaged, useDeleteClient } from '../../hooks/useClient';



import type { Client } from '../../models/clientModel';
import { useNotification } from '../../context/NotificationContext';
import ClientTableComponent from './components/clientTableComponent';
import TableFooterComponent from '../../components/table/tableFooterComponent';
import TableHeaderComponent from '../../components/table/tableHeaderComponent';
import TableSearch from '../../components/table/tableSearchComponent';



export default function ClientsIndex() {

    const rowsPerPage = 25;
    const [page, setPage] = useState(0);
    const [selectedClients, setSelectedClients] = useState<Client[]>([]);

    const notification = useNotification();
    const deleteClient = useDeleteClient();

    // Hook para obter lista paginada de clientes
    const { data: clientsData, isLoading, isError, error } = useGetClientsPaged(page * rowsPerPage, rowsPerPage);

    // Lista de clientes e total de itens para paginação
    const clients = clientsData?.data ?? [];
    const totalItems = clientsData?.data?.length ?? 0;


    const handleDeleteClients = () => {
        selectedClients.forEach((client) => {
            deleteClient.mutate(client.id, {
                onSuccess: () => {
                    notification.addNotification('Cliente deletado com sucesso', 'success');
                    setSelectedClients([]);
                },
                onError: () => {
                    notification.addNotification('Erro ao deletar cliente, tente novamente mais tarde', 'error');
                },
            });
        });
    };

    return (
        <>
            <Grid container>

                {/* Cabeçalho com título e botão de adicionar */}
                <TableHeaderComponent
                    title="Clientes"
                    addButtonName="Cadastrar Cliente"
                    addButtonPath="/client/create"
                />
                <TableSearch
                handleDelete={handleDeleteClients}
                isSearchDisabled
                selectedRows={selectedClients}
                />

                <Grid item xs={12}>
                    {/* Tabela de Clientes */}
                    <TableContainer component={Paper} sx={{ height: '65vh', display: 'flex', flexDirection: 'column' }}>
                        <Box component="div" sx={{ flex: 1, overflow: 'auto' }}>
                            <ClientTableComponent
                                clients={clients}
                                isLoading={isLoading}
                                selectedClients={selectedClients}
                                setSelectedClients={setSelectedClients}
                            />
                        </Box>

                        {/* Rodapé com paginação */}
                        <TableFooterComponent
                            setPage={setPage}
                            page={page}
                            rowsPerPage={rowsPerPage}
                            totalItems={totalItems}
                        />
                    </TableContainer>
                </Grid>
            </Grid>

            {/* Mensagem de erro */}
            {isError && (
                <Box sx={{ mt: 2 }}>
                    <Alert severity="error">{error instanceof Error ? error.message : 'Erro ao carregar clientes.'}</Alert>
                </Box>
            )}
        </>
    );
}
