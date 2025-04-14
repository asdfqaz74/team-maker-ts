export const fetchPlayers = async (token) => {
  const response = await fetch("/api/me/player", {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  if (!response.ok)
    throw new Error(
      data.error || "유저 정보를 가져오는 중 오류가 발생했습니다."
    );

  return data;
};
