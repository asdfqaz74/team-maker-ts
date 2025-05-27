import {
  confirmedBlueTeamAtom,
  confirmedRedTeamAtom,
  sendConfirmedBlueTeamAtom,
  sendConfirmedRedTeamAtom,
} from "@/store/player";
import { useAtom } from "jotai";
import { useResetAtom } from "jotai/utils";
import TakeOddsWinning from "./TakeOddsWinning";

export default function Result({
  onPrev,
  mode,
}: {
  onPrev: () => void;
  mode: "take" | "send" | "elo" | null;
}) {
  const [takeBlue] = useAtom(confirmedBlueTeamAtom);
  const [takeRed] = useAtom(confirmedRedTeamAtom);
  const [sendBlue] = useAtom(sendConfirmedBlueTeamAtom);
  const [sendRed] = useAtom(sendConfirmedRedTeamAtom);

  const resetTakeBlue = useResetAtom(confirmedBlueTeamAtom);
  const resetTakeRed = useResetAtom(confirmedRedTeamAtom);
  const resetSendBlue = useResetAtom(sendConfirmedBlueTeamAtom);
  const resetSendRed = useResetAtom(sendConfirmedRedTeamAtom);

  const isSend = mode === "send";
  const blueTeam = isSend ? sendBlue : takeBlue;
  const redTeam = isSend ? sendRed : takeRed;

  const resetAll = () => {
    resetTakeBlue();
    resetTakeRed();
    resetSendBlue();
    resetSendRed();
  };

  return (
    <div>
      <span>결과페이지</span>
      <div className="flex justify-center mt-20">
        <div className="flex gap-5">
          <div className="bg-sky-200 bg-opacity-50 text-black flex flex-col w-[12.5rem] text-center py-5">
            <span className="font-black">블루팀</span>
            <div className="flex gap-5 flex-col mt-3">
              {blueTeam.map((player) => (
                <span key={player._id}>{player.name}</span>
              ))}
            </div>
          </div>
          <TakeOddsWinning blueTeam={blueTeam} redTeam={redTeam} />
          <div className="bg-red-200 bg-opacity-50 text-black flex flex-col w-[12.5rem] text-center py-5">
            <span className="font-black">레드팀</span>
            <div className="flex gap-5 flex-col mt-3">
              {redTeam.map((player) => (
                <span key={player._id}>{player.name}</span>
              ))}
            </div>
          </div>
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
