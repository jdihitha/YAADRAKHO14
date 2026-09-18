import React, { useState, useEffect, useRef } from 'react';
import { GamePhase, TileItem, SymbolType } from './types';
import {
  generateRoundTiles,
  getRoundConfig,
  performMushakSwap,
} from './utils/gameLogic';
import { soundFx } from './utils/audio';

import { TopBar } from './components/TopBar';
import { TileGrid } from './components/TileGrid';
import { TargetBanner } from './components/TargetBanner';
import { StartScreen } from './components/StartScreen';
import { GameOverModal } from './components/GameOverModal';
import { FestiveWishModal } from './components/FestiveWishModal';

const BEST_SCORE_KEY = 'judam_best_score';

export default function App() {
  const [phase, setPhase] = useState<GamePhase>('idle');
  const [round, setRound] = useState<number>(1);
  const [score, setScore] = useState<number>(0);
  const [lives, setLives] = useState<number>(3);
  const [bestScore, setBestScore] = useState<number>(() => {
    const saved = localStorage.getItem(BEST_SCORE_KEY) || localStorage.getItem('modak_memory_best_score');
    return saved ? parseInt(saved, 10) || 0 : 0;
  });
  const [isMuted, setIsMuted] = useState<boolean>(() => soundFx.getMuted());

  const [tiles, setTiles] = useState<TileItem[]>([]);
  const [targets, setTargets] = useState<SymbolType[]>([]);
  const [solvedTargets, setSolvedTargets] = useState<SymbolType[]>([]);
  const [revealDurationMs, setRevealDurationMs] = useState<number>(2200);

  const [mushakActive, setMushakActive] = useState<boolean>(false);
  const [mushakText, setMushakText] = useState<string>('Mushak secretly moves a tile!');

  const [floatingBonus, setFloatingBonus] = useState<{ text: string; id: number } | null>(null);
  const [showFestiveWish, setShowFestiveWish] = useState<boolean>(false);

  // Timers ref to avoid memory leaks
  const timersRef = useRef<number[]>([]);
  const guessingStartTimeRef = useRef<number>(0);

  const clearAllTimers = () => {
    timersRef.current.forEach((t) => clearTimeout(t));
    timersRef.current = [];
  };

  const addTimer = (fn: () => void, delayMs: number) => {
    const id = window.setTimeout(fn, delayMs);
    timersRef.current.push(id);
    return id;
  };

  useEffect(() => {
    return () => {
      clearAllTimers();
    };
  }, []);

  const checkAndUpdateBestScore = (currentScore: number) => {
    if (currentScore > bestScore) {
      setBestScore(currentScore);
      localStorage.setItem(BEST_SCORE_KEY, String(currentScore));
    }
  };

  // Start a new round
  const startRound = (targetRound: number) => {
    clearAllTimers();
    setPhase('memorize');
    setRound(targetRound);
    setSolvedTargets([]);
    setMushakActive(false);

    const { tiles: newTiles, targets: newTargets } = generateRoundTiles(targetRound);
    const config = getRoundConfig(targetRound);

    setRevealDurationMs(config.revealDurationMs);
    setTargets(newTargets);

    // Initial revealed state
    const revealedTiles = newTiles.map((t) => ({ ...t, isRevealed: true }));
    setTiles(revealedTiles);

    // Play chime on reveal
    soundFx.playChime();

    // 1. After reveal duration, cover the tiles
    addTimer(() => {
      setPhase('covering');
      setTiles((prev) => prev.map((t) => ({ ...t, isRevealed: false })));
      soundFx.playFlip();

      // 2. Mushak secretly moves / swaps tiles
      addTimer(() => {
        executeMushakMovement(revealedTiles, targetRound, config.swapCount);
      }, 450);
    }, config.revealDurationMs);
  };

  // Execute Mushak Swap logic
  const executeMushakMovement = (
    currentTiles: TileItem[],
    roundNum: number,
    swapCount: number
  ) => {
    setPhase('mushak_moving');
    setMushakActive(true);

    const mushakPhrases = [
      'Mushak scurried and shifted a tile!',
      'Mushak playfully swapped the festive cards!',
      'Look closely! Mushak changed positions!',
    ];
    setMushakText(mushakPhrases[roundNum % mushakPhrases.length]);
    soundFx.playMushakScurry();

    let workingTiles = [...currentTiles].map((t) => ({
      ...t,
      isRevealed: false,
      isMatched: false,
      isShaking: false,
      isHighlightSwap: false,
    }));

    // Perform the requested number of swaps
    let swappedPair: [number, number] = [0, 1];
    for (let s = 0; s < swapCount; s++) {
      const result = performMushakSwap(workingTiles);
      workingTiles = result.swappedTiles;
      swappedPair = result.swappedIndices;
    }

    // Brief highlight to give a fleeting visual cue of movement
    const highlightedTiles = workingTiles.map((t, idx) => ({
      ...t,
      isHighlightSwap: idx === swappedPair[0] || idx === swappedPair[1],
    }));
    setTiles(highlightedTiles);

    // End Mushak movement after brief duration and begin guessing phase
    addTimer(() => {
      setMushakActive(false);
      setTiles((prev) => prev.map((t) => ({ ...t, isHighlightSwap: false })));
      setPhase('guessing');
      guessingStartTimeRef.current = Date.now();
    }, 900);
  };

  // Player clicks a tile during guessing phase
  const handleTileClick = (index: number) => {
    if (phase !== 'guessing') return;

    const clickedTile = tiles[index];
    if (!clickedTile || clickedTile.isMatched || clickedTile.isRevealed) return;

    // Reveal the clicked tile
    soundFx.playFlip();
    setTiles((prev) =>
      prev.map((t, i) => (i === index ? { ...t, isRevealed: true } : t))
    );

    // Check if clicked tile matches an unsolved target
    const isTarget = targets.includes(clickedTile.symbol);
    const isAlreadySolved = solvedTargets.includes(clickedTile.symbol);

    if (isTarget && !isAlreadySolved) {
      // SUCCESS HIT
      soundFx.playMatchSuccess();
      const nextSolved = [...solvedTargets, clickedTile.symbol];
      setSolvedTargets(nextSolved);

      // Mark matched permanently for this round
      setTiles((prev) =>
        prev.map((t, i) => (i === index ? { ...t, isMatched: true, isRevealed: true } : t))
      );

      // Base score addition
      const hitPoints = 150 + round * 25;
      const newScore = score + hitPoints;
      setScore(newScore);
      checkAndUpdateBestScore(newScore);

      // Check if ALL targets in the round are found!
      if (nextSolved.length === targets.length) {
        // ROUND COMPLETE!
        setPhase('round_success');

        // Speed bonus calculation
        const elapsedSec = (Date.now() - guessingStartTimeRef.current) / 1000;
        let speedBonus = 0;
        if (elapsedSec < 3.0) {
          speedBonus = 100;
        } else if (elapsedSec < 5.0) {
          speedBonus = 50;
        }

        const finalRoundScore = newScore + 100 + speedBonus;
        setScore(finalRoundScore);
        checkAndUpdateBestScore(finalRoundScore);

        // Visual feedback banner
        const bonusMsg = speedBonus > 0 ? `+${100 + speedBonus} Speed Bonus!` : '+100 Round Clear!';
        setFloatingBonus({ text: bonusMsg, id: Date.now() });
        setTimeout(() => setFloatingBonus(null), 1200);

        soundFx.playRoundClear();

        // Advance to next round after celebration pause
        addTimer(() => {
          startRound(round + 1);
        }, 1200);
      }
    } else {
      // WRONG SELECTION!
      soundFx.playWrongError();

      // Shake animation
      setTiles((prev) =>
        prev.map((t, i) => (i === index ? { ...t, isShaking: true } : t))
      );

      const nextLives = lives - 1;
      setLives(nextLives);

      // Hide after brief reveal
      addTimer(() => {
        setTiles((prev) =>
          prev.map((t, i) =>
            i === index ? { ...t, isRevealed: false, isShaking: false } : t
          )
        );
      }, 700);

      // Game Over check
      if (nextLives <= 0) {
        addTimer(() => {
          soundFx.playGameOver();
          setPhase('game_over');
          checkAndUpdateBestScore(score);
        }, 400);
      }
    }
  };

  // Start / Restart / Play Again
  const handleInitiateStart = () => {
    soundFx.playChime();
    setShowFestiveWish(true);
  };

  const handleProceedFromWish = () => {
    setShowFestiveWish(false);
    setScore(0);
    setLives(3);
    startRound(1);
  };

  const handleRestart = () => {
    clearAllTimers();
    soundFx.playChime();
    setScore(0);
    setLives(3);
    startRound(1);
  };

  const handleReturnHome = () => {
    clearAllTimers();
    soundFx.playChime();
    setScore(0);
    setLives(3);
    setPhase('idle');
  };

  const handleToggleMute = () => {
    const nextMuted = soundFx.toggleMute();
    setIsMuted(nextMuted);
  };

  return (
    <main
      className="min-h-screen w-full flex flex-col justify-between bg-[#FFFDF7] text-[#4A1504] relative overflow-hidden"
      id="judam-game-app"
    >
      {/* Subtle warm corner accents */}
      <div className="absolute -top-16 -left-16 w-56 h-56 rounded-full border-[10px] border-amber-200/30 pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full border-[12px] border-orange-200/25 pointer-events-none" />

      {/* Floating score bonus feedback */}
      {floatingBonus && (
        <div
          key={floatingBonus.id}
          className="fixed top-24 left-1/2 -translate-x-1/2 z-40 px-3 py-1.5 rounded-full bg-emerald-600 text-white font-black text-sm shadow-lg animate-bounce pointer-events-none"
        >
          {floatingBonus.text}
        </div>
      )}

      {/* Happy Ganesh Chaturthi Wish Modal */}
      {showFestiveWish && (
        <FestiveWishModal onProceed={handleProceedFromWish} />
      )}

      {/* When in idle phase: clean, cute, cool Start Screen */}
      {phase === 'idle' ? (
        <StartScreen onStart={handleInitiateStart} bestScore={bestScore} />
      ) : (
        <>
          {/* Top: Score | ❤️ Lives | Round */}
          <TopBar
            score={score}
            lives={lives}
            maxLives={3}
            round={round}
            isMuted={isMuted}
            onToggleMute={handleToggleMute}
            onRestart={handleRestart}
          />

          {/* Center Card Grid */}
          <TileGrid
            tiles={tiles}
            phase={phase}
            onTileClick={handleTileClick}
            mushakActive={mushakActive}
            mushakText={mushakText}
          />

          {/* Bottom Target Banner: Find: MODAK + DIYA */}
          <TargetBanner
            targets={targets}
            solvedTargets={solvedTargets}
            phase={phase}
            revealDurationMs={revealDurationMs}
          />
        </>
      )}

      {/* Game Over Modal */}
      {phase === 'game_over' && (
        <GameOverModal
          score={score}
          bestScore={bestScore}
          round={round}
          onPlayAgain={handleRestart}
          onRestart={handleRestart}
          onHome={handleReturnHome}
        />
      )}
    </main>
  );
}
