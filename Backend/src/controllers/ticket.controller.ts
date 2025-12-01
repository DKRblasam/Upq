import { Request, Response } from "express";
import { db } from "@config/db";
import { sendResponse } from "@/utils/response.utils";

export const createTicket = async (req: Request, res: Response) => {
  try {
    const { nombre, matricula, categoria, descripcion } = req.body;

    if (!nombre || !matricula || !categoria || !descripcion) {
      return sendResponse(
        res,
        false,
        null,
        "Todos los campos son obligatorios",
        400
      );
    }

    // 1. Validar matrícula y obtener rol
    const [users]: any = await db.query(
      "SELECT * FROM bzypyzfojxq906t97rwf.usuarios where matricula = ? Limit 1;",
      [matricula]
    );

    if (!users.length) {
      return sendResponse(
        res,
        false,
        null,
        "Matrícula no encontrada en el sistema",
        404
      );
    }

    const user = users[0];
    const rol = user.rol;

    // 2. Insertar ticket
    await db.query(
      "INSERT INTO tickets (nombre, matricula, rol, categoria, descripcion, status) VALUES (?, ?, ?, ?, ?, 'abierto')",
      [nombre, matricula, rol, categoria, descripcion]
    );

    return sendResponse(
      res,
      true,
      { message: "Ticket creado exitosamente" },
      null,
      200
    );
  } catch (err: any) {
    console.error(err);
    return sendResponse(
      res,
      false,
      null,
      err.sqlMessage || "Error interno al crear el ticket",
      500
    );
  }
};

export const getTickets = async (req: Request, res: Response) => {
  try {
    const [tickets]: any = await db.query("SELECT * FROM tickets");
    return sendResponse(res, true, tickets, null, 200);
  } catch (err: any) {
    console.error(err);
    return sendResponse(
      res,
      false,
      null,
      err.sqlMessage || "Error interno al obtener los tickets",
      500
    );
  }
};

