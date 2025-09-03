import type { Especie } from "../types/tipos";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getEsp = async (): Promise<Especie[]> => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    const response = await axios.get<Especie[]>(`${API_URL}/especies`);
    return response.data;
};

export const deleteEsp = async (id: number) => {
    await axios.delete(`${API_URL}/especies/${id}`);
};

export const updateEsp = async (id: number, data: Especie) => {
    await axios.put(`${API_URL}/especies/${id}`, data);
};

export const createEsp = async (data: Especie) => {
    await axios.post(`${API_URL}/especies`, data);
};
