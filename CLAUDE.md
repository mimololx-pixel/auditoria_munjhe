# Proyecto auditoria_munjhe — Metodología y forma de trabajo

> Este documento captura **cómo se trabajó** el proyecto hermano `informe_mu-jhe` para
> replicar la misma metodología aquí. Sirve de guía tanto para una persona como para una
> sesión nueva de Claude Code (se auto-carga al abrir la carpeta).

---

## 🔴 REGLA DE ORO (lección aprendida — NO repetir el error)

**El contenido evaluable vive en los `.md` de `docs_munjhe/`, NO en los componentes React.**

En el proyecto anterior se desarrolló el contenido **directamente en los componentes `.jsx`**
y los `.md` de `docs/` quedaron vacíos. Como la rúbrica/informe especifica que **se evalúan los
`.md` de `docs/`**, el profesor evaluó archivos vacíos → la nota bajó significativamente. Fue un
problema de **formato de entrega**, no solo de "olvidar commitear".

**Cómo evitarlo:**
1. Cada sección de la auditoría se escribe **primero (o en paralelo) en su `.md`** dentro de
   `docs_munjhe/`. Los componentes React solo **visualizan/presentan** ese contenido.
2. Mantener `.md` y `.jsx` **sincronizados**: si cambia el contenido en el componente, reflejarlo
   en el `.md`.
3. Antes de **cada commit**, correr `git status` y verificar que los `.md` de la fase estén
   actualizados y stageados, no solo los `.jsx`.

---

## Stack

- **React 19** + **Vite 8** (`@vitejs/plugin-react`)
- **Tailwind CSS v4** vía `@tailwindcss/postcss` + `autoprefixer`
- **framer-motion** para animaciones (drawer móvil, transiciones de sección)
- **ESLint** (flat config) con plugins react-hooks y react-refresh

### Comandos

```bash
npm install      # instalar dependencias
npm run dev      # servidor de desarrollo (Vite)
npm run build    # build de producción → dist/
npm run preview  # previsualizar el build
npm run lint     # ESLint
```

---

## Estructura del proyecto

```
auditoria_munjhe/
├── CLAUDE.md              ← este documento
├── README.md
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── eslint.config.js
├── docs_munjhe/          ← 📌 LA ENTREGA EVALUABLE (un .md por sección)
│   └── 00_plantilla_munjhe.md
└── src/
    ├── main.jsx
    ├── index.css         ← @import "tailwindcss" + tipografía base
    ├── App.jsx           ← shell de navegación (array `secciones` + COLOR_MAP)
    └── components/        ← un .jsx por sección, espejo de cada .md
        └── Plantilla.jsx
```

### Patrón clave: 1 componente ↔ 1 `.md`

Cada sección del informe tiene **dos archivos espejo**:
- `docs_munjhe/0N_nombre_munjhe.md` → el contenido (lo que se evalúa).
- `src/components/Nombre.jsx` → la presentación interactiva de ese contenido.

Las secciones se registran en el array `secciones` de `src/App.jsx`
(`{ id, label, componente, completada, color }`), que genera el sidebar navegable.

---

## Convenciones Tailwind v4

- El CSS entra con `@import "tailwindcss";` al inicio de `src/index.css` (no `@tailwind base/...`).
- **Tailwind v4 no detecta clases dinámicas** construidas por interpolación de strings. Para clases
  que dependen de una variable (p.ej. color por sección), usar un **object-map con strings completos**
  (ver `COLOR_MAP` en `src/App.jsx`), nunca `` `bg-${color}-400` ``.
- Evitar tooltips dentro de `<td>` (problemas de overflow/posicionamiento).
- Estilo base del informe en `src/index.css`: Arial 18px/1.5, `p { text-align: justify }`.

---

## Flujo de trabajo (fases)

1. **Esperar instrucción explícita** antes de iniciar una fase ("ejecuta la fase X"). No asumir.
2. Desarrollar la sección: escribir el contenido en su `.md` **y** construir/actualizar su `.jsx`.
3. `git status` → verificar que entren **ambos** (`.md` + `.jsx`).
4. Commit descriptivo (`feat: fase N — <sección>`).
5. Push a `main`.

---

## GitHub

- Repo: `https://github.com/mimololx-pixel/auditoria_munjhe.git` (remote **sin token embebido**).
- ⚠️ **Seguridad:** no embeber el PAT en la URL del remote (queda en texto plano en `.git/config`).
  Usar un credential helper o `gh auth login`. El token del proyecto anterior estaba expuesto y
  debería rotarse.

---

## Deploy en Vercel

- Conectar el repo de GitHub en el dashboard de Vercel.
- Preset **Vite** autodetectado: build `vite build`, output `dist/`.
- No hace falta `vercel.json`. `dist/` está en `.gitignore`; Vercel buildea desde el push a `main`.
- Cada push a `main` dispara un deploy automático.
