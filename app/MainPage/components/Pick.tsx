import Image from "next/image";

const titleColor = {
  BEST: "#0FA4FE",
  WORST: "#F53B3B",
  BAN: "#B217CE",
};

export default function Pick({ data, isLoading, title }) {
  const color = titleColor[title] || "#000000";

  return (
    <div className="border border-[#0FA4FE] p-10 rounded-2xl min-w-[17.5rem] max-w-[25rem] mx-auto lg:mx-0">
      <div className="font-[BlackOps] text-3xl flex gap-4 items-center justify-center whitespace-nowrap">
        <p style={{ color }}>{title}</p>
        <p>PICK 3</p>
      </div>
      <div className="flex flex-col gap-4 mt-10">
        {data &&
          data.map((champion) => (
            <div
              className="bg-white/10 flex w-[13.75rem] mx-auto rounded-2xl p-2 gap-4 items-center"
              key={champion.en_name}
            >
              <Image
                src={champion.image}
                alt={champion.name}
                width={100}
                height={100}
                className="rounded-2xl"
              />
              <div className="text-white flex flex-col gap-2">
                <p className="text-sm">{champion.name}</p>
                <div className="flex gap-2">
                  {title === "BAN" ? (
                    <p>{champion.count}회</p>
                  ) : (
                    <div className="flex gap-2 text-xs md:text-base whitespace-nowrap">
                      <p>{champion.count}게임</p>
                      <p>{champion.winRate}%</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
