import { useState } from 'react'
import { Grid3x3, AlertTriangle } from 'lucide-react'
import { Page, SectionHero, NavPie, Card, H3 } from './ui'
import { ArteMatriz } from './ilustraciones'

/*
 * 06 · Matriz de Riesgo y Mapa de Calor — Hotel Costa Brava
 * Espejo de docs_munjhe/06_matriz_munjhe.md (fuente evaluable — ver CLAUDE.md).
 * Criterio 3.1.3. Toma los riesgos R1–R6 de la fase 05 y los prioriza con P×I.
 */

const RIESGOS = [
  { id: 'R1', P: 4, I: 5, titulo: 'Fuga masiva de la BD de huéspedes', origen: 'Inyección SQL', impacto: 'Expone datos masivos de huéspedes (Ley 19.628): suplantación, fraude y multas.' },
  { id: 'R4', P: 4, I: 5, titulo: 'Ransomware que cifra el PMS', origen: 'Malware (sector)', impacto: 'Detiene check-in/out y facturación; rescate y posible pérdida de datos.' },
  { id: 'R3', P: 3, I: 5, titulo: 'Toma de control del servidor', origen: 'Inyección de comandos', impacto: 'Compromiso total de la infraestructura y todos los datos.' },
  { id: 'R6', P: 5, I: 3, titulo: 'Phishing y fraude de reservas', origen: 'Ingeniería social', impacto: 'Vector inicial más probable; puerta de entrada a los demás ataques.' },
  { id: 'R2', P: 4, I: 3, titulo: 'Robo de sesión / suplantación', origen: 'XSS', impacto: 'Un atacante actúa como el huésped: ve y cambia sus reservas y datos.' },
  { id: 'R5', P: 3, I: 4, titulo: 'Caída / DDoS en temporada alta', origen: 'Disponibilidad', impacto: 'Sin motor de reservas en plena demanda: pérdida directa de ventas.' },
]

/* Bandas de prioridad por nivel P×I — strings completos (Tailwind v4, ver CLAUDE.md) */
function bandaDe(nivel) {
  if (nivel >= 15) return { nombre: 'Crítico', emoji: '🔴', cell: 'bg-red-400 text-white', chip: 'bg-red-100 text-red-800' }
  if (nivel >= 10) return { nombre: 'Alto', emoji: '🟠', cell: 'bg-orange-300 text-orange-900', chip: 'bg-orange-100 text-orange-800' }
  if (nivel >= 5) return { nombre: 'Medio', emoji: '🟡', cell: 'bg-yellow-200 text-yellow-900', chip: 'bg-yellow-100 text-yellow-800' }
  return { nombre: 'Bajo', emoji: '🟢', cell: 'bg-emerald-200 text-emerald-900', chip: 'bg-emerald-100 text-emerald-800' }
}

const P_LABEL = { 1: 'Muy baja', 2: 'Baja', 3: 'Media', 4: 'Alta', 5: 'Muy alta' }
const I_LABEL = { 1: 'Insignificante', 2: 'Menor', 3: 'Moderado', 4: 'Mayor', 5: 'Catastrófico' }

const PRIORIZADOS = [...RIESGOS].sort((a, b) => b.P * b.I - a.P * a.I)

function MapaCalor({ activo, setActivo }) {
  const filas = [5, 4, 3, 2, 1] // Impacto, de arriba hacia abajo
  const cols = [1, 2, 3, 4, 5] // Probabilidad
  return (
    <div className="flex gap-2">
      {/* Eje Y */}
      <div className="flex items-center">
        <span className="text-xs font-semibold uppercase tracking-wider text-gray-500" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
          Impacto →
        </span>
      </div>
      <div className="flex-1">
        <div className="grid gap-1" style={{ gridTemplateColumns: 'auto repeat(5, 1fr)' }}>
          {filas.map((I) => (
            <Fragmento key={I} I={I} cols={cols} activo={activo} setActivo={setActivo} />
          ))}
          {/* Fila de etiquetas de Probabilidad */}
          <div />
          {cols.map((P) => (
            <div key={P} className="pt-1 text-center text-[11px] text-gray-500">
              {P}
            </div>
          ))}
        </div>
        <p className="mt-1 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">Probabilidad →</p>
      </div>
    </div>
  )
}

function Fragmento({ I, cols, activo, setActivo }) {
  return (
    <>
      <div className="flex items-center justify-end pr-1 text-[11px] text-gray-500">{I}</div>
      {cols.map((P) => {
        const nivel = P * I
        const banda = bandaDe(nivel)
        const aqui = RIESGOS.filter((r) => r.P === P && r.I === I)
        const resaltada = activo && aqui.some((r) => r.id === activo)
        return (
          <div
            key={P}
            onMouseEnter={() => aqui[0] && setActivo(aqui[0].id)}
            className={`relative flex min-h-[44px] items-center justify-center rounded-md text-xs font-bold transition ${banda.cell} ${resaltada ? 'ring-2 ring-gray-800 ring-offset-1' : ''}`}
          >
            {aqui.length > 0 ? (
              <div className="flex flex-wrap items-center justify-center gap-1">
                {aqui.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setActivo(r.id)}
                    className={`rounded bg-white/90 px-1.5 py-0.5 text-[11px] font-extrabold text-gray-800 shadow-sm transition hover:scale-110 ${activo === r.id ? 'ring-2 ring-gray-800' : ''}`}
                  >
                    {r.id}
                  </button>
                ))}
              </div>
            ) : (
              <span className="opacity-60">{nivel}</span>
            )}
          </div>
        )
      })}
    </>
  )
}

export default function Matriz() {
  const [activo, setActivo] = useState('R1')
  const r = RIESGOS.find((x) => x.id === activo)
  const banda = r ? bandaDe(r.P * r.I) : null
  return (
    <Page>
      <SectionHero eyebrow="Informe B · Matriz de riesgo · 3.1.3" title="Matriz de riesgo y mapa de calor" Icon={Grid3x3} color="cyan" arte={<ArteMatriz className="w-full" />}>
        Cada riesgo se mide como <strong>Probabilidad × Impacto</strong> y se ubica en un
        <strong> mapa de calor</strong> que muestra cuáles están en zona roja y deben atenderse primero.
      </SectionHero>

      <H3>Qué es una matriz de riesgo (en simple)</H3>
      <p className="text-gray-600 mb-4">
        Por cada amenaza respondemos dos preguntas: <strong>¿qué tan probable es que pase?</strong> y
        <strong> ¿qué tan grave sería si pasa?</strong>. Al cruzarlas obtenemos una nota: mientras más
        probable y más grave, más arriba en la lista de prioridades.
      </p>
      <Card className="mb-8 bg-gray-50 border-gray-200">
        <p className="text-sm text-gray-600 italic">
          Es como decidir qué arreglar primero en una casa: una gotera pequeña y rara puede esperar;
          una fuga de gas probable y peligrosa se atiende <strong>ahora</strong>. El mapa de calor es
          el semáforo que pinta de rojo lo urgente.
        </p>
      </Card>

      <H3>1. Escalas de evaluación (1–5)</H3>
      <div className="grid gap-4 sm:grid-cols-2 mb-4">
        <Card className="p-0 overflow-hidden">
          <p className="bg-gray-50 px-4 py-2 text-sm font-semibold text-gray-700">Probabilidad (P)</p>
          <table className="w-full text-sm">
            <tbody className="divide-y divide-gray-100">
              {[5, 4, 3, 2, 1].map((p) => (
                <tr key={p}><td className="px-4 py-1.5 font-mono text-gray-500 w-8">{p}</td><td className="px-2 py-1.5 text-gray-700">{P_LABEL[p]}</td></tr>
              ))}
            </tbody>
          </table>
        </Card>
        <Card className="p-0 overflow-hidden">
          <p className="bg-gray-50 px-4 py-2 text-sm font-semibold text-gray-700">Impacto (I)</p>
          <table className="w-full text-sm">
            <tbody className="divide-y divide-gray-100">
              {[5, 4, 3, 2, 1].map((i) => (
                <tr key={i}><td className="px-4 py-1.5 font-mono text-gray-500 w-8">{i}</td><td className="px-2 py-1.5 text-gray-700">{I_LABEL[i]}</td></tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
      <div className="flex flex-wrap gap-2 mb-8 text-xs">
        <span className="rounded-full bg-emerald-100 px-3 py-1 text-emerald-800">🟢 Bajo · 1–4 · vigilar</span>
        <span className="rounded-full bg-yellow-100 px-3 py-1 text-yellow-800">🟡 Medio · 5–9 · planificar</span>
        <span className="rounded-full bg-orange-100 px-3 py-1 text-orange-800">🟠 Alto · 10–14 · mitigar pronto</span>
        <span className="rounded-full bg-red-100 px-3 py-1 text-red-800">🔴 Crítico · 15–25 · inmediato</span>
      </div>

      <H3>2. Matriz técnica de cálculo</H3>
      <Card className="mb-8 p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left text-gray-500">
                <th className="px-3 py-2 font-medium">ID</th>
                <th className="px-3 py-2 font-medium">Riesgo</th>
                <th className="px-3 py-2 font-medium">Origen</th>
                <th className="px-3 py-2 font-medium text-center">P</th>
                <th className="px-3 py-2 font-medium text-center">I</th>
                <th className="px-3 py-2 font-medium text-center">P×I</th>
                <th className="px-3 py-2 font-medium">Prioridad</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {PRIORIZADOS.map((x) => {
                const b = bandaDe(x.P * x.I)
                return (
                  <tr key={x.id} className="align-top">
                    <td className="px-3 py-2 font-mono text-xs text-gray-500">{x.id}</td>
                    <td className="px-3 py-2 font-medium text-gray-800">{x.titulo}</td>
                    <td className="px-3 py-2 text-gray-600">{x.origen}</td>
                    <td className="px-3 py-2 text-center text-gray-700">{x.P}</td>
                    <td className="px-3 py-2 text-center text-gray-700">{x.I}</td>
                    <td className="px-3 py-2 text-center font-bold text-gray-800">{x.P * x.I}</td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${b.chip}`}>{b.emoji} {b.nombre}</span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>

      <H3>3. 🔥 Mapa de calor (Probabilidad × Impacto)</H3>
      <p className="text-gray-600 mb-4">
        Pasa el cursor (o toca) una celda o un riesgo para ver su detalle. Las celdas se colorean por
        su nivel; cada riesgo aparece en la celda de su valoración.
      </p>
      <Card className="mb-4">
        <MapaCalor activo={activo} setActivo={setActivo} />
      </Card>
      {r && (
        <Card className={`mb-8 ${banda.chip} border-transparent`}>
          <div className="flex flex-wrap items-baseline gap-2 mb-1">
            <span className="font-mono text-sm font-extrabold">{r.id}</span>
            <span className="font-semibold">{r.titulo}</span>
            <span className="ml-auto text-sm font-bold">{banda.emoji} {r.P}×{r.I} = {r.P * r.I} · {banda.nombre}</span>
          </div>
          <p className="text-sm">{r.impacto}</p>
        </Card>
      )}

      <H3>4. Priorización y zonas rojas</H3>
      <Card className="mb-4 bg-red-50 border-red-200">
        <p className="flex items-center gap-2 text-sm font-semibold text-red-800 mb-2">
          <AlertTriangle size={16} /> Alerta máxima — riesgos que pueden paralizar el hotel hoy
        </p>
        <ol className="list-decimal list-inside text-sm text-red-900 space-y-1">
          <li><strong>R1 · Fuga de la base de datos</strong> — un formulario vulnerable expone a todos los huéspedes.</li>
          <li><strong>R4 · Ransomware del PMS</strong> — deja al hotel sin poder operar.</li>
          <li><strong>R3 · Control del servidor</strong> — compromiso total de infraestructura y datos.</li>
          <li><strong>R6 · Phishing</strong> — el vector inicial más probable; puerta de entrada al resto.</li>
        </ol>
        <p className="mt-2 text-xs text-red-700">Luego se atienden R2 y R5 (🟠 Alto).</p>
      </Card>
      <Card className="mb-2 bg-cyan-50 border-cyan-200">
        <p className="text-sm text-cyan-900">
          👉 Esta priorización guía la <strong>sección 07</strong>: los controles de prevención y
          mitigación se definen empezando por los riesgos críticos.
        </p>
      </Card>

      <NavPie id="matriz" />
    </Page>
  )
}
