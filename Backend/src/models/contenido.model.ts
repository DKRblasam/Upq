import pool from "../config/db";
import { ResultSetHeader, RowDataPacket } from "mysql2";

export interface Contenido {
  id?: number;
  subunidad_id: number;
  tipo: "video" | "documento" | "imagen" | "link" | "texto";
  titulo: string;
  descripcion?: string;
  url?: string;
  metadata?: any;
  orden?: number;
  created_at?: Date;
  updated_at?: Date;
}

export class ContenidoModel {
  static async create(contenido: Contenido): Promise<number> {
    const { subunidad_id, tipo, titulo, descripcion, url, metadata, orden } =
      contenido;
    const [result] = await pool.query<ResultSetHeader>(
      "INSERT INTO contenidos (subunidad_id, tipo, titulo, descripcion, url, metadata, orden) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        subunidad_id,
        tipo,
        titulo,
        descripcion,
        url,
        JSON.stringify(metadata),
        orden || 1,
      ]
    );
    return result.insertId;
  }

  static async findAllBySubunidadId(subunidadId: number): Promise<Contenido[]> {
    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM contenidos WHERE subunidad_id = ? ORDER BY orden ASC",
      [subunidadId]
    );
    return rows as Contenido[];
  }

  static async findById(id: number): Promise<Contenido | null> {
    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM contenidos WHERE id = ?",
      [id]
    );
    return (rows[0] as Contenido) || null;
  }

  static async update(
    id: number,
    contenido: Partial<Contenido>
  ): Promise<boolean> {
    const { tipo, titulo, descripcion, url, metadata, orden } = contenido;
    const [result] = await pool.query<ResultSetHeader>(
      "UPDATE contenidos SET tipo = ?, titulo = ?, descripcion = ?, url = ?, metadata = ?, orden = ? WHERE id = ?",
      [tipo, titulo, descripcion, url, JSON.stringify(metadata), orden, id]
    );
    return result.affectedRows > 0;
  }

  static async delete(id: number): Promise<boolean> {
    const [result] = await pool.query<ResultSetHeader>(
      "DELETE FROM contenidos WHERE id = ?",
      [id]
    );
    return result.affectedRows > 0;
  }
}
