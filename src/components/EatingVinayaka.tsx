import React, { useState, useEffect } from 'react';
import { soundFx } from '../utils/audio';

interface EatingVinayakaProps {
  onEat?: (food: 'modak' | 'undralu') => void;
  className?: string;
}

type EatingStage = 'idle' | 'reaching' | 'lifting' | 'chew1' | 'chew2' | 'chew3' | 'satisfied';

export const EatingVinayaka: React.FC<EatingVinayakaProps> = ({ onEat, className = '' }) => {
  const [currentFood, setCurrentFood] = useState<'modak' | 'undralu'>('modak');
  const [stage, setStage] = useState<EatingStage>('idle');
  const [blessingText, setBlessingText] = useState<string | null>(null);

  // Automatic autonomous self-eating lifecycle
  useEffect(() => {
    let isMounted = true;
    let timer: number;

    const startEatingSequence = () => {
      if (!isMounted) return;

      // Alternates between sweet Modak and sacred Undrallu
      setCurrentFood((prev) => {
        const nextFood: 'modak' | 'undralu' = prev === 'modak' ? 'undralu' : 'modak';

        // Stage 1: Reaching down to the platter at his feet (800ms)
        setStage('reaching');

        timer = window.setTimeout(() => {
          if (!isMounted) return;

          // Stage 2: Lifting sweet up towards the moving mouth (900ms)
          setStage('lifting');

          timer = window.setTimeout(() => {
            if (!isMounted) return;

            // Stage 3: First bite - active chewing mouth, crisp chomp sound, sparkles! (700ms)
            setStage('chew1');
            soundFx.playBiteChomp(1);
            if (onEat) onEat(nextFood);

            timer = window.setTimeout(() => {
              if (!isMounted) return;

              // Stage 4: Second bite - chewy nom-nom munch! (700ms)
              setStage('chew2');
              soundFx.playBiteChomp(2);

              timer = window.setTimeout(() => {
                if (!isMounted) return;

                // Stage 5: Final bite - sweet swallow into tummy! (700ms)
                setStage('chew3');
                soundFx.playBiteChomp(3);

                timer = window.setTimeout(() => {
                  if (!isMounted) return;

                  // Stage 6: Satisfied & blissful smile with divine blessing & chime! (1700ms)
                  setStage('satisfied');
                  soundFx.playYumBlessing();
                  const blessings = [
                    nextFood === 'modak' ? 'Delicious Modak! 🥟✨' : 'Sweet Undrallu! ⚪✨',
                    'Om Ganapataye Namaha! 🌸',
                    'Vinayaka Blesses You! 🪔',
                  ];
                  setBlessingText(blessings[Math.floor(Math.random() * blessings.length)]);

                  timer = window.setTimeout(() => {
                    if (!isMounted) return;

                    // Back to resting idle before next treat (2400ms)
                    setStage('idle');
                    setBlessingText(null);

                    timer = window.setTimeout(startEatingSequence, 2400);
                  }, 1700);
                }, 700);
              }, 700);
            }, 700);
          }, 900);
        }, 800);

        return nextFood;
      });
    };

    // First cycle starts shortly after initial mount
    timer = window.setTimeout(startEatingSequence, 1200);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [onEat]);

  const isEating = stage === 'chew1' || stage === 'chew2' || stage === 'chew3';
  const isLifting = stage === 'lifting';
  const isReaching = stage === 'reaching';
  const isSatisfied = stage === 'satisfied';

  // Manual interactive tap to feed Vinayaka
  const handleManualFeed = () => {
    soundFx.unlockAudio();
    if (stage === 'idle' || stage === 'satisfied') {
      const nextFood: 'modak' | 'undralu' = currentFood === 'modak' ? 'undralu' : 'modak';
      setCurrentFood(nextFood);
      setStage('reaching');
      setTimeout(() => {
        setStage('lifting');
        setTimeout(() => {
          setStage('chew1');
          soundFx.playBiteChomp(1);
          setTimeout(() => {
            setStage('chew2');
            soundFx.playBiteChomp(2);
            setTimeout(() => {
              setStage('chew3');
              soundFx.playBiteChomp(3);
              setTimeout(() => {
                setStage('satisfied');
                soundFx.playYumBlessing();
                const blessings = [
                  nextFood === 'modak' ? 'Delicious Modak! 🥟✨' : 'Sweet Undrallu! ⚪✨',
                  'Om Ganapataye Namaha! 🌸',
                  'Vinayaka Blesses You! 🪔',
                ];
                setBlessingText(blessings[Math.floor(Math.random() * blessings.length)]);
                setTimeout(() => {
                  setStage('idle');
                  setBlessingText(null);
                }, 1700);
              }, 600);
            }, 600);
          }, 600);
        }, 600);
      }, 500);
    } else {
      // If currently mid-chew, play immediate extra tasty chomp!
      soundFx.playBiteChomp(1);
    }
  };

  // Coordinates for food movement in 320x370 viewBox:
  // Mouth center is at (160, 140)
  // Modak on platter rest position: (142, 298)
  // Undrallu on platter rest position: (178, 298)
  const originX = currentFood === 'modak' ? 142 : 178;
  const originY = 298;
  const targetX = 160;
  const targetY = 142;

  let activeFoodX = originX;
  let activeFoodY = originY;
  let activeFoodScale = 1;
  let activeFoodOpacity = 1;

  if (stage === 'idle') {
    activeFoodX = originX;
    activeFoodY = originY;
    activeFoodScale = 1;
  } else if (stage === 'reaching') {
    activeFoodX = originX;
    activeFoodY = originY;
    activeFoodScale = 1.15; // glows as trunk reaches it
  } else if (stage === 'lifting') {
    // 70% of the path up to mouth
    activeFoodX = originX + (targetX - originX) * 0.75;
    activeFoodY = originY + (targetY - originY) * 0.75;
    activeFoodScale = 1.08;
  } else if (stage === 'chew1') {
    activeFoodX = targetX;
    activeFoodY = targetY;
    activeFoodScale = 0.85;
  } else if (stage === 'chew2') {
    activeFoodX = targetX;
    activeFoodY = targetY;
    activeFoodScale = 0.55;
  } else if (stage === 'chew3') {
    activeFoodX = targetX;
    activeFoodY = targetY;
    activeFoodScale = 0.28;
  } else {
    activeFoodOpacity = 0;
    activeFoodScale = 0;
  }

  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      {/* Floating blessing bubble when satisfied */}
      {blessingText && (
        <div
          className="absolute -top-7 sm:-top-8 z-30 px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-600 via-orange-600 to-amber-600 text-white text-xs sm:text-sm font-extrabold shadow-md border border-amber-200 pointer-events-none flex items-center gap-1.5 transition-all"
          style={{ animation: 'vinayakaBlessingPop 0.4s ease-out' }}
        >
          <span>{blessingText}</span>
        </div>
      )}

      {/* Main Full-Body Baal Ganesha SVG Canvas */}
      <div
        className="relative cursor-pointer group"
        onClick={handleManualFeed}
        title="Tap Ganesha to feed him sweets & hear him munch!"
      >
        {/* Divine Aura Glow behind Full-Body Ganesha */}
        <div
          className={`absolute inset-0 rounded-full transition-all duration-700 pointer-events-none ${
            isEating || isSatisfied
              ? 'bg-gradient-to-b from-amber-300/50 via-orange-300/30 to-transparent blur-2xl scale-125'
              : 'bg-gradient-to-b from-amber-300/25 via-orange-200/15 to-transparent blur-xl scale-100'
          }`}
        />

        <svg
          viewBox="0 0 320 375"
          className="w-64 h-72 sm:w-72 sm:h-80 md:w-80 md:h-88 drop-shadow-md relative z-10 transition-transform duration-300 group-hover:scale-[1.02] group-active:scale-95"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Warm Divine Skin Gradient for Ganesha */}
            <radialGradient id="ganeshaSkin" cx="50%" cy="38%" r="62%">
              <stop offset="0%" stopColor="#FED7AA" />
              <stop offset="60%" stopColor="#FB923C" />
              <stop offset="100%" stopColor="#EA580C" />
            </radialGradient>

            {/* Rosy Cheek Gradient */}
            <radialGradient id="ganeshaCheekGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#F43F5E" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FB7185" stopOpacity="0" />
            </radialGradient>

            {/* Inner Ear Gradient */}
            <radialGradient id="ganeshaEarInner" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FDA4AF" />
              <stop offset="100%" stopColor="#F43F5E" />
            </radialGradient>

            {/* Mukut / Royal Crown Gradient */}
            <linearGradient id="ganeshaMukut" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="35%" stopColor="#FBBF24" />
              <stop offset="70%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#B45309" />
            </linearGradient>

            {/* Pitambara Dhoti Silk Gradient */}
            <linearGradient id="ganeshaDhoti" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="30%" stopColor="#F59E0B" />
              <stop offset="80%" stopColor="#D97706" />
              <stop offset="100%" stopColor="#B45309" />
            </linearGradient>

            {/* Lotus Throne Pink Petal Gradient */}
            <linearGradient id="lotusPetalGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FCE7F3" />
              <stop offset="45%" stopColor="#F472B6" />
              <stop offset="85%" stopColor="#DB2777" />
              <stop offset="100%" stopColor="#9D174D" />
            </linearGradient>

            {/* Modak Saffron Gold Gradient */}
            <linearGradient id="sweetModakGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFFBEB" />
              <stop offset="40%" stopColor="#FDE68A" />
              <stop offset="80%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>

            {/* Undrallu Steamed Rice Texture Gradient */}
            <radialGradient id="sweetUndraluGrad" cx="35%" cy="30%" r="65%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="55%" stopColor="#FFFDF7" />
              <stop offset="85%" stopColor="#FEF3C7" />
              <stop offset="100%" stopColor="#FDE68A" />
            </radialGradient>

            {/* Banana Leaf Naivedyam Platter Gradient */}
            <linearGradient id="leafPlatterGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#15803D" />
              <stop offset="50%" stopColor="#22C55E" />
              <stop offset="100%" stopColor="#166534" />
            </linearGradient>

            {/* Yum! Comic Badge Gradient */}
            <linearGradient id="yumBadgeGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#EA580C" />
              <stop offset="50%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#DC2626" />
            </linearGradient>

            {/* Sparkle Core Glow Gradient */}
            <radialGradient id="sparkleCoreGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
              <stop offset="40%" stopColor="#FEF08A" stopOpacity="0.9" />
              <stop offset="80%" stopColor="#F59E0B" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#D97706" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* ================= DIVINE PRABHAVALI (AURA HALO BEHIND FULL BODY) ================= */}
          <circle
            cx="160"
            cy="140"
            r="115"
            stroke="#FBBF24"
            strokeWidth="3.5"
            strokeDasharray="8 8"
            fill="none"
            opacity={isEating || isSatisfied ? 0.75 : 0.4}
            className="transition-opacity duration-500"
          />
          <circle
            cx="160"
            cy="140"
            r="124"
            stroke="#F59E0B"
            strokeWidth="1.8"
            fill="none"
            opacity={isEating || isSatisfied ? 0.5 : 0.25}
          />

          {/* ================= SACRED LOTUS THRONE (PADMASANA BASE) ================= */}
          <g id="lotus-throne">
            {/* Throne base shadow */}
            <ellipse cx="160" cy="342" rx="105" ry="20" fill="#78350F" fillOpacity="0.25" />

            {/* Golden Base Pedestal */}
            <path
              d="M75 330 C90 324 230 324 245 330 C248 344 72 344 75 330 Z"
              fill="url(#ganeshaMukut)"
              stroke="#9A3412"
              strokeWidth="2"
            />
            {/* Jewel studs on base */}
            <circle cx="110" cy="336" r="3" fill="#DC2626" />
            <circle cx="160" cy="337" r="3.5" fill="#16A34A" />
            <circle cx="210" cy="336" r="3" fill="#DC2626" />

            {/* Blooming Lotus Petals (Lower Tier) */}
            <path d="M60 326 C68 298 96 304 110 322 Z" fill="url(#lotusPetalGrad)" stroke="#BE185D" strokeWidth="1.2" />
            <path d="M260 326 C252 298 224 304 210 322 Z" fill="url(#lotusPetalGrad)" stroke="#BE185D" strokeWidth="1.2" />
            <path d="M92 328 C108 294 136 300 148 322 Z" fill="url(#lotusPetalGrad)" stroke="#BE185D" strokeWidth="1.2" />
            <path d="M228 328 C212 294 184 300 172 322 Z" fill="url(#lotusPetalGrad)" stroke="#BE185D" strokeWidth="1.2" />
            <path d="M132 328 C148 290 172 290 188 328 Z" fill="url(#lotusPetalGrad)" stroke="#BE185D" strokeWidth="1.2" />

            {/* Blooming Lotus Petals (Front Decorative Rim) */}
            <path d="M78 335 C95 316 118 318 128 334 Z" fill="#F472B6" stroke="#BE185D" strokeWidth="1" />
            <path d="M242 335 C225 316 202 318 192 334 Z" fill="#F472B6" stroke="#BE185D" strokeWidth="1" />
            <path d="M120 338 C140 316 180 316 200 338 Z" fill="#F472B6" stroke="#BE185D" strokeWidth="1" />
          </g>

          {/* ================= FOUR DIVINE ARMS (CHATURBHUJA) ================= */}
          {/* Upper Right Arm (Holding Sacred Lotus / Axe) */}
          <g id="upper-right-arm">
            <path
              d="M125 168 C96 160 84 140 88 122 C92 112 104 116 104 128 C104 138 116 154 132 165"
              fill="url(#ganeshaSkin)"
              stroke="#C2410C"
              strokeWidth="2.2"
            />
            {/* Golden Armlet (Keyura) */}
            <rect x="94" y="138" width="12" height="5" rx="2.5" fill="#FBBF24" stroke="#B45309" strokeWidth="1" />
            {/* Auspicious Sacred Axe (Parashu / Ankusha) */}
            <line x1="88" y1="98" x2="88" y2="132" stroke="#B45309" strokeWidth="3" strokeLinecap="round" />
            <path d="M88 100 C74 96 74 112 88 114 Z" fill="url(#ganeshaMukut)" stroke="#9A3412" strokeWidth="1.2" />
            <circle cx="88" cy="116" r="4.5" fill="url(#ganeshaSkin)" stroke="#C2410C" strokeWidth="1.5" />
          </g>

          {/* Upper Left Arm (Holding Sacred Pasha / Noose) */}
          <g id="upper-left-arm">
            <path
              d="M195 168 C224 160 236 140 232 122 C228 112 216 116 216 128 C216 138 204 154 188 165"
              fill="url(#ganeshaSkin)"
              stroke="#C2410C"
              strokeWidth="2.2"
            />
            {/* Golden Armlet (Keyura) */}
            <rect x="214" y="138" width="12" height="5" rx="2.5" fill="#FBBF24" stroke="#B45309" strokeWidth="1" />
            {/* Sacred Pasha Loop */}
            <circle cx="232" cy="106" r="10" stroke="#FBBF24" strokeWidth="2.8" strokeDasharray="4 2" fill="none" />
            <circle cx="232" cy="116" r="4.5" fill="url(#ganeshaSkin)" stroke="#C2410C" strokeWidth="1.5" />
          </g>

          {/* Lower Right Arm (Abhaya Mudra - Blessing Palm) */}
          <g id="lower-right-arm">
            <path
              d="M120 188 C104 196 96 214 102 230 C106 240 118 238 120 228 C122 216 128 205 132 196"
              fill="url(#ganeshaSkin)"
              stroke="#C2410C"
              strokeWidth="2.2"
            />
            {/* Golden Bangle (Kankana) */}
            <rect x="98" y="218" width="12" height="4.5" rx="2" fill="#FBBF24" stroke="#B45309" strokeWidth="1" />
            {/* Blessing Palm (Abhaya Mudra) facing devotee */}
            <ellipse cx="106" cy="235" rx="8" ry="10" fill="url(#ganeshaSkin)" stroke="#C2410C" strokeWidth="1.6" />
            {/* Red Lotus Auspicious Mark on Blessing Palm */}
            <circle cx="106" cy="235" r="3.2" fill="#DC2626" />
            <circle cx="106" cy="235" r="1.5" fill="#FEF08A" />
            {/* Fingers raised in blessing */}
            <path d="M100 226 L100 236 M104 224 L104 236 M108 224 L108 236 M112 226 L112 236" stroke="#C2410C" strokeWidth="1" />
          </g>

          {/* Lower Left Arm (Holding Golden Modaka-Patra / Sweet Bowl) */}
          <g id="lower-left-arm">
            <path
              d="M200 188 C216 196 224 214 218 230 C214 240 202 238 200 228 C198 216 192 205 188 196"
              fill="url(#ganeshaSkin)"
              stroke="#C2410C"
              strokeWidth="2.2"
            />
            {/* Golden Bangle (Kankana) */}
            <rect x="210" y="218" width="12" height="4.5" rx="2" fill="#FBBF24" stroke="#B45309" strokeWidth="1" />
            {/* Golden Hand holding bowl */}
            <circle cx="214" cy="235" r="6" fill="url(#ganeshaSkin)" stroke="#C2410C" strokeWidth="1.4" />
            {/* Golden Sweet Bowl (Modakapatra) */}
            <path
              d="M204 235 C204 246 228 246 228 235 Z"
              fill="url(#ganeshaMukut)"
              stroke="#9A3412"
              strokeWidth="1.5"
            />
            {/* Little sweet modaks inside the bowl */}
            <circle cx="211" cy="233" r="3.2" fill="url(#sweetModakGrad)" stroke="#B45309" strokeWidth="0.8" />
            <circle cx="216" cy="231" r="3.5" fill="url(#sweetModakGrad)" stroke="#B45309" strokeWidth="0.8" />
            <circle cx="221" cy="233" r="3.2" fill="url(#sweetModakGrad)" stroke="#B45309" strokeWidth="0.8" />
          </g>

          {/* ================= FULL SEATED LEGS & SILK DHOTI (PITAMBARA) ================= */}
          <g id="seated-body-and-dhoti">
            {/* Seated Thighs & Crossed Folded Legs */}
            {/* Left Knee & Leg */}
            <ellipse
              cx="110"
              cy="282"
              rx="38"
              ry="24"
              fill="url(#ganeshaDhoti)"
              stroke="#9A3412"
              strokeWidth="2.4"
              transform="rotate(-10 110 282)"
            />
            {/* Right Knee & Leg */}
            <ellipse
              cx="210"
              cy="282"
              rx="38"
              ry="24"
              fill="url(#ganeshaDhoti)"
              stroke="#9A3412"
              strokeWidth="2.4"
              transform="rotate(10 210 282)"
            />

            {/* Central Pleated Dhoti Folds with Red/Gold Borders */}
            <path
              d="M136 260 C146 288 152 308 152 322 C168 322 174 288 184 260 Z"
              fill="url(#ganeshaDhoti)"
              stroke="#DC2626"
              strokeWidth="2"
            />
            {/* Dhoti Gold Border lines */}
            <path d="M144 265 C150 285 154 305 154 320" stroke="#DC2626" strokeWidth="1.5" />
            <path d="M176 265 C170 285 166 305 166 320" stroke="#DC2626" strokeWidth="1.5" />

            {/* Chubby Lotus Feet with Golden Anklets (Payal/Nupur) */}
            {/* Left Foot */}
            <g transform="translate(132, 298)">
              <ellipse cx="0" cy="0" rx="9" ry="6" fill="url(#ganeshaSkin)" stroke="#C2410C" strokeWidth="1.4" />
              {/* Golden Anklet with bells */}
              <path d="M-8 -2 C-4 -5 4 -5 8 -2" stroke="#FBBF24" strokeWidth="2.2" strokeLinecap="round" />
              {/* Red Alta painted sole/toes */}
              <circle cx="7" cy="1" r="1.8" fill="#DC2626" />
              <circle cx="4" cy="3" r="1.6" fill="#DC2626" />
              <circle cx="1" cy="4" r="1.5" fill="#DC2626" />
            </g>

            {/* Right Foot */}
            <g transform="translate(188, 298)">
              <ellipse cx="0" cy="0" rx="9" ry="6" fill="url(#ganeshaSkin)" stroke="#C2410C" strokeWidth="1.4" />
              {/* Golden Anklet with bells */}
              <path d="M-8 -2 C-4 -5 4 -5 8 -2" stroke="#FBBF24" strokeWidth="2.2" strokeLinecap="round" />
              {/* Red Alta painted sole/toes */}
              <circle cx="-7" cy="1" r="1.8" fill="#DC2626" />
              <circle cx="-4" cy="3" r="1.6" fill="#DC2626" />
              <circle cx="-1" cy="4" r="1.5" fill="#DC2626" />
            </g>
          </g>

          {/* ================= CUTE CHUBBY POTBELLY (LAMBODARA) ================= */}
          <g id="potbelly">
            {/* Torso & Upper Chest */}
            <path
              d="M125 168 C125 168 120 205 120 220 C120 248 140 262 160 262 C180 262 200 248 200 220 C200 205 195 168 195 168 Z"
              fill="url(#ganeshaSkin)"
              stroke="#C2410C"
              strokeWidth="2.6"
            />
            {/* Round Chubby Potbelly Shape */}
            <ellipse cx="160" cy="224" rx="38" ry="32" fill="url(#ganeshaSkin)" />

            {/* Sacred Janeu (Yajnopavita / Holy Thread) running across torso */}
            <path
              d="M132 172 C142 195 158 225 178 248"
              stroke="#FFFBEB"
              strokeWidth="2.8"
              strokeDasharray="4 2"
              fill="none"
            />
            <path
              d="M132 172 C142 195 158 225 178 248"
              stroke="#B45309"
              strokeWidth="0.8"
              strokeDasharray="4 2"
              fill="none"
            />

            {/* Sacred Golden Snake Belt (Nagabandha Waistband) around tummy */}
            <path
              d="M126 238 C144 250 176 250 194 238"
              stroke="#FBBF24"
              strokeWidth="4.5"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M126 238 C144 250 176 250 194 238"
              stroke="#DC2626"
              strokeWidth="1.5"
              strokeDasharray="3 3"
              fill="none"
            />
            {/* Cute Navel (Nabhi) with golden gem */}
            <circle cx="160" cy="232" r="3.5" fill="#C2410C" />
            <circle cx="160" cy="231" r="1.5" fill="#FBBF24" />

            {/* Royal Gold Necklace (Kantha Haar) */}
            <path d="M134 165 C146 178 174 178 186 165" stroke="#FBBF24" strokeWidth="6" strokeLinecap="round" fill="none" />
            <path d="M134 165 C146 178 174 178 186 165" stroke="#DC2626" strokeWidth="2" strokeDasharray="3 3" fill="none" />
            {/* Auspicious Ruby Pendant */}
            <circle cx="160" cy="176" r="5" fill="#FEF08A" stroke="#B45309" strokeWidth="1.5" />
            <circle cx="160" cy="176" r="2.5" fill="#DC2626" />
          </g>

          {/* ================= CALM, MAJESTIC STATIC EARS (NO MOVEMENT) ================= */}
          {/* User directive: "stop ears to move" - perfectly still and serene */}
          <g id="static-ears">
            {/* Left Ear */}
            <g id="left-ear-static">
              <ellipse
                cx="106"
                cy="116"
                rx="34"
                ry="38"
                fill="url(#ganeshaSkin)"
                stroke="#C2410C"
                strokeWidth="2.5"
                transform="rotate(-8 106 116)"
              />
              <ellipse
                cx="106"
                cy="116"
                rx="20"
                ry="24"
                fill="url(#ganeshaEarInner)"
                fillOpacity="0.45"
                transform="rotate(-8 106 116)"
              />
              {/* Sacred Kundala Earring */}
              <circle cx="92" cy="145" r="5" fill="#FBBF24" stroke="#B45309" strokeWidth="1.5" />
              <circle cx="92" cy="145" r="2.2" fill="#DC2626" />
            </g>

            {/* Right Ear */}
            <g id="right-ear-static">
              <ellipse
                cx="214"
                cy="116"
                rx="34"
                ry="38"
                fill="url(#ganeshaSkin)"
                stroke="#C2410C"
                strokeWidth="2.5"
                transform="rotate(8 214 116)"
              />
              <ellipse
                cx="214"
                cy="116"
                rx="20"
                ry="24"
                fill="url(#ganeshaEarInner)"
                fillOpacity="0.45"
                transform="rotate(8 214 116)"
              />
              {/* Sacred Kundala Earring */}
              <circle cx="228" cy="145" r="5" fill="#FBBF24" stroke="#B45309" strokeWidth="1.5" />
              <circle cx="228" cy="145" r="2.2" fill="#DC2626" />
            </g>
          </g>

          {/* ================= MAIN ROUND HEAD & ROSY CHEEKS ================= */}
          <g id="head-base">
            <circle cx="160" cy="122" r="46" fill="url(#ganeshaSkin)" stroke="#C2410C" strokeWidth="2.8" />

            {/* Rosy Cheeks */}
            <circle cx="132" cy="132" r="10" fill="url(#ganeshaCheekGlow)" />
            <circle cx="188" cy="132" r="10" fill="url(#ganeshaCheekGlow)" />
          </g>

          {/* ================= SACRED GOLDEN MUKUT (CROWN) ================= */}
          <g id="mukut-crown">
            <path
              d="M134 90 L142 46 L160 30 L178 46 L186 90 Z"
              fill="url(#ganeshaMukut)"
              stroke="#9A3412"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <path d="M144 90 L150 56 L160 42 L170 56 L176 90" stroke="#FEF08A" strokeWidth="2" fill="none" />
            <circle cx="160" cy="40" r="4.5" fill="#DC2626" stroke="#7F1D1D" strokeWidth="1" />
            <circle cx="160" cy="66" r="5" fill="#DC2626" stroke="#7F1D1D" strokeWidth="1" />
            <circle cx="148" cy="70" r="3.5" fill="#16A34A" />
            <circle cx="172" cy="70" r="3.5" fill="#16A34A" />
          </g>

          {/* ================= FOREHEAD TILAK & CHANDAN ================= */}
          <g id="tilak">
            <path d="M144 98 C154 101 166 101 176 98" stroke="#DC2626" strokeWidth="3.2" strokeLinecap="round" />
            <path d="M148 95 C156 97 164 97 172 95" stroke="#FBBF24" strokeWidth="2.5" strokeLinecap="round" />
            {/* Center Red Kumkum Flame Tilak */}
            <path d="M160 88 C158 91 158 98 160 102 C162 98 162 91 160 88 Z" fill="#DC2626" />
            <circle cx="160" cy="100" r="2.2" fill="#FEF08A" />
          </g>

          {/* ================= KIND EYES ================= */}
          <g id="eyes">
            {isEating || isSatisfied ? (
              /* Joyful Happy Closed Smiling Eyes (^_^) */
              <g>
                <path d="M136 114 C141 107 150 107 154 114" stroke="#431407" strokeWidth="3.2" strokeLinecap="round" fill="none" />
                <path d="M166 114 C170 107 179 107 184 114" stroke="#431407" strokeWidth="3.2" strokeLinecap="round" fill="none" />
              </g>
            ) : isReaching || isLifting ? (
              /* Looking down with anticipation at the sweet */
              <g>
                <ellipse cx="144" cy="116" rx="5" ry="6" fill="#431407" />
                <circle cx="144" cy="118" r="2.2" fill="#FFFFFF" />
                <path d="M138 108 C142 106 147 107 151 109" stroke="#7C2D12" strokeWidth="2" strokeLinecap="round" />

                <ellipse cx="176" cy="116" rx="5" ry="6" fill="#431407" />
                <circle cx="176" cy="118" r="2.2" fill="#FFFFFF" />
                <path d="M169 109 C173 107 178 106 182 108" stroke="#7C2D12" strokeWidth="2" strokeLinecap="round" />
              </g>
            ) : (
              /* Normal wide, twinkling peaceful eyes */
              <g>
                <ellipse cx="144" cy="114" rx="5" ry="6" fill="#431407" />
                <circle cx="145.5" cy="112" r="2" fill="#FFFFFF" />
                <path d="M138 106 C142 104 147 105 151 107" stroke="#7C2D12" strokeWidth="2" strokeLinecap="round" />

                <ellipse cx="176" cy="114" rx="5" ry="6" fill="#431407" />
                <circle cx="177.5" cy="112" r="2" fill="#FFFFFF" />
                <path d="M169 107 C173 105 178 104 182 106" stroke="#7C2D12" strokeWidth="2" strokeLinecap="round" />
              </g>
            )}
          </g>

          {/* ================= SACRED TUSKS ================= */}
          <g id="tusks">
            {/* Left broken tusk (Auspicious Ekadanta) */}
            <path d="M149 138 L138 140" stroke="#FFFBEB" strokeWidth="3.8" strokeLinecap="round" />
            {/* Right intact tusk */}
            <path d="M171 138 L183 141" stroke="#FFFBEB" strokeWidth="3.8" strokeLinecap="round" />
          </g>

          {/* ================= ACTIVE CHEWING MOVING MOUTH ================= */}
          {/* User directive: "mouth should be moving" - animated open/close chomping rhythm! */}
          <g id="chewing-moving-mouth-area">
            {isEating ? (
              /* Active rhythmic chewing mouth and jaw with teeth & tongue */
              <g
                id="active-chewing-mouth"
                style={{
                  transformOrigin: '160px 140px',
                  animation: 'ganeshaMouthChomp 0.28s ease-in-out infinite alternate',
                }}
              >
                {/* Chewing Chin / Lower Lip Movement */}
                <path
                  d="M150 146 C155 151 165 151 170 146"
                  stroke="#C2410C"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  fill="none"
                />
                {/* Deep red open mouth cavity */}
                <ellipse
                  cx="160"
                  cy="141"
                  rx="9"
                  ry="6.5"
                  fill="#7F1D1D"
                  stroke="#991B1B"
                  strokeWidth="1.5"
                />
                {/* Top tiny pearly teeth line */}
                <path
                  d="M154 137 Q160 139 166 137"
                  stroke="#FFFBEB"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
                {/* Pink tongue moving happily */}
                <ellipse
                  cx="160"
                  cy="144"
                  rx="5"
                  ry="3"
                  fill="#FB7185"
                />
              </g>
            ) : isSatisfied ? (
              /* Big, wide contented smile */
              <path
                d="M152 140 C156 146 164 146 168 140"
                stroke="#991B1B"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
              />
            ) : (
              /* Gentle peaceful resting smile */
              <path
                d="M154 140 C157 144 163 144 166 140"
                stroke="#991B1B"
                strokeWidth="2.8"
                strokeLinecap="round"
                fill="none"
              />
            )}
          </g>

          {/* ================= VISUAL 'YUM' & SPARKLE PARTICLES NEAR MOUTH ================= */}
          {(isEating || isSatisfied) && (
            <g id="eating-sparkles-and-yum-burst" className="pointer-events-none select-none">
              {/* Floating Animated "YUM!" Comic Tag */}
              {isEating && (
                <g
                  key={`yum-badge-${stage}`}
                  style={{
                    animation: 'yumFloatPop 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
                    transformOrigin: stage === 'chew2' ? '115px 120px' : '205px 120px',
                  }}
                >
                  {stage === 'chew2' ? (
                    /* Pop to left cheek on bite 2 */
                    <g transform="translate(86, 110)">
                      <rect
                        x="0"
                        y="0"
                        width="58"
                        height="22"
                        rx="11"
                        fill="url(#yumBadgeGrad)"
                        stroke="#FEF08A"
                        strokeWidth="1.6"
                      />
                      <text
                        x="29"
                        y="15"
                        textAnchor="middle"
                        fontSize="11"
                        fontWeight="900"
                        fill="#FFFFFF"
                        letterSpacing="0.04em"
                      >
                        YUMMY! 😋
                      </text>
                    </g>
                  ) : (
                    /* Pop to right cheek on bite 1 & bite 3 */
                    <g transform="translate(176, 110)">
                      <rect
                        x="0"
                        y="0"
                        width="52"
                        height="22"
                        rx="11"
                        fill="url(#yumBadgeGrad)"
                        stroke="#FEF08A"
                        strokeWidth="1.6"
                      />
                      <text
                        x="26"
                        y="15"
                        textAnchor="middle"
                        fontSize="11"
                        fontWeight="900"
                        fill="#FFFFFF"
                        letterSpacing="0.04em"
                      >
                        {stage === 'chew3' ? 'MMM! ✨' : 'YUM! 🥟'}
                      </text>
                    </g>
                  )}
                </g>
              )}

              {/* Sparkle Stars & Radiating Magical Particles around Ganesha's Mouth */}
              <g key={`sparkles-${stage}`}>
                {/* 4-Point Golden Diamond Sparkle 1 (Top-Right) */}
                <g
                  transform="translate(184, 126)"
                  style={{
                    animation: 'sparkleTwinklePop 0.6s ease-out forwards',
                    transformOrigin: '184px 126px',
                  }}
                >
                  <circle cx="0" cy="0" r="9" fill="url(#sparkleCoreGlow)" />
                  <path
                    d="M0 -11 Q0 0 11 0 Q0 0 0 11 Q0 0 -11 0 Q0 0 0 -11 Z"
                    fill="#FEF08A"
                    stroke="#F59E0B"
                    strokeWidth="0.8"
                  />
                  <circle cx="0" cy="0" r="2" fill="#FFFFFF" />
                </g>

                {/* 4-Point Golden Diamond Sparkle 2 (Top-Left) */}
                <g
                  transform="translate(136, 124)"
                  style={{
                    animation: 'sparkleTwinklePop 0.6s ease-out 0.05s forwards',
                    transformOrigin: '136px 124px',
                  }}
                >
                  <circle cx="0" cy="0" r="8" fill="url(#sparkleCoreGlow)" />
                  <path
                    d="M0 -9 Q0 0 9 0 Q0 0 0 9 Q0 0 -9 0 Q0 0 0 -9 Z"
                    fill="#FFFBEB"
                    stroke="#F59E0B"
                    strokeWidth="0.8"
                  />
                  <circle cx="0" cy="0" r="1.8" fill="#FFFFFF" />
                </g>

                {/* 4-Point Diamond Sparkle 3 (Bottom-Right, near sweet crumbs) */}
                <g
                  transform="translate(188, 150)"
                  style={{
                    animation: 'sparkleTwinklePop 0.6s ease-out 0.1s forwards',
                    transformOrigin: '188px 150px',
                  }}
                >
                  <path
                    d="M0 -8 Q0 0 8 0 Q0 0 0 8 Q0 0 -8 0 Q0 0 0 -8 Z"
                    fill="#FDE047"
                    stroke="#D97706"
                    strokeWidth="0.7"
                  />
                  <circle cx="0" cy="0" r="1.5" fill="#FFFFFF" />
                </g>

                {/* 4-Point Diamond Sparkle 4 (Bottom-Left) */}
                <g
                  transform="translate(132, 148)"
                  style={{
                    animation: 'sparkleTwinklePop 0.6s ease-out 0.08s forwards',
                    transformOrigin: '132px 148px',
                  }}
                >
                  <path
                    d="M0 -7 Q0 0 7 0 Q0 0 0 7 Q0 0 -7 0 Q0 0 0 -7 Z"
                    fill="#FEF08A"
                    stroke="#D97706"
                    strokeWidth="0.7"
                  />
                  <circle cx="0" cy="0" r="1.4" fill="#FFFFFF" />
                </g>

                {/* Sparkle 5 (Right above mouth, twinkling star) */}
                <g
                  transform="translate(160, 118)"
                  style={{
                    animation: 'sparkleTwinklePop 0.6s ease-out 0.12s forwards',
                    transformOrigin: '160px 118px',
                  }}
                >
                  <circle cx="0" cy="0" r="7" fill="url(#sparkleCoreGlow)" />
                  <path
                    d="M0 -8 Q0 0 8 0 Q0 0 0 8 Q0 0 -8 0 Q0 0 0 -8 Z"
                    fill="#FFF"
                    stroke="#FBBF24"
                    strokeWidth="0.8"
                  />
                  <circle cx="0" cy="0" r="1.6" fill="#FEF08A" />
                </g>

                {/* Flying Sweet Crumb Particles */}
                <circle
                  cx="148"
                  cy="140"
                  r="2.5"
                  fill="#FBBF24"
                  stroke="#D97706"
                  strokeWidth="0.8"
                  style={{ animation: 'crumbFlyLeft 0.55s ease-out forwards' }}
                />
                <circle
                  cx="172"
                  cy="138"
                  r="2.8"
                  fill="#FEF08A"
                  stroke="#D97706"
                  strokeWidth="0.8"
                  style={{ animation: 'crumbFlyRight 0.55s ease-out forwards' }}
                />
                <circle
                  cx="154"
                  cy="152"
                  r="2.2"
                  fill="#F59E0B"
                  stroke="#B45309"
                  strokeWidth="0.6"
                  style={{ animation: 'crumbFlyDown 0.55s ease-out forwards' }}
                />
                <circle
                  cx="166"
                  cy="152"
                  r="2.4"
                  fill="#FBBF24"
                  stroke="#B45309"
                  strokeWidth="0.6"
                  style={{ animation: 'crumbFlyDown 0.55s ease-out 0.05s forwards' }}
                />
              </g>
            </g>
          )}

          {/* ================= NAIVEDYAM BANANA LEAF PLATTER (AT HIS LOTUS FEET) ================= */}
          <g id="naivedyam-platter" transform="translate(100, 275)">
            {/* Platter Shadow */}
            <ellipse cx="60" cy="35" rx="55" ry="12" fill="#78350F" fillOpacity="0.25" />

            {/* Banana Leaf Shape */}
            <path
              d="M10 32 C15 20 105 20 110 32 C112 44 8 44 10 32 Z"
              fill="url(#leafPlatterGrad)"
              stroke="#14532D"
              strokeWidth="2"
            />
            {/* Vein lines */}
            <path d="M14 32 H106" stroke="#86EFAC" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M28 32 L38 25 M50 32 L60 25 M72 32 L82 25 M94 32 L104 25" stroke="#166534" strokeWidth="1" opacity="0.6" />

            {/* Modaks on platter */}
            {/* Left Modak (Static reserve) */}
            <g transform="translate(20, 16)">
              <ellipse cx="8" cy="16" rx="7" ry="2" fill="#B45309" fillOpacity="0.25" />
              <path
                d="M8 3 C8 3 3 8 2 12 C1 15 4 17 8 17 C12 17 15 15 14 12 C13 8 8 3 8 3 Z"
                fill="url(#sweetModakGrad)"
                stroke="#B45309"
                strokeWidth="1.2"
              />
              <path d="M8 3 V17" stroke="#D97706" strokeWidth="0.8" />
              <circle cx="8" cy="3.5" r="0.9" fill="#DC2626" />
            </g>

            {/* Center Modak Offering */}
            <g transform="translate(52, 12)">
              <ellipse cx="10" cy="18" rx="8" ry="2.2" fill="#B45309" fillOpacity="0.3" />
              <path
                d="M10 2 C10 2 4 8 3 13 C2 17 5 19 10 19 C15 19 18 17 17 13 C16 8 10 2 10 2 Z"
                fill="url(#sweetModakGrad)"
                stroke="#B45309"
                strokeWidth="1.4"
              />
              <path d="M10 2 V19" stroke="#D97706" strokeWidth="1" />
              <circle cx="10" cy="3" r="1.2" fill="#DC2626" />
            </g>

            {/* Steamed Undralu Dumpling */}
            <g transform="translate(76, 18)">
              <ellipse cx="8" cy="14" rx="7" ry="2" fill="#78350F" fillOpacity="0.25" />
              <circle cx="8" cy="8.5" r="6.5" fill="url(#sweetUndraluGrad)" stroke="#CA8A04" strokeWidth="1.2" />
              <circle cx="6" cy="7" r="1" fill="#EA580C" />
              <circle cx="10" cy="9" r="0.9" fill="#B45309" />
              <circle cx="8" cy="5" r="1" fill="#DC2626" />
            </g>

            {/* Auspicious Red Lotus Flower beside plate */}
            <g transform="translate(98, 24)">
              <circle cx="0" cy="0" r="4.5" fill="#E11D48" stroke="#9F1239" strokeWidth="0.8" />
              <circle cx="-3" cy="-3" r="3.5" fill="#FB7185" />
              <circle cx="3" cy="-3" r="3.5" fill="#FB7185" />
              <circle cx="0" cy="0" r="1.8" fill="#FDE047" />
            </g>
          </g>

          {/* ================= LOYAL MOOSHIKA (THE SACRED MOUSE VEHICLE) ================= */}
          <g id="mooshika-mouse" transform="translate(42, 290)">
            {/* Mouse Shadow */}
            <ellipse cx="14" cy="28" rx="14" ry="4" fill="#78350F" fillOpacity="0.3" />
            {/* Mouse Body (Plump grey mouse sitting reverently) */}
            <ellipse cx="14" cy="20" rx="11" ry="9" fill="#94A3B8" stroke="#475569" strokeWidth="1.2" />
            {/* Mouse Head looking up at Ganesha */}
            <circle cx="21" cy="14" r="6.5" fill="#94A3B8" stroke="#475569" strokeWidth="1.2" />
            {/* Mouse Ear */}
            <circle cx="19" cy="8" r="4" fill="#FDA4AF" stroke="#E11D48" strokeWidth="0.8" />
            {/* Cute Black Eye */}
            <circle cx="23" cy="13" r="1.5" fill="#0F172A" />
            <circle cx="23.5" cy="12.5" r="0.5" fill="#FFFFFF" />
            {/* Tiny Pink Snout */}
            <circle cx="27" cy="15" r="1.2" fill="#F43F5E" />
            {/* Tiny Front Paws holding a miniature modak */}
            <ellipse cx="23" cy="20" rx="3" ry="2" fill="#CBD5E1" stroke="#475569" strokeWidth="0.8" />
            <circle cx="25" cy="19" r="2.2" fill="url(#sweetModakGrad)" stroke="#B45309" strokeWidth="0.6" />
            {/* Curly Cute Mouse Tail */}
            <path d="M4 22 C-4 22 -4 10 2 12" stroke="#64748B" strokeWidth="1.4" fill="none" strokeLinecap="round" />
            {/* Little golden festive tikka on Mooshika */}
            <circle cx="21" cy="10" r="1.2" fill="#DC2626" />
          </g>

          {/* ================= DYNAMIC ANIMATED TRUNK (SOND) ================= */}
          {/* Performs the feeding motion: picks from plate, brings to mouth, feeds, curls in bliss */}
          <g id="animated-trunk">
            {stage === 'reaching' ? (
              /* Trunk reaching all the way down to the platter sweet */
              <path
                d="M160 128 C162 165 158 225 146 270 C140 286 128 286 128 274 C128 260 140 240 148 215"
                fill="none"
                stroke="url(#ganeshaSkin)"
                strokeWidth="14"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-all duration-300"
              />
            ) : stage === 'lifting' ? (
              /* Trunk carrying the sweet upwards towards mouth */
              <path
                d="M160 128 C165 158 158 200 145 220 C132 230 122 215 132 200 C144 180 156 170 160 155"
                fill="none"
                stroke="url(#ganeshaSkin)"
                strokeWidth="14"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-all duration-300"
              />
            ) : isEating ? (
              /* Trunk held right beside the mouth, actively feeding the moving mouth */
              <path
                d="M160 128 C162 144 152 158 138 158 C124 158 120 144 132 138 C144 132 154 142 158 144"
                fill="none"
                stroke="url(#ganeshaSkin)"
                strokeWidth="14"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-all duration-150"
              />
            ) : stage === 'satisfied' ? (
              /* Trunk curled up triumphantly in bliss and blessing */
              <path
                d="M160 128 C155 150 136 162 124 156 C112 148 112 130 126 122 C136 116 146 128 140 136"
                fill="none"
                stroke="url(#ganeshaSkin)"
                strokeWidth="14"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-all duration-300"
              />
            ) : (
              /* Natural resting Ganesha curved trunk */
              <path
                d="M160 128 C160 152 148 170 134 170 C120 170 115 152 128 146 C138 142 148 152 140 158"
                fill="none"
                stroke="url(#ganeshaSkin)"
                strokeWidth="14"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-all duration-300"
              />
            )}

            {/* High-contrast trunk outline */}
            {stage === 'reaching' ? (
              <path
                d="M160 128 C162 165 158 225 146 270 C140 286 128 286 128 274 C128 260 140 240 148 215"
                fill="none"
                stroke="#C2410C"
                strokeWidth="2.8"
                strokeLinecap="round"
              />
            ) : stage === 'lifting' ? (
              <path
                d="M160 128 C165 158 158 200 145 220 C132 230 122 215 132 200 C144 180 156 170 160 155"
                fill="none"
                stroke="#C2410C"
                strokeWidth="2.8"
                strokeLinecap="round"
              />
            ) : isEating ? (
              <path
                d="M160 128 C162 144 152 158 138 158 C124 158 120 144 132 138 C144 132 154 142 158 144"
                fill="none"
                stroke="#C2410C"
                strokeWidth="2.8"
                strokeLinecap="round"
              />
            ) : stage === 'satisfied' ? (
              <path
                d="M160 128 C155 150 136 162 124 156 C112 148 112 130 126 122 C136 116 146 128 140 136"
                fill="none"
                stroke="#C2410C"
                strokeWidth="2.8"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M160 128 C160 152 148 170 134 170 C120 170 115 152 128 146 C138 142 148 152 140 158"
                fill="none"
                stroke="#C2410C"
                strokeWidth="2.8"
                strokeLinecap="round"
              />
            )}

            {/* Sacred golden ring ornament on trunk */}
            <circle cx="144" cy="154" r="4" fill="#FEF08A" stroke="#B45309" strokeWidth="1.2" />
          </g>

          {/* ================= DYNAMIC SWEET BEING EATEN ================= */}
          {/* Rises up from the platter to mouth, shrinks with bites, surrounded by sparkles! */}
          {activeFoodOpacity > 0 && (
            <g
              transform={`translate(${activeFoodX}, ${activeFoodY}) scale(${activeFoodScale})`}
              className="transition-all duration-300"
            >
              {currentFood === 'modak' ? (
                /* Dynamic Golden Modak */
                <g transform="translate(-10, -14)">
                  {/* Outer Golden Glow so it pops vibrantly */}
                  <path
                    d="M10 2 C10 2 3 8 2 13 C1 18 5 21 10 21 C15 21 19 18 18 13 C17 8 10 2 10 2 Z"
                    fill="#FEF08A"
                    opacity="0.55"
                    transform="scale(1.25) translate(-1.8, -2.5)"
                  />
                  <ellipse cx="10" cy="20" rx="9" ry="3" fill="#B45309" fillOpacity="0.4" />
                  <path
                    d="M10 2 C10 2 3 8 2 13 C1 18 5 21 10 21 C15 21 19 18 18 13 C17 8 10 2 10 2 Z"
                    fill="url(#sweetModakGrad)"
                    stroke="#92400E"
                    strokeWidth="1.6"
                  />
                  {/* Fluted pleat lines */}
                  <path d="M10 2 V21" stroke="#D97706" strokeWidth="1.2" strokeLinecap="round" />
                  <path d="M10 3 C7 8 5 14 5 20" stroke="#D97706" strokeWidth="1" strokeLinecap="round" />
                  <path d="M10 3 C13 8 15 14 15 20" stroke="#D97706" strokeWidth="1" strokeLinecap="round" />
                  {/* Saffron & kumkum dot on top tip */}
                  <circle cx="10" cy="3" r="1.4" fill="#DC2626" />
                </g>
              ) : (
                /* Dynamic Steamed Undralu Dumpling */
                <g transform="translate(-10, -12)">
                  <circle cx="10" cy="10" r="12" fill="#FEF08A" opacity="0.5" />
                  <ellipse cx="10" cy="19" rx="8.5" ry="3" fill="#78350F" fillOpacity="0.3" />
                  <circle cx="10" cy="10" r="9" fill="url(#sweetUndraluGrad)" stroke="#B45309" strokeWidth="1.6" />
                  {/* Cumin & Chana Dal seasoning specks */}
                  <circle cx="7" cy="8" r="1.4" fill="#EA580C" />
                  <circle cx="13" cy="12" r="1.3" fill="#B45309" />
                  <circle cx="9" cy="14" r="1.2" fill="#D97706" />
                  <circle cx="10" cy="6" r="1.5" fill="#DC2626" />
                </g>
              )}
            </g>
          )}
        </svg>
      </div>

      {/* Auspicious Naivedyam Caption & Action Indicator */}
      <div className="mt-1 flex items-center justify-center gap-2 px-3.5 py-1 rounded-full bg-amber-100/90 border border-amber-300/80 text-[11px] sm:text-xs font-black text-amber-950 shadow-2xs">
        <span className="text-sm select-none" role="img" aria-label="sacred diya">🪔</span>
        <span>
          {stage === 'reaching'
            ? `Lord Vinayaka picking ${currentFood === 'modak' ? 'Modak' : 'Undrallu'}... 🥟`
            : stage === 'lifting'
            ? `Lifting sweet ${currentFood === 'modak' ? 'Modak' : 'Undrallu'} to mouth... ✨`
            : isEating
            ? `Munching sweet ${currentFood === 'modak' ? 'Modak' : 'Undrallu'}! 😋`
            : stage === 'satisfied'
            ? 'Lord Vinayaka is blissful! 🌸'
            : 'Lord Vinayaka enjoying sacred Naivedyam ✨'}
        </span>
      </div>

      {/* Interactive Tap-To-Feed Button */}
      <button
        type="button"
        id="feed-ganesha-btn"
        onClick={handleManualFeed}
        className="mt-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 active:scale-95 text-white text-xs font-black tracking-wide shadow-md border border-amber-300/90 flex items-center gap-2 cursor-pointer transition-all hover:shadow-lg"
        title="Tap to feed Modak to Ganesha and hear him munch!"
      >
        <span className="text-sm">🥟</span>
        <span>Tap to Feed Modak!</span>
        <span className="bg-amber-950/20 px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 text-amber-100">
          <span>🔊</span> Munch Sound
        </span>
      </button>

      {/* Custom Keyframe Animations */}
      <style>{`
        /* Chomp & chew mouth animation */
        @keyframes ganeshaMouthChomp {
          0% {
            transform: scale(0.9, 0.45) translateY(-1px);
          }
          100% {
            transform: scale(1.18, 1.35) translateY(2.5px);
          }
        }

        @keyframes vinayakaBlessingPop {
          0% {
            transform: scale(0.6) translateY(6px);
            opacity: 0;
          }
          70% {
            transform: scale(1.08) translateY(-2px);
            opacity: 1;
          }
          100% {
            transform: scale(1) translateY(0);
            opacity: 1;
          }
        }

        @keyframes yumFloatPop {
          0% {
            transform: scale(0.2) translateY(10px) rotate(-6deg);
            opacity: 0;
          }
          35% {
            transform: scale(1.22) translateY(-4px) rotate(4deg);
            opacity: 1;
          }
          70% {
            transform: scale(1) translateY(-6px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: scale(0.9) translateY(-14px) rotate(2deg);
            opacity: 0;
          }
        }

        @keyframes sparkleTwinklePop {
          0% {
            transform: scale(0) rotate(0deg);
            opacity: 0;
          }
          35% {
            transform: scale(1.4) rotate(45deg);
            opacity: 1;
          }
          70% {
            transform: scale(1) rotate(90deg);
            opacity: 0.9;
          }
          100% {
            transform: scale(0.2) rotate(140deg);
            opacity: 0;
          }
        }

        @keyframes crumbFlyLeft {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(-16px, 8px) scale(0.2);
            opacity: 0;
          }
        }

        @keyframes crumbFlyRight {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(16px, 8px) scale(0.2);
            opacity: 0;
          }
        }

        @keyframes crumbFlyDown {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(0, 14px) scale(0.2);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
