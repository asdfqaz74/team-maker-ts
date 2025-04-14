import { atomWithReset } from "jotai/utils";

export const playersAtom = atomWithReset([]);

export const selectedPlayerAtom = atomWithReset(null);
