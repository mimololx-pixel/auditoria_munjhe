/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react'

/*
 * Preferencias de la interfaz (solo presentación), persistidas en localStorage:
 * - Modo de lectura: "técnico" (todo el detalle) o "simple" (solo lo esencial).
 * - Tema: claro u oscuro.
 */
const PrefCtx = createContext(null)

export function PreferenciasProvider({ children }) {
  const [tecnico, setTecnico] = useState(() => {
    const v = localStorage.getItem('pref-tecnico')
    return v === null ? true : v === '1'
  })
  const [oscuro, setOscuro] = useState(() => localStorage.getItem('pref-oscuro') === '1')

  useEffect(() => {
    localStorage.setItem('pref-tecnico', tecnico ? '1' : '0')
  }, [tecnico])

  useEffect(() => {
    localStorage.setItem('pref-oscuro', oscuro ? '1' : '0')
    document.documentElement.classList.toggle('dark', oscuro)
  }, [oscuro])

  return (
    <PrefCtx.Provider value={{ tecnico, setTecnico, oscuro, setOscuro }}>
      {children}
    </PrefCtx.Provider>
  )
}

export function usePref() {
  const ctx = useContext(PrefCtx)
  if (!ctx) throw new Error('usePref debe usarse dentro de <PreferenciasProvider>')
  return ctx
}
