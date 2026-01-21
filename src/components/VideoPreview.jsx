import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

/**
 * 影片預覽組件
 * 處理滑鼠懸停時的 3D 傾斜效果
 */
export const VideoPreview = ({ children }) => {
  // 1. 響應式狀態 (State)
  const [isHovering, setIsHovering] = useState(false);

  // 2. 引用 (Refs)
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  // 用於節流的時間戳記 ref
  const lastMouseMoveTime = useRef(0);

  // 3. 核心邏輯與函數 (Functions)
  /**
   * 處理滑鼠移動事件
   * 包含節流邏輯以優化效能
   */
  const handleMouseMove = ({ clientX, clientY, currentTarget }) => {
    const now = Date.now();
    // 簡單節流：每 16ms (約 60fps) 僅執行一次
    if (now - lastMouseMoveTime.current < 16) return;
    lastMouseMoveTime.current = now;

    const rect = currentTarget.getBoundingClientRect();
    const xOffset = clientX - (rect.left + rect.width / 2);
    const yOffset = clientY - (rect.top + rect.height / 2);

    if (isHovering) {
      // 使用 gsap.contextSafe 或直接調用 (此處直接調用，因為在 React 事件中)
      gsap.to(sectionRef.current, {
        x: xOffset,
        y: yOffset,
        rotationY: xOffset / 2,
        rotationX: -yOffset / 2,
        transformPerspective: 500,
        duration: 1,
        ease: "power1.out",
        overwrite: "auto", // 確保動畫流暢，自動覆蓋舊動畫
      });

      gsap.to(contentRef.current, {
        x: -xOffset,
        y: -yOffset,
        duration: 1,
        ease: "power1.out",
        overwrite: "auto",
      });
    }
  };

  // 4. 偵聽器 (Watchers) - 處理懸停狀態重置
  useGSAP(
    () => {
      if (!isHovering) {
        gsap.to(sectionRef.current, {
          x: 0,
          y: 0,
          rotationY: 0,
          rotationX: 0,
          duration: 1,
          ease: "power1.out",
        });

        gsap.to(contentRef.current, {
          x: 0,
          y: 0,
          duration: 1,
          ease: "power1.out",
        });
      }
    },
    {
      dependencies: [isHovering],
      scope: sectionRef,
    },
  );

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="absolute z-50 size-full overflow-hidden rounded-lg"
      style={{
        perspective: "500px",
      }}
    >
      <div
        ref={contentRef}
        className="origin-center rounded-lg"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {children}
      </div>
    </section>
  );
};

export default VideoPreview;
