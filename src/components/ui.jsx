import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, ArrowUp } from 'lucide-react'
import { NavContext, ORDEN } from '../nav'
import { defDe } from '../data/glosario'
import { usePref } from '../preferencias'
import { BANDAS, nivelCVSS } from '../data/severidad'

/* Término con tooltip: muestra la definición del glosario al pasar/tocar */
export function Termino({ children, def }) {
  const definicion = def ?? defDe(typeof children === 'string' ? children : '')
  const [abierto, setAbierto] = useState(false)
  if (!definicion) return children
  return (
    <span className="relative inline-block">
      <button
        type="button"
        onClick={() => setAbierto((o) => !o)}
        onMouseEnter={() => setAbierto(true)}
        onMouseLeave={() => setAbierto(false)}
        className="cursor-help border-b border-dashed border-teal-500 font-medium text-teal-700 dark:text-teal-300"
      >
        {children}
      </button>
      <AnimatePresence>
        {abierto && (
          <motion.span
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-full left-1/2 z-40 mb-1.5 w-56 -translate-x-1/2 rounded-lg bg-gray-900 px-3 py-2 text-xs font-normal leading-snug text-white shadow-xl"
          >
            {definicion}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  )
}

/* Bloque que solo se muestra en "modo técnico" (oculto en modo simple) */
export function Tecnico({ children }) {
  const { tecnico } = usePref()
  return tecnico ? children : null
}

/*
 * Módulo de UI compartido — tema claro y amigable.
 * Reutilizado por todas las secciones para mantener un estilo uniforme y
 * reducir duplicación. Acento único: teal.
 */

/*
 * Tarjeta reutilizable. Por defecto es "glass" (vidrio esmerilado); si se le pasa
 * un color de fondo propio (bg-*-50, p. ej. tarjetas temáticas) conserva ese color
 * y solo hereda sombra/borde. Aparece con scroll-reveal y se eleva al pasar el cursor.
 */
export function Card({ children, className = '', reveal = true, hover = true }) {
  const hasBg = /\bbg-/.test(className)
  const base = hasBg
    ? 'rounded-2xl border border-gray-200 p-5 shadow-[var(--shadow-soft)]'
    : 'rounded-2xl glass p-5'
  const lift = hover ? 'transition duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]' : ''
  const anim = reveal
    ? { initial: { opacity: 0, y: 16 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-60px' }, transition: { duration: 0.5, ease: 'easeOut' } }
    : {}
  return (
    <motion.div className={`${base} ${lift} ${className}`} {...anim}>
      {children}
    </motion.div>
  )
}

/* Wrapper de aparición al hacer scroll (con delay para escalonar grupos) */
export function Reveal({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

/* Número que cuenta de 0 al valor cuando entra en pantalla */
export function Contador({ to, decimals = 0, duration = 1.2, suffix = '', prefix = '' }) {
  const [val, setVal] = useState(0)
  const ref = useRef(null)
  const yaInicio = useRef(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver((entradas) => {
      if (entradas[0].isIntersecting && !yaInicio.current) {
        yaInicio.current = true
        const inicio = performance.now()
        const tick = (ahora) => {
          const p = Math.min(1, (ahora - inicio) / (duration * 1000))
          const eased = 1 - Math.pow(1 - p, 3)
          setVal(to * eased)
          if (p < 1) requestAnimationFrame(tick)
          else setVal(to)
        }
        requestAnimationFrame(tick)
      }
    }, { threshold: 0.4 })
    io.observe(el)
    return () => io.disconnect()
  }, [to, duration])
  return <span ref={ref}>{prefix}{val.toFixed(decimals)}{suffix}</span>
}

/* Botón CTA con gradiente cian→índigo */
export function BotonGradiente({ children, onClick, className = '' }) {
  return (
    <button
      onClick={onClick}
      style={{ backgroundImage: 'var(--grad-accent)' }}
      className={`inline-flex items-center gap-2 rounded-xl px-5 py-3 font-semibold text-white shadow-lg transition duration-300 hover:-translate-y-0.5 hover:brightness-110 ${className}`}
    >
      {children}
    </button>
  )
}

/* Contenedor + animación de entrada para cada página de sección */
export function Page({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative z-10 max-w-3xl mx-auto px-6 py-12"
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
        <p className="text-xs font-semibold uppercase tracking-widest text-gradient mb-2">
          {eyebrow}
        </p>
      )}
      <h2 className="text-4xl font-extrabold text-gray-800 mb-3">{title}</h2>
      {children && <p className="text-gray-600 text-lg leading-relaxed">{children}</p>}
    </header>
  )
}

/* Encabezado de subsección, con barra de acento en gradiente */
export function H3({ children }) {
  return (
    <h3 className="text-xl font-bold text-gray-800 mb-3 mt-2 flex items-center gap-2.5">
      <span className="h-5 w-1.5 rounded-full shrink-0" style={{ backgroundImage: 'var(--grad-accent)' }} />
      {children}
    </h3>
  )
}

/*
 * Cabecera de sección con "cara" reconocible: banda de GRADIENTE vivo por color + icono.
 * Strings de color completos (Tailwind v4 no detecta clases dinámicas, ver CLAUDE.md).
 */
const HERO_GRADIENT = {
  blue: 'from-blue-500 to-indigo-600',
  red: 'from-red-500 to-rose-600',
  amber: 'from-amber-500 to-orange-600',
  purple: 'from-purple-500 to-indigo-600',
  gray: 'from-slate-500 to-slate-700',
  teal: 'from-teal-500 to-cyan-600',
  emerald: 'from-emerald-500 to-teal-600',
  cyan: 'from-cyan-500 to-blue-600',
  indigo: 'from-indigo-500 to-violet-600',
}

export function SectionHero({ eyebrow, title, Icon, color = 'teal', arte, children }) {
  const grad = HERO_GRADIENT[color] ?? HERO_GRADIENT.teal
  return (
    <header className="mb-8">
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className={`relative flex items-center gap-4 overflow-hidden rounded-3xl bg-gradient-to-br ${grad} p-6 text-white shadow-xl`}
      >
        {/* brillo decorativo */}
        <span className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/15 blur-2xl" />
        {Icon && (
          <span className="relative shrink-0 self-start rounded-2xl bg-white/20 p-3 ring-1 ring-white/30 backdrop-blur">
            <Icon size={30} />
          </span>
        )}
        <div className="relative flex-1">
          {eyebrow && (
            <p className="mb-2 inline-block rounded-full bg-white/20 px-3 py-0.5 text-xs font-semibold uppercase tracking-widest ring-1 ring-white/30">
              {eyebrow}
            </p>
          )}
          <h2 className="text-3xl font-extrabold leading-tight drop-shadow-sm md:text-4xl">{title}</h2>
        </div>
        {arte && <div className="relative hidden w-44 shrink-0 md:block">{arte}</div>}
      </motion.div>
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
          style={{ backgroundImage: 'var(--grad-accent)' }}
          className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white shadow-md transition duration-300 hover:-translate-y-0.5 hover:brightness-110"
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
              <span className="text-gray-600">{n.banda.emoji} {score} · {n.etiqueta}</span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-gray-100">
              <motion.div
                className={`h-3 rounded-full ${n.banda.solid}`}
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
      <div className="h-full transition-[width] duration-150" style={{ width: `${pct}%`, backgroundImage: 'var(--grad-accent)' }} />
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
          style={{ backgroundImage: 'var(--grad-accent)' }}
          className="fixed bottom-5 right-5 z-50 rounded-full p-3 text-white shadow-lg transition duration-300 hover:-translate-y-0.5 hover:brightness-110"
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
 * Niveles de severidad en lenguaje simple. Los colores y umbrales vienen de la
 * fuente única src/data/severidad.js para que coincidan con la matriz y el panel.
 */
function nivelDe(score) {
  return nivelCVSS(score)
}

/* Medidor visual 0–10 del puntaje CVSS (verde→amarillo→naranja→rojo) */
export function MedidorCVSS({ score }) {
  const pct = Math.min(100, Math.max(0, (score / 10) * 100))
  return (
    <div className="mb-3 max-w-md">
      {/* Barra segmentada por severidad (mismos colores que las bandas) */}
      <div className="relative">
        <div className="flex h-3 rounded-full overflow-hidden">
          <div className={BANDAS.bajo.solid} style={{ width: '40%' }} />
          <div className={BANDAS.medio.solid} style={{ width: '30%' }} />
          <div className={BANDAS.alto.solid} style={{ width: '20%' }} />
          <div className={BANDAS.critico.solid} style={{ width: '10%' }} />
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
          <span key={t} className="absolute text-[10px] text-gray-600 -translate-x-1/2" style={{ left: `${t * 10}%` }}>
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
        <span className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 font-bold ${n.banda.badge}`}>
          {n.banda.emoji} {score} · {n.etiqueta}
        </span>
        <span className="text-gray-600">{n.banda.emoji} {n.etiqueta} — {n.accion}</span>
      </div>
      <MedidorCVSS score={score} />
      {vector && <code className="text-xs text-gray-600 break-all">{vector}</code>}
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
