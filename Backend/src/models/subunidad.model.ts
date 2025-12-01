import pool from "../config/db";
import { ResultSetHeader, RowDataPacket } from "mysql2";

export interface Subunidad {
  id?: number;
  unidad_id: number;
  titulo: string;
  descripcion?: string;
  orden?: number;
  created_at?: Date;
  updated_at?: Date;
}

export class SubunidadModel {
  static async create(subunidad: Subunidad): Promise<number> {
    const { unidad_id, titulo, descripcion, orden } = subunidad;
    const [result] = await pool.query<ResultSetHeader>(
      "INSERT INTO subunidades (unidad_id, titulo, descripcion, orden) VALUES (?, ?, ?, ?)",
      [unidad_id, titulo, descripcion, orden || 1]
    );
    return result.insertId;
  }

  static async findAllByUnidadId(unidadId: number): Promise<Subunidad[]> {
    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM subunidades WHERE unidad_id = ? ORDER BY orden ASC",
      [unidadId]
    );
    return rows as Subunidad[];
  }

  static async findById(id: number): Promise<Subunidad | null> {
    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM subunidades WHERE id = ?",
      [id]
    );
    return (rows[0] as Subunidad) || null;
  }

  static async update(
    id: number,
    subunidad: Partial<Subunidad>
  ): Promise<boolean> {
    const { titulo, descripcion, orden } = subunidad;
    const [result] = await pool.query<ResultSetHeader>(
      "UPDATE subunidades SET titulo = ?, descripcion = ?, orden = ? WHERE id = ?",
      [titulo, descripcion, orden, id]
    );
    return result.affectedRows > 0;
  }

  static async delete(id: number): Promise<boolean> {
    const [result] = await pool.query<ResultSetHeader>(
      "DELETE FROM subunidades WHERE id = ?",
      [id]
    );
    return result.affectedRows > 0;
  }
}
