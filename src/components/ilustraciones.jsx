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
