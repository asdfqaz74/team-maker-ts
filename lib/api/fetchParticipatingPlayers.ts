import { API } from "@/constants";

export const fetchParticipatingPlayers = async () => {
  const response = await fetch(API.TEAM.PLAYER);
  if (!response.ok)
    throw new Error("참여 선수 데이터를 불러오는데 실패했습니다.");

  const data = await response.json();
  return data.users;
};
