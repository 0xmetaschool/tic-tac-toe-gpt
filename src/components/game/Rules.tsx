/**
 * @fileoverview Game Rules Component
 * Displays the game rules and strategy tips based on board size
 */

import React from 'react';
import { ScrollText } from 'lucide-react';

interface RulesProps {
  size: 3 | 4 | 5;
}

/**
 * Rules Component
 * 
 * Displays the game rules and strategy tips, dynamically adjusted based on
 * the current board size. Includes basic game rules and advanced strategies
 * for larger board sizes.
 * 
 * @param props - Component props
 * @param props.size - Current board size
 * 
 * @returns React Component
 */

const Rules = ({ size }: RulesProps) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h3 className="font-semibold mb-3 flex items-center gap-2">
        <ScrollText className="w-4 h-4" />
        Game Rules
      </h3>
      <ul className="text-sm text-gray-600 space-y-2">
        <li>• Get {size} in a row horizontally, vertically, or diagonally to win</li>
        <li>• You play as X (Blue), AI plays as O (Red)</li>
        <li>• X always goes first</li>
        {size > 3 && (
          <>
            <li>• Larger {size}x{size} board requires more strategic thinking</li>
            <li>• Consider blocking opponent's moves while planning your victory</li>
          </>
        )}
        <li>• Game ends when someone wins or the board is full (draw)</li>
      </ul>
      <div className="mt-4">
        <h4 className="font-medium mb-2">Strategy Tips:</h4>
        <ul className="text-sm text-gray-600 space-y-2">
          <li>• Try to control the center spaces</li>
          <li>• Watch for potential winning moves by the AI</li>
          <li>• Plan your moves at least 2 steps ahead</li>
        </ul>
      </div>
    </div>
  );
};

export default Rules;