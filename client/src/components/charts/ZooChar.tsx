// components/charts/ZooChart.tsx
import type { Zoologico } from "../../types/tipos";
import { Building2, Ruler, Wallet } from "lucide-react";

interface ZooChartProps {
    zoos: Zoologico[];
}

export const ZooChart = ({ zoos }: ZooChartProps) => {

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">

            {/* Tarjetas de estadísticas adicionales */}
            <div className="lg:col-span-2">
                <h3 className="text-3xl font-bold py-3 pb-2">Datos relevantes de la tabla</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gradient-to-r bg-[#1b1b1b72]/90 border border-gray-900 backdrop-blur-sm p-6 rounded-md text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-blue-100 text-sm">
                                    Total Zoológicos
                                </p>
                                <p className="text-2xl font-bold">
                                    {zoos.length}
                                </p>
                            </div>
                            <Building2 width={40} height={40} />
                        </div>
                    </div>

                    <div className="bg-gradient-to-r bg-[#1b1b1b72]/90 border border-gray-900 backdrop-blur-sm p-6 rounded-md text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-green-100 text-sm">
                                    Superficie Total
                                </p>
                                <p className="text-2xl font-bold">
                                    {zoos
                                        .reduce(
                                            (total, zoo) => total + zoo.t_m2,
                                            0
                                        )
                                        .toLocaleString()}
                                </p>
                                <p className="text-green-100 text-xs">m²</p>
                            </div>
                            <Ruler width={40} height={40} />
                        </div>
                    </div>

                    <div className="bg-gradient-to-r bg-[#1b1b1b72]/90 border border-gray-900 backdrop-blur-sm p-6 rounded-md text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-purple-100 text-sm">
                                    Presupuesto Total
                                </p>
                                <p className="text-2xl font-bold">
                                    $
                                    {zoos
                                        .reduce(
                                            (total, zoo) =>
                                                total + zoo.presupuesto_anual,
                                            0
                                        )
                                        .toLocaleString()}
                                </p>
                                <p className="text-purple-100 text-xs">anual</p>
                            </div>
                            <Wallet width={40} height={40} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
