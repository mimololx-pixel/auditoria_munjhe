# 08 · Mejora Tecnológica y Plan de Recuperación (DR) — Hotel Costa Brava

> **Informe B — Matriz de Riesgo · Criterio 3.1.6**
> Propuesta de **mejora tecnológica** (arquitectura de alta disponibilidad) y **plan de
> recuperación ante desastres (DRP)** con métricas RTO/RPO, protocolo de incidentes y un
> **runbook de primeros auxilios**. Materializa el control C4.2 (backups 3-2-1) de la sección 07
> y responde sobre todo a R4 (ransomware), R5 (caída) y R1 (fuga de datos).

## Objetivo de la sección

Ninguna defensa es perfecta: hay que prepararse para **recuperarse rápido** cuando algo falla.
Esta sección define cuánto puede tardar el hotel en volver a operar y cuántos datos puede perder
(RTO/RPO), propone una arquitectura más resiliente, y entrega un protocolo y un runbook para que el
equipo actúe sin improvisar bajo presión.

---

## RTO y RPO (en simple)

- ⏱️ **RTO (Recovery Time Objective):** *¿cuánto tardo en volver a funcionar?* El tiempo máximo
  aceptable de caída antes de restablecer el servicio.
- 💾 **RPO (Recovery Point Objective):** *¿cuántos datos puedo permitirme perder?* El tiempo máximo
  entre respaldos; si el último backup fue hace 1 hora, puedo perder hasta 1 hora de reservas.

Analogía: el RTO es *cuánto demora la ambulancia en llegar*; el RPO es *qué tan reciente es la
última foto del paciente sano* a la que puedo volver.

---

## 1. Mejora tecnológica — arquitectura objetivo de alta disponibilidad

Hoy el portal corre en un único servidor (punto único de falla). La arquitectura propuesta elimina
ese riesgo y añade capacidad de recuperación:

```
                 Internet (huéspedes)
                        │
              ┌─────────▼─────────┐
              │  CDN + Anti-DDoS  │   ataja R5 (caída/DDoS)
              │     + WAF          │   ataja R1/R2/R3 (inyecciones)
              └─────────┬─────────┘
                        │
              ┌─────────▼─────────┐
              │   Balanceador     │
              └────┬─────────┬────┘
                   │         │           portal redundante (sin punto único)
            ┌──────▼──┐  ┌───▼─────┐
            │ Portal  │  │ Portal  │
            │  web 1  │  │  web 2  │
            └────┬────┘  └────┬────┘
                 └─────┬──────┘
            ┌──────────▼───────────┐
            │  BD primaria  ─────►  │  réplica (failover) — ataja R5
            │  (cifrada en reposo)  │  cifrado — ataja R1
            └──────────┬───────────┘
                       │
            ┌──────────▼───────────┐
            │  Backups 3-2-1        │  inmutables / offline — ataja R4 (ransomware)
            │  (offsite, cifrados)  │
            └──────────────────────┘
```

| Pieza | Qué aporta | Riesgo que ataja | Control (fase 07) |
|---|---|---|---|
| CDN + Anti-DDoS + WAF | Absorbe picos y bloquea ataques | R5, R1/R2/R3 | C5.1, C3.2 |
| Balanceador + portal redundante | Elimina el punto único de falla | R5 | C5.2 |
| BD con réplica (failover) | Continuidad si cae la primaria | R5 | C5.2 |
| Cifrado en reposo | Datos inútiles si se roban | R1 | C1.3 |
| Backups 3-2-1 inmutables offsite | Restaurar tras ransomware/borrado | R4 | C4.2 |
| MFA + segmentación de red | Frena acceso y propagación | R4, R6 | C4.1, C6.1 |

---

## 2. Estrategia de continuidad (RTO / RPO / backups)

Los objetivos se diferencian por **criticidad**: el PMS no puede estar caído, los datos históricos
toleran más.

| Sistema | Criticidad | RTO (volver a operar) | RPO (datos perdidos máx.) | Estrategia de respaldo |
|---|---|---|---|---|
| PMS / motor de reservas | 🔴 Alta | < 4 horas | < 1 hora | Réplica en caliente + backup horario |
| Portal de clientes (web) | 🔴 Alta | < 8 horas | < 24 horas | Despliegue redundante + backup diario |
| Datos históricos / reportes | 🟠 Media | < 24 horas | < 24 horas | Backup diario offsite |

### Regla 3-2-1 de respaldos

- **3** copias de los datos.
- en **2** medios distintos.
- con **1** copia **fuera del sitio** (offsite) e idealmente **inmutable/offline**.

> La copia **inmutable/offline** es clave contra **ransomware (R4)**: si el malware no puede
> alcanzar ni cifrar el backup, siempre hay un punto de restauración limpio. Los backups deben
> **probarse periódicamente** (un backup que nunca se restauró no es un backup, es una esperanza).

---

## 3. Protocolo de respuesta a incidentes (NIST)

Cinco fases, con lo que hace el hotel en cada una:

1. **Detección e identificación.** Alertas/monitoreo o reporte detectan la anomalía. Se clasifica
   la severidad y se activa al responsable (SecOps).
2. **Contención.** Aislar lo afectado para frenar la propagación (desconectar el equipo, bloquear
   la cuenta, activar modo mantenimiento). No destruir evidencia.
3. **Erradicación.** Eliminar la causa raíz (cerrar la vulnerabilidad, quitar el malware, rotar
   credenciales comprometidas).
4. **Recuperación.** Restaurar desde backups limpios, validar integridad y volver a producción de
   forma controlada (cumpliendo el RTO/RPO del sistema).
5. **Lecciones aprendidas.** Post-mortem: qué falló, qué control reforzar y actualizar el plan.

**Roles:** SecOps/TI lidera la respuesta; Desarrollo corrige el código; Recepción/Gerencia gestiona
la comunicación a huéspedes; Legal evalúa obligaciones (Ley 19.628).

---

## 4. 📖 Runbook de primeros auxilios ("Qué hacer si…")

Pasos rápidos y directos para los primeros minutos. *(Comandos ilustrativos; adaptar al entorno real
del hotel.)*

### 🚨 Escenario A — La web/app se cayó por completo
1. Confirmar el alcance: ¿es la web, la red o el proveedor? Revisar el monitoreo.
2. Activar **página de mantenimiento** para no perder confianza del cliente.
3. Revisar estado de servicios y reiniciar el portal; si un nodo falla, el balanceador deriva al sano.

```bash
systemctl status nginx            # ¿está arriba el servidor web?
systemctl restart nginx           # reiniciar el servicio del portal
curl -I https://hotelcostabrava.cl  # verificar que responde 200 OK
```

### 🗄️ Escenario B — Error o pérdida de datos en la base de datos
1. **Detener escrituras** (modo mantenimiento) para no corromper más datos.
2. Identificar el **último backup íntegro** dentro del RPO.
3. **Restaurar** y validar integridad antes de reabrir.

```bash
ls -lh /backups/db/                       # ubicar el último respaldo
mysql -u admin -p hotel < /backups/db/hotel_2026-06-27_03h.sql   # restaurar
mysql -u admin -p -e "SELECT COUNT(*) FROM reservas;"            # validar
```

### 🔒 Escenario C — Ransomware (PMS/equipos cifrados)
1. **Aislar de inmediato** los equipos afectados de la red (evitar propagación).
2. **No pagar** el rescate; activar el protocolo de incidentes y avisar a SecOps/Gerencia.
3. Restaurar desde el **backup inmutable/offline** (la copia que el malware no pudo tocar).

```bash
# Desconectar el equipo de la red (contención)
nmcli networking off
# Restaurar el PMS desde la copia offline verificada
restic -r /mnt/backup-offline restore latest --target /srv/pms
```

### 🕵️ Escenario D — Fuga de datos detectada (brecha confirmada)
1. **Contener:** cerrar la vulnerabilidad explotada y **rotar todas las credenciales** expuestas.
2. **Evaluar el alcance:** qué datos y cuántos huéspedes; preservar evidencia (logs).
3. **Notificar** según la **Ley 19.628** (a la autoridad y a los afectados) y comunicar con transparencia.

```bash
grep "POST /login" /var/log/portal/access.log | tail -50   # rastrear actividad anómala
# Forzar cambio de contraseñas y revocar sesiones/tokens activos
```

---

## Conclusión de la sección

Con la arquitectura de alta disponibilidad, los objetivos **RTO/RPO** diferenciados, la regla
**3-2-1** con copias inmutables, el **protocolo NIST** y el **runbook**, Hotel Costa Brava pasa de
solo *detectar* problemas a poder **recuperarse** de ellos de forma ordenada. Esto cierra el ciclo
de la auditoría —prevención, mitigación y recuperación— y completa el Informe B.
