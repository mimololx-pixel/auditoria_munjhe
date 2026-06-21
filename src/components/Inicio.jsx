import { Page, Card } from './ui'
import { NavContext } from '../nav'

/*
 * Portada de bienvenida (solo presentación).
 * Pensada para alguien que NO sabe de programación ni de seguridad:
 * explica qué es esto, cómo leerlo y a dónde ir.
 */

const ATAQUES = [
  { id: 'sqli', emoji: '🗄️', titulo: 'Inyección SQL', desc: 'Robar la base de datos de clientes', nivel: '🟠 Grave' },
  { id: 'xss', emoji: '💬', titulo: 'XSS', desc: 'Ejecutar código en el navegador de un huésped', nivel: '🟡 Moderada' },
  { id: 'comandos', emoji: '💻', titulo: 'Inyección de comandos', desc: 'Tomar control del servidor', nivel: '🔴 Muy grave' },
]

export default function Inicio() {
  return (
    <Page>
      {/* Hero */}
      <div className="text-center mb-10">
        <div className="text-5xl mb-4">🏨🔒</div>
        <h1 className="text-4xl font-extrabold text-gray-800 mb-3">
          Auditoría de seguridad<br />Hotel Costa Brava
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Una revisión, en lenguaje simple, de los riesgos de seguridad del portal de clientes
          del hotel: qué puede salir mal, qué tan grave es y cómo protegerse.
        </p>
      </div>

      {/* Cómo leer esto */}
      <Card className="mb-6 bg-teal-50 border-teal-200">
        <p className="font-bold text-teal-900 mb-2">👋 ¿Primera vez aquí?</p>
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
      <div className="grid sm:grid-cols-3 gap-3 mb-8">
        {[
          ['🟢', 'Leve', 'Mantener bajo observación', 'bg-green-50 border-green-200'],
          ['🟡', 'Moderada', 'Planificar la corrección', 'bg-yellow-50 border-yellow-200'],
          ['🔴', 'Grave / Muy grave', 'Corregir cuanto antes', 'bg-red-50 border-red-200'],
        ].map(([e, t, d, cls]) => (
          <Card key={t} className={cls}>
            <p className="text-2xl mb-1">{e}</p>
            <p className="font-semibold text-gray-800">{t}</p>
            <p className="text-sm text-gray-600">{d}</p>
          </Card>
        ))}
      </div>

      {/* Accesos a los ataques */}
      <h3 className="text-xl font-semibold text-gray-800 mb-3">Los 3 riesgos analizados</h3>
      <div className="grid sm:grid-cols-3 gap-3 mb-8">
        {ATAQUES.map((a) => (
          <button key={a.id} onClick={() => NavContext.go?.(a.id)} className="text-left">
            <Card className="h-full hover:border-teal-400 hover:shadow-md transition">
              <p className="text-3xl mb-2">{a.emoji}</p>
              <p className="font-semibold text-gray-800">{a.titulo}</p>
              <p className="text-sm text-gray-600 mb-2">{a.desc}</p>
              <p className="text-xs text-gray-500">{a.nivel}</p>
            </Card>
          </button>
        ))}
      </div>

      {/* Nota ética */}
      <Card className="bg-gray-50 border-gray-200">
        <p className="text-sm text-gray-600">
          🛡️ <strong>Entorno autorizado.</strong> Todas las pruebas se hicieron sobre una
          aplicación de práctica preparada para el curso (DVWA), no sobre sistemas reales.
          Estas técnicas se estudian con un fin <strong>defensivo</strong>: saber cómo ocurren
          los ataques para poder prevenirlos.
        </p>
      </Card>
    </Page>
  )
}
