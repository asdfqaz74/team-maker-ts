export const fetchUserData = async () => {
  const response = await fetch("/api/user", {
    credentials: "include",
  });

  if (!response.ok) throw new Error("유저 데이터를 불러오는 중 에러 발생");

  return response.json();
};
