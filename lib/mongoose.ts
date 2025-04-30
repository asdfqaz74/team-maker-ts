import { MONGODB_URI } from "@/constants";
import mongoose, { Mongoose } from "mongoose";

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI 환경 변수를 .env.local 파일에 정의해주세요.");
}

declare global {
  var mongooseCache: {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
  };
}

const globalWithMongoose = globalThis as typeof globalThis & {
  mongooseCache?: {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
  };
};

if (!globalWithMongoose.mongooseCache) {
  globalWithMongoose.mongooseCache = {
    conn: null,
    promise: null,
  };
}

export async function connectDB(): Promise<Mongoose> {
  const cached = globalWithMongoose.mongooseCache!;

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        dbName: "team-maker",
        bufferCommands: false,
      })
      .then((mongoose) => {
        console.log("✅ MongoDB 연결 성공");
        return mongoose;
      })
      .catch((err) => {
        console.error("❌ MongoDB 연결 오류:", err);
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
