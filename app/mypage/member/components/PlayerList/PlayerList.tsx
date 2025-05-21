"use client";
import { useSetAtom } from "jotai";
import { useQuery } from "@tanstack/react-query";
import { selectedPlayerAtom } from "@/store/player";
import { fetchPlayers } from "@/lib/api/fetchPlayers";
import { Divider } from "@mui/material";
import { Player } from "@/types/user";
import { usePlayerList } from "@/hooks/usePlayersList";
import PlayerListLoading from "./PlayerListLoading";

const positionMap = {
  top: "탑",
  jungle: "정글",
  mid: "미드",
  adc: "원딜",
  sup: "서포터",
};

export default function PlayerList() {
  const setSelectedPlayer = useSetAtom(selectedPlayerAtom);

  const { data: players = [], isLoading, isError, error } = usePlayerList();

  if (isLoading) return <PlayerListLoading />;
  if (isError) return <p className="text-red-500">오류: {error.message}</p>;

  return (
    <div className="p-4 text-black max-w-[25rem] bg-white rounded-xl h-5/6 flex flex-col">
      <div>
        <h2 className="text-2xl font-bold mb-4">내전 플레이어 목록</h2>
        <Divider sx={{ borderColor: "#888888", marginBottom: 3 }} />
      </div>
      <ul className="space-y-3 overflow-y-auto flex-1">
        {players.map((player: Player) => (
          <li
            key={player._id}
            className="border p-4 rounded shadow-sm flex justify-between bg-white"
          >
            <div>
              <p className="whitespace-nowrap overflow-hidden text-ellipsis">
                <span className="font-bold w-14 inline-block">이름</span>{" "}
                {player.name}
              </p>
              <p className="whitespace-nowrap overflow-hidden text-ellipsis w-40">
                <span className="font-bold w-14 inline-block">닉네임</span>{" "}
                {player.nickName}
              </p>
              <p className="whitespace-nowrap overflow-hidden text-ellipsis w-40">
                <span className="font-bold w-14 inline-block">포지션</span>{" "}
                {positionMap[player.position] || "알 수 없음"}
              </p>
              <p className="whitespace-nowrap overflow-hidden text-ellipsis">
                <span className="font-bold w-14 inline-block">그룹</span>{" "}
                {player.group && player.group.length > 0
                  ? player.group
                      .map((g) =>
                        typeof g === "object" ? g.name : "알 수 없음"
                      )
                      .join(", ")
                  : "없음"}
              </p>
            </div>
            <div className="flex items-start">
              <button
                className="text-sm bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-2xl cursor-pointer"
                onClick={() => setSelectedPlayer(player)}
              >
                수정하기
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
