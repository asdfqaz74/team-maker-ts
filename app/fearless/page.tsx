"use client";

import SetBan from "./SetBan";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import TodayBanChampion from "./TodayBanChampion";
import { useToast } from "../components/ToastContext";
import { SelectedBanChampion } from "@/types/champion";
import { fetchGlobalBan } from "@/lib/api/fetchGlobalBan";

export default function Page() {
  const [bans, setBans] = useState<{
    "1경기": SelectedBanChampion[];
    "2경기": SelectedBanChampion[];
  }>({
    "1경기": [],
    "2경기": [],
  });

  const { showSnack } = useToast();

  const handleSelectChange = (
    set: "1경기" | "2경기",
    newSelected: SelectedBanChampion[]
  ) => {
    setBans((prev) => ({ ...prev, [set]: newSelected }));
  };

  const {
    data: rawChampions = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["globalBan"],
    queryFn: fetchGlobalBan,
  });

  const champions: SelectedBanChampion[] = rawChampions.map((champ) => ({
    id: champ.en_name,
    name: champ.name,
    image: `images/champions/portrait/${champ.en_name}.webp`,
  }));

  console.log("rawChamp", rawChampions);
  console.log(champions);

  // 디스코드 복사용 포맷팅
  const formatList = (arr: SelectedBanChampion[]) =>
    arr.map((champion) => champion.name).join(" ");

  const handleCopy = async () => {
    const text = [
      "```",
      "[오늘의 글로벌 밴]",
      champions.length ? formatList(champions) : "없음",
      "",
      "[1 경기]",
      formatList(bans["1경기"]),
      "",
      "[2 경기]",
      formatList(bans["2경기"]),
      "```",
    ].join("\n");

    try {
      await navigator.clipboard.writeText(text);
    } catch (error: unknown) {
      if (error instanceof Error) {
        showSnack("클립보드 복사에 실패했습니다.", "error");
      } else {
        showSnack("알 수 없는 에러가 발생했습니다.", "error");
      }
      return;
    }

    showSnack("디스코드용 텍스트가 클립보드에 복사되었습니다.", "success");
  };

  return (
    <div className="flex flex-col px-40 py-20">
      <TodayBanChampion
        champions={rawChampions}
        isLoading={isLoading}
        isError={isError}
        error={error}
      />
      <SetBan
        set={"1 경기"}
        selected={bans["1경기"]}
        onSelectedChange={(newSelected) =>
          handleSelectChange("1경기", newSelected)
        }
      />
      <SetBan
        set={"2 경기"}
        selected={bans["2경기"]}
        onSelectedChange={(newSelected) =>
          handleSelectChange("2경기", newSelected)
        }
      />
      <button
        className="bg-sky-700 hover:bg-sky-900 p-2 rounded cursor-pointer w-72 mx-auto"
        onClick={handleCopy}
      >
        디스코드용 복사하기
      </button>
    </div>
  );
}
