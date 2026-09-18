import { SymbolType, TileItem, RoundConfig } from '../types';

// All 14 festival symbols requested
export const ALL_SYMBOLS: SymbolType[] = [
  'modak',
  'diya',
  'flower',
  'durva',
  'dhol',
  'kalash',
  'coconut',
  'laddu',
  'lotus',
  'mushak',
  'ganesh',
  'pomegranate',
  'mango',
  'lamp',
];

// Shuffle an array using Fisher-Yates
export function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Get active symbol pool for a specific round.
 * Gradually introduces new festival cards as difficulty increases:
 * - Round 1-2: 8 cards pool (Modak, Diya, Flower, Durva, Laddu, Kalash, Dhol, Coconut)
 * - Round 3-4: 10 cards pool (+ Lotus, Mushak)
 * - Round 5-6: 12 cards pool (+ Ganesha Symbol, Festival Lamp)
 * - Round 7+: All 14 cards pool (+ Pomegranate, Mango)
 */
export function getActiveSymbolPool(round: number): SymbolType[] {
  if (round <= 2) {
    return ['modak', 'diya', 'flower', 'durva', 'laddu', 'kalash', 'dhol', 'coconut'];
  } else if (round <= 4) {
    return [
      'modak',
      'diya',
      'flower',
      'durva',
      'laddu',
      'kalash',
      'dhol',
      'coconut',
      'lotus',
      'mushak',
    ];
  } else if (round <= 6) {
    return [
      'modak',
      'diya',
      'flower',
      'durva',
      'laddu',
      'kalash',
      'dhol',
      'coconut',
      'lotus',
      'mushak',
      'ganesh',
      'lamp',
    ];
  } else {
    // Round 7+: full 14 cards
    return ALL_SYMBOLS;
  }
}

export function getRoundConfig(round: number): RoundConfig {
  // Tile count progression requested:
  // Starts with 8 cards, then increases: 8 → 10 → 12 → 14 → 16
  // Round 1-2: 8 tiles
  // Round 3-4: 10 tiles
  // Round 5-6: 12 tiles
  // Round 7-8: 14 tiles
  // Round 9+: 16 tiles
  let tileCount = 8;
  if (round >= 9) {
    tileCount = 16;
  } else if (round >= 7) {
    tileCount = 14;
  } else if (round >= 5) {
    tileCount = 12;
  } else if (round >= 3) {
    tileCount = 10;
  }

  // Reveal duration (in ms):
  // Round 1: 2200ms
  // Round 2: 2000ms
  // Round 3: 1850ms
  // Round 4: 1700ms
  // Round 5: 1550ms
  // Round 6: 1400ms
  // Round 7+: 1200ms down to min 950ms
  const revealDurationMs = Math.max(950, 2350 - round * 150);

  // Swaps by Mushak:
  // Rounds 1-3: 1 swap
  // Rounds 4+: 1 or 2 swaps
  const swapCount = round >= 4 ? (round % 2 === 0 ? 2 : 1) : 1;

  return {
    round,
    tileCount,
    revealDurationMs,
    swapCount,
    targetSymbols: [], // Generated dynamically
  };
}

export function generateRoundTiles(round: number): {
  tiles: TileItem[];
  targets: SymbolType[];
} {
  const config = getRoundConfig(round);
  const count = config.tileCount;
  const pool = getActiveSymbolPool(round);

  // Select symbols from the current round's active pool
  let chosenSymbols: SymbolType[] = [];
  if (count <= pool.length) {
    const shuffledPool = shuffle(pool);
    chosenSymbols = shuffledPool.slice(0, count);
  } else {
    // If board needs more tiles than unique symbols in pool, add duplicates
    const firstSet = shuffle(pool);
    const extraNeeded = count - pool.length;
    const secondSet = shuffle(pool).slice(0, extraNeeded);
    chosenSymbols = shuffle([...firstSet, ...secondSet]);
  }

  // Always make sure Modak or Diya is present in early rounds for festive flavor
  if (round === 1) {
    const mustHave: SymbolType[] = ['modak', 'diya'];
    mustHave.forEach((sym, idx) => {
      if (!chosenSymbols.includes(sym)) {
        chosenSymbols[idx] = sym;
      }
    });
    chosenSymbols = shuffle(chosenSymbols);
  }

  const tiles: TileItem[] = chosenSymbols.map((symbol, index) => ({
    id: `tile-${round}-${index}-${symbol}-${Math.random().toString(36).substring(2, 6)}`,
    symbol,
    index,
    isRevealed: false,
    isMatched: false,
    isShaking: false,
    isHighlightSwap: false,
  }));

  // Targets to find:
  // Round 1: 2 targets (Modak + Diya)
  // Round 2-5: 2 targets
  // Round 6+: 2 or 3 targets
  const numTargets = round >= 6 ? (round % 3 === 0 ? 3 : 2) : 2;

  // Pick distinct targets from the generated board
  const uniqueInBoard = Array.from(new Set(chosenSymbols));
  const shuffledBoardSymbols = shuffle(uniqueInBoard);

  let targets: SymbolType[] = [];
  if (round === 1 && uniqueInBoard.includes('modak') && uniqueInBoard.includes('diya')) {
    targets = ['modak', 'diya'];
  } else {
    targets = shuffledBoardSymbols.slice(0, Math.min(numTargets, uniqueInBoard.length));
  }

  return { tiles, targets };
}

// Helper to choose distinct swap indices
export function pickSwapIndices(totalTiles: number, exclude?: [number, number]): [number, number] {
  let idx1 = Math.floor(Math.random() * totalTiles);
  let idx2 = Math.floor(Math.random() * totalTiles);
  while (idx2 === idx1) {
    idx2 = Math.floor(Math.random() * totalTiles);
  }
  if (
    exclude &&
    ((idx1 === exclude[0] && idx2 === exclude[1]) ||
      (idx1 === exclude[1] && idx2 === exclude[0]))
  ) {
    return pickSwapIndices(totalTiles);
  }
  return [idx1, idx2];
}

// Perform a single swap on the tiles array
export function performMushakSwap(tiles: TileItem[]): {
  swappedTiles: TileItem[];
  swappedIndices: [number, number];
} {
  const [idx1, idx2] = pickSwapIndices(tiles.length);
  const newTiles = [...tiles];
  const temp = newTiles[idx1];
  newTiles[idx1] = newTiles[idx2];
  newTiles[idx2] = temp;
  return {
    swappedTiles: newTiles,
    swappedIndices: [idx1, idx2],
  };
}
