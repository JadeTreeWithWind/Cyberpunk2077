import { useRef } from "react";

const VIDEO_PATHS = {
  FEATURE_1: "videos/feature-1.mp4",
  FEATURE_2: "videos/feature-2.mp4",
  FEATURE_3: "videos/feature-3.mp4",
  FEATURE_4: "videos/feature-4.mp4",
  FEATURE_5: "videos/feature-5.mp4",
};

/**
 * BentoTilt 組件
 * 實現滑鼠懸停時的 3D 傾斜效果
 *
 * 優化：
 * 1. 使用 requestAnimationFrame 進行事件節流
 * 2. 動態控制 transition 以確保移動時無延遲，移出時平滑
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - 內部內容
 * @param {String} props.className - 樣式類名
 */
export const BentoTilt = ({ children, className = "" }) => {
  const itemRef = useRef(null);
  const frameRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!itemRef.current) return;

    if (frameRef.current) cancelAnimationFrame(frameRef.current);

    frameRef.current = requestAnimationFrame(() => {
      const { left, top, width, height } =
        itemRef.current.getBoundingClientRect();

      const relativeX = (event.clientX - left) / width;
      const relativeY = (event.clientY - top) / height;

      const tiltX = (relativeY - 0.5) * 5; // 傾斜角度係數
      const tiltY = (relativeX - 0.5) * -5;

      const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(0.95, 0.95, 0.95)`;

      // Direct DOM Update
      itemRef.current.style.transform = newTransform;
    });
  };

  const handleMouseLeave = () => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    if (!itemRef.current) return;

    // 恢復原狀
    itemRef.current.style.transform = "";
  };

  return (
    <div
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      // 優化：只在非 Hover 狀態 (transform 為空) 時啟用 transition，避免移動時的延遲感
      style={{
        transition: "transform 0.1s ease-out",
      }}
    >
      {children}
    </div>
  );
};

/**
 * BentoCard 組件
 *
 * @param {Object} props
 * @param {String} props.src - 背景影片路徑
 * @param {String|React.ReactNode} props.title - 卡片標題
 * @param {String} props.description - 卡片描述
 * @param {Boolean} props.isComingSoon - 是否顯示 Coming Soon 按鈕
 */
export const BentoCard = ({ src, title, description }) => {
  return (
    <div className="relative size-full">
      <video
        src={src}
        loop
        muted
        autoPlay
        playsInline
        preload="none"
        className="absolute top-0 left-0 size-full object-cover object-center"
      />
      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
        <div>
          <h1 className="bento-title special-font">{title}</h1>
          {description && (
            <p className="mt-3 max-w-64 text-xs md:text-base">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * Features 組件
 * 展示產品特性的格狀佈局
 *
 * @returns {JSX.Element} Features 區塊
 */
const Features = () => (
  <section id="features" className="bg-black pb-52">
    <div className="container mx-auto max-w-350 px-3 md:px-10">
      <div className="px-5 py-32">
        <p className="font-circular-web text-lg text-blue-50 md:text-xl">
          傳奇就此展開
        </p>
        <p className="font-circular-web text-md mt-1 max-w-md text-blue-50 opacity-50 md:text-lg">
          化身改造傭兵V，在紙醉金迷的夜城用生命闖出名聲。
          夜城出傳奇，你又將寫下怎樣的傳奇？
        </p>
      </div>

      <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
        <BentoCard
          src={VIDEO_PATHS.FEATURE_1} // 使用常數
          title={<>打造專屬角色</>}
          description="活用強大專精，加上神經機械植入物，打造專屬你的傭兵V。"
          isComingSoon
        />
      </BentoTilt>

      <div className="grid h-[1100px] w-full grid-cols-2 grid-rows-3 gap-7 md:grid-rows-2">
        <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1! md:row-span-2!">
          <BentoCard
            src={VIDEO_PATHS.FEATURE_2}
            title={<>踏入黑暗未來</>}
            description="化身強化改造傭兵V，為榮耀和生存奮力一戰。"
            isComingSoon
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 row-span-1 ms-32 md:col-span-1! md:ms-0">
          <BentoCard
            src={VIDEO_PATHS.FEATURE_3}
            title={<>締造傳奇</>}
            description="與強尼銀手一起在夜城冒險，一探他一言難盡的夢想、傷痛和往事。"
            isComingSoon
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 me-14 md:col-span-1! md:me-0">
          <BentoCard
            src={VIDEO_PATHS.FEATURE_4}
            title={<>升級強化內容</>}
            description="體驗追加任務、載具、義體改造與更多內容。"
            isComingSoon
          />
        </BentoTilt>

      </div>
      <BentoTilt className="border-hsla relative mt-7 h-90 w-full overflow-hidden rounded-md md:h-[50vh]">
        <BentoCard
          src={VIDEO_PATHS.FEATURE_5}
          title={<>更多內容即將推出</>}
          description="更多內容即將推出，敬請期待。"
          isComingSoon
        />
      </BentoTilt>
    </div>
  </section>
);

export default Features;
