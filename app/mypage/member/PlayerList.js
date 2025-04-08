"use client";
import { useEffect, useState } from "react";

export default function PlayerList() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      const token = sessionStorage.getItem("token");

      const response = await fetch("/api/me/player", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      setPlayers(data || []);
    };

    fetchPlayers();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">내전 플레이어 목록</h2>
      <ul className="space-y-3">
        {players.map((player) => (
          <li
            key={player._id}
            className="border p-4 rounded shadow-sm flex justify-between"
          >
            <div>
              <p>
                <strong>이름:</strong> {player.name}
              </p>
              <p>
                <strong>닉네임:</strong> {player.nickName}
              </p>
              <p>
                <strong>포지션:</strong> {player.position}
              </p>
              <p>
                <strong>그룹:</strong>{" "}
                {player.group && player.group.length > 0
                  ? player.group
                      .map((g) =>
                        typeof g === "object" ? g.name : "알 수 없음"
                      )
                      .join(", ")
                  : "없음"}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
