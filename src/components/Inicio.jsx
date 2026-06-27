import { lazy, Suspense } from 'react'
import { Page, Card, ComparativaCVSS } from './ui'
import { NavContext } from '../nav'
import { HeroHotelSeguro } from './ilustraciones'

/* Detalle 3D (three.js) cargado de forma diferida: no entra en el bundle del resto de secciones */
const Hero3D = lazy(() => import('./Hero3D'))
import {
  ArrowRight, Compass, BookOpen, Database, MessageSquareCode, TerminalSquare,
  ShieldCheck, AlertTriangle, Flame, ShieldHalf,
} from 'lucide-react'

/*
 * Portada de bienvenida (solo presentación).
 * Pensada para alguien que NO sabe de programación ni de seguridad:
 * explica qué es esto, cómo leerlo y a dónde ir.
 */

const ATAQUES = [
  { id: 'sqli', Icon: Database, titulo: 'Inyección SQL', desc: 'Robar la base de datos de clientes', nivel: 'Grave', color: 'text-orange-600 bg-orange-50' },
  { id: 'xss', Icon: MessageSquareCode, titulo: 'XSS', desc: 'Ejecutar código en el navegador de un huésped', nivel: 'Moderada', color: 'text-yellow-600 bg-yellow-50' },
  { id: 'comandos', Icon: TerminalSquare, titulo: 'Inyección de comandos', desc: 'Tomar control del servidor', nivel: 'Muy grave', color: 'text-red-600 bg-red-50' },
]

const NIVELES = [
  { Icon: ShieldCheck, t: 'Leve', d: 'Mantener bajo observación', cls: 'bg-green-50 border-green-200', ic: 'text-green-600' },
  { Icon: AlertTriangle, t: 'Moderada', d: 'Planificar la corrección', cls: 'bg-yellow-50 border-yellow-200', ic: 'text-yellow-600' },
  { Icon: Flame, t: 'Grave / Muy grave', d: 'Corregir cuanto antes', cls: 'bg-red-50 border-red-200', ic: 'text-red-600' },
]

export default function Inicio() {
  return (
    <Page>
      {/* Hero */}
      <div className="grid items-center gap-6 md:grid-cols-2 mb-12">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold text-teal-700 mb-4">
            <ShieldHalf size={14} /> Auditoría de seguridad
          </span>
          <h1 className="text-4xl font-extrabold leading-tight text-gray-800 mb-3">
            Hotel Costa Brava
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            Una revisión, <strong>en lenguaje simple</strong>, de los riesgos de seguridad del
            portal de clientes del hotel: qué puede salir mal, qué tan grave es y cómo protegerse.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => NavContext.go?.('resumen')}
              className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-teal-700"
            >
              <Compass size={18} /> Comenzar el recorrido <ArrowRight size={18} />
            </button>
            <button
              onClick={() => NavContext.go?.('glosario')}
              className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-3 font-semibold text-gray-700 transition hover:border-teal-400 hover:text-teal-700"
            >
              <BookOpen size={18} /> Glosario
            </button>
          </div>
        </div>
        <Suspense fallback={<HeroHotelSeguro className="w-full max-w-md mx-auto" />}>
          <Hero3D className="w-full max-w-md mx-auto" />
        </Suspense>
      </div>

      {/* Cómo leer esto */}
      <Card className="mb-8 bg-teal-50 border-teal-200">
        <p className="flex items-center gap-2 font-bold text-teal-900 mb-2">
          <Compass size={18} /> ¿Primera vez aquí?
        </p>
        <p className="text-teal-900 text-sm mb-2">
          No necesitas saber nada de tecnología. Cada sección explica un riesgo con un ejemplo
          cotidiano, una imagen de la prueba, qué tan grave es y cómo se evita.
        </p>
        <p className="text-teal-900 text-sm">
          Si ves una palabra rara (CVSS, <em>payload</em>, XSS…), búscala en el
          {' '}<button onClick={() => NavContext.go?.('glosario')} className="underline font-semibold">Glosario</button>.
        </p>
      </Card>

      {/* Leyenda de niveles de riesgo */}
      <h3 className="text-xl font-semibold text-gray-800 mb-3">Cómo entender la gravedad</h3>
      <div className="grid sm:grid-cols-3 gap-3 mb-10">
        {NIVELES.map(({ Icon, t, d, cls, ic }) => (
          <Card key={t} className={cls}>
            <Icon className={`mb-1 ${ic}`} size={26} />
            <p className="font-semibold text-gray-800">{t}</p>
            <p className="text-sm text-gray-600">{d}</p>
          </Card>
        ))}
      </div>

      {/* Accesos a los ataques */}
      <h3 className="text-xl font-semibold text-gray-800 mb-3">Los 3 riesgos analizados</h3>
      <div className="grid sm:grid-cols-3 gap-3 mb-10">
        {ATAQUES.map(({ id, Icon, titulo, desc, nivel, color }) => (
          <button key={id} onClick={() => NavContext.go?.(id)} className="text-left">
            <Card className="h-full transition hover:border-teal-400 hover:shadow-md">
              <span className={`inline-flex items-center justify-center rounded-xl p-2.5 mb-3 ${color}`}>
                <Icon size={24} />
              </span>
              <p className="font-semibold text-gray-800">{titulo}</p>
              <p className="text-sm text-gray-600 mb-2">{desc}</p>
              <p className="text-xs font-medium text-gray-500">Gravedad: {nivel}</p>
            </Card>
          </button>
        ))}
      </div>

      {/* Comparativa de gravedad */}
      <h3 className="text-xl font-semibold text-gray-800 mb-3">Comparación de gravedad</h3>
      <Card className="mb-10">
        <p className="text-sm text-gray-600 mb-4">
          Qué tan peligroso es cada riesgo, en una escala internacional del 0 al 10 (CVSS).
          Mientras más larga y roja la barra, más urgente es corregirlo.
        </p>
        <ComparativaCVSS
          datos={[
            { label: 'Inyección SQL', score: 7.5 },
            { label: 'XSS', score: 6.1 },
            { label: 'Inyección de comandos', score: 9.8 },
          ]}
        />
      </Card>

      {/* Nota ética */}
      <Card className="bg-gray-50 border-gray-200">
        <p className="flex items-start gap-2 text-sm text-gray-600">
          <ShieldCheck size={18} className="mt-0.5 shrink-0 text-teal-600" />
          <span>
            <strong>Entorno autorizado.</strong> Todas las pruebas se hicieron sobre una
            aplicación de práctica preparada para el curso (DVWA), no sobre sistemas reales.
            Estas técnicas se estudian con un fin <strong>defensivo</strong>: saber cómo ocurren
            los ataques para poder prevenirlos.
          </span>
        </p>
      </Card>
    </Page>
  )
}
