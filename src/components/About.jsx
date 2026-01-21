import gsap from "gsap";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

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
            Welcome to Zentry
          </p>

          <AnimatedTitle
            title="Disc<b>o</b>ver the world's <br /> largest shared <b>a</b>dventure"
            containerClass="mt-5 !text-black text-center"
          />

          <div className="about-subtext">
            <p>The Game of Games begins—your life, now an epic MMORPG</p>
            <p className="text-gray-500">
              Zentry unites every player from countless games and platforms,
              both digital and physical, into a unified Play Economy
            </p>
          </div>
        </div>

        <div className="h-dvh w-screen" ref={containerRef}>
          <div className="mask-clip-path about-image">
            <img
              src="img/about.webp"
              alt="Background"
              className="absolute top-0 left-0 size-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
