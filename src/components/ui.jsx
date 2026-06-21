import { motion } from 'framer-motion'

/*
 * Módulo de UI compartido — tema claro y amigable.
 * Reutilizado por todas las secciones para mantener un estilo uniforme y
 * reducir duplicación. Acento único: teal.
 */

/* Tarjeta suave reutilizable */
export function Card({ children, className = '' }) {
  return (
    <div className={`rounded-2xl border border-gray-200 bg-white p-5 shadow-sm ${className}`}>
      {children}
    </div>
  )
}

/* Contenedor + animación de entrada para cada página de sección */
export function Page({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-3xl mx-auto px-6 py-12"
    >
      {children}
    </motion.div>
  )
}

/* Encabezado de página: eyebrow + título + bajada */
export function PageHeader({ eyebrow, title, children }) {
  return (
    <header className="mb-8">
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-widest text-teal-600 mb-2">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-bold text-gray-800 mb-3">{title}</h2>
      {children && <p className="text-gray-600 text-lg leading-relaxed">{children}</p>}
    </header>
  )
}

/* Encabezado de subsección */
export function H3({ children }) {
  return <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-2">{children}</h3>
}

/* Bloque de código/payload */
export function Code({ children, tone = 'dark' }) {
  const cls =
    tone === 'payload'
      ? 'bg-gray-900 text-green-300'
      : 'bg-gray-900 text-gray-100'
  return (
    <pre className={`${cls} rounded-xl px-4 py-3 text-sm overflow-x-auto whitespace-pre-wrap break-words`}>
      {children}
    </pre>
  )
}

/*
 * Niveles de severidad en lenguaje simple (strings completos — Tailwind v4 no
 * detecta clases dinámicas, ver CLAUDE.md).
 */
const NIVELES = [
  { min: 9.0, emoji: '🔴', etiqueta: 'Muy grave', accion: 'corregir de inmediato', badge: 'bg-red-100 text-red-800', barra: 'bg-red-500' },
  { min: 7.0, emoji: '🟠', etiqueta: 'Grave', accion: 'corregir pronto', badge: 'bg-orange-100 text-orange-800', barra: 'bg-orange-500' },
  { min: 4.0, emoji: '🟡', etiqueta: 'Moderada', accion: 'planificar corrección', badge: 'bg-yellow-100 text-yellow-800', barra: 'bg-yellow-500' },
  { min: 0.0, emoji: '🟢', etiqueta: 'Leve', accion: 'mantener bajo observación', badge: 'bg-green-100 text-green-800', barra: 'bg-green-500' },
]

function nivelDe(score) {
  return NIVELES.find((n) => score >= n.min) ?? NIVELES[NIVELES.length - 1]
}

/* Badge de severidad: número CVSS + frase en lenguaje simple */
export function Severidad({ score, vector }) {
  const n = nivelDe(score)
  return (
    <div className="mb-4">
      <div className="flex flex-wrap items-center gap-3 mb-2">
        <span className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 font-bold ${n.badge}`}>
          {n.emoji} {score} · {n.etiqueta}
        </span>
        <span className="text-gray-600">{n.emoji} {n.etiqueta} — {n.accion}</span>
      </div>
      {vector && <code className="text-xs text-gray-400 break-all">{vector}</code>}
    </div>
  )
}
