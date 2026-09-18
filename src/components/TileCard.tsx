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
        className={`relative w-full h-full duration-500 transition-transform transform-style-3d rounded-2xl shadow-sm hover:shadow-md ${
          tile.isRevealed || tile.isMatched ? 'rotate-y-180' : ''
        } ${
          tile.isHighlightSwap
            ? 'ring-4 ring-amber-400/90 ring-offset-2 ring-offset-orange-100 scale-[1.03] shadow-lg shadow-amber-500/20'
            : ''
        } ${
          tile.isMatched
            ? 'ring-2 ring-emerald-500/70 ring-offset-1'
            : ''
        }`}
      >
        {/* ================= CARD BACK (COVERED) ================= */}
        <div
          className="absolute inset-0 w-full h-full rounded-2xl backface-hidden flex flex-col items-center justify-center p-2.5 overflow-hidden border-2 border-amber-300/80 bg-gradient-to-br from-amber-700 via-red-800 to-amber-900 text-amber-100 shadow-inner"
        >
          {/* Subtle decorative rangoli background pattern */}
          <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-200 via-transparent to-black" />
          
          {/* Inner golden decorative border */}
          <div className="w-full h-full rounded-xl border border-amber-400/50 flex flex-col items-center justify-center relative p-1">
            {/* Corner ornamental dots */}
            <span className="absolute top-1.5 left-1.5 w-1.5 h-1.5 rounded-full bg-amber-300 opacity-70" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-amber-300 opacity-70" />
            <span className="absolute bottom-1.5 left-1.5 w-1.5 h-1.5 rounded-full bg-amber-300 opacity-70" />
            <span className="absolute bottom-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-amber-300 opacity-70" />

            {/* Auspicious center motif */}
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-amber-500/20 border border-amber-300/60 flex items-center justify-center text-amber-200">
              <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6 fill-amber-300" opacity="0.9">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" opacity="0.2" />
                <circle cx="12" cy="12" r="4" fill="#FBBF24" />
                <path d="M12 4V8M12 16V20M4 12H8M16 12H20" stroke="#FDE68A" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>

            {/* Card back branding */}
            <span className="text-[10px] sm:text-xs font-black text-amber-200/80 mt-1 uppercase tracking-widest">
              JUDAM
            </span>
          </div>
        </div>

        {/* ================= CARD FRONT (REVEALED) ================= */}
        <div
          className={`absolute inset-0 w-full h-full rounded-2xl backface-hidden rotate-y-180 flex flex-col items-center justify-center p-2 border-2 bg-gradient-to-b from-[#FFFDF8] to-[#FFF6E6] shadow-inner ${
            tile.isMatched
              ? 'border-emerald-500 bg-emerald-50/40'
              : 'border-amber-400'
          }`}
        >
          {/* Inner subtle frame */}
          <div className="w-full h-full rounded-xl flex flex-col items-center justify-center p-1 relative">
            {tile.isMatched && (
              <span className="absolute top-1 right-1 bg-emerald-500 text-white rounded-full p-0.5 text-[10px] leading-none shadow-sm">
                ✓
              </span>
            )}
            {/* The festive icon */}
            <div className="flex-1 flex items-center justify-center min-h-0">
              <FestiveIcon symbol={tile.symbol} size={40} className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 drop-shadow-sm" />
            </div>

            {/* Symbol Name Label */}
            <span
              className={`text-[9px] sm:text-[11px] md:text-xs font-bold tracking-tight px-1.5 py-0.5 rounded-full truncate max-w-full text-center ${
                tile.isMatched
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-amber-100/80 text-amber-900'
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
