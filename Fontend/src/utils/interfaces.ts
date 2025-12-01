export interface Contenido {
  title: string;
  videoId: string;
  backgroundImage: string;
}

export interface Unidad {
  name: string;
  contenidos: Contenido[];
}

export interface Materia {
  name: string;
  unidades: Unidad[];
}

export interface Cuatrimestre {
  number: number;
  materias: Materia[];
}

export interface Career {
  name: string;
  cuatrimestres: Cuatrimestre[];
}
