import { Request, Response } from "express";
import {db} from "@config/db";

export const getMaestros = async (_req: Request, res: Response) => {
  try {
    const [rows]: any = await db.query(
      "SELECT * FROM usuarios WHERE rol='teach'"
    );
    res.json(rows);
  } catch {
    res.status(500).json({ error: "Error interno" });
  }
};

export const getMaestroCursos = async (req: Request, res: Response) => {
  try {
    const [rows]: any = await db.query(
      "SELECT * FROM v_maestros_cursos WHERE maestro_id=?",
      [req.params.id]
    );
    res.json(rows);
  } catch {
    res.status(500).json({ error: "Error interno" });
  }
};

export const asignarCurso = async (req: Request, res: Response) => {
  try {
    const { id_curso, id_maestro } = req.body;

    const [rows]: any = await db.query(
      "CALL sp_asignar_maestro_curso(?, ?)",
      [id_curso, id_maestro]
    );

    res.json(rows[0]);
  } catch (err: any) {
    res.status(500).json({ error: err.sqlMessage || "Error interno" });
  }
};
