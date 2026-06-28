import { AlertTriangle, Flame, Database, ShieldCheck, Boxes } from 'lucide-react'
import { Card, Contador, H3 } from './ui'
import { NavContext } from '../nav'

/*
 * Panel ejecutivo de la portada (solo presentación): resume de un vistazo el
 * estado de seguridad del hotel con contadores animados y la distribución de
 * riesgos R1–R6 de la matriz (sección 06).
 */

const STATS = [
  { Icon: Flame, valor: 4, label: 'Riesgos críticos', sub: 'Atención inmediata', color: 'text-red-600', bg: 'bg-red-50' },
  { Icon: AlertTriangle, valor: 2, label: 'Riesgos altos', sub: 'Mitigar pronto', color: 'text-orange-600', bg: 'bg-orange-50' },
  { Icon: Database, valor: 9.8, dec: 1, label: 'CVSS máximo', sub: 'Inyección de comandos', color: 'text-rose-600', bg: 'bg-rose-50' },
  { Icon: Boxes, valor: 12, label: 'Activos analizados', sub: '4 categorías', color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { Icon: ShieldCheck, valor: 13, label: 'Controles definidos', sub: 'OWASP + CIS', color: 'text-indigo-600', bg: 'bg-indigo-50' },
]

/* Distribución de los 6 riesgos por banda de prioridad */
const BANDAS = [
  { nombre: 'Crítico', n: 4, cls: 'bg-red-500' },
  { nombre: 'Alto', n: 2, cls: 'bg-orange-400' },
  { nombre: 'Medio', n: 0, cls: 'bg-yellow-400' },
  { nombre: 'Bajo', n: 0, cls: 'bg-emerald-400' },
]
const TOTAL = 6

export default function Dashboard() {
  return (
    <section className="mb-10">
      <H3>Panel ejecutivo</H3>
      <p className="text-gray-600 mb-4 text-sm">
        El estado de seguridad del portal de un vistazo. Toca un dato para ir a su sección.
      </p>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 mb-4">
        {STATS.map((s) => (
          <Card key={s.label} className="text-center">
            <span className={`mx-auto mb-2 inline-flex h-11 w-11 items-center justify-center rounded-xl ${s.bg} ${s.color}`}>
              <s.Icon size={22} />
            </span>
            <p className={`text-3xl font-extrabold ${s.color}`}>
              <Contador to={s.valor} decimals={s.dec ?? 0} />
            </p>
            <p className="text-xs font-semibold text-gray-700 mt-1">{s.label}</p>
            <p className="text-[11px] text-gray-400">{s.sub}</p>
          </Card>
        ))}
      </div>

      <Card>
        <div className="mb-2 flex items-center justify-between">
          <p className="text-sm font-semibold text-gray-700">Distribución de riesgos</p>
          <button onClick={() => NavContext.go?.('matriz')} className="text-xs font-medium text-indigo-600 hover:underline">
            Ver matriz de riesgo →
          </button>
        </div>
        {/* Barra apilada */}
        <div className="flex h-4 w-full overflow-hidden rounded-full bg-gray-100">
          {BANDAS.filter((b) => b.n > 0).map((b) => (
            <div key={b.nombre} className={b.cls} style={{ width: `${(b.n / TOTAL) * 100}%` }} title={`${b.nombre}: ${b.n}`} />
          ))}
        </div>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-600">
          {BANDAS.map((b) => (
            <span key={b.nombre} className="inline-flex items-center gap-1.5">
              <span className={`h-2.5 w-2.5 rounded-full ${b.cls}`} /> {b.nombre}: <strong>{b.n}</strong>
            </span>
          ))}
        </div>
      </Card>
    </section>
  )
}
