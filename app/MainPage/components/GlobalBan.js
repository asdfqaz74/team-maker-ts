"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { fetchGlobalBan } from "@/lib/api/fetchGlobalBan";

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

  return (
    <div className="bg-[url('/images/MainPage/globalban-bg.png')] bg-cover bg-center px-80 py-20">
      <div className="flex flex-col justify-center items-center">
        <span className="text-[#B217CE] text-[3.125rem] font-[BlackOps]">
          TODAY
        </span>
        <span className="text-[#ffffff] text-[3.125rem] font-[BlackOps]">
          GLOBAL BAN
        </span>
      </div>

      {isLoading && (
        <ul className="flex justify-between gap-6 mt-30 mb-20">
          {[...Array(5)].map((_, idx) => (
            <li
              key={idx}
              className="relative flex flex-col bg-[#1B4A85] w-[10rem] h-[10rem] px-4 pt-4 pb-2 rounded-xl items-center justify-end shadow-lg overflow-visible"
            >
              <div className="absolute bg-gray-700 -top-12 w-[8.75rem] h-[12.5rem] rounded-xl animate-pulse" />
            </li>
          ))}
        </ul>
      )}

      {!isLoading && !isError && (
        <ul className="flex justify-between gap-6 mt-30 mb-20">
          {champions.map((champion, idx) => (
            <li
              key={idx}
              className="relative flex flex-col bg-[#1B4A85] w-[10rem] h-[10rem] px-4 pt-4 pb-2 rounded-xl items-center justify-end shadow-lg overflow-visible"
            >
              <div className="absolute -top-12 w-[8.75rem] h-[12.5rem] rounded-xl overflow-hidden">
                <Image
                  src={`/images/champions/loading/${champion.en_name}.jpg`}
                  alt={champion.name}
                  width={140}
                  height={180}
                  className="object-center w-full h-full"
                  priority
                />
              </div>
              <span className="absolute -bottom-10 text-white font-semibold">
                {champion.name}
              </span>
            </li>
          ))}
        </ul>
      )}

      {isError && <p className="text-red-500 mt-4">{error.message}</p>}
    </div>
  );
}
