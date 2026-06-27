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
  { id: 'resumen', label: '01 · Resumen' },
  { id: 'sqli', label: '02 · Inyección SQL' },
  { id: 'xss', label: '03 · XSS' },
  { id: 'comandos', label: '04 · Inyección de comandos' },
  { id: 'activos', label: '05 · Activos' },
  { id: 'matriz', label: '06 · Matriz de riesgo' },
  { id: 'prompts', label: '09 · Bitácora de IA' },
  { id: 'glosario', label: 'Glosario' },
]
