import { connectDB } from "@/lib/mongoose";
import Match from "@/models/Match";
import User from "@/models/User";

export async function GET(request, { params }) {
  await connectDB();

  try {
    const { id } = params;

    // 유저 기본 정보 조회
    const user = await User.findById(id)
      .select("name nickName position eloRating")
      .lean();
    if (!user) {
      return Response.json(
        { error: "존재하지 않는 사용자입니다." },
        { status: 404 }
      );
    }

    // 유저의 가장 많이 플레이한 챔피언
    const mostPlayedChampion = await Match.aggregate([
      // 해당 유저가 포함된 경기만 필터링
      {
        $match: { "players.userNickname": user.nickName },
      },

      // 플레이어 배열을 펼쳐서 각 플레이어에 대해 작업
      {
        $unwind: "$players",
      },

      // 해당 유저의 플레이어만 필터링
      {
        $match: { "players.userNickname": user.nickName },
      },

      // 챔피언별로 그룹화하여 카운트
      {
        $group: {
          _id: "$players.champion",
          count: { $sum: 1 },
          winCount: {
            $sum: { $cond: [{ $eq: ["$players.win", true] }, 1, 0] },
          },
        },
      },

      // 승률 필드 추가
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

      // 카운트 기준으로 내림차순 정렬
      { $sort: { count: -1, winRate: -1 } },

      // 1개 뽑기
      {
        $limit: 1,
      },
    ]);

    const mostPlayedChampionImage = `images/champions/centered/${mostPlayedChampion[0]._id}.jpg`;

    user.mostPlayedChampion = mostPlayedChampionImage;

    // 유저의 최근 5경기
    const recentMatches = await Match.find({
      "players.userNickname": user.nickName,
    })
      .sort({ createdAt: -1 })
      .limit(5);

    if (!recentMatches) {
      return Response.json(
        { error: "유저가 경기를 하지 않았습니다." },
        { status: 404 }
      );
    }

    // 유저의 최근 5경기의 승률
    const recentMatchesWinRate = recentMatches.reduce((acc, match) => {
      const me = match.players.find(
        (player) => player.userNickname === user.nickName
      );
      if (me) {
        acc.totalGames += 1;
        if (me.win) {
          acc.wins += 1;
        }
      }
      return acc;
    });

    // 경기 데이터 구조화
    const matchesFormatted = recentMatches.map((match) => {
      const me = match.players.find(
        (player) => player.userNickname === user.nickName
      );
      const myTeam = me.team;

      const teamPlayer = match.players.filter(
        (player) => player.team === myTeam
      );
      const enemyPlayer = match.players.filter(
        (player) => player.team !== myTeam
      );

      const teamPlayerData = teamPlayer.map((player) => ({
        nickName: player.userNickname,
        champion: player.champion,
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
      }));

      const enemyPlayerData = enemyPlayer.map((player) => ({
        nickName: player.userNickname,
        champion: player.champion,
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
      }));

      return {
        matchId: match._id,
        me: {
          champion: me.champion,
          win: me.win,
          kda: {
            kills: me.kills,
            deaths: me.deaths,
            assists: me.assists,
          },
        },
        teamPlayerData,
        enemyPlayerData,
      };
    });

    return Response.json(
      {
        user,
        recentMatches: matchesFormatted,
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
