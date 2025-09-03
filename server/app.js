// 1. Importamos las dependencias
import express from "express"; // Framework para crear el servidor
import cors from "cors"; // Middleware para permitir peticiones desde el frontend
import dotenv from "dotenv"; // Para leer las variables de entorno
import { pool } from "./db.js"; // Nuestra conexión a MySQL (hecha en db.js)

// 2. Importamos las rutas (aunque estén vacías por ahora)
import zoosRouter from "./routes/zoos.routes.js";
import especiesRouter from "./routes/especies.routes.js";
import animalesRouter from "./routes/animales.routes.js";

// 3. Cargamos las variables del archivo .env
dotenv.config();

// 4. Creamos la app de Express
const app = express();

// 5. Middlewares
app.use(cors()); // Permitir que se conecte el frontend
app.use(express.json()); // Permitir recibir datos en formato JSON

// 6. Ruta de prueba (healthcheck)
app.get("/api/health", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT 1 AS ok");
        res.json({ ok: true, db: rows[0].ok === 1 });
    } catch (error) {
        res.status(500).json({ ok: false, error: error.message });
    }
});

// 7. Montamos las rutas principales (por ahora vacías)
app.use("/api/zoos", zoosRouter);
app.use("/api/especies", especiesRouter);
app.use("/api/animales", animalesRouter);

// 8. Arrancamos el servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
});
