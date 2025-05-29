import { NextRequest } from "next/server";
import User, { IElo } from "@/models/User";
import { connectDB } from "@/lib/mongoose";
import Match, { IMatch } from "@/models/Match";

interface PlayerStats {
  userNickname?: string;
  champion: string;
  kills: number;
  deaths: number;
  assists: number;
  totalDamageDealt: number;
  totalDamageTaken: number;
  wardsPlaced: number;
  boughtWards: number;
  wardsKilled: number;
  minionsKilled: number;
}

const formatPlayerData = (player: PlayerStats) => ({
  nickName: player.userNickname ?? "Unknown",
  champion: player.champion,
  championImage: `/images/champions/portrait/${player.champion}.webp`,
  kda: {
    kills: player.kills,
    deaths: player.deaths,
    assists: player.assists,
  },
  damage: {
    dealt: player.totalDamageDealt,
    taken: player.totalDamageTaken,
  },
  wards: {
    placed: player.wardsPlaced,
    bought: player.boughtWards,
    killed: player.wardsKilled,
  },
  cs: player.minionsKilled,
});

interface MostPlayedChampionAgg {
  _id: string;
  count: number;
  winCount: number;
  winRate: number;
}

interface RecentMatchDataAgg {
  totalMatches: number;
  totalWins: number;
  totalLosses: number;
  champion: string[];
  position: string[];
  winRate: number;
  championImages: string[];
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();

  try {
    const asyncParams = await params;
    const { id } = asyncParams;

    // match 데이터를 더 가져오기 위해 URL에서 쿼리 파라미터를 추출
    const { searchParams } = new URL(request.url);
    const skip = parseInt(searchParams.get("skip") || "0");
    const limit = parseInt(searchParams.get("limit") || "5");

    // 유저 정보 먼저 조회
    const user = (await User.findById(id)
      .select("name nickName position eloRating")
      .lean()) as {
      name: string;
      nickName: string;
      position: string;
      eloRating: IElo;
      mostPlayedChampion?: string | null;
    } | null;

    if (!user) {
      return Response.json(
        { error: "존재하지 않는 사용자입니다." },
        { status: 404 }
      );
    }

    // 닉네임을 기준으로 다른 쿼리를 병렬 처리
    const [mostPlayedChampionAgg, recentMatches, recentMatchesDataAgg] =
      await Promise.all([
        // mostPlayedChampionAgg
        Match.aggregate<MostPlayedChampionAgg>([
          { $match: { "players.userNickname": user.nickName } },
          { $unwind: "$players" },
          { $match: { "players.userNickname": user.nickName } },
          {
            $group: {
              _id: "$players.champion",
              count: { $sum: 1 },
              winCount: {
                $sum: { $cond: [{ $eq: ["$players.win", true] }, 1, 0] },
              },
            },
          },
          {
            $addFields: {
              lossCount: { $subtract: ["$count", "$winCount"] },
              winRate: {
                $cond: [
                  { $eq: ["$count", 0] },
                  0,
                  {
                    $round: [
                      {
                        $multiply: [{ $divide: ["$winCount", "$count"] }, 100],
                      },
                      0,
                    ],
                  },
                ],
              },
            },
          },
          { $sort: { count: -1, winRate: -1 } },
          { $limit: 5 },
        ]),

        // recentMatches
        Match.find<IMatch>({
          "players.userNickname": user.nickName,
        })
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit),

        // recentMatchesDataAgg
        Match.aggregate<RecentMatchDataAgg>([
          { $match: { "players.userNickname": user.nickName } },
          { $sort: { createdAt: -1 } },
          { $limit: 5 },
          { $unwind: "$players" },
          { $match: { "players.userNickname": user.nickName } },
          {
            $group: {
              _id: null,
              totalMatches: { $sum: 1 },
              totalWins: {
                $sum: { $cond: ["$players.win", 1, 0] },
              },
              totalLosses: {
                $sum: { $cond: ["$players.win", 0, 1] },
              },
              champion: { $addToSet: "$players.champion" },
              position: { $push: "$players.position" },
            },
          },
          {
            $addFields: {
              winRate: {
                $cond: [
                  { $eq: ["$totalMatches", 0] },
                  0,
                  {
                    $round: [
                      {
                        $multiply: [
                          { $divide: ["$totalWins", "$totalMatches"] },
                          100,
                        ],
                      },
                      0,
                    ],
                  },
                ],
              },
              championImages: {
                $map: {
                  input: "$champion",
                  as: "champ",
                  in: {
                    $concat: [
                      "/images/champions/portrait/",
                      "$$champ",
                      ".webp",
                    ],
                  },
                },
              },
            },
          },
        ]),
      ]);

    // 모스트 챔피언 5
    const topChampions = mostPlayedChampionAgg.map((champion) => ({
      champion: champion._id,
      count: champion.count,
      winCount: champion.winCount,
      lossCount: champion.count - champion.winCount,
      winRate: champion.winRate,
      championImage: `/images/champions/portrait/${champion._id}.webp`,
    }));

    const mostPlayedChampionImage = mostPlayedChampionAgg[0]
      ? `/images/champions/centered/${mostPlayedChampionAgg[0]._id}.webp`
      : null;

    user.mostPlayedChampion = mostPlayedChampionImage;

    // recentMatches 포맷 정리
    const matchesFormatted = recentMatches.map((match) => {
      const maxDamage = match.maxDamage;
      const findMaxTaken = Math.max(
        ...match.players.map((player) => player.totalDamageTaken)
      );
      const maxTaken = findMaxTaken + 1000;

      const me = match.players.find(
        (player) => player.userNickname === user.nickName
      );

      if (!me) {
        throw new Error("사용자를 찾을 수 없습니다.");
      }

      const myTeam = me.team;

      return {
        matchId: match._id,
        me: {
          champion: me.champion,
          win: me.win,
          team: me.team,
          kda: {
            kills: me.kills,
            deaths: me.deaths,
            assists: me.assists,
          },
          championImage: `/images/champions/portrait/${me.champion}.webp`,
        },
        teamPlayerData: match.players
          .filter((player) => player.team === myTeam)
          .map(formatPlayerData),
        enemyPlayerData: match.players
          .filter((player) => player.team !== myTeam)
          .map(formatPlayerData),
        maxDamage,
        maxTaken,
      };
    });

    return Response.json(
      {
        user,
        recentMatches: matchesFormatted,
        recentMatchesData: recentMatchesDataAgg,
        topChampions,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("사용자 조회 중 오류: ", error);
    return Response.json(
      { error: "사용자 조회 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
