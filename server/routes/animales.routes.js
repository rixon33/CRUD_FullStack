import { Router } from "express";
import { pool } from "../db.js";

const router = Router();

router.get("/", async (req, res) => {
    const [rows] = await pool.query(`
    SELECT a.*, z.nombre AS zoologico, e.nombre_cientifico AS especie
    FROM animales a
    JOIN zoologicos z ON a.id_zoo = z.id_zoo
    JOIN especies e ON a.id_especie = e.id_especie
  `);
    res.json(rows);
});

router.post("/", async (req, res) => {
    const {
        numero_identificacion,
        id_zoo,
        id_especie,
        sexo,
        año_nacimiento,
        pais_origen,
        continente,
    } = req.body;
    const [result] = await pool.query(
        `INSERT INTO animales
    (numero_identificacion, id_zoo, id_especie, sexo, año_nacimiento, pais_origen, continente)
    VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
            numero_identificacion,
            id_zoo,
            id_especie,
            sexo,
            año_nacimiento,
            pais_origen,
            continente,
        ]
    );
    res.json({ id: result.insertId, ...req.body });
});

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const {
        numero_identificacion,
        id_zoo,
        id_especie,
        sexo,
        año_nacimiento,
        pais_origen,
        continente,
    } = req.body;
    await pool.query(
        `UPDATE animales SET
     numero_identificacion = ?, id_zoo = ?, id_especie = ?, sexo = ?, año_nacimiento = ?, pais_origen = ?, continente = ?
     WHERE id_animal = ?`,
        [
            numero_identificacion,
            id_zoo,
            id_especie,
            sexo,
            año_nacimiento,
            pais_origen,
            continente,
            id,
        ]
    );
    res.json({ updated: true });
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    await pool.query("DELETE FROM animales WHERE id_animal = ?", [id]);
    res.json({ deleted: true });
});

export default router;
