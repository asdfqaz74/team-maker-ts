import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useState } from "react";
import confetti from "canvas-confetti";
import { useAtom } from "jotai";
import { TeamResponse } from "@/types/team";
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
import { useResetAtom } from "jotai/utils";

export default function PickRandom({
  candidate,
  fullList,
}: {
  candidate: TeamResponse[];
  fullList: TeamResponse[];
}) {
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState<string[]>([]);
  const [leaders, setLeaders] = useAtom(teamLeaders);
  const [spinningOne, setSpinningOne] = useState("");
  const [spinningTwo, setSpinningTwo] = useState("");
  const [, SetUnSelectedPlayers] = useAtom(unselectedPlayers);

  const resetBlueTeam = useResetAtom(takeBlueTeamAtom);
  const resetRedTeam = useResetAtom(takeRedTeamAtom);
  const resetHistory = useResetAtom(takeHistoryAtom);
  const resetCurrentTeam = useResetAtom(takeCurrentPickAtom);
  const resetRemainingCount = useResetAtom(takeRemainingPickCountAtom);
  const resetPickStep = useResetAtom(takePickStepAtom);

  const resetAll = () => {
    resetBlueTeam();
    resetRedTeam();
    resetHistory();
    resetCurrentTeam();
    resetRemainingCount();
    resetPickStep();
  };

  const handleOpen = () => {
    setOpen(true);
    setResult([]); // 결과 초기화
    startSpinning(); // 스피닝 시작
  };

  const handleClose = () => {
    setOpen(false);
  };

  const startSpinning = () => {
    const totalSteps = 20;
    const delays1 = Array.from({ length: totalSteps }, (_, i) => 100 + i * 30);
    const delays2 = Array.from({ length: totalSteps }, (_, i) => 100 + i * 35);

    const shuffled = [...candidate].sort(() => Math.random() - 0.5);
    const [final1, final2] = shuffled.slice(0, 2);

    const runSpin = (
      setName: (name: string) => void,
      finalPlayer: TeamResponse,
      delays: number[]
    ) => {
      const spinStep = (i: number) => {
        if (i >= delays.length) return setName(finalPlayer.name);
        const randomName =
          candidate[Math.floor(Math.random() * candidate.length)].name;
        setName(randomName);
        setTimeout(() => spinStep(i + 1), delays[i]);
      };
      spinStep(0);
    };

    runSpin(setSpinningOne, final1, delays1);
    runSpin(setSpinningTwo, final2, delays2);

    const isFirstBlue = Math.random() > 0.5;
    const blueLeader = isFirstBlue ? final1 : final2;
    const redLeader = isFirstBlue ? final2 : final1;

    setTimeout(
      () => {
        setLeaders({ blue: blueLeader, red: redLeader });

        const others = fullList.filter(
          (player) =>
            player._id !== blueLeader._id && player._id !== redLeader._id
        );
        SetUnSelectedPlayers(others);

        resetAll();

        setResult([blueLeader.name, redLeader.name]);
        confetti({ particleCount: 120, spread: 100, origin: { y: 0.6 } });
      },
      delays2.reduce((a, b) => a + b, 0)
    );
  };

  return (
    <>
      <div>
        <button
          onClick={handleOpen}
          className={`bg-[#B0BCFF] text-black px-2 py-1 rounded ${
            candidate.length < 2
              ? "cursor-not-allowed bg-gray-500"
              : "cursor-pointer"
          }`}
          disabled={candidate.length < 2}
        >
          돌려
        </button>
      </div>
      <Dialog
        open={open}
        onClose={(e, reason) => {
          if (
            result.length === 0 &&
            (reason === "backdropClick" || reason === "escapeKeyDown")
          )
            return;
          handleClose();
        }}
        autoFocus
      >
        <DialogTitle>
          <span className="text-center">랜덤 추첨 결과</span>
        </DialogTitle>
        <DialogContent className="text-center">
          {result.length === 0 ? (
            <>
              <div className="flex gap-10 justify-center items-center mt-4">
                <div className="spin-wrapper">
                  <div
                    className="spin-text"
                    key={spinningOne}
                    style={{ animationDuration: `300ms` }}
                  >
                    {spinningOne}
                  </div>
                </div>
                <div className="spin-wrapper">
                  <div
                    className="spin-text"
                    key={spinningTwo}
                    style={{ animationDuration: `300ms` }}
                  >
                    {spinningTwo}
                  </div>
                </div>
              </div>
              <div className="text-sm text-gray-500 mt-2">돌리는 중...</div>
            </>
          ) : (
            <>
              <div className="text-xl font-semibold mt-4">✨ 뽑힌 사람 ✨</div>
              <div className="text-2xl font-bold mt-2 text-blue-500">
                <span>블루: {leaders.blue.name}</span>
              </div>
              <div className="text-2xl font-bold text-red-500">
                <span>레드: {leaders.red.name}</span>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
