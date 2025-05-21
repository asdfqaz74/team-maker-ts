import Lottie from "react-lottie";
import animationData from "../json/team-maker.json";

export default function LoadingSpinner({ text }: { text: string }) {
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
        height={400}
        width={400}
        isClickToPauseDisabled
        speed={1.5}
      />
      <span>{text}</span>
    </div>
  );
}
