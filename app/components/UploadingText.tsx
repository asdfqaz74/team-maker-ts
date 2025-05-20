import { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";

type UploadingTextProps = {
  text?: string;
  className?: string;
  trigger?: boolean;
};

export default function UploadingText({
  text = "업로드 중...",
  className = "",
  trigger = true,
}: UploadingTextProps) {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!trigger || !textRef.current) return;

    let split: SplitText;
    let tl: gsap.core.Timeline;

    document.fonts.ready.then(() => {
      split = new SplitText(textRef.current!, { type: "chars" });
      gsap.set(textRef.current, { opacity: 1 });

      tl = gsap.timeline({ repeat: 30 });
      tl.from(split.chars, {
        duration: 1,
        y: 30,
        rotation: 90,
        opacity: 0,
        ease: "elastic",
        stagger: 0.03,
      });
    });

    return () => {
      if (tl) tl.kill();
      if (split) split.revert();
    };
  }, [trigger]);

  return (
    <div ref={textRef} className={`opacity-0 text-center ${className}`}>
      {text}
    </div>
  );
}
