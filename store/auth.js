import { atom } from "jotai";

export const tokenAtom = atom(null);
export const isLoggedInAtom = atom((get) => !!get(tokenAtom));

export const userAtom = atom(null);
