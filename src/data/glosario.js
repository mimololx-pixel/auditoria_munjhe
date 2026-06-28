import {
  ShieldAlert, Database, MessageSquareCode, TerminalSquare, Syringe,
  Server, HardDrive, Cookie, Gauge, ShieldCheck, ShieldHalf, Lock, FlaskConical,
  Bug, RefreshCw,
} from 'lucide-react'

/*
 * Términos del glosario en lenguaje simple (solo presentación).
 * Fuente única reutilizada por: la sección Glosario, los tooltips inline (Termino)
 * y el buscador global. Cada entrada: { Icon, t (término), d (definición) }.
 */
export const TERMINOS = [
  { Icon: ShieldAlert, t: 'Vulnerabilidad', d: 'Una falla o "agujero" en un sistema que un atacante puede aprovechar.' },
  { Icon: Database, t: 'Inyección SQL', d: 'Engañar a la base de datos escribiendo texto especial en un formulario para que entregue información que no debería.' },
  { Icon: MessageSquareCode, t: 'XSS', d: 'Lograr que la página ejecute un pequeño programa del atacante en el navegador de otra persona (por ejemplo, para robarle su sesión).' },
  { Icon: TerminalSquare, t: 'Inyección de comandos', d: 'Hacer que el servidor ejecute órdenes del atacante, como si tuviera el control del computador.' },
  { Icon: Syringe, t: 'Payload', d: 'El texto o "carga" que el atacante escribe para realizar el ataque (por ejemplo: \' OR \'1\'=\'1).' },
  { Icon: Server, t: 'Servidor', d: 'El computador donde "vive" la página web y se guardan los datos.' },
  { Icon: HardDrive, t: 'Base de datos', d: 'El gran archivero digital donde el portal guarda huéspedes, reservas y pagos.' },
  { Icon: Cookie, t: 'Sesión / Cookie', d: 'Una credencial temporal que el sitio te da al iniciar sesión para recordarte. Si te la roban, pueden entrar como tú.' },
  { Icon: Gauge, t: 'CVSS', d: 'Una escala internacional del 0 al 10 para medir qué tan grave es una vulnerabilidad. Mientras más alto, más peligroso.' },
  { Icon: ShieldCheck, t: 'Consultas parametrizadas', d: 'Una forma segura de preguntarle a la base de datos que mantiene separados los datos de las instrucciones, evitando la inyección SQL.' },
  { Icon: ShieldHalf, t: 'WAF', d: 'Un "guardia" (Web Application Firewall) frente al sitio que detecta y bloquea ataques conocidos.' },
  { Icon: Lock, t: 'Cifrado', d: 'Transformar la información en un código ilegible para quien no tenga la clave, de modo que si la roban, no la pueda leer.' },
  { Icon: FlaskConical, t: 'DVWA', d: 'Una aplicación de práctica deliberadamente insegura, usada para aprender a atacar y defender en un entorno controlado.' },
  { Icon: Bug, t: 'Ransomware', d: 'Un programa malicioso que "secuestra" los datos cifrándolos y exige un pago (rescate) para devolverlos.' },
  { Icon: RefreshCw, t: 'Backup', d: 'Una copia de seguridad de los datos, para poder recuperarlos si se pierden, se dañan o los secuestra un ransomware.' },
]

/* Normaliza texto para buscar sin tildes ni mayúsculas */
export const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')

/* Busca la definición de un término (coincidencia exacta, sin distinguir mayúsculas/tildes) */
export function defDe(termino) {
  const n = norm(termino)
  return TERMINOS.find((x) => norm(x.t) === n)?.d ?? null
}
