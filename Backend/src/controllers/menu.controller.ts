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

export const addNode = async (req: Request, res: Response) => {
  const { type, data } = req.body;

  try {
    let result;
    if (type === "carrera") {
      const { nombre } = data;
      result = await db.query("INSERT INTO carreras (nombre) VALUES (?)", [
        nombre,
      ]);
    } else if (type === "materia") {
      const { nombre, cuatri, id_carrera } = data;
      result = await db.query(
        "INSERT INTO cursos (nombre, cuatri, id_carrera) VALUES (?, ?, ?)",
        [nombre, cuatri, id_carrera]
      );
    } else if (type === "unidad") {
      const { titulo, id_curso } = data;
      result = await db.query(
        "INSERT INTO unidades (titulo, id_curso) VALUES (?, ?)",
        [titulo, id_curso]
      );
    } else {
      return res.status(400).json({ error: "Tipo de nodo no válido" });
    }

    res.json({ message: "Nodo agregado correctamente", result });
  } catch (error) {
    console.error("Error adding node:", error);
    res.status(500).json({ error: "Error al agregar nodo" });
  }
};

export const deleteNode = async (req: Request, res: Response) => {
  const { type, id } = req.params;

  try {
    let table = "";
    if (type === "carrera") table = "carreras";
    else if (type === "materia") table = "cursos";
    else if (type === "unidad") table = "unidades";
    else return res.status(400).json({ error: "Tipo de nodo no válido" });

    await db.query(`DELETE FROM ${table} WHERE id = ?`, [id]);
    res.json({ message: "Nodo eliminado correctamente" });
  } catch (error) {
    console.error("Error deleting node:", error);
    res.status(500).json({ error: "Error al eliminar nodo" });
  }
};

export const getNode = async (req: Request, res: Response) => {
  const { type, id } = req.params;

  try {
    let query = "";
    if (type === "carrera") query = "SELECT * FROM carreras WHERE id = ?";
    else if (type === "materia") query = "SELECT * FROM cursos WHERE id = ?";
    else if (type === "unidad") query = "SELECT * FROM unidades WHERE id = ?";
    else return res.status(400).json({ error: "Tipo de nodo no válido" });

    const [rows]: any = await db.query(query, [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "Nodo no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error getting node:", error);
    res.status(500).json({ error: "Error al obtener nodo" });
  }
};
