## 📄 `Backend/README.md`


# 🔥 Backend - API REST

API REST construida con Express + TypeScript + MySQL para el sistema LMS interno.

## 📁 Estructura

```
Backend/
├── src/
│   ├── config/          # Configuración (DB, env)
│   │   ├── db.ts
│   │   └── base.sql
│   ├── controllers/     # Lógica de negocio
│   │   ├── auth.controller.ts
│   │   ├── usuario.controller.ts
│   │   ├── carrera.controller.ts
│   │   ├── curso.controller.ts
│   │   ├── maestro.controller.ts
│   │   └── unidad.controller.ts
│   ├── middlewares/     # Auth, roles, validaciones
│   │   └── auth.ts
│   ├── models/          # Interfaces TypeScript
│   │   ├── Usuario.ts
│   │   ├── Carrera.ts
│   │   ├── Curso.ts
│   │   ├── CursoMaestro.ts
│   │   └── Unidad.ts
│   ├── routes/          # Rutas de la API
│   │   ├── auth.routes.ts
│   │   ├── usuario.routes.ts
│   │   ├── carrera.routes.ts
│   │   ├── curso.routes.ts
│   │   ├── maestro.routes.ts
│   │   └── unidad.routes.ts
│   ├── types/           # Tipos globales
│   ├── app.ts           # Configuración Express
│   └── server.ts        # Punto de entrada
├── .env.example
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

# Editar .env con tus credenciales
nano .env
```

## ⚙️ Configuración `.env`

```env
# Puerto del servidor
PORT=3000

# Base de datos MySQL
DB_URL=mysql://usuario:password@localhost:3306/escuela_lms

# JWT Secret (cámbialo por uno seguro)
JWT_SECRET=tu_clave_secreta_super_segura_aqui_2025
```

## 🗄️ Base de Datos

### Importar esquema

```bash
mysql -u root -p escuela_lms < src/config/base.sql
```

### Tablas principales

- `usuarios` - Usuarios del sistema
- `carreras` - Programas educativos
- `cursos` - Materias dentro de carreras
- `cursos_maestros` - Relación N:M entre cursos y maestros
- `unidades` - Contenido creado por maestros

### Vistas útiles

- `v_cursos_completos` - Cursos con info agregada
- `v_maestros_cursos` - Maestros con sus cursos asignados

## 🏃 Ejecución

```bash
# Desarrollo (con hot reload)
pnpm dev

# Producción
pnpm build
pnpm start
```

## 📡 Endpoints Principales

### 🔐 Autenticación

```http
POST /api/auth/login
Content-Type: application/json

{
  "usuario": "superadmin",
  "passw": "admin123"
}
```

### 👤 Usuarios

```http
GET    /api/usuarios           # Listar (requiere auth)
GET    /api/usuarios/:id       # Ver uno
POST   /api/usuarios           # Crear (admin)
PUT    /api/usuarios/:id       # Actualizar (admin)
DELETE /api/usuarios/:id       # Desactivar (admin)
```

### 🎓 Carreras

```http
GET    /api/carreras
GET    /api/carreras/:id
POST   /api/carreras           # (admin)
PUT    /api/carreras/:id       # (admin)
DELETE /api/carreras/:id       # (admin)
```

### 📚 Cursos

```http
GET    /api/cursos
GET    /api/cursos/:id
POST   /api/cursos             # (admin)
PUT    /api/cursos/:id         # (admin)
DELETE /api/cursos/:id         # (admin)
```

### 👨‍🏫 Maestros

```http
GET  /api/maestros              # Listar maestros
GET  /api/maestros/:id/cursos   # Cursos del maestro
POST /api/maestros/asignar      # Asignar curso a maestro (admin)
```

### 📖 Unidades

```http
GET    /api/unidades
GET    /api/unidades/:id
POST   /api/unidades           # (maestro o admin)
PUT    /api/unidades/:id       # (maestro o admin)
DELETE /api/unidades/:id       # (admin)
```

## 🔒 Autenticación

Todas las rutas excepto `/api/auth/login` requieren token JWT:

```http
Authorization: Bearer <tu_token_jwt>
```

## 🛡️ Middleware de Roles

```typescript
// Ejemplo: solo admin puede acceder
router.post('/carreras', verifyToken, checkRole('Superadm', 'adm'), createCarrera);

// Roles disponibles:
// - Superadm: Control total
// - adm: Gestión de carreras/cursos
// - teach: Creación de unidades
// - User: Solo lectura
```

## 🧪 Testing

Usa el archivo `src/test/api.http` con REST Client (VSCode):

```bash
# Instala la extensión REST Client en VSCode
# Abre src/test/api.http
# Click en "Send Request" sobre cada endpoint
```

## 🐛 Debug

```bash
# Modo verbose
DEBUG=* pnpm dev

# Solo logs de DB
DEBUG=db:* pnpm dev
```

## 📦 Scripts Disponibles

```json
{
  "dev": "ts-node-dev con hot reload",
  "build": "Compilar TypeScript",
  "start": "Ejecutar build"
}
```

## 🔧 Tecnologías

- **Express** 5.x - Framework web
- **TypeScript** 5.x - Tipado estático
- **MySQL2** - Driver MySQL con Promises
- **JWT** - Autenticación stateless
- **bcryptjs** - Hash de contraseñas
- **Helmet** - Seguridad HTTP
- **CORS** - Cross-Origin Resource Sharing

## 🚨 Troubleshooting

### Error: "Cannot connect to MySQL"

```bash
# Verifica que MySQL esté corriendo
sudo systemctl status mysql

# Verifica credenciales en .env
mysql -u tu_usuario -p
```

### Error: "JWT Secret not defined"

Asegúrate de tener `JWT_SECRET` en tu `.env`

### Error: "Port already in use"

```bash
# Cambia el puerto en .env o mata el proceso
lsof -ti:3000 | xargs kill -9
```

## 🤝 Contribuir

1. Crea un branch: `git checkout -b feature/nueva-funcionalidad`
2. Commit: `git commit -m 'Add: nueva funcionalidad'`
3. Push: `git push origin feature/nueva-funcionalidad`
4. Abre un Pull Request

## 📝 Convenciones

- **Commits:** Conventional Commits (`feat:`, `fix:`, `docs:`)
- **Código:** ESLint + Prettier (próximamente)
- **Nombres:** camelCase para variables, PascalCase para tipos

---

**API Version:** 1.0.0

