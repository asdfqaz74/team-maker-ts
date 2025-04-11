const fs = require("fs");

export const processRoflFile = async (filePath) => {
  try {
    const buffer = fs.readFileSync(filePath);

    const metadataSizeBuffer = buffer.subarray(buffer.length - 4);
    const metadataSize = metadataSizeBuffer.readUInt32LE(0);

    const metadataPosition = buffer.length - metadataSize - 4;
    const rawMetadata = buffer.subarray(metadataPosition, buffer.length - 4);

    const parsedMetadata = JSON.parse(rawMetadata.toString());

    // statsJson을 JSON 객체로 변환
    const statsJson = JSON.parse(parsedMetadata.statsJson);

    const sortedPosition = ["TOP", "JUNGLE", "MIDDLE", "BOTTOM", "UTILITY"];

    const filteredStats = statsJson.map((player) => ({
      userNickname: "",
      champion: player.SKIN,
      team: player.TEAM === 100 ? "Blue" : "Red",
      position: player.TEAM_POSITION,
      kills: Number(player.CHAMPIONS_KILLED),
      deaths: Number(player.NUM_DEATHS),
      assists: Number(player.ASSISTS),
      totalDamage_dealt: Number(player.TOTAL_DAMAGE_DEALT),
      totalDamage_taken: Number(player.TOTAL_DAMAGE_TAKEN),
      boughtWards: Number(player.VISION_WARDS_BOUGHT_IN_GAME),
      wardsPlaced: Number(player.WARDS_PLACED),
      wardsKilled: Number(player.WARDS_KILLED),
      minionsKilled: Number(player.MINIONS_KILLED),
      win: player.WIN === "Win",
    }));

    const maxDamageValue = Math.max(
      ...filteredStats.map((player) => player.totalDamage_dealt)
    );

    const maxDamage = maxDamageValue + 500;

    const sortedStats = filteredStats.sort(
      (a, b) =>
        a.team.localeCompare(b.team) ||
        sortedPosition.indexOf(a.position) - sortedPosition.indexOf(b.position)
    );

    return {
      players: sortedStats,
      maxDamage,
    };
  } catch (e) {
    throw new Error("ROFL 파일 처리 오류: " + e.message);
  }
};
