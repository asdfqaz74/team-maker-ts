import { connectDB } from "@/lib/mongoose";
import Match from "@/models/Match";
import User from "@/models/User";
import { findMember } from "@/utils/findMember";
import getTokenFromHeader from "@/utils/getTokenFromHeader";
import { verifyToken } from "@/utils/verifyToken";
import dayjs from "dayjs";

export async function POST(request) {
  await connectDB();

  const token = getTokenFromHeader(request.headers);
  if (!token) {
    return Response.json({ error: "권한이 없습니다." }, { status: 401 });
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

    for (const player of players) {
      const { userNickname, win, position } = player;

      const user = await User.findOne({ nickName: userNickname });
      if (!user) continue;

      const now = dayjs();
      const lastReset = user.lastMonthlyReset
        ? dayjs(user.lastMonthlyReset)
        : null;

      // 월간 전적 초기화
      if (
        !lastReset ||
        lastReset.month() !== now.month() ||
        lastReset.year() !== now.year()
      ) {
        user.monthlyTotalGames = 0;
        user.monthlyWins = 0;
        user.monthlyLosses = 0;
        user.lastMonthlyReset = now.toDate();
      }

      user.totalGames += 1;
      user.monthlyTotalGames += 1;

      if (win) {
        user.wins += 1;
        user.monthlyWins += 1;
        if (user.eloRating && user.eloRating[position] !== undefined) {
          user.eloRating[position] += 10;
        }
      } else {
        user.losses += 1;
        user.monthlyLosses += 1;

        if (user.eloRating && user.eloRating[position] !== undefined) {
          user.eloRating[position] -= 10;
        }
      }

      // 연승 적용
      if (win) {
        user.winStreak = (user.winStreak || 0) + 1;
      } else {
        user.winStreak = 0;
      }

      await user.save();
    }

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
