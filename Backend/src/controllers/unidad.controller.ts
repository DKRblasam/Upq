import { Request, Response } from "express";
import {db} from "@config/db";

export const getUnidades = async (_req: Request, res: Response) => {
  try {
    const [rows]: any = await db.query("SELECT * FROM unidades");
    res.json(rows);
  } catch {
    res.status(500).json({ error: "Error interno" });
  }
};

export const getUnidad = async (req: Request, res: Response) => {
  try {
    const [rows]: any = await db.query(
      "SELECT * FROM unidades WHERE id=?",
      [req.params.id]
    );
    if (!rows.length) return res.status(404).json({ error: "No encontrada" });
    res.json(rows[0]);
  } catch {
    res.status(500).json({ error: "Error interno" });
  }
};

export const createUnidad = async (req: Request, res: Response) => {
  try {
    const { titulo, contenido, id_curso, id_maestro } = req.body;

    await db.query(
      "INSERT INTO unidades (titulo, contenido, id_curso, id_maestro) VALUES (?, ?, ?, ?)",
      [titulo, contenido, id_curso, id_maestro]
    );

    res.json({ message: "Unidad creada" });
  } catch (err: any) {
    res.status(500).json({ error: err.sqlMessage || "Error interno" });
  }
};

export const updateUnidad = async (req: Request, res: Response) => {
  try {
    const { titulo, contenido } = req.body;

    await db.query(
      "UPDATE unidades SET titulo=?, contenido=? WHERE id=?",
      [titulo, contenido, req.params.id]
    );

    res.json({ message: "Unidad actualizada" });
  } catch {
    res.status(500).json({ error: "Error interno" });
  }
};

export const deleteUnidad = async (req: Request, res: Response) => {
  try {
    await db.query("DELETE FROM unidades WHERE id=?", [req.params.id]);
    res.json({ message: "Unidad eliminada" });
  } catch {
    res.status(500).json({ error: "Error interno" });
  }
};
