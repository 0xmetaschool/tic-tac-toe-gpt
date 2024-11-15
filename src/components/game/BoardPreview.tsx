/**
 * @fileoverview Board Preview Component
 * Provides an interactive preview of different board sizes with animated game simulation
 */

'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface BoardPreviewProps {
  size: 3 | 4 | 5;
  isSelected: boolean;
  onClick: () => void;
}

/**
 * BoardPreview Component
 * 
 * Displays an interactive preview of a Tic Tac Toe board with animated game simulation.
 * Used in the board size selection screen to help users visualize different board sizes.
 * 
 * Features:
 * - Animated game simulation
 * - Visual feedback for selected state
 * - Responsive grid layout
 * 
 * @param props - Component properties
 * @param props.size - Size of the board to display
 * @param props.isSelected - Whether this board size is currently selected
 * @param props.onClick - Click handler for board selection
 */

const BoardPreview: React.FC<BoardPreviewProps> = ({ size, isSelected, onClick }) => {
  const [boardState, setBoardState] = useState<(string | null)[]>(Array(size * size).fill(null));
  const [step, setStep] = useState(0);

  /**
   * Generates a sequence of moves for the animation based on board size
   * @param size - Board size
   * @returns Array of board states for animation
   */
  const getGameSteps = (size: number) => {
    if (size === 3) {
      return [
        Array(9).fill(null),
        ['X', null, null, null, null, null, null, null, null],
        ['X', null, null, null, 'O', null, null, null, null],
        ['X', null, 'X', null, 'O', null, null, null, null],
        ['X', null, 'X', null, 'O', null, 'O', null, null],
      ];
    } else if (size === 4) {
      return [
        Array(16).fill(null),
        ['X', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
        ['X', null, null, null, null, 'O', null, null, null, null, null, null, null, null, null, null],
        ['X', null, null, 'X', null, 'O', null, null, null, null, null, null, null, null, null, null],
        ['X', null, null, 'X', null, 'O', null, null, 'O', null, null, null, null, null, null, null],
      ];
    } else {
      return [
        Array(25).fill(null),
        ['X', null, null, null, null, null, 'O', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
        ['X', null, null, null, 'X', null, 'O', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
        ['X', null, null, null, 'X', null, 'O', null, 'O', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
        ['X', null, null, null, 'X', null, 'O', null, 'O', null, null, 'X', null, null, null, null, null, null, null, null, null, null, null, null, null],
      ];
    }
  };

  useEffect(() => {
    const gameSteps = getGameSteps(size);
    const timer = setInterval(() => {
      setStep((current) => (current + 1) % gameSteps.length);
    }, 2000);

    return () => clearInterval(timer);
  }, [size]);

  useEffect(() => {
    const gameSteps = getGameSteps(size);
    setBoardState(gameSteps[step]);
  }, [step, size]);

  /**
   * Get CSS classes for board layout based on size
   * @returns String of CSS classes
   */
  const getBoardStyles = () => {
    const baseWidth = size === 3 ? 'w-64' : size === 4 ? 'w-72' : 'w-80';
    const basePadding = 'p-4';
    const baseGap = 'gap-2';
    
    return `${baseWidth} ${basePadding} ${baseGap}`;
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={onClick}
        className={cn(
          'relative group rounded-xl transition-all duration-300',
          isSelected 
            ? 'bg-black text-white shadow-xl scale-105' 
            : 'bg-white hover:bg-gray-50 border-2 border-gray-300 hover:border-black hover:shadow-lg'
        )}
      >
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-white px-4 py-1 rounded-full border border-gray-200 shadow-sm">
          <span className={cn(
            'font-medium',
            isSelected ? 'text-black' : 'text-gray-600'
          )}>
            {size}×{size}
          </span>
        </div>

        <div 
          className={cn('grid', getBoardStyles())} 
          style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}
        >
          {boardState.map((cell, i) => (
            <div
              key={i}
              className={cn(
                'aspect-square flex items-center justify-center text-lg font-bold rounded-lg transition-all duration-200',
                isSelected ? 'bg-gray-800 border border-gray-700' : 'bg-gray-50 border-2 border-gray-200',
                cell ? 'animate-scale-in' : '',
                cell === 'X' ? 'text-blue-500' : cell === 'O' ? 'text-red-500' : ''
              )}
            >
              {cell}
            </div>
          ))}
        </div>
      </button>
    </div>
  );
};

export default BoardPreview;