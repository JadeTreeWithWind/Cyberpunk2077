import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const ABOUT_IMG_SRC = "img/about.webp";

const About = () => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const clipAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "center center",
          end: "+=800 center",
          scrub: 0.5,
          pin: true,
          pinSpacing: true,
        },
      });

      clipAnimation.to(".mask-clip-path", {
        width: "100vw",
        height: "100vh",
        borderRadius: 0,
      });
    },
    { scope: containerRef },
  );

  return (
    <section id="about">
      <div className="min-h-screen w-screen">
        <div className="relative mt-36 mb-8 flex flex-col items-center gap-5">
          <p className="font-general text-sm uppercase md:text-lg">
            歡迎來到 夜之城
          </p>

          <AnimatedTitle
            title="探<b>索</b>這座 <br /> 築夢<b>之</b>城"
            containerClass="mt-5 !text-black text-center"
          />

          <div className="about-subtext">
            <p>探索大都會夜城</p>
            <p className="text-gray-500">
              邂逅各式各樣千奇百怪的人們
              <br />
              完成一件件令人難忘的委託
              <br />
              成為夜城傳奇
            </p>
          </div>
        </div>

        <div className="h-dvh w-screen" ref={containerRef}>
          <div className="mask-clip-path about-image">
            <img
              src={ABOUT_IMG_SRC}
              alt=""
              loading="lazy"
              className="absolute top-0 left-0 size-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
