"use client";

import { useAtom } from "jotai";
import {
  groupPlayersAtom,
  checkedPlayersAtom,
  selectedGroupAtom,
} from "@/store/group";
import { useEffect } from "react";
import { getToken } from "@/utils/getToken";

export default function PlayerList() {
  const [players, setPlayers] = useAtom(groupPlayersAtom);
  const [checkedPlayers, setCheckedPlayers] = useAtom(checkedPlayersAtom);
  const [selectedGroup] = useAtom(selectedGroupAtom);

  useEffect(() => {
    const fetchPlayers = async () => {
      const token = sessionStorage.getItem("token");

      if (!token) {
        alert("로그인이 필요합니다.");
        return;
      }

      const response = await fetch("/api/me/group/player", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setPlayers(data);
      }
    };

    fetchPlayers();
  }, [setPlayers]);

  useEffect(() => {
    const fetchCheckedPlayers = async () => {
      if (!selectedGroup) return;

      const token = getToken();

      const response = await fetch(`/api/me/group/player/${selectedGroup}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.error("선택된 그룹 선수 조회 실패");
        setCheckedPlayers([]);
        return;
      }

      const data = await response.json();
      const playerIds = data.map((player) => player._id);
      setCheckedPlayers(playerIds);
    };

    fetchCheckedPlayers();
  }, [selectedGroup, setCheckedPlayers]);

  const toggleChecked = async (playerId) => {
    if (!selectedGroup) {
      alert("그룹을 선택해주세요.");
      return;
    }

    const checked = !checkedPlayers.includes(playerId);
    const token = getToken();

    const response = await fetch("/api/me/group/player", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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
      alert(data.error || "선수 체크 상태 변경에 실패했습니다.");
    }
  };

  return (
    <div>
      <span>선수목록</span>
      <ul>
        {players.map((player) => (
          <li key={player._id} className="text-white">
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
