export function calculateElo({
  myTeamAvg,
  enemyTeamAvg,
  win,
  streak = 2,
  k = 20,
  applyUnderdogBonus = true,
  applyStreakBonus = true,
}) {
  // 기대 승률 계산
  const expectedWinRate =
    1 / (1 + Math.pow(10, (enemyTeamAvg - myTeamAvg) / 400));

  // 승리 시 1, 패배 시 0
  const result = win ? 1 : 0;

  let delta = k * (result - expectedWinRate);

  // 연승 보정
  if (applyStreakBonus && win && streak >= 2) {
    const streakMultipliers = [1.1, 1.09, 1.08, 1.07];
    for (let i = 0; i < streak - 1 && i < streakMultipliers.length; i++) {
      delta *= streakMultipliers[i];
    }
  }

  // 언더독 보정
  if (win && myTeamAvg < enemyTeamAvg && applyUnderdogBonus) {
    delta += 1;
  }

  return Math.round(delta);
}
