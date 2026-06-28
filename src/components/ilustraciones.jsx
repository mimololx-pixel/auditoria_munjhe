/*
 * Ilustraciones SVG propias (creadas a mano, sin dependencias ni licencias externas).
 * Estilo caricaturesco y amable: personajes con cara, en la paleta del sitio, en
 * sintonía con la mascota "Bruno" (el botones-guardián). Son puramente decorativas
 * (presentación): no contienen contenido evaluable.
 */

/* Guardián en miniatura (eco de Bruno) reutilizado en varias escenas. */
function MiniGuardia({ x = 0, y = 0, s = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx="24" cy="69" rx="18" ry="3.5" fill="#0d9488" opacity="0.18" />
      {/* cuerpo */}
      <path d="M8 64 Q8 40 24 40 Q40 40 40 64 Q40 68 36 68 H12 Q8 68 8 64 Z" fill="#0d9488" />
      <circle cx="24" cy="52" r="1.7" fill="#fcd34d" />
      <circle cx="24" cy="58" r="1.7" fill="#fcd34d" />
      {/* cabeza */}
      <circle cx="24" cy="28" r="15" fill="#ffd2a6" />
      {/* gorro */}
      <ellipse cx="24" cy="15" rx="15" ry="4" fill="#4348c9" />
      <path d="M11 15 Q11 4 24 4 Q37 4 37 15 Z" fill="#5863f8" />
      <rect x="10" y="12.5" width="28" height="4.5" rx="2.25" fill="#f59e0b" />
      {/* cara */}
      <circle cx="19" cy="28" r="2.2" fill="#3b2a1a" />
      <circle cx="29" cy="28" r="2.2" fill="#3b2a1a" />
      <path d="M19 33 Q24 37 29 33" stroke="#3b2a1a" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <circle cx="16" cy="32" r="2.3" fill="#fb7185" opacity="0.5" />
      <circle cx="32" cy="32" r="2.3" fill="#fb7185" opacity="0.5" />
    </g>
  )
}

/* Inyección SQL: una base de datos asustada mientras sus fichas escapan */
export function ArteSQL({ className = '' }) {
  return (
    <svg viewBox="0 0 220 150" className={className} role="img" aria-label="Una base de datos asustada mientras sus fichas escapan">
      {/* Base de datos con cara de susto */}
      <g>
        <ellipse cx="62" cy="46" rx="38" ry="13" fill="#fdba74" />
        <path d="M24 46 V104 a38 13 0 0 0 76 0 V46" fill="#f97316" />
        <ellipse cx="62" cy="46" rx="38" ry="13" fill="#fdba74" />
        <path d="M24 70 a38 13 0 0 0 76 0" fill="none" stroke="#fff" strokeWidth="2.5" opacity="0.55" />
        <circle cx="50" cy="86" r="4" fill="#7c2d12" />
        <circle cx="74" cy="86" r="4" fill="#7c2d12" />
        <circle cx="51.4" cy="84.6" r="1.2" fill="#fff" />
        <circle cx="75.4" cy="84.6" r="1.2" fill="#fff" />
        <ellipse cx="62" cy="98" rx="5.5" ry="4.5" fill="#7c2d12" />
        {/* gotita de sudor */}
        <path d="M96 74 q5 7 0 11 q-5 -4 0 -11 Z" fill="#7dd3fc" />
      </g>
      {/* Fichas huyendo con carita y piernitas */}
      {[0, 1].map((i) => (
        <g key={i} transform={`translate(${134 + i * 4}, ${48 + i * 42})`}>
          <rect width="62" height="30" rx="6" fill="#fff" stroke="#fdba74" strokeWidth="2" />
          <circle cx="14" cy="12" r="6" fill="#fb923c" />
          <circle cx="12" cy="11" r="1" fill="#7c2d12" />
          <circle cx="16" cy="11" r="1" fill="#7c2d12" />
          <rect x="26" y="9" width="28" height="3.5" rx="1.75" fill="#fed7aa" />
          <rect x="26" y="16" width="18" height="3.5" rx="1.75" fill="#fed7aa" />
          <rect x="18" y="30" width="4" height="8" rx="2" fill="#fb923c" />
          <rect x="40" y="30" width="4" height="8" rx="2" fill="#fb923c" />
        </g>
      ))}
      {/* Líneas de movimiento */}
      <path d="M118 60 h12 M116 70 h16" stroke="#fdba74" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

/* XSS: un navegador inocente y un popup "travieso" que se cuela */
export function ArteXSS({ className = '' }) {
  return (
    <svg viewBox="0 0 220 150" className={className} role="img" aria-label="Un navegador con un popup travieso de alerta">
      <rect x="14" y="24" width="150" height="104" rx="10" fill="#fff" stroke="#fcd34d" strokeWidth="3" />
      <rect x="14" y="24" width="150" height="20" rx="10" fill="#fde68a" />
      <circle cx="26" cy="34" r="3" fill="#f59e0b" />
      <circle cx="36" cy="34" r="3" fill="#fbbf24" />
      <circle cx="46" cy="34" r="3" fill="#fcd34d" />
      {/* Carita inocente de la página */}
      <circle cx="60" cy="74" r="4" fill="#a16207" />
      <circle cx="92" cy="74" r="4" fill="#a16207" />
      <circle cx="61.4" cy="72.6" r="1.2" fill="#fff" />
      <circle cx="93.4" cy="72.6" r="1.2" fill="#fff" />
      <path d="M60 90 q16 9 32 0" stroke="#a16207" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <circle cx="52" cy="84" r="4" fill="#fb7185" opacity="0.4" />
      <circle cx="100" cy="84" r="4" fill="#fb7185" opacity="0.4" />
      {/* Popup villano con sonrisa pícara */}
      <g transform="translate(116,72)">
        <rect width="88" height="58" rx="8" fill="#fffbeb" stroke="#f59e0b" strokeWidth="2.5" />
        <path d="M24 8 l-6 -9 l11 4 Z" fill="#ef4444" />
        <path d="M64 8 l6 -9 l-11 4 Z" fill="#ef4444" />
        <circle cx="32" cy="24" r="4.2" fill="#b91c1c" />
        <circle cx="56" cy="24" r="4.2" fill="#b91c1c" />
        <path d="M26 17 l11 4 M62 17 l-11 4" stroke="#b91c1c" strokeWidth="2" strokeLinecap="round" />
        <path d="M30 38 q14 11 28 0 Z" fill="#b91c1c" />
        <path d="M30 38 h28" stroke="#fff" strokeWidth="1.5" />
      </g>
    </svg>
  )
}

/* Inyección de comandos: un servidor/terminal y un bichito travieso */
export function ArteComandos({ className = '' }) {
  return (
    <svg viewBox="0 0 220 150" className={className} role="img" aria-label="Una terminal de servidor y un bichito travieso colándose">
      {/* Terminal */}
      <rect x="18" y="26" width="142" height="100" rx="10" fill="#3b0764" />
      <rect x="18" y="26" width="142" height="18" rx="10" fill="#581c87" />
      <circle cx="30" cy="35" r="3" fill="#c084fc" />
      <circle cx="40" cy="35" r="3" fill="#d8b4fe" />
      <text x="30" y="64" fontFamily="monospace" fontSize="12" fill="#e9d5ff">$ ping</text>
      <text x="30" y="82" fontFamily="monospace" fontSize="12" fontWeight="700" fill="#f0abfc">; cat /etc</text>
      <rect x="30" y="90" width="9" height="11" fill="#f0abfc" />
      {/* Carita de la terminal */}
      <circle cx="116" cy="106" r="3.4" fill="#f0abfc" />
      <circle cx="138" cy="106" r="3.4" fill="#f0abfc" />
      <path d="M114 114 q13 6 26 0" stroke="#f0abfc" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Bichito villano */}
      <g transform="translate(150,78)">
        {[14, 24, 34].map((cy) => (
          <g key={cy} stroke="#a21caf" strokeWidth="2.5" strokeLinecap="round">
            <path d={`M6 ${cy} l-9 -3`} />
            <path d={`M38 ${cy} l9 -3`} />
          </g>
        ))}
        <ellipse cx="22" cy="26" rx="20" ry="16" fill="#a21caf" />
        <ellipse cx="22" cy="26" rx="8" ry="14" fill="#86198f" />
        <path d="M14 8 q-4 -9 -10 -9 M30 8 q4 -9 10 -9" stroke="#a21caf" strokeWidth="2" fill="none" strokeLinecap="round" />
        <circle cx="15" cy="18" r="4.5" fill="#fff" />
        <circle cx="29" cy="18" r="4.5" fill="#fff" />
        <circle cx="16" cy="19" r="2.2" fill="#3b0764" />
        <circle cx="30" cy="19" r="2.2" fill="#3b0764" />
        <path d="M14 32 q8 5 16 0" stroke="#3b0764" strokeWidth="2" fill="none" strokeLinecap="round" />
      </g>
    </svg>
  )
}

/* Activos: cofres de datos felices protegidos por el guardián */
export function ArteActivos({ className = '' }) {
  return (
    <svg viewBox="0 0 220 150" className={className} role="img" aria-label="Cofres de datos felices protegidos por el guardián">
      {/* Cofre grande */}
      <g transform="translate(18,66)">
        <rect x="0" y="16" width="74" height="52" rx="8" fill="#10b981" />
        <path d="M0 26 Q0 6 37 6 Q74 6 74 26 Z" fill="#34d399" />
        <rect x="0" y="24" width="74" height="8" fill="#059669" />
        <rect x="31" y="26" width="12" height="16" rx="3" fill="#fcd34d" />
        <circle cx="26" cy="46" r="3.6" fill="#065f46" />
        <circle cx="48" cy="46" r="3.6" fill="#065f46" />
        <path d="M26 54 q11 7 22 0" stroke="#065f46" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      </g>
      {/* Cofre pequeño */}
      <g transform="translate(80,96)">
        <rect x="0" y="12" width="52" height="38" rx="7" fill="#059669" />
        <path d="M0 20 Q0 4 26 4 Q52 4 52 20 Z" fill="#34d399" />
        <rect x="0" y="18" width="52" height="6" fill="#047857" />
        <rect x="22" y="20" width="8" height="11" rx="2.5" fill="#fcd34d" />
        <circle cx="19" cy="36" r="2.8" fill="#065f46" />
        <circle cx="33" cy="36" r="2.8" fill="#065f46" />
        <path d="M19 42 q7 5 14 0" stroke="#065f46" strokeWidth="2" fill="none" strokeLinecap="round" />
      </g>
      {/* Guardián cuidando */}
      <MiniGuardia x="150" y="56" s="1.1" />
    </svg>
  )
}

/* Matriz de riesgo: mini mapa de calor con el guardián señalando la zona crítica */
export function ArteMatriz({ className = '' }) {
  const colores = [
    ['#86efac', '#fde047', '#fb923c'],
    ['#fde047', '#fb923c', '#ef4444'],
    ['#fb923c', '#ef4444', '#dc2626'],
  ]
  return (
    <svg viewBox="0 0 220 150" className={className} role="img" aria-label="Mapa de calor de riesgo con el guardián señalando la zona crítica">
      <line x1="22" y1="16" x2="22" y2="124" stroke="#0e7490" strokeWidth="3" strokeLinecap="round" />
      <line x1="22" y1="124" x2="150" y2="124" stroke="#0e7490" strokeWidth="3" strokeLinecap="round" />
      {colores.map((fila, r) =>
        fila.map((c, col) => (
          <rect key={`${r}-${col}`} x={30 + col * 38} y={18 + r * 34} width="34" height="30" rx="5" fill={c} />
        )),
      )}
      {/* Carita alarmada en la celda más crítica */}
      <circle cx="116" cy="92" r="2.4" fill="#7f1d1d" />
      <circle cx="124" cy="92" r="2.4" fill="#7f1d1d" />
      <ellipse cx="120" cy="100" rx="3" ry="2.6" fill="#7f1d1d" />
      {/* Guardián que señala */}
      <MiniGuardia x="156" y="54" s="1.05" />
      <path d="M152 70 q-10 6 -18 12" stroke="#0d9488" strokeWidth="3" fill="none" strokeLinecap="round" />
      <circle cx="134" cy="82" r="3.5" fill="#ffd2a6" />
    </svg>
  )
}

/* Controles: el guardián cuida un gran candado feliz, con engranaje de SecOps */
export function ArteControles({ className = '' }) {
  return (
    <svg viewBox="0 0 220 150" className={className} role="img" aria-label="El guardián cuida un gran candado, con un engranaje de operación">
      {/* Engranaje de fondo */}
      <g transform="translate(150,30)" fill="#c7d2fe">
        <circle cx="22" cy="22" r="13" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
          <rect key={a} x="19" y="0" width="6" height="11" rx="2" transform={`rotate(${a} 22 22)`} />
        ))}
        <circle cx="22" cy="22" r="6.5" fill="#eef2ff" />
      </g>
      {/* Candado con cara feliz */}
      <g transform="translate(28,40)">
        <path d="M22 36 v-12 a24 24 0 0 1 48 0 v12" fill="none" stroke="#6366f1" strokeWidth="9" />
        <rect x="6" y="34" width="80" height="58" rx="12" fill="#6366f1" />
        <rect x="6" y="34" width="80" height="58" rx="12" fill="#818cf8" opacity="0.3" />
        <circle cx="34" cy="58" r="4" fill="#eef2ff" />
        <circle cx="58" cy="58" r="4" fill="#eef2ff" />
        <circle cx="35.2" cy="56.8" r="1.2" fill="#4f46e5" />
        <circle cx="59.2" cy="56.8" r="1.2" fill="#4f46e5" />
        <path d="M34 70 q12 9 24 0" stroke="#eef2ff" strokeWidth="3" fill="none" strokeLinecap="round" />
        <circle cx="26" cy="66" r="3.5" fill="#c7d2fe" opacity="0.6" />
        <circle cx="66" cy="66" r="3.5" fill="#c7d2fe" opacity="0.6" />
      </g>
      {/* Guardián al lado */}
      <MiniGuardia x="158" y="60" s="1.0" />
    </svg>
  )
}

/* Recuperación: el guardián socorrista rescata un dato con el salvavidas */
export function ArteRecuperacion({ className = '' }) {
  return (
    <svg viewBox="0 0 220 150" className={className} role="img" aria-label="El guardián socorrista rescata un dato con un salvavidas">
      {/* Olas */}
      <path d="M0 120 q20 -10 40 0 t40 0 t40 0 t40 0 t40 0 V150 H0 Z" fill="#bfdbfe" opacity="0.6" />
      {/* Salvavidas */}
      <g transform="translate(58,72)">
        <circle r="40" fill="#2563eb" />
        <circle r="40" fill="#60a5fa" opacity="0.35" />
        <circle r="21" fill="#eff6ff" />
        {[0, 90, 180, 270].map((a) => (
          <rect key={a} x="-5" y="-40" width="10" height="19" rx="3" fill="#eff6ff" transform={`rotate(${a})`} />
        ))}
        {/* Dato rescatado con carita feliz */}
        <g>
          <rect x="-13" y="-12" width="26" height="24" rx="5" fill="#fff" stroke="#93c5fd" strokeWidth="2" />
          <circle cx="-5" cy="-2" r="2.4" fill="#1d4ed8" />
          <circle cx="5" cy="-2" r="2.4" fill="#1d4ed8" />
          <path d="M-6 5 q6 5 12 0" stroke="#1d4ed8" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        </g>
      </g>
      {/* Flecha de restauración */}
      <g transform="translate(108,18)" fill="none" stroke="#1d4ed8" strokeWidth="5" strokeLinecap="round">
        <path d="M30 18 a15 15 0 1 1 -5 -11" />
        <path d="M25 2 L28 12 L17 11" strokeLinejoin="round" />
      </g>
      {/* Guardián socorrista */}
      <MiniGuardia x="158" y="62" s="1.0" />
    </svg>
  )
}

/* Hero de respaldo (legado): un hotel protegido por un escudo. */
export function HeroHotelSeguro({ className = '' }) {
  return (
    <svg viewBox="0 0 420 300" className={className} role="img" aria-label="Hotel protegido por un escudo de seguridad">
      <rect x="10" y="20" width="400" height="240" rx="24" fill="#f0fdfa" />
      <circle cx="340" cy="70" r="34" fill="#ccfbf1" />
      <circle cx="70" cy="220" r="22" fill="#ccfbf1" />
      <rect x="40" y="232" width="280" height="8" rx="4" fill="#99f6e4" />
      <rect x="90" y="92" width="150" height="148" rx="10" fill="#0d9488" />
      <rect x="90" y="92" width="150" height="26" rx="10" fill="#0f766e" />
      <rect x="128" y="98" width="74" height="14" rx="7" fill="#f0fdfa" />
      <rect x="138" y="102" width="54" height="6" rx="3" fill="#0d9488" />
      {[0, 1, 2].map((r) =>
        [0, 1, 2].map((c) => (
          <rect key={`${r}-${c}`} x={106 + c * 42} y={130 + r * 32} width="26" height="22" rx="4" fill="#5eead4" />
        )),
      )}
      <rect x="148" y="206" width="34" height="34" rx="6" fill="#0f766e" />
      <circle cx="174" cy="224" r="2.5" fill="#5eead4" />
      <g transform="translate(232,150)">
        <path d="M44 4 C44 4 70 14 88 14 C88 14 90 60 70 84 C58 98 46 104 44 105 C42 104 30 98 18 84 C-2 60 0 14 0 14 C18 14 44 4 44 4 Z" fill="#f59e0b" />
        <path d="M44 14 C44 14 64 21 78 21 C78 21 80 56 64 75 C55 86 46 90 44 91 Z" fill="#fbbf24" />
        <path d="M28 52 L40 64 L62 38" fill="none" stroke="#fff" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  )
}
