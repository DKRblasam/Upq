import { Request, Response } from "express";
import { db } from "@config/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = async (req: Request, res: Response) => {
  try {
    const { usuario, passw } = req.body;

    if (!usuario || !passw) {
      return res.status(400).json({ error: "Usuario y contraseña obligatorios" });
    }

    const [rows]: any = await db.query(
      "SELECT * FROM usuarios WHERE usuario = ? AND activo = TRUE LIMIT 1",
      [usuario]
    );

    if (!rows.length) {
      return res.status(404).json({ error: "Usuario no encontrado o inactivo" });
    }

    const user = rows[0];
    const valid = await bcrypt.compare(passw, user.passw);

    if (!valid) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      { id: user.id, rol: user.rol },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "8h" }
    );

    res.json({
      message: "Login exitoso",
      token,
      user: {
        id: user.id,
        nombre: user.nombre,
        usuario: user.usuario,
        rol: user.rol
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error interno" });
  }
};
