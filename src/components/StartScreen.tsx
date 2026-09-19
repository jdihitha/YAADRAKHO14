import React from 'react';
import { EatingVinayaka } from './EatingVinayaka';
import { BananaTreeSapling } from './BananaTreeSapling';
import { FestiveToranBanner } from './FestiveToranBanner';

interface StartScreenProps {
  onStart: () => void;
  bestScore: number;
  isMuted?: boolean;
  onToggleMute?: () => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({
  onStart,
  bestScore,
  isMuted,
  onToggleMute,
}) => {
  return (
    <div className="relative w-full min-h-screen flex flex-col justify-between items-center select-none overflow-x-hidden">
      {/* 1. Auspicious Festive Toran Header Banner (From User Request: Shree Ganeshaya Namah with Lights & Mango Leaves) */}
      <FestiveToranBanner isMuted={isMuted} onToggleMute={onToggleMute} />

      {/* 2. Banana Tree Saplings Framing the Left and Right of Home Page */}
      {/* Left Banana Tree Sapling */}
      <div className="fixed -bottom-6 sm:bottom-0 left-[-15px] sm:left-2 md:left-6 lg:left-12 z-10 w-24 sm:w-36 md:w-44 lg:w-56 pointer-events-none transition-all">
        <BananaTreeSapling side="left" />
      </div>

      {/* Right Banana Tree Sapling */}
      <div className="fixed -bottom-6 sm:bottom-0 right-[-15px] sm:right-2 md:right-6 lg:right-12 z-10 w-24 sm:w-36 md:w-44 lg:w-56 pointer-events-none transition-all">
        <BananaTreeSapling side="right" />
      </div>

      {/* Gentle floating marigold & rose petals in background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <span
          className="absolute top-[12%] left-[18%] text-amber-500/60 text-lg sm:text-xl"
          style={{ animation: 'petalDriftOne 18s ease-in-out infinite' }}
        >
          🌸
        </span>
        <span
          className="absolute top-[22%] right-[20%] text-orange-400/50 text-base sm:text-lg"
          style={{ animation: 'petalDriftTwo 22s ease-in-out 2s infinite' }}
        >
          🌼
        </span>
        <span
          className="absolute bottom-[30%] left-[16%] text-amber-400/50 text-base"
          style={{ animation: 'petalDriftThree 20s ease-in-out 1s infinite' }}
        >
          🌸
        </span>
        <span
          className="absolute bottom-[24%] right-[18%] text-orange-500/50 text-base"
          style={{ animation: 'petalDriftOne 24s ease-in-out 3s infinite' }}
        >
          🌼
        </span>
        <span
          className="absolute top-[48%] left-[8%] text-amber-600/40 text-sm hidden sm:inline"
          style={{ animation: 'petalDriftTwo 19s ease-in-out 1s infinite' }}
        >
          ✨
        </span>
        <span
          className="absolute top-[52%] right-[10%] text-amber-600/40 text-sm hidden sm:inline"
          style={{ animation: 'petalDriftThree 21s ease-in-out 4s infinite' }}
        >
          ✨
        </span>
      </div>

      {/* Main Home Content Column */}
      <div className="relative z-20 w-full max-w-md mx-auto px-4 py-4 sm:py-6 flex flex-col items-center justify-center text-center my-auto">
        {/* 3. Lord Vinayaka with Eating Modak and Undrallu Animation & Munching Sound! */}
        <div className="mb-2">
          <EatingVinayaka />
        </div>

        {/* 4. Title: YAADRAKHO (Updated from Judam) */}
        <h1
          className="text-4xl sm:text-5xl font-black text-[#5C1304] tracking-wider uppercase mb-1 drop-shadow-xs"
          style={{ fontFamily: "'Cinzel Decorative', serif" }}
        >
          YAADRAKHO
        </h1>

        {/* Tagline: Watch. Remember. Find. */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-amber-500">◆</span>
          <p className="text-sm sm:text-base font-extrabold text-amber-900 tracking-wider">
            Watch. Remember. Find.
          </p>
          <span className="text-xs text-amber-500">◆</span>
        </div>

        {/* Short description with 3 levels highlight */}
        <p className="text-xs sm:text-sm font-medium text-amber-950/80 max-w-xs mb-2 leading-relaxed">
          A festive memory challenge where cards shift!
        </p>

        {/* 3 Levels Roadmap Badge */}
        <div className="flex items-center justify-center gap-1.5 px-3 py-1 rounded-full bg-amber-200/80 border border-amber-300 text-amber-950 text-[11px] font-black tracking-wide mb-3">
          <span>L1: 6 cards (2)</span>
          <span className="text-amber-500">•</span>
          <span>L2: 7 cards (2)</span>
          <span className="text-amber-500">•</span>
          <span>L3: 8 cards (3)</span>
        </div>

        {/* Best Score Badge */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/90 border border-amber-300/80 text-amber-950 text-xs font-bold shadow-xs mb-4">
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
          className="w-full max-w-xs py-3.5 px-8 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 hover:from-amber-600 hover:via-orange-600 hover:to-red-700 active:scale-95 text-white font-black text-lg tracking-widest uppercase shadow-md shadow-orange-500/25 border-2 border-amber-300 hover:border-amber-200 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2.5 mb-5"
        >
          <span>PLAY</span>
          <span className="text-xl">→</span>
        </button>

        {/* Compact & Clean HOW TO PLAY Card */}
        <div className="w-full max-w-sm rounded-2xl bg-amber-50/85 backdrop-blur-xs border border-amber-200/90 p-3 sm:p-3.5 shadow-xs text-left mb-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="h-px w-6 bg-amber-300" />
            <h3 className="text-[11px] sm:text-xs font-black text-amber-950 uppercase tracking-widest">
              HOW TO PLAY
            </h3>
            <span className="h-px w-6 bg-amber-300" />
          </div>

          <div className="grid grid-cols-3 gap-2">
            {/* Watch */}
            <div className="flex flex-col items-center text-center p-2 rounded-xl bg-white/90 border border-amber-200/50 shadow-2xs">
              <span className="text-lg sm:text-xl mb-1">👀</span>
              <span className="text-xs font-bold text-red-950 mb-0.5">Watch</span>
              <p className="text-[10px] sm:text-[11px] text-amber-900/90 leading-tight">
                Remember cards
              </p>
            </div>

            {/* Remember */}
            <div className="flex flex-col items-center text-center p-2 rounded-xl bg-white/90 border border-amber-200/50 shadow-2xs">
              <span className="text-lg sm:text-xl mb-1">🧠</span>
              <span className="text-xs font-bold text-red-950 mb-0.5">Remember</span>
              <p className="text-[10px] sm:text-[11px] text-amber-900/90 leading-tight">
                Cards flip back
              </p>
            </div>

            {/* Find */}
            <div className="flex flex-col items-center text-center p-2 rounded-xl bg-white/90 border border-amber-200/50 shadow-2xs">
              <span className="text-lg sm:text-xl mb-1">🐭</span>
              <span className="text-xs font-bold text-red-950 mb-0.5">Find</span>
              <p className="text-[10px] sm:text-[11px] text-amber-900/90 leading-tight">
                Before Mushak tricks!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom festive footer bar */}
      <footer className="w-full relative z-20 pb-2 text-center text-[11px] text-amber-900/70 font-semibold">
        Jai Ganesh • Happy Ganesh Chaturthi 🪔
      </footer>

      {/* Custom Keyframe animations for Banana tree sway and floating elements */}
      <style>{`
        @keyframes bananaTreeSwayLeft {
          0% {
            transform: rotate(0deg) skewX(0deg);
          }
          50% {
            transform: rotate(1.8deg) skewX(1deg);
          }
          100% {
            transform: rotate(-1.2deg) skewX(-0.8deg);
          }
        }
        @keyframes bananaTreeSwayRight {
          0% {
            transform: rotate(0deg) skewX(0deg);
          }
          50% {
            transform: rotate(-1.8deg) skewX(-1deg);
          }
          100% {
            transform: rotate(1.2deg) skewX(0.8deg);
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
