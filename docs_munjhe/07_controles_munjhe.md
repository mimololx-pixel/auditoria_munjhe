# 07 · Controles de Prevención y Mitigación — Hotel Costa Brava

> **Informe B — Matriz de Riesgo · Criterios 3.1.4 (prevención) y 3.1.5 (mitigación)**
> Para cada riesgo priorizado en la sección 06 (R1–R6) se definen **controles preventivos**
> (evitar que ocurra) y **controles mitigantes** (reducir el daño si ocurre), mapeados a los
> estándares **OWASP Top 10 (2021)** y **CIS Controls v8**.

## Objetivo de la sección

Traducir la priorización de la matriz en **acciones concretas**. Se atiende primero la zona roja
(R1 fuga de datos, R4 ransomware, R3 control del servidor, R6 phishing) y luego los riesgos altos
(R2, R5). Cada control indica su **tipo**, su **implementación técnica**, el **estándar** que lo
respalda y el **responsable** dentro del hotel.

---

## Prevención vs. mitigación (en simple)

- 🛡️ **Prevención (3.1.4):** medidas para que el problema **no ocurra**. Es la cerradura de la
  puerta: impedir la entrada.
- 🩹 **Mitigación (3.1.5):** medidas para que, **si ocurre igual**, el daño sea el menor posible.
  Es el extintor y el seguro: no evitan el incendio, pero limitan las pérdidas.

Un buen control combina ambas: ninguna defensa es perfecta, así que asumimos que algo fallará y
preparamos la contención.

---

## 1. Matriz técnica de controles

| ID | Riesgo | Tipo | Control e implementación técnica | Estándar | Responsable |
|---|---|---|---|---|---|
| C1.1 | R1 | 🛡️ Preventivo | **Consultas parametrizadas / ORM** y validación estricta de entradas (tipos, longitud). El dato nunca se interpreta como SQL. | OWASP A03 · CIS 16 | Equipo de Desarrollo |
| C1.2 | R1 | 🛡️ Preventivo | **Hashing de contraseñas con bcrypt/argon2** (+ salt). Nunca almacenar credenciales en claro. | OWASP A02 · CIS 16 | Equipo de Desarrollo |
| C1.3 | R1 | 🩹 Mitigante | **Privilegios mínimos en la BD** (la cuenta del portal solo lee lo necesario) + **cifrado en reposo** y **tokenización de tarjetas**. | OWASP A01/A02 · CIS 3 | DBA / SecOps |
| C2.1 | R2 | 🛡️ Preventivo | **Codificación de salida (output encoding)** y sanitización de todo dato reflejado + **Content Security Policy (CSP)**. | OWASP A03 · CIS 16 | Equipo de Desarrollo |
| C2.2 | R2 | 🩹 Mitigante | **Cookies `HttpOnly`, `Secure`, `SameSite`**, expiración de sesión y re-autenticación para acciones sensibles. | OWASP A07 · CIS 16 | Equipo de Desarrollo |
| C3.1 | R3 | 🛡️ Preventivo | **No invocar el shell del SO** con datos del usuario; usar APIs nativas y listas blancas de valores permitidos. | OWASP A03 · CIS 16 | Equipo de Desarrollo |
| C3.2 | R3 | 🩹 Mitigante | **Hardening + privilegios mínimos del proceso web**, aislamiento (contenedores) y **WAF** que bloquee patrones de inyección. | OWASP A05 · CIS 4 | SysAdmin / SecOps |
| C4.1 | R4 | 🛡️ Preventivo | **EDR/antimalware + parches al día + MFA** en accesos y **segmentación de red** (huéspedes ≠ corporativa). | CIS 10 · CIS 5 | SecOps / TI |
| C4.2 | R4 | 🩹 Mitigante | **Backups 3-2-1 inmutables/offline** y plan de recuperación probado (ver sección 08). | CIS 11 | SecOps / TI |
| C5.1 | R5 | 🛡️ Preventivo | **CDN + protección anti-DDoS** (p. ej. Cloudflare), **rate limiting** y autoescalado en temporada alta. | CIS 13 | SysAdmin / SecOps |
| C5.2 | R5 | 🩹 Mitigante | **Balanceo y failover**, monitoreo con alertas y plan de continuidad operacional. | CIS 8 · CIS 11 | SecOps |
| C6.1 | R6 | 🛡️ Preventivo | **MFA**, autenticación de correo **SPF/DKIM/DMARC**, filtros antiphishing y **capacitación** al personal. | OWASP A07 · CIS 9/14 | SecOps / RRHH |
| C6.2 | R6 | 🩹 Mitigante | **Procedimiento de verificación** de pagos/cambios de reserva, monitoreo de dominios suplantados y **respuesta a incidentes**. | CIS 17 | SecOps |

> **Política transversal de desarrollo seguro (3.1.4):** estándar de codificación segura, **revisión
> de código** obligatoria, análisis estático (**SAST**) y de dependencias en el pipeline, y
> capacitación del equipo (incluido el código generado por IA, que suele concatenar por defecto).

---

## 2. Cobertura por riesgo (resumen)

| Riesgo | Prioridad | Preventivos | Mitigantes |
|---|---|---|---|
| R1 · Fuga de BD | 🔴 Crítico | C1.1, C1.2 | C1.3 |
| R4 · Ransomware PMS | 🔴 Crítico | C4.1 | C4.2 |
| R3 · Control del servidor | 🔴 Crítico | C3.1 | C3.2 |
| R6 · Phishing | 🔴 Crítico | C6.1 | C6.2 |
| R2 · Robo de sesión (XSS) | 🟠 Alto | C2.1 | C2.2 |
| R5 · Caída / DDoS | 🟠 Alto | C5.1 | C5.2 |

Todos los riesgos quedan cubiertos con al menos un control preventivo **y** uno mitigante.

---

## 3. 📖 Manual SecOps de código seguro (para el equipo de desarrollo)

Guía rápida, de colega a colega: cómo escribir el portal del hotel evitando los riesgos del informe.

### 3.1 Sanitiza entradas y codifica salidas (R1, R2, R3)

Nunca confíes en lo que llega del usuario. Separa **datos** de **instrucciones**.

```php
// ❌ MAL: concatenar la entrada (inyección SQL — R1)
$sql = "SELECT * FROM huespedes WHERE id = '$id'";

// ✅ BIEN: consulta parametrizada
$stmt = $pdo->prepare("SELECT * FROM huespedes WHERE id = ?");
$stmt->execute([$id]);   // el dato jamás se interpreta como SQL
```

```js
// XSS (R2): escapa SIEMPRE al pintar datos del usuario en el HTML.
// No uses innerHTML con datos sin sanear; usa textContent o una librería de escape.
elemento.textContent = nombreHuesped;   // seguro
// y refuerza con cabecera CSP: Content-Security-Policy: default-src 'self'
```

> Para comandos del sistema (R3): **no** pases entrada del usuario al shell. Usa APIs nativas y
> listas blancas de valores permitidos.

### 3.2 Maneja secretos con variables de entorno (R4, R6)

Las credenciales **no** van en el código ni en el repositorio.

```js
// ❌ MAL: clave hardcodeada (queda en el historial de git para siempre)
const apiKey = "sk_live_51H...";

// ✅ BIEN: leer de variables de entorno
const apiKey = process.env.PAYMENT_API_KEY;
```

```bash
# .env  →  SIEMPRE en .gitignore (nunca se commitea)
PAYMENT_API_KEY=sk_live_...
DB_PASSWORD=...
```

> Rota las claves periódicamente y de inmediato si una se filtra. Usa un gestor de secretos para
> producción (no `.env` plano en el servidor).

### 3.3 Guarda contraseñas con hashing, nunca en claro (R1)

Si te roban la base (R1), las contraseñas hasheadas siguen siendo inútiles para el atacante.

```js
import bcrypt from 'bcrypt'

// Al registrar: guarda el HASH, nunca la contraseña
const hash = await bcrypt.hash(password, 12)   // 12 = factor de coste + salt automático

// Al iniciar sesión: compara contra el hash
const ok = await bcrypt.compare(password, hash)
```

> Reglas: **bcrypt/argon2** (no MD5/SHA1), salt único por usuario (bcrypt lo incluye), y
> contraseñas mínimas razonables + MFA para cuentas con acceso al PMS.

### 3.4 Mantén dependencias y transporte seguros (R3, R5)

```bash
npm audit            # detecta dependencias con vulnerabilidades conocidas
npm audit fix        # aplica parches compatibles
```

> Sirve **todo por HTTPS/TLS** (sin contenido mixto), aplica parches al día y elimina librerías
> que no uses. Una dependencia vulnerable es una puerta abierta aunque tu código sea perfecto.

---

## Conclusión de la sección

Cada riesgo crítico y alto queda cubierto por una pareja de controles **preventivo + mitigante**,
respaldados por OWASP y CIS, con un responsable asignado. La defensa de fondo es **desarrollo
seguro** (parametrizar, escapar, hashear, gestionar secretos) reforzada con controles de
infraestructura (WAF, backups, MFA, anti-DDoS). El control mitigante de mayor alcance —los
**backups y la recuperación**— se desarrolla en la **sección 08**.
