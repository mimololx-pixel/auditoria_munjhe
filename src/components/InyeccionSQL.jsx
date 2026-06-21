import { motion } from 'framer-motion'
import sqliImg from '../../docs_munjhe/img_munjhe/sqli_munjhe.png'

/*
 * 02 · Inyección SQL — Hotel Costa Brava
 * Espejo de docs_munjhe/02_sqli_munjhe.md (fuente evaluable — ver CLAUDE.md).
 */

function Card({ children, className = '' }) {
  return (
    <div className={`rounded-xl border border-gray-200 bg-white p-5 shadow-sm ${className}`}>
      {children}
    </div>
  )
}

export default function InyeccionSQL() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto px-6 py-12"
    >
      {/* Encabezado */}
      <p className="text-xs uppercase tracking-widest text-red-500 mb-2">
        Informe A · Ataque 1 de 3
      </p>
      <h2 className="text-3xl font-bold text-gray-800 mb-3">Inyección SQL</h2>
      <p className="text-gray-600 mb-8">
        Cómo un atacante puede <strong>extraer toda la base de datos de clientes</strong> del
        portal con solo escribir un texto en un formulario.
      </p>

      {/* Qué es */}
      <h3 className="text-xl font-semibold text-gray-800 mb-3">Qué es (en simple)</h3>
      <p className="text-gray-600 mb-4">
        La base de datos guarda a todos los huéspedes. Cuando el portal busca "el cliente N° X",
        le hace una <em>pregunta</em> (consulta SQL) a esa base. La inyección SQL consiste en
        escribir, dentro de un campo, un texto que <strong>cambia esa pregunta</strong> para que
        la base devuelva mucho más de lo que debería.
      </p>
      <Card className="mb-8 bg-gray-50 border-gray-200">
        <p className="text-sm text-gray-600 italic">
          Es como pedirle a un bibliotecario "tráeme el libro 5"… pero agregando "…o cualquier
          libro que exista". Al pie de la letra, te trae <strong>todos</strong> los libros.
        </p>
      </Card>

      {/* Evidencia */}
      <h3 className="text-xl font-semibold text-gray-800 mb-3">Evidencia del ataque</h3>
      <p className="text-gray-600 mb-2">
        En el módulo <em>SQL Injection</em> de DVWA (nivel <em>Low</em>), en el campo
        <em> User ID</em> se escribió:
      </p>
      <pre className="bg-gray-900 text-green-300 rounded-lg px-4 py-3 text-sm mb-4 overflow-x-auto">' OR '1'='1</pre>
      <figure className="mb-4">
        <img
          src={sqliImg}
          alt="Inyección SQL: el payload ' OR '1'='1 devuelve todos los usuarios"
          className="rounded-lg border border-gray-300 shadow-sm w-full max-w-md mx-auto"
        />
        <figcaption className="text-xs text-gray-400 text-center mt-2">
          Resultado: el portal devuelve la lista completa de usuarios.
        </figcaption>
      </figure>
      <Card className="mb-8 bg-amber-50 border-amber-200">
        <p className="text-sm text-amber-900">
          En un hotel real, esa lista no serían 5 usuarios de prueba, sino <strong>miles de
          huéspedes</strong> con sus nombres, documentos, correos y datos de contacto.
        </p>
      </Card>

      {/* Por qué funciona */}
      <h3 className="text-xl font-semibold text-gray-800 mb-3">Por qué funciona</h3>
      <p className="text-gray-600 mb-3">
        El portal <strong>construye la consulta pegando directamente</strong> lo que escribe el
        usuario:
      </p>
      <pre className="bg-gray-900 text-gray-100 rounded-lg px-4 py-3 text-xs sm:text-sm mb-3 overflow-x-auto">{`-- Entrada normal: 1
SELECT nombre FROM users WHERE id = '1';        -- solo el usuario 1

-- Entrada maliciosa: ' OR '1'='1
SELECT nombre FROM users WHERE id = '' OR '1'='1';  -- siempre verdadero`}</pre>
      <p className="text-gray-600 mb-8">
        La comilla cierra el dato antes de tiempo y <code>OR '1'='1'</code> agrega una condición
        <strong> siempre verdadera</strong>, así que la base devuelve la tabla completa. La causa
        de fondo: la aplicación <strong>no separa los datos del usuario de sus instrucciones</strong>.
      </p>

      {/* CVSS */}
      <h3 className="text-xl font-semibold text-gray-800 mb-3">Gravedad — CVSS 3.1</h3>
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <span className="inline-flex items-center gap-2 rounded-lg bg-orange-100 text-orange-800 px-4 py-2 font-bold">
          7.5 · ALTA
        </span>
        <code className="text-xs text-gray-500 break-all">CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:N/A:N</code>
      </div>
      <Card className="mb-3 p-0 overflow-hidden">
        <table className="w-full text-sm">
          <tbody className="divide-y divide-gray-100">
            {[
              ['Vector (AV)', 'Red — por internet'],
              ['Complejidad (AC)', 'Baja — basta un texto'],
              ['Privilegios (PR)', 'Ninguno'],
              ['Confidencialidad (C)', 'Alta — expone toda la BD'],
              ['Integridad / Disponibilidad', 'Ninguna en el ataque demostrado (solo lectura)'],
            ].map(([k, v]) => (
              <tr key={k}>
                <td className="px-4 py-2 font-medium text-gray-700 w-1/2">{k}</td>
                <td className="px-4 py-2 text-gray-600">{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      <p className="text-xs text-gray-500 mb-8">
        ⚠️ El ataque demostrado solo lee datos. La misma falla suele permitir modificar o borrar
        registros, elevando el puntaje a <strong>9.8 — Crítico</strong>. 7.5 es el piso, no el techo.
      </p>

      {/* Impacto */}
      <h3 className="text-xl font-semibold text-gray-800 mb-3">Impacto para Hotel Costa Brava</h3>
      <ul className="list-disc list-inside text-gray-600 space-y-1 mb-8">
        <li>Fuga masiva de datos personales → suplantación y fraude.</li>
        <li>Exposición de datos de pago → fraude con tarjetas.</li>
        <li>Incumplimiento legal (Ley 19.628) → multas.</li>
        <li>Daño reputacional: un hotel que filtra datos pierde la confianza de sus huéspedes.</li>
      </ul>

      {/* Prevención y mitigación */}
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <Card className="bg-emerald-50 border-emerald-200">
          <p className="text-sm font-semibold text-emerald-900 mb-2">Prevención (evitar que ocurra)</p>
          <ul className="text-sm text-emerald-900 space-y-1 list-disc list-inside">
            <li><strong>Consultas parametrizadas</strong> obligatorias.</li>
            <li>Validación de tipos de entrada (id = entero).</li>
            <li>Estándar de código seguro + revisión / SAST.</li>
            <li>Capacitación (también del código generado por IA).</li>
          </ul>
        </Card>
        <Card className="bg-blue-50 border-blue-200">
          <p className="text-sm font-semibold text-blue-900 mb-2">Mitigación (reducir el daño)</p>
          <ul className="text-sm text-blue-900 space-y-1 list-disc list-inside">
            <li>Cuenta de BD con <strong>privilegios mínimos</strong>.</li>
            <li>Cifrado en reposo + tokenización de tarjetas.</li>
            <li>WAF que bloquee patrones de inyección.</li>
            <li>Monitoreo y alertas ante consultas anómalas.</li>
          </ul>
        </Card>
      </div>

      <pre className="bg-gray-900 text-gray-100 rounded-lg px-4 py-3 text-xs sm:text-sm overflow-x-auto">{`// VULNERABLE (concatena la entrada):
$sql = "SELECT nombre FROM users WHERE id = '$id'";

// SEGURO (consulta preparada — el dato jamás es SQL):
$stmt = $conn->prepare("SELECT nombre FROM users WHERE id = ?");
$stmt->bind_param("i", $id);   // "i" = se trata como ENTERO`}</pre>
    </motion.div>
  )
}
