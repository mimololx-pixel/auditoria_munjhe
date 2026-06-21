import { Page, PageHeader, Card, H3 } from './ui'

/*
 * 09 · Bitácora de uso de IA — Hotel Costa Brava
 * Espejo de docs_munjhe/09_prompts_munjhe.md (fuente evaluable — ver CLAUDE.md).
 */

const BITACORA = [
  {
    n: '1', titulo: 'Lectura de la evaluación y contexto',
    prompt: 'Lee los PDF de datos_auditoria/ y dime qué pide la Evaluación 3. Mi empresa es Hotel Costa Brava (hotelería).',
    acepte: 'El mapa de entregas (Informe A y B) y la regla de que lo evaluable son los .md.',
    corregi: 'Descarté la rúbrica U02: era de otro trabajo (análisis legal), no de esta auditoría.',
  },
  {
    n: '2', titulo: 'Inyección SQL',
    prompt: 'Redacta 02_sqli para el Hotel Costa Brava: payload \' OR \'1\'=\'1, por qué funciona, CVSS, prevención y mitigación.',
    acepte: 'La explicación con el ejemplo del bibliotecario y la defensa con consultas parametrizadas.',
    corregi: 'Exigí justificar el CVSS por métrica y aclarar que el 7.5 es el "piso, no el techo".',
  },
  {
    n: '3', titulo: 'XSS',
    prompt: 'Documenta 03_xss con <script>alert(\'XSS\')</script>; enfócalo en robo de sesión de un huésped.',
    acepte: 'El contexto de robo de sesión y las defensas (escape de salida + CSP + cookies HttpOnly).',
    corregi: 'La primera captura no mostraba el popup; la rehíce e incluí las dos imágenes.',
  },
  {
    n: '4', titulo: 'Inyección de comandos',
    prompt: 'Redacta 04_comandos con 127.0.0.1; cat /etc/passwd; explica por qué es el ataque más crítico.',
    acepte: 'El CVSS 9.8 (crítico) con su vector y el ejemplo del conserje.',
    corregi: 'Pedí distinguir prevención (listas blancas) de mitigación (privilegios mínimos, aislamiento).',
  },
  {
    n: '5', titulo: 'Sitio web (presentación)',
    prompt: 'El sitio parece un informe bancario; quiero un diseño claro y amigable para alguien que no sabe de seguridad.',
    acepte: 'Tema claro, glosario y etiquetas de riesgo en lenguaje simple.',
    corregi: 'Que el rediseño no tocara el contenido evaluable de los .md, solo la presentación.',
  },
  {
    n: '6', titulo: 'Repositorio y entrega',
    prompt: 'Crea el repositorio, conéctalo y deja el proyecto listo para Vercel.',
    acepte: 'La automatización de commits y push.',
    corregi: 'El nombre tenía ñ (muñjhe), que GitHub/Vercel no aceptan; se unificó a auditoria_munjhe.',
  },
  {
    n: '7', titulo: 'Presentación interactiva del Informe A',
    prompt: 'Haz la Parte A más dinámica y didáctica: demo entrada normal vs. del atacante, medidor visual del CVSS y una mini autocomprobación por ataque.',
    acepte: 'La demo "Pruébalo tú" que transforma la consulta/HTML/comando en vivo, el medidor 0–10 a color y el quiz con feedback.',
    corregi: 'Exigí verificar antes que los .md estuvieran completos contra la rúbrica, y que la interactividad fuera solo presentación: no se movió contenido evaluable a React (git status confirmó que solo cambiaron los .jsx).',
  },
]

export default function Prompts() {
  return (
    <Page>
      <PageHeader eyebrow="Transversal" title="Bitácora de uso de IA">
        Cómo se usó la inteligencia artificial en este proyecto: qué se le pidió, qué se aceptó
        y qué se corrigió.
      </PageHeader>

      <Card className="mb-8 bg-teal-50 border-teal-200">
        <p className="font-semibold text-teal-900 mb-2">Herramienta y modalidad</p>
        <p className="text-sm text-teal-900 mb-2">
          <strong>Claude Code (Claude Opus)</strong>, usado como <strong>agente</strong>: además
          de responder, ejecuta acciones (crea archivos, compila, hace commits).
        </p>
        <p className="text-sm text-teal-900">
          A diferencia de un chatbot —que solo entrega texto para copiar— el agente opera sobre el
          proyecto real y puede verificar su trabajo. Eso exige <strong>dirigirlo y validar</strong>,
          no aceptar a ciegas. La responsabilidad técnica final es del estudiante.
        </p>
      </Card>

      <H3>Bitácora por tarea</H3>
      <div className="space-y-3 mb-8">
        {BITACORA.map((b) => (
          <Card key={b.n}>
            <p className="font-semibold text-gray-800 mb-2">
              <span className="text-teal-600">{b.n}.</span> {b.titulo}
            </p>
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-semibold text-gray-500">Prompt:</span> <em>"{b.prompt}"</em>
            </p>
            <div className="grid sm:grid-cols-2 gap-2 text-sm">
              <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-3">
                <p className="font-semibold text-emerald-800 mb-1">✓ Acepté</p>
                <p className="text-emerald-900">{b.acepte}</p>
              </div>
              <div className="rounded-lg bg-amber-50 border border-amber-200 p-3">
                <p className="font-semibold text-amber-800 mb-1">✎ Corregí / dirigí</p>
                <p className="text-amber-900">{b.corregi}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <H3>Reflexión final</H3>
      <ul className="list-disc list-inside text-gray-600 space-y-2">
        <li><strong>La IA acelera, pero no reemplaza el criterio:</strong> varios resultados eran mejorables (CVSS sin justificar, captura sin popup, nombre con ñ) y detectarlo exige entender el tema.</li>
        <li><strong>Riesgo de código vulnerable:</strong> la IA tiende a concatenar la entrada al conectar una base de datos; hay que pedir explícitamente consultas parametrizadas y validación.</li>
        <li><strong>Prompts dirigidos &gt; genéricos:</strong> nombrar la empresa, el payload y la defensa esperada dio respuestas mucho más útiles que un "hazme el informe".</li>
        <li><strong>Usar la IA como agente</strong> (que ejecuta y verifica) fue más productivo que como simple chatbot, siempre validando cada paso.</li>
        <li><strong>El formato de entrega importa tanto como el contenido:</strong> dirigí a la IA para contrastar cada .md con la rúbrica oficial y confirmar que el contenido evaluable vive en docs_munjhe/ (no en los componentes React), evitando el error de entregas anteriores.</li>
      </ul>
    </Page>
  )
}
