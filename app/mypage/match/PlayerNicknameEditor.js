"use client";

import { getToken } from "@/utils/getToken";
import { useEffect, useState } from "react";

export default function PlayerNicknameEditor({ playersData, onSubmit }) {
  const [players, setPlayers] = useState(playersData || []);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }

    fetch("/api/me/match/player", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUserList(data || []));
  }, []);

  const handleSelectChange = (index, nickName) => {
    const updated = [...players];
    updated[index].userNickname = nickName;
    setPlayers(updated);
  };

  const handleSubmit = () => {
    if (players.some((player) => !player.userNickname)) {
      alert("모든 플레이어의 닉네임을 입력해주세요.");
      return;
    }
    onSubmit(players);
  };

  return (
    <div className="space-y-4">
      {players.map((p, i) => (
        <div key={i} className="p-4 border rounded shadow">
          <div className="flex justify-between items-center">
            <div>
              <p>
                <strong>챔피언:</strong> {p.champion}
              </p>
              <p>
                <strong>포지션:</strong> {p.position}
              </p>
              <p>
                <strong>K/D/A:</strong> {p.kills}/{p.deaths}/{p.assists}
              </p>
            </div>
            <select
              className="border p-2"
              value={p.userNickname}
              onChange={(e) => handleSelectChange(i, e.target.value)}
            >
              <option value="">닉네임 선택</option>
              {userList.map((user) => (
                <option key={user._id} value={user.nickName}>
                  {user.nickName} ({user.position})
                </option>
              ))}
            </select>
          </div>
        </div>
      ))}
      <button
        className="mt-4 bg-blue-600 text-white px-6 py-2 rounded"
        onClick={handleSubmit}
      >
        제출하기
      </button>
    </div>
  );
}
