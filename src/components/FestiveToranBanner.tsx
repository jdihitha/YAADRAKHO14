import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface FestiveToranBannerProps {
  isMuted?: boolean;
  onToggleMute?: () => void;
}

export const FestiveToranBanner: React.FC<FestiveToranBannerProps> = ({
  isMuted,
  onToggleMute,
}) => {
  return (
    <div className="w-full relative z-30 select-none overflow-hidden" id="festive-toran-header">
      {/* Upper Saffron Beam with Auspicious Vedic Inscription */}
      <div className="w-full bg-gradient-to-r from-[#9A3412] via-[#C2410C] to-[#9A3412] border-b-2 border-[#7C2D12] py-1.5 sm:py-2 px-3 sm:px-6 shadow-md relative flex items-center justify-between text-[#FEF08A]">
        {/* Left Sacred Motifs */}
        <div className="flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base font-bold tracking-widest">
          <span className="text-amber-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]">卐</span>
          <span className="text-amber-200 text-base sm:text-lg drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]">ॐ</span>
          <span className="text-amber-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]">卐</span>
        </div>

        {/* Center Golden Mantram */}
        <div className="flex items-center justify-center gap-2">
          <h2
            className="text-xs sm:text-sm md:text-base font-black tracking-[0.2em] sm:tracking-[0.25em] text-[#FFFBEB] uppercase drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)] text-center"
            style={{ fontFamily: "'Cinzel Decorative', serif" }}
          >
            SHREE GANESHAYA NAMAH
          </h2>
        </div>

        {/* Right Sacred Motifs & Music Toggle */}
        <div className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base font-bold tracking-widest">
          {onToggleMute !== undefined && (
            <button
              onClick={onToggleMute}
              id="toran-music-toggle-btn"
              className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-400/20 hover:bg-amber-400/30 text-amber-200 border border-amber-300/40 text-[10px] sm:text-xs font-bold transition-all cursor-pointer shadow-xs"
              title={isMuted ? 'Turn Sound On' : 'Turn Sound Off'}
            >
              {isMuted ? <VolumeX className="w-3 h-3 text-amber-300" /> : <Volume2 className="w-3 h-3 text-amber-300" />}
              <span className="hidden xs:inline uppercase tracking-wider">MUSIC</span>
            </button>
          )}

          <div className="flex items-center gap-1 sm:gap-1.5">
            <span className="text-amber-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]">卐</span>
            <span className="text-amber-200 text-base sm:text-lg drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]">ॐ</span>
            <span className="text-amber-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]">卐</span>
          </div>
        </div>
      </div>

      {/* Decorative Scalloped Mango Leaf (Mavilai) Toran & Glowing Lights */}
      <div className="w-full relative h-9 sm:h-11 overflow-hidden pointer-events-none">
        <svg
          viewBox="0 0 1200 48"
          preserveAspectRatio="none"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Glowing Light Radial Gradients */}
            <radialGradient id="lightGlowAmber" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FEF08A" stopOpacity="1" />
              <stop offset="50%" stopColor="#FBBF24" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="lightGlowOrange" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FED7AA" stopOpacity="1" />
              <stop offset="50%" stopColor="#FB923C" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#EA580C" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Glowing Festive Fairy Lights Along the Top Beam */}
          {[
            { x: 30, color: 'Amber' },
            { x: 90, color: 'Orange' },
            { x: 150, color: 'Amber' },
            { x: 210, color: 'Orange' },
            { x: 270, color: 'Amber' },
            { x: 330, color: 'Orange' },
            { x: 390, color: 'Amber' },
            { x: 450, color: 'Orange' },
            { x: 510, color: 'Amber' },
            { x: 570, color: 'Orange' },
            { x: 630, color: 'Amber' },
            { x: 690, color: 'Orange' },
            { x: 750, color: 'Amber' },
            { x: 810, color: 'Orange' },
            { x: 870, color: 'Amber' },
            { x: 930, color: 'Orange' },
            { x: 990, color: 'Amber' },
            { x: 1050, color: 'Orange' },
            { x: 1110, color: 'Amber' },
            { x: 1170, color: 'Orange' },
          ].map((light, idx) => (
            <g key={idx}>
              <circle
                cx={light.x}
                cy={6}
                r={10}
                fill={light.color === 'Amber' ? 'url(#lightGlowAmber)' : 'url(#lightGlowOrange)'}
                className="animate-pulse"
                style={{ animationDuration: `${2 + (idx % 3) * 0.5}s` }}
              />
              <circle cx={light.x} cy={6} r={2.5} fill="#FFFBEB" />
            </g>
          ))}

          {/* Gracefully Looping Orange/Marigold Garland Swags */}
          {Array.from({ length: 10 }).map((_, i) => {
            const startX = i * 120;
            const midX = startX + 60;
            const endX = startX + 120;
            return (
              <path
                key={i}
                d={`M${startX} 0 Q${midX} 24 ${endX} 0`}
                stroke="#C2410C"
                strokeWidth="3.5"
                fill="none"
                strokeLinecap="round"
              />
            );
          })}

          {/* Sacred Mango Leaf (Mavilai) Tassels at each node */}
          {Array.from({ length: 11 }).map((_, i) => {
            const nodeX = i * 120;
            return (
              <g key={i} transform={`translate(${nodeX}, 2)`}>
                {/* Node Marigold Flower Ball / Kumkum Bead */}
                <circle cx={0} cy={2} r={5} fill="#F97316" stroke="#C2410C" strokeWidth="1.5" />
                <circle cx={0} cy={2} r={2.5} fill="#DC2626" />

                {/* Fresh Mango Leaf */}
                <path
                  d="M0 6 C-4 12 -5 24 0 36 C5 24 4 12 0 6 Z"
                  fill="#15803D"
                  stroke="#166534"
                  strokeWidth="1.2"
                />
                {/* Central Leaf Vein */}
                <path d="M0 6 V34" stroke="#4ADE80" strokeWidth="1" strokeLinecap="round" />
                {/* Sacred Red Kumkum Dot on Mango Leaf */}
                <circle cx={0} cy={16} r={2} fill="#DC2626" />
                <circle cx={0} cy={16} r={0.8} fill="#FEF08A" />
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};
