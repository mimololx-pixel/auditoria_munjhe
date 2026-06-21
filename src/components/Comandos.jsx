import { motion } from 'framer-motion'
import comandosImg from '../../docs_munjhe/img_munjhe/comandos_munjhe.png'

/*
 * 04 · Inyección de comandos — Hotel Costa Brava
 * Espejo de docs_munjhe/04_comandos_munjhe.md (fuente evaluable — ver CLAUDE.md).
 */

function Card({ children, className = '' }) {
  return (
    <div className={`rounded-xl border border-gray-200 bg-white p-5 shadow-sm ${className}`}>
      {children}
    </div>
  )
}

export default function Comandos() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto px-6 py-12"
    >
      {/* Encabezado */}
      <p className="text-xs uppercase tracking-widest text-purple-500 mb-2">
        Informe A · Ataque 3 de 3
      </p>
      <h2 className="text-3xl font-bold text-gray-800 mb-3">Inyección de comandos</h2>
      <p className="text-gray-600 mb-8">
        El ataque <strong>más grave</strong>: permite <strong>ejecutar órdenes en el servidor</strong>
        {' '}del hotel a través del portal — equivale a tomar su control.
      </p>

      {/* Qué es */}
      <h3 className="text-xl font-semibold text-gray-800 mb-3">Qué es (en simple)</h3>
      <p className="text-gray-600 mb-4">
        Algunas funciones usan herramientas del propio servidor (por ejemplo, un <em>ping</em>).
        La inyección de comandos consiste en agregar, después del dato esperado,
        <strong> una segunda orden</strong> que el servidor también ejecuta.
      </p>
      <Card className="mb-8 bg-gray-50 border-gray-200">
        <p className="text-sm text-gray-600 italic">
          Es como pedirle al conserje "trae las llaves de la 101" y agregar "…y de paso ábreme la
          caja fuerte del hotel". Si obedece sin pensar, hace <strong>ambas cosas</strong>.
        </p>
      </Card>

      {/* Evidencia */}
      <h3 className="text-xl font-semibold text-gray-800 mb-3">Evidencia del ataque</h3>
      <p className="text-gray-600 mb-2">
        En el módulo <em>Command Injection</em> de DVWA (nivel <em>Low</em>), en el campo de la IP
        se escribió:
      </p>
      <pre className="bg-gray-900 text-green-300 rounded-lg px-4 py-3 text-sm mb-4 overflow-x-auto">127.0.0.1; cat /etc/passwd</pre>
      <figure className="mb-4">
        <img
          src={comandosImg}
          alt="Inyección de comandos: el servidor ejecuta el ping y además muestra /etc/passwd"
          className="rounded-lg border border-gray-300 shadow-sm w-full max-w-2xl mx-auto"
        />
        <figcaption className="text-xs text-gray-400 text-center mt-2">
          Además del ping, el servidor muestra /etc/passwd (las cuentas del sistema).
        </figcaption>
      </figure>
      <Card className="mb-8 bg-amber-50 border-amber-200">
        <p className="text-sm text-amber-900">
          Leer <code>/etc/passwd</code> es solo la demostración. El mismo mecanismo permite ejecutar
          <strong> cualquier</strong> comando: leer otros archivos, borrar datos o instalar software.
        </p>
      </Card>

      {/* Por qué funciona */}
      <h3 className="text-xl font-semibold text-gray-800 mb-3">Por qué funciona</h3>
      <p className="text-gray-600 mb-3">
        El portal arma una orden para el sistema operativo <strong>pegando</strong> la entrada:
      </p>
      <pre className="bg-gray-900 text-gray-100 rounded-lg px-4 py-3 text-xs sm:text-sm mb-3 overflow-x-auto">{`# Entrada normal: 127.0.0.1
ping -c 4 127.0.0.1                   # solo el ping

# Entrada maliciosa: 127.0.0.1; cat /etc/passwd
ping -c 4 127.0.0.1; cat /etc/passwd  # el ; encadena DOS comandos`}</pre>
      <p className="text-gray-600 mb-8">
        El carácter <code>;</code> significa "ejecuta un comando y luego el siguiente". Como la app
        entrega la entrada <strong>directamente al sistema operativo</strong>, el servidor ejecuta
        ambos.
      </p>

      {/* CVSS */}
      <h3 className="text-xl font-semibold text-gray-800 mb-3">Gravedad — CVSS 3.1</h3>
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <span className="inline-flex items-center gap-2 rounded-lg bg-red-100 text-red-800 px-4 py-2 font-bold">
          9.8 · CRÍTICA
        </span>
        <code className="text-xs text-gray-500 break-all">CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H</code>
      </div>
      <Card className="mb-8 p-0 overflow-hidden">
        <table className="w-full text-sm">
          <tbody className="divide-y divide-gray-100">
            {[
              ['Vector (AV)', 'Red — por internet'],
              ['Complejidad (AC)', 'Baja — basta encadenar un comando'],
              ['Confidencialidad (C)', 'Alta — lee cualquier archivo'],
              ['Integridad (I)', 'Alta — modifica o borra archivos'],
              ['Disponibilidad (A)', 'Alta — puede apagar el servidor'],
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
        <li><strong>Control total del servidor:</strong> acceso a toda la información y a sistemas conectados (PMS).</li>
        <li><strong>Ransomware / sabotaje:</strong> cifrar o borrar datos → el hotel no puede operar.</li>
        <li>Robo masivo de datos y uso del servidor para nuevos ataques.</li>
        <li>Caída del portal de reservas = pérdida directa de ingresos.</li>
      </ul>

      {/* Prevención y mitigación */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="bg-emerald-50 border-emerald-200">
          <p className="text-sm font-semibold text-emerald-900 mb-2">Prevención (evitar que ocurra)</p>
          <ul className="text-sm text-emerald-900 space-y-1 list-disc list-inside">
            <li><strong>No pasar la entrada al sistema operativo</strong> (evitar system/exec).</li>
            <li>Usar APIs/librerías seguras (sin terminal).</li>
            <li><strong>Listas blancas</strong>: aceptar solo el formato exacto (IP válida).</li>
            <li>Estándar de código seguro + revisión.</li>
          </ul>
        </Card>
        <Card className="bg-blue-50 border-blue-200">
          <p className="text-sm font-semibold text-blue-900 mb-2">Mitigación (reducir el daño)</p>
          <ul className="text-sm text-blue-900 space-y-1 list-disc list-inside">
            <li>Proceso web con <strong>privilegios mínimos</strong>.</li>
            <li>Aislamiento (contenedores) + segmentación de red.</li>
            <li>Monitoreo de procesos e integridad de archivos.</li>
            <li>WAF que bloquee <code>;</code> <code>|</code> <code>&&</code> en entradas.</li>
          </ul>
        </Card>
      </div>
    </motion.div>
  )
}
