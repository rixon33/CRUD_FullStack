// components/charts/EspeciesChart.tsx
import type { Especie } from "../../types/tipos";
import { Trees, AlertTriangle, GitBranch } from "lucide-react";

interface EspeciesChartProps {
    especies: Especie[];
}

export const EspeciesChart = ({ especies }: EspeciesChartProps) => {
    // Familias distintas
    const familias = new Set(
        especies
            .map((e) => (e as any)?.familia)
            .filter((v) => typeof v === "string" && v.trim() !== "")
    ).size;

    // En peligro (acepta boolean o strings tipo "si", "sí", "en peligro")
    const enPeligro = especies.filter((e: any) =>
        Boolean((e as any)?.peligro_extincion)
      ).length;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
            <div className="lg:col-span-2">
                <h3 className="text-3xl font-bold py-3 pb-2">
                    Datos relevantes de la tabla
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Total de Especies */}
                    <div className="bg-gradient-to-r bg-[#1b1b1b72]/90 border border-gray-900 backdrop-blur-sm p-6 rounded-md text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-blue-100 text-sm">
                                    Total Especies
                                </p>
                                <p className="text-2xl font-bold">
                                    {especies.length}
                                </p>
                            </div>
                            <Trees width={40} height={40} />
                        </div>
                    </div>

                    {/* Familias distintas */}
                    <div className="bg-gradient-to-r bg-[#1b1b1b72]/90 border border-gray-900 backdrop-blur-sm p-6 rounded-md text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-green-100 text-sm">
                                    Familias distintas
                                </p>
                                <p className="text-2xl font-bold">{familias}</p>
                                <p className="text-green-100 text-xs">únicas</p>
                            </div>
                            <GitBranch width={40} height={40} />
                        </div>
                    </div>

                    {/* En peligro de extinción */}
                    <div className="bg-gradient-to-r bg-[#1b1b1b72]/90 border border-gray-900 backdrop-blur-sm p-6 rounded-md text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-purple-100 text-sm">
                                    En peligro
                                </p>
                                <p className="text-2xl font-bold">
                                    {enPeligro}
                                </p>
                                <p className="text-purple-100 text-xs">
                                    según campo
                                </p>
                            </div>
                            <AlertTriangle width={40} height={40} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
