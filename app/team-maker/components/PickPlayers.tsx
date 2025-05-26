import { useAtom } from "jotai";
import { TeamResponse } from "@/types/team";
import { useQuery } from "@tanstack/react-query";
import { avaliablePlayers } from "@/store/player";
import { fetchParticipatingPlayers } from "@/lib/api/fetchParticipatingPlayers";
import LoadingSpinner from "@/public/lottie/components/LoadingSpinner";
import MobileLoadingSpinner from "@/public/lottie/components/MobileLoadingSpinner";
import { useBreakpoint } from "@/hooks/useBreakpoint";

export default function StepOne({ onNext }: { onNext: () => void }) {
  const {
    data: players = [],
    isLoading,
    isError,
    error,
  } = useQuery<TeamResponse[]>({
    queryKey: ["participatingPlayers"],
    queryFn: fetchParticipatingPlayers,
  });
  const [checkedPlayers, setCheckedPlayers] = useAtom(avaliablePlayers);

  const { ismd } = useBreakpoint();

  // 선수 목록 토글
  const toggleChecked = (playerId: TeamResponse) => {
    setCheckedPlayers((prev) => {
      if (prev.includes(playerId)) {
        return prev.filter((id) => id !== playerId);
      } else {
        return [...prev, playerId];
      }
    });
  };

  const selectedPlayersLength = checkedPlayers.length;

  if (isLoading)
    return ismd ? <LoadingSpinner text="" /> : <MobileLoadingSpinner />;
  if (isError) {
    console.error(error);
    return <div>선수 목록을 불러오는데 실패했습니다.</div>;
  }

  return (
    <div>
      <div className="flex flex-col">
        <span>1. 참여할 선수를 고르세요</span>
        <span className="inline-block">{selectedPlayersLength}/10</span>
      </div>
      <ul>
        {players.map((player) => (
          <li key={player._id} className="">
            <input
              type="checkbox"
              checked={checkedPlayers.includes(player)}
              onChange={() => toggleChecked(player)}
              disabled={
                selectedPlayersLength >= 10 && !checkedPlayers.includes(player)
              }
            />
            {player.name}
          </li>
        ))}
      </ul>
      <div className="flex justify-center mt-20">
        <button
          className={` text-black px-2 py-1 rounded ${
            selectedPlayersLength === 10
              ? "bg-[#B0BCFF] cursor-pointer"
              : "bg-gray-500 cursor-not-allowed"
          }`}
          onClick={onNext}
          disabled={selectedPlayersLength !== 10}
        >
          다음
        </button>
      </div>
    </div>
  );
}
