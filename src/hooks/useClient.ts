import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Client, ClientPayload, ClientList } from '../models/clientModel';
import { ApiError } from '../models/apiError';

import {
  getClientsPagedService,
  createClientService,
  updateClientService,
  deleteClientService,
  getClientByIdService
} from '../services/clientService';

/**
 * Hook para obter uma lista paginada de clientes.
 */
export const useGetClientsPaged = (skip: number, take: number) =>
  useQuery<ClientList, ApiError>({
    queryKey: ['clients-list', { skip, take }],
    queryFn: () => getClientsPagedService(skip, take),
  });

/**
 * Hook para criar um novo cliente.
 */
export const useCreateClient = () => {
  const queryClient = useQueryClient();

  return useMutation<Client, ApiError, ClientPayload>({
    mutationFn: (payload) => createClientService(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['clients-list'],
      });
    },
  });
};

/**
 * Hook para atualizar um cliente existente.
 */
export const useUpdateClient = () => {
  const queryClient = useQueryClient();

  return useMutation<Client, ApiError, { id: number; data: Client }>({
    mutationFn: ({ id, data }) => updateClientService(data, id),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['clients-list'] });
      queryClient.invalidateQueries({ queryKey: ['client', variables.id] });
    },
  });
};

/**
 * Hook para deletar um cliente.
 */
export const useDeleteClient = () => {
  const queryClient = useQueryClient();

  return useMutation<void, ApiError, number>({
    mutationFn: (id) => deleteClientService(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['clients-list'],
      });
    },
  });
};

/**
 * Hook para obter os detalhes de um cliente pelo ID.
 */
export const useGetClientById = (id: number) =>
  useQuery<Client, ApiError>({
    queryKey: ['client', id],
    queryFn: () => getClientByIdService(id),
  });
