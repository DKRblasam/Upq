// ===============================
//        TIPOS (Opcional)
// ===============================
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

// ===============================
//     CONTENIDOS POR MATERIA
// ===============================

// ------- Ingeniería en Sistemas -------
const fundamentosMatematicosUnidad1: Unidad = {
  name: "Unidad 1",
  contenidos: [
    {
      title: "Introducción a los números (sin llorar)",
      videoId: "dQw4w9WgXcQ",
      backgroundImage: "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
    },
  ],
};

const inglesI_IS_Unidad1: Unidad = {
  name: "Unidad 1",
  contenidos: [
    {
      title: "Aprende a decir 'Hello' sin acento de robot",
      videoId: "9bZkp7q19f0",
      backgroundImage: "https://i.ytimg.com/vi/9bZkp7q19f0/hqdefault.jpg",
    },
  ],
};

const fundamentosProgramacionUnidad1: Unidad = {
  name: "Unidad 1",
  contenidos: [
    {
      title: "Variables: no son como tus ex, estas sí cambian",
      videoId: "tVlcKp3bWH8",
      backgroundImage: "https://i.ytimg.com/vi/tVlcKp3bWH8/hqdefault.jpg",
    },
  ],
};

const calculoDiferencialUnidad1: Unidad = {
  name: "Unidad 1",
  contenidos: [
    {
      title: "Derivadas para humanos (nivel: sobreviviente)",
      videoId: "fJ9rUzIMcZQ",
      backgroundImage: "https://i.ytimg.com/vi/fJ9rUzIMcZQ/hqdefault.jpg",
    },
  ],
};

const inglesII_IS_Unidad1: Unidad = {
  name: "Unidad 1",
  contenidos: [
    {
      title: "Pronunciación sin invocar espíritus",
      videoId: "3JZ_D3ELwOQ",
      backgroundImage: "https://i.ytimg.com/vi/3JZ_D3ELwOQ/hqdefault.jpg",
    },
  ],
};

const calculoIntegralUnidad1: Unidad = {
  name: "Unidad 1",
  contenidos: [
    {
      title: "Integrales: ahora sí vas a llorar",
      videoId: "L_jWHffIx5E",
      backgroundImage: "https://i.ytimg.com/vi/L_jWHffIx5E/hqdefault.jpg",
    },
  ],
};

const estructuraDatosUnidad1: Unidad = {
  name: "Unidad 1",
  contenidos: [
    {
      title: "Listas, colas y pilas: como tu vida, pero ordenado",
      videoId: "hY7m5jjJ9mM",
      backgroundImage: "https://i.ytimg.com/vi/hY7m5jjJ9mM/hqdefault.jpg",
    },
  ],
};

const basesDatosUnidad1: Unidad = {
  name: "Unidad 1",
  contenidos: [
    {
      title: "Normalización: terapia para tablas traumadas",
      videoId: "kXYi_U_JCYtU",
      backgroundImage: "https://i.ytimg.com/vi/kXYiU_JCYtU/hqdefault.jpg",
    },
  ],
};

// ------- Administración de Empresas -------
const introAdministracionUnidad1: Unidad = {
  name: "Unidad 1",
  contenidos: [
    {
      title: "Qué hace un administrador (además de Excel)",
      videoId: "ktvTqknDobU",
      backgroundImage: "https://i.ytimg.com/vi/ktvTqknDobU/hqdefault.jpg",
    },
  ],
};

const contabilidadBasicaUnidad1: Unidad = {
  name: "Unidad 1",
  contenidos: [
    {
      title: "Sumar y restar sin calculatora (modo experto)",
      videoId: "RgKAFK5djSk",
      backgroundImage: "https://i.ytimg.com/vi/RgKAFK5djSk/hqdefault.jpg",
    },
  ],
};

const mercadotecniaUnidad1: Unidad = {
  name: "Unidad 1",
  contenidos: [
    {
      title: "Cómo vender sin caer en pirámides",
      videoId: "yPYZpwSpKmA",
      backgroundImage: "https://i.ytimg.com/vi/yPYZpwSpKmA/hqdefault.jpg",
    },
  ],
};

const finanzasUnidad1: Unidad = {
  name: "Unidad 1",
  contenidos: [
    {
      title: "Invertir sin perder hasta la camisa",
      videoId: "eVTXPUF4Oz4",
      backgroundImage: "https://i.ytimg.com/vi/eVTXPUF4Oz4/hqdefault.jpg",
    },
  ],
};

// ===============================
//        MATERIAS COMPLETAS
// ===============================

const materiasIngenieriaSistemas = [
  {
    name: "Fundamentos Matemáticos",
    unidades: [fundamentosMatematicosUnidad1],
  },
  {
    name: "Inglés I",
    unidades: [inglesI_IS_Unidad1],
  },
  {
    name: "Fundamentos de Programación",
    unidades: [fundamentosProgramacionUnidad1],
  },

  {
    name: "Cálculo Diferencial",
    unidades: [calculoDiferencialUnidad1],
  },
  {
    name: "Inglés II",
    unidades: [inglesII_IS_Unidad1],
  },

  {
    name: "Cálculo Integral",
    unidades: [calculoIntegralUnidad1],
  },
  {
    name: "Inglés III",
    unidades: [],
  },

  {
    name: "Estructura de Datos",
    unidades: [estructuraDatosUnidad1],
  },
  {
    name: "Inglés IV",
    unidades: [],
  },

  {
    name: "Bases de Datos",
    unidades: [basesDatosUnidad1],
  },
  {
    name: "Inglés V",
    unidades: [],
  },
];

const materiasAdministracion = [
  {
    name: "Introducción a la Administración",
    unidades: [introAdministracionUnidad1],
  },
  {
    name: "Inglés I",
    unidades: [],
  },

  {
    name: "Contabilidad Básica",
    unidades: [contabilidadBasicaUnidad1],
  },
  {
    name: "Inglés II",
    unidades: [],
  },

  {
    name: "Mercadotecnia",
    unidades: [mercadotecniaUnidad1],
  },

  {
    name: "Administración Estratégica",
    unidades: [],
  },

  {
    name: "Finanzas",
    unidades: [finanzasUnidad1],
  },
];

// ===============================
//        CUATRIMESTRES
// ===============================

const cuatrimestresIngenieria: Cuatrimestre[] = [
  { number: 1, materias: materiasIngenieriaSistemas.slice(0, 3) },
  { number: 2, materias: materiasIngenieriaSistemas.slice(3, 5) },
  { number: 3, materias: materiasIngenieriaSistemas.slice(5, 7) },
  { number: 4, materias: materiasIngenieriaSistemas.slice(7, 9) },
  { number: 5, materias: materiasIngenieriaSistemas.slice(9, 11) },
];

const cuatrimestresAdministracion: Cuatrimestre[] = [
  { number: 1, materias: materiasAdministracion.slice(0, 2) },
  { number: 2, materias: materiasAdministracion.slice(2, 4) },
  { number: 3, materias: materiasAdministracion.slice(4, 5) },
  { number: 4, materias: materiasAdministracion.slice(5, 6) },
  { number: 5, materias: materiasAdministracion.slice(6, 7) },
];

// ===============================
//        EXPORT FINAL
// ===============================

export const careers: Career[] = [
  {
    name: "Ingeniería en Sistemas",
    cuatrimestres: cuatrimestresIngenieria,
  },
  {
    name: "Administración de Empresas",
    cuatrimestres: cuatrimestresAdministracion,
  },
];
