/*
 * Fuente única de verdad del sistema de severidad (solo presentación).
 * Antes los colores de banda vivían dispersos en Matriz.jsx, Dashboard.jsx y
 * ui.jsx y no coincidían. Aquí se centraliza la paleta canónica para que la
 * matriz, el panel ejecutivo, el medidor CVSS y los badges hablen el mismo
 * idioma de color.
 *
 * Paleta canónica:  bajo = emerald · medio = amber · alto = orange · crítico = red
 *
 * Por banda se exponen varios tokens, según el uso:
 *   · cell  → celda del mapa de calor (rampa clara→intensa, con su color de texto)
 *   · solid → relleno saturado (barras de distribución, segmentos del medidor)
 *   · badge → píldora suave (chips, etiquetas de prioridad)
 *   · dot   → punto de color de las leyendas
 *
 * Strings completos a propósito: Tailwind v4 no detecta clases dinámicas
 * construidas por interpolación (ver CLAUDE.md).
 */

export const BANDAS = {
  critico: {
    clave: 'critico', nombre: 'Crítico', emoji: '🔴', min: 15,
    cell: 'bg-red-400 text-white',
    solid: 'bg-red-500',
    badge: 'bg-red-100 text-red-800',
    dot: 'bg-red-500',
  },
  alto: {
    clave: 'alto', nombre: 'Alto', emoji: '🟠', min: 10,
    cell: 'bg-orange-300 text-orange-900',
    solid: 'bg-orange-400',
    badge: 'bg-orange-100 text-orange-800',
    dot: 'bg-orange-400',
  },
  medio: {
    clave: 'medio', nombre: 'Medio', emoji: '🟡', min: 5,
    cell: 'bg-amber-200 text-amber-900',
    solid: 'bg-amber-400',
    badge: 'bg-amber-100 text-amber-800',
    dot: 'bg-amber-400',
  },
  bajo: {
    clave: 'bajo', nombre: 'Bajo', emoji: '🟢', min: 1,
    cell: 'bg-emerald-200 text-emerald-900',
    solid: 'bg-emerald-500',
    badge: 'bg-emerald-100 text-emerald-800',
    dot: 'bg-emerald-500',
  },
}

/* Orden de mayor a menor gravedad (útil para iterar leyendas) */
export const BANDAS_ORDEN = [BANDAS.critico, BANDAS.alto, BANDAS.medio, BANDAS.bajo]

/* Banda de un nivel P×I (1–25) según su umbral mínimo. */
export function bandaDe(nivel) {
  return BANDAS_ORDEN.find((b) => nivel >= b.min) ?? BANDAS.bajo
}

/*
 * Niveles de severidad CVSS (0–10) alineados 1:1 con las bandas anteriores,
 * para que "Muy grave/Grave/Moderada/Leve" usen exactamente los mismos colores
 * que Crítico/Alto/Medio/Bajo.
 */
export const NIVELES_CVSS = [
  { min: 9.0, etiqueta: 'Muy grave', accion: 'corregir de inmediato', banda: BANDAS.critico },
  { min: 7.0, etiqueta: 'Grave', accion: 'corregir pronto', banda: BANDAS.alto },
  { min: 4.0, etiqueta: 'Moderada', accion: 'planificar corrección', banda: BANDAS.medio },
  { min: 0.0, etiqueta: 'Leve', accion: 'mantener bajo observación', banda: BANDAS.bajo },
]

/* Nivel CVSS de un puntaje 0–10. */
export function nivelCVSS(score) {
  return NIVELES_CVSS.find((n) => score >= n.min) ?? NIVELES_CVSS[NIVELES_CVSS.length - 1]
}
