import { lazy, Suspense } from 'react';

// ========== HERO ILLUSTRATION (reused) ==========
export function HeroIllus({ showChips = true }) {
  return (
    <div className="illus">
      {/* dotted orbits */}
      <svg className="orbit" viewBox="0 0 600 540" preserveAspectRatio="none">
        <ellipse cx="300" cy="270" rx="290" ry="200" className="orbit-path"/>
        <ellipse cx="300" cy="270" rx="240" ry="240" className="orbit-path" transform="rotate(20 300 270)"/>
        <circle cx="40" cy="280" r="4" className="dot"/>
        <circle cx="560" cy="180" r="4" className="dot"/>
        <circle cx="120" cy="80" r="3" className="dot"/>
        <circle cx="500" cy="430" r="4" className="dot"/>
        <circle cx="330" cy="40" r="3" className="dot" />
        <circle cx="260" cy="500" r="3" className="dot" />
      </svg>

      {showChips && <>
        <span className="chip c-3d">3D Modeling</span>
        <span className="chip c-web">Web / App</span>
        <span className="chip c-tools">Tools</span>
      </>}

      {/* Tablet left — 3D chair */}
      <div className="floater tablet-l">
        <svg viewBox="0 0 220 160" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="0" width="220" height="160" rx="14" fill="#ffffff" stroke="#E7EAF0"/>
          <rect x="0" y="0" width="220" height="22" rx="14" fill="#F3F5F9"/>
          <circle cx="12" cy="11" r="3" fill="#FF6B6B"/><circle cx="22" cy="11" r="3" fill="#FFD167"/><circle cx="32" cy="11" r="3" fill="#7ED957"/>
          <rect x="20" y="40" width="180" height="100" rx="6" fill="#F6F7FA"/>
          {/* chair silhouette */}
          <g transform="translate(70 60)">
            <ellipse cx="40" cy="68" rx="34" ry="6" fill="#D9DEEA"/>
            <path d="M10 40 Q40 0 70 40 L70 60 L10 60 Z" fill="#3D4860"/>
            <rect x="35" y="58" width="10" height="14" fill="#9AA3B6"/>
            <rect x="28" y="70" width="24" height="2" fill="#9AA3B6"/>
          </g>
        </svg>
      </div>

      {/* Monitor center */}
      <div className="floater monitor">
        <svg viewBox="0 0 380 280" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="0" width="380" height="220" rx="10" fill="#1E2330"/>
          <rect x="8" y="8" width="364" height="200" rx="6" fill="#0F1422"/>
          {/* code lines */}
          {[0,1,2,3,4,5,6,7,8,9,10,11,12].map(i => (
            <g key={i} transform={`translate(20 ${28 + i*13})`}>
              <text x="0" y="0" fontSize="8" fill="#5C6678" fontFamily="monospace">{(i+1).toString().padStart(2,'0')}</text>
              <rect x="22" y="-7" width={[80, 140, 200, 110, 160, 90, 170, 130, 60, 200, 150, 100, 180][i]} height="3" rx="1.5" fill={["#7AAEFF","#E5C07B","#98C379","#C678DD","#7AAEFF","#E5C07B","#98C379","#5C6370","#C678DD","#7AAEFF","#E5C07B","#98C379","#7AAEFF"][i]} opacity="0.85"/>
            </g>
          ))}
          {/* stand */}
          <path d="M150 220 L230 220 L240 252 L140 252 Z" fill="#2A3142"/>
          <rect x="120" y="252" width="140" height="6" rx="3" fill="#1E2330"/>
        </svg>
      </div>

      {/* Tablet right — chart */}
      <div className="floater tablet-r">
        <svg viewBox="0 0 140 220" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="0" width="140" height="220" rx="18" fill="#0F1422"/>
          <rect x="6" y="6" width="128" height="208" rx="14" fill="#1A1F2F"/>
          <text x="14" y="28" fontSize="9" fill="#A2A9BC" fontFamily="sans-serif">Habit Tracker 3D</text>
          <text x="14" y="64" fontSize="22" fill="#fff" fontWeight="700" fontFamily="sans-serif">87%</text>
          {/* bars */}
          {[
            [20,140,18,40],[36,160,18,20],[52,120,18,60],[68,150,18,30],[84,110,18,70],[100,170,18,10]
          ].map((b,i)=>(
            <rect key={i} x={b[0]} y={b[1]} width={b[2]} height={b[3]} rx="3" fill={i===2?"#2563EB":"#3D4860"}/>
          ))}
          <rect x="14" y="186" width="112" height="20" rx="10" fill="#2563EB"/>
        </svg>
      </div>

      {/* Phone with tree */}
      <div className="floater phone">
        <svg viewBox="0 0 130 230" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="0" width="130" height="230" rx="20" fill="#ffffff" stroke="#E7EAF0"/>
          <rect x="6" y="6" width="118" height="218" rx="16" fill="#F6F7FA"/>
          <text x="65" y="28" textAnchor="middle" fontSize="10" fill="#0E1626" fontWeight="700" fontFamily="sans-serif">Pomotree</text>
          {/* tree */}
          <g transform="translate(65 110)">
            <rect x="-3" y="32" width="6" height="14" fill="#8B5E3C"/>
            <circle cx="0" cy="22" r="22" fill="#4CAF50"/>
            <circle cx="-14" cy="14" r="14" fill="#5BC062"/>
            <circle cx="14" cy="14" r="14" fill="#5BC062"/>
            <circle cx="0" cy="6" r="14" fill="#6DCC72"/>
          </g>
          <text x="65" y="180" textAnchor="middle" fontSize="22" fill="#0E1626" fontWeight="800" fontFamily="sans-serif">25:00</text>
          <rect x="20" y="194" width="90" height="22" rx="11" fill="#4CAF50"/>
          <text x="65" y="208" textAnchor="middle" fontSize="9" fill="#fff" fontWeight="700" fontFamily="sans-serif">Start</text>
        </svg>
      </div>

      {/* Tools card */}
      <div className="floater tools">
        <svg viewBox="0 0 160 110" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="0" width="160" height="110" rx="10" fill="#0F1422"/>
          <text x="12" y="22" fontSize="8" fill="#98C379" fontFamily="monospace">$ build amazing things</text>
          <text x="12" y="40" fontSize="8" fill="#5C6370" fontFamily="monospace">&gt; with code</text>
          <text x="12" y="56" fontSize="8" fill="#5C6370" fontFamily="monospace">&gt; with design</text>
          <text x="12" y="72" fontSize="8" fill="#5C6370" fontFamily="monospace">&gt; with curiosity</text>
          <rect x="12" y="80" width="8" height="10" fill="#7AAEFF"/>
        </svg>
      </div>

      {/* Sketches */}
      <div className="floater sketch">
        <svg viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="0" width="160" height="160" rx="8" fill="#FFFFFF" stroke="#E7EAF0"/>
          <ellipse cx="50" cy="50" rx="28" ry="10" fill="none" stroke="#9AA3B6" strokeWidth="1"/>
          <ellipse cx="50" cy="50" rx="28" ry="22" fill="none" stroke="#9AA3B6" strokeWidth="1"/>
          <ellipse cx="110" cy="50" rx="28" ry="22" fill="none" stroke="#9AA3B6" strokeWidth="1"/>
          <ellipse cx="50" cy="110" rx="28" ry="22" fill="none" stroke="#9AA3B6" strokeWidth="1"/>
          <ellipse cx="110" cy="110" rx="28" ry="22" fill="none" stroke="#9AA3B6" strokeWidth="1"/>
        </svg>
      </div>

      {/* Cubes */}
      <div className="floater cube">
        <svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
          <path d="M30 6 L52 18 L52 42 L30 54 L8 42 L8 18 Z" fill="#2563EB"/>
          <path d="M30 6 L52 18 L30 30 L8 18 Z" fill="#3B7AF0"/>
          <path d="M30 30 L52 18 L52 42 L30 54 Z" fill="#1B53D4" opacity="0.85"/>
        </svg>
      </div>
      <div className="floater cube-wire">
        <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" stroke="#9DB4FF" fill="none" strokeWidth="1">
          <path d="M60 12 L102 36 L102 84 L60 108 L18 84 L18 36 Z"/>
          <path d="M60 12 L60 60 L18 36"/><path d="M60 60 L102 36"/><path d="M60 60 L60 108"/>
        </svg>
      </div>
    </div>
  );
}

const LazyHeroModel = lazy(() => import('./HeroModel.jsx'));

function HeroModelFallback() {
  return (
    <div className="illus hero-model" aria-hidden="true">
      <div className="model-backdrop"></div>
      <div className="model-canvas"></div>
    </div>
  );
}

export function HeroModel() {
  return (
    <Suspense fallback={<HeroModelFallback />}>
      <LazyHeroModel />
    </Suspense>
  );
}
