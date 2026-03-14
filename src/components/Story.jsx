import { useRef } from "react";
import gsap from "gsap";

import Button from "./Button";
import AnimatedTitle from "./AnimatedTitle";

// 3. 常量宣告 (Constants)
const IMG_SRC = "/img/entrance.webp";
const ANIMATION_DURATION = 0.3;
const ROTATION_SCALE = 10;
const PERSPECTIVE = 500;

/**
 * Story 組件
 * 展示隱藏王國的故事入口
 * 包含 3D 圖片旋轉互動效果
 *
 * @returns {JSX.Element} Story 區塊
 */
const Story = () => {
  // 4. 響應式狀態與引用 (Refs)
  const frameRef = useRef(null);
  // 用於存儲 RAF ID，以便取消掛起的動畫幀
  const rafRef = useRef(null);

  // 7. 核心邏輯與函數 (Functions)
  /**
   * 處理滑鼠移動事件，計算並應用 3D 旋轉效果
   * 使用 requestAnimationFrame 進行渲染優化，替代 Date.now() 節流
   *
   * @param {React.MouseEvent} e - 滑鼠事件對象
   */
  const handleMouseMove = (e) => {
    const element = frameRef.current;
    if (!element) return;

    // 取消上一幀的請求，避免堆疊
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    const { clientX, clientY } = e;

    // 使用 RAF 確保動畫在瀏覽器下一次重繪時執行
    rafRef.current = requestAnimationFrame(() => {
      const rect = element.getBoundingClientRect();

      const xPos = clientX - rect.left;
      const yPos = clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((yPos - centerY) / centerY) * -ROTATION_SCALE;
      const rotateY = ((xPos - centerX) / centerX) * ROTATION_SCALE;

      gsap.to(element, {
        duration: ANIMATION_DURATION,
        rotateX,
        rotateY,
        transformPerspective: PERSPECTIVE,
        ease: "power1.inOut",
        overwrite: "auto", // 確保 GSAP 自動處理衝突
      });
    });
  };

  /**
   * 重置元素的變換狀態 (回到原始位置)
   * 同時取消任何進行中的 RAF
   */
  const handleMouseLeave = () => {
    const element = frameRef.current;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    if (element) {
      gsap.to(element, {
        duration: ANIMATION_DURATION,
        rotateX: 0,
        rotateY: 0,
        ease: "power1.inOut",
        overwrite: "auto",
      });
    }
  };

  return (
    <section id="story" className="min-h-dvh w-screen bg-black text-blue-50">
      <div className="flex size-full flex-col items-center py-10 pb-24">
        <p className="font-general text-sm uppercase md:text-[10px]">
          連動 EdgeRunner 動畫 IP
        </p>

        <div className="relative size-full">
          <AnimatedTitle
            title="尋找<b>邊緣行者</b> <br /> 的隱藏<b>彩蛋</b>"
            containerClass="mt-5 pointer-events-none mix-blend-difference relative z-10"
          />

          <div className="story-img-container">
            <div className="story-img-mask">
              <div className="story-img-content">
                <img
                  ref={frameRef}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  onMouseUp={handleMouseLeave}
                  onMouseEnter={handleMouseLeave}
                  src={IMG_SRC} // 使用常數
                  alt="Entrance to the hidden realm" // 修正 Alt 屬性
                  className="object-contain"
                />
              </div>
            </div>

            {/* SVG Filter Definition */}
            <svg
              className="invisible absolute size-0"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <filter id="flt_tag">
                  <feGaussianBlur
                    in="SourceGraphic"
                    stdDeviation="8"
                    result="blur"
                  />
                  <feColorMatrix
                    in="blur"
                    mode="matrix"
                    values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                    result="flt_tag"
                  />
                  <feComposite
                    in="SourceGraphic"
                    in2="flt_tag"
                    operator="atop"
                  />
                </filter>
              </defs>
            </svg>
          </div>
        </div>

        <div className="-mt-120 flex w-full justify-center md:me-44 md:-mt-64 md:justify-end">
          <div className="flex h-full w-fit flex-col items-center md:items-start">
            <p className="font-circular-web mt-3 max-w-sm text-center text-violet-50 md:text-start">
              當你在夜城中穿梭時，或許會發現傳奇 <b>大衛·馬丁尼茲</b>{" "}
              和他團隊成員的隱藏彩蛋。
            </p>

            <Button
              id="realm-btn"
              title="觀看動畫"
              containerClass="mt-5"
              onClick={() =>
                window.open(
                  "https://www.netflix.com/tw/title/81054853",
                  "_blank",
                )
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story;
