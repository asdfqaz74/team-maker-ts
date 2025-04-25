import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI 환경 변수를 .env.local 파일에 정의해주세요.");
}

let cached = global.mongoose;

if (!cached) {
  cached = { conn: null, promise: null };
  global.mongoose = cached;
}

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        dbName: "team-maker",
        bufferCommands: false,
      })
      .then((mongoose) => {
        console.log("MongoDB에 연결되었습니다.");
        return mongoose;
      })
      .catch((err) => {
        console.error("MongoDB 연결 오류:", err);
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
