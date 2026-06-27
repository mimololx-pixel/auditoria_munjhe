import { useState } from 'react'
import { ShieldCheck } from 'lucide-react'
import { Page, SectionHero, NavPie, Card, H3, Code } from './ui'
import { ArteControles } from './ilustraciones'

/*
 * 07 · Controles de Prevención y Mitigación — Hotel Costa Brava
 * Espejo de docs_munjhe/07_controles_munjhe.md (fuente evaluable — ver CLAUDE.md).
 * Criterios 3.1.4 (prevención) y 3.1.5 (mitigación). Cada control atado a R1–R6.
 */

const CONTROLES = [
  { id: 'C1.1', riesgo: 'R1', tipo: 'Preventivo', desc: 'Consultas parametrizadas / ORM y validación estricta de entradas. El dato nunca se interpreta como SQL.', std: 'OWASP A03 · CIS 16', resp: 'Desarrollo' },
  { id: 'C1.2', riesgo: 'R1', tipo: 'Preventivo', desc: 'Hashing de contraseñas con bcrypt/argon2 (+ salt). Nunca credenciales en claro.', std: 'OWASP A02 · CIS 16', resp: 'Desarrollo' },
  { id: 'C1.3', riesgo: 'R1', tipo: 'Mitigante', desc: 'Privilegios mínimos en la BD + cifrado en reposo + tokenización de tarjetas.', std: 'OWASP A01/A02 · CIS 3', resp: 'DBA / SecOps' },
  { id: 'C2.1', riesgo: 'R2', tipo: 'Preventivo', desc: 'Codificación de salida (output encoding) y sanitización de todo dato reflejado + CSP.', std: 'OWASP A03 · CIS 16', resp: 'Desarrollo' },
  { id: 'C2.2', riesgo: 'R2', tipo: 'Mitigante', desc: 'Cookies HttpOnly, Secure y SameSite; expiración de sesión y re-autenticación para acciones sensibles.', std: 'OWASP A07 · CIS 16', resp: 'Desarrollo' },
  { id: 'C3.1', riesgo: 'R3', tipo: 'Preventivo', desc: 'No invocar el shell del SO con datos del usuario; APIs nativas y listas blancas.', std: 'OWASP A03 · CIS 16', resp: 'Desarrollo' },
  { id: 'C3.2', riesgo: 'R3', tipo: 'Mitigante', desc: 'Hardening + privilegios mínimos del proceso web, aislamiento (contenedores) y WAF.', std: 'OWASP A05 · CIS 4', resp: 'SysAdmin / SecOps' },
  { id: 'C4.1', riesgo: 'R4', tipo: 'Preventivo', desc: 'EDR/antimalware + parches al día + MFA y segmentación de red (huéspedes ≠ corporativa).', std: 'CIS 10 · CIS 5', resp: 'SecOps / TI' },
  { id: 'C4.2', riesgo: 'R4', tipo: 'Mitigante', desc: 'Backups 3-2-1 inmutables/offline y plan de recuperación probado (ver sección 08).', std: 'CIS 11', resp: 'SecOps / TI' },
  { id: 'C5.1', riesgo: 'R5', tipo: 'Preventivo', desc: 'CDN + protección anti-DDoS, rate limiting y autoescalado en temporada alta.', std: 'CIS 13', resp: 'SysAdmin / SecOps' },
  { id: 'C5.2', riesgo: 'R5', tipo: 'Mitigante', desc: 'Balanceo y failover, monitoreo con alertas y plan de continuidad operacional.', std: 'CIS 8 · CIS 11', resp: 'SecOps' },
  { id: 'C6.1', riesgo: 'R6', tipo: 'Preventivo', desc: 'MFA, autenticación de correo SPF/DKIM/DMARC, filtros antiphishing y capacitación.', std: 'OWASP A07 · CIS 9/14', resp: 'SecOps / RRHH' },
  { id: 'C6.2', riesgo: 'R6', tipo: 'Mitigante', desc: 'Procedimiento de verificación de pagos/cambios, monitoreo de dominios suplantados y respuesta a incidentes.', std: 'CIS 17', resp: 'SecOps' },
]

const RIESGO_LABEL = {
  R1: 'R1 · Fuga de BD', R2: 'R2 · XSS', R3: 'R3 · Control servidor',
  R4: 'R4 · Ransomware', R5: 'R5 · Caída/DDoS', R6: 'R6 · Phishing',
}
const RIESGOS = ['R1', 'R4', 'R3', 'R6', 'R2', 'R5']

/* Estilo por tipo de control — strings completos (Tailwind v4, ver CLAUDE.md) */
const TIPO = {
  Preventivo: { emoji: '🛡️', chip: 'bg-emerald-100 text-emerald-800' },
  Mitigante: { emoji: '🩹', chip: 'bg-blue-100 text-blue-800' },
}

export default function Controles() {
  const [filtro, setFiltro] = useState('Todos')
  const visibles = filtro === 'Todos' ? CONTROLES : CONTROLES.filter((c) => c.riesgo === filtro)
  return (
    <Page>
      <SectionHero eyebrow="Informe B · Controles · 3.1.4 / 3.1.5" title="Prevención y mitigación" Icon={ShieldCheck} color="indigo" arte={<ArteControles className="w-full" />}>
        Para cada riesgo (R1–R6) definimos controles que <strong>evitan que ocurra</strong>
        (prevención) y que <strong>reducen el daño si ocurre</strong> (mitigación), respaldados por
        OWASP y CIS.
      </SectionHero>

      <H3>Prevención vs. mitigación (en simple)</H3>
      <div className="grid gap-4 sm:grid-cols-2 mb-8">
        <Card className="bg-emerald-50 border-emerald-200">
          <p className="text-sm font-semibold text-emerald-900 mb-1">🛡️ Prevención (3.1.4)</p>
          <p className="text-sm text-emerald-900/90">Medidas para que el problema <strong>no ocurra</strong>. Es la cerradura de la puerta: impedir la entrada.</p>
        </Card>
        <Card className="bg-blue-50 border-blue-200">
          <p className="text-sm font-semibold text-blue-900 mb-1">🩹 Mitigación (3.1.5)</p>
          <p className="text-sm text-blue-900/90">Medidas para que, <strong>si ocurre igual</strong>, el daño sea el menor posible. Es el extintor y el seguro.</p>
        </Card>
      </div>

      <H3>1. Matriz técnica de controles</H3>
      <p className="text-gray-600 mb-3">Filtra por riesgo para ver sus controles:</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {['Todos', ...RIESGOS].map((r) => (
          <button
            key={r}
            onClick={() => setFiltro(r)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition ${filtro === r ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            {r === 'Todos' ? 'Todos' : RIESGO_LABEL[r]}
          </button>
        ))}
      </div>
      <Card className="mb-8 p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left text-gray-500">
                <th className="px-3 py-2 font-medium">ID</th>
                <th className="px-3 py-2 font-medium">Riesgo</th>
                <th className="px-3 py-2 font-medium">Tipo</th>
                <th className="px-3 py-2 font-medium">Control e implementación</th>
                <th className="px-3 py-2 font-medium">Estándar</th>
                <th className="px-3 py-2 font-medium">Responsable</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {visibles.map((c) => {
                const t = TIPO[c.tipo]
                return (
                  <tr key={c.id} className="align-top">
                    <td className="px-3 py-2 font-mono text-xs text-gray-500">{c.id}</td>
                    <td className="px-3 py-2 font-mono text-xs text-gray-500">{c.riesgo}</td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${t.chip}`}>{t.emoji} {c.tipo}</span>
                    </td>
                    <td className="px-3 py-2 text-gray-700">{c.desc}</td>
                    <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">{c.std}</td>
                    <td className="px-3 py-2 whitespace-nowrap text-gray-600">{c.resp}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>

      <Card className="mb-8 bg-indigo-50 border-indigo-200">
        <p className="text-sm text-indigo-900">
          <strong>Política transversal de desarrollo seguro:</strong> estándar de codificación
          segura, revisión de código obligatoria, análisis estático (SAST) y de dependencias en el
          pipeline, y capacitación del equipo (incluido el código generado por IA).
        </p>
      </Card>

      <H3>2. 📖 Manual SecOps de código seguro</H3>
      <p className="text-gray-600 mb-4">Guía rápida para el equipo: cómo escribir el portal evitando los riesgos del informe.</p>

      <H3>2.1 Sanitiza entradas y codifica salidas (R1, R2, R3)</H3>
      <div className="mb-3"><Code>{`// ❌ MAL: concatenar la entrada (inyección SQL — R1)
$sql = "SELECT * FROM huespedes WHERE id = '$id'";

// ✅ BIEN: consulta parametrizada
$stmt = $pdo->prepare("SELECT * FROM huespedes WHERE id = ?");
$stmt->execute([$id]);   // el dato jamás se interpreta como SQL`}</Code></div>
      <div className="mb-6"><Code>{`// XSS (R2): escapa SIEMPRE al pintar datos del usuario
elemento.textContent = nombreHuesped;   // seguro (no innerHTML)
// refuerza con: Content-Security-Policy: default-src 'self'`}</Code></div>

      <H3>2.2 Maneja secretos con variables de entorno (R4, R6)</H3>
      <div className="mb-3"><Code>{`// ❌ MAL: clave hardcodeada (queda en el historial de git)
const apiKey = "sk_live_51H...";

// ✅ BIEN: leer de variables de entorno
const apiKey = process.env.PAYMENT_API_KEY;`}</Code></div>
      <div className="mb-6"><Code tone="payload">{`# .env  →  SIEMPRE en .gitignore (nunca se commitea)
PAYMENT_API_KEY=sk_live_...
DB_PASSWORD=...`}</Code></div>

      <H3>2.3 Guarda contraseñas con hashing, nunca en claro (R1)</H3>
      <div className="mb-6"><Code>{`import bcrypt from 'bcrypt'

// Al registrar: guarda el HASH, nunca la contraseña
const hash = await bcrypt.hash(password, 12)   // coste 12 + salt automático

// Al iniciar sesión: compara contra el hash
const ok = await bcrypt.compare(password, hash)`}</Code></div>

      <H3>2.4 Mantén dependencias y transporte seguros (R3, R5)</H3>
      <div className="mb-2"><Code tone="payload">{`npm audit            # detecta dependencias vulnerables
npm audit fix        # aplica parches compatibles`}</Code></div>
      <p className="text-sm text-gray-600 mb-8">
        Sirve todo por <strong>HTTPS/TLS</strong>, aplica parches al día y elimina librerías que no
        uses. Una dependencia vulnerable es una puerta abierta aunque tu código sea perfecto.
      </p>

      <Card className="mb-2 bg-blue-50 border-blue-200">
        <p className="text-sm text-blue-900">
          👉 El control mitigante de mayor alcance —los <strong>backups y la recuperación</strong>—
          se desarrolla en la <strong>sección 08</strong>.
        </p>
      </Card>

      <NavPie id="controles" />
    </Page>
  )
}
