import User from "@/models/User";
import { checkToken, findMember } from "@/utils/server";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const userId = await checkToken(request);

  if (!userId) {
    return Response.json(
      { error: "인증되지 않은 사용자입니다." },
      { status: 401 }
    );
  }

  try {
    const member = await findMember({ userId });

    const users = await User.find({ createdBy: member._id })
      .select(
        "-__v -monthlyTotalGames -monthlyLosses -monthlyWins -createdBy -createdAt -lastMonthlyReset -winStreak"
      )
      .populate("group", "name")
      .lean();

    // 사용자의 승률을 계산하고 totalGames, wins, losses 필드를 제거
    users.forEach((user) => {
      if (user.totalGames === 0) {
        user.winRate = "게임이 없습니다.";
        return;
      }
      const winRate = (user.wins / user.totalGames) * 100;
      user.winRate = +winRate.toFixed(0);

      delete user.totalGames;
      delete user.wins;
      delete user.losses;
    });

    return Response.json({ users }, { status: 200 });
  } catch (error: any) {
    if (error.message === "NOT_FOUND") {
      return Response.json(
        { error: "존재하지 않는 사용자입니다." },
        { status: 401 }
      );
    }

    console.error("유저 조회 중 오류: ", error);
    return Response.json(
      { error: "유저 조회 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
