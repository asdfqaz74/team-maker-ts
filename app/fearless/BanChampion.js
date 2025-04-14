import Image from "next/image";

export default function BanChampion({ onClick, set, banList }) {
  return (
    <div className="flex flex-col my-10">
      <div className="flex justify-between items-center mb-4">
        <p className="text-2xl font-semibold">{set}</p>
        <button
          className="cursor-pointer bg-gray-800 px-3 py-1 rounded text-white"
          onClick={onClick}
        >
          설정하기
        </button>
      </div>
      <div className="">
        <ul className="flex justify-evenly">
          {banList &&
            banList.map((champ) => (
              <li key={champ.id}>
                <Image
                  src={champ.image}
                  alt={champ.name}
                  width={60}
                  height={60}
                />
                <p className="text-sm text-center text-white truncate w-[4rem]">
                  {champ.name}
                </p>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
