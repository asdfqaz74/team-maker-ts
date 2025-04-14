export const fetchGlobalBan = async () => {
  const response = await fetch("/api/champion/global-ban");
  if (!response.ok) throw new Error("챔피언 데이터를 불러오는데 실패했습니다.");
  return response.json();
};
