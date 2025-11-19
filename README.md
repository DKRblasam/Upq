
# 🎓 Sistema LMS Interno - Escuela

Sistema de gestión de aprendizaje (LMS) interno para administración de carreras, cursos, maestros y contenido educativo.

## 🏗️ Arquitectura

- **Backend:** Express + TypeScript + MySQL
- **Frontend:** Astro 5 (SSR + fetch dinámico a API)
- **Base de datos:** MySQL con stored procedures y triggers

## 🚀 Características

- ✅ Sistema de roles (Superadm, adm, teach, User)
- ✅ Gestión de carreras y cursos
- ✅ Asignación de maestros a cursos
- ✅ Creación de unidades por maestros
- ✅ Autenticación JWT
- ✅ Validaciones en base de datos
- ✅ API REST completa

## 📁 Estructura del Proyecto

```
.
├── Backend/           # API REST (Express + TypeScript)
├── Frontend/          # Interfaz web (Astro 5)
├── docs/              # Documentación adicional
├── LICENSE
└── README.md
```

## 🔧 Requisitos

- Node.js 18+
- MySQL 8.0+
- pnpm (recomendado)

## ⚡ Inicio Rápido

### 1. Clonar repositorio

```bash
git clone https://github.com/tu-usuario/tu-repo.git
cd tu-repo
```

### 2. Configurar Backend

```bash
cd Backend
pnpm install
cp .env.example .env
# Edita .env con tus credenciales de MySQL
pnpm dev
```

### 3. Configurar Frontend

```bash
cd Frontend
pnpm install
cp .env.example .env
# Configura la URL de la API
pnpm dev
```

### 4. Importar base de datos

```bash
mysql -u root -p < Backend/src/config/base.sql
```

## 📖 Documentación

- [Backend README](./Backend/README.md)
- [Frontend README](./Frontend/README.md)
- [Guía de Contribución](./CONTRIBUTING.md)
- [Código de Conducta](./CODE_OF_CONDUCT.md)

## 👥 Roles del Sistema

| Rol | Permisos |
|-----|----------|
| **Superadm** | Control total del sistema |
| **adm** | Administra carreras y cursos |
| **teach** | Crea y edita unidades en sus cursos asignados |
| **User** | Solo lectura (estudiante) |

## 🔐 Usuarios de Prueba

| Usuario | Contraseña | Rol |
|---------|-----------|-----|
| `superadmin` | `admin123` | Superadm |
| `admin` | `admin123` | adm |
| `jperez` | `maestro123` | teach |
| `estudiante1` | `user123` | User |

## 🛠️ Stack Tecnológico

### Backend
- Express.js
- TypeScript
- MySQL2
- JWT (jsonwebtoken)
- bcryptjs
- Helmet + CORS

### Frontend
- Astro 5
- TypeScript
- TailwindCSS (opcional)

## 📝 Licencia

MIT License - ver [LICENSE](./LICENSE)

## 🤝 Contribuir

Lee nuestra [Guía de Contribución](./CONTRIBUTING.md) antes de enviar PRs.

## 📧 Contacto

Para dudas o sugerencias, abre un issue en GitHub.

---

**Hecho con ☕ por [DAVID BLAS]**
