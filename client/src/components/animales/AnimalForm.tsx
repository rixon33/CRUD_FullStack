import { useForm } from "react-hook-form";
import type { Animal, AnimalFormData } from "../../types/tipos"; // Importar AnimalFormData
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createAnimal, updateAnimal } from "../../api/animal.api";
import { getZoos } from "../../api/zoo.api";
import { getEsp } from "../../api/esp.api";
import { ConfirmDialog } from "../ConfirmDialog";
import toast from "react-hot-toast";
import { useState } from "react";

type Props = {
    onClose: () => void;
    initialData?: Animal;
};

export const AnimalForm = ({ onClose, initialData }: Props) => {
    const queryClient = useQueryClient();
    const [showConfirm, setShowConfirm] = useState(false);
    const esEdicion = !!initialData;

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors, isDirty, isSubmitting },
    } = useForm<AnimalFormData>({
        // Cambiar a AnimalFormData
        defaultValues: initialData
            ? {
                  numero_identificacion: initialData.numero_identificacion,
                  sexo: initialData.sexo,
                  año_nacimiento: initialData.año_nacimiento,
                  pais_origen: initialData.pais_origen,
                  continente: initialData.continente,
                  id_zoo: initialData.id_zoo || 0, // Proporcionar valor por defecto
                  id_especie: initialData.id_especie || 0, // Proporcionar valor por defecto
              }
            : undefined,
    });

    const { data: zoologicos } = useQuery({
        queryKey: ["zoologicos"],
        queryFn: getZoos,
    });

    const { data: especies } = useQuery({
        queryKey: ["especies"],
        queryFn: getEsp,
    });

    const mutation = useMutation({
        mutationFn: async (data: AnimalFormData) => {
            // Cambiar a AnimalFormData
            if (esEdicion) {
                await updateAnimal(initialData!.id_animal, data);
            } else {
                await createAnimal(data);
            }
        },
        onSuccess: () => {
            toast.success(
                esEdicion
                    ? "Animal actualizado correctamente"
                    : "Animal agregado correctamente"
            );
            queryClient.invalidateQueries({ queryKey: ["animales"] });
            reset();
            onClose();
        },
    });

    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data);
    });

    const verifyValues = watch();

    const handleClose = () => {
        const formHasValues = Object.values(verifyValues).some(
            (val) => val !== undefined && val !== ""
        );
        if (isDirty && formHasValues) {
            setShowConfirm(true);
        } else {
            onClose();
        }
    };

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) handleClose();
    };

    return (
        <div
            className="text-black z-10 fixed min-h-screen bg-[#222]/80 w-full top-0 left-0 backdrop-blur-sm"
            onClick={handleBackdropClick}
        >
            <form
                onSubmit={onSubmit}
                className="flex flex-col w-2/6 p-10 bg-[#fdfdfd] gap-5 mt-20 m-auto rounded-xl"
            >
                <h2 className="text-xl font-semibold">
                    {esEdicion ? "Editar Animal" : "Agregar Animal"}
                </h2>

                <input
                    type="text"
                    {...register("numero_identificacion", { required: true })}
                    placeholder="Número de identificación"
                    className="border px-2 py-1 rounded border-gray-400"
                />
                {errors.numero_identificacion && (
                    <span className="text-red-500 text-sm">
                        Este campo es obligatorio
                    </span>
                )}

                <select
                    {...register("sexo", { required: true })}
                    className="border px-2 py-1 rounded border-gray-400"
                >
                    <option value="">-- Sexo --</option>
                    <option value="M">Macho</option>
                    <option value="F">Hembra</option>
                </select>
                {errors.sexo && (
                    <span className="text-red-500 text-sm">
                        Selecciona el sexo
                    </span>
                )}

                <input
                    type="number"
                    {...register("año_nacimiento", {
                        required: true,
                        min: 1900,
                    })}
                    placeholder="Año de nacimiento"
                    className="border px-2 py-1 rounded border-gray-400"
                />
                {errors.año_nacimiento && (
                    <span className="text-red-500 text-sm">
                        Debe ser un año válido
                    </span>
                )}

                <input
                    type="text"
                    {...register("pais_origen", { required: true })}
                    placeholder="País de origen"
                    className="border px-2 py-1 rounded border-gray-400"
                />
                {errors.pais_origen && (
                    <span className="text-red-500 text-sm">
                        Este campo es obligatorio
                    </span>
                )}

                <input
                    type="text"
                    {...register("continente", { required: true })}
                    placeholder="Continente"
                    className="border px-2 py-1 rounded border-gray-400"
                />
                {errors.continente && (
                    <span className="text-red-500 text-sm">
                        Este campo es obligatorio
                    </span>
                )}

                <select
                    {...register("id_zoo", { required: true })}
                    className="border px-2 py-1 rounded border-gray-400"
                >
                    <option value="">-- Zoológico --</option>
                    {zoologicos?.map((zoo) => (
                        <option key={zoo.id_zoo} value={zoo.id_zoo}>
                            {zoo.nombre}
                        </option>
                    ))}
                </select>
                {errors.id_zoo && (
                    <span className="text-red-500 text-sm">
                        Selecciona un zoológico
                    </span>
                )}

                <select
                    {...register("id_especie", { required: true })}
                    className="border px-2 py-1 rounded border-gray-400"
                >
                    <option value="">-- Especie --</option>
                    {especies?.map((esp) => (
                        <option key={esp.id_especie} value={esp.id_especie}>
                            {esp.nombre_vulgar}
                        </option>
                    ))}
                </select>
                {errors.id_especie && (
                    <span className="text-red-500 text-sm">
                        Selecciona una especie
                    </span>
                )}

                <div className="flex gap-4 flex-row-reverse">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-4 py-2 hover:cursor-pointer bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        {isSubmitting
                            ? "Guardando..."
                            : esEdicion
                            ? "Actualizar"
                            : "Agregar"}
                    </button>
                    <button
                        type="button"
                        className="px-4 py-2 border border-gray-400 text-black rounded hover:bg-[#111]/10"
                        onClick={handleClose}
                    >
                        Cancelar
                    </button>
                </div>
            </form>

            {showConfirm && (
                <ConfirmDialog
                    message="¿Seguro que deseas cancelar? Se perderán los datos ingresados."
                    onConfirm={onClose}
                    onCancel={() => setShowConfirm(false)}
                />
            )}
        </div>
    );
};
