import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI is not defined in .env.local');
  console.error('Current process.env:', Object.keys(process.env));
  throw new Error("Please define the MONGODB_URI environment variable in .env.local");
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongoose ?? { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
     console.log('🔌 Connecting to MongoDB...');
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
  }

  try {
    cached.conn = await cached.promise;
     console.log('✅ MongoDB connected successfully');
  } catch (e) {
    cached.promise = null;
    console.error('❌ MongoDB connection error:', e);
    throw e;
  }

  return cached.conn;
}
