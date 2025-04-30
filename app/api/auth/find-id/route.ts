import { connectDB } from "@/lib/mongoose";
import { findMember } from "@/utils/server/findMember";

type BodyType = {
  findIdName: string;
  findIdEmail: string;
};

export async function POST(request: Request) {
  await connectDB();

  try {
    const body: BodyType = await request.json();
    const { findIdName, findIdEmail } = body;

    const member = await findMember({
      name: findIdName,
      email: findIdEmail,
    });

    const userId = member.userId;

    return Response.json(
      {
        message: "아이디 찾기 성공",
        userId: userId,
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
