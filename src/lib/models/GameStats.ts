/**
 * @fileoverview Game Statistics Model
 * Mongoose model for storing individual game records and statistics
 */

import mongoose from 'mongoose';

/**
 * Game Statistics Schema
 * 
 * Defines the structure for individual game records:
 * - Links to user who played the game
 * - Records game result and duration
 * - Stores game configuration (board size, difficulty)
 * - Tracks timestamp for historical analysis
 * 
 * @remarks
 * Includes index on userId and timestamp for efficient querying
 * of user's game history
 */

const gameStatsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  result: {
    type: String,
    enum: ['won', 'lost', 'draw'],
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  boardSize: {
    type: Number,
    enum: [3, 4, 5],
    required: true,
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

gameStatsSchema.index({ userId: 1, timestamp: -1 });

export const GameStats = mongoose.models.GameStats || 
  mongoose.model('GameStats', gameStatsSchema);