/**
 * @fileoverview Register API Route Handler
 * Handles new user registration and account creation
 */

import { NextResponse } from 'next/server';
import connectDB from '@/lib/utils/db';
import User from '@/lib/models/User';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

/**
 * POST /api/auth/register
 * 
 * Creates a new user account:
 * - Validates user input
 * - Checks for existing users
 * - Creates new user record
 * - Initializes user statistics
 * - Generates authentication token
 * 
 * @param req - Request object containing:
 *   - username: Desired username
 *   - email: User's email address
 *   - password: Desired password (will be hashed)
 * 
 * @returns New user data and authentication token
 * 
 * @throws {400} - If required fields are missing
 * @throws {409} - If username or email already exists
 * @throws {500} - For server-side errors
 * 
 */

export async function POST(req: Request) {
  try {
    await connectDB();
    const { username, email, password } = await req.json();

    if (!username || !email || !password) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      return NextResponse.json(
        { message: 'User with this email or username already exists' },
        { status: 409 }
      );
    }

    const user = new User({
      username,
      email,
      password,
      stats: {
        gamesPlayed: 0,
        gamesWon: 0,
        timePlayed: 0,
      },
    });

    await user.save();

    const token = jwt.sign(
      { userId: user._id },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    return NextResponse.json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        stats: user.stats,
      },
      token,
    });
    
  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}