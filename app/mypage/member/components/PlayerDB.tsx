"use client";

import { useAtom } from "jotai";
import { selectedPlayerAtom } from "@/store/player";
import { useState, useEffect } from "react";
import { getToken } from "@/utils/client/getToken";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/app/components/ToastContext";
import { API, DEFAULT_POINTS } from "@/constants";
import { Divider } from "@mui/material";
import UnSelected from "./UnSelected";
import User from "@/public/images/components/User.svg";

type Position = "top" | "jug" | "mid" | "adc" | "sup";

export default function PlayerDB() {
  const [selectedPlayer] = useAtom(selectedPlayerAtom);
  const queryClient = useQueryClient();

  const [nickName, setNickName] = useState(selectedPlayer?.nickName || "");
  const [position, setPosition] = useState<Position>(
    (selectedPlayer?.position || "top") as Position
  );
  const [elo, setElo] = useState({
    top: selectedPlayer?.eloRating.top || DEFAULT_POINTS,
    jug: selectedPlayer?.eloRating.jug || DEFAULT_POINTS,
    mid: selectedPlayer?.eloRating.mid || DEFAULT_POINTS,
    adc: selectedPlayer?.eloRating.adc || DEFAULT_POINTS,
    sup: selectedPlayer?.eloRating.sup || DEFAULT_POINTS,
  });

  const { showSnack } = useToast();

  useEffect(() => {
    if (selectedPlayer) {
      setNickName(selectedPlayer.nickName || "");
      setPosition((selectedPlayer.position || "top") as Position);
      setElo({
        top: selectedPlayer.eloRating.top ?? DEFAULT_POINTS,
        jug: selectedPlayer.eloRating.jug ?? DEFAULT_POINTS,
        mid: selectedPlayer.eloRating.mid ?? DEFAULT_POINTS,
        adc: selectedPlayer.eloRating.adc ?? DEFAULT_POINTS,
        sup: selectedPlayer.eloRating.sup ?? DEFAULT_POINTS,
      });
    }
  }, [selectedPlayer]);

  const { mutate: editPlayer, isPending } = useMutation({
    mutationFn: async () => {
      if (!selectedPlayer) {
        showSnack("선수를 선택해주세요.", "error");
        return;
      }

      const response = await fetch(API.ME.PLAYER.ID(selectedPlayer._id), {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nickName,
          position,
          eloRating: elo,
        }),
      });

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error || "선수 정보 수정에 실패했습니다.");
      return data;
    },
    onSuccess: () => {
      showSnack("선수 정보가 수정되었습니다.", "success");
      queryClient.invalidateQueries({ queryKey: ["players"] });
    },
    onError: (error) => {
      showSnack(error.message || "선수 정보 수정에 실패했습니다.", "error");
    },
  });

  // 선수 수정 핸들러
  const handleEditPlayerDB = async () => {
    editPlayer();
  };

  // 선수 삭제 핸들러
  const handleDeletePlayerDB = async () => {
    if (!selectedPlayer) return;

    try {
      await fetch(API.ME.PLAYER.ID(selectedPlayer._id), {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: selectedPlayer._id }),
      });

      showSnack("선수가 삭제되었습니다.", "success");
      queryClient.invalidateQueries({ queryKey: ["players"] });
    } catch (error) {
      console.error("선수 삭제 중 오류: ", error);
      showSnack("선수 삭제에 실패했습니다.", "error");
    }
  };

  const lanes: Position[] = ["top", "jug", "mid", "adc", "sup"];

  if (isPending) return <p>수정 중...</p>;
  if (!selectedPlayer) return <UnSelected />;

  return (
    <div className="text-black max-w-[43.75rem] bg-white rounded-xl p-4 h-5/6 flex flex-col">
      <div>
        <div className="flex justify-between items-end mb-4">
          <div className="flex items-center gap-2">
            <User />
            <h2 className="text-2xl font-bold">내전 멤버 관리</h2>
          </div>
          <span>{selectedPlayer.name}</span>
        </div>
        <Divider sx={{ borderColor: "#888888", marginBottom: 3 }} />
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-4">멤버 정보 관리</h3>
        <div className="mb-2 flex gap-2 flex-col">
          <div className="flex gap-14 items-center">
            <span className="w-12">닉네임</span>
            <input
              type="text"
              value={nickName}
              onChange={(e) => setNickName(e.target.value)}
              className="border px-2 py-1 w-40"
              placeholder="강진성"
            />
          </div>
          <div className="flex gap-14 items-center">
            <span>포지션</span>
            <select
              value={position}
              onChange={(e) => setPosition(e.target.value as Position)}
              className="border px-2 py-1 w-40"
            >
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
        </div>
      </div>
      <Divider sx={{ borderColor: "#888888", marginBottom: 3 }} />
      <label className="block font-semibold mb-2">ELO 관리</label>
      <div className="flex gap-4">
        {lanes.map((lane) => (
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
      <button onClick={handleEditPlayerDB} className="cursor-pointer">
        수정하기
      </button>
      <button onClick={handleDeletePlayerDB} className="cursor-pointer">
        삭제하기
      </button>
    </div>
  );
}
