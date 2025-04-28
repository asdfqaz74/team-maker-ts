"use client";

import Image from "next/image";
import { Swiper, SwiperSlide, SwiperClass } from "swiper/react";
import { EffectFade, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import useBreakpoint from "@/utils/useBreakpion";
import { SwiperChampion } from "@/types/champion";

export default function MostSwiper({
  champions,
}: {
  champions: SwiperChampion[];
}) {
  // 인덱스 상태
  const [activeIndex, setActiveIndex] = useState(0);

  // Swiper 인스턴스 참조
  const contentSwiperRef = useRef<SwiperClass | null>(null);
  const bgSwiperRef = useRef<SwiperClass | null>(null);

  // activeIndex가 변경될 때마다 배경 슬라이더를 업데이트
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % champions.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [champions.length]);

  // activeIndex가 변경될 때마다 배경 슬라이더와 콘텐츠 슬라이더를 동기화
  useEffect(() => {
    bgSwiperRef.current?.slideTo(activeIndex);
    contentSwiperRef.current?.slideTo(activeIndex);
  }, [activeIndex]);

  // 이전 및 다음 버튼 클릭 핸들러
  const handlePrevClick = useCallback(() => {
    const prev = activeIndex === 0 ? champions.length - 1 : activeIndex - 1;
    setActiveIndex(prev);
  }, [activeIndex, champions.length]);

  const handleNextClick = useCallback(() => {
    const next = (activeIndex + 1) % champions.length;
    setActiveIndex(next);
  }, [activeIndex, champions.length]);

  // champions 배열을 5개로 맞추기 위해 null을 추가
  const paddedChampions = [null, ...champions, null, null];

  // 반응형 처리
  const { ismd } = useBreakpoint();

  return (
    <>
      {/* 데스크탑 버전 */}
      {ismd && (
        <div className="relative w-[75rem] h-[37.5rem]">
          <Image
            src="/images/MainPage/MostLogo.webp"
            alt="MostLogo"
            width={400}
            height={100}
            className="absolute top-0 left-0 z-10"
            loading="lazy"
          />

          {/* 챔피언 배경화면 */}
          <Swiper
            modules={[EffectFade]}
            slidesPerView={1}
            allowTouchMove={false}
            effect="fade"
            onSwiper={(swiper) => (bgSwiperRef.current = swiper)}
          >
            {champions.map((champion) => (
              <SwiperSlide key={`bg-${champion.en_name}`}>
                <div className="relative w-full h-[37.5rem]">
                  <Image
                    src={champion.logo}
                    alt={champion.name}
                    fill
                    className="object-cover w-full h-full"
                    loading="lazy"
                  />
                  <div className="w-full h-full bg-black opacity-50"></div>
                  {/* 챔피언 정보 */}
                  <div className="absolute w-[12.5rem] top-10 right-40 flex flex-col items-start gap-4">
                    <span className="text-4xl whitespace-nowrap">
                      {champion.name}
                    </span>
                    <div className="flex gap-4">
                      <span>게임 수</span>
                      <span>{champion.count} 회</span>
                    </div>
                    <div className="flex gap-4">
                      <span>승률</span>
                      <span>{champion.winRate}%</span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* 챔피언 카드 */}
          <div className="absolute left-24 inset-0 flex items-end z-10">
            <div className="relative w-full h-full px-5">
              <Swiper
                modules={[Navigation]}
                navigation={{
                  nextEl: ".swiper-custom-next",
                  prevEl: ".swiper-custom-prev",
                }}
                slidesPerView={4}
                allowTouchMove={false}
                onSwiper={(swiper) => (contentSwiperRef.current = swiper)}
                className="w-full h-full flex justify-center"
              >
                {paddedChampions.map((champion, idx) => {
                  const isActive = idx === activeIndex + 1;
                  const sizeClass = isActive
                    ? "w-[12.5rem] h-[25rem] -left-5"
                    : "w-[9.375rem] h-[12.5rem]";
                  return (
                    <SwiperSlide
                      key={`card-${champion?.en_name || "blank-" + idx}`}
                      className="relative flex gap-10"
                    >
                      <div className={`absolute bottom-0 ${sizeClass}`}>
                        {champion && (
                          <Image
                            src={champion.image}
                            alt={champion.name}
                            fill
                            className="object-cover object-center rounded-2xl"
                            loading="lazy"
                          />
                        )}
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div>

          {/* 커스텀 버튼 */}
          <button
            className="swiper-custom-prev absolute top-1/2 -left-20 z-20 -translate-y-1/2 cursor-pointer"
            onClick={handlePrevClick}
          >
            <Image
              src="/images/MainPage/Left Circle.webp"
              alt="ArrowLeft"
              width={50}
              height={50}
              loading="lazy"
            />
          </button>

          <button
            className="swiper-custom-next absolute top-1/2 -right-20 z-20 -translate-y-1/2 rotate-180 cursor-pointer"
            onClick={handleNextClick}
          >
            <Image
              src="/images/MainPage/Left Circle.webp"
              alt="ArrowRight"
              width={50}
              height={50}
              loading="lazy"
            />
          </button>
        </div>
      )}

      {/* 모바일 버전 */}
      {!ismd && (
        <div className="relative w-full max-w-[25rem] h-[37.5rem]">
          <Image
            src="/images/MainPage/MostLogo.webp"
            alt="MostLogo"
            width={300}
            height={100}
            className="absolute -top-10 left-1/2 -translate-x-1/2 z-10"
            loading="lazy"
          />

          {/* 챔피언 배경화면 */}
          <Swiper
            modules={[EffectFade]}
            slidesPerView={1}
            allowTouchMove={false}
            effect="fade"
            onSwiper={(swiper) => (bgSwiperRef.current = swiper)}
          >
            {champions.map((champion) => (
              <SwiperSlide key={`bg-${champion.en_name}`}>
                <div className="relative w-full h-[37.5rem]">
                  <Image
                    src={champion.logo}
                    alt={champion.name}
                    fill
                    className="object-cover w-full h-full"
                    loading="lazy"
                  />
                  <div className="w-full h-full bg-black opacity-50"></div>
                  {/* 챔피언 정보 */}
                  <div className="absolute top-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
                    <span className="text-4xl">{champion.name}</span>
                    <div className="flex gap-4">
                      <span>게임 수</span>
                      <span>{champion.count} 회</span>
                    </div>
                    <div className="flex gap-4">
                      <span>승률</span>
                      <span>{champion.winRate}%</span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* 챔피언 카드 */}
          <div className="absolute inset-0 flex items-end z-10">
            <div className="relative w-full h-full px-5">
              <Swiper
                modules={[Navigation]}
                slidesPerView={1}
                allowTouchMove={false}
                onSwiper={(swiper) => (contentSwiperRef.current = swiper)}
                className="w-full h-full flex justify-center"
              >
                {champions.map((champion, idx) => (
                  <SwiperSlide
                    key={`card-${champion?.en_name || "blank-" + idx}`}
                    className="relative flex gap-10 "
                  >
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[12.5rem] h-[25rem]">
                      {champion && (
                        <Image
                          src={champion.image}
                          alt={champion.name}
                          fill
                          className="object-cover object-center rounded-2xl"
                          loading="lazy"
                        />
                      )}
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
