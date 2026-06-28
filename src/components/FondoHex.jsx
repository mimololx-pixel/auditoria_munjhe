import { useEffect, useRef, useState } from 'react'

/*
 * Fondo decorativo (solo presentación): una rejilla de hexágonos tenue, siempre
 * visible, donde los hexágonos cercanos al cursor se iluminan. El "encendido" lo
 * mueve el propio usuario con el mouse, así que funciona aunque el sistema tenga
 * activado prefers-reduced-motion. La rejilla, además, "late" suavemente (ese
 * latido sí se congela con reduced-motion). No bloquea clics (pointer-events: none).
 */

const R = 40            // radio del hexágono (centro → vértice)
const GLOW = 175        // radio del halo del cursor

/* Vértices de un hexágono pointy-top centrado en (cx, cy). */
function hexPuntos(cx, cy) {
  let p = ''
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 180) * (60 * i - 90)
    p += `${(cx + R * Math.cos(a)).toFixed(1)},${(cy + R * Math.sin(a)).toFixed(1)} `
  }
  return p.trim()
}

/* Centros que cubren el viewport (rejilla hexagonal con filas desplazadas). */
function calcularCentros(w, h) {
  const dx = Math.sqrt(3) * R   // separación horizontal
  const dy = 1.5 * R            // separación vertical
  const centros = []
  let fila = 0
  for (let y = -R; y < h + R; y += dy, fila++) {
    const offset = fila % 2 ? dx / 2 : 0
    for (let x = -R; x < w + dx; x += dx) {
      centros.push([x + offset, y])
    }
  }
  return centros
}

export default function FondoHex() {
  const [size, setSize] = useState(() => ({
    w: typeof window !== 'undefined' ? window.innerWidth : 1280,
    h: typeof window !== 'undefined' ? window.innerHeight : 800,
  }))
  const gradRef = useRef(null)

  /* Recalcular la rejilla al cambiar el tamaño de la ventana. */
  useEffect(() => {
    let raf = 0
    const onResize = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        setSize({ w: window.innerWidth, h: window.innerHeight })
      })
    }
    window.addEventListener('resize', onResize)
    return () => { window.removeEventListener('resize', onResize); if (raf) cancelAnimationFrame(raf) }
  }, [])

  /* El halo sigue al cursor (solo con mouse). Mueve el centro del gradiente por
     atributo, sin re-render de React. */
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    let raf = 0
    const onMove = (e) => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        const g = gradRef.current
        if (g) { g.setAttribute('cx', e.clientX); g.setAttribute('cy', e.clientY) }
      })
    }
    window.addEventListener('pointermove', onMove)
    return () => { window.removeEventListener('pointermove', onMove); if (raf) cancelAnimationFrame(raf) }
  }, [])

  const centros = calcularCentros(size.w, size.h)
  const puntos = centros.map(([x, y], i) => (
    <polygon key={i} points={hexPuntos(x, y)} />
  ))

  return (
    <svg className="orbes hex-svg" width="100%" height="100%" aria-hidden="true">
      <defs>
        <g id="hexes">{puntos}</g>
        <radialGradient ref={gradRef} id="hexSpot" gradientUnits="userSpaceOnUse"
          cx={size.w / 2} cy={size.h / 3} r={GLOW}>
          <stop offset="0%" style={{ stopColor: 'var(--hex-glow)' }} stopOpacity="1" />
          <stop offset="100%" style={{ stopColor: 'var(--hex-glow)' }} stopOpacity="0" />
        </radialGradient>
        <mask id="hexMask">
          <use href="#hexes" fill="#fff" stroke="#fff" strokeWidth="2" />
        </mask>
      </defs>

      {/* Hexágonos encendidos cerca del cursor (debajo de las líneas) */}
      <rect width={size.w} height={size.h} fill="url(#hexSpot)" mask="url(#hexMask)" />

      {/* Rejilla siempre visible (con latido), por encima del glow para delimitar
          bien cada hexágono. Colores y latido van por CSS (.grid). */}
      <use href="#hexes" className="grid" strokeWidth="1" />
    </svg>
  )
}
