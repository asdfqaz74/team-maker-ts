import { connectDB } from "@/lib/mongoose";
import Member from "@/models/Member";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const SECRET = process.env.JWT_SECRET;

export async function POST(request) {
  await connectDB();
  const body = await request.json();
  const { token, newPassword } = body;

  try {
    const decoded = jwt.verify(token, SECRET);
    const userId = decoded.userId;

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await Member.findByIdAndUpdate(userId, { password: hashedPassword });

    return Response.json(
      { message: "비밀번호가 성공적으로 변경되었습니다." },
      { status: 200 }
    );
  } catch (error) {
    console.error("비밀번호 변경 중 오류: ", error);
    return Response.json(
      { error: "비밀번호 변경 중 오류가 발생했습니다." },
      { status: 400 }
    );
  }
}
