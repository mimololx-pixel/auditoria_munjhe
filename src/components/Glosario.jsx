import { Page, PageHeader, Card } from './ui'

/*
 * Glosario en lenguaje simple (solo presentación).
 * Definiciones cortas y cotidianas de los términos técnicos del informe.
 */

const TERMINOS = [
  ['Vulnerabilidad', 'Una falla o "agujero" en un sistema que un atacante puede aprovechar.'],
  ['Inyección SQL', 'Engañar a la base de datos escribiendo texto especial en un formulario para que entregue información que no debería.'],
  ['XSS', 'Lograr que la página ejecute un pequeño programa del atacante en el navegador de otra persona (por ejemplo, para robarle su sesión).'],
  ['Inyección de comandos', 'Hacer que el servidor ejecute órdenes del atacante, como si tuviera el control del computador.'],
  ['Payload', 'El texto o "carga" que el atacante escribe para realizar el ataque (por ejemplo: \' OR \'1\'=\'1).'],
  ['Servidor', 'El computador donde "vive" la página web y se guardan los datos.'],
  ['Base de datos', 'El gran archivero digital donde el portal guarda huéspedes, reservas y pagos.'],
  ['Sesión / Cookie', 'Una credencial temporal que el sitio te da al iniciar sesión para recordarte. Si te la roban, pueden entrar como tú.'],
  ['CVSS', 'Una escala internacional del 0 al 10 para medir qué tan grave es una vulnerabilidad. Mientras más alto, más peligroso.'],
  ['Consultas parametrizadas', 'Una forma segura de preguntarle a la base de datos que mantiene separados los datos de las instrucciones, evitando la inyección SQL.'],
  ['WAF', 'Un "guardia" (Web Application Firewall) frente al sitio que detecta y bloquea ataques conocidos.'],
  ['Cifrado', 'Transformar la información en un código ilegible para quien no tenga la clave, de modo que si la roban, no la pueda leer.'],
  ['DVWA', 'Una aplicación de práctica deliberadamente insegura, usada para aprender a atacar y defender en un entorno controlado.'],
]

export default function Glosario() {
  return (
    <Page>
      <PageHeader eyebrow="Ayuda" title="Glosario">
        Definiciones simples de las palabras técnicas que aparecen en el informe.
      </PageHeader>
      <div className="grid sm:grid-cols-2 gap-3">
        {TERMINOS.map(([t, d]) => (
          <Card key={t}>
            <p className="font-semibold text-teal-700 mb-1">{t}</p>
            <p className="text-sm text-gray-600">{d}</p>
          </Card>
        ))}
      </div>
    </Page>
  )
}
