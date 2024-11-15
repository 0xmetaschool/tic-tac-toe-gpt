import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for merging Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format time duration
export function formatDuration(minutes: number): string {
  if (!minutes || minutes === 0) return '-';
  if (minutes < 1) return '< 1m';
  return `${Math.round(minutes)}m`;
}

// Calculate win rate
export function calculateWinRate(wins: number, total: number): number {
  if (!total) return 0;
  return Math.round((wins / total) * 100);
}

// Format number with commas
export function formatNumber(num: number): string {
  return num.toLocaleString();
}

// Generate game ID
export function generateGameId(): string {
  return Math.random().toString(36).substr(2, 9);
}

// Parse URL search params
export function parseGameParams(searchParams: URLSearchParams) {
  const size = parseInt(searchParams.get('size') || '3');
  const difficulty = searchParams.get('difficulty') || 'easy';
  
  return {
    size: (size === 3 || size === 4 || size === 5 ? size : 3) as 3 | 4 | 5,
    difficulty: (
      difficulty === 'easy' || difficulty === 'medium' || difficulty === 'hard' 
        ? difficulty 
        : 'easy'
    ) as 'easy' | 'medium' | 'hard',
  };
}