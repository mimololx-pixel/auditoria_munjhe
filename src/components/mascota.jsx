/*
 * Mascota del sitio: "Bruno", el botones-guardián del Hotel Costa Brava.
 * Une el tema hotelero (botones/bellboy) con la seguridad (escudo). Es el hilo
 * conductor caricaturesco que aparece en la portada y en las ilustraciones de
 * sección. SVG propio, sin dependencias. Puramente decorativo (presentación).
 *
 * Las animaciones (saludo, parpadeo, flotar) se definen como @keyframes en
 * index.css y se desactivan solas con prefers-reduced-motion.
 */
export function Guardian({ className = '', saluda = true }) {
  return (
    <svg viewBox="0 0 120 156" className={className} role="img" aria-label="Bruno, el botones-guardián del hotel, sosteniendo un escudo">
      {/* Sombra en el piso */}
      <ellipse cx="60" cy="150" rx="34" ry="5" fill="#0d9488" opacity="0.18" />

      {/* Brazo que saluda (detrás del cuerpo, levantado) */}
      <g className={saluda ? 'mascota-saluda' : ''}>
        <rect x="18" y="64" width="14" height="34" rx="7" fill="#14b8a6" transform="rotate(28 25 80)" />
        <circle cx="20" cy="58" r="8.5" fill="#ffd2a6" />
      </g>

      {/* Cuerpo / uniforme */}
      <path d="M34 96 Q34 80 50 79 H70 Q86 80 86 96 V132 Q86 138 80 138 H40 Q34 138 34 132 Z" fill="#0d9488" />
      {/* Solapas */}
      <path d="M50 79 L60 96 L48 104 Z" fill="#14b8a6" />
      <path d="M70 79 L60 96 L72 104 Z" fill="#14b8a6" />
      {/* Botones dorados */}
      <circle cx="60" cy="100" r="2.6" fill="#fcd34d" />
      <circle cx="60" cy="110" r="2.6" fill="#fcd34d" />
      <circle cx="60" cy="120" r="2.6" fill="#fcd34d" />

      {/* Pajarita */}
      <path d="M60 80 L51 75 L51 85 Z" fill="#ef4444" />
      <path d="M60 80 L69 75 L69 85 Z" fill="#ef4444" />
      <circle cx="60" cy="80" r="2.4" fill="#b91c1c" />

      {/* Cabeza */}
      <circle cx="34" cy="56" r="4.5" fill="#f2b888" />
      <circle cx="86" cy="56" r="4.5" fill="#f2b888" />
      <circle cx="60" cy="54" r="25" fill="#ffd2a6" />

      {/* Cara: ojos (parpadean), cejas, mejillas y sonrisa */}
      <g className="mascota-parpadea" style={{ transformOrigin: '60px 52px' }}>
        <circle cx="51" cy="52" r="3.4" fill="#3b2a1a" />
        <circle cx="69" cy="52" r="3.4" fill="#3b2a1a" />
        <circle cx="52.2" cy="50.8" r="1.1" fill="#fff" />
        <circle cx="70.2" cy="50.8" r="1.1" fill="#fff" />
      </g>
      <path d="M46 44 Q51 41 56 44" fill="none" stroke="#3b2a1a" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M64 44 Q69 41 74 44" fill="none" stroke="#3b2a1a" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="45" cy="60" r="4" fill="#fb7185" opacity="0.5" />
      <circle cx="75" cy="60" r="4" fill="#fb7185" opacity="0.5" />
      <path d="M52 62 Q60 69 68 62" fill="none" stroke="#3b2a1a" strokeWidth="2.2" strokeLinecap="round" />

      {/* Gorro de botones (pillbox) */}
      <ellipse cx="60" cy="34" rx="24" ry="6" fill="#4348c9" />
      <path d="M38 34 Q38 18 60 18 Q82 18 82 34 Z" fill="#5863f8" />
      <rect x="37" y="32" width="46" height="7" rx="3.5" fill="#f59e0b" />
      <ellipse cx="60" cy="18.5" rx="7" ry="3" fill="#7c84ff" />

      {/* Escudo que sostiene al frente */}
      <g>
        <path d="M86 96 C86 96 102 100 110 100 C110 100 111 122 99 134 C93 140 87 142 86 143 C85 142 79 140 73 134 C61 122 62 100 62 100 C70 100 86 96 86 96 Z"
              fill="#16bac5" />
        <path d="M86 103 C86 103 98 106 106 106 C106 106 107 121 98 130 C92 136 87 138 86 139 Z" fill="#5fd6de" />
        <path d="M76 118 L84 126 L98 109" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      {/* Brazo que sostiene el escudo */}
      <rect x="76" y="92" width="13" height="22" rx="6.5" fill="#14b8a6" />
      <circle cx="82" cy="112" r="7.5" fill="#ffd2a6" />
    </svg>
  )
}
