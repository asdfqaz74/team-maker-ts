import { IUser } from "@/models/User";
import { TeamResponse } from "@/types/team";
import { Player } from "@/types/user";
import { atomWithReset } from "jotai/utils";

export const playersAtom = atomWithReset<IUser[]>([]);

export const selectedPlayerAtom = atomWithReset<Player | null>(null);

// team-maker/components/StepOne.tsx 에서 사용
// 체크된 선수들의 이름을 저장하는 atom
export const avaliablePlayers = atomWithReset<TeamResponse[]>([]);
