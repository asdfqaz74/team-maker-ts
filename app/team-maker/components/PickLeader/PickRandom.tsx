import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useState } from "react";
import confetti from "canvas-confetti";

export default function PickRandom({ candidate }: { candidate: string[] }) {
  const [open, setOpen] = useState(false);
  const [spinningName, setSpinningName] = useState("");
  const [secondSpinningName, setSecondSpinningName] = useState("");
  const [result, setResult] = useState<string[]>([]);

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

    const shuffledOnce = [...candidate].sort(() => Math.random() - 0.5);
    const [finalName1, finalName2] = shuffledOnce.slice(0, 2);

    const runSpin = (
      setName: (name: string) => void,
      name: string,
      delays: number[]
    ) => {
      const spinStep = (index: number) => {
        if (index >= delays.length) {
          setName(name); // 마지막에 고정
          return;
        }

        const randomName =
          candidate[Math.floor(Math.random() * candidate.length)];
        setName(randomName);

        setTimeout(() => spinStep(index + 1), delays[index]);
      };

      spinStep(0);
    };

    runSpin(setSpinningName, finalName1, delays1);
    runSpin(setSecondSpinningName, finalName2, delays2);

    // 결과 설정 및 컨페티
    setTimeout(
      () => {
        setResult([finalName1, finalName2]);
        confetti({
          particleCount: 120,
          spread: 100,
          origin: { y: 0.6 },
        });
      },
      delays2.reduce((a, b) => a + b, 0)
    ); // 가장 느린 쪽 기준 타이밍
  };

  return (
    <>
      <div>
        <button onClick={handleOpen}>돌려</button>
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
                    key={spinningName}
                    style={{ animationDuration: `300ms` }}
                  >
                    {spinningName}
                  </div>
                </div>
                <div className="spin-wrapper">
                  <div
                    className="spin-text"
                    key={secondSpinningName}
                    style={{ animationDuration: `300ms` }}
                  >
                    {secondSpinningName}
                  </div>
                </div>
              </div>
              <div className="text-sm text-gray-500 mt-2">돌리는 중...</div>
            </>
          ) : (
            <>
              <div className="text-xl font-semibold mt-4">✨ 뽑힌 사람 ✨</div>
              <div className="text-2xl font-bold mt-2">{result[0]}</div>
              <div className="text-2xl font-bold">{result[1]}</div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
