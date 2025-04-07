import { connectDB } from "@/lib/mongoose";
import Member from "@/models/Member";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET;

export async function GET(request) {
  await connectDB();

  const authHeader = request.headers.get("authorization");
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return Response.json({ error: "토큰이 없습니다." }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    const member = await Member.findOne({ userId: decoded.userId }).select(
      "-password"
    );

    if (!member) {
      return Response.json(
        { error: "사용자를 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    return Response.json({ user: member }, { status: 200 });
  } catch (error) {
    console.error("토큰 검증 중 오류: ", error);
    return Response.json(
      { error: "토큰 검증 중 오류가 발생했습니다." },
      { status: 401 }
    );
  }
}
