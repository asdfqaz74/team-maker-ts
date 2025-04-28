import { SwiperChampion } from "@/types/champion";
import Image from "next/image";
import { memo, RefObject } from "react";
import { EffectFade, Navigation } from "swiper/modules";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";

interface Props {
  champions: SwiperChampion[];
  contentSwiperRef: RefObject<SwiperClass | null>;
  bgSwiperRef: RefObject<SwiperClass | null>;
}

function MobileSwiperView({ champions, contentSwiperRef, bgSwiperRef }: Props) {
  return (
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
  );
}

export default memo(MobileSwiperView);
