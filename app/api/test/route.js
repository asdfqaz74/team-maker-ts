// /app/api/test/route.js
import { connectDB } from "@/lib/mongoose";
import User from "@/models/User";

export async function GET() {
  await connectDB();

  const users = await User.find();
  return Response.json({ message: "GET 요청 성공", users });
}

export async function POST(request) {
  try {
    console.log("POST request received");
    await connectDB();

    const body = await request.json();
    const user = await User.create(body);
    return Response.json(user);
  } catch (error) {
    console.error("POST 요청 처리 중 오류:", error);
    return Response.json(
      { error: "데이터를 저장하는 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
