export default function StepTwo({
  onPrev,
  toTake,
  toSend,
  toElo,
}: {
  onPrev: () => void;
  toTake: () => void;
  toSend: () => void;
  toElo: () => void;
}) {
  return (
    <div>
      <span>3. 팀 선정 방식 고르기</span>
      <div className="flex justify-between px-20 mt-20">
        <button
          className="bg-[#B0BCFF] font-bold text-black px-2 py-1 rounded cursor-pointer"
          onClick={toTake}
        >
          데리고 오기
        </button>
        <button
          className="bg-[#B0BCFF] font-bold text-black px-2 py-1 rounded cursor-pointer"
          onClick={toSend}
        >
          보내 버리기
        </button>
        <button
          className="bg-[#B0BCFF] font-bold text-black px-2 py-1 rounded cursor-pointer"
          onClick={toElo}
        >
          Elo 배정(개발중)
        </button>
      </div>
      <div className="flex justify-center mt-20">
        <button
          className="bg-[#B0BCFF] text-black px-2 py-1 rounded cursor-pointer"
          onClick={onPrev}
        >
          이전
        </button>
      </div>
    </div>
  );
}
