"use client";
import { fetchChampionList } from "@/lib/api/fetchChampionList";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";

export default function ChampionPalette() {
  const [searchChampion, setSearchChampion] = useState("");
  const [selected, setSelected] = useState([]);
  const {
    data: championList = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["championList"],
    queryFn: fetchChampionList,
  });

  const filteredChampionList = championList.filter((champ) =>
    champ.name.includes(searchChampion)
  );

  const toggleChampion = (championId) => {
    setSelected((prev) =>
      prev.includes(championId)
        ? prev.filter((id) => id !== championId)
        : [...prev, championId]
    );
  };

  if (isLoading) return <div>불러오는 중...</div>;
  if (isError) return <div>{error.message}</div>;

  return (
    <div className="flex flex-col justify-center items-center">
      <input
        type="text"
        className="bg-[#D9D9D9] placeholder-gray-500 p-2 text-gray-950 w-1/2"
        placeholder="챔피언 검색"
        value={searchChampion}
        onChange={(e) => setSearchChampion(e.target.value)}
      />
      <div className="grid grid-cols-6 gap-2">
        {filteredChampionList.map((champ) => (
          <button
            key={champ.id}
            onClick={() => toggleChampion(champ.id)}
            className={`border-2 rounded flex flex-col items-center justify-center ${
              selected.includes(champ.id)
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
            <p className="text-xs text-white">{champ.name}</p>
          </button>
        ))}
      </div>
      <div className="flex gap-2 flex-wrap">
        {selected.map((id) => {
          const champ = championList.find((c) => c.id === id);
          return (
            <div
              key={id}
              className="text-sm px-2 py-1 bg-blue-600 text-white rounded"
            >
              {champ?.name}
            </div>
          );
        })}
      </div>
      <div className="flex">
        <button className="cursor-pointer">설정</button>
      </div>
    </div>
  );
}
