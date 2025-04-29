import { atom } from "jotai";
import { atomWithReset } from "jotai/utils";

export const tokenAtom = atomWithReset<string | null>(null);
export const isLoggedInAtom = atom((get) => !!get(tokenAtom));
export const userAtom = atomWithReset<string | null>(null);
