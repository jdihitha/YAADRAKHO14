import React from 'react';

interface FestiveBackgroundProps {
  variant?: 'game' | 'home';
}

export const FestiveBackground: React.FC<FestiveBackgroundProps> = ({ variant = 'game' }) => {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none z-0">
      {/* 1. Base Warm Luminous Temple Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FFFBF0] via-[#FFF4DE] to-[#FDE8CA]" />

      {/* 2. Celestial Radiant Golden Sunburst / Aura in Center */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[800px] h-[600px] sm:h-[800px] rounded-full opacity-60 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(251, 191, 36, 0.35) 0%, rgba(245, 158, 11, 0.18) 35%, rgba(234, 88, 12, 0.08) 55%, transparent 75%)',
        }}
      />

      {/* 3. Sacred Lord Ganesha Watermark Silhouette in Center Background (Breathing softly behind cards) */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[440px] md:w-[520px] h-[320px] sm:h-[440px] md:h-[520px] pointer-events-none transition-transform duration-1000 z-0"
        style={{ animation: 'ganeshaBreathe 8s ease-in-out infinite' }}
      >
        <svg
          viewBox="0 0 240 240"
          className="w-full h-full stroke-amber-800/80 fill-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Sacred Radiant Halo (Prabhavali) */}
          <circle cx="120" cy="120" r="108" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.6" />
          <circle cx="120" cy="120" r="96" strokeWidth="1.5" opacity="0.5" />
          
          {/* Radiating Divine Ray Dashes */}
          {[...Array(24)].map((_, idx) => {
            const angle = (idx * 360) / 24;
            return (
              <line
                key={`ray-${idx}`}
                x1="120"
                y1="14"
                x2="120"
                y2="22"
                strokeWidth="1.4"
                opacity="0.5"
                transform={`rotate(${angle} 120 120)`}
              />
            );
          })}

          {/* Majestic Royal Mukut (Crown) */}
          <path
            d="M96 68L104 36L120 22L136 36L144 68H96Z"
            strokeWidth="2.2"
            strokeLinejoin="round"
            fill="rgba(245, 158, 11, 0.05)"
          />
          <path d="M106 68L112 44L120 34L128 44L134 68" strokeWidth="1.2" opacity="0.7" />
          <circle cx="120" cy="30" r="2.5" fill="#D97706" />

          {/* Sacred OM / Trishul glyph atop crown */}
          <path
            d="M120 12V20M115 15C118 17 122 17 125 15"
            strokeWidth="1.8"
            strokeLinecap="round"
          />

          {/* Ganesha's Grand Elephant Ears */}
          {/* Left Ear */}
          <path
            d="M86 78 C60 70 42 86 46 112 C50 134 72 136 86 126"
            strokeWidth="2.2"
            strokeLinecap="round"
            fill="rgba(251, 191, 36, 0.04)"
          />
          <path
            d="M80 88 C66 84 56 96 58 112 C60 124 72 126 80 120"
            strokeWidth="1.2"
            strokeDasharray="2 2"
            opacity="0.6"
          />
          <circle cx="60" cy="130" r="2.5" fill="#D97706" opacity="0.8" />

          {/* Right Ear */}
          <path
            d="M154 78 C180 70 198 86 194 112 C190 134 168 136 154 126"
            strokeWidth="2.2"
            strokeLinecap="round"
            fill="rgba(251, 191, 36, 0.04)"
          />
          <path
            d="M160 88 C174 84 184 96 182 112 C180 124 168 126 160 120"
            strokeWidth="1.2"
            strokeDasharray="2 2"
            opacity="0.6"
          />
          <circle cx="180" cy="130" r="2.5" fill="#D97706" opacity="0.8" />

          {/* Sacred Forehead & Tilak / Chandan */}
          <path d="M96 74 C112 70 128 70 144 74" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M106 79 C115 82 125 82 134 79" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M120 72 V86" strokeWidth="2.5" stroke="#DC2626" strokeLinecap="round" opacity="0.8" />
          <circle cx="120" cy="88" r="2" fill="#D97706" />

          {/* Peaceful Divine Eyes */}
          <path d="M100 94 C104 90 110 90 114 94" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="107" cy="95" r="1.5" fill="#92400E" />
          <path d="M126 94 C130 90 136 90 140 94" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="133" cy="95" r="1.5" fill="#92400E" />

          {/* Sacred Tusks (Ekadanta: Intact right, broken left) */}
          <path d="M104 120 L94 122" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M136 120 L150 125" strokeWidth="2.8" strokeLinecap="round" />

          {/* Graceful Curved Trunk (Vakratunda) holding Sweet Modak */}
          <path
            d="M120 102 C120 125 112 144 100 156 C88 168 76 162 76 148 C76 136 86 132 94 136 C98 138 98 144 96 146"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {/* Trunk creases */}
          <path d="M115 116 C118 118 122 118 123 116" strokeWidth="1.2" />
          <path d="M110 128 C114 130 118 130 120 128" strokeWidth="1.2" />

          {/* Sacred Modak in trunk's curl */}
          <g transform="translate(68, 134)">
            <path
              d="M12 2 C12 2 4 10 3 16 C2 21 6 23 12 23 C18 23 22 21 21 16 C20 10 12 2 12 2 Z"
              strokeWidth="1.8"
              fill="rgba(245, 158, 11, 0.15)"
            />
            <path d="M12 3 V23" strokeWidth="1.2" />
            <circle cx="12" cy="4" r="1.5" fill="#DC2626" />
          </g>

          {/* Auspicious Garland around Neck */}
          <path
            d="M86 140 C104 158 136 158 154 140"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="4 4"
            opacity="0.6"
          />
        </svg>
      </div>

      {/* 4. Sacred Rangoli / Mandala Watermark Pattern in Center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[480px] md:w-[560px] h-[340px] sm:h-[480px] md:h-[560px] opacity-[0.10] pointer-events-none transition-transform duration-1000">
        <svg
          viewBox="0 0 400 400"
          className="w-full h-full stroke-amber-800 fill-none animate-[spin_180s_linear_infinite]"
        >
          {/* Concentric sacred circles */}
          <circle cx="200" cy="200" r="190" strokeWidth="1.5" strokeDasharray="6 4" />
          <circle cx="200" cy="200" r="172" strokeWidth="2" />
          <circle cx="200" cy="200" r="150" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="200" cy="200" r="120" strokeWidth="2" />
          <circle cx="200" cy="200" r="85" strokeWidth="1.5" />
          <circle cx="200" cy="200" r="45" strokeWidth="2" strokeDasharray="4 2" />

          {/* 16-point Radiant Lotus Petals Outer Tier */}
          {[...Array(16)].map((_, i) => {
            const angle = (i * 360) / 16;
            return (
              <g key={`petal-outer-${i}`} transform={`rotate(${angle} 200 200)`}>
                <path
                  d="M200 28 C215 70 235 120 200 172 C165 120 185 70 200 28 Z"
                  strokeWidth="1.4"
                  fill="rgba(245, 158, 11, 0.08)"
                />
                <circle cx="200" cy="36" r="3.5" fill="#D97706" />
              </g>
            );
          })}

          {/* 8-point Inner Sacred Star Flower */}
          {[...Array(8)].map((_, i) => {
            const angle = (i * 360) / 8 + 22.5;
            return (
              <g key={`petal-inner-${i}`} transform={`rotate(${angle} 200 200)`}>
                <path
                  d="M200 115 C215 140 220 165 200 185 C180 165 185 140 200 115 Z"
                  strokeWidth="1.6"
                  fill="rgba(220, 38, 38, 0.08)"
                />
                <circle cx="200" cy="115" r="2.5" fill="#EA580C" />
              </g>
            );
          })}

          {/* Center Auspicious Sun Core */}
          <circle cx="200" cy="200" r="18" fill="rgba(251, 191, 36, 0.2)" strokeWidth="1.5" />
          <circle cx="200" cy="200" r="6" fill="#B45309" />
        </svg>
      </div>

      {/* ================= GANESHA-ONLY MINIMAL SIDE ANIMATIONS (OUTSIDE CARDS) ================= */}

      {/* LEFT CORRIDOR: Floating Sweet Modak & Sacred Durva Grass */}
      {/* 1. Floating Golden Modak with subtle sparkle */}
      <div
        className="absolute top-[26%] left-[3%] sm:left-[6%] lg:left-[9%] pointer-events-none opacity-80 select-none"
        style={{ animation: 'ganeshaFloatSlow 6.5s ease-in-out infinite' }}
      >
        <div className="relative">
          <svg viewBox="0 0 40 40" className="w-8 h-8 sm:w-10 sm:h-10 drop-shadow-sm" fill="none">
            {/* Golden modak body */}
            <path
              d="M20 5C20 5 11 16 10 25C9 32 14 35 20 35C26 35 31 32 30 25C29 16 20 5 20 5Z"
              fill="url(#leftModakGrad)"
              stroke="#B45309"
              strokeWidth="1.6"
            />
            <path d="M20 6V35" stroke="#B45309" strokeWidth="1.4" opacity="0.6" />
            <path d="M20 7C17 14 14 22 13 32" stroke="#B45309" strokeWidth="1.2" opacity="0.5" />
            <path d="M20 7C23 14 26 22 27 32" stroke="#B45309" strokeWidth="1.2" opacity="0.5" />
            <circle cx="20" cy="6" r="1.6" fill="#DC2626" />
            <defs>
              <linearGradient id="leftModakGrad" x1="10" y1="35" x2="30" y2="7">
                <stop offset="0%" stopColor="#F59E0B" />
                <stop offset="60%" stopColor="#FBBF24" />
                <stop offset="100%" stopColor="#FEF08A" />
              </linearGradient>
            </defs>
          </svg>
          {/* Subtle divine golden sparkle */}
          <div
            className="absolute -top-1 -right-1 text-amber-500 text-xs select-none"
            style={{ animation: 'sparklePulse 3.5s ease-in-out infinite' }}
          >
            ✦
          </div>
        </div>
      </div>

      {/* 2. Sacred Durva Grass Sprig (Swaying gently in divine breeze) */}
      <div
        className="absolute top-[56%] left-[3%] sm:left-[6%] lg:left-[8%] pointer-events-none opacity-75 select-none"
        style={{
          animation: 'durvaSway 5.5s ease-in-out infinite',
          transformOrigin: 'bottom center',
        }}
      >
        <svg viewBox="0 0 36 44" className="w-8 h-10 sm:w-9 sm:h-11 drop-shadow-xs" fill="none">
          {/* 3 delicate blades of sacred Durva grass */}
          <path d="M18 42 C17 28 10 16 6 8 C10 16 16 26 18 42 Z" fill="#22C55E" stroke="#15803D" strokeWidth="1" />
          <path d="M18 42 C18 24 18 12 18 4 C19 12 19 24 18 42 Z" fill="#16A34A" stroke="#166534" strokeWidth="1" />
          <path d="M18 42 C19 28 26 16 30 8 C26 16 20 26 18 42 Z" fill="#22C55E" stroke="#15803D" strokeWidth="1" />
          {/* Sacred red moli thread knot around stem */}
          <rect x="14" y="34" width="8" height="4" rx="2" fill="#DC2626" stroke="#991B1B" strokeWidth="0.8" />
          <circle cx="18" cy="36" r="1.5" fill="#FEF08A" />
        </svg>
      </div>

      {/* 3. Auspicious Diya of Wisdom (Akhand Deepam) at Bottom-Left */}
      <div className="absolute bottom-[4%] left-[4%] sm:left-[7%] lg:left-[10%] pointer-events-none opacity-85 select-none">
        <div className="relative flex flex-col items-center">
          {/* Warm ambient flame glow */}
          <div className="absolute -top-3 w-16 h-16 rounded-full bg-amber-400/25 blur-lg pointer-events-none" />

          {/* Animated Flickering Flame */}
          <div
            className="w-4 h-6 mb-[-2px] origin-bottom"
            style={{ animation: 'flameFlicker 2.6s ease-in-out infinite' }}
          >
            <svg viewBox="0 0 20 30" className="w-full h-full" fill="none">
              <path
                d="M10 2 C10 2 4 10 4 18 C4 24 7 28 10 28 C13 28 16 24 16 18 C16 10 10 2 10 2 Z"
                fill="url(#flameGradLeft)"
              />
              <path
                d="M10 9 C10 9 6 15 6 20 C6 24 8 26 10 26 C12 26 14 24 14 20 C14 15 10 9 10 9 Z"
                fill="#FFFBEB"
              />
              <defs>
                <linearGradient id="flameGradLeft" x1="10" y1="2" x2="10" y2="28" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#FEF08A" />
                  <stop offset="40%" stopColor="#F59E0B" />
                  <stop offset="100%" stopColor="#DC2626" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Terracotta / Brass Diya Bowl */}
          <svg viewBox="0 0 44 22" className="w-10 h-5 sm:w-11 sm:h-5.5 drop-shadow-sm" fill="none">
            <ellipse cx="22" cy="11" rx="20" ry="7" fill="#B45309" stroke="#78350F" strokeWidth="1.2" />
            <ellipse cx="22" cy="9" rx="16" ry="5" fill="#D97706" />
            <ellipse cx="22" cy="8" rx="12" ry="3.5" fill="#FEF3C7" fillOpacity="0.4" />
          </svg>
        </div>
      </div>

      {/* RIGHT CORRIDOR: Sacred Lotus Flower, Second Modak, & Mushak Vahana */}
      {/* 4. Sacred Pink Lotus Flower (Floating & drifting gently) */}
      <div
        className="absolute top-[28%] right-[3%] sm:right-[6%] lg:right-[9%] pointer-events-none opacity-80 select-none"
        style={{ animation: 'flowerDrift 8s ease-in-out infinite' }}
      >
        <div className="relative">
          <svg viewBox="0 0 44 36" className="w-9 h-8 sm:w-11 sm:h-9 drop-shadow-xs" fill="none">
            {/* Lotus Petals */}
            <path d="M22 4 C18 14 14 24 22 30 C30 24 26 14 22 4 Z" fill="#F43F5E" stroke="#BE123C" strokeWidth="1" />
            <path d="M16 10 C10 16 8 24 16 30 C20 25 20 18 16 10 Z" fill="#FB7185" stroke="#BE123C" strokeWidth="0.9" />
            <path d="M28 10 C34 16 36 24 28 30 C24 25 24 18 28 10 Z" fill="#FB7185" stroke="#BE123C" strokeWidth="0.9" />
            <path d="M10 17 C4 22 4 28 12 31 C15 27 15 22 10 17 Z" fill="#FDA4AF" stroke="#BE123C" strokeWidth="0.8" />
            <path d="M34 17 C40 22 40 28 32 31 C29 27 29 22 34 17 Z" fill="#FDA4AF" stroke="#BE123C" strokeWidth="0.8" />
            {/* Center golden seed pad */}
            <ellipse cx="22" cy="27" rx="4" ry="2" fill="#FBBF24" />
          </svg>
          <div
            className="absolute -top-1 -left-1 text-amber-500 text-xs select-none"
            style={{ animation: 'sparklePulse 4s ease-in-out 1s infinite' }}
          >
            ✦
          </div>
        </div>
      </div>

      {/* 5. Second Floating Golden Modak */}
      <div
        className="absolute top-[58%] right-[3%] sm:right-[6%] lg:right-[8%] pointer-events-none opacity-80 select-none"
        style={{ animation: 'ganeshaFloatSlow 7.5s ease-in-out 2s infinite' }}
      >
        <svg viewBox="0 0 40 40" className="w-8 h-8 sm:w-9 sm:h-9 drop-shadow-sm" fill="none">
          <path
            d="M20 5C20 5 11 16 10 25C9 32 14 35 20 35C26 35 31 32 30 25C29 16 20 5 20 5Z"
            fill="url(#rightModakGrad)"
            stroke="#B45309"
            strokeWidth="1.6"
          />
          <path d="M20 6V35" stroke="#B45309" strokeWidth="1.4" opacity="0.6" />
          <path d="M20 7C17 14 14 22 13 32" stroke="#B45309" strokeWidth="1.2" opacity="0.5" />
          <path d="M20 7C23 14 26 22 27 32" stroke="#B45309" strokeWidth="1.2" opacity="0.5" />
          <circle cx="20" cy="6" r="1.6" fill="#DC2626" />
          <defs>
            <linearGradient id="rightModakGrad" x1="10" y1="35" x2="30" y2="7">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="50%" stopColor="#FBBF24" />
              <stop offset="100%" stopColor="#FEF08A" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* 6. Mushak (Ganesha's Devoted Vahana) at Bottom-Right Corner */}
      <div
        className="absolute bottom-[4%] right-[4%] sm:right-[7%] lg:right-[10%] pointer-events-none opacity-85 select-none"
        style={{ animation: 'mushakWiggle 5s ease-in-out infinite' }}
      >
        <div className="flex flex-col items-center">
          <svg viewBox="0 0 44 40" className="w-10 h-9 sm:w-11 sm:h-10 drop-shadow-sm" fill="none">
            {/* Long cute curved tail */}
            <path d="M8 32 C4 26 2 18 8 14 C12 12 14 16 12 20" stroke="#78350F" strokeWidth="1.8" strokeLinecap="round" />

            {/* Mouse Body (sitting on hind legs) */}
            <ellipse cx="22" cy="24" rx="10" ry="12" fill="#78350F" />
            <ellipse cx="23" cy="25" rx="7" ry="8" fill="#D97706" fillOpacity="0.4" />

            {/* Cute Rounded Head */}
            <circle cx="28" cy="14" r="8" fill="#78350F" />

            {/* Snout pointing left towards Ganesha */}
            <path d="M28 17 L36 17 C38 17 38 15 36 15 L28 13 Z" fill="#78350F" />
            <circle cx="36" cy="16" r="1.5" fill="#EF4444" />

            {/* Big friendly round mouse ear */}
            <circle cx="25" cy="8" r="4.5" fill="#92400E" />
            <circle cx="25" cy="8" r="2.8" fill="#FDA4AF" />

            {/* Twinkling eye */}
            <circle cx="31" cy="13" r="1.5" fill="#FFFBEB" />
            <circle cx="31.5" cy="13" r="0.8" fill="#18181B" />

            {/* Paws holding a tiny golden modak */}
            <g transform="translate(30, 18)">
              <ellipse cx="5" cy="4" rx="3.5" ry="4" fill="#FBBF24" stroke="#B45309" strokeWidth="0.8" />
              <circle cx="5" cy="1" r="0.8" fill="#DC2626" />
            </g>
            {/* Paws */}
            <ellipse cx="30" cy="22" rx="2.5" ry="1.8" fill="#92400E" />
          </svg>
          {/* Subtle tiny label */}
          <span className="text-[9px] font-black text-amber-900/60 uppercase tracking-widest mt-0.5">Mushak</span>
        </div>
      </div>

      {/* 4. Decorative Hanging Marigold Toran / Festive Garlands at Top */}
      <div className="absolute top-0 left-0 right-0 w-full overflow-hidden opacity-85">
        <svg
          viewBox="0 0 1200 48"
          preserveAspectRatio="none"
          className="w-full h-8 sm:h-10 text-amber-600"
          fill="none"
        >
          {/* Garland String */}
          <path
            d="M0 8 Q 150 32 300 8 Q 450 32 600 8 Q 750 32 900 8 Q 1050 32 1200 8"
            stroke="#B45309"
            strokeWidth="2"
            fill="none"
          />
          {/* Mango Leaves & Marigold Blossoms along the arches */}
          {[150, 450, 750, 1050].map((cx, idx) => (
            <g key={`festoon-${idx}`}>
              {/* Mango Leaf */}
              <path
                d={`M${cx} 24 C${cx - 6} 34 ${cx - 4} 42 ${cx} 46 C${cx + 4} 42 ${cx + 6} 34 ${cx} 24 Z`}
                fill="#15803D"
                stroke="#166534"
                strokeWidth="0.8"
              />
              {/* Golden Marigold Flower */}
              <circle cx={cx} cy="26" r="7" fill="#F59E0B" stroke="#D97706" strokeWidth="1" />
              <circle cx={cx} cy="26" r="4.5" fill="#EA580C" />
              <circle cx={cx} cy="26" r="2" fill="#FEF08A" />

              {/* Flanking smaller flowers */}
              <circle cx={cx - 40} cy="19" r="4.5" fill="#FBBF24" stroke="#D97706" strokeWidth="0.8" />
              <circle cx={cx + 40} cy="19" r="4.5" fill="#FBBF24" stroke="#D97706" strokeWidth="0.8" />
            </g>
          ))}
        </svg>
      </div>

      {/* 5. Four Corner Decorative Rangoli Accents */}
      {/* Top Left */}
      <div className="absolute top-0 left-0 w-36 h-36 opacity-30 pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full stroke-amber-800 fill-none">
          <path d="M0 0 C30 0 60 10 75 25 C90 40 100 70 100 100" strokeWidth="2.5" />
          <path d="M0 0 C20 0 45 6 56 17 C68 28 75 52 75 75" strokeWidth="1.5" strokeDasharray="3 2" />
          <circle cx="35" cy="35" r="8" strokeWidth="1.5" fill="rgba(245, 158, 11, 0.15)" />
          <circle cx="35" cy="35" r="3" fill="#D97706" />
        </svg>
      </div>

      {/* Top Right */}
      <div className="absolute top-0 right-0 w-36 h-36 opacity-30 pointer-events-none -scale-x-100">
        <svg viewBox="0 0 100 100" className="w-full h-full stroke-amber-800 fill-none">
          <path d="M0 0 C30 0 60 10 75 25 C90 40 100 70 100 100" strokeWidth="2.5" />
          <path d="M0 0 C20 0 45 6 56 17 C68 28 75 52 75 75" strokeWidth="1.5" strokeDasharray="3 2" />
          <circle cx="35" cy="35" r="8" strokeWidth="1.5" fill="rgba(245, 158, 11, 0.15)" />
          <circle cx="35" cy="35" r="3" fill="#D97706" />
        </svg>
      </div>

      {/* Bottom Left */}
      <div className="absolute bottom-0 left-0 w-44 h-44 opacity-25 pointer-events-none -scale-y-100">
        <svg viewBox="0 0 100 100" className="w-full h-full stroke-amber-800 fill-none">
          <path d="M0 0 C30 0 60 10 75 25 C90 40 100 70 100 100" strokeWidth="2.5" />
          <circle cx="35" cy="35" r="8" strokeWidth="1.5" fill="rgba(245, 158, 11, 0.15)" />
        </svg>
      </div>

      {/* Bottom Right */}
      <div className="absolute bottom-0 right-0 w-44 h-44 opacity-25 pointer-events-none -scale-x-100 -scale-y-100">
        <svg viewBox="0 0 100 100" className="w-full h-full stroke-amber-800 fill-none">
          <path d="M0 0 C30 0 60 10 75 25 C90 40 100 70 100 100" strokeWidth="2.5" />
          <circle cx="35" cy="35" r="8" strokeWidth="1.5" fill="rgba(245, 158, 11, 0.15)" />
        </svg>
      </div>

      {/* 6. Subtle Floating Festive Golden Bokeh Orbs */}
      <div
        className="absolute top-[22%] left-[10%] w-3 h-3 rounded-full bg-amber-400/50 blur-[1px] animate-[floatBob_6s_ease-in-out_infinite]"
        style={{ animationDelay: '0s' }}
      />
      <div
        className="absolute top-[35%] right-[12%] w-4 h-4 rounded-full bg-orange-400/40 blur-[1.5px] animate-[floatBob_7s_ease-in-out_infinite]"
        style={{ animationDelay: '1.5s' }}
      />
      <div
        className="absolute bottom-[28%] left-[14%] w-3.5 h-3.5 rounded-full bg-yellow-400/50 blur-[1px] animate-[floatBob_8s_ease-in-out_infinite]"
        style={{ animationDelay: '3s' }}
      />
      <div
        className="absolute bottom-[35%] right-[16%] w-3 h-3 rounded-full bg-amber-400/45 blur-[1px] animate-[floatBob_6.5s_ease-in-out_infinite]"
        style={{ animationDelay: '2s' }}
      />
    </div>
  );
};
