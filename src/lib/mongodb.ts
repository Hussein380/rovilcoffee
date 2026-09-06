import mongoose from 'mongoose';

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongooseCache ?? { conn: null, promise: null };
if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

export async function dbConnect() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('Please define the MONGODB_URI environment variable in .env.local');
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(uri, {
        bufferCommands: false,
      })
      .then((m) => m);
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
