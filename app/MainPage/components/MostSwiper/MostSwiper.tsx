"use client";

import { SwiperClass } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { SwiperChampion } from "@/types/champion";
import DesktopSwiperView from "./DesktopSwiperView";
import MobileSwiperView from "./MobileSwiperView";
import { useBreakpoint } from "@/hooks/useBreakpion";

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

  // 반응형 처리
  const { ismd } = useBreakpoint();

  return (
    <>
      {ismd ? (
        <DesktopSwiperView
          champions={champions}
          activeIndex={activeIndex}
          handlePrevClick={handlePrevClick}
          handleNextClick={handleNextClick}
          contentSwiperRef={contentSwiperRef}
          bgSwiperRef={bgSwiperRef}
        />
      ) : (
        <MobileSwiperView
          champions={champions}
          contentSwiperRef={contentSwiperRef}
          bgSwiperRef={bgSwiperRef}
        />
      )}
    </>
  );
}
