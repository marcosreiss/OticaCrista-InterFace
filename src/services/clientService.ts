import type { Client, ClientPayload, ClientList } from "../models/clientModel";
import api from "./api";


export const getClientsPagedService = async (skip: number, take: number): Promise<ClientList> => {
    const response = await api.get<ClientList>("/clients", { params: { skip, take } });
    return response.data;
};


export const createClientService = async (payload: ClientPayload): Promise<Client> => {
    const response = await api.post<Client>("/clients", payload);
    return response.data;
};


export const updateClientService = async (payload: Client, id: number): Promise<Client> => {
    const response = await api.put<Client>(`/clients?id=${id}`, payload);
    return response.data;
};


export const deleteClientService = async (id: number): Promise<void> => {
    await api.delete(`/clients?id=${id}`);
};


export const getClientByIdService = async (id: number): Promise<Client> => {
    const response = await api.get<Client>(`/client/search/by-id?id=${id}`);
    return response.data;
};
