"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { fetchGlobalBan } from "@/lib/api/fetchGlobalBan";
import useBreakpoint from "@/utils/useBreakpion";

export default function GlobalBan() {
  const {
    data: champions = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["globalBan"],
    queryFn: fetchGlobalBan,
  });

  const { ismd } = useBreakpoint();

  return (
    <div className="bg-[url('/images/MainPage/globalban-bg.png')] 2xl:px-80 xl:px-60 lg:px-40 md:px-20 px-10 bg-cover bg-center py-10 md:py-20">
      <div className="flex flex-col justify-center items-center sm:text-[3.125rem] text-3xl pt-10 md:pt-0">
        <span className="text-[#B217CE] font-[BlackOps]">TODAY</span>
        <span className="text-[#ffffff] font-[BlackOps] whitespace-nowrap">
          GLOBAL BAN
        </span>
      </div>

      {isLoading && (
        <ul className="grid grid-cols-2 md:flex md:justify-between md:gap-6 mt-30 mb-20">
          {[...Array(5)].map((_, idx) => (
            <li
              key={idx}
              className="relative flex flex-col md:bg-[#1B4A85] w-[10rem] h-[10rem] px-4 pt-4 pb-2 rounded-xl items-center justify-end shadow-lg overflow-visible"
            >
              <div className="absolute bg-gray-700 -top-12 w-[6.25rem] h-[6.25rem] md:w-[8.75rem] md:h-[12.5rem] rounded-xl animate-pulse" />
            </li>
          ))}
        </ul>
      )}

      {!isLoading && !isError && (
        <ul className="grid grid-cols-2 gap-32 md:flex md:justify-between md:gap-6 mt-30 mb-20">
          {champions.map((champion, idx) => {
            const imageSrc = ismd
              ? `/images/champions/loading/${champion.en_name}.webp`
              : `/images/champions/portrait/${champion.en_name}.webp`;
            return (
              <li
                key={idx}
                className="relative flex flex-col md:bg-[#1B4A85] md:w-[10rem] md:h-[10rem] px-4 pt-4 pb-2 rounded-xl items-center justify-center md:justify-end shadow-lg overflow-visible"
              >
                <div className="absolute -top-12 w-[6.25rem] h-[6.25rem] md:w-[8.75rem] md:h-[12.5rem] rounded-xl overflow-hidden items-center justify-center">
                  <Image
                    src={imageSrc}
                    alt={champion.name}
                    width={!ismd ? 100 : 140}
                    height={!ismd ? 100 : 180}
                    className="object-center"
                    priority
                  />
                </div>
                <span className="absolute -bottom-14 md:-bottom-10 text-white font-semibold whitespace-nowrap">
                  {champion.name}
                </span>
              </li>
            );
          })}
        </ul>
      )}

      {isError && <p className="text-red-500 mt-4">{error.message}</p>}
    </div>
  );
}
