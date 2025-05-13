import { IUser } from "@/models/User";
import { TeamResponse } from "@/types/team";
import { Player } from "@/types/user";
import { atomWithReset } from "jotai/utils";

export const playersAtom = atomWithReset<IUser[]>([]);

export const selectedPlayerAtom = atomWithReset<Player | null>(null);

// team-maker/components/PickPlayers.tsx 에서 사용
// 체크된 선수들의 이름을 저장하는 atom
export const avaliablePlayers = atomWithReset<TeamResponse[]>([]);

// team-maker/components/PickLeader.tsx 에서 사용
// 리더로 뽑힌 선수들의 이름을 저장하는 atom
export const leaderPlayers = atomWithReset<string[]>([]);

// team-maker/components/PickRandom.tsx 에서 사용
// 랜덤으로 팀 색상 을 저장하는 atom
// 1: 블루팀 0: 레드팀
export const teamColor = atomWithReset<Number>(0);

// team-maker/components/PickRandom.tsx 에서 사용
// 랜덤으로 팀 리더를 저장하는 atom
export const leaderA = atomWithReset<string>("");
export const leaderB = atomWithReset<string>("");
