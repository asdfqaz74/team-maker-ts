export default function EloPlayer({ onPrev }: { onPrev: () => void }) {
  return (
    <div className="flex flex-col gap-20">
      <span>Elo 배정</span>
      <span>개발중입니다</span>
      <button
        className="bg-[#B0BCFF] font-bold text-black px-2 py-1 rounded cursor-pointer"
        onClick={onPrev}
      >
        이전
      </button>
    </div>
  );
}
