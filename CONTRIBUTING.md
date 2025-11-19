
## 📄 `CONTRIBUTING.md`
# 🤝 Guía de Contribución

¡Gracias por tu interés en contribuir! Este documento te guiará para que tu colaboración sea efectiva y sin fricción.

## 📋 Tabla de Contenidos

- [Código de Conducta](#código-de-conducta)
- [¿Cómo contribuir?](#cómo-contribuir)
- [Proceso de Pull Request](#proceso-de-pull-request)
- [Estándares de Código](#estándares-de-código)
- [Estructura de Commits](#estructura-de-commits)
- [Reportar Bugs](#reportar-bugs)
- [Sugerir Features](#sugerir-features)

## 📜 Código de Conducta

Este proyecto sigue el [Contributor Covenant](./CODE_OF_CONDUCT.md). Al participar, te comprometes a mantener un ambiente respetuoso y colaborativo.

## 🚀 ¿Cómo contribuir?

### 1. Fork del repositorio

```bash
# Haz fork desde GitHub
# Clona tu fork
git clone https://github.com/DKRblasam/Upq.git
cd Upq

# Agrega el repositorio original como upstream
git remote add upstream https://github.com/ORIGINAL-OWNER/nombre-repo.git
```

### 2. Crea un branch

```bash
# Actualiza main
git checkout main
git pull upstream main

# Crea branch con nombre descriptivo
git checkout -b feature/nueva-funcionalidad
# o
git checkout -b fix/correccion-bug
```

### 3. Haz tus cambios

- Escribe código limpio y documentado
- Sigue los estándares del proyecto
- Agrega tests si es necesario
- Actualiza documentación relevante

### 4. Commit

```bash
git add .
git commit -m "feat: descripción clara del cambio"
```

### 5. Push y Pull Request

```bash
git push origin feature/nueva-funcionalidad
```

Luego abre un Pull Request desde GitHub.

## 🔄 Proceso de Pull Request

### Checklist antes de enviar PR

- [ ] El código compila sin errores
- [ ] Los tests pasan (si existen)
- [ ] La documentación está actualizada
- [ ] El commit sigue Conventional Commits
- [ ] No hay archivos innecesarios (node_modules, .env, etc.)
- [ ] El branch está actualizado con `main`

### Descripción del PR

```markdown
## Descripción
Breve descripción del cambio.

## Tipo de cambio
- [ ] Bug fix
- [ ] Nueva funcionalidad
- [ ] Breaking change
- [ ] Documentación

## ¿Cómo probarlo?
Pasos para probar tu cambio.

## Screenshots (si aplica)
```

### Revisión

- Responde a los comentarios de manera constructiva
- Realiza los cambios solicitados
- Mantén la conversación profesional

## 📝 Estándares de Código

### Backend (TypeScript)

```typescript
// ✅ BIEN
export const getUsuarios = async (req: Request, res: Response) => {
  try {
    const [rows] = await db.query("SELECT * FROM usuarios");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Error interno" });
  }
};

// ❌ MAL
export const getUsuarios = async (req,res) => {
const [rows]=await db.query("SELECT * FROM usuarios")
res.json(rows)
}
```

### Frontend (Astro)

```astro
---
// ✅ BIEN
import Layout from '@layouts/Layout.astro';

interface Props {
  titulo: string;
}

const { titulo } = Astro.props;
---

<Layout>
  <h1>{titulo}</h1>
</Layout>
```

### Reglas generales

- **Indentación:** 2 espacios
- **Comillas:** Simples en JS/TS
- **Punto y coma:** Opcional pero consistente
- **Nombres:** camelCase para variables, PascalCase para tipos/componentes
- **Imports:** Agrupar y ordenar alfabéticamente

## 💬 Estructura de Commits

Usamos **Conventional Commits**:

```
<tipo>(<scope>): <descripción>

[cuerpo opcional]

[footer opcional]
```

### Tipos válidos

| Tipo | Descripción |
|------|-------------|
| `feat` | Nueva funcionalidad |
| `fix` | Corrección de bug |
| `docs` | Cambios en documentación |
| `style` | Formato, espacios (no afecta código) |
| `refactor` | Refactorización |
| `perf` | Mejora de performance |
| `test` | Agregar/modificar tests |
| `chore` | Cambios en build, deps, etc. |

### Ejemplos

```bash
feat(auth): agregar login con JWT
fix(api): corregir validación de roles
docs(readme): actualizar instrucciones de instalación
refactor(db): optimizar queries de cursos
```

## 🐛 Reportar Bugs

Usa las [GitHub Issues](../../issues) con esta estructura:

```markdown
## Descripción del Bug
¿Qué está fallando?

## Pasos para Reproducir
1. Ir a '...'
2. Hacer click en '...'
3. Ver error

## Comportamiento Esperado
¿Qué debería pasar?

## Comportamiento Actual
¿Qué pasa realmente?

## Screenshots
Si aplica

## Entorno
- OS: [e.g. macOS 13.0]
- Node: [e.g. 18.17.0]
- Navegador: [e.g. Chrome 120]
```

## 💡 Sugerir Features

Abre un [Feature Request](../../issues/new?template=feature_request.md):

```markdown
## Feature
Descripción clara de la funcionalidad.

## Problema que Resuelve
¿Por qué es necesaria?

## Solución Propuesta
¿Cómo funcionaría?

## Alternativas Consideradas
Otras opciones que pensaste.
```

## 🔍 Áreas que Necesitan Ayuda

### Backend
- [ ] Tests unitarios
- [ ] Rate limiting
- [ ] Logging avanzado
- [ ] Documentación Swagger/OpenAPI

### Frontend
- [ ] Componentes UI reutilizables
- [ ] Validación de formularios
- [ ] Sistema de notificaciones
- [ ] Mejoras de accesibilidad (a11y)

### General
- [ ] Docker setup
- [ ] CI/CD con GitHub Actions
- [ ] Guía de deployment
- [ ] Traducciones (i18n)

## 📞 Contacto

<!-- - **Issues:** [GitHub Issues](../../issues)
- **Discussions:** [GitHub Discussions](../../discussions)
- **Email:** [tu-email@ejemplo.com] -->

## 🙏 Agradecimientos

Tu tiempo y esfuerzo son valiosos. ¡Gracias por contribuir a hacer este proyecto mejor!

## PD
**Toda la documentacion referente a este repositorio la esncuentras en:** 
[**Docs 📜**](https://deepwiki.com/DKRblasam/Upq)
---

**Última actualización:** 2025
