import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { GaneshaHero, FestiveIcon } from './FestiveIcons';
import { soundFx } from '../utils/audio';

interface FestiveWishModalProps {
  onProceed: () => void;
}

export const FestiveWishModal: React.FC<FestiveWishModalProps> = ({ onProceed }) => {
  const [countdown, setCountdown] = useState<number>(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onProceed();
          return 0;
        }
        return prev - 1;
      });
    }, 900);

    return () => clearInterval(timer);
  }, [onProceed]);

  const handleManualProceed = () => {
    soundFx.unlockAudio();
    soundFx.playButtonClick();
    onProceed();
  };

  return (
    <div
      id="festive-wish-screen"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-amber-950/40 backdrop-blur-xs select-none"
    >
      {/* Confetti & Sparkles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(16)].map((_, i) => (
          <div
            key={i}
            className="absolute text-xl"
            style={{
              top: `${(i * 19) % 90}%`,
              left: `${(i * 23) % 95}%`,
              animation: `floatConfetti ${2.5 + (i % 3)}s ease-in-out infinite alternate`,
              opacity: 0.75,
            }}
          >
            {['✨', '🌸', '🪔', '🌼', '🍬', '🕉️'][i % 6]}
          </div>
        ))}
      </div>

      {/* Main Wish Card */}
      <motion.div
        initial={{ scale: 0.85, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="relative w-full max-w-sm rounded-3xl bg-gradient-to-b from-[#FFFDF8] via-[#FFF9EE] to-[#FFF1D6] border-3 border-amber-300 shadow-2xl p-6 sm:p-7 text-center overflow-hidden flex flex-col items-center"
      >
        {/* Soft golden aura */}
        <div className="absolute -top-10 w-44 h-44 rounded-full bg-gradient-to-b from-amber-300/40 to-orange-200/20 blur-xl pointer-events-none" />

        {/* Cute Ganesha Visual */}
        <div className="relative mb-3 flex items-center justify-center animate-[bounceSoft_2s_ease-in-out_infinite]">
          <div className="drop-shadow-lg">
            <GaneshaHero size={130} className="w-28 h-28 sm:w-32 sm:h-32" />
          </div>

          {/* Sparkles around Ganesha */}
          <span className="absolute -top-2 -right-3 text-2xl animate-pulse">✨</span>
          <span className="absolute bottom-2 -left-3 text-xl animate-bounce">🪔</span>
        </div>

        {/* Traditional Auspicious Symbol */}
        <div className="flex items-center justify-center gap-2 mb-1.5">
          <span className="text-amber-500 text-xs">🌺</span>
          <span className="text-xs font-black tracking-widest text-amber-900 uppercase">
            Shree Ganeshay Namah
          </span>
          <span className="text-amber-500 text-xs">🌺</span>
        </div>

        {/* Main Wish */}
        <h2
          className="text-2xl sm:text-3xl font-black text-[#5C1304] tracking-wide mb-1"
          style={{ fontFamily: "'Cinzel Decorative', serif" }}
        >
          Happy Ganesh Chaturthi!
        </h2>

        {/* Hindi Greeting */}
        <p className="text-sm sm:text-base font-bold text-orange-600 mb-2.5">
          गणेश चतुर्थी की हार्दिक शुभकामनाएं!
        </p>

        {/* Sweet blessing message */}
        <p className="text-xs sm:text-sm font-medium text-amber-950/85 leading-relaxed max-w-xs mb-5">
          May Lord Ganesha bless you with wisdom, sharp memory, and boundless happiness!
        </p>

        {/* Interactive Instant Start / Countdown */}
        <button
          onClick={handleManualProceed}
          className="w-full py-3 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 hover:from-amber-600 hover:via-orange-600 hover:to-red-700 active:scale-95 text-white font-black text-base tracking-wider uppercase shadow-lg shadow-orange-500/30 border-2 border-amber-200 transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          <span>LET'S PLAY!</span>
          <span className="text-sm bg-white/20 px-2 py-0.5 rounded-full">
            {countdown}s
          </span>
          <span>→</span>
        </button>
      </motion.div>

      <style>{`
        @keyframes bounceSoft {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-6px);
          }
        }
        @keyframes floatConfetti {
          0% {
            transform: translateY(0px) rotate(0deg);
          }
          100% {
            transform: translateY(-15px) rotate(15deg);
          }
        }
      `}</style>
    </div>
  );
};
