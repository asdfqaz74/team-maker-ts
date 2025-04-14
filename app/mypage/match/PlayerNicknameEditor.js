"use client";

import { getToken } from "@/utils/getToken";
import { useEffect, useState } from "react";
import Image from "next/image";
import ChampionPalette from "@/app/components/ChampionPalette";

export default function PlayerNicknameEditor({
  playersData,
  maxDamage,
  onSubmit,
}) {
  const [players, setPlayers] = useState(() => playersData ?? []);
  const [userList, setUserList] = useState([]);

  const [openModal, setOpenModal] = useState(false);
  const [bans, setBans] = useState([]);

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

  const handleSubmit = async () => {
    if (players.some((player) => !player.userNickname)) {
      alert("모든 플레이어의 닉네임을 입력해주세요.");
      return;
    }

    const token = getToken();
    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }

    const banChampionsId = bans.map((champ) => champ.id);

    const response = await fetch("/api/me/match/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ players, maxDamage, banChampionsId }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("닉네임이 성공적으로 저장되었습니다.");
      setPlayers(data.players);
      onSubmit(data.players);
    } else {
      alert(data.error || "닉네임 저장에 실패했습니다.");
    }
  };

  return (
    <div className="space-y-4">
      {players &&
        players.map((p, i) => (
          <div key={i} className="p-4 border rounded shadow">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-10">
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
                <Image
                  src={`/images/champions/portrait/${p.champion}.png`}
                  alt={p.champion}
                  width={100}
                  height={100}
                ></Image>
              </div>
              <select
                className="border p-2"
                value={p.userNickname}
                onChange={(e) => handleSelectChange(i, e.target.value)}
              >
                <option value="">닉네임 선택</option>
                {userList.map((user) => (
                  <option
                    key={user._id}
                    value={user.nickName}
                    className="text-black"
                  >
                    {user.nickName}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}

      <div className="flex justify-between items-center">
        <p>밴한 챔피언</p>
        <button
          className="bg-gray-600 px-4 py-2 rounded hover:bg-gray-800 cursor-pointer"
          onClick={() => setOpenModal(true)}
        >
          설정하기
        </button>
      </div>

      <ChampionPalette
        open={openModal}
        onClose={() => setOpenModal(false)}
        selected={bans}
        setSelected={setBans}
      />
      <ul className="flex justify-evenly">
        {bans &&
          bans.map((champ) => (
            <li key={champ.id}>
              <Image
                src={champ.image}
                alt={champ.name}
                width={60}
                height={60}
              />
              <p className="text-sm text-center text-white truncate w-[4rem]">
                {champ.name}
              </p>
            </li>
          ))}
      </ul>

      <button
        className="mt-4 bg-blue-600 text-white px-6 py-2 rounded cursor-pointer hover:bg-blue-700"
        onClick={handleSubmit}
      >
        제출하기
      </button>
    </div>
  );
}
