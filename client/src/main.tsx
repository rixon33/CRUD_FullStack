import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavBar } from "./components/NavBar.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import { Zoologicos } from "./pages/Zoologicos.tsx";
import { Especies } from "./pages/Especies.tsx";
import { Animales } from "./pages/Animales.tsx";
import { Footer } from "./components/Footer.tsx";

// Instanciamos el cliente global
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
        <StrictMode>
            <QueryClientProvider client={queryClient}>
                <NavBar />
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="/zoo" element={<Zoologicos />} />
                    <Route path="/esp" element={<Especies />} />
                    <Route path="/ani" element={<Animales />} />
                </Routes>
                <Footer />
                <Toaster position="top-right"/>
            </QueryClientProvider>
        </StrictMode>
    </BrowserRouter>
);
