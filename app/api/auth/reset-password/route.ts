import { connectDB } from "@/lib/mongoose";
import Member from "@/models/Member";
import bcrypt from "bcrypt";
import { verifyToken } from "@/utils/verifyToken";

const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

export async function POST(request) {
  await connectDB();
  const body = await request.json();
  const { token, newPassword } = body;

  if (!passwordRegex.test(newPassword)) {
    return Response.json(
      {
        error:
          "비밀번호는 최소 8자 이상이어야 하며, 문자와 숫자를 포함해야 합니다.",
      },
      { status: 400 }
    );
  }

  try {
    const decoded = verifyToken(token);
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
