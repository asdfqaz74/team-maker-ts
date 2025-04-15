"use client";

import { fetchMostChampionTop5 } from "@/lib/api/fetchMostChampionTop5";
import { useQuery } from "@tanstack/react-query";

import MostSwiper from "./MostSwiper";

export default function MostChampion() {
  const {
    data: mostChampion = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["mostChampion"],
    queryFn: fetchMostChampionTop5,
  });

  if (isLoading) return <div className="animate-pulse">Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="px-60 py-20 bg-[url('/images/MainPage/mainpage-2.png')] flex justify-evenly">
      {mostChampion && <MostSwiper champions={mostChampion} />}
    </div>
  );
}
