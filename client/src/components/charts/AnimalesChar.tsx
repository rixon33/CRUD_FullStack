// components/charts/AnimalesChart.tsx
import type { Animal } from "../../types/tipos";
import { Users, User, Globe2 } from "lucide-react";

interface AnimalesChartProps {
    animales: Animal[];
}

function normalizarSexo(v: any): "m" | "h" | "otro" {
    if (typeof v !== "string") return "otro";
    const t = v.trim().toLowerCase();
    // Soporta "m", "machO", "male" / "h", "hembra", "f", "female"
    if (t.startsWith("m") || t === "male") return "m";
    if (t.startsWith("h") || t === "f" || t === "female") return "h";
    return "otro";
}

export const AnimalesChart = ({ animales }: AnimalesChartProps) => {
    const total = animales.length;

    const { machos, hembras } = animales.reduce(
        (acc, a: any) => {
            const s = normalizarSexo(a?.sexo);
            if (s === "m") acc.machos++;
            else if (s === "h") acc.hembras++;
            return acc;
        },
        { machos: 0, hembras: 0 }
    );

    const continentes = new Set(
        animales
            .map((a: any) => a?.continente)
            .filter((v: any) => typeof v === "string" && v.trim() !== "")
    ).size;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
            <div className="lg:col-span-2">
                <h3 className="text-3xl font-bold py-3 pb-2">
                    Datos relevantes de la tabla
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Total de Animales */}
                    <div className="bg-gradient-to-r bg-[#1b1b1b72]/90 border border-gray-900 backdrop-blur-sm p-6 rounded-md text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-blue-100 text-sm">
                                    Total Animales
                                </p>
                                <p className="text-2xl font-bold">{total}</p>
                            </div>
                            <Users width={40} height={40} />
                        </div>
                    </div>

                    {/* Machos vs Hembras */}
                    <div className="bg-gradient-to-r bg-[#1b1b1b72]/90 border border-gray-900 backdrop-blur-sm p-6 rounded-md text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-green-100 text-sm">
                                    Machos / Hembras
                                </p>
                                <p className="text-2xl font-bold">
                                    {machos} / {hembras}
                                </p>
                                <p className="text-green-100 text-xs">
                                    según campo sexo
                                </p>
                            </div>
                            <User width={40} height={40} />
                        </div>
                    </div>

                    {/* Continentes representados */}
                    <div className="bg-gradient-to-r bg-[#1b1b1b72]/90 border border-gray-900 backdrop-blur-sm p-6 rounded-md text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-purple-100 text-sm">
                                    Continentes
                                </p>
                                <p className="text-2xl font-bold">
                                    {continentes}
                                </p>
                                <p className="text-purple-100 text-xs">
                                    distintos
                                </p>
                            </div>
                            <Globe2 width={40} height={40} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
