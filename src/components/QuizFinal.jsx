import { useState } from 'react'
import { motion } from 'framer-motion'
import { Trophy, RotateCcw } from 'lucide-react'
import { Page, SectionHero, NavPie, Card } from './ui'

/*
 * Quiz final (solo presentación): consolida lo aprendido en la Wiki y da un puntaje.
 * No añade contenido evaluable; refuerza la comprensión de quien recorre el sitio.
 */
const PREGUNTAS = [
  {
    q: '¿Cuál es la defensa principal contra la inyección SQL?',
    op: ['Consultas parametrizadas', 'Poner un captcha', 'Ocultar el formulario'],
    correcta: 0,
    exp: 'Separan los datos de las instrucciones: lo que escribe el usuario nunca se interpreta como SQL.',
  },
  {
    q: 'Si la página no "escapa" la salida, ¿qué hace el navegador con un <script> escrito por el usuario?',
    op: ['Lo muestra como texto', 'Lo ejecuta como código del sitio', 'Lo ignora'],
    correcta: 1,
    exp: 'Sin escape, el navegador no distingue el texto del usuario del código del sitio: ejecuta el script (XSS).',
  },
  {
    q: '¿Por qué la inyección de comandos es la más grave (CVSS 9.8)?',
    op: ['Solo lee un archivo', 'Permite controlar el servidor completo', 'Requiere un clic de la víctima'],
    correcta: 1,
    exp: 'Da control total: leer todo, borrar/cifrar datos y tumbar el servicio.',
  },
  {
    q: '¿Qué mide el CVSS?',
    op: ['El precio de un ataque', 'Qué tan grave es una vulnerabilidad (0–10)', 'La velocidad del servidor'],
    correcta: 1,
    exp: 'Es una escala internacional del 0 al 10: mientras más alto, más peligroso.',
  },
  {
    q: 'En la matriz de riesgo, el nivel de un riesgo se calcula como…',
    op: ['Probabilidad × Impacto', 'Impacto ÷ Tiempo', 'Número de activos'],
    correcta: 0,
    exp: 'Probabilidad × Impacto (escala 1–5): cuanto más probable y más grave, mayor prioridad.',
  },
  {
    q: '¿Cuál es la mejor defensa contra el ransomware?',
    op: ['Pagar el rescate', 'Backups 3-2-1 inmutables/offline', 'Reiniciar el servidor'],
    correcta: 1,
    exp: 'Una copia que el malware no puede alcanzar ni cifrar permite restaurar sin pagar.',
  },
  {
    q: '¿Qué significa el RTO en un plan de recuperación?',
    op: ['Cuántos datos puedo perder', 'Cuánto tardo en volver a operar', 'El tamaño del backup'],
    correcta: 1,
    exp: 'RTO = tiempo máximo aceptable de caída antes de restablecer el servicio (el RPO son los datos).',
  },
]

export default function QuizFinal() {
  const [resp, setResp] = useState({}) // { idx: opcionElegida }
  const respondidas = Object.keys(resp).length
  const puntaje = PREGUNTAS.reduce((acc, p, i) => acc + (resp[i] === p.correcta ? 1 : 0), 0)
  const completo = respondidas === PREGUNTAS.length

  const elegir = (i, op) => {
    if (resp[i] !== undefined) return // ya respondida
    setResp((r) => ({ ...r, [i]: op }))
  }
  const reiniciar = () => setResp({})

  return (
    <Page>
      <SectionHero eyebrow="Recursos" title="Pon a prueba lo aprendido" Icon={Trophy} color="teal">
        Un repaso rápido de los conceptos clave de la Wiki. Responde y mira tu puntaje al final.
      </SectionHero>

      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-gray-500">Progreso: {respondidas} / {PREGUNTAS.length}</p>
        {respondidas > 0 && (
          <button onClick={reiniciar} className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:underline">
            <RotateCcw size={14} /> Reiniciar
          </button>
        )}
      </div>

      <div className="space-y-4">
        {PREGUNTAS.map((p, i) => {
          const elegida = resp[i]
          const contestada = elegida !== undefined
          return (
            <Card key={i} reveal={false}>
              <p className="mb-3 font-semibold text-gray-800">{i + 1}. {p.q}</p>
              <div className="space-y-2">
                {p.op.map((o, j) => {
                  const esCorrecta = j === p.correcta
                  const esElegida = elegida === j
                  let estilo = 'border-gray-200 bg-white hover:border-teal-300'
                  if (contestada) {
                    if (esCorrecta) estilo = 'border-emerald-400 bg-emerald-50'
                    else if (esElegida) estilo = 'border-red-400 bg-red-50'
                    else estilo = 'border-gray-200 bg-white opacity-60'
                  }
                  return (
                    <button
                      key={j}
                      onClick={() => elegir(i, j)}
                      disabled={contestada}
                      className={`w-full rounded-lg border px-3 py-2 text-left text-sm transition ${estilo}`}
                    >
                      <span className="flex items-center gap-2">
                        {contestada && esCorrecta && <span>✅</span>}
                        {contestada && esElegida && !esCorrecta && <span>❌</span>}
                        <span>{o}</span>
                      </span>
                    </button>
                  )
                })}
              </div>
              {contestada && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`mt-3 text-sm ${elegida === p.correcta ? 'text-emerald-700' : 'text-red-700'}`}>
                  {elegida === p.correcta ? '✔️ ¡Correcto! ' : '✖️ '} {p.exp}
                </motion.p>
              )}
            </Card>
          )
        })}
      </div>

      {completo && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="mt-6 bg-gradient-to-br from-teal-500 to-indigo-600 text-white" reveal={false} hover={false}>
            <div className="flex items-center gap-3">
              <Trophy size={32} />
              <div>
                <p className="text-2xl font-extrabold">{puntaje} / {PREGUNTAS.length}</p>
                <p className="text-white/90 text-sm">
                  {puntaje === PREGUNTAS.length ? '¡Perfecto! Dominas los fundamentos. 🎉'
                    : puntaje >= PREGUNTAS.length - 2 ? '¡Muy bien! Casi todo claro. 👏'
                    : 'Buen intento. Repasa las secciones y vuelve a probar. 💪'}
                </p>
              </div>
              <button onClick={reiniciar} className="ml-auto inline-flex items-center gap-1.5 rounded-lg bg-white/20 px-3 py-2 text-sm font-semibold backdrop-blur transition hover:bg-white/30">
                <RotateCcw size={14} /> Otra vez
              </button>
            </div>
          </Card>
        </motion.div>
      )}

      <NavPie id="reto" />
    </Page>
  )
}
