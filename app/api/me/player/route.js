import { connectDB } from "@/lib/mongoose";
import jwt from "jsonwebtoken";
import Member from "@/models/Member";
import User from "@/models/User";
import Group from "@/models/Group";

export async function GET(request) {
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

    const users = await User.find({ createdBy: member._id })
      .select("name nickName position group")
      .populate("group", "name");

    return Response.json(users, { status: 200 });
  } catch (error) {
    console.error("사용자 조회 중 오류: ", error);
    return Response.json(
      { error: "사용자 조회 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

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
    const { name, nickName, position } = body;

    if (!name || !nickName) {
      return Response.json(
        { error: "이름과 닉네임은 필수입니다." },
        { status: 400 }
      );
    }

    const newUser = await User.create({
      name,
      nickName,
      position,
      createdBy: member._id,
    });

    return Response.json(newUser, { status: 201 });
  } catch (error) {
    console.error("사용자 생성 중 오류: ", error);
    return Response.json(
      { error: "사용자 생성 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
