export type SymbolType =
  | 'modak'
  | 'diya'
  | 'flower'
  | 'durva'
  | 'dhol'
  | 'kalash'
  | 'coconut'
  | 'laddu'
  | 'lotus'
  | 'mushak'
  | 'ganesh'
  | 'pomegranate'
  | 'mango'
  | 'lamp';

export interface SymbolDef {
  id: SymbolType;
  name: string;
  hindiName?: string;
  color: string;
}

export interface TileItem {
  id: string; // unique instance id for animation & tracking
  symbol: SymbolType;
  index: number;
  isRevealed: boolean;
  isMatched: boolean;
  isShaking: boolean;
  isHighlightSwap: boolean;
}

export type GamePhase =
  | 'idle'           // Before start
  | 'memorize'       // Tiles are revealed
  | 'covering'       // Tiles flip back to hidden
  | 'mushak_moving'  // Mushak sneaks in and swaps tile positions
  | 'guessing'       // Player clicks tiles to match target
  | 'round_success'  // Level solved, streak bonus & celebration
  | 'game_won'       // All 3 levels completed!
  | 'game_over';     // Lives = 0

export interface RoundConfig {
  level: number;
  tileCount: number;
  askCount: number;
  revealDurationMs: number;
  swapCount: number;
  targetSymbols: SymbolType[];
}
