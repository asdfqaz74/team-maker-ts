import { connectDB } from "@/lib/mongoose";
import Group from "@/models/Group";
import Member from "@/models/Member";
import jwt from "jsonwebtoken";

export async function POST(request) {
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
        { error: "사용자를 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    const body = await request.json();
    const { name } = body;

    if (!name) {
      return Response.json(
        { error: "그룹 이름은 필수입니다." },
        { status: 400 }
      );
    }

    const newGroup = await Group.create({
      name,
      createdBy: member._id,
    });

    return Response.json({ group: newGroup }, { status: 201 });
  } catch (error) {
    console.error("그룹 생성 중 오류: ", error);
    return Response.json(
      { error: "그룹 생성 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
