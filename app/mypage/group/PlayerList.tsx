"use client";

import { useAtom } from "jotai";
import {
  groupPlayersAtom,
  checkedPlayersAtom,
  selectedGroupAtom,
} from "@/store/group";
import { useEffect } from "react";
import { getToken } from "@/utils/getToken";
import { useToast } from "@/app/components/ToastContext";

export default function PlayerList() {
  const [players, setPlayers] = useAtom(groupPlayersAtom);
  const [checkedPlayers, setCheckedPlayers] = useAtom(checkedPlayersAtom);
  const [selectedGroup] = useAtom(selectedGroupAtom);
  const { showSnack } = useToast();

  useEffect(() => {
    const fetchPlayers = async () => {
      const token = sessionStorage.getItem("token");

      if (!token) {
        showSnack("로그인이 필요합니다.", "error");
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
  }, [setPlayers, showSnack]);

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
        showSnack("선택된 그룹 선수 조회 실패", "error");
        setCheckedPlayers([]);
        return;
      }

      const data = await response.json();
      const playerIds = data.map((player) => player._id);
      setCheckedPlayers(playerIds);
    };

    fetchCheckedPlayers();
  }, [selectedGroup, setCheckedPlayers, showSnack]);

  const toggleChecked = async (playerId) => {
    if (!selectedGroup) {
      showSnack("그룹을 선택해주세요.", "error");
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
