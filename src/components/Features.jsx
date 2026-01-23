import { useRef } from "react";
import { TiLocationArrow } from "react-icons/ti";

const VIDEO_PATHS = {
  FEATURE_1: "videos/feature-1.webm",
  FEATURE_2: "videos/feature-2.webm",
  FEATURE_3: "videos/feature-3.webm",
  FEATURE_4: "videos/feature-4.webm",
  FEATURE_5: "videos/feature-5.webm",
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
export const BentoCard = ({ src, title, description, isComingSoon }) => {
  const hoverButtonRef = useRef(null);
  const hoverEffectRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!hoverButtonRef.current || !hoverEffectRef.current) return;

    const rect = hoverButtonRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    hoverEffectRef.current.style.background = `radial-gradient(100px circle at ${x}px ${y}px, #656fe288, #00000026)`;
  };

  const handleMouseEnter = () => {
    if (hoverEffectRef.current) hoverEffectRef.current.style.opacity = "1";
  };

  const handleMouseLeave = () => {
    if (hoverEffectRef.current) hoverEffectRef.current.style.opacity = "0";
  };

  return (
    <div className="relative size-full">
      <video
        src={src}
        loop
        muted
        autoPlay
        playsInline
        className="absolute top-0 left-0 size-full object-cover object-center"
      />
      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
        <div>
          <h1 className="bento-title special-font">{title}</h1>
          {description && (
            <p className="mt-3 max-w-64 text-xs md:text-base">{description}</p>
          )}
        </div>

        {isComingSoon && (
          <div
            ref={hoverButtonRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="border-hsla relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-black px-5 py-2 text-xs text-white/20 uppercase"
          >
            <div
              ref={hoverEffectRef}
              className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
              style={{
                background:
                  "radial-gradient(100px circle at 0px 0px, #656fe288, #00000026)",
              }}
            />
            <TiLocationArrow className="relative z-20" />
            <p className="relative z-20">coming soon</p>
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * Features 組件
 * 展示產品特性的格狀佈局
 */
const Features = () => (
  <section className="bg-black pb-52">
    <div className="container mx-auto px-3 md:px-10">
      <div className="px-5 py-32">
        <p className="font-circular-web text-lg text-blue-50">
          Into the Metagame Layer
        </p>
        <p className="font-circular-web max-w-md text-lg text-blue-50 opacity-50">
          Immerse yourself in a rich and ever-expanding universe where a vibrant
          array of products converge into an interconnected overlay experience
          on your world.
        </p>
      </div>

      <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
        <BentoCard
          src={VIDEO_PATHS.FEATURE_1} // 使用常數
          title={
            <>
              radia<b>n</b>t
            </>
          }
          description="A cross-platform metagame app, turning your activities across Web2 and Web3 games into a rewarding adventure."
          isComingSoon
        />
      </BentoTilt>

      <div className="grid h-[135vh] w-full grid-cols-2 grid-rows-3 gap-7">
        <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1! md:row-span-2!">
          <BentoCard
            src={VIDEO_PATHS.FEATURE_2}
            title={
              <>
                zig<b>m</b>a
              </>
            }
            description="An anime and gaming-inspired NFT collection - the IP primed for expansion."
            isComingSoon
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 row-span-1 ms-32 md:col-span-1! md:ms-0">
          <BentoCard
            src={VIDEO_PATHS.FEATURE_3}
            title={
              <>
                n<b>e</b>xus
              </>
            }
            description="A gamified social hub, adding a new dimension of play to social interaction for Web3 communities."
            isComingSoon
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 me-14 md:col-span-1! md:me-0">
          <BentoCard
            src={VIDEO_PATHS.FEATURE_4}
            title={
              <>
                az<b>u</b>l
              </>
            }
            description="A cross-world AI Agent - elevating your gameplay to be more fun and productive."
            isComingSoon
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_2">
          <div className="flex size-full flex-col justify-between bg-violet-300 p-5">
            <h1 className="bento-title special-font max-w-64 text-black">
              M<b>o</b>re co<b>m</b>ing s<b>o</b>on.
            </h1>

            <TiLocationArrow className="m-5 scale-[5] self-end" />
          </div>
        </BentoTilt>

        <BentoTilt className="bento-tilt_2">
          <video
            src={VIDEO_PATHS.FEATURE_5}
            loop
            muted
            autoPlay
            className="size-full object-cover object-center"
          />
        </BentoTilt>
      </div>
    </div>
  </section>
);

export default Features;
