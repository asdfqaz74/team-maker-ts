"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const count = [1, 2, 3, 4, 5];

export default function GlobalBan() {
  const [champions, setChampions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchGlobalBan = async () => {
    try {
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
        <ul className="grid grid-cols-5 gap-2 mt-20">
          {[...Array(5)].map((_, idx) => (
            <li
              key={idx}
              className="bg-[#1B4A85] w-[10rem] h-[10rem] rounded-2xl flex items-center justify-center"
            >
              <div className="w-[8.125rem] h-[14.75rem] bg-gray-700 rounded animate-pulse" />
            </li>
          ))}
        </ul>
      )}

      {!isLoading && (
        <ul className="flex justify-between gap-2 mt-20">
          {champions.map((champion, idx) => (
            <li
              key={idx}
              className="flex flex-col bg-[#1B4A85] w-[10rem] h-[10rem] rounded-xl items-center justify-center"
            >
              <Image
                src={`/images/champions/loading/${champion.en_name}.jpg`}
                alt={champion.name}
                width={130}
                height={236.13}
                className="rounded"
              />
              <span className="mt-2 font-semibold">{champion.name}</span>
            </li>
          ))}
        </ul>
      )}

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}
