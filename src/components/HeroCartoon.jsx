import { Guardian } from './mascota'

/*
 * Escena de portada caricaturesca y animada (solo presentación): el Hotel Costa
 * Brava con "carita", nubes que flotan, un sol y destellos, y Bruno —el
 * botones-guardián— saludando al frente con su escudo. Reemplaza al antiguo
 * detalle 3D (three.js); al ser SVG ligero no carga ninguna librería pesada.
 *
 * Las animaciones viven como @keyframes en index.css y se desactivan con
 * prefers-reduced-motion (queda una bonita escena estática).
 */
export default function HeroCartoon({ className = '' }) {
  return (
    <div className={`relative ${className}`} aria-hidden="false">
      <svg viewBox="0 0 420 320" className="w-full" role="img" aria-label="El Hotel Costa Brava protegido, con su botones-guardián saludando">
        <defs>
          <linearGradient id="cieloHero" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e0f7fa" />
            <stop offset="100%" stopColor="#eef0fe" />
          </linearGradient>
          <linearGradient id="edificioHero" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#14b8a6" />
            <stop offset="100%" stopColor="#0d9488" />
          </linearGradient>
        </defs>

        {/* Cielo */}
        <rect x="6" y="10" width="408" height="300" rx="28" fill="url(#cieloHero)" />

        {/* Sol con rayos */}
        <g className="destello" style={{ transformOrigin: '350px 64px' }}>
          {[0, 45, 90, 135].map((a) => (
            <rect key={a} x="348" y="40" width="4" height="48" rx="2" fill="#fcd34d" transform={`rotate(${a} 350 64)`} />
          ))}
        </g>
        <circle cx="350" cy="64" r="20" fill="#fbbf24" />
        <circle cx="350" cy="64" r="20" fill="#fde68a" opacity="0.5" />

        {/* Nubes que flotan */}
        <g className="nube-1" fill="#ffffff">
          <ellipse cx="92" cy="58" rx="26" ry="15" />
          <ellipse cx="114" cy="58" rx="20" ry="13" />
          <ellipse cx="74" cy="62" rx="16" ry="11" />
        </g>
        <g className="nube-2" fill="#ffffff" opacity="0.9">
          <ellipse cx="250" cy="40" rx="20" ry="12" />
          <ellipse cx="268" cy="40" rx="15" ry="10" />
        </g>

        {/* Destellos (estrellitas de seguridad) */}
        {[[40, 150], [300, 120], [380, 180]].map(([x, y], i) => (
          <g key={i} className="destello" style={{ transformOrigin: `${x}px ${y}px`, animationDelay: `${i * 0.6}s` }}>
            <path d={`M${x} ${y - 7} L${x + 2} ${y - 2} L${x + 7} ${y} L${x + 2} ${y + 2} L${x} ${y + 7} L${x - 2} ${y + 2} L${x - 7} ${y} L${x - 2} ${y - 2} Z`} fill="#7c84ff" opacity="0.7" />
          </g>
        ))}

        {/* Suelo */}
        <rect x="40" y="270" width="340" height="10" rx="5" fill="#99f6e4" />
        {/* Arbustos */}
        <circle cx="316" cy="268" r="14" fill="#34d399" />
        <circle cx="330" cy="270" r="11" fill="#10b981" />

        {/* Edificio del hotel con carita */}
        <g>
          <rect x="150" y="120" width="170" height="156" rx="14" fill="url(#edificioHero)" />
          {/* Toldo (cejas) */}
          <path d="M150 132 H320 V120 Q320 120 150 120 Z" fill="#0f766e" />
          {/* Letrero */}
          <rect x="200" y="126" width="70" height="16" rx="8" fill="#f0fdfa" />
          <rect x="212" y="131" width="46" height="6" rx="3" fill="#0d9488" />

          {/* Ojos = ventanas superiores (parpadean) */}
          <g className="parpadeo-lento" style={{ transformOrigin: '188px 172px' }}>
            <rect x="172" y="158" width="32" height="30" rx="6" fill="#ccfbf1" />
            <circle cx="188" cy="174" r="6.5" fill="#0f766e" />
            <circle cx="190" cy="172" r="2" fill="#ecfeff" />
          </g>
          <g className="parpadeo-lento" style={{ transformOrigin: '282px 172px', animationDelay: '0.15s' }}>
            <rect x="266" y="158" width="32" height="30" rx="6" fill="#ccfbf1" />
            <circle cx="282" cy="174" r="6.5" fill="#0f766e" />
            <circle cx="284" cy="172" r="2" fill="#ecfeff" />
          </g>
          {/* Mejillas */}
          <circle cx="168" cy="200" r="7" fill="#fb7185" opacity="0.45" />
          <circle cx="302" cy="200" r="7" fill="#fb7185" opacity="0.45" />

          {/* Boca = puerta sonriente */}
          <path d="M210 276 V232 Q210 214 235 214 Q260 214 260 232 V276 Z" fill="#0f766e" />
          <path d="M222 232 Q235 226 248 232" fill="none" stroke="#5eead4" strokeWidth="3" strokeLinecap="round" />
          <circle cx="252" cy="248" r="2.6" fill="#5eead4" />
        </g>

        {/* Escudo flotante de "auditoría" sobre el hotel */}
        <g className="mascota-flota" style={{ transformOrigin: '330px 110px' }}>
          <path d="M330 86 C330 86 342 90 348 90 C348 90 349 106 340 115 C335 119 331 121 330 121 C329 121 325 119 320 115 C311 106 312 90 312 90 C318 90 330 86 330 86 Z" fill="#f59e0b" />
          <path d="M323 102 L328 107 L338 96" fill="none" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>

      {/* Bruno, el botones-guardián, al frente */}
      <Guardian className="mascota-flota absolute bottom-0 left-2 w-[34%] max-w-[150px] drop-shadow-md sm:left-6" />
    </div>
  )
}
