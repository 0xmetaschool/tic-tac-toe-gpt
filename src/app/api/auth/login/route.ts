/**
 * @fileoverview Login API Route Handler
 * Handles user authentication and session management
 */

import { NextResponse } from 'next/server';
import connectDB from '@/lib/utils/db';
import User from '@/lib/models/User';

/**
 * POST /api/auth/login
 * 
 * Authenticates a user with email and password
 * - Validates credentials
 * - Returns user data on successful login
 * - Handles error cases with appropriate responses
 * 
 * @param req - Request object containing:
 *   - email: User's email address
 *   - password: User's password (plain text, will be compared with hashed version)
 * 
 * @returns User data without sensitive information
 * 
 * @throws {400} - If email or password is missing
 * @throws {401} - If credentials are invalid
 * @throws {500} - For server-side errors
 * 
 */

export async function POST(req: Request) {
  try {
    await connectDB();
    
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      );
    }
    
    return NextResponse.json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        stats: user.stats,
      }
    });
    
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}