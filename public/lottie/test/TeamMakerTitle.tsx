import gsap from "gsap";
import CustomBounce from "gsap/CustomBounce";
import SplitText from "gsap/SplitText";
import CustomEase from "gsap/CustomEase";
import { useEffect, useRef } from "react";

gsap.registerPlugin(CustomBounce, SplitText, CustomEase);

export default function TeamMakerTitle() {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    CustomBounce.create("myBounce", {
      strength: 0.6,
      squash: 1.5,
      squashID: "myBounce-squash",
    });

    const split = new SplitText(textRef.current, { type: "chars" });
    const chars = split.chars as HTMLSpanElement[];

    chars.forEach((char) => {
      char.style.display = "inline-block";
      char.style.opacity = "0";
    });

    const tl = gsap.timeline({
      repeat: -1,
      repeatDelay: 0.5,
      defaults: {
        duration: 1.5,
        stagger: { amount: 0.1, ease: "sine.in" },
      },
    });

    tl.from(
      chars,
      {
        duration: 0.6,
        opacity: 0,
        ease: "power2.inOut",
      },
      0
    )
      .from(
        chars,
        {
          y: -350,
          ease: "myBounce",
        },
        0
      )
      .to(
        chars,
        {
          scaleX: 1.8,
          scaleY: 0.7,
          rotate: () => 15 - 30 * Math.random(),
          ease: "myBounce-squash",
          transformOrigin: "50% 100%",
        },
        0
      );

    return () => {
      split.revert();
      tl.kill();
    };
  }, []);

  return (
    <div className="text-white text-6xl font-black text-center select-none">
      <div ref={textRef}>선수들을 세팅중입니다...</div>
    </div>
  );
}
