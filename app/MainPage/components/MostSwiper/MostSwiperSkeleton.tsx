export default function MostSwiperSkeleton() {
  return (
    <div className="relative w-full h-[37.5rem] rounded-2xl overflow-hidden">
      {/* 배경 */}
      <div className="absolute inset-0 bg-[url('/images/MainPage/mainpage-2.webp')] opacity-40 z-0 rounded-2xl" />

      {/* 타이틀 자리 */}
      <div className="absolute top-10 left-96 z-20 w-[400px] h-[100px] bg-gray-500 rounded animate-pulse" />

      {/* 슬라이드 카드들 */}
      <div className="relative z-10 w-full h-full py-10 px-5 flex justify-center gap-6 items-end animate-pulse">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div
            key={idx}
            className={`rounded-2xl bg-gray-500 shadow-md border border-gray-400 transition-all duration-300 ${
              idx === 1 ? "w-60 h-80" : "w-48 h-48"
            }`}
          />
        ))}
      </div>

      <div className="absolute top-10 right-96 z-20 w-[400px] h-[100px] bg-gray-500 rounded animate-pulse" />
    </div>
  );
}
