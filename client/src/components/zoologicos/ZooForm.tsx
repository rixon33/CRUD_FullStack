import { useForm } from "react-hook-form";
import type { Zoologico } from "../../types/tipos";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useState } from "react";
import { ConfirmDialog } from "../ConfirmDialog";
import { createZoo, updateZoo } from "../../api/zoo.api";

type Props = {
    onClose: () => void;
    initialData?: Zoologico; // ← Nuevo
};

export const ZooForm = ({ onClose, initialData }: Props) => {
    const queryClient = useQueryClient();
    const [showConfirm, setShowConfirm] = useState(false);
    const esEdicion = !!initialData;
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors, isSubmitting, isDirty },
    } = useForm<Zoologico>({
        defaultValues: initialData,
    });

    const mutation = useMutation({
        mutationFn: async (data: Zoologico) => {
            // Si tenemos datos iniciales, usamos el metodo put.
            if (initialData) {
                // Llamamos al PUT
                await updateZoo(initialData.id_zoo, data);
            } else {
                // Llamamos al POST
                await createZoo(data);
            }
        },
        onSuccess: () => {
            toast.success(
                initialData
                    ? "Zoológico actualizado correctamente"
                    : "Zoológico agregado correctamente"
            );
            queryClient.invalidateQueries({ queryKey: ["zoologicos"] });
            reset();
            onClose();
        },
    });

    const onSubmit = (data: Zoologico) => {
        mutation.mutate(data);
    };

    //Leemos los datos actuales del formulario
    const verifyValues = watch();

    const handleClose = () => {
        // Con Object.values Convertimos los datos del Form en un Array
        // Para luego con some, leer en cada uno.
        const formHasValues = Object.values(verifyValues).some(
            (val) => val != undefined && val !== ""
        );

        if (isDirty && formHasValues) {
            setShowConfirm(true);
        } else {
            onClose();
        }
    };

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            handleClose();
        }
    };

    return (
        <div
            className="text-black z-10 fixed min-h-screen bg-[#222]/80 w-full top-0 left-0 backdrop-blur-sm"
            onClick={handleBackdropClick}
        >
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col w-2/6 p-10 bg-[#fdfdfd] gap-5 mt-20 m-auto rounded-xl"
            >
                <h2 className="text-xl font-semibold">
                    {esEdicion
                        ? "Editar Zoológico"
                        : "Agregar un nuevo Zoológico"}
                </h2>
                <div className="flex flex-col ">
                    <label
                        htmlFor="nombre"
                        className="text-gray-800 font-semibold"
                    >
                        Nombre
                    </label>
                    <input
                        id="nombre"
                        type="text"
                        {...register("nombre", { required: true })}
                        placeholder="Ej: Zoologico Nacional"
                        className="border px-2 py-1 rounded border-gray-400"
                    />
                    {errors.nombre && (
                        <span className="text-red-500 text-sm">
                            El nombre es obligatorio
                        </span>
                    )}
                </div>
                <div className="flex flex-col ">
                    <label
                        htmlFor="ciudad"
                        className="text-gray-800 font-semibold"
                    >
                        Ciudad
                    </label>
                    <input
                        type="text"
                        id="ciudad"
                        {...register("ciudad", { required: true })}
                        placeholder="Ej: Buenos Aires"
                        className="border px-2 py-1 rounded border-gray-400"
                    />
                    {errors.ciudad && (
                        <span className="text-red-500 text-sm">
                            La ciudad es obligatoria
                        </span>
                    )}
                </div>
                <div className="flex flex-col ">
                    <label
                        htmlFor="pais"
                        className="text-gray-800 font-semibold"
                    >
                        Pais
                    </label>
                    <input
                        type="text"
                        id="pais"
                        {...register("pais", { required: true })}
                        placeholder="Ej: Argentina"
                        className="border px-2 py-1 rounded border-gray-400"
                    />
                    {errors.pais && (
                        <span className="text-red-500 text-sm">
                            El pais es obligatorio
                        </span>
                    )}
                </div>
                <div className="flex flex-col ">
                    <label
                        htmlFor="superficie"
                        className="text-gray-800 font-semibold"
                    >
                        Superficie
                    </label>
                    <input
                        id="superficie"
                        type="number"
                        {...register("t_m2", { required: true, min: 1 })}
                        placeholder="Ej: 180000"
                        className="border px-2 py-1 rounded border-gray-400"
                    />
                    {errors.t_m2 && (
                        <span className="text-red-500 text-sm">
                            La superficie es obligatoria y debe ser un numero
                            positivo
                        </span>
                    )}
                </div>
                <div className="flex flex-col ">
                    <label
                        htmlFor="presupuesto_anual"
                        className="text-gray-800 font-semibold"
                    >
                        Presupuesto Anual
                    </label>
                    <input
                        id="presupuesto_anual"
                        type="number"
                        {...register("presupuesto_anual", {
                            required: true,
                            min: 1,
                        })}
                        placeholder="Ej: 5200000"
                        className="border px-2 py-1 rounded border-gray-400"
                    />
                    {errors.presupuesto_anual && (
                        <span className="text-red-500 text-sm">
                            El presupuesto anual es obligatorio y debe ser un
                            numero positivo
                        </span>
                    )}
                </div>
                <div className="flex gap-4 flex-row-reverse">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-4 py-2 hover:cursor-pointer bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        {isSubmitting
                            ? "Guardando..."
                            : initialData
                            ? "Actualizar"
                            : "Agregar"}
                    </button>
                    <button
                        type="button"
                        className="px-4 py-2 border hover:cursor-pointer border-gray-400 text-black rounded hover:bg-[#111]/10"
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
