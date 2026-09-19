import React from 'react';
import { FestiveIcon } from './FestiveIcons';

interface GameOverModalProps {
  score: number;
  bestScore: number;
  round: number;
  isVictory?: boolean;
  onPlayAgain?: () => void;
  onRestart?: () => void;
  onHome?: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  score,
  bestScore,
  round,
  isVictory = false,
  onPlayAgain,
  onRestart,
  onHome,
}) => {
  const isNewBest = score > 0 && score >= bestScore;

  const handleAction = () => {
    if (onPlayAgain) {
      onPlayAgain();
    } else if (onRestart) {
      onRestart();
    }
  };

  return (
    <div
      id="game-over-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs select-none"
    >
      <div className="w-full max-w-sm rounded-3xl bg-gradient-to-b from-[#FFFDF7] to-[#FEF3C7] border-2 border-amber-400 p-6 sm:p-7 shadow-2xl flex flex-col items-center text-center animate-[floatBob_4s_ease-in-out_infinite]">
        {/* Festive top icon */}
        <div className={`w-16 h-16 rounded-2xl ${isVictory ? 'bg-gradient-to-br from-emerald-600 to-amber-500' : 'bg-gradient-to-br from-red-600 to-amber-600'} flex items-center justify-center p-0.5 shadow-md mb-3`}>
          <div className="w-full h-full rounded-[14px] bg-amber-50 flex items-center justify-center">
            <FestiveIcon symbol={isVictory ? 'modak' : 'diya'} size={38} className="w-10 h-10" />
          </div>
        </div>

        {/* Heading */}
        <h2
          className={`text-2xl sm:text-3xl font-black ${isVictory ? 'text-amber-900' : 'text-red-950'} tracking-wider uppercase mb-1`}
          style={{ fontFamily: "'Cinzel Decorative', serif" }}
        >
          {isVictory ? 'SHUBH VICTORY!' : 'GAME OVER'}
        </h2>

        <p className="text-xs font-bold text-amber-900/80 mb-2">
          {isVictory
            ? 'All 3 Levels Mastered! Lord Ganesha Blessings! ✨'
            : 'Mushak got the better of you! Try again!'}
        </p>

        {isNewBest && (
          <div className="mb-3 px-3 py-1 rounded-full bg-amber-400 text-amber-950 text-xs font-black tracking-wider uppercase shadow-xs">
            🎉 New Best Score!
          </div>
        )}

        {/* Score Breakdown Card */}
        <div className="w-full rounded-2xl bg-amber-100/70 border border-amber-300/80 p-4 my-3 flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-amber-900">Score:</span>
            <span className="text-xl font-black text-red-900 tracking-tight">
              {score.toLocaleString()}
            </span>
          </div>

          <div className="h-px bg-amber-300/60" />

          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-amber-900">Best Score:</span>
            <span className="text-xl font-black text-amber-950 tracking-tight">
              {bestScore.toLocaleString()}
            </span>
          </div>

          <div className="h-px bg-amber-300/60" />

          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-amber-900">Level Progress:</span>
            <span className="text-sm sm:text-base font-black text-amber-950 tracking-tight">
              {isVictory ? 'Level 3 / 3 (Completed! 🏆)' : `Level ${round} / 3`}
            </span>
          </div>
        </div>

        {/* PLAY AGAIN button */}
        <button
          id="play-again-btn"
          type="button"
          onClick={handleAction}
          className={`w-full mt-2 py-3.5 px-6 rounded-2xl ${
            isVictory
              ? 'bg-gradient-to-r from-emerald-600 via-amber-500 to-orange-600 hover:from-emerald-700 hover:via-amber-600 hover:to-orange-700 border-b-4 border-emerald-900'
              : 'bg-gradient-to-r from-red-700 via-orange-600 to-amber-600 hover:from-red-800 hover:via-orange-700 hover:to-amber-700 border-b-4 border-red-900'
          } text-white font-black text-base uppercase tracking-wider shadow-lg hover:shadow-xl active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2`}
        >
          <span>↺</span>
          <span>{isVictory ? 'PLAY AGAIN' : 'TRY AGAIN'}</span>
        </button>

        {/* Optional Home button */}
        {onHome && (
          <button
            type="button"
            onClick={onHome}
            className="mt-3 text-xs font-bold text-amber-900/80 hover:text-amber-950 underline underline-offset-4 cursor-pointer py-1"
          >
            ← Back to Home
          </button>
        )}
      </div>
    </div>
  );
};
