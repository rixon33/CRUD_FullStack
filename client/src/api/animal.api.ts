import type { Animal, AnimalFormData } from "../types/tipos";
import axios from "axios";

// Obtener todos los animales con JOIN (especies y zoológicos)
export const getAnimales = async (): Promise<Animal[]> => {
    // 2s de delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const response = await axios.get<Animal[]>(
        "http://localhost:4000/api/animales"
    );
    return response.data;
};

// Eliminar un animal por su ID
export const deleteAnimal = async (id: number) => {
    await axios.delete(`http://localhost:4000/api/animales/${id}`);
};

// Actualizar un animal por ID (solo se envían los campos editables)
export const updateAnimal = async (id: number, data: AnimalFormData) => {
    await axios.put(`http://localhost:4000/api/animales/${id}`, data);
};

// Crear un nuevo animal
export const createAnimal = async (data: AnimalFormData) => {
    await axios.post("http://localhost:4000/api/animales", data);
};
