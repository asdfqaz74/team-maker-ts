export default function SendPlayer({ onPrev }: { onPrev: () => void }) {
  return (
    <div>
      <span>보내 버리기</span>
      <div>
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
