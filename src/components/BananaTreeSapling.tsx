import React from 'react';

interface BananaTreeSaplingProps {
  side: 'left' | 'right';
  className?: string;
}

export const BananaTreeSapling: React.FC<BananaTreeSaplingProps> = ({ side, className = '' }) => {
  const isLeft = side === 'left';

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none flex flex-col items-center ${
        isLeft ? 'origin-bottom-left' : 'origin-bottom-right'
      } ${className}`}
      style={{
        animation: `${isLeft ? 'bananaTreeSwayLeft' : 'bananaTreeSwayRight'} ${
          isLeft ? '5.2s' : '5.8s'
        } ease-in-out infinite alternate`,
      }}
    >
      <svg
        viewBox="0 0 160 380"
        className="w-full h-auto max-h-[380px] drop-shadow-md"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: isLeft ? 'none' : 'scaleX(-1)' }}
      >
        <defs>
          {/* Leaf Gradients */}
          <linearGradient id="bananaLeafDark" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#15803D" />
            <stop offset="50%" stopColor="#16A34A" />
            <stop offset="100%" stopColor="#22C55E" />
          </linearGradient>

          <linearGradient id="bananaLeafLight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#16A34A" />
            <stop offset="40%" stopColor="#22C55E" />
            <stop offset="100%" stopColor="#86EFAC" />
          </linearGradient>

          <linearGradient id="bananaLeafTender" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22C55E" />
            <stop offset="60%" stopColor="#86EFAC" />
            <stop offset="100%" stopColor="#BBF7D0" />
          </linearGradient>

          {/* Stem/Trunk Gradients */}
          <linearGradient id="bananaStemGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#15803D" />
            <stop offset="35%" stopColor="#4ADE80" />
            <stop offset="70%" stopColor="#22C55E" />
            <stop offset="100%" stopColor="#166534" />
          </linearGradient>

          {/* Sacred Pot Gradient */}
          <linearGradient id="sacredPotGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#B45309" />
            <stop offset="50%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#92400E" />
          </linearGradient>
        </defs>

        {/* ================= BACKGROUND / REAR LEAVES ================= */}
        {/* Rear Deep Leaf (Arching high right) */}
        <g opacity="0.95">
          <path
            d="M80 160C85 110 115 65 148 42C150 40 148 48 135 68C122 88 102 120 90 170Z"
            fill="url(#bananaLeafDark)"
            stroke="#14532D"
            strokeWidth="1.5"
          />
          {/* Veins */}
          <path d="M96 142L116 116M108 120L130 92M118 96L142 66" stroke="#166534" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
        </g>

        {/* Rear Left Leaf (Spreading high left) */}
        <g opacity="0.95">
          <path
            d="M78 170C70 120 40 70 12 50C10 54 18 64 32 82C48 102 68 130 75 180Z"
            fill="url(#bananaLeafDark)"
            stroke="#14532D"
            strokeWidth="1.5"
          />
          {/* Veins */}
          <path d="M60 152L38 128M48 130L26 102M38 106L16 76" stroke="#166534" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
        </g>

        {/* ================= TENDER YOUNG CENTRAL SHOOT (KURUTHOLA) ================= */}
        <g>
          {/* Fresh upright rolled tender leaf tip */}
          <path
            d="M78 150C77 95 78 40 82 12C84 10 86 16 85 45C84 80 83 125 82 150Z"
            fill="url(#bananaLeafTender)"
            stroke="#15803D"
            strokeWidth="1.25"
          />
          {/* Spiral tip of tender sprout */}
          <path
            d="M82 12C85 8 89 12 87 18C85 22 82 20 83 16"
            stroke="#16A34A"
            strokeWidth="1.25"
            fill="none"
          />
        </g>

        {/* ================= MAIN LUSH DROOPING LEAVES ================= */}
        {/* Large Broad Leaf 1 - Arching sweeping Left */}
        <g>
          <path
            d="M78 190C65 160 30 140 2 145C-1 146 1 154 16 164C38 178 62 188 76 205Z"
            fill="url(#bananaLeafLight)"
            stroke="#166534"
            strokeWidth="1.5"
          />
          {/* Central thick leaf vein */}
          <path d="M78 190C50 170 25 152 2 145" stroke="#86EFAC" strokeWidth="2.5" strokeLinecap="round" />
          {/* Parallel Leaf Ribs */}
          <path d="M62 185L48 168M52 180L36 160M42 173L24 154M32 166L14 150" stroke="#15803D" strokeWidth="1" strokeLinecap="round" opacity="0.75" />
          <path d="M65 192L52 178M55 186L40 172M44 179L28 165M34 172L18 160" stroke="#4ADE80" strokeWidth="0.8" strokeLinecap="round" opacity="0.7" />
        </g>

        {/* Large Broad Leaf 2 - Graceful arching Right */}
        <g>
          <path
            d="M82 185C95 150 128 128 156 126C159 128 156 136 142 148C122 165 98 180 84 200Z"
            fill="url(#bananaLeafLight)"
            stroke="#166534"
            strokeWidth="1.5"
          />
          {/* Central thick leaf vein */}
          <path d="M82 185C110 160 135 140 156 126" stroke="#86EFAC" strokeWidth="2.5" strokeLinecap="round" />
          {/* Parallel Leaf Ribs */}
          <path d="M98 180L112 162M108 172L124 152M118 163L136 142M128 152L146 134" stroke="#15803D" strokeWidth="1" strokeLinecap="round" opacity="0.75" />
          <path d="M95 186L108 170M105 178L120 160M115 169L132 150M125 158L142 140" stroke="#4ADE80" strokeWidth="0.8" strokeLinecap="round" opacity="0.7" />
        </g>

        {/* Lower Drooping Leaf 3 - Left downwards */}
        <g>
          <path
            d="M76 220C55 210 25 215 8 238C6 241 12 242 28 236C48 228 66 226 76 230Z"
            fill="url(#bananaLeafDark)"
            stroke="#14532D"
            strokeWidth="1.5"
          />
          <path d="M76 220C50 216 28 225 8 238" stroke="#4ADE80" strokeWidth="2" strokeLinecap="round" />
          <path d="M58 221L44 214M48 223L32 218M38 227L22 225M28 231L14 233" stroke="#166534" strokeWidth="1" strokeLinecap="round" opacity="0.8" />
        </g>

        {/* Lower Drooping Leaf 4 - Right downwards */}
        <g>
          <path
            d="M84 218C105 208 132 210 152 230C154 233 148 236 132 232C112 226 94 225 84 228Z"
            fill="url(#bananaLeafDark)"
            stroke="#14532D"
            strokeWidth="1.5"
          />
          <path d="M84 218C110 214 130 220 152 230" stroke="#4ADE80" strokeWidth="2" strokeLinecap="round" />
          <path d="M100 220L115 215M112 223L128 220M122 226L138 225M132 230L146 232" stroke="#166534" strokeWidth="1" strokeLinecap="round" opacity="0.8" />
        </g>

        {/* ================= NATURAL BANANA STEM / TRUNK (LAYERED PSEUDOSTEM) ================= */}
        {/* Main Trunk Base */}
        <path
          d="M72 175 C73 210 70 270 68 335 L92 335 C90 270 87 210 88 175 Z"
          fill="url(#bananaStemGrad)"
          stroke="#14532D"
          strokeWidth="2"
        />

        {/* Layered Leaf Sheaths on Trunk */}
        <path d="M72 205C78 212 82 212 88 205" stroke="#14532D" strokeWidth="2" fill="none" />
        <path d="M71 235C78 243 83 243 89 235" stroke="#14532D" strokeWidth="2" fill="none" />
        <path d="M70 268C78 276 83 276 90 268" stroke="#14532D" strokeWidth="2" fill="none" />
        <path d="M69 300C78 308 83 308 91 300" stroke="#14532D" strokeWidth="2" fill="none" />

        {/* Auspicious Sacred Raksha Thread / Mauli tied around the sapling */}
        {/* Upper Festive Red-Gold Ribbon */}
        <g>
          <rect x="70" y="248" width="20" height="7" rx="2" fill="#DC2626" stroke="#991B1B" strokeWidth="1" />
          <line x1="70" y1="251.5" x2="90" y2="251.5" stroke="#FBBF24" strokeWidth="2" strokeDasharray="3 2" />
          {/* Little holy bow knot */}
          <circle cx="80" cy="251.5" r="2.5" fill="#FBBF24" stroke="#B45309" strokeWidth="0.8" />
          <path d="M80 254C78 260 76 264 74 268M80 254C82 260 84 264 86 268" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round" />
        </g>

        {/* Lower Sacred Ribbon */}
        <g>
          <rect x="68.5" y="285" width="23" height="7" rx="2" fill="#EA580C" stroke="#9A3412" strokeWidth="1" />
          <line x1="68.5" y1="288.5" x2="91.5" y2="288.5" stroke="#FEF08A" strokeWidth="2" strokeDasharray="3 2" />
        </g>

        {/* ================= AUSPICIOUS EARTHEN POT / VASE BASE ================= */}
        {/* Decorative Terracotta Pooja Pot with Turmeric & Kumkum */}
        <g>
          {/* Pot Rim */}
          <ellipse cx="80" cy="335" rx="24" ry="5.5" fill="#F59E0B" stroke="#78350F" strokeWidth="1.5" />
          {/* Pot Body */}
          <path
            d="M58 337C55 352 62 372 80 372C98 372 105 352 102 337Z"
            fill="url(#sacredPotGrad)"
            stroke="#78350F"
            strokeWidth="2"
          />
          {/* Auspicious Swastika / Kumkum mark on pot */}
          <g transform="translate(80, 354)">
            {/* Center sacred red dot */}
            <circle cx="0" cy="0" r="3.5" fill="#DC2626" />
            <circle cx="0" cy="0" r="1.5" fill="#FEF08A" />
            {/* Yellow Chandan Ring */}
            <circle cx="0" cy="0" r="6" stroke="#FBBF24" strokeWidth="1.5" strokeDasharray="2 2" fill="none" />
          </g>
          {/* Base shadow */}
          <ellipse cx="80" cy="374" rx="22" ry="4" fill="#78350F" fillOpacity="0.25" />
        </g>
      </svg>
    </div>
  );
};
