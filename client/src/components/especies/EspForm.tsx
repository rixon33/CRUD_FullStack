import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { Especie } from "../../types/tipos";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { ConfirmDialog } from "../ConfirmDialog";
import { createEsp, updateEsp } from "../../api/esp.api";

type Props = {
    onClose: () => void;
    initialData?: Especie;
};

type EspecieFormData = Omit<Especie, "peligro_extincion"> & {
    peligro_extincion: string;
};

export const EspForm = ({ onClose, initialData }: Props) => {
    const queryClient = useQueryClient();
    const [showConfirm, setShowConfirm] = useState(false);
    const esEdicion = !!initialData;

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors, isSubmitting, isDirty },
    } = useForm<EspecieFormData>();

    // 🧠 Cargar valores por defecto cuando edites
    useEffect(() => {
        if (initialData) {
            reset({
                ...initialData,
                peligro_extincion: initialData.peligro_extincion
                    ? "true"
                    : "false",
            });
        }
    }, [initialData, reset]);

    const mutation = useMutation({
        mutationFn: async (data: Especie) => {
            if (initialData) {
                await updateEsp(initialData.id_especie, data);
            } else {
                await createEsp(data);
            }
        },
        onSuccess: () => {
            toast.success(
                initialData
                    ? "Especie actualizada correctamente"
                    : "Especie agregada correctamente"
            );
            queryClient.invalidateQueries({ queryKey: ["especies"] });
            reset();
            onClose();
        },
    });

    const onSubmit = handleSubmit((data: EspecieFormData) => {
        const formattedData: Especie = {
            ...data,
            peligro_extincion: data.peligro_extincion === "true",
        };
        mutation.mutate(formattedData);
    });

    const verifyValues = watch();
    const handleClose = () => {
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
                onSubmit={onSubmit}
                className="flex flex-col w-2/6 p-10 bg-[#fdfdfd] gap-5 mt-20 m-auto rounded-xl"
            >
                <h2 className="text-xl font-semibold">
                    {esEdicion ? "Editar Especie" : "Agregar una nueva Especie"}
                </h2>

                {/* Nombre vulgar */}
                <div className="flex flex-col ">
                    <label className="text-gray-800 font-semibold">
                        Nombre vulgar
                    </label>
                    <input
                        type="text"
                        {...register("nombre_vulgar", { required: true })}
                        placeholder="Ej: León"
                        className="border px-2 py-1 rounded border-gray-400"
                    />
                    {errors.nombre_vulgar && (
                        <span className="text-red-500 text-sm">
                            El nombre vulgar es obligatorio
                        </span>
                    )}
                </div>

                {/* Nombre científico */}
                <div className="flex flex-col ">
                    <label className="text-gray-800 font-semibold">
                        Nombre científico
                    </label>
                    <input
                        type="text"
                        {...register("nombre_cientifico", { required: true })}
                        placeholder="Ej: Panthera leo"
                        className="border px-2 py-1 rounded border-gray-400"
                    />
                    {errors.nombre_cientifico && (
                        <span className="text-red-500 text-sm">
                            El nombre científico es obligatorio
                        </span>
                    )}
                </div>

                {/* Familia */}
                <div className="flex flex-col ">
                    <label className="text-gray-800 font-semibold">
                        Familia
                    </label>
                    <input
                        type="text"
                        {...register("familia", { required: true })}
                        placeholder="Ej: Felidae"
                        className="border px-2 py-1 rounded border-gray-400"
                    />
                    {errors.familia && (
                        <span className="text-red-500 text-sm">
                            La familia es obligatoria
                        </span>
                    )}
                </div>

                {/* Peligro de extinción */}
                <div className="flex flex-col ">
                    <label className="text-gray-800 font-semibold">
                        Peligro de extinción
                    </label>
                    <select
                        {...register("peligro_extincion", { required: true })}
                        className="border px-2 py-1 rounded border-gray-400"
                    >
                        <option value="">-- Selecciona una opción --</option>
                        <option value="true">Sí</option>
                        <option value="false">No</option>
                    </select>
                    {errors.peligro_extincion && (
                        <span className="text-red-500 text-sm">
                            Debe indicar si está o no en peligro de extinción
                        </span>
                    )}
                </div>

                {/* Botones */}
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
