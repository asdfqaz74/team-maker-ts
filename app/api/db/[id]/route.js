import { connectDB } from "@/lib/mongoose";
import Match from "@/models/Match";
import User from "@/models/User";

const formatPlayerData = (player) => ({
  nickName: player.userNickname,
  champion: player.champion,
  championImage: `/images/champions/portrait/${player.champion}.png`,
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

export async function GET(request, context) {
  await connectDB();

  try {
    const { id } = await context.params;

    // 유저 정보 먼저 조회
    const user = await User.findById(id)
      .select("name nickName position eloRating")
      .lean();

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
        Match.aggregate([
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
              winRate: {
                $cond: [
                  { $eq: ["$count", 0] },
                  0,
                  { $divide: ["$winCount", "$count"] },
                ],
              },
            },
          },
          { $sort: { count: -1, winRate: -1 } },
          { $limit: 1 },
        ]),

        // recentMatches
        Match.find({
          "players.userNickname": user.nickName,
        })
          .sort({ createdAt: -1 })
          .limit(5),

        // recentMatchesDataAgg
        Match.aggregate([
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
                    $concat: ["/images/champions/portrait/", "$$champ", ".png"],
                  },
                },
              },
            },
          },
        ]),
      ]);

    const mostPlayedChampionImage = mostPlayedChampionAgg[0]
      ? `/images/champions/centered/${mostPlayedChampionAgg[0]._id}.jpg`
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
          championImage: `/images/champions/portrait/${me.champion}.png`,
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
