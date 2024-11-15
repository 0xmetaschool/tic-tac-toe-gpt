/**
 * @fileoverview AI Service
 * Handles communication with AI move generation endpoint
 */

/**
 * Game state interface for AI move generation
 */
export interface GameState {
  board: (string | null)[];
  size: number;
  difficulty: 'easy' | 'medium' | 'hard';
  previousMoves?: Array<{
    position: number;
    player: string | null;
  }>;
}

/**
 * Gets AI's next move based on current game state
 * 
 * Communicates with the AI endpoint to:
 * - Send current game state
 * - Receive AI's chosen move
 * - Handle potential errors
 * 
 * @param gameState - Current state of the game including board and settings
 * @returns Promise resolving to the AI's chosen move position
 * @throws Error if AI move generation fails
 * 
 */

export async function getAIMove(gameState: GameState): Promise<number> {
  const response = await fetch('/api/ai/move', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(gameState),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to get AI move');
  }

  const data = await response.json();
  return data.move;
}