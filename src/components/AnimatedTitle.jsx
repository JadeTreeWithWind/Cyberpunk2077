import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import clsx from "clsx";

gsap.registerPlugin(ScrollTrigger);

/**
 * AnimatedTitle 組件
 * 負責渲染帶有滾動觸發動畫的標題
 *
 * @param {string} title - 標題內容，支援 <br /> 換行
 * @param {string} containerClass - 容器的額外樣式類別
 */

const AnimatedTitle = ({ title, containerClass }) => {
  // 1. 響應式狀態與變數 (Refs)
  const containerRef = useRef(null);

  // 2. 偵聽器與動畫邏輯 (useGSAP)
  useGSAP(
    () => {
      const titleAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "100 bottom",
          end: "center bottom",
          toggleActions: "play none none reverse",
        },
      });

      titleAnimation.to(
        ".animated-word",
        {
          opacity: 1,
          transform: "translate3d(0, 0, 0) rotateY(0deg) rotateX(0deg)",
          ease: "power2.inOut",
          stagger: 0.02,
        },
        0,
      );
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className={clsx("animated-title special-font", containerClass)}
    >
      {title.split("<br />").map((line, lineIdx) => (
        <div
          key={`line-${lineIdx}`}
          className="flex-center max-w-full flex-wrap gap-2 px-10 md:gap-3"
        >
          {line.split(" ").map((word, wordIdx) => (
            <span
              key={`word-${lineIdx}-${wordIdx}`}
              className="animated-word"
              // 安全性註記: 確保 title 來源可信，防止 XSS
              dangerouslySetInnerHTML={{ __html: word }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default AnimatedTitle;
