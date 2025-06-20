export const fetchPlayerDetail = async (id: string, skip = 0, limit = 0) => {
  const response = await fetch(`/api/db/${id}?skip=${skip}&limit=${limit}`);

  const data = await response.json();
  if (!response.ok)
    throw new Error(
      data.error || "유저 정보를 가져오는 중 오류가 발생했습니다."
    );

  return data;
};
