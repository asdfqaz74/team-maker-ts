import { IUser } from "@/models/User";
import { TeamLeaders, TeamResponse } from "@/types/team";
import { Player } from "@/types/user";
import { atomWithReset } from "jotai/utils";

export const playersAtom = atomWithReset<IUser[]>([]);

export const selectedPlayerAtom = atomWithReset<Player | null>(null);

// team-maker/components/PickPlayers.tsx 에서 사용
// 체크된 선수들의 이름을 저장하는 atom
export const avaliablePlayers = atomWithReset<TeamResponse[]>([]);

// team-maker/components/PickLeader.tsx 에서 사용
// 리더로 뽑힌 선수들의 이름을 저장하는 atom
export const leaderPlayers = atomWithReset<TeamResponse[]>([]);

// team-maker/components/PickRandom.tsx 에서 사용
// 리더A, B 의 팀 색깔을 저장하는 atom
export const teamLeaders = atomWithReset<TeamLeaders>({
  blue: {} as TeamResponse,
  red: {} as TeamResponse,
});

// team-maker/components/PickRandom.tsx 에서 사용
// 뽑히지 않은 선수들의 정보를 저장하는 atom
export const sendPlayers = atomWithReset<TeamResponse[]>([]);
export const takePlayers = atomWithReset<TeamResponse[]>([]);

// team-maker/components/TeamMode/TakePlayer.tsx 에서 사용
// 팀원 뽑는 히스토리 저장하는 atom
export const takeHistoryAtom = atomWithReset<
  {
    blue: TeamResponse[];
    red: TeamResponse[];
    remaining: TeamResponse[];
    current: "blue" | "red";
    count: number;
    pickStep: number;
  }[]
>([]);

// team-maker/components/TeamMode/SendPlayer.tsx 에서 사용
// 팀원 뽑는 히스토리 저장하는 atom
export const sendHistoryAtom = atomWithReset<
  {
    blue: TeamResponse[];
    red: TeamResponse[];
    remaining: TeamResponse[];
    current: "blue" | "red";
    count: number;
    pickStep: number;
  }[]
>([]);

// team-maker/components/TeamMode/TakePlayer.tsx 에서 사용
// 블루팀, 레드팀 선수들 저장하는 atom
export const takeBlueTeamAtom = atomWithReset<TeamResponse[]>([]);
export const takeRedTeamAtom = atomWithReset<TeamResponse[]>([]);

// team-maker/components/TeamMode/TakePlayer.tsx 에서 사용
// 현재 어디 팀이 선택되는지, 몇 번째 차례인지 저장하는 atom
export const takeCurrentPickAtom = atomWithReset<"blue" | "red">("blue");
export const takeRemainingPickCountAtom = atomWithReset<number>(1);
export const takePickStepAtom = atomWithReset<number>(1);

// team-maker/components/TeamMode/TakePlayer.tsx 에서 사용
// 확정된 레드팀, 블루팀 선수들 저장하는 atom
export const confirmedBlueTeamAtom = atomWithReset<TeamResponse[]>([]);
export const confirmedRedTeamAtom = atomWithReset<TeamResponse[]>([]);

// team-maker/components/TeamMode/SendPlayer.tsx 에서 사용
// 블루팀, 레드팀 선수들 저장하는 atom
export const sendBlueTeamAtom = atomWithReset<TeamResponse[]>([]);
export const sendRedTeamAtom = atomWithReset<TeamResponse[]>([]);

// team-maker/components/TeamMode/SendPlayer.tsx 에서 사용
// 현재 어디 팀이 선택되는지, 몇 번째 차례인지 저장하는 atom
export const sendCurrentPickAtom = atomWithReset<"blue" | "red">("blue");
export const sendRemainingPickCountAtom = atomWithReset<number>(1);
export const sendPickStepAtom = atomWithReset<number>(1);

// team-maker/components/TeamMode/SendPlayer.tsx 에서 사용
// 확정된 레드팀, 블루팀 선수들 저장하는 atom
export const sendConfirmedBlueTeamAtom = atomWithReset<TeamResponse[]>([]);
export const sendConfirmedRedTeamAtom = atomWithReset<TeamResponse[]>([]);
