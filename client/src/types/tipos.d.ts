export interface Zoologico {
    id_zoo: number;
    nombre: string;
    ciudad: string;
    pais: string;
    t_m2: number;
    presupuesto_anual: number;
}

export interface Especie {
    id_especie: number;
    nombre_vulgar: string;
    nombre_cientifico: string;
    familia: string;
    peligro_extincion: boolean;
}

export interface Animal {
    id_animal: number;
    numero_identificacion: string;
    sexo: string;
    año_nacimiento: number;
    pais_origen: string;
    continente: string;
    id_zoo?: number;
    id_especie?: number;
    // ✅ Cambiar estos para que coincidan con el backend:
    zoologico?: string;      // era "nombre_zoologico"
    especie?: string;        // era "especie" (está bien)
    // nombre_cientifico?: string; // ❌ Eliminar esta línea
}

export type AnimalFormData = {
    numero_identificacion: string;
    sexo: string;
    año_nacimiento: number;
    pais_origen: string;
    continente: string;
    id_zoo: number;
    id_especie: number;
};
