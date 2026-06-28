import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { QRCodeSVG } from 'qrcode.react'
import IndiceLateral from './components/IndiceLateral'
import Inicio from './components/Inicio'
import Resumen from './components/Resumen'
import InyeccionSQL from './components/InyeccionSQL'
import XSS from './components/XSS'
import Comandos from './components/Comandos'
import Activos from './components/Activos'
import Matriz from './components/Matriz'
import Controles from './components/Controles'
import Recuperacion from './components/Recuperacion'
import Prompts from './components/Prompts'
import Glosario from './components/Glosario'
import { ProgresoLectura, BotonSubir } from './components/ui'
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

  { grupo: 'Vulnerabilidades' },
  { id: 'resumen',  label: 'Introducción',          componente: Resumen,      color: 'blue'   },
  { id: 'sqli',     label: 'Inyección SQL',         componente: InyeccionSQL, color: 'red'    },
  { id: 'xss',      label: 'XSS',                   componente: XSS,          color: 'amber'  },
  { id: 'comandos', label: 'Inyección de comandos', componente: Comandos,     color: 'purple' },

  { grupo: 'Gestión de riesgo' },
  { id: 'activos',      label: 'Activos y riesgos', componente: Activos,      color: 'emerald' },
  { id: 'matriz',       label: 'Matriz de riesgo',  componente: Matriz,       color: 'cyan'    },
  { id: 'controles',    label: 'Controles',         componente: Controles,    color: 'indigo'  },
  { id: 'recuperacion', label: 'Recuperación',      componente: Recuperacion, color: 'blue'    },

  { grupo: 'Recursos' },
  { id: 'prompts',  label: 'Bitácora de IA', componente: Prompts,  color: 'gray' },
  { id: 'glosario', label: 'Glosario',       componente: Glosario, color: 'teal', extra: true },
]

const items = secciones.filter((s) => s.id)

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
        <p key={`g${i}`} className="px-5 pt-5 pb-1 text-[11px] font-bold uppercase tracking-wider text-white/40">
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
            ? 'bg-white/10 text-white font-semibold border-cyan-400'
            : 'text-white/65 hover:bg-white/5 hover:text-white border-transparent'
        }`}
      >
        <span className="flex items-center gap-2.5">
          <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${DOT[s.color] ?? 'bg-white/30'}`} />
          {s.label}
        </span>
      </button>
    )
  })
}

function SidebarHeader() {
  return (
    <div className="px-6 py-5 border-b border-white/10">
      <p className="text-xs uppercase tracking-widest text-cyan-300 mb-1">Wiki de seguridad</p>
      <h1 className="text-xl font-extrabold leading-tight text-white">Hotel Costa Brava</h1>
    </div>
  )
}

const REPO_URL = 'https://github.com/mimololx-pixel/auditoria_munjhe'
const SITE_URL = 'https://auditoria-munjhe.vercel.app'

/* Logo de GitHub (lucide ya no incluye iconos de marca) */
function IconGithub({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 2.9-.39c.98 0 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14 0 1.55-.01 2.8-.01 3.18 0 .31.21.68.8.56C20.71 21.39 24 17.08 24 12 24 5.73 18.77.5 12 .5z" />
    </svg>
  )
}

function SidebarExtras() {
  return (
    <div className="px-4 pb-3 pt-2 space-y-3">
      <a
        href={REPO_URL}
        target="_blank"
        rel="noreferrer"
        className="flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm font-medium text-white/85 transition hover:bg-white/10"
      >
        <IconGithub size={16} /> Ver en GitHub
      </a>
      <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
        <div className="rounded-md bg-white p-1.5">
          <QRCodeSVG value={SITE_URL} size={56} bgColor="#ffffff" fgColor="#0f2d33" />
        </div>
        <div className="text-xs leading-tight text-white/70">
          <p className="font-semibold text-white/90">Ábrelo en tu móvil</p>
          <p>Escanea el código para ver la Wiki en tu teléfono.</p>
        </div>
      </div>
    </div>
  )
}

function SidebarFooter() {
  return (
    <div className="px-6 py-4 border-t border-white/10 text-xs text-white/40">
      🛡️ Guía de seguridad web
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

  /* Al cambiar de sección, volver al inicio de la página para leer de arriba hacia abajo.
     El scroll real lo hace la ventana (el layout usa min-h-screen, no altura fija). */
  useEffect(() => {
    window.scrollTo(0, 0)
    mainRef.current?.scrollTo({ top: 0 }) // por robustez si el scroller cambia a futuro
  }, [activa])

  const seccionActual = items.find((s) => s.id === activa)
  const Componente = seccionActual?.componente

  return (
    <div className="flex min-h-screen bg-slate-50 text-gray-800">
      <ProgresoLectura />
      <BotonSubir />
      {/* Sidebar desktop */}
      <aside className="hidden md:flex flex-col w-64 sidebar-grad border-r border-white/10 shrink-0">
        <SidebarHeader />
        <nav className="flex-1 overflow-y-auto py-2 scroll-sutil">
          <NavItems activa={activa} setActiva={setActiva} />
        </nav>
        <SidebarExtras />
        <SidebarFooter />
      </aside>

      <div className="flex-1 flex flex-col min-h-screen">
        {/* Barra superior móvil */}
        <div className="md:hidden sidebar-grad border-b border-white/10 px-4 py-3 flex items-center justify-between shrink-0 relative z-10">
          <div>
            <p className="text-xs text-cyan-300 leading-none mb-0.5">Hotel Costa Brava</p>
            <p className="text-sm font-bold leading-tight text-white">{seccionActual?.label}</p>
          </div>
          <button onClick={() => setMenuAbierto(!menuAbierto)} className="text-white/80 hover:text-white p-1" aria-label="Menú">
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
                className="md:hidden fixed top-0 left-0 bottom-0 w-72 sidebar-grad z-40 flex flex-col shadow-2xl border-r border-white/10"
              >
                <SidebarHeader />
                <nav className="flex-1 overflow-y-auto py-2 scroll-sutil">
                  <NavItems activa={activa} setActiva={setActiva} onSelect={() => setMenuAbierto(false)} />
                </nav>
                <SidebarExtras />
                <SidebarFooter />
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        <main ref={mainRef} className="relative flex-1 overflow-y-auto">
          <div className="orbes" aria-hidden="true" />
          <IndiceLateral activa={activa} />
          {Componente ? <Componente /> : <Placeholder label={seccionActual?.label} />}
        </main>
      </div>
    </div>
  )
}

export default App
