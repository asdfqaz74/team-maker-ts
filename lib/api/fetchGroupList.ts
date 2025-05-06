import { API } from "@/constants";
import { GroupList } from "@/types/group";

export const fetchGroupList = async (): Promise<GroupList["groups"]> => {
  const response = await fetch(API.ME.GROUP.LIST, {
    method: "GET",
  });

  if (!response.ok) throw new Error("그룹을 불러오는 중 에러 발생");

  const rawData: GroupList = await response.json();
  const data = rawData.groups as GroupList["groups"];

  return data;
};
