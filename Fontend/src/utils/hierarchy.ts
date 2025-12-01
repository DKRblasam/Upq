export interface HierarchyNode {
  id: string | number;
  name: string;
  type: "carrera" | "materia" | "unidad";
  children?: HierarchyNode[];
  parentId?: string | number;
}

export function transformHierarchy(data: any[]): HierarchyNode[] {
  if (!Array.isArray(data)) return [];

  return data.map((carrera) => ({
    id: carrera.id,
    name: carrera.nombre,
    type: "carrera",
    children: carrera.cuatrimestres
      ? carrera.cuatrimestres.flatMap((cuatri: any) =>
          cuatri.materias.map((materia: any) => ({
            id: materia.id,
            name: materia.nombre,
            type: "materia",
            parentId: carrera.id,
            children: materia.unidades
              ? materia.unidades.map((unidad: any) => ({
                  id: unidad.id,
                  name: unidad.titulo,
                  type: "unidad",
                  parentId: materia.id,
                  children: [],
                }))
              : [],
          }))
        )
      : [],
  }));
}

export function getUnitById(
  id: string | number,
  type: "carrera" | "materia" | "unidad",
  tree: HierarchyNode[]
): HierarchyNode | null {
  for (const node of tree) {
    if (node.type === type && String(node.id) === String(id)) {
      return node;
    }
    if (node.children) {
      const found = getUnitById(id, type, node.children);
      if (found) return found;
    }
  }
  return null;
}

export async function addUnit(
  token: string,
  type: "carrera" | "materia" | "unidad",
  data: any
) {
  const response = await fetch("http://localhost:4000/api/menu/node", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ type, data }),
  });
  if (!response.ok) throw new Error("Failed to add unit");
  return await response.json();
}

export async function deleteUnit(
  token: string,
  type: "carrera" | "materia" | "unidad",
  id: string | number
) {
  const response = await fetch(
    `http://localhost:4000/api/menu/node/${type}/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) throw new Error("Failed to delete unit");
  return await response.json();
}
