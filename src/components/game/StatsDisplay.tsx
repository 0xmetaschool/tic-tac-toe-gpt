/**
 * @fileoverview Stats Display Component
 * Displays game statistics in a grid layout with icons and values
 */

import React from 'react';
import { Target, Trophy, Award, Clock } from 'lucide-react';

interface StatsDisplayProps {
  stats: {
    gamesPlayed: number;
    wins: number;
    winRate: number;
    avgDuration: string;
  };
}

/**
 * StatsDisplay Component
 * 
 * Displays player statistics in a grid layout with icons and values.
 * Shows games played, wins, win rate, and average game duration.
 * 
 * @param props - Component properties
 * @param props.stats - Object containing player statistics
 */

const StatsDisplay = ({ stats }: StatsDisplayProps) => {
  const statsConfig = [
    { 
      label: 'Games Played', 
      value: stats.gamesPlayed, 
      icon: Target 
    },
    { 
      label: 'Wins', 
      value: stats.wins, 
      icon: Trophy, 
      color: 'text-green-500' 
    },
    { 
      label: 'Win Rate', 
      value: `${stats.winRate}%`, 
      icon: Award,
      color: 'text-blue-500'
    },
    { 
      label: 'Avg. Duration', 
      value: stats.avgDuration, 
      icon: Clock 
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-2xl mx-auto mb-12">
      {statsConfig.map((stat, index) => (
        <div key={index} className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <stat.icon className={`w-5 h-5 ${stat.color || 'text-gray-600'}`} />
            <span className="text-2xl font-bold">{stat.value}</span>
          </div>
          <div className="text-sm text-gray-600">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

export default StatsDisplay;