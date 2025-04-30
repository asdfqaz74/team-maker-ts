import User from "@/models/User";
import { checkToken, findMember, verifyToken } from "@/utils/server";

export async function GET(
  request: Request,
  { params }: { params: { groupId: string } }
) {
  const result = await checkToken(request.headers);

  if (!result.ok) return result.response;

  const token = result.token;

  try {
    const decoded = verifyToken(token);
    const userId = decoded.userId;

    const member = await findMember({ userId });

    const { groupId } = await params;

    const users = await User.find({
      createdBy: member._id,
      group: groupId, // 배열이라면 포함 여부로 검사됨
    }).select("name");

    return Response.json(users, { status: 200 });
  } catch (error: any) {
    if (error.message === "NOT_FOUND") {
      return Response.json(
        { error: "존재하지 않는 사용자입니다." },
        { status: 401 }
      );
    }

    console.error("그룹 선수 조회 오류: ", error);
    return Response.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
