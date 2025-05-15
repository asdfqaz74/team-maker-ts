import Lottie from "react-lottie";
import animationData from "../json/team-maker.json";

export default function TeamMakerLoading() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    renderSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <>
      <Lottie
        options={defaultOptions}
        height={400}
        width={400}
        isClickToPauseDisabled
        speed={1.5}
      />
      <span>선수들을 불러오는 중입니다.</span>
    </>
  );
}
