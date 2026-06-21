import { Page, PageHeader, Card, H3 } from './ui'

/*
 * 01 · Resumen — Hotel Costa Brava
 * Espejo de docs_munjhe/01_resumen_munjhe.md (la fuente evaluable — ver CLAUDE.md).
 */
export default function Resumen() {
  return (
    <Page>
      <PageHeader eyebrow="Informe A · Análisis de Vulnerabilidades" title="Resumen — Hotel Costa Brava">
        Presentación de la empresa auditada y de su portal de clientes, en lenguaje claro para
        cualquier persona.
      </PageHeader>

      <H3>La empresa</H3>
      <p className="text-gray-600 mb-4">
        <strong>Hotel Costa Brava</strong> es un hotel de la costa de la Región de Valparaíso,
        de tamaño mediano, orientado a turismo nacional e internacional. Como cualquier hotel
        moderno, su negocio depende de internet: la mayoría de las reservas, pagos y consultas
        de los huéspedes pasan por sus sistemas digitales.
      </p>
      <Card className="mb-3">
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
          {[
            ['Rubro', 'Hotelería / turismo'],
            ['Tamaño', 'Mediano (~120 habitaciones)'],
            ['Canal principal', 'Reservas y atención en línea'],
            ['Información que maneja', 'Datos personales de huéspedes, pagos, reservas'],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="text-gray-400 uppercase tracking-wide text-xs">{k}</dt>
              <dd className="text-gray-700 font-medium">{v}</dd>
            </div>
          ))}
        </dl>
      </Card>
      <p className="text-xs text-gray-400 italic mb-8">
        Hotel Costa Brava es una empresa ficticia, asignada para esta evaluación. El análisis
        técnico se realiza sobre un entorno de laboratorio controlado (DVWA), no sobre sistemas
        reales del hotel.
      </p>

      <H3>El portal de clientes <span className="text-gray-400 font-normal text-base">(lo que auditamos)</span></H3>
      <p className="text-gray-600 mb-4">
        El portal de clientes es el sitio donde los huéspedes crean su cuenta, buscan y reservan
        habitaciones, pagan en línea y consultan su historial. Para funcionar,
        <strong> guarda y consulta información en una base de datos</strong>: nombres, documentos
        de identidad (RUT/pasaporte), correos, teléfonos y datos de pago.
      </p>
      <p className="text-gray-600 mb-4">
        Cada vez que un huésped inicia sesión o busca su reserva, el portal le hace una
        <em> pregunta</em> a esa base de datos. <strong>Ahí está el punto sensible:</strong> si
        el portal no separa bien lo que el usuario escribe de las instrucciones que envía a la
        base de datos, un atacante puede aprovecharlo.
      </p>
      <Card className="mb-8 bg-amber-50 border-amber-200">
        <p className="text-sm text-amber-900 mb-2 font-semibold">¿Por qué es atractivo para un atacante?</p>
        <ul className="text-sm text-amber-900 space-y-1 list-disc list-inside">
          <li><strong>Datos personales</strong> de miles de huéspedes (fraude o suplantación).</li>
          <li><strong>Datos de pago</strong> (tarjetas).</li>
          <li><strong>Patrones de viaje</strong> (cuándo alguien estará fuera de su casa).</li>
        </ul>
      </Card>

      <H3>Por qué esta auditoría</H3>
      <p className="text-gray-600 mb-4">
        Una auditoría de seguridad revisa un sistema <em>como lo haría un atacante</em>, pero con
        <strong> permiso</strong> y con un fin <strong>defensivo</strong>: encontrar las fallas
        antes que los delincuentes, medir su gravedad y proponer cómo corregirlas. Para Hotel
        Costa Brava, una brecha significa:
      </p>
      <div className="grid sm:grid-cols-3 gap-3 mb-8">
        {[
          ['Reputación', 'Pérdida de confianza de los huéspedes y daño a la marca.'],
          ['Legal', 'Sanciones por mal manejo de datos (Ley 19.628 / Ley 21.459).'],
          ['Económico', 'Fraude, multas o caída del servicio de reservas.'],
        ].map(([k, v]) => (
          <Card key={k}>
            <p className="text-sm font-semibold text-gray-800 mb-1">{k}</p>
            <p className="text-sm text-gray-600">{v}</p>
          </Card>
        ))}
      </div>

      <H3>Alcance y método</H3>
      <p className="text-gray-600 mb-4">
        La auditoría se realiza sobre <strong>DVWA</strong> (<em>Damn Vulnerable Web Application</em>),
        una aplicación deliberadamente vulnerable que usamos como "maqueta" del portal del hotel,
        en un entorno controlado y autorizado. Sobre ella se demuestran <strong>tres ataques</strong>:
      </p>
      <Card className="mb-8 p-0 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 text-left">
            <tr>
              <th className="px-4 py-2 font-medium">Ataque</th>
              <th className="px-4 py-2 font-medium">Qué demuestra</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {[
              ['Inyección SQL', 'Exponer toda la base de datos de clientes'],
              ['XSS (Cross-Site Scripting)', 'Ejecutar código en el navegador de la víctima'],
              ['Inyección de comandos', 'Tomar control del servidor'],
            ].map(([a, b]) => (
              <tr key={a}>
                <td className="px-4 py-2 font-medium text-gray-800">{a}</td>
                <td className="px-4 py-2 text-gray-600">{b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Card className="mb-8 bg-red-50 border-red-200">
        <p className="text-sm font-semibold text-red-900 mb-1">Marco ético-legal</p>
        <p className="text-sm text-red-900">
          Todas las pruebas se hacen <strong>únicamente</strong> sobre el entorno DVWA autorizado.
          Atacar sistemas ajenos sin autorización es <strong>delito</strong> en Chile (Ley 21.459).
          Estas técnicas se estudian con un objetivo <strong>defensivo</strong>: saber cómo ocurren
          los ataques para prevenirlos y mitigarlos.
        </p>
      </Card>

      <H3>En resumen</H3>
      <p className="text-gray-600">
        Hotel Costa Brava depende de su portal de clientes para operar, y ese portal concentra
        datos personales y financieros muy sensibles. Por eso, las fallas que se demuestran en las
        siguientes secciones no son detalles técnicos menores: son <strong>riesgos reales para el
        negocio</strong>, su reputación y sus huéspedes.
      </p>
    </Page>
  )
}
