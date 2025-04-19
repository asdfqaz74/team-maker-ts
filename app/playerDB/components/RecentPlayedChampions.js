import Image from "next/image";

export default function RecentPlayedChampions({ data }) {
  return (
    <div className="flex flex-col items-center gap-4">
      <span className="text-white font-semibold">챔피언</span>
      <div className="grid grid-cols-2 gap-4 bg-gray-600 p-4">
        {data?.map((champion, idx) => (
          <div key={idx} className="w-[3.125rem] h-[3.125rem]">
            <Image src={champion} alt="챔피언" width={50} height={50} />
          </div>
        ))}
      </div>
    </div>
  );
}
