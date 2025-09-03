import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getEsp } from "../api/esp.api";
import type { Especie } from "../types/tipos";
import { SkeletonRow } from "../components/SkeletonRow";
import { useState } from "react";
import { deleteEsp } from "../api/esp.api";
import toast from "react-hot-toast";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { EspForm } from "../components/especies/EspForm";
export const Especies = () => {
    const [especieAEliminar, setEspecieAEliminar] = useState<Especie | null>(
        null
    );
    const [showForm, setShowForm] = useState(false);
    const [especieSeleccionada, setEspecieSeleccionado] =
        useState<Especie | null>(null);
    const { data: especies = [], isLoading } = useQuery<Especie[]>({
        queryKey: ["especies"],
        queryFn: getEsp,
    });

    const queryClient = useQueryClient();

    const mutationEliminar = useMutation({
        mutationFn: deleteEsp,
        onSuccess: () => {
            toast.success("Especie eliminado correctamente");
            queryClient.invalidateQueries({ queryKey: ["especies"] });
        },
    });

    return (
        <div className="py-26 px-40">
            <div className="bg-[#ffffff] overflow-x-auto shadow-md rounded-md flex flex-col gap-4 pb-10 px-10">
                <div className="flex  items-center justify-between pt-7">
                    <h2 className="text-xl font-semibold  text-gray-600">
                        Especies
                    </h2>

                    <button
                        className="w-fit font-semibold p-1.5 px-3 cursor-pointer hover:bg-[#0b9b1c]/90 bg-[#0b9b1c] rounded-md text-white"
                        onClick={() => setShowForm(!showForm)}
                    >
                        {showForm ? "Cerrar formulario" : " + Agregar Nuevo"}
                    </button>
                    {showForm && (
                        <EspForm
                            initialData={especieSeleccionada ?? undefined}
                            onClose={() => {
                                setShowForm(false);
                                setEspecieSeleccionado(null);
                            }}
                        />
                    )}
                </div>
                <table className="min-w-full text-sm text-left text-gray-800 ">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="px-6 py-3">ID</th>
                            <th className="px-6 py-3">Nombre vulgar</th>
                            <th className="px-6 py-3">Nombre cientifico</th>
                            <th className="px-6 py-3">Familia</th>
                            <th className="px-6 py-3">Peligro de extincion</th>
                            <th className="px-6 py-3">Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {isLoading
                            ? Array.from({ length: 6 }).map((_, i) => (
                                  <SkeletonRow rowQuantity={4} key={i} />
                              ))
                            : especies?.map((especie) => (
                                  <tr
                                      key={especie.id_especie}
                                      className="bg-white border-b-gray-200 border-b hover:bg-gray-50"
                                  >
                                      <td className="px-6 py-4">
                                          {especie.id_especie}
                                      </td>
                                      <td className="px-6 py-4">
                                          {especie.nombre_vulgar}
                                      </td>
                                      <td className="px-6 py-4">
                                          {especie.nombre_cientifico}
                                      </td>
                                      <td className="px-6 py-4">
                                          {especie.familia}
                                      </td>
                                      <td className="px-6 py-4">
                                          {/* Debug: {JSON.stringify(especie.peligro_extincion)} */}
                                          {especie.peligro_extincion
                                              ? "Se encuentra en peligro"
                                              : "No esta en peligro"}
                                      </td>
                                      <td className="px-6 py-4 flex gap-2 font-semibold">
                                          <button
                                              className="px-3 py-1.5 hover:cursor-pointer hover:bg-[#471fa3d6] bg-[#471fa3] text-white rounded"
                                              onClick={() => {
                                                  setEspecieSeleccionado(
                                                      especie
                                                  );
                                                  setShowForm(true); // ← importante
                                              }}
                                          >
                                              Editar
                                          </button>
                                          <button
                                              className="px-3 py-1 hover:cursor-pointer hover:bg-[#d51515e4] bg-[#d51515] text-white rounded"
                                              onClick={() =>
                                                  setEspecieAEliminar(especie)
                                              }
                                          >
                                              Eliminar
                                          </button>
                                      </td>
                                  </tr>
                              ))}
                    </tbody>
                </table>
                {especieAEliminar && (
                    <ConfirmDialog
                        message={`¿Estás seguro de eliminar la especie "${especieAEliminar.nombre_vulgar}"?`}
                        onConfirm={() => {
                            mutationEliminar.mutate(
                                especieAEliminar.id_especie,
                                {
                                    onError: (error: any) => {
                                        if (error.response?.data?.error) {
                                            toast.error(
                                                error.response.data.error
                                            );
                                        } else {
                                            toast.error(
                                                "Error al eliminar la especie"
                                            );
                                        }
                                    },
                                }
                            );
                            setEspecieAEliminar(null);
                        }}
                        onCancel={() => setEspecieAEliminar(null)}
                    />
                )}
            </div>
        </div>
    );
};
