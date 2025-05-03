import { ExceptPasswordMember } from "@/types/member";
import { atom } from "jotai";
import { atomWithReset } from "jotai/utils";

export const tokenAtom = atomWithReset<string | null>(null);
export const userAtom = atomWithReset<ExceptPasswordMember | null>(null);
