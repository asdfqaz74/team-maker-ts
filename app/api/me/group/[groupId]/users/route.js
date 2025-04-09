import { connectDB } from "@/lib/mongoose";
import jwt from "jsonwebtoken";
import User from "@/models/User";
import Member from "@/models/Member";

export async function GET(request, { params }) {
  await connectDB();

  const authHeader = request.headers.get("authorization");
  const token = authHeader?.split(" ")[1];
  if (!token) {
    return Response.json({ error: "토큰이 없습니다." }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const member = await Member.findOne({ userId });
    if (!member) {
      return Response.json(
        { error: "멤버를 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    const { groupId } = await params;

    const users = await User.find({
      createdBy: member._id,
      group: groupId, // 배열이라면 포함 여부로 검사됨
    }).select("name");

    return Response.json(users, { status: 200 });
  } catch (error) {
    console.error("그룹 선수 조회 오류: ", error);
    return Response.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
