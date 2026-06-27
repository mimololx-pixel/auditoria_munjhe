import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, ArrowUp } from 'lucide-react'
import { NavContext, ORDEN } from '../nav'

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

/*
 * Cabecera de sección con "cara" reconocible: banda de color suave + icono.
 * Strings de color completos (Tailwind v4 no detecta clases dinámicas, ver CLAUDE.md).
 */
const HERO_COLOR = {
  blue: 'bg-blue-50 text-blue-700',
  red: 'bg-red-50 text-red-700',
  amber: 'bg-amber-50 text-amber-700',
  purple: 'bg-purple-50 text-purple-700',
  gray: 'bg-gray-100 text-gray-700',
  teal: 'bg-teal-50 text-teal-700',
  emerald: 'bg-emerald-50 text-emerald-700',
}

export function SectionHero({ eyebrow, title, Icon, color = 'teal', arte, children }) {
  const cls = HERO_COLOR[color] ?? HERO_COLOR.teal
  return (
    <header className="mb-8">
      <div className={`flex items-center gap-4 rounded-2xl p-5 ${cls}`}>
        {Icon && (
          <span className="shrink-0 self-start rounded-xl bg-white/70 p-3">
            <Icon size={28} />
          </span>
        )}
        <div className="flex-1">
          {eyebrow && <p className="mb-1 text-xs font-semibold uppercase tracking-widest opacity-80">{eyebrow}</p>}
          <h2 className="text-3xl font-bold leading-tight">{title}</h2>
        </div>
        {arte && <div className="hidden w-44 shrink-0 md:block">{arte}</div>}
      </div>
      {children && <p className="mt-4 text-lg leading-relaxed text-gray-600">{children}</p>}
    </header>
  )
}

/* Navegación guiada al pie de cada sección: Anterior / Siguiente */
export function NavPie({ id }) {
  const i = ORDEN.findIndex((s) => s.id === id)
  const prev = i > 0 ? ORDEN[i - 1] : null
  const next = i >= 0 && i < ORDEN.length - 1 ? ORDEN[i + 1] : null
  return (
    <nav className="mt-12 flex items-center justify-between gap-3 border-t border-gray-200 pt-6">
      {prev ? (
        <button
          onClick={() => NavContext.go?.(prev.id)}
          className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:border-teal-400 hover:text-teal-700"
        >
          <ArrowLeft size={16} />
          <span className="hidden sm:inline">{prev.label}</span>
          <span className="sm:hidden">Anterior</span>
        </button>
      ) : (
        <span />
      )}
      {next ? (
        <button
          onClick={() => NavContext.go?.(next.id)}
          className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-700"
        >
          <span className="hidden sm:inline">{next.label}</span>
          <span className="sm:hidden">Siguiente</span>
          <ArrowRight size={16} />
        </button>
      ) : (
        <span />
      )}
    </nav>
  )
}

/* Comparativa de gravedad: una barra por ataque, color según severidad */
export function ComparativaCVSS({ datos }) {
  return (
    <div className="space-y-3">
      {datos.map(({ label, score }) => {
        const n = nivelDe(score)
        const pct = Math.min(100, Math.max(0, (score / 10) * 100))
        return (
          <div key={label}>
            <div className="mb-1 flex items-center justify-between text-sm">
              <span className="font-medium text-gray-700">{label}</span>
              <span className="text-gray-500">{n.emoji} {score} · {n.etiqueta}</span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-gray-100">
              <motion.div
                className={`h-3 rounded-full ${n.barra}`}
                initial={{ width: 0 }}
                whileInView={{ width: `${pct}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* Barra de progreso de lectura fija arriba (lee el scroll de la ventana) */
export function ProgresoLectura() {
  const [pct, setPct] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement
      const max = h.scrollHeight - h.clientHeight
      setPct(max > 0 ? (h.scrollTop / max) * 100 : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])
  return (
    <div className="fixed inset-x-0 top-0 z-50 h-1 bg-transparent">
      <div className="h-full bg-teal-500 transition-[width] duration-150" style={{ width: `${pct}%` }} />
    </div>
  )
}

/* Botón flotante para volver arriba (aparece tras bajar un poco) */
export function BotonSubir() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Volver arriba"
          className="fixed bottom-5 right-5 z-50 rounded-full bg-teal-600 p-3 text-white shadow-lg transition hover:bg-teal-700"
        >
          <ArrowUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  )
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

/* Medidor visual 0–10 del puntaje CVSS (verde→amarillo→naranja→rojo) */
export function MedidorCVSS({ score }) {
  const pct = Math.min(100, Math.max(0, (score / 10) * 100))
  return (
    <div className="mb-3 max-w-md">
      {/* Barra segmentada por severidad */}
      <div className="relative">
        <div className="flex h-3 rounded-full overflow-hidden">
          <div className="bg-green-400" style={{ width: '40%' }} />
          <div className="bg-yellow-400" style={{ width: '30%' }} />
          <div className="bg-orange-500" style={{ width: '20%' }} />
          <div className="bg-red-500" style={{ width: '10%' }} />
        </div>
        {/* Marcador del puntaje */}
        <motion.div
          className="absolute -top-1 w-5 h-5 rounded-full bg-white border-2 border-gray-700 shadow -translate-x-1/2 flex items-center justify-center"
          initial={{ left: '0%' }}
          animate={{ left: `${pct}%` }}
          transition={{ type: 'spring', damping: 18, stiffness: 120 }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-gray-700" />
        </motion.div>
      </div>
      {/* Marcas de los umbrales */}
      <div className="relative h-4 mt-1">
        {[0, 4, 7, 9, 10].map((t) => (
          <span key={t} className="absolute text-[10px] text-gray-400 -translate-x-1/2" style={{ left: `${t * 10}%` }}>
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}

/* Badge de severidad: número CVSS + frase en lenguaje simple + medidor visual */
export function Severidad({ score, vector }) {
  const n = nivelDe(score)
  return (
    <div className="mb-4">
      <div className="flex flex-wrap items-center gap-3 mb-3">
        <span className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 font-bold ${n.badge}`}>
          {n.emoji} {score} · {n.etiqueta}
        </span>
        <span className="text-gray-600">{n.emoji} {n.etiqueta} — {n.accion}</span>
      </div>
      <MedidorCVSS score={score} />
      {vector && <code className="text-xs text-gray-400 break-all">{vector}</code>}
    </div>
  )
}

/* Bloque de código que resalta en rojo una subcadena (la parte inyectada) */
function CodeResaltado({ texto, resaltar }) {
  if (!resaltar || !texto.includes(resaltar)) {
    return <Code>{texto}</Code>
  }
  const i = texto.indexOf(resaltar)
  return (
    <pre className="bg-gray-900 text-gray-100 rounded-xl px-4 py-3 text-sm overflow-x-auto whitespace-pre-wrap break-words">
      {texto.slice(0, i)}
      <span className="rounded bg-red-500/30 px-0.5 text-red-300">{resaltar}</span>
      {texto.slice(i + resaltar.length)}
    </pre>
  )
}

/*
 * Demo interactiva "Pruébalo tú": alterna entrada normal ↔ entrada del atacante.
 * Solo re-presenta datos ya documentados en el .md (payload, consulta, resultado).
 * `normal` y `ataque` = { entrada, codigo, resultado }; `ataque.resaltar` = subcadena
 * inyectada que se marca en rojo.
 */
export function Demo({ etiquetaCampo, normal, ataque }) {
  const [modo, setModo] = useState('normal')
  const esAtaque = modo === 'ataque'
  const datos = esAtaque ? ataque : normal
  return (
    <Card className="mb-8 bg-slate-50 border-slate-200">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-semibold text-gray-700">🧪 Pruébalo tú</p>
        <div className="inline-flex rounded-lg border border-gray-200 bg-white p-0.5">
          <button
            onClick={() => setModo('normal')}
            className={`rounded-md px-3 py-1.5 text-sm transition ${!esAtaque ? 'bg-teal-500 font-semibold text-white' : 'text-gray-600 hover:text-gray-900'}`}
          >
            Entrada normal
          </button>
          <button
            onClick={() => setModo('ataque')}
            className={`rounded-md px-3 py-1.5 text-sm transition ${esAtaque ? 'bg-red-500 font-semibold text-white' : 'text-gray-600 hover:text-gray-900'}`}
          >
            Entrada del atacante
          </button>
        </div>
      </div>

      <label className="mb-1 block text-xs text-gray-500">{etiquetaCampo}</label>
      <div className={`mb-4 break-words rounded-lg border px-3 py-2 font-mono text-sm ${esAtaque ? 'border-red-300 bg-red-50 text-red-800' : 'border-gray-300 bg-white text-gray-800'}`}>
        {datos.entrada}
      </div>

      <p className="mb-1 text-xs text-gray-500">Lo que ejecuta el sistema:</p>
      <CodeResaltado texto={datos.codigo} resaltar={esAtaque ? ataque.resaltar : null} />

      <p className="mb-1 mt-4 text-xs text-gray-500">Resultado:</p>
      <AnimatePresence mode="wait">
        <motion.div
          key={modo}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {datos.resultado}
        </motion.div>
      </AnimatePresence>
    </Card>
  )
}

/* Mini autocomprobación: 1 pregunta de opción múltiple con feedback inmediato */
export function Autocomprobacion({ pregunta, opciones }) {
  const [elegida, setElegida] = useState(null)
  return (
    <Card className="mt-8 border-teal-200 bg-teal-50/60">
      <p className="mb-3 text-sm font-semibold text-teal-800">🧠 ¿Lo entendiste? {pregunta}</p>
      <div className="space-y-2">
        {opciones.map((o, i) => {
          const sel = elegida === i
          const estado = !sel ? '' : o.correcta ? 'border-emerald-400 bg-emerald-50' : 'border-red-400 bg-red-50'
          return (
            <button
              key={i}
              onClick={() => setElegida(i)}
              className={`w-full rounded-lg border px-3 py-2 text-left text-sm transition ${sel ? estado : 'border-gray-200 bg-white hover:border-teal-300'}`}
            >
              <span className="flex items-start gap-2">
                {sel && <span>{o.correcta ? '✅' : '❌'}</span>}
                <span>{o.texto}</span>
              </span>
            </button>
          )
        })}
      </div>
      {elegida !== null && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`mt-3 text-sm ${opciones[elegida].correcta ? 'text-emerald-700' : 'text-red-700'}`}
        >
          {opciones[elegida].explicacion}
        </motion.p>
      )}
    </Card>
  )
}
