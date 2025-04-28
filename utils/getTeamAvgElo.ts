import { IPlayerStats } from "@/models/Match";
import User from "@/models/User";

export async function getTeamAvgElo(
  team: IPlayerStats[],
  targetPosition: string
): Promise<number> {
  const positionPlayers = team.filter(
    (player) => player.position === targetPosition
  );

  if (positionPlayers.length === 0) return 1000;

  const elos = await Promise.all(
    positionPlayers.map(async (player) => {
      const user = await User.findOne({ nickName: player.userNickname });
      const rawElo = user?.eloRating?.[targetPosition];
      return typeof rawElo === "number" && !isNaN(rawElo) ? rawElo : 1000;
    })
  );

  const sum = elos.reduce((acc, elo) => acc + elo, 0);
  const avg = elos.length > 0 ? sum / elos.length : 1000;

  const result = Math.round(avg);

  return result;
}
