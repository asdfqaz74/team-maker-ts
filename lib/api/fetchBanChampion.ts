import { BanChampion } from "@/types/champion";

export const fetchBanChampion = async (): Promise<BanChampion[]> => {
  const response = await fetch("/api/champion/summary/ban");
  if (!response.ok) throw new Error("챔피언을 불러오는 중 에러 발생");

  const data: BanChampion[] = await response.json();

  return data;
};
