import { avaliablePlayers, leaderA, leaderPlayers } from "@/store/player";
import { useAtom } from "jotai";
import PickRandom from "./PickRandom";

export default function PickLeader({
  onNext,
  onPrev,
}: {
  onNext: () => void;
  onPrev: () => void;
}) {
  const [checkedPlayers] = useAtom(avaliablePlayers);
  const [selectedPlayers, setSelectedPlayers] = useAtom(leaderPlayers);
  const [isLeaderExist] = useAtom(leaderA);

  const handleToggle = (player: string) => {
    setSelectedPlayers((prev) => {
      if (prev.includes(player)) {
        return prev.filter((id) => id !== player);
      } else {
        return [...prev, player];
      }
    });
  };

  console.log("selectedPlayers", selectedPlayers);
  return (
    <div>
      <span>2. 팀 리더를 선택하세요.</span>
      <ul>
        {checkedPlayers.map((player) => (
          <li key={player._id} className="">
            <input
              type="checkbox"
              checked={selectedPlayers.includes(player.name)}
              onChange={() => handleToggle(player.name)}
            />
            {player.name}
          </li>
        ))}
      </ul>
      <PickRandom candidate={selectedPlayers} />
      <div className="flex gap-20 justify-center mt-20">
        <button
          onClick={onPrev}
          className="bg-[#B0BCFF] text-black px-2 py-1 rounded cursor-pointer"
        >
          이전
        </button>
        <button
          onClick={onNext}
          disabled={!isLeaderExist}
          className={`${
            isLeaderExist
              ? "bg-[#B0BCFF] cursor-pointer"
              : "bg-gray-600 cursor-not-allowed"
          } text-black px-2 py-1 rounded`}
        >
          다음
        </button>
      </div>
    </div>
  );
}
