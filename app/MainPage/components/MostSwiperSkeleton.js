export default function MostSwiperSkeleton() {
  return (
    <div className="relative w-full h-[37.5rem] rounded-2xl overflow-hidden animate-pulse">
      {/* 배경 */}
      <div className="absolute inset-0 bg-gray-800 opacity-40 z-0 rounded-2xl" />

      {/* 타이틀 자리 */}
      <div className="absolute top-5 left-10 z-20 w-[400px] h-[100px] bg-gray-300 rounded" />

      {/* 슬라이드 카드들 */}
      <div className="relative z-10 w-full h-full py-10 px-5 flex justify-center gap-6 items-end">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div
            key={idx}
            className={`rounded-2xl bg-gray-300 shadow-md border border-gray-400 transition-all duration-300 ${
              idx === 1 ? "w-60 h-80" : "w-48 h-48"
            }`}
          />
        ))}
      </div>

      {/* 오른쪽 정보 스켈레톤 */}
      <div className="absolute top-1/2 right-10 -translate-y-1/2 z-20 flex flex-col gap-4">
        <div className="w-[200px] h-[32px] bg-gray-300 rounded" />
        <div className="w-[180px] h-[24px] bg-gray-300 rounded" />
        <div className="w-[120px] h-[20px] bg-gray-300 rounded" />
      </div>

      {/* 좌우 버튼 자리 */}
      <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-[60px] h-[60px] bg-gray-400 rounded-full z-30" />
      <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-[60px] h-[60px] bg-gray-400 rounded-full z-30" />
    </div>
  );
}
