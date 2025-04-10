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
      .select("name group")
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

    await findMember({ userId });

    const body = await request.json();
    const { groupId, playerId, action } = body;

    if (!playerId || !groupId || !["add", "remove"].includes(action)) {
      return Response.json(
        { error: "선수 ID, 그룹 ID, 또는 작업이 누락되었습니다." },
        { status: 400 }
      );
    }

    const updateOperator =
      action === "add"
        ? { $addToSet: { group: groupId } }
        : { $pull: { group: groupId } };

    const updatedUser = await User.findByIdAndUpdate(playerId, updateOperator, {
      new: true,
    });

    if (!updatedUser) {
      return Response.json(
        { error: "선수를 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    return Response.json(updatedUser, { status: 200 });
  } catch (error) {
    if (error.message === "NOT_FOUND") {
      return Response.json(
        { error: "존재하지 않는 사용자입니다." },
        { status: 401 }
      );
    }

    console.error("선수 그룹 업데이트 중 오류: ", error);
    return Response.json(
      { error: "선수 그룹 업데이트 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
