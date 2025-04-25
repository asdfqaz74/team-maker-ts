"use client";
import { useAtom, useSetAtom } from "jotai";
import { selectedPlayerAtom } from "@/store/player";
import { tokenAtom } from "@/store/auth";
import { useQuery } from "@tanstack/react-query";
import { fetchPlayers } from "@/lib/api/fetchPlayers";

const positionMap = {
  top: "탑",
  jungle: "정글",
  mid: "미드",
  adc: "원딜",
  sup: "서포터",
};

export default function PlayerList() {
  const [token] = useAtom(tokenAtom);
  const setSelectedPlayer = useSetAtom(selectedPlayerAtom);

  const {
    data: players = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["players"],
    queryFn: async () => fetchPlayers(token),
    enabled: !!token,
  });

  if (isLoading) return <p>로딩 중...</p>;
  if (isError) return <p className="text-red-500">오류: {error.message}</p>;

  return (
    <div className="p-4 text-black">
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
