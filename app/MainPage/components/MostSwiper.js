"use client";

import { useState } from "react";
import { Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";

export default function MostSwiper({ champions }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const secondIndex = (activeIndex + 1) % champions.length;
  const background = champions?.[secondIndex]?.logo || "";

  return (
    <div className="relative w-full h-[37.5rem] rounded-2xl">
      {/* 배경 이미지 */}
      <div
        className="absolute inset-0 bg-black z-0 transition-all duration-300 rounded-xl"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.5,
        }}
      />

      {/* 타이틀 */}
      <Image
        src="/images/MainPage/MostLogo.png"
        alt="모스트 챔피언 5"
        width={400}
        height={100}
        className="absolute top-5 left-10 z-20"
      />

      {/* Swiper 콘텐츠 */}

      <div className="relative w-full h-full z-10 py-10 px-5">
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation={{
            nextEl: ".swiper-custom-next",
            prevEl: ".swiper-custom-prev",
          }}
          spaceBetween={30}
          slidesPerView={4}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          speed={1000}
          className="w-full h-full"
        >
          {champions.map((champion, idx) => {
            const isSecondSlide = idx === (activeIndex + 1) % champions.length;

            return (
              <SwiperSlide key={idx} className="flex justify-center items-end">
                <div
                  className={`relative rounded-2xl shadow-lg overflow-visible transition-all duration-300 border border-amber-50 translate-x-15 ${
                    isSecondSlide
                      ? "w-60 h-90 translate-y-40"
                      : "w-50 aspect-square translate-y-80"
                  }`}
                >
                  <div
                    className={`absolute w-full h-full rounded-2xl overflow-hidden
                      }`}
                  >
                    <Image
                      src={champion.image}
                      alt={champion.name}
                      fill
                      className={`object-cover rounded-2xl ${
                        isSecondSlide ? "object-center" : "object-[center_20%]"
                      }`}
                    />
                  </div>
                </div>
                {isSecondSlide && (
                  <div className="absolute top-0 -right-[31.25rem]">
                    <div className="flex flex-col gap-4">
                      <p className="text-4xl font-bold">{champion.name}</p>
                      <div className="flex gap-4 items-end">
                        <p className="text-xl font-semibold">총 게임 수</p>
                        <p>{champion.count} 게임</p>
                      </div>
                    </div>
                  </div>
                )}
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      {/* 커스텀 버튼 */}
      <div className="swiper-custom-prev absolute -left-20 top-1/2 -translate-y-1/2 z-30 w-[60px] h-[60px] cursor-pointer">
        <Image
          src="/images/MainPage/Left circle.png"
          alt="이전 슬라이드"
          fill
          className="object-contain"
        />
      </div>

      <div className="swiper-custom-next absolute -right-20 top-1/2 -translate-y-1/2 z-30 w-[50px] h-[50px] cursor-pointer rotate-180">
        <Image
          src="/images/MainPage/Left circle.png"
          alt="다음 슬라이드"
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
}
