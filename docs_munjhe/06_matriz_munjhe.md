# 06 · Matriz de Riesgo y Mapa de Calor — Hotel Costa Brava

> **Informe B — Matriz de Riesgo · Criterio 3.1.3**
> A partir de los riesgos identificados en la sección 05 (R1–R6), se calcula el **nivel de cada
> riesgo** como **Probabilidad × Impacto**, se ubican en un **mapa de calor 5×5** y se
> **priorizan** las amenazas que Hotel Costa Brava debe atender primero.

## Objetivo de la sección

Convertir la lista de riesgos en una **priorización accionable**. No todos los riesgos pesan
igual: este capítulo asigna a cada uno una probabilidad y un impacto en escala 1–5, multiplica
ambos para obtener su **nivel de riesgo**, y los grafica en un **mapa de calor** que muestra de un
vistazo cuáles están en **zona roja** (atención inmediata).

---

## Qué es una matriz de riesgo (en simple)

Una matriz de riesgo responde dos preguntas por cada amenaza: **¿qué tan probable es que pase?**
y **¿qué tan grave sería si pasa?**. Al cruzar ambas se obtiene una nota: mientras más probable y
más grave, más arriba en la lista de prioridades.

Es como decidir qué arreglar primero en una casa: una gotera pequeña y rara puede esperar; una
fuga de gas probable y peligrosa se atiende **ahora**. El mapa de calor es el "semáforo" que pinta
de rojo lo urgente y de verde lo que puede esperar.

---

## 1. Criterios de evaluación

### Escala de Probabilidad (P) — ¿qué tan seguido podría ocurrir?

| P | Nivel | Significado para el hotel |
|---|---|---|
| 1 | Muy baja | Improbable; requiere condiciones muy específicas. |
| 2 | Baja | Podría ocurrir alguna vez, pero no es habitual. |
| 3 | Media | Es plausible que ocurra en el mediano plazo. |
| 4 | Alta | Ataque común en el sector; ocurre con frecuencia. |
| 5 | Muy alta | Casi seguro; es de los vectores más explotados hoy. |

### Escala de Impacto (I) — ¿cuánto daño causaría?

| I | Nivel | Significado para el hotel |
|---|---|---|
| 1 | Insignificante | Molestia menor, sin afectar operación ni datos. |
| 2 | Menor | Afecta a pocos huéspedes o un servicio secundario. |
| 3 | Moderado | Afecta a huéspedes individuales, datos o reputación. |
| 4 | Mayor | Interrumpe la operación o expone datos relevantes. |
| 5 | Catastrófico | Detiene el hotel y/o filtra datos masivos; impacto legal. |

### Bandas de prioridad (Nivel = P × I, rango 1–25)

| Rango | Banda | Acción |
|---|---|---|
| 1 – 4 | 🟢 Bajo | Aceptar / vigilar. |
| 5 – 9 | 🟡 Medio | Planificar mitigación. |
| 10 – 14 | 🟠 Alto | Mitigar pronto. |
| 15 – 25 | 🔴 Crítico | **Atención inmediata** (zona roja). |

---

## 2. Matriz técnica de cálculo

| ID | Riesgo | Origen | P | I | Nivel (P×I) | Prioridad |
|---|---|---|---|---|---|---|
| R1 | Fuga masiva de la BD de huéspedes | Inyección SQL | 4 | 5 | **20** | 🔴 Crítico |
| R4 | Ransomware que cifra el PMS | Malware (sector) | 4 | 5 | **20** | 🔴 Crítico |
| R3 | Toma de control del servidor | Inyección de comandos | 3 | 5 | **15** | 🔴 Crítico |
| R6 | Phishing y fraude de reservas | Ingeniería social | 5 | 3 | **15** | 🔴 Crítico |
| R2 | Robo de sesión / suplantación | XSS | 4 | 3 | **12** | 🟠 Alto |
| R5 | Caída / DDoS en temporada alta | Disponibilidad | 3 | 4 | **12** | 🟠 Alto |

### Justificación de cada valoración

- **R1 — Fuga de BD (P4 · I5):** la inyección SQL se demostró trivial en el laboratorio y es de los
  ataques más frecuentes contra portales (P alta); expone datos masivos de huéspedes con alcance
  legal (Ley 19.628) → impacto catastrófico.
- **R4 — Ransomware (P4 · I5):** la hotelería es blanco habitual de ransomware (P alta); cifrar el
  PMS detiene check-in/out y facturación → impacto catastrófico.
- **R3 — Control del servidor (P3 · I5):** la inyección de comandos requiere un punto vulnerable
  concreto, algo menos común que SQLi (P media); pero da control total del sistema → impacto máximo.
- **R6 — Phishing (P5 · I3):** es el vector inicial **más común** de todos (P muy alta); su impacto
  directo suele ser moderado (engaño puntual), aunque habilita otros ataques.
- **R2 — XSS (P4 · I3):** XSS reflejado es muy frecuente (P alta), pero afecta a huéspedes
  individuales (robo de sesión), no a la base completa → impacto moderado.
- **R5 — Caída/DDoS (P3 · I4):** plausible especialmente en temporada alta (P media); su impacto es
  mayor por la pérdida directa de ventas en el peor momento comercial.

---

## 3. 🔥 Mapa de calor (Probabilidad × Impacto)

Filas = **Impacto** (de 5 arriba a 1 abajo). Columnas = **Probabilidad** (de 1 a 5).
Cada celda muestra su color de banda; los riesgos se ubican según su (P, I).

| I ↓ \ P → | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| **5 (Catastrófico)** | 🟡 5 | 🟠 10 | 🔴 15 · **R3** | 🔴 20 · **R1 R4** | 🔴 25 |
| **4 (Mayor)** | 🟢 4 | 🟡 8 | 🟠 12 · **R5** | 🟠 16 | 🔴 20 |
| **3 (Moderado)** | 🟢 3 | 🟡 6 | 🟡 9 | 🟠 12 · **R2** | 🔴 15 · **R6** |
| **2 (Menor)** | 🟢 2 | 🟢 4 | 🟡 6 | 🟡 8 | 🟠 10 |
| **1 (Insignificante)** | 🟢 1 | 🟢 2 | 🟢 3 | 🟢 4 | 🟡 5 |

> El número de cada celda es el nivel de riesgo (P×I) que tendría un riesgo ubicado ahí.
> Los riesgos R1–R6 aparecen en la celda que corresponde a su valoración.

---

## 4. Priorización y zonas rojas

Ordenados de mayor a menor nivel de riesgo:

| Orden | ID | Riesgo | Nivel | Banda |
|---|---|---|---|---|
| 1 | R1 | Fuga masiva de la BD de huéspedes | 20 | 🔴 Crítico |
| 2 | R4 | Ransomware que cifra el PMS | 20 | 🔴 Crítico |
| 3 | R3 | Toma de control del servidor | 15 | 🔴 Crítico |
| 4 | R6 | Phishing y fraude de reservas | 15 | 🔴 Crítico |
| 5 | R2 | Robo de sesión / suplantación | 12 | 🟠 Alto |
| 6 | R5 | Caída / DDoS en temporada alta | 12 | 🟠 Alto |

### ⚠️ Alerta máxima — los riesgos que pueden paralizar el hotel hoy

Cuatro riesgos están en **zona roja (🔴 Crítico)** y exigen atención inmediata:

1. **R1 · Fuga de la base de datos** — un solo formulario vulnerable expone a todos los huéspedes.
2. **R4 · Ransomware del PMS** — deja al hotel sin poder operar (check-in/out ni cobros).
3. **R3 · Control del servidor** — compromiso total de la infraestructura y los datos.
4. **R6 · Phishing** — el vector inicial más probable; suele ser la puerta de entrada a los demás.

Los riesgos **R2** y **R5** (🟠 Alto) se atienden a continuación.

---

## Conclusión de la sección

La matriz traduce los riesgos de la sección 05 en una **lista priorizada**: cuatro están en zona
roja y deben corregirse de inmediato, encabezados por la **fuga de datos (R1)** y el **ransomware
(R4)**. Esta priorización es la que guía la **sección 07**, donde se definen las **políticas de
prevención y los controles de mitigación**, empezando por los riesgos críticos.
