import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TileItem, GamePhase } from '../types';
import { TileCard } from './TileCard';
import { FestiveIcon } from './FestiveIcons';

interface TileGridProps {
  tiles: TileItem[];
  phase: GamePhase;
  onTileClick: (index: number) => void;
  mushakActive: boolean;
  mushakText?: string;
}

export const TileGrid: React.FC<TileGridProps> = ({
  tiles,
  phase,
  onTileClick,
  mushakActive,
  mushakText = 'Mushak secretly moves a tile!',
}) => {
  const count = tiles.length;

  // Custom responsive layout styling for 6, 7, and 8 cards
  let itemWidthClass = 'w-[22%] min-w-[68px] max-w-[112px]';
  let sizeClass = 'h-24 sm:h-28 md:h-32';
  let gapClass = 'gap-2.5 sm:gap-3.5';
  let containerMaxWidth = 'max-w-md sm:max-w-lg';

  if (count === 6) {
    // Level 1: 6 cards in 2 rows of 3, centered
    itemWidthClass = 'w-[30%] min-w-[85px] max-w-[135px]';
    sizeClass = 'h-28 sm:h-32 md:h-36';
    gapClass = 'gap-3 sm:gap-4';
    containerMaxWidth = 'max-w-sm sm:max-w-md';
  } else if (count === 7) {
    // Level 2: 7 cards (4 on top row, 3 centered on bottom row)
    itemWidthClass = 'w-[22%] min-w-[68px] max-w-[112px]';
    sizeClass = 'h-24 sm:h-28 md:h-32';
    gapClass = 'gap-2 sm:gap-3';
    containerMaxWidth = 'max-w-md sm:max-w-lg';
  } else if (count === 8) {
    // Level 3: 8 cards (4 on top row, 4 on bottom row)
    itemWidthClass = 'w-[22%] min-w-[68px] max-w-[112px]';
    sizeClass = 'h-24 sm:h-28 md:h-32';
    gapClass = 'gap-2 sm:gap-3';
    containerMaxWidth = 'max-w-md sm:max-w-lg';
  }

  const canClick = phase === 'guessing';

  return (
    <div className={`relative w-full ${containerMaxWidth} mx-auto px-3 sm:px-4 py-2 flex flex-col items-center justify-center flex-1`}>
      {/* Mushak Scurry Alert Banner when active */}
      <AnimatePresence>
        {mushakActive && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-0 z-20 flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500 text-amber-950 font-bold text-xs sm:text-sm shadow-md border border-amber-300 pointer-events-none"
          >
            <div className="animate-bounce">
              <FestiveIcon symbol="mushak" size={24} className="w-6 h-6" />
            </div>
            <span>{mushakText}</span>
            <span className="text-sm">🐾</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Symmetric flex-wrap container with motion layout */}
      <div
        id="tile-grid-board"
        className={`flex flex-wrap justify-center ${gapClass} w-full my-auto transition-all`}
      >
        {tiles.map((tile, idx) => (
          <motion.div
            key={tile.id}
            layout
            transition={{
              type: 'spring',
              stiffness: 280,
              damping: 24,
            }}
            className={`relative flex items-center justify-center ${itemWidthClass}`}
          >
            <TileCard
              tile={tile}
              canClick={canClick}
              onClick={() => onTileClick(idx)}
              sizeClass={sizeClass}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};
