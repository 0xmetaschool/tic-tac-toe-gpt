/**
 * @fileoverview Difficulty Selector Component
 * Provides UI for selecting game difficulty levels with visual indicators
 */

import React from 'react';
import { cn } from '@/lib/utils';
import { Gamepad2, Bot, Cpu } from 'lucide-react';

type Difficulty = 'easy' | 'medium' | 'hard';

interface DifficultySelectorProps {
  selectedDifficulty: Difficulty;
  onSelectDifficulty: (difficulty: Difficulty) => void;
}

/**
 * DifficultySelector Component
 * 
 * Provides an interactive interface for selecting the game difficulty level.
 * Each difficulty level is represented with a unique icon and visual styling.
 * 
 * Difficulty Levels:
 * - Easy: Basic AI with simple move selection
 * - Medium: Moderate AI with basic strategy
 * - Hard: Advanced AI with optimal move selection
 * 
 * @param props - Component props
 * @param props.selectedDifficulty - Currently selected difficulty level
 * @param props.onSelectDifficulty - Callback function when difficulty is changed
 * 
 * @returns React Component
 */

const DifficultySelector = ({
  selectedDifficulty,
  onSelectDifficulty,
}: DifficultySelectorProps) => {
  const difficulties = [
    { 
      value: 'easy', 
      label: 'Easy', 
      icon: Gamepad2
    },
    { 
      value: 'medium', 
      label: 'Medium', 
      icon: Bot
    },
    { 
      value: 'hard', 
      label: 'Hard', 
      icon: Cpu
    },
  ] as const;

  return (
    <div className="mb-10">
      <h3 className="text-xl font-semibold text-center mb-6">Select Difficulty</h3>
      <div className="flex justify-center gap-4">
        {difficulties.map(({ value, label, icon: Icon }) => (
          <button
            key={value}
            onClick={() => onSelectDifficulty(value)}
            className={cn(
              'px-6 py-3 rounded-xl font-medium transition-all w-40',
              'flex flex-col items-center gap-2',
              selectedDifficulty === value
                ? 'bg-black text-white shadow-lg scale-105'
                : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-gray-300'
            )}
          >
            <Icon
              className={cn(
                'w-6 h-6',
                selectedDifficulty === value ? 'text-white' : 'text-gray-600'
              )}
            />
            <div className="text-base font-semibold">{label}</div>
            <div 
              className={cn(
                "text-xs",
                selectedDifficulty === value ? 'text-gray-300' : 'text-gray-500'
              )}
            >

            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DifficultySelector;