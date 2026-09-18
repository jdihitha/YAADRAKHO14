import React from 'react';
import { RotateCcw, Volume2, VolumeX } from 'lucide-react';

interface TopBarProps {
  score: number;
  lives: number;
  maxLives?: number;
  round: number;
  isMuted: boolean;
  onToggleMute: () => void;
  onRestart: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  score,
  lives,
  maxLives = 3,
  round,
  isMuted,
  onToggleMute,
  onRestart,
}) => {
  return (
    <header className="w-full max-w-xl mx-auto px-4 pt-3 pb-2 select-none" id="game-top-bar">
      {/* Top action utilities row */}
      <div className="flex items-center justify-between text-xs text-amber-900/80 mb-2 font-semibold">
        <div className="flex items-center gap-1.5 tracking-wider uppercase text-[11px] font-black text-amber-950">
          <span className="w-2 h-2 rounded-full bg-amber-500 inline-block animate-pulse"></span>
          JUDAM
        </div>

        <div className="flex items-center gap-2">
          <button
            id="sound-toggle-btn"
            onClick={onToggleMute}
            aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
            className="p-1.5 rounded-full text-amber-800 hover:text-amber-950 hover:bg-amber-100/60 transition-colors focus:outline-none"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <button
            id="restart-game-btn"
            onClick={onRestart}
            aria-label="Restart game"
            className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold text-amber-900 bg-amber-100/80 hover:bg-amber-200/80 transition-colors border border-amber-300/60"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restart</span>
          </button>
        </div>
      </div>

      {/* Main minimal stats banner: Score | ❤️ Lives | Round */}
      <div
        id="stats-panel"
        className="flex items-center justify-between px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border border-amber-200/80 shadow-[0_2px_8px_rgba(217,119,6,0.08)]"
      >
        {/* Score */}
        <div className="flex flex-col">
          <span className="text-[11px] uppercase tracking-wider font-bold text-amber-700/90">
            Score
          </span>
          <span className="text-xl sm:text-2xl font-black text-red-900 tracking-tight">
            {score.toLocaleString()}
          </span>
        </div>

        {/* Divider */}
        <div className="h-8 w-px bg-amber-200/80" />

        {/* Lives */}
        <div className="flex flex-col items-center">
          <span className="text-[11px] uppercase tracking-wider font-bold text-amber-700/90">
            Lives
          </span>
          <div className="flex items-center gap-1 mt-0.5" id="lives-display">
            {Array.from({ length: maxLives }).map((_, i) => (
              <span
                key={i}
                className={`text-lg transition-all duration-300 transform ${
                  i < lives
                    ? 'opacity-100 scale-100 drop-shadow-[0_1px_2px_rgba(220,38,38,0.3)]'
                    : 'opacity-25 grayscale scale-90'
                }`}
              >
                ❤️
              </span>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-8 w-px bg-amber-200/80" />

        {/* Round */}
        <div className="flex flex-col items-end">
          <span className="text-[11px] uppercase tracking-wider font-bold text-amber-700/90">
            Round
          </span>
          <span className="text-xl sm:text-2xl font-black text-amber-900 tracking-tight">
            {round}
          </span>
        </div>
      </div>
    </header>
  );
};
