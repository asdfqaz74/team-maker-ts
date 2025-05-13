import { confirmedBlueTeamAtom, confirmedRedTeamAtom } from "@/store/player";
import { useAtom } from "jotai";
import { useResetAtom } from "jotai/utils";
import TakeOddsWinning from "./TakeOddsWinning";

export default function Result({ onPrev }: { onPrev: () => void }) {
  const [blueTeam] = useAtom(confirmedBlueTeamAtom);
  const [redTeam] = useAtom(confirmedRedTeamAtom);

  const resetBlueTeam = useResetAtom(confirmedBlueTeamAtom);
  const resetRedTeam = useResetAtom(confirmedRedTeamAtom);

  const resetAll = () => {
    resetBlueTeam();
    resetRedTeam();
  };

  console.log("blueTeam", blueTeam);
  console.log("redTeam", redTeam);
  return (
    <div>
      <span>결과페이지</span>
      <div className="flex justify-center mt-20">
        <div className="flex flex-col gap-5">
          <div>
            <span>블루팀</span>
            <div className="flex gap-5">
              {blueTeam.map((player) => (
                <span key={player._id}>{player.name}</span>
              ))}
            </div>
          </div>
          <div>
            <span>레드팀</span>
            <div className="flex gap-5">
              {redTeam.map((player) => (
                <span key={player._id}>{player.name}</span>
              ))}
            </div>
          </div>
          <TakeOddsWinning blueTeam={blueTeam} redTeam={redTeam} />
        </div>
      </div>
      <div>
        <button
          className="bg-[#B0BCFF] text-black px-2 py-1 rounded cursor-pointer"
          onClick={() => {
            resetAll();
            onPrev();
          }}
        >
          이전
        </button>
      </div>
    </div>
  );
}
