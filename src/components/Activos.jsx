import { Boxes } from 'lucide-react'
import { Page, SectionHero, NavPie, Card, H3 } from './ui'
import { ArteActivos } from './ilustraciones'

/*
 * 05 · Activos de Información y Riesgos — Hotel Costa Brava
 * Espejo de docs_munjhe/05_activos_munjhe.md (fuente evaluable — ver CLAUDE.md).
 * Criterio 3.1.2. Insumo de la matriz de riesgo (06): los riesgos R1…R6 se grafican allá.
 */

/* Chip de criticidad — strings completos (Tailwind v4 no detecta clases dinámicas, ver CLAUDE.md) */
const CRIT = {
  Alta: 'bg-red-100 text-red-800',
  Media: 'bg-amber-100 text-amber-800',
  Baja: 'bg-yellow-100 text-yellow-800',
}
const CRIT_EMOJI = { Alta: '🔴', Media: '🟠', Baja: '🟡' }

/* Color suave por categoría de activo */
const CAT = {
  Datos: 'bg-blue-50 text-blue-700',
  Software: 'bg-purple-50 text-purple-700',
  'Infraestructura/Cloud': 'bg-cyan-50 text-cyan-700',
  'Físico/IoT': 'bg-teal-50 text-teal-700',
}

const ACTIVOS = [
  { id: 'A1', nombre: 'Base de datos de huéspedes', cat: 'Datos', desc: 'Datos personales (nombre, RUT/pasaporte, correo, teléfono). Ley 19.628.', crit: 'Alta' },
  { id: 'A2', nombre: 'Datos de pago / tarjetas', cat: 'Datos', desc: 'Números de tarjeta y facturación de reservas. Alcance PCI-DSS.', crit: 'Alta' },
  { id: 'A3', nombre: 'Datos de reservas y estadías', cat: 'Datos', desc: 'Fechas, habitaciones, historial y preferencias del huésped.', crit: 'Media' },
  { id: 'A4', nombre: 'PMS / motor de reservas', cat: 'Software', desc: 'Property Management System: check-in/out, disponibilidad, tarifas, facturación.', crit: 'Alta' },
  { id: 'A5', nombre: 'Portal de clientes (web)', cat: 'Software', desc: 'La app auditada: búsqueda, reserva y login. Expuesta a internet.', crit: 'Alta' },
  { id: 'A6', nombre: 'Channel manager / OTAs', cat: 'Software', desc: 'Integración con Booking, Expedia… sincroniza disponibilidad y precios.', crit: 'Media' },
  { id: 'A7', nombre: 'Servidor web y base de datos', cat: 'Infraestructura/Cloud', desc: 'Hosting del portal y la BD. Su compromiso da control del sistema completo.', crit: 'Alta' },
  { id: 'A8', nombre: 'Copias de seguridad (backups)', cat: 'Infraestructura/Cloud', desc: 'Respaldos de BD y configuración: última defensa ante ransomware o borrado.', crit: 'Alta' },
  { id: 'A9', nombre: 'Red corporativa e internet', cat: 'Infraestructura/Cloud', desc: 'Conectividad del hotel; su caída detiene reservas, pagos y PMS.', crit: 'Media' },
  { id: 'A10', nombre: 'Cerraduras electrónicas', cat: 'Físico/IoT', desc: 'Llaves/tarjetas RFID en red; su compromiso afecta la seguridad física.', crit: 'Media' },
  { id: 'A11', nombre: 'Wi-Fi de huéspedes', cat: 'Físico/IoT', desc: 'Red abierta a clientes; sin segmentar, es puerta a la red interna.', crit: 'Baja' },
  { id: 'A12', nombre: 'Cámaras / CCTV y POS recepción', cat: 'Físico/IoT', desc: 'Videovigilancia y punto de venta de recepción en la red del hotel.', crit: 'Baja' },
]

const RIESGOS = [
  {
    id: 'R1', titulo: 'Fuga masiva de la base de datos de huéspedes', origen: 'Inyección SQL (Informe A)', tono: 'red',
    activos: 'A1, A2', impacto: 'Filtración de miles de huéspedes → suplantación y fraude, incumplimiento de la Ley 19.628, multas y daño reputacional.',
  },
  {
    id: 'R2', titulo: 'Robo de sesión y suplantación de huéspedes', origen: 'XSS (Informe A)', tono: 'amber',
    activos: 'A5, A1/A3', impacto: 'El atacante actúa como el huésped: ve y modifica sus reservas, datos y pagos. Pérdida de confianza y posible fraude.',
  },
  {
    id: 'R3', titulo: 'Toma de control del servidor', origen: 'Inyección de comandos (Informe A)', tono: 'purple',
    activos: 'A7 (y A1, A2, A3)', impacto: 'Compromiso total: robo de toda la información, malware y uso del servidor para atacar. El peor escenario técnico.',
  },
  {
    id: 'R4', titulo: 'Ransomware que cifra el PMS', origen: 'Malware (sector hotelero)', tono: 'red',
    activos: 'A4, A8, A7', impacto: 'El hotel no puede hacer check-in/out ni facturar; operación detenida, rescate exigido y posible pérdida definitiva de datos.',
  },
  {
    id: 'R5', titulo: 'Caída / denegación de servicio en temporada alta', origen: 'Disponibilidad (sector hotelero)', tono: 'cyan',
    activos: 'A5, A9, A6', impacto: 'Sin motor de reservas en plena demanda → pérdida directa de ventas, clientes que reservan en la competencia y daño en las OTAs.',
  },
  {
    id: 'R6', titulo: 'Phishing y fraude de reservas', origen: 'Ingeniería social (sector hotelero)', tono: 'amber',
    activos: 'Personas, A2, A4', impacto: 'Cobros fraudulentos a nombre del hotel, robo de credenciales que abre la puerta a los demás riesgos y erosión de la marca.',
  },
]

const TONO_RIESGO = {
  red: 'border-red-200 bg-red-50',
  amber: 'border-amber-200 bg-amber-50',
  purple: 'border-purple-200 bg-purple-50',
  cyan: 'border-cyan-200 bg-cyan-50',
}

const GLOSARIO = [
  ['R1 — Fuga de datos', 'Se filtró la lista completa de huéspedes: nombres, documentos y contactos quedan expuestos. Riesgo de estafas a los clientes y multas para el hotel.'],
  ['R2 — Robo de sesión', 'Alguien entró haciéndose pasar por un huésped y ve o cambia sus reservas y datos como si fuera esa persona.'],
  ['R3 — Control del servidor', 'Le robaron las llaves del computador central del hotel: pueden ver todo, borrar todo o instalar virus.'],
  ['R4 — Ransomware', 'El sistema de reservas quedó secuestrado: piden dinero y nadie puede registrar entradas, salidas ni cobrar hasta resolverlo.'],
  ['R5 — Caída del sitio', 'La página de reservas se cayó justo en temporada alta: los clientes no pueden reservar y se van a la competencia.'],
  ['R6 — Phishing / fraude', 'Estafadores se hacen pasar por el hotel y engañan a clientes o al personal con correos falsos para robar pagos o contraseñas.'],
]

export default function Activos() {
  return (
    <Page>
      <SectionHero eyebrow="Informe B · Matriz de riesgo · 3.1.2" title="Activos y riesgos" Icon={Boxes} color="emerald" arte={<ArteActivos className="w-full" />}>
        Qué tiene que proteger el hotel y qué puede salir mal. Estos activos y riesgos son el
        <strong> insumo de la matriz de riesgo</strong> que viene en la sección 06.
      </SectionHero>

      <H3>Qué es un activo (en simple)</H3>
      <p className="text-gray-600 mb-4">
        Un <strong>activo de información</strong> es cualquier cosa con valor para el negocio que,
        si se pierde, se filtra o deja de funcionar, le hace daño al hotel: no solo los datos, sino
        también el software que opera (el sistema de reservas), la infraestructura donde corre e
        incluso los dispositivos físicos en la red (las cerraduras electrónicas).
      </p>
      <Card className="mb-8 bg-gray-50 border-gray-200">
        <p className="text-sm text-gray-600">
          La <strong>criticidad</strong> responde a: <em>"si este activo falla o se filtra, ¿cuánto
          duele?"</em> — 🔴 <strong>Alta</strong> (el hotel se detiene o hay datos sensibles),
          🟠 <strong>Media</strong> (afecta, pero hay alternativas) o 🟡 <strong>Baja</strong>.
        </p>
      </Card>

      <H3>1. Identificación y clasificación de activos</H3>
      <p className="text-gray-600 mb-4">
        Cuatro categorías: <strong>Datos</strong>, <strong>Software</strong>,
        <strong> Infraestructura/Cloud</strong> y <strong>Físico/IoT</strong>.
      </p>
      <Card className="mb-8 p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left text-gray-500">
                <th className="px-3 py-2 font-medium">ID</th>
                <th className="px-3 py-2 font-medium">Activo</th>
                <th className="px-3 py-2 font-medium">Categoría</th>
                <th className="px-3 py-2 font-medium">Descripción técnica</th>
                <th className="px-3 py-2 font-medium">Criticidad</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {ACTIVOS.map((a) => (
                <tr key={a.id} className="align-top">
                  <td className="px-3 py-2 font-mono text-xs text-gray-500">{a.id}</td>
                  <td className="px-3 py-2 font-medium text-gray-800">{a.nombre}</td>
                  <td className="px-3 py-2">
                    <span className={`inline-block rounded-full px-2 py-0.5 text-xs ${CAT[a.cat]}`}>{a.cat}</span>
                  </td>
                  <td className="px-3 py-2 text-gray-600">{a.desc}</td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${CRIT[a.crit]}`}>
                      {CRIT_EMOJI[a.crit]} {a.crit}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <H3>2. Riesgos del sector hotelero (paso a paso)</H3>
      <p className="text-gray-600 mb-4">
        Cada riesgo lleva un <strong>ID (R1…R6)</strong> que se reutiliza en la matriz (06). Los
        tres primeros nacen de los ataques <strong>demostrados</strong> en el Informe A; los tres
        siguientes son amenazas típicas del rubro hotelero.
      </p>
      <div className="space-y-3 mb-8">
        {RIESGOS.map((r) => (
          <Card key={r.id} className={`${TONO_RIESGO[r.tono]}`}>
            <div className="flex flex-wrap items-baseline gap-2 mb-1">
              <span className="font-mono text-xs font-bold text-gray-500">{r.id}</span>
              <span className="font-semibold text-gray-800">{r.titulo}</span>
              <span className="ml-auto text-xs text-gray-500">{r.origen}</span>
            </div>
            <p className="text-xs text-gray-500 mb-1">Activos afectados: <span className="font-mono">{r.activos}</span></p>
            <p className="text-sm text-gray-700">{r.impacto}</p>
          </Card>
        ))}
      </div>

      <H3>3. 📖 Glosario de riesgos para humanos</H3>
      <p className="text-gray-600 mb-4">
        Los mismos riesgos, sin tecnicismos: qué pasaría <strong>en la práctica</strong> en el hotel.
      </p>
      <div className="grid gap-3 sm:grid-cols-2 mb-8">
        {GLOSARIO.map(([titulo, texto]) => (
          <Card key={titulo} className="bg-emerald-50/60 border-emerald-200">
            <p className="text-sm font-semibold text-emerald-900 mb-1">{titulo}</p>
            <p className="text-sm text-emerald-900/90">{texto}</p>
          </Card>
        ))}
      </div>

      <Card className="mb-2 bg-cyan-50 border-cyan-200">
        <p className="text-sm text-cyan-900">
          👉 Estos seis riesgos (R1–R6), con su probabilidad e impacto, son los que la
          <strong> sección 06</strong> ordenará y priorizará en la <strong>matriz de riesgo y su
          mapa de calor</strong>.
        </p>
      </Card>

      <NavPie id="activos" />
    </Page>
  )
}
