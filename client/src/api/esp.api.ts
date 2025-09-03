import type { Especie } from "../types/tipos";
import axios from "axios";

// Obtenemos todos los Especie
export const getEsp = async (): Promise<Especie[]> => {
    // 2s de delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    const response = await axios.get<Especie[]>('http://localhost:4000/api/especies')
    return response.data
};

// Eliminamos un Especie
export const deleteEsp = async (id: number) =>{
    await axios.delete(`http://localhost:4000/api/especies/${id}`);
}

// Actualizar un Especie
export const updateEsp = async (id: number, data: Especie) => {
    await axios.put(`http://localhost:4000/api/especies/${id}`, data);
};

// POST para crear una nueva especie
export const createEsp = async (data: Especie) => {
    await axios.post("http://localhost:4000/api/especies", data);
};