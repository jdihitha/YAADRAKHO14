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

  // Responsive grid column configurations for 8, 10, 12, 14, 16 tiles
  let gridColsClass = 'grid-cols-4';
  let sizeClass = 'h-24 sm:h-28 md:h-30';
  let gapClass = 'gap-2 sm:gap-3';

  if (count === 8) {
    gridColsClass = 'grid-cols-4';
    sizeClass = 'h-22 sm:h-28 md:h-30';
  } else if (count === 10) {
    gridColsClass = 'grid-cols-5';
    sizeClass = 'h-20 sm:h-24 md:h-28';
  } else if (count === 12) {
    gridColsClass = 'grid-cols-4';
    sizeClass = 'h-18 sm:h-22 md:h-24';
  } else if (count === 14) {
    gridColsClass = 'grid-cols-4 sm:grid-cols-5 md:grid-cols-7';
    sizeClass = 'h-16 sm:h-20 md:h-22';
    gapClass = 'gap-1.5 sm:gap-2.5';
  } else if (count >= 16) {
    gridColsClass = 'grid-cols-4 sm:grid-cols-4 md:grid-cols-8';
    sizeClass = 'h-16 sm:h-18 md:h-20';
    gapClass = 'gap-1.5 sm:gap-2';
  }

  const canClick = phase === 'guessing';

  return (
    <div className="relative w-full max-w-xl sm:max-w-2xl mx-auto px-3 sm:px-4 py-2 flex flex-col items-center justify-center flex-1">
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

      {/* Grid container with motion layout */}
      <div
        id="tile-grid-board"
        className={`grid ${gridColsClass} ${gapClass} w-full my-auto transition-all justify-center`}
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
            className="relative flex items-center justify-center w-full"
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
