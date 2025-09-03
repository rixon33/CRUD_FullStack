import type { Zoologico } from "../types/tipos";
import axios from "axios";

const API_URL = 'https://crudfullstack-production.up.railway.app/api';

export const getZoos = async (): Promise<Zoologico[]> => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const response = await axios.get<Zoologico[]>(`${API_URL}/zoos`);
    return response.data;
};

export const deleteZoo = async (id: number) => {
    await axios.delete(`${API_URL}/zoos/${id}`);
};

export const updateZoo = async (id: number, data: Zoologico) => {
    await axios.put(`${API_URL}/zoos/${id}`, data);
};

export const createZoo = async (data: Zoologico) => {
    await axios.post(`${API_URL}/zoos`, data);
};
