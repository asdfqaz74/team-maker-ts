export const fetchMe = async (token: string | null) => {
  const response = await fetch("/api/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  if (!response.ok)
    throw new Error(data.error || "사용자 정보를 불러오는데 실패했습니다.");

  return data.user;
};
