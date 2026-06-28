import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Compass, BookOpen, SlidersHorizontal, Trophy, ArrowRight, ArrowLeft, X } from 'lucide-react'

/*
 * Tour de bienvenida (solo presentación). Explica cómo leer la Wiki a quien llega
 * por primera vez. Se muestra una vez (localStorage) y puede relanzarse.
 */
const PASOS = [
  { Icon: Compass, t: '¡Bienvenido!', d: 'Esta Wiki explica, en lenguaje simple, los riesgos de seguridad del portal de un hotel y cómo protegerse. Usa el menú lateral para recorrer los temas.' },
  { Icon: SlidersHorizontal, t: 'Modo simple o técnico', d: 'En el menú puedes elegir "Simple" (solo lo esencial) o "Técnico" (todo el detalle). Empieza en simple si no sabes de seguridad.' },
  { Icon: BookOpen, t: 'Palabras difíciles', d: 'Las palabras técnicas subrayadas muestran su significado al pasar el cursor. Y tienes un Glosario completo en "Recursos".' },
  { Icon: Trophy, t: 'Pon a prueba lo aprendido', d: 'Al final hay un quiz para comprobar cuánto entendiste. ¿Listo para empezar?' },
]

export default function Tour({ abierto, onClose }) {
  const [i, setI] = useState(0)
  const paso = PASOS[i]
  const ultimo = i === PASOS.length - 1
  const cerrar = () => { setI(0); onClose() }

  return (
    <AnimatePresence>
      {abierto && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/50 backdrop-blur-sm" onClick={cerrar}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="fixed left-1/2 top-1/2 z-[71] w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2"
          >
            <div className="overflow-hidden rounded-3xl bg-white shadow-2xl dark:bg-[#1e252e]">
              <div className="relative bg-gradient-to-br from-teal-500 to-indigo-600 p-6 text-white">
                <button onClick={cerrar} className="absolute right-3 top-3 text-white/80 hover:text-white" aria-label="Cerrar">
                  <X size={18} />
                </button>
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 ring-1 ring-white/30">
                  <paso.Icon size={26} />
                </span>
                <p className="mt-3 text-xl font-extrabold">{paso.t}</p>
              </div>
              <div className="p-6">
                <p className="text-sm text-gray-600">{paso.d}</p>
                <div className="mt-5 flex items-center justify-between">
                  <div className="flex gap-1.5">
                    {PASOS.map((_, j) => (
                      <span key={j} className={`h-1.5 rounded-full transition-all ${j === i ? 'w-5 bg-teal-500' : 'w-1.5 bg-gray-300'}`} />
                    ))}
                  </div>
                  <div className="flex gap-2">
                    {i > 0 && (
                      <button onClick={() => setI(i - 1)} className="inline-flex items-center gap-1 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700">
                        <ArrowLeft size={14} /> Atrás
                      </button>
                    )}
                    <button
                      onClick={() => (ultimo ? cerrar() : setI(i + 1))}
                      style={{ backgroundImage: 'var(--grad-accent)' }}
                      className="inline-flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-semibold text-white"
                    >
                      {ultimo ? 'Empezar' : 'Siguiente'} {!ultimo && <ArrowRight size={14} />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
