
import { Carrera } from "./Carrera";
import { Unidad } from "./Unidad";
import { Usuario } from "./Usuario";
import { Curso } from "./Curso";

export interface CursoDetalle extends Curso {
  carrera?: Carrera;
  maestros?: Usuario[];
  unidades?: Unidad[];
}

export interface MaestroConCursos extends Usuario {
  cursos?: Curso[];
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


export interface VMaestrosCursos {
  maestro_id: number;
  maestro_nombre: string;
  maestro_usuario: string;

  curso_id: number;
  curso_nombre: string;
  carrera_nombre: string;
  cuatri: number;

  asignacion_id: number;
}
