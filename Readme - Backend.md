# 📁 Estructura Inicial del Backend (Express + TypeScript)

Esta será **la estructura oficial y definitiva** sobre la cual construiremos TODO el backend.

```
backend/
├── src/
│   ├── config/
│   │   └── db.ts
│   ├── middlewares/
│   │   ├── auth.ts
│   │   └── roles.ts
│   ├── models/
│   │   ├── Usuario.ts
│   │   ├── Rol.ts
│   │   ├── UserRole.ts
│   │   ├── Carrera.ts
│   │   ├── Curso.ts
│   │   ├── CursoMaestro.ts
│   │   └── Unidad.ts
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   ├── usuario.controller.ts
│   │   ├── carrera.controller.ts
│   │   ├── curso.controller.ts
│   │   ├── maestro.controller.ts
│   │   └── unidad.controller.ts
│   ├── routes/
│   │   ├── auth.routes.ts
│   │   ├── usuario.routes.ts
│   │   ├── carrera.routes.ts
│   │   ├── curso.routes.ts
│   │   ├── maestro.routes.ts
│   │   └── unidad.routes.ts
│   ├── utils/
│   │   ├── jwt.ts
│   │   ├── hash.ts
│   │   └── response.ts
│   ├── server.ts
│   └── app.ts
├── .env
├── package.json
├── tsconfig.json
└── README.md
```

---

# 📌 Archivos iniciales (base vacía lista para llenar)

---

## `src/app.ts`

```ts
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import authRoutes from './routes/auth.routes';

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

// Rutas principales
app.use('/api/auth', authRoutes);

export default app;
```

---

## `src/server.ts`

```ts
import app from './app';
import { db } from './config/db';

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await db.getConnection();
    console.log('🟢 DB conectada');

    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
    });
  } catch (err) {
    console.error('🔴 Error iniciando servidor:', err);
  }
}

start();
```

---

## `src/config/db.ts`

```ts
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  connectionLimit: 10,
});
```

---

## `src/routes/auth.routes.ts`

```ts
import { Router } from 'express';
const router = Router();

router.post('/login', (req, res) => {
  res.send('login pending');
});

export default router;
```

---

## `.env (ejemplo)`

```
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASS=123456
DB_NAME=escuela_lms
JWT_SECRET=supersecreto123
```

---

# ✔️ Estructura fijada

Esta es la **estructura base fija**, NO se moverá. A partir de aquí construiremos:

* autenticación JWT
* permisos por roles
* asignación maestro–curso
* CRUDs por recursos
* validaciones
* seguridad

Cuando digas, empezamos con la **autenticación + modelo de usuarios**.
