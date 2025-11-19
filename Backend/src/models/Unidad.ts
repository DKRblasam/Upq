export interface Unidad {
  id: number;
  titulo: string;
  contenido?: string | null;
  id_curso: number;
  id_maestro: number;
  created_at: string;
  updated_at: string;
}

export interface VCursosCompletos {
  id: number;
  curso_nombre: string;
  curso_descripcion: string | null;
  cuatri: number;

  carrera_id: number;
  carrera_nombre: string;

  num_maestros: number;
  num_unidades: number;
}
