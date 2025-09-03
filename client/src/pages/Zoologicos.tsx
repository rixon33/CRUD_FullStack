import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getZoos } from "../api/zoo.api";
import type { Zoologico } from "../types/tipos";
import { SkeletonRow } from "../components/SkeletonRow";
import { useState } from "react";
import { ZooForm } from "../components/zoologicos/ZooForm";
import { deleteZoo } from "../api/zoo.api";
import toast from "react-hot-toast";
import { ConfirmDialog } from "../components/ConfirmDialog";
export const Zoologicos = () => {
    const [zooAEliminar, setZooAEliminar] = useState<Zoologico | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [zooSeleccionado, setZooSeleccionado] = useState<Zoologico | null>(
        null
    );
    const { data: zoos = [], isLoading } = useQuery<Zoologico[]>({
        queryKey: ["zoologicos"],
        queryFn: getZoos,
    });

    const queryClient = useQueryClient();

    const mutationEliminar = useMutation({
        mutationFn: deleteZoo,
        onSuccess: () => {
            toast.success("Zoológico eliminado correctamente");
            queryClient.invalidateQueries({ queryKey: ["zoologicos"] });
        },
    });

    return (
        <div className="py-26 px-40">
            <div className="bg-[#ffffff] overflow-x-auto shadow-md rounded-md flex flex-col gap-4 pb-10 px-10">
                <div className="flex  items-center justify-between pt-7">
                    <h2 className="text-xl font-semibold  text-gray-600">
                        Zoológicos
                    </h2>

                    <button
                        className="w-fit font-semibold p-1.5 px-3 cursor-pointer hover:bg-[#0b9b1c]/90 bg-[#0b9b1c] rounded-md text-white"
                        onClick={() => setShowForm(!showForm)}
                    >
                        {showForm ? "Cerrar formulario" : " + Agregar Nuevo"}
                    </button>
                    {showForm && (
                        <ZooForm
                            initialData={zooSeleccionado ?? undefined}
                            onClose={() => {
                                setShowForm(false);
                                setZooSeleccionado(null);
                            }}
                        />
                    )}
                </div>
                <table className="min-w-full text-sm text-left text-gray-800 ">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="px-6 py-3">ID</th>
                            <th className="px-6 py-3">Nombre</th>
                            <th className="px-6 py-3">Ciudad</th>
                            <th className="px-6 py-3">País</th>
                            <th className="px-6 py-3">Superficie (m²)</th>
                            <th className="px-6 py-3">Presupuesto</th>
                            <th className="px-6 py-3">Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {isLoading
                            ? Array.from({ length: 6 }).map((_, i) => (
                                  <SkeletonRow rowQuantity={5} key={i} />
                              ))
                            : zoos?.map((zoo) => (
                                  <tr
                                      key={zoo.id_zoo}
                                      className="bg-white border-b-gray-200 border-b hover:bg-gray-50"
                                  >
                                      <td className="px-6 py-4">
                                          {zoo.id_zoo}
                                      </td>
                                      <td className="px-6 py-4">
                                          {zoo.nombre}
                                      </td>
                                      <td className="px-6 py-4">
                                          {zoo.ciudad}
                                      </td>
                                      <td className="px-6 py-4">{zoo.pais}</td>
                                      <td className="px-6 py-4">{zoo.t_m2}</td>
                                      <td className="px-6 py-4">
                                          {zoo.presupuesto_anual}
                                      </td>
                                      <td className="px-6 py-4 flex gap-2 font-semibold">
                                          <button
                                              className="px-3 py-1.5 hover:cursor-pointer hover:bg-[#471fa3d6] bg-[#471fa3] text-white rounded"
                                              onClick={() => {
                                                  setZooSeleccionado(zoo);
                                                  setShowForm(true); // ← importante
                                              }}
                                          >
                                              Editar
                                          </button>
                                          <button
                                              className="px-3 py-1 hover:cursor-pointer hover:bg-[#d51515e4] bg-[#d51515] text-white rounded"
                                              onClick={() =>
                                                  setZooAEliminar(zoo)
                                              }
                                          >
                                              Eliminar
                                          </button>
                                      </td>
                                  </tr>
                              ))}
                    </tbody>
                </table>
                {zooAEliminar && (
                    <ConfirmDialog
                        message={`¿Estás seguro de eliminar el zoológico "${zooAEliminar.nombre}"?`}
                        onConfirm={() => {
                            mutationEliminar.mutate(zooAEliminar.id_zoo, {
                                onError: (error: any) => {
                                    if (error.response?.data?.error) {
                                        toast.error(error.response.data.error);
                                    } else {
                                        toast.error(
                                            "Error al eliminar el zoológico"
                                        );
                                    }
                                },  
                            });
                            setZooAEliminar(null);
                        }}
                        onCancel={() => setZooAEliminar(null)}
                    />
                )}
            </div>
        </div>
    );
};
