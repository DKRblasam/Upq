
## 📄 `Frontend/README.md`

# 🎨 Frontend - Astro 5

Interfaz web construida con Astro 5 que consume la API REST del backend.

## 📁 Estructura

```
Frontend/
├── public/              # Assets estáticos
│   ├── favicon.svg
│   └── images/
├── src/
│   ├── components/      # Componentes reutilizables
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   └── Card.astro
│   ├── layouts/         # Layouts base
│   │   └── Layout.astro
│   ├── pages/           # Rutas (file-based routing)
│   │   ├── index.astro
│   │   ├── login.astro
│   │   ├── carreras/
│   │   │   ├── index.astro
│   │   │   └── [id].astro
│   │   ├── cursos/
│   │   │   ├── index.astro
│   │   │   └── [id].astro
│   │   └── api/         # API routes (opcional)
│   ├── lib/             # Utilidades
│   │   ├── api.ts       # Cliente fetch
│   │   └── auth.ts      # Helpers de autenticación
│   └── env.d.ts
├── astro.config.mjs
├── package.json
├── tsconfig.json
└── README.md
```

## 🚀 Instalación

```bash
# Instalar dependencias
pnpm install

# Configurar variables de entorno
cp .env.example .env

# Editar URL de la API
# Para obtener las variables comunicate con algun admin
nano .env
```

## ⚙️ Configuración `.env`

```env
# URL del backend
PUBLIC_API_URL=http://localhost:3000/api

# Modo de desarrollo
PUBLIC_DEV_MODE=true
```

## 🏃 Ejecución

```bash
# Desarrollo
pnpm dev

# Preview de build
pnpm build
pnpm preview

# Producción
pnpm build
# Desplegar carpeta dist/
```

## 🌐 Rutas Principales

```
/                    # Home
/login               # Login de usuarios
/carreras            # Listado de carreras
/carreras/[id]       # Detalle de carrera
/cursos              # Listado de cursos
/cursos/[id]         # Detalle de curso
/unidades            # Listado de unidades
/panel               # Dashboard (auth)
/panel/maestros      # Gestión de maestros (admin)
/panel/usuarios      # Gestión de usuarios (admin)
```

## 🔄 Fetch a la API

### Cliente API (`src/lib/api.ts`)

```typescript
const API_URL = import.meta.env.PUBLIC_API_URL;

export async function fetchAPI(endpoint: string, options = {}) {
  const token = localStorage.getItem('token');
  
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json();
}
```

### Uso en páginas

```astro
---
// pages/carreras/index.astro
import Layout from '@layouts/Layout.astro';
import { fetchAPI } from '@lib/api';

const carreras = await fetchAPI('/carreras');
---

<Layout title="Carreras">
  <h1>Carreras Disponibles</h1>
  <ul>
    {carreras.map(c => (
      <li>
        <a href={`/carreras/${c.id}`}>{c.nombre}</a>
      </li>
    ))}
  </ul>
</Layout>
```

## 🎨 Estilos

Astro soporta:
- CSS nativo (scoped por defecto)
- Sass/SCSS
- Tailwind CSS (recomendado)

### Tailwind (opcional)

```bash
pnpm astro add tailwind
```

## 🔐 Autenticación

### Helper de Auth (`src/lib/auth.ts`)

```typescript
export function saveToken(token: string) {
  localStorage.setItem('token', token);
}

export function getToken(): string | null {
  return localStorage.getItem('token');
}

export function isAuthenticated(): boolean {
  return !!getToken();
}

export function logout() {
  localStorage.removeItem('token');
  window.location.href = '/login';
}
```

### Proteger rutas

```astro
---
// pages/panel.astro
import { isAuthenticated } from '@lib/auth';

if (!isAuthenticated()) {
  return Astro.redirect('/login');
}
---
```

## 🧩 Componentes Comunes

### Card de Curso

```astro
---
// components/CursoCard.astro
interface Props {
  nombre: string;
  descripcion: string;
  cuatri: number;
  id: number;
}

const { nombre, descripcion, cuatri, id } = Astro.props;
---

<div class="curso-card">
  <h3>{nombre}</h3>
  <p>{descripcion}</p>
  <span>Cuatrimestre {cuatri}</span>
  <a href={`/cursos/${id}`}>Ver más →</a>
</div>

<style>
.curso-card {
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 8px;
}
</style>
```

## 📦 Scripts Disponibles

```json
{
  "dev": "Servidor de desarrollo",
  "build": "Build de producción",
  "preview": "Preview del build",
  "astro": "CLI de Astro"
}
```

## 🔧 Configuración Astro

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'server', // SSR
  // output: 'static', // SSG
  server: {
    port: 4321,
  },
});
```

## 🚨 Troubleshooting

### Error: "fetch is not defined"

Astro 5 incluye fetch global. Si usas versión anterior:

```bash
pnpm add node-fetch
```

### Error: "Cannot access localStorage"

`localStorage` solo funciona en el cliente. Usa:

```astro
<script>
  // Código cliente aquí
  const token = localStorage.getItem('token');
</script>
```

### CORS Error

Verifica que el backend tenga CORS habilitado:

```typescript
// Backend: app.ts
app.use(cors({
  origin: 'http://localhost:4321'
}));
```

## 🎯 Próximas Funcionalidades

- [ ] Dashboard interactivo
- [ ] Sistema de notificaciones
- [ ] Upload de archivos
- [ ] Modo oscuro
- [ ] PWA

## 🤝 Contribuir

1. Crea un branch: `git checkout -b feature/nueva-pagina`
2. Commit: `git commit -m 'Add: nueva página'`
3. Push: `git push origin feature/nueva-pagina`
4. Abre un Pull Request

---

**Frontend Version:** 1.0.0
