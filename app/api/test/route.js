// /app/api/test/route.js
import { connectDB } from "@/lib/mongoose";

export async function GET() {
  await connectDB();
  return Response.json({ message: "✅ DB 연결 성공!" });
}
