import Lottie from "react-lottie";
import animationData from "../json/mobile.json";

export default function TeamMakerLoading({ text }: { text?: string }) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    renderSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Lottie
        options={defaultOptions}
        height={300}
        width={300}
        isClickToPauseDisabled
        speed={1.5}
      />
      <span>{text}</span>
    </div>
  );
}
