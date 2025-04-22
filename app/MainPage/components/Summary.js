"use client";

import { useQuery } from "@tanstack/react-query";
import Pick from "./Pick";
import { fetchBestWinChampion } from "@/lib/api/fetchBestWinChampion";
import { fetchWorstWinChampion } from "@/lib/api/fetchWorstWinChampion";
import { fetchBanChampion } from "@/lib/api/fetchBanChampion";
import Image from "next/image";

export default function Summary() {
  const {
    data: bestData = [],
    isLoading: bestLoading,
    isError: bestError,
    error: bestErr,
  } = useQuery({
    queryKey: ["bestWinChampion"],
    queryFn: fetchBestWinChampion,
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
  });

  const {
    data: worstData = [],
    isLoading: worstLoading,
    isError: worstError,
    error: worstErr,
  } = useQuery({
    queryKey: ["worstWinChampion"],
    queryFn: fetchWorstWinChampion,
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
  });
  const {
    data: banData = [],
    isLoading: banLoading,
    isError: banError,
    error: banErr,
  } = useQuery({
    queryKey: ["banChampion"],
    queryFn: fetchBanChampion,
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
  });

  if (bestError || worstError || banError) {
    return (
      <>
        에러 발생:
        <br />
        {bestErr?.message}
        {worstErr?.message}
        {banErr?.message}
      </>
    );
  }

  return (
    <div className="flex flex-col bg-[url('/images/MainPage/summary-bg.webp')] bg-cover bg-center 2xl:px-80 xl:px-60 lg:px-40 px-5 py-20 ">
      <div className="mx-auto xl:mx-0 flex flex-col">
        <Image
          src="/images/MainPage/SummaryLogo.webp"
          alt="요약 3개"
          width={400}
          height={100}
        />
        <div className="flex xl:flex-row flex-col xl:justify-between gap-4 my-10 shrink-0 mx-auto xl:mx-0">
          <Pick data={bestData} isLoading={bestLoading} title={"BEST"} />
          <Pick data={worstData} isLoading={worstLoading} title={"WORST"} />
          <Pick data={banData} isLoading={banLoading} title={"BAN"} />
        </div>
      </div>
    </div>
  );
}
