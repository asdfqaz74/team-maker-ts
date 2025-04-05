import { connectDB } from "@/lib/mongoose";

export async function POST(request) {
  await connectDB();

  const body = await request.json();
  const { userId, password } = body;
}
