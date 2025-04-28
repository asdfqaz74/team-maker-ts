import { SwiperChampion } from "@/types/champion";
import Image from "next/image";
import { RefObject, memo } from "react";
import { EffectFade, Navigation } from "swiper/modules";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";

interface Props {
  champions: SwiperChampion[];
  activeIndex: number;
  handlePrevClick: () => void;
  handleNextClick: () => void;
  contentSwiperRef: RefObject<SwiperClass | null>;
  bgSwiperRef: RefObject<SwiperClass | null>;
}

function DesktopSwiperView({
  champions,
  activeIndex,
  handlePrevClick,
  handleNextClick,
  contentSwiperRef,
  bgSwiperRef,
}: Props) {
  const paddedChampions = [null, ...champions, null, null];

  return (
    <div className="relative md:w-[43.75rem] xl:w-[62.5rem] w-[75rem] h-[37.5rem]">
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
              <div className="absolute w-[12.5rem] xl:top-10 xl:right-40 bottom-40 right-20 flex flex-col items-start gap-4">
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
                ? "xl:w-[12.5rem] xl:h-[25rem] w-[6.25rem] h-[12.5rem] -left-5 xl:-left-7 md:-left-5"
                : "xl:w-[9.375rem] xl:h-[12.5rem] w-[4.6875rem] h-[6.25rem]";
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
        className="swiper-custom-prev absolute top-1/2 -left-20 z-20 -translate-y-1/2 cursor-pointer xl:block hidden"
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
        className="swiper-custom-next absolute top-1/2 -right-20 z-20 -translate-y-1/2 rotate-180 cursor-pointer xl:block hidden"
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
  );
}

export default memo(DesktopSwiperView);
