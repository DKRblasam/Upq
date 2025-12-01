// src/lib/api.ts
const API = 'http://localhost:4000/api/menu/hierarchy';

export async function getCarrera(id: number) {
  const res = await fetch(`${API}/${id}`);
  if (!res.ok) throw new Error('Error fetching carrera');
  return res.json();
}

export async function getMateria(id: number) {
  const res = await fetch(`http://localhost:4000/api/materias/${id}`);
  if (!res.ok) throw new Error('Error fetching materia');
  return res.json();
}

export async function getUnidad(id: number) {
  const res = await fetch(`http://localhost:4000/api/unidades/${id}`);
  if (!res.ok) throw new Error('Error fetching unidad');
  return res.json();
}
