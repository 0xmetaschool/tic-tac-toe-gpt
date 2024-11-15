/**
 * @fileoverview AI Move Generator API Route
 * Handles AI opponent move generation using OpenAI integration
 */

import { NextResponse } from 'next/server';
import OpenAI from 'openai';

interface GameState {
  board: (string | null)[];
  size: number;
  difficulty: 'easy' | 'medium' | 'hard';
  previousMoves?: Array<{
    position: number;
    player: string | null;
  }>;
}

/** 
 * Generates a string representation of the board for AI visualization
 * 
 * @param board - Current game board state
 * @param size - Board size (3x3, 4x4, or 5x5)
 * @returns Formatted string representation of the board
 * 
 */

function generateBoardDisplay(board: (string | null)[], size: number): string {
  let display = '';
  for (let i = 0; i < size; i++) {
    const row = board.slice(i * size, (i + 1) * size)
      .map((cell, j) => {
        const position = i * size + j;
        return cell || position.toString();
      })
      .join(' | ');
    display += row + '\n';
    if (i < size - 1) {
      display += '-'.repeat(size * 4 - 1) + '\n';
    }
  }
  return display;
}

/**
 * Generates the system prompt based on difficulty level
 * 
 * @param difficulty - Selected game difficulty
 * @returns Appropriate system prompt for the AI
 */

function getSystemPrompt(difficulty: 'easy' | 'medium' | 'hard'): string {
  const basePrompt = `You are playing as O in a Tic Tac Toe game. You must choose a valid move from the available positions. 
  Your response must be only a single number representing your chosen position from the available numbers shown on the board.
  You must select a position that is not already taken (positions marked with X or O are taken).`;

  switch (difficulty) {
    case 'hard':
      return `${basePrompt}
      You are a Tic Tac Toe expert. 
      Analyze the board deeply and make the optimal move.
      First priority is winning moves, second is blocking opponent's winning moves, third is creating winning opportunities.
      Always think several moves ahead for the best strategic position.`;
    
    case 'medium':
      return `${basePrompt}
      You are a casual Tic Tac Toe player.
      Make reasonable moves but occasionally make minor mistakes.
      Sometimes miss non-obvious winning opportunities.
      Focus mainly on immediate threats and opportunities.`;
    
    case 'easy':
      return `${basePrompt}
      You are a beginner at Tic Tac Toe.
      Play casually without deep analysis.
      Frequently overlook winning opportunities and threats.
      Focus only on the current move without planning ahead.`;
    
    default:
      return basePrompt;
  }
}


/**
 * POST /api/ai/move
 * 
 * Generates the AI's next move based on:
 * - Current board state
 * - Board size
 * - Difficulty level
 * - Game history (optional)
 * 
 * Uses OpenAI's GPT model to analyze the game state and generate
 * an appropriate move based on the selected difficulty level.
 * 
 * @param req - Request object containing GameState
 * @returns Selected move position
 * 
 * @throws {400} - If AI returns invalid move
 * @throws {500} - For server or API errors
 */

export async function POST(req: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: 'Server configuration error' },
      { status: 500 }
    );
  }

  try {
    const gameState: GameState = await req.json();

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Adjust temperature based on difficulty
    const temperature = gameState.difficulty === 'easy' ? 1.0 :
                       gameState.difficulty === 'medium' ? 0.7 : 0.1;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: getSystemPrompt(gameState.difficulty)
        },
        {
          role: 'user',
          content: `Here's the current Tic Tac Toe board with available positions numbered:
          ${generateBoardDisplay(gameState.board, gameState.size)}
          Choose a position number from the available positions shown on the board (positions not marked with X or O).
          Respond with only the position number. Your response must be a valid available position.`
        }
      ],
      temperature,
      max_tokens: 10,
      presence_penalty: 0,
      frequency_penalty: 0,
    });

    const moveText = response.choices[0]?.message?.content?.trim() || '';
    const move = parseInt(moveText);

    // Validate move
    if (isNaN(move) || move < 0 || move >= gameState.board.length || gameState.board[move] !== null) {
      return NextResponse.json(
        { error: 'AI returned invalid move' },
        { status: 400 }
      );
    }

    return NextResponse.json({ move });

  } catch (error) {
    console.error('AI move error:', error);
    return NextResponse.json(
      { error: 'Failed to generate AI move' },
      { status: 500 }
    );
  }
}