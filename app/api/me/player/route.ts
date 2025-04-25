import { connectDB } from "@/lib/mongoose";
import User from "@/models/User";
import { findMember } from "@/utils/findMember";
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
    const userId = decoded.userId;

    const member = await findMember({ userId });

    const users = await User.find({ createdBy: member._id })
      .select("name nickName position group eloRating")
      .populate("group", "name");

    return Response.json(users, { status: 200 });
  } catch (error) {
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

export async function POST(request) {
  await connectDB();

  const token = getTokenFromHeader(request.headers);

  if (!token) {
    return Response.json({ error: "토큰이 없습니다." }, { status: 401 });
  }

  try {
    const decoded = verifyToken(token);
    const userId = decoded.userId;

    const member = await findMember({ userId });

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
    if (error.message === "NOT_FOUND") {
      return Response.json(
        { error: "존재하지 않는 사용자입니다." },
        { status: 401 }
      );
    }

    console.error("사용자 생성 중 오류: ", error);
    return Response.json(
      { error: "사용자 생성 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
