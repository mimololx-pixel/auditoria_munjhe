import { motion } from 'framer-motion'
import xssImg from '../../docs_munjhe/img_munjhe/xss_munjhe.png'
import xssPopupImg from '../../docs_munjhe/img_munjhe/xss_popup_munjhe.png'

/*
 * 03 · XSS (Cross-Site Scripting) — Hotel Costa Brava
 * Espejo de docs_munjhe/03_xss_munjhe.md (fuente evaluable — ver CLAUDE.md).
 */

function Card({ children, className = '' }) {
  return (
    <div className={`rounded-xl border border-gray-200 bg-white p-5 shadow-sm ${className}`}>
      {children}
    </div>
  )
}

export default function XSS() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto px-6 py-12"
    >
      {/* Encabezado */}
      <p className="text-xs uppercase tracking-widest text-amber-500 mb-2">
        Informe A · Ataque 2 de 3
      </p>
      <h2 className="text-3xl font-bold text-gray-800 mb-3">XSS (Cross-Site Scripting)</h2>
      <p className="text-gray-600 mb-8">
        Cómo un atacante puede <strong>ejecutar código en el navegador de un huésped</strong>
        {' '}y robarle la sesión dentro del propio portal del hotel.
      </p>

      {/* Qué es */}
      <h3 className="text-xl font-semibold text-gray-800 mb-3">Qué es (en simple)</h3>
      <p className="text-gray-600 mb-4">
        Muchas páginas "repiten" lo que el usuario escribe: si pones <em>Pedro</em>, responden
        <em> "Hola Pedro"</em>. El XSS consiste en escribir, en vez de un nombre, un pequeño
        <strong> programa</strong> (<code>&lt;script&gt;</code>). Si la página lo devuelve sin
        precaución, el navegador <strong>no lo muestra: lo ejecuta</strong>.
      </p>
      <Card className="mb-8 bg-gray-50 border-gray-200">
        <p className="text-sm text-gray-600 italic">
          Es como dejar una nota para otro huésped, pero en vez de un mensaje escribes una
          <strong> orden</strong> que el recepcionista cumple sin darse cuenta al leerla.
        </p>
      </Card>

      {/* Evidencia */}
      <h3 className="text-xl font-semibold text-gray-800 mb-3">Evidencia del ataque</h3>
      <p className="text-gray-600 mb-2">
        En el módulo <em>XSS (Reflected)</em> de DVWA (nivel <em>Low</em>), en el campo del
        nombre se escribió:
      </p>
      <pre className="bg-gray-900 text-green-300 rounded-lg px-4 py-3 text-sm mb-4 overflow-x-auto">{`<script>alert('XSS')</script>`}</pre>
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <figure>
          <img src={xssImg} alt="El payload script se envía en el campo del nombre"
            className="rounded-lg border border-gray-300 shadow-sm w-full" />
          <figcaption className="text-xs text-gray-400 text-center mt-2">1. El código se envía en el formulario.</figcaption>
        </figure>
        <figure>
          <img src={xssPopupImg} alt="El navegador ejecuta el código y aparece el popup"
            className="rounded-lg border border-gray-300 shadow-sm w-full" />
          <figcaption className="text-xs text-gray-400 text-center mt-2">2. El navegador lo ejecuta: aparece el popup.</figcaption>
        </figure>
      </div>
      <Card className="mb-8 bg-amber-50 border-amber-200">
        <p className="text-sm text-amber-900">
          Que aparezca solo "Hello" (sin el texto del <code>&lt;script&gt;</code>) confirma que el
          navegador <strong>interpretó</strong> la etiqueta en vez de mostrarla: el código se ejecutó.
        </p>
      </Card>

      {/* Por qué funciona */}
      <h3 className="text-xl font-semibold text-gray-800 mb-3">Por qué funciona</h3>
      <p className="text-gray-600 mb-3">
        La aplicación inserta la entrada dentro del HTML <strong>sin sanitizarla</strong>:
      </p>
      <pre className="bg-gray-900 text-gray-100 rounded-lg px-4 py-3 text-xs sm:text-sm mb-3 overflow-x-auto">{`<!-- Entrada normal: Pedro -->
<p>Hola Pedro</p>                         <!-- muestra: Hola Pedro -->

<!-- Entrada maliciosa: una etiqueta script -->
<p>Hola <script>alert('XSS')</script></p> <!-- el navegador la EJECUTA -->`}</pre>
      <p className="text-gray-600 mb-8">
        El navegador <strong>no distingue</strong> la entrada del usuario del código propio de la
        página. Tipos: reflejado (el de DVWA), almacenado y basado en DOM.
      </p>

      {/* CVSS */}
      <h3 className="text-xl font-semibold text-gray-800 mb-3">Gravedad — CVSS 3.1</h3>
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <span className="inline-flex items-center gap-2 rounded-lg bg-yellow-100 text-yellow-800 px-4 py-2 font-bold">
          6.1 · MEDIA
        </span>
        <code className="text-xs text-gray-500 break-all">CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:C/C:L/I:L/A:N</code>
      </div>
      <Card className="mb-8 p-0 overflow-hidden">
        <table className="w-full text-sm">
          <tbody className="divide-y divide-gray-100">
            {[
              ['Interacción (UI)', 'Requerida — la víctima abre el enlace'],
              ['Alcance (S)', 'Cambiado — corre en el navegador de la víctima'],
              ['Confidencialidad (C)', 'Baja — puede robar la sesión'],
              ['Integridad (I)', 'Baja — puede alterar la página o engañar'],
              ['Disponibilidad (A)', 'Ninguna'],
            ].map(([k, v]) => (
              <tr key={k}>
                <td className="px-4 py-2 font-medium text-gray-700 w-1/2">{k}</td>
                <td className="px-4 py-2 text-gray-600">{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Impacto */}
      <h3 className="text-xl font-semibold text-gray-800 mb-3">Impacto para Hotel Costa Brava</h3>
      <ul className="list-disc list-inside text-gray-600 space-y-1 mb-8">
        <li><strong>Robo de sesión:</strong> un enlace preparado entra a la cuenta del huésped (reservas, datos, pagos).</li>
        <li><strong>Phishing dentro del sitio real:</strong> formulario falso de pago/login en el portal verdadero.</li>
        <li>Redirección a sitios maliciosos desde el dominio del hotel.</li>
        <li>Daño reputacional: ocurre "dentro" del sitio legítimo.</li>
      </ul>

      {/* Prevención y mitigación */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="bg-emerald-50 border-emerald-200">
          <p className="text-sm font-semibold text-emerald-900 mb-2">Prevención (evitar que ocurra)</p>
          <ul className="text-sm text-emerald-900 space-y-1 list-disc list-inside">
            <li><strong>Escapar/codificar la salida</strong> (defensa #1).</li>
            <li>Usar el escape automático del framework (React).</li>
            <li>Validar y limitar las entradas.</li>
            <li>Sanitizar el HTML enriquecido con librería confiable.</li>
          </ul>
        </Card>
        <Card className="bg-blue-50 border-blue-200">
          <p className="text-sm font-semibold text-blue-900 mb-2">Mitigación (reducir el daño)</p>
          <ul className="text-sm text-blue-900 space-y-1 list-disc list-inside">
            <li><strong>CSP</strong> (Content Security Policy).</li>
            <li>Cookies <strong>HttpOnly</strong> y <strong>Secure</strong>.</li>
            <li>Sesiones cortas + revalidación en pagos.</li>
            <li>WAF que filtre scripts en las entradas.</li>
          </ul>
        </Card>
      </div>
    </motion.div>
  )
}
