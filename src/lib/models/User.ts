/**
 * @fileoverview User Model
 * Mongoose model for user account management and statistics tracking
 */

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

/**
 * User Schema
 * 
 * Defines the structure for user accounts:
 * - Authentication information (username, email, password)
 * - Game statistics tracking
 * - Account metadata
 * 
 * Features:
 * - Automatic password hashing
 * - Password comparison method
 * - Input validation
 * - Statistics tracking
 */

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    minlength: [3, 'Username must be at least 3 characters long'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long'],
  },
  stats: {
    gamesPlayed: {
      type: Number,
      default: 0,
    },
    gamesWon: {
      type: Number,
      default: 0,
    },
    timePlayed: {
      type: Number,
      default: 0,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

/**
 * Password Hashing Middleware
 * 
 * Automatically hashes the password before saving:
 * - Only runs when password is modified
 * - Uses bcrypt for secure hashing
 * - Handles errors appropriately
 */

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

/**
 * Password Comparison Method
 * 
 * Securely compares provided password with stored hash
 * 
 * @param candidatePassword - Password to check
 * @returns Promise resolving to boolean indicating if password matches
 */

userSchema.methods.comparePassword = async function(candidatePassword: string) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;