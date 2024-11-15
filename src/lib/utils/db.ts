/**
 * @fileoverview Database Connection Utility
 * Manages MongoDB connection with connection pooling and caching
 */

import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

/**
 * Global mongoose connection interface
 * Used for connection pooling and caching
 */

interface GlobalMongoose {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: GlobalMongoose | undefined;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

/**
 * Connects to MongoDB with connection pooling
 * 
 * Features:
 * - Connection caching
 * - Automatic reconnection
 * - Buffer command handling
 * - Error handling
 * 
 * @returns Promise resolving to mongoose connection
 * @throws Error if connection fails
 * 
 */

async function connectDB() {
  if (cached?.conn) {
    return cached.conn;
  }

  if (!cached?.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached!.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
      return mongoose;
    });
  }
  try {
    cached!.conn = await cached?.promise!;
  } catch (e) {
    cached!.promise = null;
    throw e;
  }

  return cached!.conn;
}

export default connectDB;