import User from "@/models/User";
import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongoose";
import { checkToken, findMember } from "@/utils/server";

// 유저 정보를 가져오는 API
export async function GET(request: NextRequest) {
  const userId = await checkToken(request);

  if (!userId) {
    return Response.json(
      { message: "로그인 후 사용해주세요." },
      { status: 401 }
    );
  }

  try {
    // 멤버 찾기
    const member = await findMember({ userId });

    // 해당 멤버가 생성한 User만 필터링
    const users = await User.find({ createdBy: member._id })
      .select("-__v")
      .lean();

    // 포지션 한글로 변환
    const positionMap = {
      top: "탑",
      jug: "정글",
      mid: "미드",
      adc: "원딜",
      sup: "서포터",
    };

    users.forEach((user) => {
      user.position =
        positionMap[user.position as keyof typeof positionMap] || user.position;
    });

    // ELO Rating 중 가장 높은 값만 가져오기
    users.forEach((user) => {
      if (user.eloRating) {
        const maxELO = Math.max(...(Object.values(user.eloRating) as number[]));
        user.eloRating = maxELO;
      }
    });

    // 선수의 승률을 계산하여 추가
    users.forEach((user) => {
      if (user.totalGames === 0) {
        user.winRate = "게임이 없습니다.";
        return;
      }
      const winRate = (user.wins / user.totalGames) * 100;
      user.winRate = winRate.toFixed(0) + "%";
    });

    // 불필요한 필드 제거
    users.forEach((user) => {
      delete user.createdBy;
      delete user.wins;
      delete user.totalGames;
      delete user.losses;
      delete user.monthlyTotalGames;
      delete user.monthlyWins;
      delete user.monthlyLosses;
      delete user.group;
    });

    return Response.json(users);
  } catch (error) {
    console.error("유저 조회 중 오류:", error);
    return Response.json(
      { message: "유저 정보를 가져오는 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

// 유저 정보를 생성하는 API
// 유저 정보 생성할 때는 name, nickName 이 필수값입니다.
export async function POST(request: Request) {
  await connectDB();
  const body = await request.json();
  const user = await User.create(body);
  return Response.json(user, { status: 201 });
}
