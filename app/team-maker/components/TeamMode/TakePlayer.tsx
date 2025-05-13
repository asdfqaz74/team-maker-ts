import {
  takeBlueTeamAtom,
  takeCurrentPickAtom,
  takeHistoryAtom,
  takePickStepAtom,
  takeRedTeamAtom,
  takeRemainingPickCountAtom,
  teamLeaders,
  unselectedPlayers,
} from "@/store/player";
import { TeamResponse } from "@/types/team";
import { useAtom } from "jotai";
import { useEffect } from "react";

export default function TakePlayer({ onPrev }: { onPrev: () => void }) {
  const [leaders] = useAtom(teamLeaders);
  const [players, setPlayers] = useAtom(unselectedPlayers);
  const [blueTeam, setBlueTeam] = useAtom(takeBlueTeamAtom);
  const [redTeam, setRedTeam] = useAtom(takeRedTeamAtom);
  const [history, setHistory] = useAtom(takeHistoryAtom);
  const [currentTeam, setCurrentTeam] = useAtom(takeCurrentPickAtom);
  const [remainingCount, setRemainingCount] = useAtom(
    takeRemainingPickCountAtom
  );
  const [pickStep, setPickStep] = useAtom(takePickStepAtom);

  useEffect(() => {
    setBlueTeam([leaders.blue]);
    setRedTeam([leaders.red]);
    setHistory([]);
  }, [leaders, setBlueTeam, setRedTeam, setHistory]);

  const saveHistory = () => {
    setHistory((prev) => [
      ...prev,
      {
        blue: [...blueTeam],
        red: [...redTeam],
        remaining: [...players],
        current: currentTeam,
        count: remainingCount,
        pickStep,
      },
    ]);
  };

  const handlePick = (player: TeamResponse) => {
    if (remainingCount <= 0) return;

    saveHistory();

    if (currentTeam === "blue") {
      setBlueTeam((prev) => [...prev, player]);
    } else {
      setRedTeam((prev) => [...prev, player]);
    }

    setPlayers((prev) => prev.filter((p) => p._id !== player._id));

    if (remainingCount === 1) {
      // 다음 단계로 전환
      if (pickStep === 1) {
        setCurrentTeam("red");
        setRemainingCount(2);
        setPickStep(2);
      } else if (pickStep === 2) {
        setCurrentTeam("blue");
        setRemainingCount(2);
        setPickStep(3);
      } else if (pickStep === 3) {
        setCurrentTeam("red");
        setRemainingCount(1);
        setPickStep(4);
      } else if (pickStep === 4) {
        setRemainingCount(0);
      }
    } else {
      setRemainingCount((prev) => prev - 1);
    }
  };

  const handleUndo = () => {
    if (history.length === 0) return;

    const last = history[history.length - 1];
    setBlueTeam(last.blue);
    setRedTeam(last.red);
    setPlayers(last.remaining);
    setCurrentTeam(last.current);
    setRemainingCount(last.count);
    setPickStep(last.pickStep);

    setHistory((prev) => prev.slice(0, -1));
  };

  const assignRemaining = () => {
    if (players.length !== 2) return;

    const shuffled = [...players].sort(() => Math.random() - 0.5);
    setBlueTeam((prev) => [...prev, shuffled[0]]);
    setRedTeam((prev) => [...prev, shuffled[1]]);
    setPlayers([]);
  };

  const isNextDisabled = blueTeam.length < 5 || redTeam.length < 5;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-lg font-bold">4. 팀원 뽑기</span>
        <div className="flex gap-2">
          <button
            onClick={handleUndo}
            className="bg-gray-300 px-3 py-1 rounded"
          >
            되돌리기
          </button>
          <button
            onClick={assignRemaining}
            className={`px-3 py-1 rounded ${
              players.length === 2
                ? "bg-green-400"
                : "bg-gray-300 cursor-not-allowed"
            }`}
            disabled={players.length !== 2}
          >
            랜덤 배정
          </button>
        </div>
      </div>

      <div className="flex justify-around">
        <div className="w-1/3">
          <h2 className="text-blue-600 font-bold">블루팀</h2>
          {blueTeam.map((p) => (
            <div key={p._id}>{p.name}</div>
          ))}
        </div>

        <div className="w-1/3">
          <h2 className="text-red-600 font-bold">레드팀</h2>
          {redTeam.map((p) => (
            <div key={p._id}>{p.name}</div>
          ))}
        </div>

        <div className="w-1/3">
          <h2 className="font-bold mb-2">대기열</h2>
          {players.map((p) => (
            <button
              key={p._id}
              onClick={() => handlePick(p)}
              className="block w-full bg-primary text-white rounded my-1 py-1"
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <button
          className="bg-[#B0BCFF] text-black px-3 py-2 rounded cursor-pointer"
          onClick={onPrev}
        >
          이전
        </button>
        <button
          disabled={isNextDisabled}
          className={`px-4 py-2 rounded ${
            isNextDisabled ? "bg-gray-400" : "bg-blue-500 text-white"
          }`}
        >
          다음
        </button>
      </div>
    </div>
  );
}
