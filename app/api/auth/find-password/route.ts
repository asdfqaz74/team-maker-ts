import { connectDB } from "@/lib/mongoose";
import Member from "@/models/Member";
import { sendResetEmail } from "@/lib/mailer/sendResetEmail";
import jwt from "jsonwebtoken";
import { findMember } from "@/utils/server/findMember";
import { JWT_EXPIRES_IN_FORGOT_PASSWORD, SECRET } from "@/constants";
import { checkToken } from "@/utils/server";
import { NextRequest } from "next/server";

type BodyType = {
  findPwName: string;
  findPwEmail: string;
  findPwId: string;
};

export async function POST(request: NextRequest) {
  const userId = await checkToken(request);

  if (!userId) {
    return Response.json({ error: "로그인 후 이용해주세요." }, { status: 401 });
  }

  try {
    const body: BodyType = await request.json();
    const { findPwName, findPwEmail, findPwId } = body;

    const member = await findMember({
      name: findPwName,
      email: findPwEmail,
      userId: findPwId,
    });

    const token = jwt.sign({ userId }, SECRET, {
      expiresIn: JWT_EXPIRES_IN_FORGOT_PASSWORD,
    });

    await sendResetEmail(member.email, token);
    return Response.json(
      { message: "비밀번호 재설정 이메일이 전송되었습니다." },
      { status: 200 }
    );
  } catch (error: any) {
    if (error.message === "NOT_FOUND") {
      return Response.json(
        { error: "존재하지 않는 사용자입니다." },
        { status: 401 }
      );
    }

    console.error("비밀번호 찾기 중 오류: ", error);

    return Response.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
