import React from 'react';
import { GaneshaHero } from './FestiveIcons';

interface StartScreenProps {
  onStart: () => void;
  bestScore: number;
}

export const StartScreen: React.FC<StartScreenProps> = ({ onStart, bestScore }) => {
  return (
    <div className="relative w-full max-w-md mx-auto px-5 py-6 sm:py-8 flex flex-col items-center justify-center text-center my-auto select-none">
      {/* Gentle floating petals in background (light and airy) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <span
          className="absolute top-[8%] left-[12%] text-amber-500/60 text-lg sm:text-xl"
          style={{ animation: 'petalDriftOne 18s ease-in-out infinite' }}
        >
          🌸
        </span>
        <span
          className="absolute top-[20%] right-[14%] text-orange-400/50 text-base sm:text-lg"
          style={{ animation: 'petalDriftTwo 22s ease-in-out 2s infinite' }}
        >
          🌼
        </span>
        <span
          className="absolute bottom-[26%] left-[10%] text-amber-400/50 text-base"
          style={{ animation: 'petalDriftThree 20s ease-in-out 1s infinite' }}
        >
          🌸
        </span>
        <span
          className="absolute bottom-[20%] right-[12%] text-orange-500/50 text-base"
          style={{ animation: 'petalDriftOne 24s ease-in-out 3s infinite' }}
        >
          🌼
        </span>
      </div>

      {/* Cute Baal Ganesha with warm soft aura */}
      <div className="relative mb-3 flex items-center justify-center">
        {/* Soft glowing aura */}
        <div className="absolute w-44 h-44 sm:w-52 sm:h-52 rounded-full bg-gradient-to-b from-amber-300/40 via-orange-200/25 to-transparent blur-xl pointer-events-none" />

        {/* Cute Ganesha Floating */}
        <div
          className="drop-shadow-md"
          style={{ animation: 'ganeshaFloat 3.5s ease-in-out infinite' }}
        >
          <GaneshaHero size={145} className="w-34 h-34 sm:w-40 sm:h-40" />
        </div>
      </div>

      {/* Title: JUDAM */}
      <h1
        className="text-4xl sm:text-5xl font-black text-[#5C1304] tracking-wider uppercase mb-1 drop-shadow-xs"
        style={{ fontFamily: "'Cinzel Decorative', serif" }}
      >
        JUDAM
      </h1>

      {/* Tagline: Watch. Remember. Find. */}
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs text-amber-500">◆</span>
        <p className="text-sm sm:text-base font-extrabold text-amber-900 tracking-wider">
          Watch. Remember. Find.
        </p>
        <span className="text-xs text-amber-500">◆</span>
      </div>

      {/* Short description */}
      <p className="text-xs sm:text-sm font-medium text-amber-950/80 max-w-xs mb-4 leading-relaxed">
        A festive memory challenge where every card can change.
      </p>

      {/* Best Score Badge */}
      <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/90 border border-amber-300/80 text-amber-950 text-xs font-bold shadow-xs mb-5">
        <span className="text-sm">🏆</span>
        <span>Best Score:</span>
        <span className="font-black text-red-900 text-sm">
          {bestScore > 0 ? bestScore.toLocaleString() : '0'}
        </span>
      </div>

      {/* Big Juicy PLAY Button */}
      <button
        id="play-game-btn"
        onClick={onStart}
        className="w-full max-w-xs py-3.5 px-8 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 hover:from-amber-600 hover:via-orange-600 hover:to-red-700 active:scale-95 text-white font-black text-lg tracking-widest uppercase shadow-md shadow-orange-500/25 border-2 border-amber-300 hover:border-amber-200 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2.5 mb-6"
      >
        <span>PLAY</span>
        <span className="text-xl">→</span>
      </button>

      {/* Compact & Clean HOW TO PLAY Card */}
      <div className="w-full max-w-sm rounded-2xl bg-amber-50/80 border border-amber-200/90 p-3 sm:p-4 shadow-xs text-left">
        <div className="flex items-center justify-center gap-2 mb-2.5">
          <span className="h-px w-6 bg-amber-300" />
          <h3 className="text-[11px] sm:text-xs font-black text-amber-950 uppercase tracking-widest">
            HOW TO PLAY
          </h3>
          <span className="h-px w-6 bg-amber-300" />
        </div>

        <div className="grid grid-cols-3 gap-2">
          {/* Watch */}
          <div className="flex flex-col items-center text-center p-2 rounded-xl bg-white/80 border border-amber-200/50 shadow-2xs">
            <span className="text-lg sm:text-xl mb-1">👀</span>
            <span className="text-xs font-bold text-red-950 mb-0.5">Watch</span>
            <p className="text-[10px] sm:text-[11px] text-amber-900/90 leading-tight">
              Remember cards
            </p>
          </div>

          {/* Remember */}
          <div className="flex flex-col items-center text-center p-2 rounded-xl bg-white/80 border border-amber-200/50 shadow-2xs">
            <span className="text-lg sm:text-xl mb-1">🧠</span>
            <span className="text-xs font-bold text-red-950 mb-0.5">Remember</span>
            <p className="text-[10px] sm:text-[11px] text-amber-900/90 leading-tight">
              Cards disappear
            </p>
          </div>

          {/* Find */}
          <div className="flex flex-col items-center text-center p-2 rounded-xl bg-white/80 border border-amber-200/50 shadow-2xs">
            <span className="text-lg sm:text-xl mb-1">🐭</span>
            <span className="text-xs font-bold text-red-950 mb-0.5">Find</span>
            <p className="text-[10px] sm:text-[11px] text-amber-900/90 leading-tight">
              Before Mushak tricks!
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes ganeshaFloat {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        @keyframes petalDriftOne {
          0% {
            transform: translate(0px, 0px) rotate(0deg);
            opacity: 0.35;
          }
          50% {
            transform: translate(10px, 12px) rotate(18deg);
            opacity: 0.65;
          }
          100% {
            transform: translate(0px, 0px) rotate(0deg);
            opacity: 0.35;
          }
        }
        @keyframes petalDriftTwo {
          0% {
            transform: translate(0px, 0px) rotate(0deg);
            opacity: 0.4;
          }
          50% {
            transform: translate(-12px, 10px) rotate(-22deg);
            opacity: 0.7;
          }
          100% {
            transform: translate(0px, 0px) rotate(0deg);
            opacity: 0.4;
          }
        }
        @keyframes petalDriftThree {
          0% {
            transform: translate(0px, 0px) rotate(0deg);
            opacity: 0.3;
          }
          50% {
            transform: translate(8px, -10px) rotate(15deg);
            opacity: 0.6;
          }
          100% {
            transform: translate(0px, 0px) rotate(0deg);
            opacity: 0.3;
          }
        }
      `}</style>
    </div>
  );
};
