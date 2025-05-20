"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import ChampionPalette from "@/app/components/ChampionPalette";
import { API } from "@/constants";
import type { BansList, UserList } from "@/types/match";
import type { IPlayerStats } from "@/models/Match";
import { ToastContextType } from "@/app/components/ToastContext";

type PlayerNicknameEditorProps = {
  playersData: IPlayerStats[] | null;
  maxDamage: number;
  onSubmit: (players: IPlayerStats[]) => void;
  showSnack: ToastContextType["showSnack"];
};

export default function PlayerNicknameEditor({
  playersData,
  maxDamage,
  onSubmit,
  showSnack,
}: PlayerNicknameEditorProps) {
  const [players, setPlayers] = useState<IPlayerStats[]>(
    () => playersData ?? []
  );
  const [userList, setUserList] = useState<UserList>([]);
  const [openModal, setOpenModal] = useState(false);
  const [bans, setBans] = useState<BansList>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  console.log("playersData", playersData);

  useEffect(() => {
    const fetchPlayerList = async (): Promise<void> => {
      try {
        const response = await fetch(API.ME.MATCH.PLAYER);
        const data: UserList = await response.json();
        setUserList(data || []);
      } catch (error) {
        showSnack("플레이어 목록을 가져오는 중 오류가 발생했습니다.", "error");
      }
    };

    fetchPlayerList();
  }, [showSnack]);

  const handleSelectChange = (index: number, userNickname: string) => {
    const updated = players.map((player, idx) =>
      idx === index ? ({ ...player, userNickname } as IPlayerStats) : player
    );

    setPlayers(updated);
  };

  const handleSubmit = async () => {
    if (players.some((player) => !player.userNickname)) {
      showSnack("모든 플레이어의 닉네임을 선택해주세요.", "error");
      return;
    }

    const banChampionsId = bans.map((champ) => champ.id);

    try {
      setIsSubmitting(true);
      const response = await fetch(API.ME.MATCH.SUBMIT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ players, maxDamage, banChampionsId }),
      });

      const data = await response.json();

      if (response.ok) {
        showSnack("닉네임이 성공적으로 저장되었습니다.", "success");

        setPlayers(data.players);
        onSubmit(data.players);
      } else {
        showSnack(data.error || "닉네임 저장에 실패했습니다.", "error");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      showSnack("서버와의 연결에 실패했습니다.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const blueTeam = players.filter((player) => player.team === "Blue");
  const redTeam = players.filter((player) => player.team === "Red");

  const renderTeam = (team: IPlayerStats[], teamColor: "Blue" | "Red") => {
    return (
      <div className="space-y-4">
        <h3
          className={`text-xl font-bold ${
            teamColor === "Blue" ? "text-blue-400" : "text-red-400"
          }`}
        >
          {teamColor === "Blue" ? "블루팀" : "레드팀"}
        </h3>

        {team.map((p, i) => (
          <div
            key={i}
            className="p-4 border rounded shadow bg-white text-black"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center justify-between w-80">
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
                  src={`/images/champions/portrait/${p.champion}.webp`}
                  alt={p.champion}
                  width={100}
                  height={100}
                />
              </div>
              <select
                className="border p-2"
                value={p.userNickname}
                onChange={(e) =>
                  handleSelectChange(players.indexOf(p), e.target.value)
                }
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
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {renderTeam(blueTeam, "Blue")}
      {renderTeam(redTeam, "Red")}

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
        className={`mt-4 text-white px-6 py-2 rounded cursor-pointer ${
          isSubmitting ? "bg-gray-600" : "hover:bg-blue-700 bg-blue-600"
        }`}
        onClick={handleSubmit}
      >
        {isSubmitting ? "제출 중..." : "제출하기"}
      </button>
    </div>
  );
}
