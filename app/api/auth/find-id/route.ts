import { connectDB } from "@/lib/mongoose";
import { findMember } from "@/utils/findMember";

export async function POST(request) {
  await connectDB();

  try {
    const body = await request.json();
    const { findIdName, findIdEmail } = body;

    const member = await findMember({
      name: findIdName,
      email: findIdEmail,
    });

    return Response.json(
      {
        message: "아이디 찾기 성공",
        userId: member.userId,
      },
      { status: 200 }
    );
  } catch (error) {
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
