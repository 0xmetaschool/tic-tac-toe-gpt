
/**
 * @fileoverview Game Duration Timer Component
 * Tracks and displays the elapsed time since the game started
 */

'use client';

import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface TimerProps {
  isRunning: boolean;
  startTime: Date;
}

/**
 * Timer Component
 * 
 * Displays the elapsed time since the game started. The timer automatically
 * starts when the game begins and stops when the game ends (win, lose, or draw).
 * Note: This is not a pausable timer - it only tracks active game duration.
 *
 * @param props - Component properties
 * @param props.isRunning - Indicates if the game is active
 * @param props.startTime - The time when the game started
 */

const Timer = ({ isRunning, startTime }: TimerProps) => {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isRunning) {
      intervalId = setInterval(() => {
        const now = new Date();
        const elapsed = Math.floor((now.getTime() - startTime.getTime()) / 1000);
        setElapsedTime(elapsed);
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning, startTime]);

  /**
   * Converts total seconds into MM:SS format
   * @param seconds - Total number of seconds to format
   * @returns Formatted time string (e.g., "05:30")
   */
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h3 className="font-semibold mb-3 flex items-center gap-2">
        <Clock className="w-4 h-4" />
        Game Timer
      </h3>
      <div className="text-3xl font-mono text-center">
        {formatTime(elapsedTime)}
      </div>
      <div className="text-xs text-gray-500 text-center mt-2">
        {isRunning ? 'Game in progress' : 'Game paused'}
      </div>
    </div>
  );
};

export default Timer;