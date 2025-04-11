"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function GlobalBan() {
  const [champions, setChampions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchGlobalBan = async () => {
    try {
      setIsLoading(true);

      const response = await fetch("/api/champion/global-ban", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("챔피언 데이터를 불러오는데 실패했습니다.");
      }

      const data = await response.json();
      setChampions(data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGlobalBan();
  }, []);

  return (
    <div className="bg-[url('/images/MainPage/globalban-bg.png')] px-60 py-20">
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

      {!isLoading && (
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
                  className="object-cover w-full h-full"
                  priority
                />
              </div>
              <span className="absolute -bottom-10 text-white text-sm font-semibold">
                {champion.name}
              </span>
            </li>
          ))}
        </ul>
      )}

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}
