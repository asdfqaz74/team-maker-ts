import { GlobalBanChampion } from "@/types/champion";
import Image from "next/image";

interface TodayBanChampionProps {
  champions: GlobalBanChampion[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

export default function TodayBanChampion({
  champions,
  isLoading,
  isError,
  error,
}: TodayBanChampionProps) {
  return (
    <div className="my-10">
      <p className="text-2xl font-semibold">Today Global Ban</p>
      <p>오늘의 글로벌 밴</p>
      {isLoading && <p>불러오는 중...</p>}
      {isError && <p>{error?.message || "불러오는 중 문제가 생겼습니다."}</p>}
      {!isLoading && !isError && (
        <ul className="flex justify-evenly gap-6 mt-30 mb-20">
          {champions.map((champion, idx) => (
            <li
              key={idx}
              className="relative flex flex-col w-[10rem] h-[10rem] px-4 pt-4 pb-2 rounded-xl items-center justify-end shadow-lg overflow-visible"
            >
              <div className="absolute -top-12 w-[8.75rem] h-[12.5rem] rounded-xl overflow-hidden">
                <Image
                  src={`/images/champions/loading/${champion.en_name}.webp`}
                  alt={champion.name}
                  width={140}
                  height={180}
                />
              </div>
              <span className="absolute -bottom-10 text-white text-sm font-semibold">
                {champion.name}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
