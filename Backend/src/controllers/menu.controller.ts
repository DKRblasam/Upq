import { Request, Response } from "express";
import { db } from "@config/db";

export const getHierarchy = async (req: Request, res: Response) => {
  try {
    // Fetch all needed data
    // We need: Carreras -> Cursos (Materias) -> Unidades
    // And we need to group them.
    // Assuming structure:
    // Carreras: id, nombre
    // Cursos: id, nombre, cuatri, id_carrera
    // Unidades: id, titulo, id_curso

    const [carreras]: any = await db.query("SELECT * FROM carreras");
    const [cursos]: any = await db.query("SELECT * FROM cursos");
    const [unidades]: any = await db.query("SELECT * FROM unidades");

    // Build hierarchy
    const hierarchy = carreras.map((carrera: any) => {
      const carreraCursos = cursos.filter(
        (c: any) => c.id_carrera === carrera.id
      );

      // Group by cuatrimestre
      const cuatrimestresMap = new Map();

      carreraCursos.forEach((curso: any) => {
        if (!cuatrimestresMap.has(curso.cuatri)) {
          cuatrimestresMap.set(curso.cuatri, []);
        }

        const cursoUnidades = unidades.filter(
          (u: any) => u.id_curso === curso.id
        );

        cuatrimestresMap.get(curso.cuatri).push({
          ...curso,
          unidades: cursoUnidades,
        });
      });

      const cuatrimestres = Array.from(cuatrimestresMap.entries()).map(
        ([cuatri, materias]) => ({
          cuatri,
          materias,
        })
      );

      return {
        ...carrera,
        cuatrimestres,
      };
    });

    res.json(hierarchy);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener jerarquía" });
  }
};
