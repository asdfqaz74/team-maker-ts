export const fetchPlayerDetail = async (id) => {
  console.log("fetchPlayerDetail", id);
  const response = await fetch(`/api/db/${id}`);

  const data = await response.json();
  if (!response.ok)
    throw new Error(
      data.error || "유저 정보를 가져오는 중 오류가 발생했습니다."
    );

  return data;
};
