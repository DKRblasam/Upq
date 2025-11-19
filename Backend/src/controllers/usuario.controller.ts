import { Request, Response } from "express";
import { db } from "@/config/db";
import bcrypt from "bcryptjs";

export const getUsuarios = async (_req: Request, res: Response) => {
  try {
    const [rows]: any = await db.query("SELECT * FROM usuarios");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
};

export const getUsuario = async (req: Request, res: Response) => {
  try {
    const [rows]: any = await db.query(
      "SELECT * FROM usuarios WHERE id = ?",
      [req.params.id]
    );
    if (!rows.length) return res.status(404).json({ error: "No encontrado" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Error interno" });
  }
};

export const createUsuario = async (req: Request, res: Response) => {
  try {
    const { nombre, usuario, passw, rol } = req.body;

    const hash = await bcrypt.hash(passw, 10);

    await db.query(
      "INSERT INTO usuarios (nombre, usuario, passw, rol) VALUES (?, ?, ?, ?)",
      [nombre, usuario, hash, rol]
    );

    res.json({ message: "Usuario creado" });
  } catch (err: any) {
    res.status(500).json({ error: err.sqlMessage || "Error interno" });
  }
};

export const updateUsuario = async (req: Request, res: Response) => {
  try {
    const { nombre, usuario, rol, passw } = req.body;
    let sql = "UPDATE usuarios SET nombre = ?, usuario = ?, rol = ? WHERE id = ?";
    let params: any[] = [nombre, usuario, rol, req.params.id];

    if (passw) {
      const hash = await bcrypt.hash(passw, 10);
      sql = "UPDATE usuarios SET nombre=?, usuario=?, rol=?, passw=? WHERE id=?";
      params = [nombre, usuario, rol, hash, req.params.id];
    }

    await db.query(sql, params);
    res.json({ message: "Usuario actualizado" });

  } catch (err) {
    res.status(500).json({ error: "Error interno" });
  }
};

export const deleteUsuario = async (req: Request, res: Response) => {
  try {
    await db.query("UPDATE usuarios SET activo = FALSE WHERE id = ?", [
      req.params.id
    ]);
    res.json({ message: "Usuario desactivado" });
  } catch (err) {
    res.status(500).json({ error: "Error interno" });
  }
};
