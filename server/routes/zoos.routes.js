import { Router } from "express";
import { pool } from "../db.js";

const router = Router();

// Obtener todos los zoológicos
router.get("/", async (req, res) => {
    const [rows] = await pool.query("SELECT * FROM zoologicos");
    res.json(rows);
});

// Agregar zoológico
router.post("/", async (req, res) => {
    const { nombre, ciudad, pais, t_m2, presupuesto_anual } = req.body;
    const [result] = await pool.query(
        "INSERT INTO zoologicos (nombre, ciudad, pais, t_m2, presupuesto_anual) VALUES (?, ?, ?, ?, ?)",
        [nombre, ciudad, pais, t_m2, presupuesto_anual]
    );
    res.json({ id: result.insertId, ...req.body });
});

// Actualizar zoológico
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { nombre, ciudad, pais, t_m2, presupuesto_anual } = req.body;
    await pool.query(
        "UPDATE zoologicos SET nombre = ?, ciudad = ?, pais = ?, t_m2 = ?, presupuesto_anual = ? WHERE id_zoo = ?",
        [nombre, ciudad, pais, t_m2, presupuesto_anual, id]
    );
    res.json({ updated: true });
});

// Eliminar zoológico
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    await pool.query("DELETE FROM zoologicos WHERE id_zoo = ?", [id]);
    res.json({ deleted: true });
});

export default router;
