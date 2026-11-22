export default function SimulacionVisual() {
  return (
    <section className="simulacion-visual">
      <p className="simulacion-titulo">Proceso de regeneración</p>
      <svg viewBox="0 0 1000 170" className="svg-cadena" role="img" aria-label="Diagrama de la cadena de regeneración del bosque">
        <defs>
          <marker id="flecha" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#555c50" />
          </marker>
        </defs>

        {/* Background */}
        <rect x="0" y="0" width="1000" height="170" fill="#f0f4ee" rx="12" />

        {/* ── STEP 1: Árbol (cx=75) ── */}
        <rect x="71" y="100" width="8" height="28" fill="#6B4F2E" rx="2" />
        <ellipse cx="75" cy="85" rx="22" ry="26" fill="#1b4332" />
        <ellipse cx="75" cy="75" rx="16" ry="20" fill="#2d6a4f" />
        <ellipse cx="75" cy="65" rx="10" ry="14" fill="#40916c" />
        <circle cx="65" cy="72" r="4" fill="#c0392b" />
        <circle cx="81" cy="68" r="4" fill="#c0392b" />
        <circle cx="74" cy="58" r="4" fill="#c0392b" />
        <text x="75" y="142" textAnchor="middle" fontSize="12" fill="#252920" fontWeight="600">Árbol</text>
        <text x="75" y="155" textAnchor="middle" fontSize="10" fill="#555c50">con frutos</text>

        {/* Arrow 1 */}
        <line x1="135" y1="85" x2="183" y2="85" stroke="#555c50" strokeWidth="1.5" markerEnd="url(#flecha)" />
        <text x="159" y="73" textAnchor="middle" fontSize="9" fill="#555c50">−comidos</text>

        {/* ── STEP 2: Frutos (cx=250) ── */}
        <line x1="250" y1="61" x2="250" y2="55" stroke="#2d6a4f" strokeWidth="1.5" />
        <line x1="239" y1="74" x2="239" y2="68" stroke="#2d6a4f" strokeWidth="1.5" />
        <line x1="257" y1="77" x2="257" y2="71" stroke="#2d6a4f" strokeWidth="1.5" />
        <circle cx="240" cy="85" r="11" fill="#c0392b" />
        <circle cx="257" cy="88" r="11" fill="#c0392b" />
        <circle cx="250" cy="72" r="11" fill="#c0392b" />
        <text x="250" y="142" textAnchor="middle" fontSize="12" fill="#252920" fontWeight="600">Frutos</text>
        <text x="250" y="155" textAnchor="middle" fontSize="10" fill="#555c50">restantes</text>

        {/* Arrow 2 */}
        <line x1="315" y1="85" x2="363" y2="85" stroke="#555c50" strokeWidth="1.5" markerEnd="url(#flecha)" />
        <text x="339" y="73" textAnchor="middle" fontSize="9" fill="#555c50">× sem./fruto</text>

        {/* ── STEP 3: Semillas (cx=425) ── */}
        <ellipse cx="415" cy="88" rx="5" ry="8" fill="#8B7355" transform="rotate(-20, 415, 88)" />
        <ellipse cx="428" cy="84" rx="5" ry="8" fill="#8B7355" transform="rotate(10, 428, 84)" />
        <ellipse cx="420" cy="78" rx="5" ry="8" fill="#8B7355" transform="rotate(-5, 420, 78)" />
        <ellipse cx="432" cy="93" rx="5" ry="8" fill="#8B7355" transform="rotate(25, 432, 93)" />
        <ellipse cx="438" cy="82" rx="5" ry="8" fill="#8B7355" transform="rotate(-15, 438, 82)" />
        <text x="425" y="142" textAnchor="middle" fontSize="12" fill="#252920" fontWeight="600">Semillas</text>
        <text x="425" y="155" textAnchor="middle" fontSize="10" fill="#555c50">totales</text>

        {/* Arrow 3 */}
        <line x1="490" y1="85" x2="538" y2="85" stroke="#555c50" strokeWidth="1.5" markerEnd="url(#flecha)" />
        <text x="514" y="73" textAnchor="middle" fontSize="9" fill="#555c50">−% ratón</text>

        {/* ── STEP 4: Sin ratón (cx=600) ── */}
        <path d="M575,94 Q565,100 560,110" stroke="#888" strokeWidth="2" fill="none" />
        <ellipse cx="592" cy="90" rx="18" ry="12" fill="#888" />
        <circle cx="612" cy="85" r="12" fill="#888" />
        <circle cx="607" cy="74" r="6" fill="#aaa" />
        <circle cx="619" cy="73" r="6" fill="#aaa" />
        <circle cx="617" cy="82" r="2" fill="#333" />
        <line x1="578" y1="70" x2="626" y2="108" stroke="#c0392b" strokeWidth="2.5" />
        <text x="600" y="142" textAnchor="middle" fontSize="12" fill="#252920" fontWeight="600">Sin ratón</text>
        <text x="600" y="155" textAnchor="middle" fontSize="10" fill="#555c50">comedor</text>

        {/* Arrow 4 */}
        <line x1="665" y1="85" x2="713" y2="85" stroke="#555c50" strokeWidth="1.5" markerEnd="url(#flecha)" />
        <text x="689" y="73" textAnchor="middle" fontSize="9" fill="#555c50">× % germina</text>

        {/* ── STEP 5: Plántulas (cx=775) ── */}
        <line x1="775" y1="115" x2="775" y2="68" stroke="#2d6a4f" strokeWidth="2.5" strokeLinecap="round" />
        <ellipse cx="763" cy="84" rx="13" ry="5" fill="#52b788" transform="rotate(-25, 763, 84)" />
        <ellipse cx="787" cy="82" rx="13" ry="5" fill="#52b788" transform="rotate(25, 787, 82)" />
        <ellipse cx="775" cy="68" rx="8" ry="5" fill="#40916c" />
        <text x="775" y="142" textAnchor="middle" fontSize="12" fill="#252920" fontWeight="600">Plántulas</text>
        <text x="775" y="155" textAnchor="middle" fontSize="10" fill="#555c50">germinadas</text>

        {/* Arrow 5 */}
        <line x1="840" y1="85" x2="888" y2="85" stroke="#555c50" strokeWidth="1.5" markerEnd="url(#flecha)" />
        <text x="864" y="73" textAnchor="middle" fontSize="9" fill="#555c50">× % sobrevive</text>

        {/* ── STEP 6: Plantas finales (cx=950, highlighted) ── */}
        <circle cx="950" cy="85" r="55" fill="#e3ebdf" />
        <rect x="947" y="100" width="8" height="28" fill="#6B4F2E" rx="2" />
        <polygon points="951,42 976,72 926,72" fill="#1b4332" />
        <polygon points="951,55 980,88 922,88" fill="#2d6a4f" />
        <polygon points="951,70 982,100 920,100" fill="#40916c" />
        <text x="950" y="142" textAnchor="middle" fontSize="12" fill="#24563b" fontWeight="700">Plantas</text>
        <text x="950" y="155" textAnchor="middle" fontSize="10" fill="#24563b">finales</text>
      </svg>
    </section>
  );
}
