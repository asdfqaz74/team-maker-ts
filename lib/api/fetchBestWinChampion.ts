import { PickChampion } from "@/types/champion";

export const fetchBestWinChampion = async (): Promise<PickChampion[]> => {
  const response = await fetch("/api/champion/summary/pick");
  if (!response.ok) throw new Error("챔피언을 불러오는 중 에러 발생");

  const data: PickChampion[] = await response.json();

  return data;
};
