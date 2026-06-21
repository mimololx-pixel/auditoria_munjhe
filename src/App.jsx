import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Resumen from './components/Resumen'
import InyeccionSQL from './components/InyeccionSQL'
import XSS from './components/XSS'
import Comandos from './components/Comandos'

/* Strings completos — Tailwind 4 no detecta clases dinámicas (ver CLAUDE.md) */
const COLOR_MAP = {
  blue:    { border: 'border-blue-400',    bgActive: 'bg-blue-900/40',    dot: 'bg-blue-400'    },
  indigo:  { border: 'border-indigo-400',  bgActive: 'bg-indigo-900/40',  dot: 'bg-indigo-400'  },
  red:     { border: 'border-red-400',     bgActive: 'bg-red-900/40',     dot: 'bg-red-400'     },
  emerald: { border: 'border-emerald-400', bgActive: 'bg-emerald-900/40', dot: 'bg-emerald-400' },
  amber:   { border: 'border-amber-400',   bgActive: 'bg-amber-900/40',   dot: 'bg-amber-400'   },
  purple:  { border: 'border-purple-400',  bgActive: 'bg-purple-900/40',  dot: 'bg-purple-400'  },
  teal:    { border: 'border-teal-400',    bgActive: 'bg-teal-900/40',    dot: 'bg-teal-400'    },
  gray:    { border: 'border-gray-500',    bgActive: 'bg-gray-800',       dot: 'bg-gray-500'    },
}

/*
 * Define aquí las secciones de la auditoría. Cada sección debe tener un .md
 * espejo en docs_munjhe/ (esa es la entrega evaluable — ver CLAUDE.md).
 * `completada: true` activa el check y el punto de color en la navegación.
 */
const secciones = [
  // ── Informe A · Análisis de Vulnerabilidades ──
  { id: 'resumen',     label: '01 · Resumen',              componente: Resumen, completada: true,  color: 'blue'    },
  { id: 'sqli',        label: '02 · Inyección SQL',        componente: InyeccionSQL, completada: true, color: 'red'     },
  { id: 'xss',         label: '03 · XSS',                  componente: XSS,     completada: true,  color: 'amber'   },
  { id: 'comandos',    label: '04 · Inyección de comandos', componente: Comandos, completada: true, color: 'purple'  },
  // ── Informe B · Matriz de Riesgo ──
  { id: 'activos',     label: '05 · Activos',              componente: null,    completada: false, color: 'emerald' },
  { id: 'matriz',      label: '06 · Matriz de riesgo',     componente: null,    completada: false, color: 'teal'    },
  { id: 'controles',   label: '07 · Controles',            componente: null,    completada: false, color: 'indigo'  },
  { id: 'recuperacion', label: '08 · Recuperación',        componente: null,    completada: false, color: 'blue'    },
  // ── Transversal ──
  { id: 'prompts',     label: '09 · Bitácora de IA',       componente: null,    completada: false, color: 'gray'    },
]

const completadas = secciones.filter((s) => s.completada).length

function Placeholder({ label }) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center">
      <div className="inline-block bg-gray-100 rounded-full px-4 py-1 text-sm text-gray-500 mb-4">En construcción</div>
      <h2 className="text-2xl font-semibold text-gray-700">Sección "{label}" próximamente</h2>
      <p className="text-gray-500 mt-2">Este componente se agregará en la siguiente fase del proyecto.</p>
    </div>
  )
}

/* Ícono hamburguesa */
function IconMenu() {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ width: '24px', height: '24px' }}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  )
}

/* Ícono X */
function IconX() {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ width: '24px', height: '24px' }}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}

/* Lista de items de navegación (reutilizada en desktop y drawer) */
function NavItems({ activa, setActiva, onSelect }) {
  return secciones.map((s) => {
    const cols = COLOR_MAP[s.color]
    const esActiva = activa === s.id
    return (
      <button
        key={s.id}
        onClick={() => { setActiva(s.id); onSelect?.() }}
        className={`w-full text-left px-5 py-3 text-sm transition-all ${
          esActiva
            ? `${cols.bgActive} text-white font-medium border-l-4 ${cols.border}`
            : 'text-gray-400 hover:bg-gray-800/60 hover:text-gray-200 border-l-4 border-transparent'
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2.5">
            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${s.completada ? cols.dot : 'bg-gray-600'}`} />
            {s.label}
          </span>
          {s.completada && (
            <span className="text-xs text-green-400 opacity-70 shrink-0">✓</span>
          )}
        </div>
      </button>
    )
  })
}

/* Barra de progreso + header de sidebar */
function SidebarHeader() {
  const pct = secciones.length ? Math.round((completadas / secciones.length) * 100) : 0
  return (
    <>
      <div className="px-6 py-5 border-b border-gray-700">
        <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">Proyecto · Auditoría</p>
        <h1 className="text-base font-bold leading-tight">
          Auditoría munjhe<br />
          <span className="font-normal text-gray-300">Informe de auditoría</span>
        </h1>
      </div>
      <div className="px-6 py-3 border-b border-gray-700">
        <div className="flex justify-between text-xs text-gray-400 mb-1.5">
          <span>Progreso del informe</span>
          <span className="text-green-400 font-medium">{completadas} / {secciones.length}</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full" style={{ height: '4px' }}>
          <div className="bg-green-400 rounded-full transition-all" style={{ height: '4px', width: `${pct}%` }} />
        </div>
      </div>
    </>
  )
}

function SidebarFooter() {
  return (
    <div className="px-6 py-4 border-t border-gray-700 text-xs text-gray-500">
      INACAP · 2026
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════ */
function App() {
  const [activa, setActiva] = useState(secciones[0]?.id)
  const [menuAbierto, setMenuAbierto] = useState(false)

  const seccionActual = secciones.find((s) => s.id === activa)
  const Componente = seccionActual?.componente

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">

      {/* ── Sidebar desktop ── */}
      <aside className="hidden md:flex flex-col w-64 bg-gray-900 text-white shrink-0">
        <SidebarHeader />
        <nav className="flex-1 overflow-y-auto py-2">
          <NavItems activa={activa} setActiva={setActiva} />
        </nav>
        <SidebarFooter />
      </aside>

      {/* ── Wrapper móvil + contenido ── */}
      <div className="flex-1 flex flex-col min-h-screen">

        {/* Barra top móvil */}
        <div className="md:hidden bg-gray-900 text-white px-4 py-3 flex items-center justify-between shrink-0 relative z-10">
          <div>
            <p className="text-xs text-gray-400 leading-none mb-0.5">Auditoría munjhe</p>
            <p className="text-sm font-bold leading-tight">{seccionActual?.label}</p>
          </div>
          <button
            onClick={() => setMenuAbierto(!menuAbierto)}
            className="text-gray-300 hover:text-white transition-colors p-1"
            aria-label="Menú"
          >
            {menuAbierto ? <IconX /> : <IconMenu />}
          </button>
        </div>

        {/* Drawer móvil — slide desde izquierda con backdrop */}
        <AnimatePresence>
          {menuAbierto && (
            <>
              {/* Backdrop */}
              <motion.div
                key="backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="md:hidden fixed inset-0 bg-black/75 backdrop-blur-sm z-30"
                onClick={() => setMenuAbierto(false)}
              />
              {/* Drawer */}
              <motion.aside
                key="drawer"
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 28, stiffness: 280 }}
                style={{ backgroundColor: '#111827' }}
                className="md:hidden fixed top-0 left-0 bottom-0 w-72 text-white z-40 flex flex-col shadow-2xl border-r border-gray-700"
              >
                <SidebarHeader />
                <nav className="flex-1 overflow-y-auto py-2">
                  <NavItems activa={activa} setActiva={setActiva} onSelect={() => setMenuAbierto(false)} />
                </nav>
                <SidebarFooter />
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Contenido principal */}
        <main className="flex-1 overflow-y-auto">
          {Componente ? <Componente /> : <Placeholder label={seccionActual?.label} />}
        </main>

      </div>
    </div>
  )
}

export default App
