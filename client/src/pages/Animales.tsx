import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAnimales, deleteAnimal } from "../api/animal.api";
import type { Animal } from "../types/tipos";
import { SkeletonRow } from "../components/SkeletonRow";
import { useState } from "react";
import { AnimalForm } from "../components/animales/AnimalForm";
import { ConfirmDialog } from "../components/ConfirmDialog";
import toast from "react-hot-toast";
import { AnimalesChart } from "../components/charts/AnimalesChar";

export const Animales = () => {
    const [animalAEliminar, setAnimalAEliminar] = useState<Animal | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [animalSeleccionado, setAnimalSeleccionado] = useState<Animal | null>(
        null
    );

    const queryClient = useQueryClient();

    const { data: animales = [], isLoading } = useQuery<Animal[]>({
        queryKey: ["animales"],
        queryFn: getAnimales,
    });

    const mutationEliminar = useMutation({
        mutationFn: deleteAnimal,
        onSuccess: () => {
            toast.success("Animal eliminado correctamente");
            queryClient.invalidateQueries({ queryKey: ["animales"] });
        },
    });

    return (
        <div className="py-20 px-20 2xl:py-26 2xl:px-40">
            <div className="bg-white overflow-x-auto shadow-md rounded-md flex flex-col gap-4 pb-10 px-10">
                <div className="flex items-center justify-between pt-7">
                    <h2 className="text-xl font-semibold text-gray-600">
                        Animales
                    </h2>
                    <button
                        className="w-fit font-semibold p-1.5 px-3 cursor-pointer hover:bg-green-700 bg-green-600 rounded-md text-white"
                        onClick={() => setShowForm(!showForm)}
                    >
                        {showForm ? "Cerrar formulario" : "+ Agregar Nuevo"}
                    </button>
                </div>

                {showForm && (
                    <AnimalForm
                        initialData={animalSeleccionado ?? undefined}
                        onClose={() => {
                            setShowForm(false);
                            setAnimalSeleccionado(null);
                        }}
                    />
                )}

                <table className="min-w-full text-sm text-left text-gray-800">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="px-6 py-3">ID</th>
                            <th className="px-6 py-3">Identificación</th>
                            <th className="px-6 py-3">Sexo</th>
                            <th className="px-6 py-3">Año Nacimiento</th>
                            <th className="px-6 py-3">País Origen</th>
                            <th className="px-6 py-3">Continente</th>
                            <th className="px-6 py-3">Zoológico</th>
                            <th className="px-6 py-3">Especie</th>
                            <th className="px-6 py-3">Nombre Científico</th>
                            <th className="px-6 py-3">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading
                            ? Array.from({ length: 6 }).map((_, i) => (
                                  <SkeletonRow rowQuantity={8} key={i} />
                              ))
                            : animales?.map((animal) => (
                                  <tr
                                      key={animal.id_animal}
                                      className="bg-white border-b border-gray-200 hover:bg-gray-50"
                                  >
                                      <td className="px-6 py-4">
                                          {animal.id_animal}
                                      </td>
                                      <td className="px-6 py-4">
                                          {animal.numero_identificacion}
                                      </td>
                                      <td className="px-6 py-4">
                                          {animal.sexo}
                                      </td>
                                      <td className="px-6 py-4">
                                          {animal.año_nacimiento}
                                      </td>
                                      <td className="px-6 py-4">
                                          {animal.pais_origen}
                                      </td>
                                      <td className="px-6 py-4">
                                          {animal.continente}
                                      </td>
                                      <td className="px-6 py-4">
                                          {animal.zoologico}
                                      </td>
                                      <td className="px-6 py-4">
                                          {animal.especie}
                                      </td>
                                      <td className="px-6 py-4">
                                          {animal.especie}
                                      </td>
                                      <td className="px-6 py-4 flex gap-2 font-semibold">
                                          <button
                                              className="px-3 py-1.5 hover:cursor-pointer  text-white rounded hover:bg-[#471fa3d6] bg-[#471fa3]"
                                              onClick={() => {
                                                  setAnimalSeleccionado(animal);
                                                  setShowForm(true);
                                              }}
                                          >
                                              Editar
                                          </button>
                                          <button
                                              className="px-3 py-1 bg-red-600 hover:cursor-pointer text-white rounded hover:bg-red-700"
                                              onClick={() =>
                                                  setAnimalAEliminar(animal)
                                              }
                                          >
                                              Eliminar
                                          </button>
                                      </td>
                                  </tr>
                              ))}
                    </tbody>
                </table>

                {animalAEliminar && (
                    <ConfirmDialog
                        message={`¿Estás seguro de eliminar el animal con ID "${animalAEliminar.numero_identificacion}"?`}
                        onConfirm={() => {
                            mutationEliminar.mutate(animalAEliminar.id_animal);
                            setAnimalAEliminar(null);
                        }}
                        onCancel={() => setAnimalAEliminar(null)}
                    />
                )}
            </div>
            <AnimalesChart animales={animales} />
        </div>
    );
};
