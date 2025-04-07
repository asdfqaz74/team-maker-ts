import { connectDB } from "@/lib/mongoose";
import Member from "@/models/Member";
import { sendResetEmail } from "@/lib/mailer/sendResetEmail";
import jwt from "jsonwebtoken";

export async function POST(request) {
  await connectDB();

  try {
    const body = await request.json();
    const { findPwName, findPwEmail, findPwId } = body;

    const member = await Member.findOne({
      name: findPwName,
      email: findPwEmail,
      userId: findPwId,
    });

    if (!member) {
      return Response.json(
        { error: "존재하지 않는 사용자입니다." },
        { status: 401 }
      );
    }

    const token = jwt.sign({ userId: member._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    await sendResetEmail(member.email, token);
    return Response.json(
      { message: "비밀번호 재설정 이메일이 전송되었습니다." },
      { status: 200 }
    );
  } catch (error) {
    console.error("비밀번호 찾기 중 오류: ", error);
    return Response.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
