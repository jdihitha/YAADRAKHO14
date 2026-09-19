import React from 'react';
import { SymbolType, GamePhase } from '../types';
import { FestiveIcon, SYMBOL_DEFINITIONS } from './FestiveIcons';

interface TargetBannerProps {
  targets: SymbolType[];
  solvedTargets: SymbolType[];
  phase: GamePhase;
  revealDurationMs: number;
}

export const TargetBanner: React.FC<TargetBannerProps> = ({
  targets,
  solvedTargets,
  phase,
  revealDurationMs,
}) => {
  // Format target title text e.g. "FLOWER + LOTUS"
  const targetNames = targets
    .map((s) => SYMBOL_DEFINITIONS[s]?.name?.toUpperCase() || s.toUpperCase())
    .join(' + ');

  return (
    <footer
      id="target-footer-banner"
      className="w-full max-w-xl mx-auto px-4 pb-4 pt-1 select-none relative z-10"
    >
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#881337] via-[#9A3412] to-[#78350F] text-amber-50 p-3.5 sm:p-4 border-2 border-amber-300 shadow-xl flex flex-col items-center justify-center">
        {/* Subtle background golden rangoli star grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#F59E0B_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none" />

        {/* Phase-specific header cue */}
        <div className="text-[11px] sm:text-xs uppercase tracking-widest font-black text-amber-200/90 mb-1 flex items-center gap-1.5 z-10">
          {phase === 'memorize' && (
            <span className="flex items-center gap-1.5 text-amber-200 font-black">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
              Memorize All Tiles!
            </span>
          )}
          {phase === 'covering' && <span>Covering tiles...</span>}
          {phase === 'mushak_moving' && (
            <span className="text-amber-300 animate-pulse flex items-center gap-1 font-black">
              🐾 Mushak is moving a tile! Watch the swap!
            </span>
          )}
          {phase === 'guessing' && (
            <span className="text-amber-200 tracking-wider">Your Turn</span>
          )}
          {phase === 'round_success' && (
            <span className="text-emerald-300 font-extrabold flex items-center gap-1">
              ✨ Shubh! Level Complete!
            </span>
          )}
        </div>

        {/* Main Target Headline */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-center z-10">
          <div className="text-sm sm:text-base font-black tracking-wide text-amber-50 flex items-center gap-2">
            <span className="text-amber-300 font-black tracking-wider uppercase">Find:</span>
            <span className="drop-shadow-xs">{targetNames}</span>
          </div>
        </div>

        {/* Visual badges for target items */}
        <div className="flex items-center gap-2.5 mt-2.5 z-10 flex-wrap justify-center">
          {targets.map((sym, idx) => {
            const isSolved = solvedTargets.includes(sym);
            const def = SYMBOL_DEFINITIONS[sym];
            return (
              <div
                key={`${sym}-${idx}`}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs sm:text-sm font-black transition-all duration-300 shadow-sm ${
                  isSolved
                    ? 'bg-emerald-600 border-emerald-300 text-white scale-105 shadow-emerald-900/40'
                    : 'bg-black/35 border-amber-300/70 text-amber-100 hover:border-amber-300'
                }`}
              >
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center p-0.5">
                  <FestiveIcon symbol={sym} size={20} className="w-5 h-5 drop-shadow-sm" />
                </div>
                <span>{def?.name}</span>
                {isSolved ? (
                  <span className="text-emerald-200 font-black ml-0.5 text-sm">✓</span>
                ) : (
                  <span className="w-2 h-2 rounded-full bg-amber-400 ml-0.5 animate-pulse" />
                )}
              </div>
            );
          })}
        </div>

        {/* Memorize countdown timer bar */}
        {phase === 'memorize' && (
          <div className="w-full max-w-xs h-2 bg-black/40 rounded-full mt-3 overflow-hidden border border-amber-300/40 z-10">
            <div
              className="h-full bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-200 rounded-full transition-all linear shadow-[0_0_8px_#FBBF24]"
              style={{
                width: '100%',
                animation: `shrinkWidth ${revealDurationMs}ms linear forwards`,
              }}
            />
          </div>
        )}
      </div>

      <style>{`
        @keyframes shrinkWidth {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </footer>
  );
};
