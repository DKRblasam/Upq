import { Request, Response } from "express";
import { db } from "@config/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendResponse } from "@/utils/response.utils";
import { RowDataPacket } from "mysql2";

interface User extends RowDataPacket {
  id: number;
  usuario: string;
  passw: string;
  nombre: string;
  matricula: string;
  rol: string;
  activo: number;
}

export const login = async (req: Request, res: Response) => {
  try {
    const { usuario, passw } = req.body;

    if (!usuario || !passw) {
      return sendResponse(
        res,
        false,
        null,
        "Usuario y contraseña obligatorios",
        400
      );
    }

    const [rows] = await db.query<User[]>(
      "SELECT * FROM usuarios WHERE usuario = ? AND activo = TRUE LIMIT 1",
      [usuario]
    );

    if (!rows.length) {
      return sendResponse(
        res,
        false,
        null,
        "Usuario no encontrado o inactivo",
        404
      );
    }

    const user = rows[0];
    const valid = await bcrypt.compare(passw, user.passw);

    if (!valid) {
      return sendResponse(res, false, null, "Contraseña incorrecta", 401);
    }

    const token = jwt.sign(
      { id: user.id, rol: user.rol },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "8h" }
    );

    return sendResponse(res, true, {
      message: "Login exitoso",
      token,
      user: {
        id: user.id,
        nombre: user.nombre,
        usuario: user.usuario,
        rol: user.rol,
      },
    });
  } catch (err) {
    console.error(err);
    return sendResponse(res, false, null, "Error interno", 500);
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { nombre, usuario, passw, code, matricula } = req.body;

    if (!nombre || !usuario || !passw || !matricula) {
      return sendResponse(
        res,
        false,
        null,
        "Todos los campos son obligatorios",
        400
      );
    }

    // Check if user exists
    const [existing] = await db.query<User[]>(
      "SELECT * FROM usuarios WHERE usuario = ?",
      [usuario]
    );

    if (existing.length) {
      return sendResponse(res, false, null, "El usuario ya existe", 400);
    }

    let role = "user";

    if (code) {
      const [codeRows] = await db.query<RowDataPacket[]>(
        "SELECT * FROM registration_codes WHERE code = ? AND is_used = FALSE",
        [code]
      );

      if (codeRows.length) {
        role = codeRows[0].role;
        // Mark code as used
        await db.query(
          "UPDATE registration_codes SET is_used = TRUE WHERE id = ?",
          [codeRows[0].id]
        );
      } else {
        return sendResponse(
          res,
          false,
          null,
          "Código inválido o ya usado",
          400
        );
      }
    }

    const hash = await bcrypt.hash(passw, 10);

    await db.query(
      "INSERT INTO usuarios (nombre, usuario, passw, rol, activo, matricula) VALUES (?, ?, ?, ?, TRUE, ?)",
      [nombre, usuario, hash, role, matricula]
    );

    return sendResponse(res, true, {
      message: "Usuario registrado exitosamente",
    });
  } catch (err) {
    console.error(err);
    return sendResponse(res, false, null, "Error al registrar usuario", 500);
  }
};

export const generateCode = async (req: Request, res: Response) => {
  try {
    const { role } = req.body;

    const code =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    const userId = (req as any).user?.id || null;

    await db.query(
      "INSERT INTO registration_codes (code, role, created_by) VALUES (?, ?, ?)",
      [code, role, userId]
    );

    return sendResponse(res, true, { code });
  } catch (err) {
    console.error(err);
    return sendResponse(res, false, null, "Error al generar código", 500);
  }
};
