/**
 * @fileoverview Game Home Page
 * Main game configuration and stats display page
 */

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/context/auth-context';
import StatsDisplay from '@/components/game/StatsDisplay';
import BoardSizeSelector from '@/components/game/BoardSizeSelector';
import DifficultySelector from '@/components/game/DifficultySelector';
import { Button } from '@/components/ui/button';
import LoadingOverlay from '@/components/ui/loading-overlay';

interface GameStats {
  gamesPlayed: number;
  gamesWon: number;
  timePlayed: number;
}


/**
 * GameHome Component
 * 
 * Main game configuration page that allows users to:
 * - View their game statistics
 * - Select board size
 * - Choose difficulty level
 * - Start a new game
 * 
 * Features:
 * - Real-time stats loading
 * - Interactive board size selection
 * - Difficulty level configuration
 * - Loading state management
 */

export default function GameHome() {
  const router = useRouter();
  const { user } = useAuth();
  const [selectedSize, setSelectedSize] = useState<3 | 4 | 5>(3);
  const [selectedDifficulty, setSelectedDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [stats, setStats] = useState<GameStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch fresh stats when component mounts or when returning from a game
  useEffect(() => {
    const fetchStats = async () => {
      if (user?.id) {
        try {
          const response = await fetch(`/api/game/stats?userId=${user.id}`);
          if (response.ok) {
            const data = await response.json();
            setStats(data.stats);
          } else {
            console.error('Failed to fetch stats');
          }
        } catch (error) {
          console.error('Error fetching stats:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchStats();
  }, [user?.id]);

  const handleStartGame = () => {
    router.push(`/game/board?size=${selectedSize}&difficulty=${selectedDifficulty}`);
  };

  // Calculate stats for display
  const winRate = stats?.gamesPlayed 
    ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100) 
    : 0;

  const formatDuration = (minutes: number) => {
    if (!minutes || minutes === 0) return '-';
    if (minutes < 1) return '< 1m';
    return `${Math.round(minutes)}m`;
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-4">
      <main className="container mx-auto px-4 py-4">
        {/* Welcome Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4">
            Welcome {user?.username}
          </h1>
          <p className="text-gray-600">
            Ready to challenge our AI? Check your stats and start a new game.
          </p>
        </div>

        {/* Stats Section */}
        {stats && (
          <StatsDisplay
            stats={{
              gamesPlayed: stats.gamesPlayed,
              wins: stats.gamesWon,
              winRate,
              avgDuration: formatDuration(stats.timePlayed / (stats.gamesPlayed || 1)),
            }}
          />
        )}

        {/* Game Setup Section */}
        <div className="max-w-4xl mx-auto">
          <BoardSizeSelector
            selectedSize={selectedSize}
            onSelectSize={setSelectedSize}
          />
          
          <DifficultySelector
            selectedDifficulty={selectedDifficulty}
            onSelectDifficulty={setSelectedDifficulty}
          />

          <div className="text-center mt-8">
            <Button
              onClick={handleStartGame}
              className="bg-black text-white px-8 py-2 text-lg hover:bg-gray-800"
            >
              Start Game
            </Button>
          </div>
        </div>
      </main>

      <LoadingOverlay isLoading={isLoading} message="Loading your stats..." />
    </div>
  );
}