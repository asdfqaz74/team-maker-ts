import { connectDB } from "@/lib/mongoose";
import Member from "@/models/Member";
import getTokenFromHeader from "@/utils/getTokenFromHeader";
import { verifyToken } from "@/utils/verifyToken";

export async function GET(request) {
  await connectDB();

  const token = getTokenFromHeader(request.headers);

  if (!token) {
    return Response.json({ error: "토큰이 없습니다." }, { status: 401 });
  }

  try {
    const decoded = verifyToken(token);
    const member = await Member.findOne({ userId: decoded.userId }).select(
      "-password"
    );

    if (!member) {
      return Response.json(
        { error: "사용자를 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    return Response.json({ user: member }, { status: 200 });
  } catch (error) {
    console.error("토큰 검증 중 오류: ", error);
    return Response.json(
      { error: "토큰 검증 중 오류가 발생했습니다." },
      { status: 401 }
    );
  }
}
