/*
 * Puente de navegación simple: App registra `go(id)` y cualquier componente
 * (p. ej. la portada) puede saltar a otra sección llamando NavContext.go('sqli').
 */
export const NavContext = { go: null }

/*
 * Orden del recorrido guiado (solo secciones con contenido publicado).
 * Lo usan los botones "Anterior / Siguiente" (NavPie). Las secciones del
 * Informe B aún no se incluyen porque todavía no tienen componente.
 */
export const ORDEN = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'resumen', label: 'Introducción' },
  { id: 'sqli', label: 'Inyección SQL' },
  { id: 'xss', label: 'XSS' },
  { id: 'comandos', label: 'Inyección de comandos' },
  { id: 'activos', label: 'Activos y riesgos' },
  { id: 'matriz', label: 'Matriz de riesgo' },
  { id: 'controles', label: 'Controles' },
  { id: 'recuperacion', label: 'Recuperación' },
  { id: 'reto', label: 'Pon a prueba' },
  { id: 'prompts', label: 'Bitácora de IA' },
  { id: 'glosario', label: 'Glosario' },
]
