"use client";

import { useState } from "react";
import { Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";

export default function MostSwiper({ champions }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
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
          <SwiperSlide key={idx}>
            <div
              className={`relative rounded-2xl drop-shadow-sm drop-shadow-amber-50 shadow-amber-50 overflow-visible transition-all border border-amber-50 ${
                isSecondSlide ? "w-50 h-80" : "w-40 aspect-square opacity-60"
              }`}
            >
              <div className="w-full h-full rounded-2xl overflow-hidden">
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
  );
}
