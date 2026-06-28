import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, CornerDownLeft } from 'lucide-react'
import { NavContext } from '../nav'
import { TERMINOS, norm } from '../data/glosario'

/*
 * Buscador global (Cmd/Ctrl+K). Busca en las secciones y en los términos del
 * glosario y navega a la elegida. Solo presentación.
 */
export default function BuscadorGlobal({ abierto, onClose, secciones }) {
  const [q, setQ] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    if (abierto) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setQ('')
      setTimeout(() => inputRef.current?.focus(), 30)
    }
  }, [abierto])

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    if (abierto) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [abierto, onClose])

  const f = norm(q.trim())
  const secs = secciones
    .filter((s) => !f || norm(s.label).includes(f))
    .map((s) => ({ tipo: 'Sección', id: s.id, label: s.label, sub: null }))
  const terms = (f ? TERMINOS.filter((t) => norm(t.t).includes(f) || norm(t.d).includes(f)) : [])
    .map((t) => ({ tipo: 'Glosario', id: 'glosario', label: t.t, sub: t.d }))
  const resultados = [...secs, ...terms].slice(0, 8)

  const ir = (id) => { onClose(); NavContext.go?.(id) }

  return (
    <AnimatePresence>
      {abierto && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            className="fixed left-1/2 top-24 z-[61] w-[90%] max-w-lg -translate-x-1/2"
          >
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white shadow-2xl dark:bg-[#1e252e]">
              <div className="flex items-center gap-2 border-b border-gray-200 px-4">
                <Search size={18} className="text-gray-400" />
                <input
                  ref={inputRef}
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Buscar secciones o términos…"
                  className="w-full bg-transparent py-3.5 text-sm text-gray-800 outline-none"
                />
                <kbd className="rounded bg-gray-100 px-1.5 py-0.5 text-[10px] text-gray-500">Esc</kbd>
              </div>
              <ul className="max-h-80 overflow-y-auto py-2">
                {resultados.length === 0 && (
                  <li className="px-4 py-6 text-center text-sm text-gray-400">Sin resultados para "{q}"</li>
                )}
                {resultados.map((r, i) => (
                  <li key={`${r.tipo}-${r.label}-${i}`}>
                    <button
                      onClick={() => ir(r.id)}
                      className="flex w-full items-center gap-3 px-4 py-2.5 text-left transition hover:bg-gray-50"
                    >
                      <span className="rounded-md bg-teal-50 px-2 py-0.5 text-[10px] font-semibold text-teal-700">{r.tipo}</span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-medium text-gray-800">{r.label}</span>
                        {r.sub && <span className="block truncate text-xs text-gray-500">{r.sub}</span>}
                      </span>
                      <CornerDownLeft size={14} className="text-gray-300" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
