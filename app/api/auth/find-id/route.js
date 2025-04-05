import { connectDB } from "@/lib/mongoose";
import Member from "@/models/Member";

export async function POST(request) {
  await connectDB();

  try {
    const body = await request.json();
    const { name, email } = body;

    const member = await Member.findOne({ name, email });

    if (!member) {
      return Response.json(
        { error: "존재하지 않는 사용자입니다." },
        { status: 401 }
      );
    }

    return Response.json(
      {
        message: "아이디 찾기 성공",
        userId: member.userId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("아이디 찾기 중 오류: ", error);
    return Response.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
