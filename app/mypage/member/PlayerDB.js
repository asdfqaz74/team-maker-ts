"use client";

import { useAtom } from "jotai";
import { selectedPlayerAtom, fetchPlayersAtom } from "@/store/player";
import { useState, useEffect } from "react";
import { getToken } from "@/utils/getToken";

export default function PlayerDB() {
  const [selectedPlayer] = useAtom(selectedPlayerAtom);
  const fetchPlayers = useAtom(fetchPlayersAtom)[1];

  const [nickName, setNickName] = useState(selectedPlayer?.nickName || "");
  const [position, setPosition] = useState(selectedPlayer?.position || "top");
  const [elo, setElo] = useState({
    top: selectedPlayer?.eloRating?.top || 1000,
    jug: selectedPlayer?.eloRating?.jug || 1000,
    mid: selectedPlayer?.eloRating?.mid || 1000,
    adc: selectedPlayer?.eloRating?.adc || 1000,
    sup: selectedPlayer?.eloRating?.sup || 1000,
  });

  useEffect(() => {
    if (selectedPlayer) {
      setNickName(selectedPlayer.nickName || "");
      setPosition(selectedPlayer.position || "top");
      setElo({
        top: selectedPlayer.eloRating?.top ?? 1000,
        jug: selectedPlayer.eloRating?.jug ?? 1000,
        mid: selectedPlayer.eloRating?.mid ?? 1000,
        adc: selectedPlayer.eloRating?.adc ?? 1000,
        sup: selectedPlayer.eloRating?.sup ?? 1000,
      });
    }
  }, [selectedPlayer]);

  const handleEditPlayerDB = async () => {
    const token = getToken();

    const response = await fetch(`/api/me/player/${selectedPlayer._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        nickName,
        position,
        eloRating: elo,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("선수 정보가 수정되었습니다.");
      fetchPlayers(token);
    } else {
      alert(data.error || "선수 정보 수정에 실패했습니다.");
    }
  };

  return (
    <div>
      <span>{selectedPlayer?.name}</span>
      <label className="block font-semibold mb-2">ELO 관리</label>
      <div className="flex gap-4">
        {["top", "jug", "mid", "adc", "sup"].map((lane) => (
          <div key={lane} className="mb-2 flex gap-2 items-center">
            <span className="w-12 capitalize">{lane}</span>
            <input
              type="number"
              value={elo[lane]}
              onChange={(e) =>
                setElo({ ...elo, [lane]: Number(e.target.value) })
              }
              className="border px-2 py-1 w-24"
            />
          </div>
        ))}
      </div>
      <span>멤버 정보 관리</span>
      <div className="mb-2 flex gap-2 items-center">
        <span className="w-12">닉네임</span>
        <input
          type="text"
          value={nickName}
          onChange={(e) => setNickName(e.target.value)}
          className="border px-2 py-1 w-40"
        />
        <span>포지션</span>
        <select value={position} onChange={(e) => setPosition(e.target.value)}>
          <option value="top" className="text-black">
            탑
          </option>
          <option value="jug" className="text-black">
            정글
          </option>
          <option value="mid" className="text-black">
            미드
          </option>
          <option value="adc" className="text-black">
            원딜
          </option>
          <option value="sup" className="text-black">
            서포터
          </option>
        </select>
      </div>
      <button onClick={handleEditPlayerDB} className="cursor-pointer">
        수정하기
      </button>
    </div>
  );
}
