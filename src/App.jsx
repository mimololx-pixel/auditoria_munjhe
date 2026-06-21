import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Inicio from './components/Inicio'
import Resumen from './components/Resumen'
import InyeccionSQL from './components/InyeccionSQL'
import XSS from './components/XSS'
import Comandos from './components/Comandos'
import Prompts from './components/Prompts'
import Glosario from './components/Glosario'
import { NavContext } from './nav'

/* Color del punto por sección — strings completos (Tailwind 4 no detecta clases dinámicas, ver CLAUDE.md) */
const DOT = {
  teal: 'bg-teal-400', blue: 'bg-blue-400', red: 'bg-red-400', amber: 'bg-amber-400',
  purple: 'bg-purple-400', emerald: 'bg-emerald-400', cyan: 'bg-cyan-400',
  indigo: 'bg-indigo-400', gray: 'bg-gray-400',
}

/*
 * Estructura de navegación. Las entradas con `grupo` son separadores.
 * Cada sección con contenido tiene su .md espejo en docs_munjhe/ (entrega evaluable).
 * `extra: true` = ayuda de navegación (no cuenta para el progreso del informe).
 */
const secciones = [
  { id: 'inicio', label: 'Inicio', componente: Inicio, color: 'teal', extra: true },

  { grupo: 'Informe A · Vulnerabilidades' },
  { id: 'resumen',  label: '01 · Resumen',               componente: Resumen,      completada: true,  color: 'blue'   },
  { id: 'sqli',     label: '02 · Inyección SQL',         componente: InyeccionSQL, completada: true,  color: 'red'    },
  { id: 'xss',      label: '03 · XSS',                   componente: XSS,          completada: true,  color: 'amber'  },
  { id: 'comandos', label: '04 · Inyección de comandos', componente: Comandos,     completada: true,  color: 'purple' },

  { grupo: 'Informe B · Matriz de riesgo' },
  { id: 'activos',      label: '05 · Activos',          componente: null, completada: false, color: 'emerald' },
  { id: 'matriz',       label: '06 · Matriz de riesgo', componente: null, completada: false, color: 'cyan'    },
  { id: 'controles',    label: '07 · Controles',        componente: null, completada: false, color: 'indigo'  },
  { id: 'recuperacion', label: '08 · Recuperación',     componente: null, completada: false, color: 'blue'    },

  { grupo: 'Más' },
  { id: 'prompts',  label: '09 · Bitácora de IA', componente: Prompts,  completada: true, color: 'gray' },
  { id: 'glosario', label: 'Glosario',            componente: Glosario, color: 'teal', extra: true },
]

const items = secciones.filter((s) => s.id)
const evaluables = items.filter((s) => !s.extra)
const completadas = evaluables.filter((s) => s.completada).length

function Placeholder({ label }) {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20 text-center">
      <div className="inline-block bg-teal-50 text-teal-700 rounded-full px-4 py-1 text-sm mb-4">
        Próximamente
      </div>
      <h2 className="text-2xl font-semibold text-gray-700">{label}</h2>
      <p className="text-gray-500 mt-2">Esta sección es parte del Informe B y se agregará más adelante.</p>
    </div>
  )
}

function IconMenu() {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ width: 24, height: 24 }}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  )
}
function IconX() {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ width: 24, height: 24 }}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}

function NavItems({ activa, setActiva, onSelect }) {
  return secciones.map((s, i) => {
    if (s.grupo) {
      return (
        <p key={`g${i}`} className="px-5 pt-5 pb-1 text-[11px] font-bold uppercase tracking-wider text-gray-400">
          {s.grupo}
        </p>
      )
    }
    const esActiva = activa === s.id
    return (
      <button
        key={s.id}
        onClick={() => { setActiva(s.id); onSelect?.() }}
        className={`w-full text-left px-5 py-2.5 text-sm transition-all border-l-4 ${
          esActiva
            ? 'bg-teal-50 text-teal-800 font-semibold border-teal-500'
            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-transparent'
        }`}
      >
        <span className="flex items-center gap-2.5">
          <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${s.completada ? DOT[s.color] : (s.extra ? DOT[s.color] : 'bg-gray-300')}`} />
          {s.label}
          {s.completada && <span className="ml-auto text-xs text-teal-500">✓</span>}
        </span>
      </button>
    )
  })
}

function SidebarHeader() {
  const pct = evaluables.length ? Math.round((completadas / evaluables.length) * 100) : 0
  return (
    <>
      <div className="px-6 py-5 border-b border-gray-200">
        <p className="text-xs uppercase tracking-widest text-teal-600 mb-1">Auditoría de seguridad</p>
        <h1 className="text-lg font-extrabold leading-tight text-gray-800">Hotel Costa Brava</h1>
      </div>
      <div className="px-6 py-3 border-b border-gray-200">
        <div className="flex justify-between text-xs text-gray-500 mb-1.5">
          <span>Avance del informe</span>
          <span className="text-teal-600 font-semibold">{completadas} / {evaluables.length}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full" style={{ height: 4 }}>
          <div className="bg-teal-500 rounded-full transition-all" style={{ height: 4, width: `${pct}%` }} />
        </div>
      </div>
    </>
  )
}

function SidebarFooter() {
  return (
    <div className="px-6 py-4 border-t border-gray-200 text-xs text-gray-400">
      INACAP · TI3034 · 2026
    </div>
  )
}

function App() {
  const [activa, setActiva] = useState('inicio')
  const [menuAbierto, setMenuAbierto] = useState(false)
  const mainRef = useRef(null)

  useEffect(() => {
    NavContext.go = (id) => { setActiva(id); setMenuAbierto(false) }
  }, [])

  /* Al cambiar de sección, volver al inicio de la página para leer de arriba hacia abajo */
  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0 })
  }, [activa])

  const seccionActual = items.find((s) => s.id === activa)
  const Componente = seccionActual?.componente

  return (
    <div className="flex min-h-screen bg-slate-50 text-gray-800">
      {/* Sidebar desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 shrink-0">
        <SidebarHeader />
        <nav className="flex-1 overflow-y-auto py-2">
          <NavItems activa={activa} setActiva={setActiva} />
        </nav>
        <SidebarFooter />
      </aside>

      <div className="flex-1 flex flex-col min-h-screen">
        {/* Barra superior móvil */}
        <div className="md:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shrink-0 relative z-10">
          <div>
            <p className="text-xs text-teal-600 leading-none mb-0.5">Hotel Costa Brava</p>
            <p className="text-sm font-bold leading-tight text-gray-800">{seccionActual?.label}</p>
          </div>
          <button onClick={() => setMenuAbierto(!menuAbierto)} className="text-gray-600 hover:text-gray-900 p-1" aria-label="Menú">
            {menuAbierto ? <IconX /> : <IconMenu />}
          </button>
        </div>

        {/* Drawer móvil */}
        <AnimatePresence>
          {menuAbierto && (
            <>
              <motion.div
                key="backdrop"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="md:hidden fixed inset-0 bg-black/40 z-30"
                onClick={() => setMenuAbierto(false)}
              />
              <motion.aside
                key="drawer"
                initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 28, stiffness: 280 }}
                className="md:hidden fixed top-0 left-0 bottom-0 w-72 bg-white z-40 flex flex-col shadow-2xl border-r border-gray-200"
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

        <main ref={mainRef} className="flex-1 overflow-y-auto">
          {Componente ? <Componente /> : <Placeholder label={seccionActual?.label} />}
        </main>
      </div>
    </div>
  )
}

export default App
