"use client";

import { useAtom } from "jotai";
import { selectedPlayerAtom } from "@/store/player";
import { useState, useEffect } from "react";
import { getToken } from "@/utils/client/getToken";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/app/components/ToastContext";
import { API, DEFAULT_POINTS } from "@/constants";

export default function PlayerDB() {
  const [selectedPlayer] = useAtom(selectedPlayerAtom);
  const queryClient = useQueryClient();

  const [nickName, setNickName] = useState(selectedPlayer?.nickName || "");
  const [position, setPosition] = useState(selectedPlayer?.position || "top");
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
      setPosition(selectedPlayer.position || "top");
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
      const token = getToken();
      const response = await fetch(API.ME.PLAYER.ID(selectedPlayer._id), {
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
    try {
      const token = getToken();
      await fetch(API.ME.PLAYER.ID(selectedPlayer._id), {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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

  if (isPending) return <p>수정 중...</p>;
  if (!selectedPlayer)
    return <p className="text-black">선수를 선택해주세요.</p>;

  return (
    <div className="text-black">
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
      <button onClick={handleDeletePlayerDB} className="cursor-pointer">
        삭제하기
      </button>
    </div>
  );
}
