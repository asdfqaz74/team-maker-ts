import { useAtom } from "jotai";
import { checkedPlayersAtom } from "@/store/player";
import { usePlayerList } from "@/hooks/usePlayersList";

export default function StepOne({ onNext }: { onNext: () => void }) {
  const { data: players = [] } = usePlayerList();
  const [checkedPlayers, setCheckedPlayers] = useAtom(checkedPlayersAtom);

  // 선수 목록 토글
  const toggleChecked = (playerId: string) => {
    setCheckedPlayers((prev) => {
      if (prev.includes(playerId)) {
        return prev.filter((id) => id !== playerId);
      } else {
        return [...prev, playerId];
      }
    });
  };

  console.log("players", players);
  console.log("checkedPlayers", checkedPlayers);

  return (
    <div>
      <span>1. 참여할 선수를 고르세요</span>
      <ul>
        {players.map((player) => (
          <li key={player._id} className="">
            <input
              type="checkbox"
              checked={checkedPlayers.includes(player.name)}
              onChange={() => toggleChecked(player.name)}
            />
            {player.name}
          </li>
        ))}
      </ul>
      <div className="flex justify-center mt-20">
        <button
          className="bg-[#c0c9fc] text-black px-2 py-1 rounded cursor-pointer"
          onClick={onNext}
        >
          다음
        </button>
      </div>
    </div>
  );
}
