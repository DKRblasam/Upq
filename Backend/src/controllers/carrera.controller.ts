import { Request, Response } from "express";
import {db} from "@config/db";

export const getCarreras = async (_req: Request, res: Response) => {
  try {
    const [rows]: any = await db.query("SELECT * FROM carreras");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener carreras" });
  }
};

export const getCarrera = async (req: Request, res: Response) => {
  try {
    const [rows]: any = await db.query("SELECT * FROM carreras WHERE id=?", [
      req.params.id
    ]);
    if (!rows.length) return res.status(404).json({ error: "No encontrada" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Error interno" });
  }
};

export const createCarrera = async (req: Request, res: Response) => {
  try {
    const { nombre, descripcion } = req.body;

    await db.query(
      "INSERT INTO carreras (nombre, descripcion) VALUES (?, ?)",
      [nombre, descripcion]
    );

    res.json({ message: "Carrera creada" });
  } catch (err: any) {
    res.status(500).json({ error: err.sqlMessage || "Error interno" });
  }
};

export const updateCarrera = async (req: Request, res: Response) => {
  try {
    const { nombre, descripcion } = req.body;

    await db.query(
      "UPDATE carreras SET nombre=?, descripcion=? WHERE id=?",
      [nombre, descripcion, req.params.id]
    );

    res.json({ message: "Carrera actualizada" });
  } catch (err) {
    res.status(500).json({ error: "Error interno" });
  }
};

export const deleteCarrera = async (req: Request, res: Response) => {
  try {
    await db.query("DELETE FROM carreras WHERE id=?", [req.params.id]);
    res.json({ message: "Carrera eliminada" });
  } catch (err) {
    res.status(500).json({ error: "Error interno" });
  }
};
