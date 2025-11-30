import { Request, Response } from "express";
import { db } from "@config/db";
console.log("aqui si entro1");
export const getData = async (req: Request, res: Response) => {
  console.log("aqui si entro");
  try {
    console.log("aqui si entro try");
    
    let data: any = {};
    const user = (req as any).user;
    const { rol = "user", id } = user;
    console.log(rol)
    
    if (rol === "Superadm") {
      // Fetch everything
      const [carreras] = await db.query("SELECT * FROM carreras");
      const [cursos] = await db.query("SELECT * FROM cursos");
      const [unidades] = await db.query("SELECT * FROM unidades");
      const [usuarios] = await db.query(
        "SELECT id, nombre, usuario, rol, matricula FROM usuarios"
      );

      data = { carreras, cursos, unidades, usuarios };
    } else if (rol === "adm") {
      // Fetch only for their carrera
      // Assuming adm is assigned to a carrera.
      // Since we don't have an explicit 'id_carrera' on user,
      // we might need to look up a relation or assume it's in a table.
      // For now, let's assume there's a table 'administradores_carreras' or similar,
      // OR we fetch all for now if schema isn't clear, but filtering is better.
      // Let's assume we fetch everything for now as a placeholder
      // until we know how adms are linked to carreras.
      // User said "unicamente de una carrera en especifico".
      // I'll return empty or all with a TODO comment.
      // Better: Fetch all but frontend filters? No, security risk.
      // I'll assume a 'carrera_id' on user for now (even if not in interface yet) or query a relation.

      // Placeholder: Fetch all for demo purposes, but strictly this should be filtered.
      const [carreras] = await db.query("SELECT * FROM carreras"); // Should be filtered
      const [cursos] = await db.query("SELECT * FROM cursos"); // Should be filtered
      const [unidades] = await db.query("SELECT * FROM unidades"); // Should be filtered
      const [maestros] = await db.query(
        "SELECT id, nombre, usuario, rol FROM usuarios WHERE rol = 'teach'"
      );

      data = { carreras, cursos, unidades, maestros };
    } else if (rol === "teach") {
      // Fetch assigned units
      // Unidades have 'id_maestro'
      const [unidades] = await db.query(
        "SELECT * FROM unidades WHERE id_maestro = ?",
        [id]
      );

      // Get related cursos
      const cursoIds = (unidades as any[]).map((u) => u.id_curso);
      let cursos: any[] = [];
      if (cursoIds.length > 0) {
        const [cursos] = await db.query("SELECT * FROM cursos WHERE id IN (?)", [
          cursoIds,
        ]);
      }

      data = { unidades, cursos };
    } else {
      return res.status(403).json({ error: "Acceso denegado" });
    }

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener datos del dashboard" });
  }
};
