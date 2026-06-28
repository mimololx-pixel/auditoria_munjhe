import { useState } from 'react'
import { LifeBuoy } from 'lucide-react'
import { Page, SectionHero, NavPie, Card, H3, Code } from './ui'
import { ArteRecuperacion } from './ilustraciones'

/*
 * 08 · Mejora Tecnológica y Plan de Recuperación (DR) — Hotel Costa Brava
 * Espejo de docs_munjhe/08_recuperacion_munjhe.md (fuente evaluable — ver CLAUDE.md).
 * Criterio 3.1.6. Materializa C4.2 (backups 3-2-1); responde a R4, R5 y R1.
 */

/* Chip de criticidad — strings completos (Tailwind v4, ver CLAUDE.md) */
const CRIT = {
  Alta: 'bg-red-100 text-red-800',
  Media: 'bg-amber-100 text-amber-800',
}

const SLA = [
  { sistema: 'PMS / motor de reservas', crit: 'Alta', rto: '< 4 horas', rpo: '< 1 hora', backup: 'Réplica en caliente + backup horario' },
  { sistema: 'Portal de clientes (web)', crit: 'Alta', rto: '< 8 horas', rpo: '< 24 horas', backup: 'Despliegue redundante + backup diario' },
  { sistema: 'Datos históricos / reportes', crit: 'Media', rto: '< 24 horas', rpo: '< 24 horas', backup: 'Backup diario offsite' },
]

const ARQUITECTURA = [
  { capa: 'CDN + Anti-DDoS + WAF', aporta: 'Absorbe picos y bloquea ataques', riesgo: 'R5, R1/R2/R3' },
  { capa: 'Balanceador + portal redundante', aporta: 'Elimina el punto único de falla', riesgo: 'R5' },
  { capa: 'BD con réplica (failover)', aporta: 'Continuidad si cae la primaria', riesgo: 'R5' },
  { capa: 'Cifrado en reposo', aporta: 'Datos inútiles si se roban', riesgo: 'R1' },
  { capa: 'Backups 3-2-1 inmutables offsite', aporta: 'Restaurar tras ransomware o borrado', riesgo: 'R4' },
  { capa: 'MFA + segmentación de red', aporta: 'Frena acceso y propagación', riesgo: 'R4, R6' },
]

const FASES = [
  { n: 1, t: 'Detección', d: 'El monitoreo o un reporte detecta la anomalía; se clasifica la severidad y se activa a SecOps.' },
  { n: 2, t: 'Contención', d: 'Aislar lo afectado para frenar la propagación (desconectar, bloquear cuenta, modo mantenimiento). No destruir evidencia.' },
  { n: 3, t: 'Erradicación', d: 'Eliminar la causa raíz: cerrar la vulnerabilidad, quitar el malware, rotar credenciales.' },
  { n: 4, t: 'Recuperación', d: 'Restaurar desde backups limpios, validar integridad y volver a producción según el RTO/RPO.' },
  { n: 5, t: 'Lecciones', d: 'Post-mortem: qué falló, qué control reforzar y actualizar el plan.' },
]

const ESCENARIOS = {
  A: {
    titulo: '🚨 La web/app se cayó por completo',
    pasos: [
      'Confirmar el alcance: ¿es la web, la red o el proveedor? Revisar el monitoreo.',
      'Activar página de mantenimiento para no perder la confianza del cliente.',
      'Revisar servicios y reiniciar el portal; si un nodo falla, el balanceador deriva al sano.',
    ],
    code: `systemctl status nginx            # ¿está arriba el servidor web?
systemctl restart nginx           # reiniciar el servicio del portal
curl -I https://hotelcostabrava.cl  # verificar que responde 200 OK`,
  },
  B: {
    titulo: '🗄️ Error o pérdida de datos en la base de datos',
    pasos: [
      'Detener escrituras (modo mantenimiento) para no corromper más datos.',
      'Identificar el último backup íntegro dentro del RPO.',
      'Restaurar y validar integridad antes de reabrir.',
    ],
    code: `ls -lh /backups/db/                       # ubicar el último respaldo
mysql -u admin -p hotel < /backups/db/hotel_2026-06-27_03h.sql   # restaurar
mysql -u admin -p -e "SELECT COUNT(*) FROM reservas;"            # validar`,
  },
  C: {
    titulo: '🔒 Ransomware (PMS / equipos cifrados)',
    pasos: [
      'Aislar de inmediato los equipos afectados de la red (evitar propagación).',
      'No pagar el rescate; activar el protocolo de incidentes y avisar a SecOps/Gerencia.',
      'Restaurar desde el backup inmutable/offline (la copia que el malware no pudo tocar).',
    ],
    code: `# Desconectar el equipo de la red (contención)
nmcli networking off
# Restaurar el PMS desde la copia offline verificada
restic -r /mnt/backup-offline restore latest --target /srv/pms`,
  },
  D: {
    titulo: '🕵️ Fuga de datos detectada (brecha confirmada)',
    pasos: [
      'Contener: cerrar la vulnerabilidad explotada y rotar todas las credenciales expuestas.',
      'Evaluar el alcance: qué datos y cuántos huéspedes; preservar evidencia (logs).',
      'Notificar según la Ley 19.628 (autoridad y afectados) y comunicar con transparencia.',
    ],
    code: `grep "POST /login" /var/log/portal/access.log | tail -50   # rastrear actividad anómala
# Forzar cambio de contraseñas y revocar sesiones/tokens activos`,
  },
}
const ESC_LABEL = { A: 'A · Web caída', B: 'B · Pérdida de BD', C: 'C · Ransomware', D: 'D · Fuga de datos' }

export default function Recuperacion() {
  const [esc, setEsc] = useState('A')
  const e = ESCENARIOS[esc]
  return (
    <Page>
      <SectionHero eyebrow="Informe B · Recuperación · 3.1.6" title="Mejora tecnológica y recuperación" Icon={LifeBuoy} color="blue" arte={<ArteRecuperacion className="w-full" />}>
        Cómo el hotel <strong>vuelve a operar</strong> cuando algo falla: arquitectura de alta
        disponibilidad, objetivos RTO/RPO, protocolo de incidentes y un runbook de primeros auxilios.
      </SectionHero>

      <H3>RTO y RPO (en simple)</H3>
      <div className="grid gap-4 sm:grid-cols-2 mb-8">
        <Card className="bg-blue-50 border-blue-200">
          <p className="text-sm font-semibold text-blue-900 mb-1">⏱️ RTO</p>
          <p className="text-sm text-blue-900"><em>¿Cuánto tardo en volver a funcionar?</em> Tiempo máximo aceptable de caída antes de restablecer el servicio.</p>
        </Card>
        <Card className="bg-blue-50 border-blue-200">
          <p className="text-sm font-semibold text-blue-900 mb-1">💾 RPO</p>
          <p className="text-sm text-blue-900"><em>¿Cuántos datos puedo perder?</em> Tiempo máximo entre respaldos; si el último fue hace 1 h, pierdo hasta 1 h de reservas.</p>
        </Card>
      </div>

      <H3>1. Mejora tecnológica — arquitectura de alta disponibilidad</H3>
      <p className="text-gray-600 mb-4">
        Hoy el portal corre en un único servidor (punto único de falla). La arquitectura propuesta lo
        elimina y añade capacidad de recuperación. Cada capa ataja un riesgo concreto:
      </p>
      <Card className="mb-8 p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left text-gray-500">
                <th className="px-3 py-2 font-medium">Capa</th>
                <th className="px-3 py-2 font-medium">Qué aporta</th>
                <th className="px-3 py-2 font-medium">Riesgo que ataja</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {ARQUITECTURA.map((a) => (
                <tr key={a.capa} className="align-top">
                  <td className="px-3 py-2 font-medium text-gray-800">{a.capa}</td>
                  <td className="px-3 py-2 text-gray-600">{a.aporta}</td>
                  <td className="px-3 py-2 font-mono text-xs text-gray-500 whitespace-nowrap">{a.riesgo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <H3>2. Continuidad: RTO / RPO por sistema</H3>
      <Card className="mb-4 p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left text-gray-500">
                <th className="px-3 py-2 font-medium">Sistema</th>
                <th className="px-3 py-2 font-medium">Criticidad</th>
                <th className="px-3 py-2 font-medium">RTO</th>
                <th className="px-3 py-2 font-medium">RPO</th>
                <th className="px-3 py-2 font-medium">Respaldo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {SLA.map((s) => (
                <tr key={s.sistema} className="align-top">
                  <td className="px-3 py-2 font-medium text-gray-800">{s.sistema}</td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${CRIT[s.crit]}`}>{s.crit}</span>
                  </td>
                  <td className="px-3 py-2 text-gray-700 whitespace-nowrap">{s.rto}</td>
                  <td className="px-3 py-2 text-gray-700 whitespace-nowrap">{s.rpo}</td>
                  <td className="px-3 py-2 text-gray-600">{s.backup}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      <Card className="mb-8 bg-emerald-50 border-emerald-200">
        <p className="text-sm font-semibold text-emerald-900 mb-1">Regla 3-2-1 de respaldos</p>
        <p className="text-sm text-emerald-900">
          <strong>3</strong> copias · en <strong>2</strong> medios distintos · con <strong>1</strong>
          fuera del sitio e inmutable/offline. La copia offline es clave contra <strong>ransomware
          (R4)</strong>: el malware no puede cifrar lo que no alcanza. Y los backups se
          <strong> prueban</strong>: uno que nunca se restauró no es un backup, es una esperanza.
        </p>
      </Card>

      <H3>3. Protocolo de incidentes (NIST)</H3>
      <div className="space-y-2 mb-8">
        {FASES.map((f) => (
          <Card key={f.n} className="flex gap-3 items-start">
            <span className="shrink-0 flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">{f.n}</span>
            <div>
              <p className="font-semibold text-gray-800">{f.t}</p>
              <p className="text-sm text-gray-600">{f.d}</p>
            </div>
          </Card>
        ))}
      </div>

      <H3>4. 📖 Runbook de primeros auxilios ("Qué hacer si…")</H3>
      <p className="text-gray-600 mb-3">Elige un escenario para ver los pasos rápidos:</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {Object.keys(ESCENARIOS).map((k) => (
          <button
            key={k}
            onClick={() => setEsc(k)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition ${esc === k ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            {ESC_LABEL[k]}
          </button>
        ))}
      </div>
      <Card className="mb-8">
        <p className="font-semibold text-gray-800 mb-3">{e.titulo}</p>
        <ol className="list-decimal list-inside text-sm text-gray-700 space-y-1 mb-4">
          {e.pasos.map((p, i) => <li key={i}>{p}</li>)}
        </ol>
        <Code tone="payload">{e.code}</Code>
        <p className="mt-2 text-xs text-gray-400">Comandos ilustrativos; adaptar al entorno real del hotel.</p>
      </Card>

      <Card className="mb-2 bg-blue-50 border-blue-200">
        <p className="text-sm text-blue-900">
          ✅ Con esto el hotel pasa de solo <strong>detectar</strong> problemas a poder
          <strong> recuperarse</strong> de ellos. Se cierra el ciclo prevención → mitigación →
          recuperación, y con él el <strong>Informe B</strong>.
        </p>
      </Card>

      <NavPie id="recuperacion" />
    </Page>
  )
}
