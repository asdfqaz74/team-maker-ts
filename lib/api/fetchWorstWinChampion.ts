import { WorstChampion } from "@/types/champion";

export const fetchWorstWinChampion = async (): Promise<WorstChampion[]> => {
  const response = await fetch("/api/champion/summary/worst");
  if (!response.ok) throw new Error("챔피언을 불러오는 중 에러 발생");

  const data: WorstChampion[] = await response.json();
  return data;
};
