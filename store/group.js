import { atom } from "jotai";
import { atomWithReset } from "jotai/utils";

// 해당 멤버의 그룹 목록을 저장
export const groupListAtom = atomWithReset([]);

// 해당 멤버의 선수 목록 저장 (name, group)
export const playersAtom = atomWithReset([]);

// 해당 멤버가 선택한 그룹 저장
export const selectedGroupAtom = atomWithReset(null);

// 체크된 선수 목록 저장
export const checkedPlayersAtom = atomWithReset([]);
