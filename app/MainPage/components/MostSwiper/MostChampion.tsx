"use client";

import { fetchMostChampionTop5 } from "@/lib/api/fetchMostChampionTop5";
import { useQuery } from "@tanstack/react-query";
import MostSwiper from "./MostSwiper";
import { SwiperChampion } from "@/types/champion";
import MostSwiperSkeleton from "./MostSwiperSkeleton";

export default function MostChampion() {
  const {
    data: mostChampion = [],
    isLoading,
    isError,
    error,
  } = useQuery<SwiperChampion[]>({
    queryKey: ["mostChampion"],
    queryFn: fetchMostChampionTop5,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: 1000 * 60 * 5, // 5분
  });

  if (isLoading) return <MostSwiperSkeleton />;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="py-20 bg-[url('/images/MainPage/mainpage-2.webp')] bg-cover bg-center flex justify-evenly">
      {mostChampion && <MostSwiper champions={mostChampion} />}
    </div>
  );
}
