/**
 * @fileoverview Game Board Page Component
 * This is the main game board component that handles the Tic Tac Toe game logic,
 * player moves, AI integration, and game state management.
 */

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/lib/context/auth-context';
import { Button } from '@/components/ui/button';
import { ChevronLeft, RotateCcw } from 'lucide-react';
import Timer from '@/components/game/Timer';
import Rules from '@/components/game/Rules';
import { cn } from '@/lib/utils';
import { getAIMove } from '@/lib/services/ai-service';

type CellValue = 'X' | 'O' | null;

type GameStatus = 'playing' | 'won' | 'lost' | 'draw';


/**
 * GameBoard Component
 * 
 * Handles the main game logic including:
 * - Board state management
 * - Player moves
 * - AI opponent integration
 * - Win condition checking
 * - Game statistics tracking
 * 
 * @returns React Component
 */

export default function GameBoard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  
  // Game configuration from URL parameters
  const size = parseInt(searchParams.get('size') || '3') as 3 | 4 | 5;
  const difficulty = searchParams.get('difficulty') as 'easy' | 'medium' | 'hard' || 'easy';
  
  // Game state management
  const [board, setBoard] = useState<CellValue[]>(Array(size * size).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');
  const [gameStatus, setGameStatus] = useState<GameStatus>('playing');
  const [gameStartTime, setGameStartTime] = useState<Date>(new Date());
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [winningCombination, setWinningCombination] = useState<number[]>([]);

  useEffect(() => {
    resetGame();
  }, [size]);

   /**
   * Checks if there's a winner on the current board
   * @param currentBoard - Current state of the game board
   * @param player - Player to check for winning ('X' or 'O')
   * @returns Array of winning cell indices or null if no winner
   */
  
  const checkWinner = (currentBoard: CellValue[], player: CellValue): number[] | null => {
    // Check rows
    for (let row = 0; row < size; row++) {
      let match = true;
      const startIndex = row * size;
      for (let col = 0; col < size; col++) {
        if (currentBoard[startIndex + col] !== player) {
          match = false;
          break;
        }
      }
      if (match) return Array.from({length: size}, (_, i) => startIndex + i);
    }

    // Check columns
    for (let col = 0; col < size; col++) {
      let match = true;
      for (let row = 0; row < size; row++) {
        if (currentBoard[row * size + col] !== player) {
          match = false;
          break;
        }
      }
      if (match) return Array.from({length: size}, (_, i) => i * size + col);
    }

    // Check diagonals
    let match = true;
    for (let i = 0; i < size; i++) {
      if (currentBoard[i * size + i] !== player) {
        match = false;
        break;
      }
    }
    if (match) return Array.from({length: size}, (_, i) => i * size + i);

    match = true;
    for (let i = 0; i < size; i++) {
      if (currentBoard[i * size + (size - 1 - i)] !== player) {
        match = false;
        break;
      }
    }
    if (match) return Array.from({length: size}, (_, i) => i * size + (size - 1 - i));

    return null;
  };

  /**
   * Handles a player's move on the board
   * @param index - Board cell index where the move is made
   */

  const handleMove = async (index: number) => {
    if (board[index] || gameStatus !== 'playing' || isAiThinking) return;

    const newBoard = [...board];
    newBoard[index] = 'X';
    setBoard(newBoard);

    // Check if player won
    const winningCombo = checkWinner(newBoard, 'X');
    if (winningCombo) {
      setWinningCombination(winningCombo);
      await handleGameEnd('won');
      return;
    }

    // Check for draw
    if (newBoard.every(cell => cell !== null)) {
      await handleGameEnd('draw');
      return;
    }

    // AI's turn
    setIsAiThinking(true);
    setCurrentPlayer('O');
    
    try {
      // Get AI move
      const aiMoveIndex = await getAIMove({
        board: newBoard,
        size,
        difficulty,
        previousMoves: board.map((cell, i) => ({ 
          position: i,
          player: cell
        })).filter(move => move.player !== null)
      });

      const finalBoard = [...newBoard];
      finalBoard[aiMoveIndex] = 'O';
      setBoard(finalBoard);

      // Check if AI won
      const aiWinningCombo = checkWinner(finalBoard, 'O');
      if (aiWinningCombo) {
        setWinningCombination(aiWinningCombo);
        await handleGameEnd('lost');
        return;
      }

      // Check for draw after AI move
      if (finalBoard.every(cell => cell !== null)) {
        await handleGameEnd('draw');
        return;
      }

      setCurrentPlayer('X');
    } catch (error) {
      console.error('AI move error:', error);
    } finally {
      setIsAiThinking(false);
    }
  };


  /**
   * Handles the end of a game, updates stats, and manages game state
   * @param result - Final game status
   */
  const handleGameEnd = async (result: GameStatus) => {
    setGameStatus(result);
    
    if (result !== 'playing' && user?.id) {
      const duration = (new Date().getTime() - gameStartTime.getTime()) / 1000 / 60;
      
      try {
        await fetch('/api/game/stats', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: user.id,
            result,
            duration,
            boardSize: size,
            difficulty
          }),
        });
      } catch (error) {
        console.error('Error updating stats:', error);
      }
    }
  };

  const resetGame = () => {
    setBoard(Array(size * size).fill(null));
    setGameStatus('playing');
    setCurrentPlayer('X');
    setGameStartTime(new Date());
    setWinningCombination([]);
    setIsAiThinking(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-10">
      <div className="container mx-auto px-4">
        {/* Game Header */}
        <div className="text-center mb-8">
          <div className="text-sm text-gray-600 mb-2">
            {size}x{size} Board • {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Difficulty
          </div>
          <div className="text-xl font-semibold h-8">
            {isAiThinking ? (
              <div className="flex items-center justify-center gap-2">
                <span className="text-gray-600">AI is thinking</span>
                <div className="w-5 h-5 animate-spin rounded-full border-b-2 border-gray-900"></div>
              </div>
            ) : gameStatus === 'playing' ? (
              `Current Turn: ${currentPlayer}`
            ) : gameStatus === 'won' ? (
              'You Won!'
            ) : gameStatus === 'lost' ? (
              'AI Won!'
            ) : (
              'Draw!'
            )}
          </div>
        </div>

        <div className="flex justify-between max-w-6xl mx-auto">
          {/* Left Side - Timer */}
          <div className="w-64">
            <Timer 
              isRunning={gameStatus === 'playing'} 
              startTime={gameStartTime}
            />
          </div>

          {/* Center - Game Board */}
          <div className="flex flex-col items-center">
            <div 
              className="grid gap-2 bg-white p-4 rounded-xl shadow-lg"
              style={{ 
                gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
                width: size === 3 ? '320px' : size === 4 ? '400px' : '480px'
              }}
            >
              {board.map((cell, index) => (
                <button
                  key={index}
                  onClick={() => handleMove(index)}
                  disabled={cell !== null || gameStatus !== 'playing' || isAiThinking}
                  className={cn(
                    'aspect-square flex items-center justify-center text-3xl font-bold',
                    'bg-gray-50 rounded-lg transition-all duration-200',
                    'hover:bg-gray-100 disabled:hover:bg-gray-50',
                    'border-2 border-gray-200',
                    cell === 'X' && 'text-blue-500',
                    cell === 'O' && 'text-red-500',
                    winningCombination.includes(index) && 'bg-yellow-100 border-yellow-400'
                  )}
                >
                  {cell}
                </button>
              ))}
            </div>

            {/* Game Controls */}
            <div className="flex gap-4 mt-6">
              <Button
                onClick={() => router.push('/game')}
                variant="outline"
                className="gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </Button>
              <Button
                onClick={resetGame}
                variant="outline"
                className="gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Play Again
              </Button>
            </div>
          </div>

          {/* Right Side - Rules */}
          <div className="w-64">
            <Rules size={size} />
          </div>
        </div>
      </div>
    </div>
  );
}