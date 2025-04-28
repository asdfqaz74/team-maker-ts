import { ChampionList } from "@/types/champion";

export const fetchChampionList = async (): Promise<ChampionList[]> => {
  const response = await fetch("/api/champion/list");
  if (!response.ok) throw new Error("챔피언을 불러오는 중 에러 발생");

  const data: ChampionList[] = await response.json();

  return data;
};
