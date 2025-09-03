import { Router } from "express";
import { pool } from "../db.js";

const router = Router();

router.get("/", async (req, res) => {
    const [rows] = await pool.query("SELECT * FROM especies");
    res.json(rows);
});

router.post("/", async (req, res) => {
    const { nombre_vulgar, nombre_cientifico, familia, peligro_extincion } =
        req.body;
    const [result] = await pool.query(
        "INSERT INTO especies (nombre_vulgar, nombre_cientifico, familia, peligro_extincion) VALUES (?, ?, ?, ?)",
        [nombre_vulgar, nombre_cientifico, familia, peligro_extincion]
    );
    res.json({ id: result.insertId, ...req.body });
});

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { nombre_vulgar, nombre_cientifico, familia, peligro_extincion } =
        req.body;
    await pool.query(
        "UPDATE especies SET nombre_vulgar = ?, nombre_cientifico = ?, familia = ?, peligro_extincion = ? WHERE id_especie = ?",
        [nombre_vulgar, nombre_cientifico, familia, peligro_extincion, id]
    );
    res.json({ updated: true });
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    await pool.query("DELETE FROM especies WHERE id_especie = ?", [id]);
    res.json({ deleted: true });
});

export default router;
