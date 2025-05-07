import User from "@/models/User";
import { checkToken, findMember } from "@/utils/server";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const userId = await checkToken(request);

  if (!userId) {
    return Response.json({ error: "로그인이 필요합니다." }, { status: 401 });
  }
  try {
    const member = await findMember({ userId });

    const users = await User.find({ createdBy: member._id }).select("nickName");

    return Response.json(users, { status: 200 });
  } catch (error: any) {
    if (error.message === "NOT_FOUND") {
      return Response.json(
        { error: "존재하지 않는 사용자입니다." },
        { status: 401 }
      );
    }

    console.error("사용자 조회 중 오류: ", error);
    return Response.json(
      { error: "사용자 조회 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
