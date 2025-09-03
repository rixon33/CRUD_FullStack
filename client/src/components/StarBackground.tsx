import { useEffect } from "react";

// Array de colores para las estrellas, con diferentes opacidades.
const COLORS = ["#fff2", "#fff4", "#fff7", "#fffc"];

/**
 * Genera una capa de estrellas para el fondo animado.
 * Calcula la posición y color de cada estrella y las aplica como una sombra en una capa CSS.
 * @param size - El tamaño de las estrellas (ej. "2px").
 * @param className - La clase CSS del elemento al que se aplicarán las estrellas (ej. "space-1").
 * @param totalStars - El número total de estrellas a generar para esta capa.
 * @param duration - La duración de la animación de las estrellas (ej. "25s").
 */
const generateSpaceLayer = (
    size: string,
    className: string,
    totalStars: number,
    duration: string
) => {
    const layer = [];
    for (let i = 0; i < totalStars; i++) {
        // Selecciona un color aleatorio del array COLORS.
        const color = COLORS[Math.floor(Math.random() * COLORS.length)];
        // Genera posiciones X e Y aleatorias en el viewport.
        const x = Math.floor(Math.random() * 100);
        const y = Math.floor(Math.random() * 100);
        // Agrega dos conjuntos de coordenadas para crear un efecto de bucle infinito (una estrella y su copia 100vh más abajo).
        layer.push(`${x}vw ${y}vh 0 ${color}, ${x}vw ${y + 100}vh 0 ${color}`);
    }
    // Encuentra el elemento HTML con la clase especificada.
    const el = document.querySelector(`.${className}`) as HTMLElement | null;
    if (el) {
        // Establece las propiedades CSS personalizadas para el tamaño, la duración y las sombras de las estrellas.
        el.style.setProperty("--size", size);
        el.style.setProperty("--duration", duration);
        el.style.setProperty("--space-layer", layer.join(","));
    }
};

/**
 * Componente StarBackground.
 * Crea un fondo animado de estrellas que se mueven, utilizando capas CSS.
 * Las capas se generan dinámicamente con diferentes tamaños, densidades y velocidades.
 */
export default function StarBackground() {
    /**
     * Efecto secundario que se ejecuta una vez al montar el componente.
     * Llama a `generateSpaceLayer` para crear tres capas de estrellas con diferentes configuraciones.
     */
    useEffect(() => {
        generateSpaceLayer("2px", "space-1", 250, "25s"); // Capa 1: estrellas pequeñas, densas, lentas.
        generateSpaceLayer("3px", "space-2", 100, "20s"); // Capa 2: estrellas medianas, menos densas, velocidad media.
        generateSpaceLayer("6px", "space-3", 25, "15s"); // Capa 3: estrellas grandes, escasas, rápidas.
    }, []); // El array de dependencias vacío asegura que este efecto se ejecute solo una vez.

    return (
        <div className="fixed inset-0 bg-gradient-to-b from-[#051327] to-black z-[-1]">
            {" "}
            {/* Contenedor principal con fondo degradado */}
            <div className="space space-1 absolute top-0 left-0" />{" "}
            {/* Elemento para la capa 1 de estrellas */}
            <div className="space space-2 absolute top-0 left-0" />{" "}
            {/* Elemento para la capa 2 de estrellas */}
            <div className="space space-3 absolute top-0 left-0" />{" "}
            {/* Elemento para la capa 3 de estrellas */}
        </div>
    );
}
