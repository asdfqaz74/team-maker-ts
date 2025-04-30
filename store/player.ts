import { IUser } from "@/models/User";
import { atomWithReset } from "jotai/utils";

export const playersAtom = atomWithReset<IUser[]>([]);

export const selectedPlayerAtom = atomWithReset<IUser | null>(null);
