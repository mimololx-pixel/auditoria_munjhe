# 01 · Resumen — Hotel Costa Brava

> **Informe A — Análisis de Vulnerabilidades.** Esta sección presenta la empresa
> auditada y su portal de clientes, y explica de qué trata el resto del informe.
> Está escrita para que **cualquier persona** —no solo alguien de informática— entienda
> qué se hizo y por qué importa.

## Objetivo de la sección

Dar contexto a la auditoría: **a quién** se audita (Hotel Costa Brava), **qué** sistema
se revisa (su portal de clientes) y **por qué** una falla de seguridad en ese sistema es
un problema serio para un hotel. Este contexto es lo que convierte un hallazgo técnico
en un **riesgo de negocio**.

---

## Hotel Costa Brava

La empresa **Hotel Costa Brava** es un hotel de la costa de la Región de Valparaíso (Chile), de
tamaño mediano, orientado a turismo nacional e internacional. Como cualquier hotel
moderno, su negocio depende de internet: la mayoría de las reservas, pagos y consultas
de los huéspedes pasan por sus sistemas digitales.

| Dato | Detalle |
|---|---|
| Rubro | Hotelería / turismo |
| Tamaño | Mediano (~120 habitaciones) |
| Canal principal | Reservas y atención en línea |
| Información que maneja | Datos personales de huéspedes, pagos, reservas |

> *Nota: Hotel Costa Brava es una empresa ficticia, asignada para esta evaluación. El
> análisis técnico se realiza sobre un entorno de laboratorio controlado (DVWA), no sobre
> sistemas reales del hotel.*

---

## El portal de clientes (lo que auditamos)

El **portal de clientes** es el sitio web donde los huéspedes:

- **Crean una cuenta** e inician sesión.
- **Buscan y reservan** habitaciones por fecha.
- **Pagan** en línea con tarjeta.
- **Consultan** sus reservas e historial de estadías.

Para funcionar, ese portal **guarda y consulta información en una base de datos**: nombres,
documentos de identidad (RUT/pasaporte), correos, teléfonos y datos de pago. Cada vez que
un huésped busca su reserva o inicia sesión, el portal le hace una *pregunta* a esa base de
datos. **Ahí está el punto sensible:** si el portal no separa bien lo que el usuario escribe
de las instrucciones que envía a la base de datos, un atacante puede aprovecharlo.

### ¿Por qué es atractivo para un atacante?

Un hotel concentra datos muy valiosos en un solo lugar:

- **Datos personales** de miles de huéspedes (sirven para fraude o suplantación).
- **Datos de pago** (tarjetas).
- **Patrones de viaje** (cuándo una persona estará fuera de su casa).

---

## Por qué esta auditoría

Una **auditoría de seguridad** revisa un sistema *como lo haría un atacante*, pero con
**permiso** y con un fin **defensivo**: encontrar las fallas antes que los delincuentes,
medir qué tan graves son y proponer cómo corregirlas.

Para Hotel Costa Brava, una brecha de seguridad no es solo un problema técnico; significa:

- **Pérdida de confianza** de los huéspedes y daño a la reputación.
- **Sanciones legales** por mal manejo de datos personales (Chile: Ley 19.628; conductas
  de ataque: Ley 21.459).
- **Pérdidas económicas** por fraude, multas o caída del servicio de reservas.

---

## Alcance y método

Esta auditoría se realiza sobre **DVWA** (*Damn Vulnerable Web Application*), una aplicación
**deliberadamente vulnerable** que usamos como "maqueta" del portal del hotel, en un
entorno **controlado y autorizado** para la actividad. Sobre ella se demuestran **tres
ataques web clásicos**, que son los que cubre el **Informe A**:

| # | Ataque | Qué demuestra |
|---|---|---|
| 1 | **Inyección SQL** | Exponer toda la base de datos de clientes |
| 2 | **XSS (Cross-Site Scripting)** | Ejecutar código en el navegador de la víctima |
| 3 | **Inyección de comandos** | Tomar control del servidor |

Luego, el **Informe B** traduce esos hallazgos al negocio: identifica los **activos** del
hotel, construye una **matriz de riesgo**, y propone **controles** de prevención/mitigación
y un **plan de recuperación**.

---

## Marco ético-legal

Todas las pruebas se hacen **únicamente** sobre el entorno DVWA autorizado para esta
actividad. Atacar sistemas ajenos sin autorización es **delito** en Chile (**Ley 21.459**,
sobre delitos informáticos). Estas técnicas se estudian con un objetivo **defensivo**:
saber cómo ocurren los ataques para poder **prevenirlos y mitigarlos**.

---

## Qué encontrarás en este informe

| Sección | Contenido |
|---|---|
| 01 · Resumen | Esta presentación (empresa + portal) |
| 02 · Inyección SQL | Evidencia, por qué funciona, gravedad (CVSS) y defensa |
| 03 · XSS | Evidencia, por qué funciona, gravedad (CVSS) y defensa |
| 04 · Inyección de comandos | Evidencia, por qué funciona, gravedad (CVSS) y defensa |
| 05 · Activos | Qué información y sistemas debe proteger el hotel |
| 06 · Matriz de riesgo | Probabilidad × impacto de cada hallazgo (mapa de calor) |
| 07 · Controles | Políticas de prevención y controles de mitigación |
| 08 · Recuperación | Plan de recuperación ante desastres y mejora tecnológica |
| 09 · Bitácora de IA | Registro del uso de inteligencia artificial en el trabajo |

---

## Conclusión de la sección

Hotel Costa Brava depende de su portal de clientes para operar, y ese portal concentra
**datos personales y financieros** muy sensibles. Por eso, las fallas de seguridad que se
demuestran en las siguientes secciones no son detalles técnicos menores: son **riesgos
reales para el negocio**, su reputación y sus huéspedes. El resto del informe los demuestra,
los mide y propone cómo cerrarlos.
