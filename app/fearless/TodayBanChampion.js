import { fetchGlobalBan } from "@/lib/api/fetchGlobalBan";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

export default function TodayBanChampion() {
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
    <div className="my-10">
      <p className="text-2xl font-semibold">Today Global Ban</p>
      <p>오늘의 글로벌 밴</p>
      {isLoading && <p>불러오는 중...</p>}
      {isError && <p>{error.message}</p>}
      {!isLoading && !isError && (
        <ul className="flex justify-evenly gap-6 mt-30 mb-20">
          {champions.map((champion, idx) => (
            <li
              key={idx}
              className="relative flex flex-col w-[10rem] h-[10rem] px-4 pt-4 pb-2 rounded-xl items-center justify-end shadow-lg overflow-visible"
            >
              <div className="absolute -top-12 w-[8.75rem] h-[12.5rem] rounded-xl overflow-hidden">
                <Image
                  src={`/images/champions/loading/${champion.en_name}.jpg`}
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
