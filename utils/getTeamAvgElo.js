import User from "@/models/User";

export async function getTeamAvgElo(team, targetPosition) {
  const positionPlayers = team.filter(
    (player) => player.position === targetPosition
  );

  const elos = await Promise.all(
    positionPlayers.map(async (player) => {
      const user = await User.findOne({ nickName: player.userNickname });
      return user?.eloRating[targetPosition] ?? 1000;
    })
  );

  const avg = elos.reduce((acc, elo) => acc + elo, 0) / elos.length;
  return Math.round(avg);
}
