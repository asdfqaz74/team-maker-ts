export default function StepOne() {
  return (
    <div>
      <span>1. 팀 선정 방식 고르기</span>
      <div className="flex justify-between px-20 mt-20">
        <button className="bg-[#B0BCFF] font-bold text-black px-2 py-1 rounded cursor-pointer">
          데리고 오기
        </button>
        <button className="bg-[#B0BCFF] font-bold text-black px-2 py-1 rounded cursor-pointer">
          보내 버리기
        </button>
        <button className="bg-[#B0BCFF] font-bold text-black px-2 py-1 rounded cursor-pointer">
          Elo 배정(개발중)
        </button>
      </div>
    </div>
  );
}
