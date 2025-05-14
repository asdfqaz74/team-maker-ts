import { API } from "@/constants";

export const fetchGroupUsers = async (selectedGroup: string | null) => {
  if (!selectedGroup) throw new Error("그룹이 선택되지 않았습니다.");

  const response = await fetch(API.ME.GROUP.SELECTED_GROUP(selectedGroup));

  if (!response.ok) throw new Error("그룹 유저를 불러오는 중 에러 발생");

  const data = await response.json();

  return data;
};
