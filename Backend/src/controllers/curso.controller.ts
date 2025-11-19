import { Request, Response } from "express";
import {db} from "@config/db";

export const getCursos = async (_req: Request, res: Response) => {
  try {
    const [rows]: any = await db.query("SELECT * FROM v_cursos_completos");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener cursos" });
  }
};

export const getCurso = async (req: Request, res: Response) => {
  try {
    const [rows]: any = await db.query(
      "SELECT * FROM v_cursos_completos WHERE id=?",
      [req.params.id]
    );
    if (!rows.length) return res.status(404).json({ error: "No encontrado" });
    res.json(rows[0]);
  } catch {
    res.status(500).json({ error: "Error interno" });
  }
};

export const createCurso = async (req: Request, res: Response) => {
  try {
    const { nombre, descripcion, id_carrera, cuatri } = req.body;

    await db.query(
      "INSERT INTO cursos (nombre, descripcion, id_carrera, cuatri) VALUES (?, ?, ?, ?)",
      [nombre, descripcion, id_carrera, cuatri]
    );

    res.json({ message: "Curso creado" });
  } catch (err: any) {
    res.status(500).json({ error: err.sqlMessage || "Error interno" });
  }
};

export const updateCurso = async (req: Request, res: Response) => {
  try {
    const { nombre, descripcion, id_carrera, cuatri } = req.body;

    await db.query(
      "UPDATE cursos SET nombre=?, descripcion=?, id_carrera=?, cuatri=? WHERE id=?",
      [nombre, descripcion, id_carrera, cuatri, req.params.id]
    );

    res.json({ message: "Curso actualizado" });
  } catch {
    res.status(500).json({ error: "Error interno" });
  }
};

export const deleteCurso = async (req: Request, res: Response) => {
  try {
    await db.query("DELETE FROM cursos WHERE id=?", [req.params.id]);
    res.json({ message: "Curso eliminado" });
  } catch {
    res.status(500).json({ error: "Error interno" });
  }
};
