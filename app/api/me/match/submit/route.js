import { connectDB } from "@/lib/mongoose";
import Match from "@/models/Match";
import { findMember } from "@/utils/findMember";
import getTokenFromHeader from "@/utils/getTokenFromHeader";
import { verifyToken } from "@/utils/verifyToken";

export async function POST(request) {
  await connectDB();

  const token = getTokenFromHeader(request.headers);
  if (!token) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const decoded = verifyToken(token);
    const member = await findMember({ userId: decoded.userId });

    if (!member) {
      return Response.json(
        { error: "사용자를 찾을 수 없습니다." },
        { status: 401 }
      );
    }
    const body = await request.json();
    console.log("매치 저장 요청", body);
    const { players, maxDamage, banChampionsId } = body;

    if (!Array.isArray(players) || players.length === 0) {
      return Response.json(
        { error: "잘못된 데이터 형식입니다." },
        { status: 400 }
      );
    }

    const match = await Match.create({
      players,
      uploadedBy: member._id,
      maxDamage,
      banChampion: banChampionsId,
    });

    return Response.json(
      { message: "매치 정보가 성공적으로 저장되었습니다.", match },
      { status: 200 }
    );
  } catch (error) {
    console.error("매치 저장 오류", error);
    return Response.json(
      { error: "매치 저장 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
