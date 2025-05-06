"use client";

import { useAtom } from "jotai";
import { checkedPlayersAtom, selectedGroupAtom } from "@/store/group";
import { useToast } from "@/app/components/ToastContext";
import { usePlayerList } from "@/hooks/usePlayersList";

export default function PlayerList() {
  const [checkedPlayers, setCheckedPlayers] = useAtom(checkedPlayersAtom);
  const [selectedGroup] = useAtom(selectedGroupAtom);
  const { showSnack } = useToast();

  // 선수 목록 가져오기
  const { data: players = [], isLoading, isError, error } = usePlayerList();

  // 선수 목록 토글
  const toggleChecked = async (playerId) => {
    if (!selectedGroup) {
      showSnack("그룹을 선택해주세요.", "error");
      return;
    }

    const checked = !checkedPlayers.includes(playerId);

    const response = await fetch("/api/me/group/player", {
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

    const data = response.json();

    if (response.ok) {
      setCheckedPlayers((prev) => {
        if (checked) {
          return [...prev, playerId];
        } else {
          return prev.filter((id) => id !== playerId);
        }
      });
    } else {
      showSnack(data.error || "선수 체크 상태 변경에 실패했습니다.", "error");
    }
  };

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
