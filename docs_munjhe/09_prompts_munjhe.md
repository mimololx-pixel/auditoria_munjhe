# 09 · Bitácora de uso de IA — Hotel Costa Brava

> **Criterio transversal.** Registro del uso de inteligencia artificial en este proyecto: qué
> herramienta se usó, qué se le pidió, qué se aceptó, qué se corrigió y una reflexión final.

## Herramienta y modalidad

- **Herramienta:** Claude Code (modelo Claude Opus), usado como **agente** dentro del editor:
  además de responder, **ejecuta acciones** (crea archivos, corre `npm run build`, hace
  commits y push, lee los PDF de la evaluación).
- **Diferencia clave (agente vs chatbot):** un chatbot solo entrega texto que después hay que
  copiar y pegar a mano; el agente **opera sobre el proyecto real** y se le puede pedir que
  verifique su propio trabajo (compilar, revisar). Eso exige **dirigirlo y validar** lo que
  hace, no aceptar a ciegas.

La responsabilidad del contenido y de las decisiones técnicas es **mía** (el estudiante);
la IA es una herramienta de apoyo.

---

## Bitácora por tarea

### 1. Lectura de la evaluación y contexto del negocio
- **Prompt (resumen):** "Lee los PDF de `datos_auditoria/` y dime qué pide exactamente la
  Evaluación 3. Mi empresa asignada es **Hotel Costa Brava** (hotelería)."
- **Acepté:** el mapa de entregas (Informe A y B), los 9 archivos `.md` y la regla de que **lo
  evaluable son los `.md`** de `docs_munjhe/`.
- **Corregí / dirigí:** descarté la `rubrica_evaluacion_U02.pdf` porque era de **otro trabajo**
  (análisis legal), no de esta auditoría.

### 2. Inyección SQL
- **Prompt:** "Redacta `02_sqli` para el portal del **Hotel Costa Brava**: explica el payload
  `' OR '1'='1`, por qué funciona, calcula el **CVSS** y propón **prevención y mitigación**
  específicas para un hotel."
- **Acepté:** la explicación con el ejemplo del bibliotecario y la defensa con **consultas
  parametrizadas**.
- **Corregí:** exigí justificar el **CVSS por métrica** (no un número suelto) y aclarar que el
  7.5 es el "**piso, no el techo**", porque la misma falla suele permitir modificar/borrar datos.

### 3. XSS (Cross-Site Scripting)
- **Prompt:** "Documenta `03_xss` con el payload `<script>alert('XSS')</script>`; enfócalo en el
  riesgo de **robo de sesión de un huésped** y phishing dentro del portal real."
- **Acepté:** el contexto de robo de sesión y las defensas (escape de salida + CSP + cookies
  HttpOnly).
- **Corregí:** la primera **captura no mostraba el popup**; rehíce el pantallazo para evidenciar
  la alerta ejecutándose y se incluyeron **las dos imágenes** (payload + popup).

### 4. Inyección de comandos
- **Prompt:** "Redacta `04_comandos` con `127.0.0.1; cat /etc/passwd`; explica por qué es el
  ataque **más crítico** para el hotel y cómo se contiene."
- **Acepté:** el CVSS **9.8 (crítico)** con su vector y el ejemplo del conserje.
- **Corregí / dirigí:** pedí distinguir bien **prevención** (listas blancas, no enviar la
  entrada al sistema operativo) de **mitigación** (privilegios mínimos, aislamiento).

### 5. Sitio web (presentación)
- **Prompt:** "El sitio conserva una estética de informe bancario; quiero un diseño **claro y
  amigable para alguien que no sabe nada de seguridad**: portada, glosario y etiquetas de
  riesgo en lenguaje simple."
- **Acepté:** el tema claro con acento teal, el glosario y la traducción del CVSS a frases
  ("🔴 Muy grave — corregir de inmediato").
- **Corregí / dirigí:** que el rediseño **no tocara el contenido evaluable** de los `.md`, solo
  la presentación.

### 6. Configuración y entrega (repositorio)
- **Prompt:** "Crea el repositorio, conéctalo y deja el proyecto listo para Vercel."
- **Corregí / dirigí:** el nombre tenía la **`ñ`** (`muñjhe`), que GitHub/Vercel no aceptan;
  se unificó todo a **`auditoria_munjhe`** (ñ → n) para cumplir la nomenclatura.

### 7. Presentación interactiva del Informe A
- **Prompt:** "Haz la Parte A más **dinámica y didáctica** para usuarios comunes: una demo
  donde se alterne entrada normal vs. del atacante, un medidor visual del CVSS y una mini
  autocomprobación al final de cada ataque."
- **Acepté:** la demo "Pruébalo tú" (transforma la consulta/HTML/comando en vivo y anima el
  resultado), el medidor 0–10 a color y el quiz con feedback inmediato.
- **Corregí / dirigí:** dos cosas. (1) Antes de tocar nada, exigí **verificar que los `.md`
  evaluables estuvieran completos** comparándolos contra `instrucciones_evaluacion03.pdf`
  (lección del trabajo anterior: el profesor evalúa los `.md`, no los `.jsx`). (2) Que la
  interactividad fuera **solo presentación**: los widgets re-presentan datos que ya están en
  los `.md` y **no se movió ningún contenido evaluable** a React (`git status` confirmó que
  solo cambiaron los `.jsx`).

### 8. Activos de información y riesgos (Informe B · 3.1.2)
- **Prompt (rol):** "Actúa como *Senior Cybersecurity Analyst*. Genera `05_activos` clasificando
  los activos en **Datos, Software e Infraestructura Cloud**, con tabla técnica (ID, descripción,
  criticidad) y una sección Wiki con un **glosario para humanos**."
- **Acepté:** la tabla de activos con criticidad, el desglose paso a paso de riesgos y el glosario
  "para humanos".
- **Corregí / dirigí:** el prompt estaba pensado para **comercio/POS**; lo reorienté a **hotelería**
  (PMS, cerraduras electrónicas, Wi-Fi de huéspedes…). Añadí una **4ª categoría Físico/IoT**, puse
  el **sufijo `_munjhe`** y, sobre todo, di **ID a cada riesgo (R1–R6)** para engancharlos con la
  matriz. Descarté el "estilo terminal" y el CVSS por activo (aquí la criticidad es Alta/Media/Baja).

### 9. Matriz de riesgo y mapa de calor (Informe B · 3.1.3)
- **Prompt (rol):** "Actúa como *Risk & Compliance Officer (ISO 27001)*. Genera `06_matriz` con
  **Probabilidad × Impacto** en escala **1–5**, tablas de cálculo y un **mapa de calor 5×5** con
  las 'zonas rojas'."
- **Acepté:** la escala 1–5, la matriz P×I y la idea del mapa de calor + resumen ejecutivo.
- **Corregí / dirigí:** lo até a **R1–R6** (no riesgos genéricos) y revisé personalmente la
  **valoración P×I** de cada uno. Exigí que el mapa de calor fuera un **componente visual real**
  (no solo tabla de texto), porque la rúbrica lo pide explícitamente. Definí **4 bandas** de
  prioridad (Bajo/Medio/Alto/Crítico).

### 10. Controles de prevención y mitigación (Informe B · 3.1.4/5)
- **Prompt (rol):** "Actúa como *Security Engineer & SecOps*. Genera `07_controles` con matriz de
  controles (WAF, cifrado, hashing, sanitización) vinculados al `ID_Riesgo`, y un **manual SecOps
  de código seguro** (variables de entorno, bcrypt…)."
- **Acepté:** la matriz `Control → Riesgo → Tipo → Implementación → Responsable` y el manual de
  código seguro de colega a colega.
- **Corregí / dirigí:** exigí **separar prevención (3.1.4) de mitigación (3.1.5)** marcando cada
  control, y **mapear cada uno a OWASP Top 10 + CIS Controls** para dar rigor. Reorienté a
  hotelería y mantuve los snippets **conceptuales** (la app es estática, no hay backend real).

### 11. Mejora tecnológica y recuperación (Informe B · 3.1.6)
- **Prompt (rol):** "Actúa como *Solutions Architect & DR Specialist*. Genera `08_recuperacion` con
  métricas **RTO/RPO**, protocolo de incidentes y un **runbook de primeros auxilios** ('qué hacer
  si…')."
- **Acepté:** las métricas RTO/RPO, el protocolo por fases y el runbook accionable.
- **Corregí / dirigí:** puse **RTO/RPO diferenciados por criticidad** (PMS estricto vs. datos
  históricos) en vez de un único valor; añadí una **arquitectura objetivo de alta disponibilidad**
  para cubrir la "mejora tecnológica" del criterio; y enganché todo con **C4.2 (backups 3-2-1)** y
  los riesgos R4/R5/R1. Los comandos del runbook quedaron **ilustrativos**.

### 12. Refinamiento visual (paleta + detalle 3D)
- **Prompt:** "Revisa una paleta de Coolors y three.js; dime qué sirve para el proyecto."
- **Acepté:** aplicar la **paleta de Coolors** (acento cian #16BAC5 + índigo #5863F8, fondo lavanda
  #EFE9F4) como refinamiento sutil del tema, y añadir un **detalle 3D** (icosaedro low-poly con
  three.js) en la portada.
- **Corregí / dirigí:** descarté inicialmente three.js por **peso** (no aporta a una entrega evaluada
  por contenido); al pedirlo igualmente, lo implementé **aislado**: carga diferida (`lazy`+`Suspense`)
  para que **no engorde el bundle del resto de secciones**, con fallback a la ilustración SVG,
  respeto de `prefers-reduced-motion` y liberación de recursos al desmontar. La paleta se aplicó
  solo al **acento** (rampa `teal`), preservando los colores semánticos de severidad.

---

## Reflexión final

- **La IA acelera, pero no reemplaza el criterio.** Varias veces el primer resultado era
  mejorable (CVSS sin justificar, captura sin popup, nombre con `ñ`): detectarlo requiere
  **entender** el tema, no solo copiar.
- **Riesgo de código vulnerable:** la guía del curso advierte —y lo confirmé— que una IA, al
  conectar una base de datos, **tiende a concatenar** la entrada (código vulnerable). Por eso
  hay que **pedir explícitamente** consultas parametrizadas y validación.
- **Prompts dirigidos > prompts genéricos:** nombrar la empresa, el payload concreto y la
  defensa esperada produjo respuestas mucho más útiles que un "hazme el informe".
- **Usar la IA como agente** (que ejecuta y verifica) fue más productivo que como simple
  chatbot, siempre que yo revisara cada paso y tomara las decisiones finales.
- **El formato de entrega importa tanto como el contenido:** dirigí a la IA para que
  contrastara cada `.md` con la rúbrica oficial y confirmara que el contenido evaluable vive
  en `docs_munjhe/` (no en los componentes React), evitando el error de entregas anteriores.
- **Adaptar plantillas genéricas al contexto real:** en el Informe B partí de prompts con rol
  (analista, risk officer, SecOps, DR), pero **todos venían pensados para comercio/retail**. El
  valor estuvo en **reorientarlos a hotelería**, encadenar las secciones entre sí (activos →
  riesgos R1–R6 → matriz → controles → recuperación) y exigir estándares (OWASP/CIS, NIST, 3-2-1).
  Un prompt bueno es un punto de partida, no la entrega.
