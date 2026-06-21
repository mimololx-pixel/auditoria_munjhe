import { motion } from 'framer-motion'

/*
 * Componente de ejemplo / plantilla.
 *
 * Patrón del proyecto: 1 componente .jsx por sección, ESPEJADO con un .md en
 * docs_munjhe/. El contenido evaluable vive en el .md (ver CLAUDE.md → REGLA DE ORO).
 * Este componente solo renderiza/visualiza ese contenido de forma interactiva.
 *
 * Copia este archivo para cada sección nueva (Seccion01.jsx, Seccion02.jsx, …)
 * y regístralo en el array `secciones` de App.jsx.
 */
export default function Plantilla() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto px-6 py-12"
    >
      <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">
        Sección de ejemplo
      </p>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Plantilla de sección
      </h2>
      <p className="text-gray-600 mb-4">
        Reemplaza este componente con el contenido real de la auditoría. Recuerda
        que la fuente de verdad evaluable es el archivo <code>.md</code> en{' '}
        <code>docs_munjhe/</code> — mantenlo sincronizado con lo que muestres aquí.
      </p>
    </motion.div>
  )
}
