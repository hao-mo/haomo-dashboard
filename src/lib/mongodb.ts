import { setGlobalOptions, Severity } from '@typegoose/typegoose';
import _mongoose, { type connect, type ConnectOptions } from 'mongoose';

declare global {
  // eslint-disable-next-line no-var
  var mongoose: {
    promise: ReturnType<typeof connect> | null;
    conn: typeof _mongoose | null;
  }; // This must be a `var` and not a `let / const`
}

const MONGODB_URI = process.env.MONGODB_URI || '';

if (MONGODB_URI === '') {
  throw new Error('Please define the MONGODB_URI environment variable inside .env');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function mongodbClient() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    const opts: ConnectOptions = {
      bufferCommands: false,
    };
    cached.promise = _mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }
  setGlobalOptions({ options: { allowMixed: Severity.ERROR } });

  return cached.conn;
}

export default mongodbClient;
