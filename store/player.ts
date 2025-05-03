import { IUser } from "@/models/User";
import { Player } from "@/types/user";
import { atomWithReset } from "jotai/utils";

export const playersAtom = atomWithReset<IUser[]>([]);

export const selectedPlayerAtom = atomWithReset<Player | null>(null);
