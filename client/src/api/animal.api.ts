import type { Animal, AnimalFormData } from "../types/tipos";
import axios from "axios";
const API_URL = 'https://crudfullstack-production.up.railway.app/api';

export const getAnimales = async (): Promise<Animal[]> => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const response = await axios.get<Animal[]>(`${API_URL}/animales`);
    return response.data;
};

export const deleteAnimal = async (id: number) => {
    await axios.delete(`${API_URL}/animales/${id}`);
};

export const updateAnimal = async (id: number, data: AnimalFormData) => {
    await axios.put(`${API_URL}/animales/${id}`, data);
};

export const createAnimal = async (data: AnimalFormData) => {
    await axios.post(`${API_URL}/animales`, data);
};