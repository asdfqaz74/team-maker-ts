"use client";

import { useAtom } from "jotai";
import { playersAtom } from "@/store/group";
import { useEffect } from "react";

export default function PlayerList() {
  const [players, setPlayers] = useAtom(playersAtom);

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

  return (
    <div>
      <span>선수목록</span>
      <ul>
        {players.map((player) => (
          <li key={player._id} className="text-white">
            {player.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
