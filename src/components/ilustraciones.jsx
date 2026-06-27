/*
 * Ilustraciones SVG propias (creadas a mano, sin dependencias ni licencias externas).
 * Estilo plano y amable, en la paleta teal del sitio, pensadas para un público no técnico.
 * Son puramente decorativas (presentación): no contienen contenido evaluable.
 */

/* Inyección SQL: base de datos cuyos registros se fugan */
export function ArteSQL({ className = '' }) {
  return (
    <svg viewBox="0 0 220 150" className={className} role="img" aria-label="Base de datos con registros fugándose">
      {/* Cilindro de base de datos */}
      <g>
        <ellipse cx="70" cy="40" rx="42" ry="14" fill="#fb923c" />
        <path d="M28 40 V110 a42 14 0 0 0 84 0 V40" fill="#f97316" />
        <ellipse cx="70" cy="40" rx="42" ry="14" fill="#fdba74" />
        <path d="M28 63 a42 14 0 0 0 84 0" fill="none" stroke="#fff" strokeWidth="3" opacity="0.7" />
        <path d="M28 86 a42 14 0 0 0 84 0" fill="none" stroke="#fff" strokeWidth="3" opacity="0.7" />
      </g>
      {/* Registros fugándose */}
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${140 + i * 4}, ${44 + i * 28})`}>
          <rect width="58" height="20" rx="4" fill="#fff" stroke="#fdba74" strokeWidth="2" />
          <circle cx="12" cy="10" r="5" fill="#fb923c" />
          <rect x="22" y="6" width="30" height="3.5" rx="1.75" fill="#fed7aa" />
          <rect x="22" y="12" width="20" height="3.5" rx="1.75" fill="#fed7aa" />
        </g>
      ))}
    </svg>
  )
}

/* XSS: ventana de navegador con un script y un popup de alerta */
export function ArteXSS({ className = '' }) {
  return (
    <svg viewBox="0 0 220 150" className={className} role="img" aria-label="Navegador ejecutando un script con un popup de alerta">
      <rect x="20" y="22" width="180" height="110" rx="10" fill="#fff" stroke="#fcd34d" strokeWidth="3" />
      <rect x="20" y="22" width="180" height="22" rx="10" fill="#fde68a" />
      <circle cx="34" cy="33" r="3.5" fill="#f59e0b" />
      <circle cx="46" cy="33" r="3.5" fill="#fbbf24" />
      <circle cx="58" cy="33" r="3.5" fill="#fcd34d" />
      {/* etiqueta script */}
      <text x="40" y="74" fontFamily="monospace" fontSize="15" fontWeight="700" fill="#a16207">&lt;script&gt;</text>
      {/* popup de alerta */}
      <g transform="translate(96,78)">
        <rect width="92" height="46" rx="6" fill="#fffbeb" stroke="#f59e0b" strokeWidth="2.5" />
        <path d="M46 8 L56 26 H36 Z" fill="#f59e0b" />
        <rect x="44.5" y="14" width="3" height="7" rx="1.5" fill="#fff" />
        <circle cx="46" cy="23.5" r="1.6" fill="#fff" />
        <rect x="30" y="32" width="32" height="9" rx="4.5" fill="#f59e0b" />
      </g>
    </svg>
  )
}

/* Inyección de comandos: servidor/terminal con prompt y alerta */
export function ArteComandos({ className = '' }) {
  return (
    <svg viewBox="0 0 220 150" className={className} role="img" aria-label="Terminal del servidor ejecutando comandos">
      {/* Terminal */}
      <rect x="24" y="26" width="150" height="100" rx="10" fill="#3b0764" />
      <rect x="24" y="26" width="150" height="20" rx="10" fill="#581c87" />
      <circle cx="38" cy="36" r="3.5" fill="#c084fc" />
      <circle cx="50" cy="36" r="3.5" fill="#d8b4fe" />
      <text x="38" y="74" fontFamily="monospace" fontSize="13" fill="#e9d5ff">$ ping ...</text>
      <text x="38" y="96" fontFamily="monospace" fontSize="13" fontWeight="700" fill="#f0abfc">; cat /etc/</text>
      <rect x="38" y="104" width="10" height="12" fill="#f0abfc" />
      {/* Insignia de alerta */}
      <g transform="translate(150,86)">
        <circle cx="22" cy="22" r="22" fill="#a21caf" />
        <rect x="20" y="10" width="4" height="16" rx="2" fill="#fff" />
        <circle cx="22" cy="32" r="2.4" fill="#fff" />
      </g>
    </svg>
  )
}

/* Activos: cajas/inventario apiladas protegidas por un escudo */
export function ArteActivos({ className = '' }) {
  return (
    <svg viewBox="0 0 220 150" className={className} role="img" aria-label="Inventario de activos protegido por un escudo">
      {/* Cajas apiladas (los activos) */}
      <g>
        <rect x="24" y="86" width="48" height="44" rx="6" fill="#34d399" />
        <rect x="24" y="86" width="48" height="12" rx="6" fill="#6ee7b7" />
        <rect x="44" y="92" width="8" height="20" rx="2" fill="#a7f3d0" />

        <rect x="78" y="64" width="48" height="66" rx="6" fill="#10b981" />
        <rect x="78" y="64" width="48" height="12" rx="6" fill="#6ee7b7" />
        <rect x="98" y="70" width="8" height="20" rx="2" fill="#a7f3d0" />

        <rect x="132" y="100" width="44" height="30" rx="6" fill="#059669" />
        <rect x="132" y="100" width="44" height="11" rx="6" fill="#6ee7b7" />
        <rect x="150" y="105" width="8" height="16" rx="2" fill="#a7f3d0" />
      </g>
      {/* Escudo de protección */}
      <g transform="translate(150,18)">
        <path
          d="M28 2 C28 2 44 8 56 8 C56 8 57 40 44 55 C37 63 29 67 28 68 C27 67 19 63 12 55 C-1 40 0 8 0 8 C12 8 28 2 28 2 Z"
          fill="#0d9488"
        />
        <path d="M17 34 L25 42 L40 24" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  )
}

/* Matriz de riesgo: mini mapa de calor 3x3 (verde→rojo en la diagonal) */
export function ArteMatriz({ className = '' }) {
  const colores = [
    ['#86efac', '#fde047', '#fb923c'],
    ['#fde047', '#fb923c', '#ef4444'],
    ['#fb923c', '#ef4444', '#dc2626'],
  ]
  return (
    <svg viewBox="0 0 220 150" className={className} role="img" aria-label="Mapa de calor de riesgo en cuadrícula">
      {/* Ejes */}
      <line x1="40" y1="20" x2="40" y2="128" stroke="#0e7490" strokeWidth="3" strokeLinecap="round" />
      <line x1="40" y1="128" x2="200" y2="128" stroke="#0e7490" strokeWidth="3" strokeLinecap="round" />
      {/* Cuadrícula 3x3 */}
      {colores.map((fila, r) =>
        fila.map((c, col) => (
          <rect
            key={`${r}-${col}`}
            x={50 + col * 46}
            y={22 + r * 34}
            width="42"
            height="30"
            rx="5"
            fill={c}
          />
        )),
      )}
      {/* Marcador del riesgo crítico (esquina superior derecha) */}
      <circle cx="177" cy="37" r="9" fill="#fff" stroke="#dc2626" strokeWidth="3" />
      <rect x="175.5" y="31" width="3" height="7" rx="1.5" fill="#dc2626" />
      <circle cx="177" cy="41.5" r="1.6" fill="#dc2626" />
    </svg>
  )
}

/* Controles: candado + engranaje (defensa técnica y operacional) */
export function ArteControles({ className = '' }) {
  return (
    <svg viewBox="0 0 220 150" className={className} role="img" aria-label="Candado de seguridad con engranaje de operación">
      {/* Engranaje de fondo (SecOps) */}
      <g transform="translate(150,40)" fill="#c7d2fe">
        <circle cx="22" cy="22" r="14" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
          <rect key={a} x="19" y="-2" width="6" height="12" rx="2" transform={`rotate(${a} 22 22)`} />
        ))}
        <circle cx="22" cy="22" r="7" fill="#eef2ff" />
      </g>
      {/* Candado */}
      <g>
        <path d="M58 70 v-12 a26 26 0 0 1 52 0 v12" fill="none" stroke="#6366f1" strokeWidth="9" />
        <rect x="40" y="68" width="88" height="62" rx="12" fill="#6366f1" />
        <rect x="40" y="68" width="88" height="62" rx="12" fill="#818cf8" opacity="0.35" />
        {/* Ojo de cerradura */}
        <circle cx="84" cy="92" r="9" fill="#eef2ff" />
        <rect x="81" y="96" width="6" height="16" rx="3" fill="#eef2ff" />
      </g>
    </svg>
  )
}

/* Hero de la portada: un hotel protegido por un escudo (auditoría de seguridad) */
export function HeroHotelSeguro({ className = '' }) {
  return (
    <svg viewBox="0 0 420 300" className={className} role="img" aria-label="Hotel protegido por un escudo de seguridad">
      {/* Fondo redondeado */}
      <rect x="10" y="20" width="400" height="240" rx="24" fill="#f0fdfa" />
      <circle cx="340" cy="70" r="34" fill="#ccfbf1" />
      <circle cx="70" cy="220" r="22" fill="#ccfbf1" />

      {/* Suelo */}
      <rect x="40" y="232" width="280" height="8" rx="4" fill="#99f6e4" />

      {/* Edificio del hotel */}
      <rect x="90" y="92" width="150" height="148" rx="10" fill="#0d9488" />
      <rect x="90" y="92" width="150" height="26" rx="10" fill="#0f766e" />
      {/* Letrero */}
      <rect x="128" y="98" width="74" height="14" rx="7" fill="#f0fdfa" />
      <rect x="138" y="102" width="54" height="6" rx="3" fill="#0d9488" />
      {/* Ventanas */}
      {[0, 1, 2].map((r) =>
        [0, 1, 2].map((c) => (
          <rect key={`${r}-${c}`} x={106 + c * 42} y={130 + r * 32} width="26" height="22" rx="4" fill="#5eead4" />
        )),
      )}
      {/* Puerta */}
      <rect x="148" y="206" width="34" height="34" rx="6" fill="#0f766e" />
      <circle cx="174" cy="224" r="2.5" fill="#5eead4" />

      {/* Escudo de seguridad al frente */}
      <g transform="translate(232,150)">
        <path
          d="M44 4 C44 4 70 14 88 14 C88 14 90 60 70 84 C58 98 46 104 44 105 C42 104 30 98 18 84 C-2 60 0 14 0 14 C18 14 44 4 44 4 Z"
          fill="#f59e0b"
        />
        <path
          d="M44 14 C44 14 64 21 78 21 C78 21 80 56 64 75 C55 86 46 90 44 91 Z"
          fill="#fbbf24"
        />
        {/* Check */}
        <path d="M28 52 L40 64 L62 38" fill="none" stroke="#fff" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  )
}
