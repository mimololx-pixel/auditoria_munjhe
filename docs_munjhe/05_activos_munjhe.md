# 05 · Activos de Información y Riesgos — Hotel Costa Brava

> **Informe B — Matriz de Riesgo · Criterio 3.1.2**
> Identificación y clasificación de los **activos de información** de Hotel Costa Brava y
> análisis de los **riesgos según su industria** (hotelería). Esta sección es el **insumo de
> la matriz de riesgo** (sección 06): los riesgos identificados aquí (R1…R6) son los que
> luego se grafican en el mapa de calor.

## Objetivo de la sección

Antes de medir el riesgo hay que saber **qué tenemos que proteger** y **qué puede salir mal**.
Esta sección (1) **inventaría y clasifica** los activos del portal de clientes y su entorno, le
asigna una **criticidad**, y (2) desglosa **paso a paso** los riesgos propios de un hotel,
conectando los tres ataques demostrados en el Informe A con las amenazas típicas del sector.

---

## Qué es un activo (en simple)

Un **activo de información** es cualquier cosa que tiene **valor para el negocio** y que, si se
pierde, se filtra o deja de funcionar, le hace daño al hotel. No son solo los datos: también el
software que opera el hotel (el sistema de reservas), la infraestructura donde corre y hasta los
dispositivos físicos conectados a la red (las cerraduras electrónicas de las habitaciones).

La **criticidad** responde a una pregunta sencilla: *"si este activo falla o se filtra, ¿cuánto
duele?"* — **Alta** (el hotel se detiene o hay datos sensibles en juego), **Media** (afecta pero
hay alternativas) o **Baja** (molesto, pero sin gran impacto).

---

## 1. Identificación y clasificación de activos

Los activos se clasifican en cuatro categorías: **Datos**, **Software/Aplicaciones**,
**Infraestructura/Cloud** y **Físico/IoT**.

| ID | Activo | Categoría | Descripción técnica | Criticidad |
|---|---|---|---|---|
| A1 | Base de datos de huéspedes | Datos | Datos personales: nombre, RUT/pasaporte, correo, teléfono, dirección. Protegidos por la Ley 19.628. | 🔴 Alta |
| A2 | Datos de pago / tarjetas | Datos | Números de tarjeta y datos de facturación usados en reservas. Alcance normativo PCI-DSS. | 🔴 Alta |
| A3 | Datos de reservas y estadías | Datos | Fechas, habitaciones, historial y preferencias de cada huésped (revela ubicación y hábitos). | 🟠 Media |
| A4 | PMS / motor de reservas | Software | *Property Management System*: corazón operativo del hotel (check-in/out, disponibilidad, tarifas, facturación). | 🔴 Alta |
| A5 | Portal de clientes (web) | Software | La aplicación web auditada: formularios de búsqueda, reserva y login. Superficie expuesta a internet. | 🔴 Alta |
| A6 | Channel manager / OTAs | Software | Integración con Booking, Expedia, etc. que sincroniza disponibilidad y precios. | 🟠 Media |
| A7 | Servidor web y base de datos | Infraestructura/Cloud | Hosting donde corre el portal y la BD. Su compromiso da control del sistema completo. | 🔴 Alta |
| A8 | Copias de seguridad (backups) | Infraestructura/Cloud | Respaldos de la BD y configuración: última línea de defensa ante ransomware o borrado. | 🔴 Alta |
| A9 | Red corporativa e internet | Infraestructura/Cloud | Conectividad del hotel; su caída deja sin servicio reservas, pagos y PMS. | 🟠 Media |
| A10 | Cerraduras electrónicas de habitación | Físico/IoT | Llaves/tarjetas RFID gestionadas en red; un compromiso afecta la seguridad física del huésped. | 🟠 Media |
| A11 | Wi-Fi de huéspedes | Físico/IoT | Red abierta a clientes; si no está segmentada, es puerta de entrada a la red interna. | 🟡 Baja |
| A12 | Cámaras / CCTV y POS de recepción | Físico/IoT | Videovigilancia y punto de venta de recepción conectados a la red del hotel. | 🟡 Baja |

---

## 2. Análisis de riesgos del sector hotelero (paso a paso)

Cada riesgo lleva un **ID (R1…R6)** que se reutiliza en la matriz (06). Los tres primeros nacen
de los ataques **demostrados** en el Informe A; los tres siguientes son amenazas características
del rubro hotelero. Cada uno se desglosa como **vector → activo afectado → impacto de negocio**.

### R1 · Fuga masiva de la base de datos de huéspedes (Inyección SQL)
- **Vector:** un formulario del portal (A5) construye consultas concatenando la entrada del
  usuario → un `' OR '1'='1` devuelve la tabla completa.
- **Activo afectado:** A1 (datos de huéspedes), A2 (datos de pago).
- **Impacto de negocio:** filtración de miles de huéspedes → suplantación y fraude, incumplimiento
  de la Ley 19.628, multas y daño reputacional grave.

### R2 · Robo de sesión y suplantación de huéspedes (XSS)
- **Vector:** un campo del portal (A5) refleja sin sanear `<script>…</script>` → el código se
  ejecuta en el navegador de la víctima y roba su cookie de sesión.
- **Activo afectado:** A5 (portal), A1/A3 (cuenta y reservas del huésped suplantado).
- **Impacto de negocio:** un atacante actúa **como el huésped**: ve/modifica sus reservas, datos
  y pagos. Pérdida de confianza y posible fraude.

### R3 · Toma de control del servidor (Inyección de comandos)
- **Vector:** una función del portal (A5) pasa la entrada al sistema operativo →
  `127.0.0.1; cat /etc/passwd` ejecuta comandos arbitrarios en el servidor (A7).
- **Activo afectado:** A7 (servidor y BD), y por extensión **todos** los datos (A1, A2, A3).
- **Impacto de negocio:** compromiso total: robo de toda la información, instalación de malware,
  uso del servidor como plataforma de ataque. El peor escenario técnico.

### R4 · Ransomware que cifra el PMS (malware)
- **Vector:** correo malicioso o credencial robada → malware que **cifra** la BD y el PMS (A4) y
  sus respaldos (A8) si no están aislados.
- **Activo afectado:** A4 (PMS), A8 (backups), A7 (servidor).
- **Impacto de negocio:** el hotel **no puede hacer check-in/out ni facturar**; operación detenida,
  rescate exigido y posible pérdida definitiva de datos si los backups también se cifraron.

### R5 · Caída / denegación de servicio en temporada alta (disponibilidad)
- **Vector:** sobrecarga (DDoS) o fallo de infraestructura sobre el portal y la red (A5, A9) en el
  peor momento comercial.
- **Activo afectado:** A5 (portal de reservas), A9 (red/conectividad), A6 (channel manager).
- **Impacto de negocio:** sin motor de reservas en plena demanda → **pérdida directa de ventas**,
  los clientes reservan en la competencia, y daño a la posición en las OTAs.

### R6 · Phishing y fraude de reservas (ingeniería social)
- **Vector:** correos o sitios falsos que imitan al hotel para engañar a **huéspedes** o a
  **recepción** (A12 POS) y obtener pagos o credenciales.
- **Activo afectado:** las personas (huéspedes y personal), A2 (pagos), credenciales del PMS (A4).
- **Impacto de negocio:** cobros fraudulentos a nombre del hotel, robo de credenciales que abre la
  puerta a los demás riesgos, y erosión de la marca.

---

## 3. 📖 Glosario de riesgos para humanos

Los mismos riesgos de arriba, sin tecnicismos: **qué pasaría en la práctica** si ocurren en el hotel.

| Riesgo | En palabras simples |
|---|---|
| **R1 — Fuga de datos** | "Se filtró la lista completa de huéspedes." Nombres, documentos y contactos de miles de personas quedan expuestos: riesgo de estafas a los clientes y multas para el hotel. |
| **R2 — Robo de sesión** | "Alguien entró haciéndose pasar por un huésped." Ve y cambia las reservas y datos de esa persona como si fuera ella. |
| **R3 — Control del servidor** | "Le robaron las llaves del computador central del hotel." El atacante puede ver todo, borrar todo o instalar virus. |
| **R4 — Ransomware** | "El sistema de reservas quedó secuestrado." Aparece un cartel pidiendo dinero y nadie puede registrar entradas, salidas ni cobrar hasta resolverlo. |
| **R5 — Caída del sitio** | "La página de reservas se cayó justo en temporada alta." Los clientes no pueden reservar y se van a la competencia: plata que no entra. |
| **R6 — Phishing / fraude** | "Estafadores se hacen pasar por el hotel." Engañan a clientes o al personal con correos falsos para robar pagos o contraseñas. |

---

## Conclusión de la sección

Hotel Costa Brava maneja activos **críticos** —datos personales y de pago de sus huéspedes, y el
PMS del que depende toda la operación— expuestos a través de un portal en internet. Los seis
riesgos identificados (R1–R6) combinan las vulnerabilidades **demostradas** (SQLi, XSS, comandos)
con amenazas propias del rubro (ransomware, caídas en temporada alta, fraude). Estos riesgos, con
su probabilidad e impacto, son exactamente lo que la **sección 06** ordenará y priorizará en la
**matriz de riesgo y su mapa de calor**.
