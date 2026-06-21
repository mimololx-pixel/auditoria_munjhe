import {
  BookOpen, ShieldAlert, Database, MessageSquareCode, TerminalSquare, Syringe,
  Server, HardDrive, Cookie, Gauge, ShieldCheck, ShieldHalf, Lock, FlaskConical,
} from 'lucide-react'
import { Page, SectionHero, NavPie, Card } from './ui'

/*
 * Glosario en lenguaje simple (solo presentación).
 * Definiciones cortas y cotidianas de los términos técnicos del informe.
 */

const TERMINOS = [
  [ShieldAlert, 'Vulnerabilidad', 'Una falla o "agujero" en un sistema que un atacante puede aprovechar.'],
  [Database, 'Inyección SQL', 'Engañar a la base de datos escribiendo texto especial en un formulario para que entregue información que no debería.'],
  [MessageSquareCode, 'XSS', 'Lograr que la página ejecute un pequeño programa del atacante en el navegador de otra persona (por ejemplo, para robarle su sesión).'],
  [TerminalSquare, 'Inyección de comandos', 'Hacer que el servidor ejecute órdenes del atacante, como si tuviera el control del computador.'],
  [Syringe, 'Payload', 'El texto o "carga" que el atacante escribe para realizar el ataque (por ejemplo: \' OR \'1\'=\'1).'],
  [Server, 'Servidor', 'El computador donde "vive" la página web y se guardan los datos.'],
  [HardDrive, 'Base de datos', 'El gran archivero digital donde el portal guarda huéspedes, reservas y pagos.'],
  [Cookie, 'Sesión / Cookie', 'Una credencial temporal que el sitio te da al iniciar sesión para recordarte. Si te la roban, pueden entrar como tú.'],
  [Gauge, 'CVSS', 'Una escala internacional del 0 al 10 para medir qué tan grave es una vulnerabilidad. Mientras más alto, más peligroso.'],
  [ShieldCheck, 'Consultas parametrizadas', 'Una forma segura de preguntarle a la base de datos que mantiene separados los datos de las instrucciones, evitando la inyección SQL.'],
  [ShieldHalf, 'WAF', 'Un "guardia" (Web Application Firewall) frente al sitio que detecta y bloquea ataques conocidos.'],
  [Lock, 'Cifrado', 'Transformar la información en un código ilegible para quien no tenga la clave, de modo que si la roban, no la pueda leer.'],
  [FlaskConical, 'DVWA', 'Una aplicación de práctica deliberadamente insegura, usada para aprender a atacar y defender en un entorno controlado.'],
]

export default function Glosario() {
  return (
    <Page>
      <SectionHero eyebrow="Ayuda" title="Glosario" Icon={BookOpen} color="teal">
        Definiciones simples de las palabras técnicas que aparecen en el informe.
      </SectionHero>
      <div className="grid sm:grid-cols-2 gap-3">
        {TERMINOS.map(([Icon, t, d]) => (
          <Card key={t}>
            <p className="mb-1 flex items-center gap-2 font-semibold text-teal-700">
              <Icon size={18} className="shrink-0" /> {t}
            </p>
            <p className="text-sm text-gray-600">{d}</p>
          </Card>
        ))}
      </div>

      <NavPie id="glosario" />
    </Page>
  )
}
