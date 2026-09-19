import React from 'react';
import { TileItem } from '../types';
import { FestiveIcon, SYMBOL_DEFINITIONS } from './FestiveIcons';

interface TileCardProps {
  tile: TileItem;
  canClick: boolean;
  onClick: () => void;
  sizeClass?: string;
}

export const TileCard: React.FC<TileCardProps> = ({
  tile,
  canClick,
  onClick,
  sizeClass = 'h-24 sm:h-28 md:h-32',
}) => {
  const symbolDef = SYMBOL_DEFINITIONS[tile.symbol];

  return (
    <div
      className={`relative w-full ${sizeClass} perspective-800 select-none cursor-pointer transition-transform active:scale-95 ${
        tile.isShaking ? 'animate-[shake_0.4s_ease-in-out]' : ''
      }`}
      onClick={() => {
        if (canClick && !tile.isMatched && !tile.isRevealed) {
          onClick();
        }
      }}
    >
      <div
        className={`relative w-full h-full duration-500 transition-transform transform-style-3d rounded-2xl shadow-md hover:shadow-lg ${
          tile.isRevealed || tile.isMatched ? 'rotate-y-180' : ''
        } ${
          tile.isHighlightSwap
            ? 'ring-4 ring-amber-400 ring-offset-2 ring-offset-orange-100 scale-[1.04] shadow-xl shadow-amber-500/30'
            : ''
        } ${
          tile.isMatched
            ? 'ring-2 ring-emerald-500 ring-offset-1 shadow-emerald-500/20'
            : ''
        }`}
      >
        {/* ================= CARD BACK (ROYAL SAFFRON & RUBY GOLD LACQUER) ================= */}
        <div
          className="absolute inset-0 w-full h-full rounded-2xl backface-hidden flex flex-col items-center justify-center p-2 sm:p-2.5 overflow-hidden border-2 border-amber-300 bg-gradient-to-br from-[#991B1B] via-[#C2410C] to-[#781B09] text-amber-100 shadow-lg"
        >
          {/* Diagonal Glass/Satin Sheen Highlight */}
          <div
            className="absolute -top-12 -left-12 w-32 h-44 bg-gradient-to-br from-white/25 via-white/10 to-transparent rotate-12 pointer-events-none rounded-3xl"
          />

          {/* Traditional radial rangoli background watermark */}
          <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-200 via-transparent to-black" />

          {/* Inner Golden Inlay Filigree Border */}
          <div className="w-full h-full rounded-xl border border-amber-300/70 flex flex-col items-center justify-center relative p-1">
            {/* Corner Ornamental Golden Studs */}
            <span className="absolute top-1 left-1 w-1.5 h-1.5 rounded-full bg-amber-300 shadow-[0_0_4px_#F59E0B]" />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-amber-300 shadow-[0_0_4px_#F59E0B]" />
            <span className="absolute bottom-1 left-1 w-1.5 h-1.5 rounded-full bg-amber-300 shadow-[0_0_4px_#F59E0B]" />
            <span className="absolute bottom-1 right-1 w-1.5 h-1.5 rounded-full bg-amber-300 shadow-[0_0_4px_#F59E0B]" />

            {/* Corner Filigree L-Brackets */}
            <span className="absolute top-1.5 left-1.5 w-3 h-3 border-t border-l border-amber-200/60 rounded-tl-sm pointer-events-none" />
            <span className="absolute top-1.5 right-1.5 w-3 h-3 border-t border-r border-amber-200/60 rounded-tr-sm pointer-events-none" />
            <span className="absolute bottom-1.5 left-1.5 w-3 h-3 border-b border-l border-amber-200/60 rounded-bl-sm pointer-events-none" />
            <span className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b border-r border-amber-200/60 rounded-br-sm pointer-events-none" />

            {/* Auspicious Center Medallion (Sacred 8-Petal Chakra) */}
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-amber-400/30 to-red-950/60 border-1.5 border-amber-300/80 flex items-center justify-center shadow-inner relative">
              {/* Outer Golden Petal Ring */}
              <svg viewBox="0 0 40 40" className="w-8 h-8 sm:w-10 sm:h-10 fill-none stroke-amber-200/80">
                <circle cx="20" cy="20" r="14" strokeWidth="1" strokeDasharray="3 2" />
                {/* 8 rays */}
                {[0, 45, 90, 135, 180, 225, 270, 315].map((ang) => (
                  <line
                    key={ang}
                    x1="20"
                    y1="6"
                    x2="20"
                    y2="10"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    stroke="#FDE68A"
                    transform={`rotate(${ang} 20 20)`}
                  />
                ))}
                {/* Center sparkling jewel star */}
                <circle cx="20" cy="20" r="4.5" fill="#FBBF24" />
                <circle cx="20" cy="20" r="2.2" fill="#DC2626" />
              </svg>
            </div>

            {/* Embossed Metallic Gold Title */}
            <span
              className="text-[10px] sm:text-[11px] font-black text-amber-100 mt-1 uppercase tracking-[0.16em] drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)]"
              style={{ fontFamily: "'Cinzel Decorative', serif" }}
            >
              YAADRAKHO
            </span>
          </div>
        </div>

        {/* ================= CARD FRONT (WARM IVORY-SILK REVEALED FACE) ================= */}
        <div
          className={`absolute inset-0 w-full h-full rounded-2xl backface-hidden rotate-y-180 flex flex-col items-center justify-center p-2 border-2 shadow-inner ${
            tile.isMatched
              ? 'border-emerald-500 bg-gradient-to-b from-[#F0FDF4] to-[#DCFCE7]'
              : 'border-amber-400 bg-gradient-to-b from-[#FFFFFF] via-[#FFFDF5] to-[#FEF3C7]'
          }`}
        >
          {/* Inner subtle frame */}
          <div className="w-full h-full rounded-xl flex flex-col items-center justify-center p-1 relative">
            {tile.isMatched && (
              <span className="absolute top-0.5 right-0.5 bg-emerald-600 text-white rounded-full p-0.5 text-[10px] font-black leading-none shadow-sm flex items-center justify-center w-4 h-4">
                ✓
              </span>
            )}

            {/* The Festive Icon with Soft Luminous Aura */}
            <div className="flex-1 flex items-center justify-center min-h-0 relative">
              <div className="absolute w-12 h-12 rounded-full bg-amber-200/30 blur-xs pointer-events-none" />
              <FestiveIcon
                symbol={tile.symbol}
                size={42}
                className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 drop-shadow-sm relative z-10"
              />
            </div>

            {/* Symbol Name Label Badge */}
            <span
              className={`text-[9px] sm:text-[11px] md:text-xs font-black tracking-tight px-2 py-0.5 rounded-full truncate max-w-full text-center shadow-xs border ${
                tile.isMatched
                  ? 'bg-emerald-200/90 border-emerald-300 text-emerald-950'
                  : 'bg-amber-100 border-amber-300/80 text-amber-950'
              }`}
            >
              {symbolDef.name}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
