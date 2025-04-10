import { atom } from "jotai";
import { atomWithReset } from "jotai/utils";

export const playersAtom = atomWithReset([]);

export const fetchPlayersAtom = atom(null, async (get, set, token) => {
  const response = await fetch("/api/me/player", {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  set(playersAtom, data || []);
});

export const selectedPlayerAtom = atomWithReset(null);
