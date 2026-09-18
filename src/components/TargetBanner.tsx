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
  // Format target title text e.g. "Find MODAK + DIYA"
  const targetNames = targets
    .map((s) => SYMBOL_DEFINITIONS[s]?.name?.toUpperCase() || s.toUpperCase())
    .join(' + ');

  return (
    <footer
      id="target-footer-banner"
      className="w-full max-w-xl mx-auto px-4 pb-4 pt-1 select-none"
    >
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-900 via-red-900 to-amber-950 text-amber-50 p-3.5 sm:p-4 border-2 border-amber-400/70 shadow-lg flex flex-col items-center justify-center">
        {/* Subtle background golden pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#F59E0B_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />

        {/* Phase-specific header cue */}
        <div className="text-[11px] sm:text-xs uppercase tracking-widest font-bold text-amber-300/90 mb-1 flex items-center gap-1.5">
          {phase === 'memorize' && (
            <span className="flex items-center gap-1 text-amber-200">
              <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              Memorize All Tiles!
            </span>
          )}
          {phase === 'covering' && <span>Covering tiles...</span>}
          {phase === 'mushak_moving' && (
            <span className="text-amber-300 animate-pulse flex items-center gap-1">
              🐾 Mushak is moving a tile! Watch the swap!
            </span>
          )}
          {phase === 'guessing' && (
            <span className="text-amber-200">Your Turn</span>
          )}
          {phase === 'round_success' && (
            <span className="text-emerald-300 font-extrabold">
              ✨ Shubh! Target Complete!
            </span>
          )}
        </div>

        {/* Main Target Headline */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-center z-10">
          <div className="text-sm sm:text-base font-extrabold tracking-wide text-amber-100 flex items-center gap-1.5">
            <span className="text-amber-400 font-black">Find:</span>
            <span>{targetNames}</span>
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
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs sm:text-sm font-bold transition-all duration-300 ${
                  isSolved
                    ? 'bg-emerald-600/80 border-emerald-400 text-white shadow-sm scale-105'
                    : 'bg-amber-950/60 border-amber-400/60 text-amber-100'
                }`}
              >
                <FestiveIcon symbol={sym} size={20} className="w-5 h-5 drop-shadow-sm" />
                <span>{def?.name}</span>
                {isSolved ? (
                  <span className="text-emerald-200 ml-0.5">✓</span>
                ) : (
                  <span className="w-2 h-2 rounded-full bg-amber-400/60 ml-0.5" />
                )}
              </div>
            );
          })}
        </div>

        {/* Memorize countdown timer bar */}
        {phase === 'memorize' && (
          <div className="w-full max-w-xs h-1.5 bg-amber-950/80 rounded-full mt-2.5 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-400 to-yellow-300 rounded-full transition-all linear"
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
