"use client";
import { fetchChampionList } from "@/lib/api/fetchChampionList";
import { Dialog } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Image from "next/image";
import { ChampionList, SelectedBanChampion } from "@/types/champion";

interface ChampionPaletteProps {
  open: boolean;
  onClose: () => void;
  selected: SelectedBanChampion[];
  setSelected: (newSelected: SelectedBanChampion[]) => void;
}

export default function ChampionPalette({
  open,
  onClose,
  selected,
  setSelected,
}: ChampionPaletteProps) {
  const [searchChampion, setSearchChampion] = useState("");

  const {
    data: championList = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["championList"],
    queryFn: fetchChampionList,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 1000 * 60 * 60,
  });

  const filteredChampionList = championList.filter((champ) =>
    champ.name.includes(searchChampion)
  );

  const toggleChampion = (champ: ChampionList) => {
    const exists = selected.find((c) => c.id === champ.id);
    const newList = exists
      ? selected.filter((c) => c.id !== champ.id)
      : [...selected, { id: champ.id, name: champ.name, image: champ.image }];

    setSelected(newList); //
  };

  if (isLoading) return <div>불러오는 중...</div>;
  if (isError) return <div>{error.message}</div>;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      autoFocus
      slotProps={{
        paper: {
          sx: {
            minWidth: "37.5rem",
            minHeight: "30rem",
            backgroundColor: "#1E1E2F",
            paddingX: "1rem",
          },
        },
      }}
    >
      <div className="flex flex-col justify-center items-center py-10 gap-5">
        <input
          type="text"
          className="bg-[#D9D9D9] placeholder-gray-500 p-2 text-gray-950 w-1/2 my-6"
          placeholder="챔피언 검색"
          value={searchChampion}
          onChange={(e) => setSearchChampion(e.target.value)}
        />
        <p className="mb-5 text-white">
          현재 선택한 챔피언 수 : {selected.length}개
        </p>
        <div className="grid grid-cols-8 gap-2">
          {filteredChampionList.map((champ) => (
            <button
              key={champ.id}
              onClick={() => toggleChampion(champ)}
              className={`border-2 rounded flex flex-col items-center justify-center min-w-0 ${
                selected.find((c) => c.id === champ.id)
                  ? "border-blue-500"
                  : "border-transparent"
              }`}
            >
              <Image
                src={champ.image}
                alt={champ.name}
                className="object-cover cursor-pointer"
                width={64}
                height={64}
              />
              <p className="text-xs text-center text-white truncate w-[4rem]">
                {champ.name}
              </p>
            </button>
          ))}
        </div>
        <p className="text-white mt-5">
          현재 선택한 챔피언 수 : {selected.length}개
        </p>
        <div className="grid grid-cols-5 gap-2">
          {selected.map((champ) => (
            <div
              key={champ.id}
              className="text-sm px-2 py-1 bg-blue-600 text-white rounded text-center w-[5.0625rem] truncate"
            >
              {champ?.name}
            </div>
          ))}
        </div>
        <div className="flex">
          <button
            className="cursor-pointer bg-sky-700 hover:bg-sky-900 text-white p-2 rounded disabled:bg-gray-500 disabled:cursor-not-allowed"
            onClick={onClose}
            disabled={selected.length === 0 || selected.length > 10}
          >
            설정하기
          </button>
        </div>
      </div>
    </Dialog>
  );
}
