import { connectDB } from "@/lib/mongoose";
import Member from "@/models/Member";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET;

export async function POST(request) {
  await connectDB();

  const body = await request.json();
  const { userId, password } = body;

  const member = await Member.findOne({ userId });

  // 아이디가 존재하지 않으면 401 Unauthorized 응답
  if (!member) {
    return Response.json(
      { error: "존재하지 않는 사용자입니다." },
      { status: 401 }
    );
  }

  // 비밀번호 비교
  const isMatch = await bcrypt.compare(password, member.password);

  // 비밀번호가 일치하지 않으면 401 Unauthorized 응답
  if (!isMatch) {
    return Response.json({ error: "사용자 정보가 다릅니다." }, { status: 401 });
  }

  const token = jwt.sign(
    {
      userId: member.userId,
      name: member.name,
      email: member.email,
    },
    SECRET,
    {
      expiresIn: "7d",
    }
  );

  // 로그인 성공 시, 사용자 정보를 반환합니다.
  return Response.json(
    {
      message: "로그인 성공",
      token,
    },
    { status: 200 }
  );
}
