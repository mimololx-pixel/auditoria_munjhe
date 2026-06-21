import { Page, PageHeader, Card, H3, Code, Severidad } from './ui'
import comandosImg from '../../docs_munjhe/img_munjhe/comandos_munjhe.png'

/*
 * 04 · Inyección de comandos — Hotel Costa Brava
 * Espejo de docs_munjhe/04_comandos_munjhe.md (fuente evaluable — ver CLAUDE.md).
 */
export default function Comandos() {
  return (
    <Page>
      <PageHeader eyebrow="Informe A · Ataque 3 de 3" title="Inyección de comandos">
        El ataque <strong>más grave</strong>: permite <strong>ejecutar órdenes en el servidor</strong>
        {' '}del hotel a través del portal — equivale a tomar su control.
      </PageHeader>

      <H3>Qué es (en simple)</H3>
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

      <H3>Evidencia del ataque</H3>
      <p className="text-gray-600 mb-2">
        En el módulo <em>Command Injection</em> de DVWA (nivel <em>Low</em>), en el campo de la IP
        se escribió:
      </p>
      <div className="mb-4"><Code tone="payload">127.0.0.1; cat /etc/passwd</Code></div>
      <figure className="mb-4">
        <img src={comandosImg} alt="Inyección de comandos: el servidor ejecuta el ping y además muestra /etc/passwd"
          className="rounded-xl border border-gray-300 shadow-sm w-full max-w-2xl mx-auto" />
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

      <H3>Por qué funciona</H3>
      <p className="text-gray-600 mb-3">
        El portal arma una orden para el sistema operativo <strong>pegando</strong> la entrada:
      </p>
      <div className="mb-3"><Code>{`# Entrada normal: 127.0.0.1
ping -c 4 127.0.0.1                   # solo el ping

# Entrada maliciosa: 127.0.0.1; cat /etc/passwd
ping -c 4 127.0.0.1; cat /etc/passwd  # el ; encadena DOS comandos`}</Code></div>
      <p className="text-gray-600 mb-8">
        El carácter <code>;</code> significa "ejecuta un comando y luego el siguiente". Como la app
        entrega la entrada <strong>directamente al sistema operativo</strong>, el servidor ejecuta
        ambos.
      </p>

      <H3>Gravedad</H3>
      <Severidad score={9.8} vector="CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H" />
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

      <H3>Impacto para Hotel Costa Brava</H3>
      <ul className="list-disc list-inside text-gray-600 space-y-1 mb-8">
        <li><strong>Control total del servidor:</strong> acceso a toda la información y a sistemas conectados (PMS).</li>
        <li><strong>Ransomware / sabotaje:</strong> cifrar o borrar datos → el hotel no puede operar.</li>
        <li>Robo masivo de datos y uso del servidor para nuevos ataques.</li>
        <li>Caída del portal de reservas = pérdida directa de ingresos.</li>
      </ul>

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
    </Page>
  )
}
