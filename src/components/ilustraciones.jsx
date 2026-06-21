/*
 * Ilustraciones SVG propias (creadas a mano, sin dependencias ni licencias externas).
 * Estilo plano y amable, en la paleta teal del sitio, pensadas para un público no técnico.
 * Son puramente decorativas (presentación): no contienen contenido evaluable.
 */

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
