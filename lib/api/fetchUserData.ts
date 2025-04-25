export const fetchUserData = async () => {
  // 토큰 가져오기
  const token = sessionStorage.getItem("token");

  const response = await fetch("/api/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error("유저 데이터를 불러오는 중 에러 발생");

  return response.json();
};
