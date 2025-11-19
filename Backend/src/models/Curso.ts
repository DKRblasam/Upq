export interface Curso {
  id: number;
  nombre: string;
  descripcion?: string | null;
  id_carrera: number;
  cuatri: number;      // 1..12
  created_at: string;
  updated_at: string;
}
