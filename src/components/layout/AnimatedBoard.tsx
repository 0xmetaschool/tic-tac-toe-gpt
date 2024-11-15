/**
 * @fileoverview Animated Board Component
 * Displays an automated game demo animation for the landing page
 */

'use client';

import React, { useEffect, useState } from 'react';

type CellValue = 'X' | 'O' | null;
type Move = {
  pos: number;
  symbol: 'X' | 'O';
};

/**
 * AnimatedBoard Component
 * 
 * Renders a demonstration of the Tic Tac Toe game with animated moves.
 * Used on the landing page to show gameplay example.
 * Features:
 * - Automated move sequence
 * - Smooth animations for piece placement
 * - Continuous loop playback
 * - Visual transitions between moves
 * 
 * @returns React Component displaying an animated 3x3 game board
 */

const AnimatedBoard = () => {
  const [board, setBoard] = useState<CellValue[]>(Array(9).fill(null));
  const [isAnimating, setIsAnimating] = useState(true);

  const moves: Move[] = [
    { pos: 4, symbol: 'X' },
    { pos: 0, symbol: 'O' },
    { pos: 8, symbol: 'X' },
    { pos: 6, symbol: 'O' },
    { pos: 2, symbol: 'X' },
  ];

  useEffect(() => {
    if (!isAnimating) return;

    let moveIndex = 0;
    let timeoutId: NodeJS.Timeout;

    const animate = () => {
      if (moveIndex >= moves.length) {
        timeoutId = setTimeout(() => {
          setBoard(Array(9).fill(null));
          moveIndex = 0;
          animate();
        }, 2000);
        return;
      }

      const currentMove = moves[moveIndex];
      setBoard(prev => {
        const newBoard = [...prev];
        if (currentMove && currentMove.pos >= 0 && currentMove.pos < newBoard.length) {
          newBoard[currentMove.pos] = currentMove.symbol;
        }
        return newBoard;
      });
      moveIndex++;
      timeoutId = setTimeout(animate, 800);
    };

    animate();

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isAnimating]);

  return (
    <div className="grid grid-cols-3 gap-2 bg-white p-4 rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.08)] transition-all duration-300 w-[300px] h-[300px]">
      {board.map((cell, i) => (
        <div
          key={i}
          className={`w-full h-full bg-white flex items-center justify-center rounded-lg text-2xl font-bold border border-gray-200 transition-all duration-300
            ${cell ? 'text-black' : 'text-transparent'}
            ${cell === 'X' ? 'animate-scale-in' : cell === 'O' ? 'animate-scale-in delay-150' : ''}
          `}
        >
          <span 
            className={`transform transition-all duration-300 ${
              cell ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
            }`}
          >
            {cell || '.'}
          </span>
        </div>
      ))}
    </div>
  );
};

export default AnimatedBoard;