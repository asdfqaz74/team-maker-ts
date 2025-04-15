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
    <div className="relative w-full h-[37.5rem] rounded-2xl overflow-hidden">
      {/* 배경 이미지 */}
      <div
        className="absolute inset-0 bg-black z-0 transition-all duration-300"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.5,
        }}
      />

      {/* Swiper 콘텐츠 */}
      <div className="relative w-full h-full z-10 py-10 px-5">
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          spaceBetween={30}
          slidesPerView={4}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          className="w-full h-full"
        >
          {champions.map((champion, idx) => {
            const isSecondSlide = idx === (activeIndex + 1) % champions.length;

            return (
              <SwiperSlide key={idx} className="flex justify-center items-end">
                <div
                  className={`relative rounded-2xl shadow-lg overflow-visible transition-all duration-300 border border-amber-50 ${
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
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}
