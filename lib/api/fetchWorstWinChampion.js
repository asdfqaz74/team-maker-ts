export const fetchWorstWinChampion = async () => {
  const response = await fetch("/api/champion/summary/worst");
  if (!response.ok) throw new Error("챔피언을 불러오는 중 에러 발생");

  return response.json();
};
