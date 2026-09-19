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

export const TOTAL_LEVELS = 3;

/**
 * Configuration for the 3 game levels:
 * - Level 1: 6 cards on the board, ask any 2
 * - Level 2: 7 cards on the board, ask 2
 * - Level 3: 8 cards on the board, ask 3
 */
export function getRoundConfig(level: number): RoundConfig {
  if (level === 1) {
    return {
      level: 1,
      tileCount: 6,
      askCount: 2,
      revealDurationMs: 2700,
      swapCount: 1,
      targetSymbols: [],
    };
  } else if (level === 2) {
    return {
      level: 2,
      tileCount: 7,
      askCount: 2,
      revealDurationMs: 2500,
      swapCount: 1,
      targetSymbols: [],
    };
  } else {
    // Level 3
    return {
      level: 3,
      tileCount: 8,
      askCount: 3,
      revealDurationMs: 2400,
      swapCount: 1,
      targetSymbols: [],
    };
  }
}

export function generateRoundTiles(level: number): {
  tiles: TileItem[];
  targets: SymbolType[];
} {
  const config = getRoundConfig(level);
  const count = config.tileCount;
  const askCount = config.askCount;

  // Pick `count` distinct festive symbols from ALL_SYMBOLS (14 available)
  const shuffledAll = shuffle(ALL_SYMBOLS);
  const chosenSymbols = shuffledAll.slice(0, count);

  const tiles: TileItem[] = chosenSymbols.map((symbol, index) => ({
    id: `tile-lvl${level}-${index}-${symbol}-${Math.random().toString(36).substring(2, 6)}`,
    symbol,
    index,
    isRevealed: false,
    isMatched: false,
    isShaking: false,
    isHighlightSwap: false,
  }));

  // Select target symbols:
  // Level 1: ask any 2
  // Level 2: ask 2
  // Level 3: ask 3
  const shuffledBoard = shuffle(chosenSymbols);
  const targets = shuffledBoard.slice(0, askCount);

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
