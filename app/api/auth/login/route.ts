import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongoose";
import { findMemberWithPassword } from "@/utils/findMember";
import jwt from "jsonwebtoken";
import { JWT_EXPIRES_IN, SECRET } from "@/constants";

export async function POST(request: Request) {
  await connectDB();

  try {
    const body = await request.json();
    const { userId, password } = body;

    const member = await findMemberWithPassword({ userId });

    // member에서 뽑아낸 비밀번호 변수 할당
    const comparedPw = member.password;

    // 비밀번호가 설정되지 않은 경우
    if (!comparedPw) {
      return Response.json(
        { error: "비밀번호가 설정되지 않았습니다." },
        { status: 401 }
      );
    }

    // 비밀번호 비교
    const isMatch = await bcrypt.compare(password, comparedPw);

    // 비밀번호가 일치하지 않으면 401 Unauthorized 응답
    if (!isMatch) {
      return Response.json(
        { error: "사용자 정보가 다릅니다." },
        { status: 401 }
      );
    }

    // 비밀번호가 일치하면 JWT 토큰 생성
    const token = jwt.sign(
      {
        userId: member.userId,
        name: member.name,
        email: member.email,
      },
      SECRET,
      {
        expiresIn: JWT_EXPIRES_IN,
      }
    );

    // 로그인 성공 시, 사용자 정보를 반환
    return Response.json(
      {
        message: "로그인 성공",
        token,
      },
      { status: 200 }
    );
  } catch (error: any) {
    if (error.message === "NOT_FOUND") {
      return Response.json(
        { error: "존재하지 않는 사용자입니다." },
        { status: 401 }
      );
    }

    return Response.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
