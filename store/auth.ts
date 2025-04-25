import { atom } from "jotai";
import { atomWithReset } from "jotai/utils";

export const tokenAtom = atomWithReset(null);
export const isLoggedInAtom = atom((get) => !!get(tokenAtom));
export const userAtom = atomWithReset(null);
