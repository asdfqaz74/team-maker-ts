import { API } from "@/constants";

export const fetchGroupUsers = async (selectedGroup: string | null) => {
  const response = await fetch(API.ME.GROUP.SELECTED_GROUP(selectedGroup));
  console.log("selected", selectedGroup);

  if (!response.ok) throw new Error("그룹 유저를 불러오는 중 에러 발생");

  const data = await response.json();

  return data;
};
