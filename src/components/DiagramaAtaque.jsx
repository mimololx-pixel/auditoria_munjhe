import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { Card } from './ui'

/*
 * Diagrama animado paso a paso de un ataque (solo presentación). Recorre en bucle
 * los nodos (atacante → formulario → servidor/BD/navegador) resaltando cada etapa
 * y mostrando una explicación sencilla debajo. Respeta prefers-reduced-motion.
 *
 * pasos = [{ Icon, label, detalle }]
 */
const ANILLO = {
  red: 'ring-red-400 bg-red-50 text-red-600',
  amber: 'ring-amber-400 bg-amber-50 text-amber-600',
  purple: 'ring-purple-400 bg-purple-50 text-purple-600',
}

export default function DiagramaAtaque({ titulo = 'Cómo ocurre, paso a paso', pasos, color = 'red' }) {
  const [activo, setActivo] = useState(0)
  const anillo = ANILLO[color] ?? ANILLO.red
  const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    if (reduce) return
    const id = setInterval(() => setActivo((a) => (a + 1) % pasos.length), 1700)
    return () => clearInterval(id)
  }, [pasos.length, reduce])

  return (
    <Card className="mb-8" reveal={false}>
      <p className="mb-4 text-sm font-semibold text-gray-700">🎬 {titulo}</p>
      <div className="flex items-stretch gap-1 overflow-x-auto pb-2">
        {pasos.map((p, i) => (
          <div key={i} className="flex items-center">
            <button
              onClick={() => setActivo(i)}
              className="flex w-24 shrink-0 flex-col items-center gap-2 text-center"
            >
              <motion.span
                animate={{ scale: activo === i ? 1.12 : 1, opacity: activo === i ? 1 : 0.5 }}
                transition={{ duration: 0.3 }}
                className={`flex h-14 w-14 items-center justify-center rounded-2xl ring-2 ${activo === i ? anillo : 'bg-gray-100 text-gray-400 ring-transparent'}`}
              >
                <p.Icon size={26} />
              </motion.span>
              <span className={`text-xs leading-tight ${activo === i ? 'font-semibold text-gray-800' : 'text-gray-400'}`}>
                {p.label}
              </span>
            </button>
            {i < pasos.length - 1 && (
              <ChevronRight size={18} className={`mx-0.5 shrink-0 ${activo > i ? 'text-gray-500' : 'text-gray-300'}`} />
            )}
          </div>
        ))}
      </div>
      <motion.p
        key={activo}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-3 rounded-lg bg-gray-50 px-3 py-2 text-sm text-gray-700"
      >
        <strong>{activo + 1}. {pasos[activo].label}:</strong> {pasos[activo].detalle}
      </motion.p>
    </Card>
  )
}
