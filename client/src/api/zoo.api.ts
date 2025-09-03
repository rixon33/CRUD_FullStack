import type { Zoologico } from "../types/tipos";
import axios from "axios";

// Obtenemos todos los zoologicos
export const getZoos = async (): Promise<Zoologico[]> => {
    // 2s de delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    const response = await axios.get<Zoologico[]>('http://localhost:4000/api/zoos')
    return response.data
};

// Eliminamos un zoologico
export const deleteZoo = async (id: number) =>{
    await axios.delete(`http://localhost:4000/api/zoos/${id}`);
}

// Actualizar un zoologico
export const updateZoo = async (id: number, data: Zoologico) => {
    await axios.put(`http://localhost:4000/api/zoos/${id}`, data);
};

// POST para crear nuevo zoológico
export const createZoo = async (data: Zoologico) => {
    await axios.post("http://localhost:4000/api/zoos", data);
};