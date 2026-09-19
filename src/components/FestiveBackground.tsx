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

      {/* 3. Sacred Rangoli / Mandala Watermark Pattern in Center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[480px] md:w-[560px] h-[340px] sm:h-[480px] md:h-[560px] opacity-[0.14] pointer-events-none transition-transform duration-1000">
        <svg
          viewBox="0 0 400 400"
          className="w-full h-full stroke-amber-800 fill-none animate-[spin_160s_linear_infinite]"
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
