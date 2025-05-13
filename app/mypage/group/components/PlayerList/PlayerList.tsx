"use client";

import { useAtom } from "jotai";
import { checkedPlayersAtom, selectedGroupAtom } from "@/store/group";
import { useToast } from "@/app/components/ToastContext";
import { usePlayerList } from "@/hooks/usePlayersList";
import IsLoading from "./IsLoading";
import { API } from "@/constants";
import IsError from "./IsError";
import { useQueryClient } from "@tanstack/react-query";

export default function PlayerList() {
  const [checkedPlayersMap, setCheckedPlayersMap] = useAtom(checkedPlayersAtom);
  const [selectedGroup] = useAtom(selectedGroupAtom);
  const { showSnack } = useToast();
  const queryClient = useQueryClient();
  const { data: players = [], isLoading, isError, error } = usePlayerList();

  const checkedPlayers = selectedGroup
    ? checkedPlayersMap[selectedGroup] ?? []
    : [];

  // 선수 목록 토글
  const toggleChecked = async (playerId: string) => {
    if (!selectedGroup) {
      showSnack("그룹을 선택해주세요.", "error");
      return;
    }

    try {
      const checked = !checkedPlayers.includes(playerId);

      const response = await fetch(API.ME.GROUP.PLAYER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          groupId: selectedGroup,
          playerId,
          action: checked ? "add" : "remove",
        }),
      });

      if (response.ok) {
        setCheckedPlayersMap((prev) => {
          const prevGroupPlayers = prev[selectedGroup] ?? [];

          const updatedGroupPlayers = checked
            ? [...prevGroupPlayers, playerId]
            : prevGroupPlayers.filter((id) => id !== playerId);

          return {
            ...prev,
            [selectedGroup]: updatedGroupPlayers,
          };
        });
      }

      queryClient.invalidateQueries({
        queryKey: ["groupUsers", selectedGroup],
      });
    } catch (error: any) {
      showSnack(error.message, "error");
    }
  };

  if (isLoading) return <IsLoading />;
  if (isError) return <IsError error={error} />;

  return (
    <div className="">
      <span>선수목록</span>
      <ul>
        {players.map((player) => (
          <li key={player._id} className="">
            <input
              type="checkbox"
              checked={checkedPlayers.includes(player._id)}
              onChange={() => toggleChecked(player._id)}
            />
            {player.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
