/**
 * @fileoverview Game Statistics API Routes
 * Handles game statistics creation and retrieval
 */

import { NextResponse } from 'next/server';
import connectDB from '@/lib/utils/db';
import User from '@/lib/models/User';
import { GameStats } from '@/lib/models/GameStats';

/**
 * POST /api/game/stats
 * 
 * Updates game statistics after a game ends.
 * - Creates new game stats record
 * - Updates user's aggregate statistics
 * 
 * @param req - Request object containing:
 *   - userId: User identifier
 *   - result: Game result (won/lost/draw)
 *   - duration: Game duration in minutes
 *   - boardSize: Size of game board (3/4/5)
 *   - difficulty: Game difficulty (easy/medium/hard)
 * 
 * @returns Updated user statistics
 */

export async function POST(req: Request) {
  try {
    await connectDB();
    const data = await req.json();
    const { userId, result, duration, boardSize, difficulty } = data;

    if (!userId || !result || !duration || !boardSize || !difficulty) {
      console.error('Missing required fields:', { userId, result, duration, boardSize, difficulty });
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create new game stats record
    const gameStats = new GameStats({
      userId,
      result,
      duration,
      boardSize,
      difficulty,
      timestamp: new Date(),
    });
    await gameStats.save();

    // Update user's aggregate stats
    const updateData: any = {
      $inc: {
        'stats.gamesPlayed': 1,
        'stats.timePlayed': duration,
      },
    };

    if (result === 'won') {
      updateData.$inc['stats.gamesWon'] = 1;
    }
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true }
    );

    return NextResponse.json({
      message: 'Stats updated successfully',
      stats: updatedUser?.stats,
    });
    
  } catch (error: any) {
    console.error('Stats update error:', error);
    return NextResponse.json(
      { message: error.message || 'Failed to update stats' },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      console.error('User ID missing in request');
      return NextResponse.json(
        { message: 'User ID is required' },
        { status: 400 }
      );
    }

    const user = await User.findById(userId);
    if (!user) {
      console.error('User not found:', userId);
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    // Get recent games
    const recentGames = await GameStats.find({ userId })
      .sort({ timestamp: -1 })
      .limit(5);

    return NextResponse.json({
      stats: user.stats,
      recentGames,
    });
    
  } catch (error: any) {
    console.error('Stats fetch error:', error);
    return NextResponse.json(
      { message: error.message || 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}