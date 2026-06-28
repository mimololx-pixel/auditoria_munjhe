import { useEffect, useState } from 'react'

/*
 * Índice lateral (TOC) con scroll-spy (solo presentación). Lee los subtítulos
 * (<h3>) de la sección activa, les asigna un id y resalta el que estás leyendo.
 * Visible solo en pantallas grandes (xl); oculto en móvil/tablet.
 */
const slug = (s) =>
  s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

export default function IndiceLateral({ activa }) {
  const [items, setItems] = useState([])
  const [actual, setActual] = useState(null)

  useEffect(() => {
    let io
    const t = setTimeout(() => {
      const hs = Array.from(document.querySelectorAll('main h3'))
      const list = hs.map((h) => {
        const text = h.textContent.trim()
        if (!h.id) h.id = slug(text)
        return { id: h.id, text }
      })
      setItems(list)
      setActual(list[0]?.id ?? null)
      io = new IntersectionObserver(
        (entradas) => entradas.forEach((e) => { if (e.isIntersecting) setActual(e.target.id) }),
        { rootMargin: '-15% 0px -75% 0px' },
      )
      hs.forEach((h) => io.observe(h))
    }, 90)
    return () => { clearTimeout(t); io?.disconnect() }
  }, [activa])

  if (items.length < 2) return null
  return (
    <nav className="fixed right-6 top-1/2 z-20 hidden -translate-y-1/2 xl:block" aria-label="Índice de la sección">
      <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-gray-400">En esta página</p>
      <ul className="space-y-1.5 border-l border-gray-200 pl-3">
        {items.map((it) => (
          <li key={it.id}>
            <button
              onClick={() => document.getElementById(it.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              className={`block max-w-[12rem] truncate text-left text-xs transition ${actual === it.id ? 'font-semibold text-indigo-600' : 'text-gray-500 hover:text-gray-800'}`}
            >
              {it.text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
