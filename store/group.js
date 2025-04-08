import { atom } from "jotai";

// 해당 멤버의 그룹 목록을 저장
export const groupListAtom = atom([]);

// 해당 멤버의 선수 목록 저장 (name, group)
export const playersAtom = atom([]);

// 해당 멤버가 선택한 그룹 저장
export const selectedGroupAtom = atom(null);

// 체크된 선수 목록 저장
export const checkedPlayersAtom = atom([]);
