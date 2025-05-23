"use client";

import PickPlayers from "./components/PickPlayers";
import PickTeamMode from "./components/PickTeamMode";
import { useEffect, useState } from "react";
import PickLeader from "./components/PickLeader/PickLeader";
import TakePlayer from "./components/TeamMode/TakePlayer";
import SendPlayer from "./components/TeamMode/SendPlayer";
import EloPlayer from "./components/TeamMode/EloPlayer";
import Result from "./components/Result/Result";
import { useResetAtom } from "jotai/utils";
import {
  avaliablePlayers,
  confirmedBlueTeamAtom,
  confirmedRedTeamAtom,
  leaderPlayers,
  sendBlueTeamAtom,
  sendConfirmedBlueTeamAtom,
  sendConfirmedRedTeamAtom,
  sendPlayers,
  sendRedTeamAtom,
  takeBlueTeamAtom,
  takePlayers,
  takeRedTeamAtom,
  teamLeaders,
} from "@/store/player";
import { useSession } from "next-auth/react";
import Spinner from "@/public/images/components/spinner.svg";

type Mode = "take" | "send" | "elo";

export default function Page() {
  const [step, setStep] = useState(1);
  const [lastStep, setLastStep] = useState<number | null>(null);
  const [mode, setMode] = useState<Mode | null>(null);
  const { status } = useSession();

  // 전역변수 초기화
  const resetTakePlayers = useResetAtom(takePlayers);
  const resetSendPlayers = useResetAtom(sendPlayers);
  const resetLeaders = useResetAtom(teamLeaders);
  const resetLeaderPlayers = useResetAtom(leaderPlayers);
  const resetConfirmedBlueTeam = useResetAtom(confirmedBlueTeamAtom);
  const resetConfirmedRedTeam = useResetAtom(confirmedRedTeamAtom);
  const resetSendConfirmedBlueTeam = useResetAtom(sendConfirmedBlueTeamAtom);
  const resetSendConfirmedRedTeam = useResetAtom(sendConfirmedRedTeamAtom);
  const resetTakeBlue = useResetAtom(takeBlueTeamAtom);
  const resetTakeRed = useResetAtom(takeRedTeamAtom);
  const resetSendBlue = useResetAtom(sendBlueTeamAtom);
  const resetSendRed = useResetAtom(sendRedTeamAtom);
  const resetAvailablePlayers = useResetAtom(avaliablePlayers);

  const resetAtoms = () => {
    resetTakePlayers();
    resetSendPlayers();
    resetLeaders();
    resetConfirmedBlueTeam();
    resetConfirmedRedTeam();
    resetSendConfirmedBlueTeam();
    resetSendConfirmedRedTeam();
    resetTakeBlue();
    resetTakeRed();
    resetSendBlue();
    resetSendRed();
    resetAvailablePlayers();
    resetLeaderPlayers();
  };

  useEffect(() => {
    resetAtoms();
  }, []);

  if (status === "loading") {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-40 z-50">
        <Spinner />
        <p className="mt-4 text-white text-lg">
          로그인 정보를 확인 중입니다...
        </p>
      </div>
    );
  }

  return (
    <div className="px-60 py-20">
      {/* 게임에 참여할 선수 고르기 */}
      {step === 1 && <PickPlayers onNext={() => setStep(2)} />}
      {/* 팀 리더 선택 */}
      {step === 2 && (
        <PickLeader onNext={() => setStep(3)} onPrev={() => setStep(1)} />
      )}
      {/* 팀 모드 선택 */}
      {step === 3 && (
        <PickTeamMode
          onPrev={() => setStep(2)}
          toTake={() => {
            setStep(4);
            setLastStep(4);
            setMode("take");
          }}
          toSend={() => {
            setStep(5);
            setLastStep(5);
            setMode("send");
          }}
          toElo={() => {
            setStep(6);
            setLastStep(6);
            setMode("elo");
          }}
        />
      )}
      {/* 4. 데려오기 5. 보내기 6. Elo */}
      {step === 4 && (
        <TakePlayer onPrev={() => setStep(3)} onNext={() => setStep(7)} />
      )}
      {step === 5 && (
        <SendPlayer onPrev={() => setStep(3)} onNext={() => setStep(7)} />
      )}
      {step === 6 && (
        <EloPlayer onPrev={() => setStep(3)} onNext={() => setStep(7)} />
      )}
      {/* 마무리 */}
      {step === 7 && (
        <Result
          mode={mode}
          onPrev={() => {
            if (lastStep) setStep(lastStep);
            else setStep(3);
          }}
        />
      )}
    </div>
  );
}
