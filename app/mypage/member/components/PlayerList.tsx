"use client";
import { useSetAtom } from "jotai";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { selectedPlayerAtom } from "@/store/player";
import { fetchPlayers } from "@/lib/api/fetchPlayers";
import { Divider } from "@mui/material";
import { Player } from "@/types/user";

const positionMap = {
  top: "탑",
  jungle: "정글",
  mid: "미드",
  adc: "원딜",
  sup: "서포터",
};

export default function PlayerList() {
  const setSelectedPlayer = useSetAtom(selectedPlayerAtom);
  const { data: session } = useSession();

  const {
    data: players = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["players"],
    queryFn: async () => fetchPlayers(),
    enabled: !!session,
  });

  if (isLoading) return <p>로딩 중...</p>;
  if (isError) return <p className="text-red-500">오류: {error.message}</p>;

  return (
    <div className="p-4 text-black max-w-[21.875rem] bg-white rounded-xl h-5/6 flex flex-col">
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
              <p>
                <strong>이름:</strong> {player.name}
              </p>
              <p>
                <strong>닉네임:</strong> {player.nickName}
              </p>
              <p>
                <strong>포지션:</strong>{" "}
                {positionMap[player.position] || "알 수 없음"}
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
            <button
              className="text-sm text-blue-500 underline cursor-pointer"
              onClick={() => setSelectedPlayer(player)}
            >
              수정하기
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
