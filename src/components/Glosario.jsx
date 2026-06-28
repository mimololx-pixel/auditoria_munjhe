import { useState } from 'react'
import { BookOpen, Search } from 'lucide-react'
import { Page, SectionHero, NavPie, Card } from './ui'
import { TERMINOS, norm } from '../data/glosario'

/*
 * Glosario en lenguaje simple (solo presentación).
 * Consume la fuente única src/data/glosario.js (reutilizada por tooltips y buscador).
 */
export default function Glosario() {
  const [q, setQ] = useState('')
  const filtro = norm(q.trim())
  const resultados = filtro
    ? TERMINOS.filter(({ t, d }) => norm(t).includes(filtro) || norm(d).includes(filtro))
    : TERMINOS

  return (
    <Page>
      <SectionHero eyebrow="Ayuda" title="Glosario" Icon={BookOpen} color="teal">
        Definiciones simples de las palabras técnicas que aparecen en el informe.
      </SectionHero>

      {/* Buscador */}
      <div className="relative mb-5">
        <Search size={18} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar un término…"
          className="w-full rounded-xl border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-800 outline-none transition focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
        />
      </div>

      {resultados.length > 0 ? (
        <div className="grid sm:grid-cols-2 gap-3">
          {resultados.map(({ Icon, t, d }) => (
            <Card key={t}>
              <p className="mb-1 flex items-center gap-2 font-semibold text-teal-700">
                <Icon size={18} className="shrink-0" /> {t}
              </p>
              <p className="text-sm text-gray-600">{d}</p>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-700">
          No se encontraron términos para "<strong>{q}</strong>".
        </p>
      )}

      <NavPie id="glosario" />
    </Page>
  )
}
