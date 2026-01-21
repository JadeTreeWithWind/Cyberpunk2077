import { useRef, useState } from "react"; // React 核心優先
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { TiLocationArrow } from "react-icons/ti";

import Button from "./Button"; // 內部組件
import VideoPreview from "./VideoPreview";

gsap.registerPlugin(ScrollTrigger);

const TOTAL_VIDEOS = 4;
const VIDEO_DIR = "videos/hero";

const Hero = () => {
  // 1. 響應式狀態 (State)
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [loadedVideos, setLoadedVideos] = useState(0);

  // 2. 計算屬性 (Computed Properties)
  const isLoading = loadedVideos < TOTAL_VIDEOS - 1;

  // 3. 引用 (Refs)
  const nextVideoRef = useRef(null);
  const currentVideoRef = useRef(null);
  const videoFrameRef = useRef(null);

  // 4. 偵聽器 (Watchers / Effects)
  useGSAP(
    () => {
      if (hasClicked) {
        gsap.set(nextVideoRef.current, { visibility: "visible" });
        gsap.to(nextVideoRef.current, {
          transformOrigin: "center center",
          scale: 1,
          width: "100%",
          height: "100%",
          duration: 1,
          ease: "power1.inOut",
          onStart: () => nextVideoRef.current.play(),
        });
        gsap.from(currentVideoRef.current, {
          transformOrigin: "center center",
          scale: 0,
          duration: 1.5,
          ease: "power1.inOut",
        });
      }
    },
    {
      dependencies: [currentIndex],
      revertOnUpdate: true,
    },
  );

  useGSAP(() => {
    gsap.set(videoFrameRef.current, {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
      borderRadius: "0% 0% 40% 10%",
    });
    gsap.from(videoFrameRef.current, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: videoFrameRef.current,
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  // 5. 核心邏輯與函數 (Functions)
  const handleVideoLoad = () => {
    setLoadedVideos((prev) => prev + 1);
  };

  /**
   * 處理縮圖點擊事件
   * 更新點擊狀態並循環切換至下一個影片索引
   */
  const handleMiniVideoClick = () => {
    setHasClicked(true);
    setCurrentIndex((prevIndex) => (prevIndex % TOTAL_VIDEOS) + 1);
  };

  // 輔助函數：避免直接在 JSX 拼接字串
  const getVideoSrc = (index) => `${VIDEO_DIR}-${index}.webm`;

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      {isLoading && (
        <div className="flex-center absolute z-100 h-dvh w-screen overflow-hidden bg-violet-50">
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      )}

      <div
        ref={videoFrameRef}
        className="bg-blue-75 relative z-10 h-dvh w-screen overflow-hidden rounded-lg"
      >
        <div>
          <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            <VideoPreview>
              <div
                onClick={handleMiniVideoClick}
                className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
              >
                <video
                  ref={currentVideoRef}
                  src={getVideoSrc((currentIndex % TOTAL_VIDEOS) + 1)}
                  loop
                  muted
                  className="size-64 origin-center scale-150 object-cover object-center"
                  onLoadedData={handleVideoLoad}
                />
              </div>
            </VideoPreview>
          </div>

          <video
            ref={nextVideoRef}
            src={getVideoSrc(currentIndex)}
            loop
            muted
            className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
            onLoadedData={handleVideoLoad}
          />
          <video
            src={getVideoSrc(currentIndex)}
            autoPlay
            loop
            muted
            className="absolute top-0 left-0 size-full object-cover object-center"
            onLoadedData={handleVideoLoad}
          />
        </div>

        <h1 className="special-font hero-heading text-blue-75 absolute right-5 bottom-5 z-40">
          G<b>A</b>MING
        </h1>

        <div className="absolute top-0 left-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-blue-100">
              redefi<b>n</b>e
            </h1>

            <p className="font-robert-regular mb-5 max-w-64 text-blue-100">
              Enter the Metagame Layer <br /> Unleash the Play Economy
            </p>

            <Button
              id="watch-trailer"
              title="觀看預告"
              leftIcon={<TiLocationArrow />}
              containerClass="bg-yellow-300 flex-center gap-1"
            />
          </div>
        </div>
      </div>

      <h1 className="special-font hero-heading absolute right-5 bottom-5 text-black">
        G<b>A</b>MING
      </h1>
    </div>
  );
};

export default Hero;
