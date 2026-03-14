import AnimatedTitle from "./AnimatedTitle";
import Button from "./Button";

/**
 * ImageClipBox 組件
 * 渲染帶有剪裁路徑的圖片容器
 *
 * @param {Object} props
 * @param {string} props.src - 圖片來源
 * @param {string} props.clipClass - 剪裁路徑的 CSS 類名
 * @param {string} props.alt - 圖片替代文字
 * @returns {JSX.Element} ImageClipBox 組件
 */
const ImageClipBox = ({ src, clipClass, alt = "" }) => (
  <div className={clipClass}>
    <img
      src={src}
      alt={alt}
      role={alt === "" ? "presentation" : undefined}
      loading="lazy"
    />
  </div>
);

/**
 * Contact 組件
 * 渲染聯絡區塊，包含多張剪裁圖片與行動呼籲按鈕
 *
 * @returns {JSX.Element} Contact 區塊
 */
const Contact = () => {
  return (
    <section id="contact" className="my-20 min-h-96 w-screen px-10">
      <div className="relative rounded-lg bg-black py-24 text-blue-50 sm:overflow-hidden">
        {/* 左側裝飾圖片 */}
        <div className="absolute top-0 -left-20 hidden h-full w-72 overflow-hidden sm:block lg:left-20 lg:w-96">
          <ImageClipBox
            src="/img/contact-1.webp"
            clipClass="contact-clip-path-1"
          />
          <ImageClipBox
            src="/img/contact-2.webp"
            clipClass="contact-clip-path-2 lg:translate-y-40 translate-y-60"
          />
        </div>

        {/* 右側裝飾圖片 (劍士) */}
        <div className="absolute -top-40 left-20 w-60 sm:top-1/2 md:right-10 md:left-auto lg:top-20 lg:w-80">
          <ImageClipBox
            src="/img/swordman.webp"
            clipClass="sword-man-clip-path md:scale-125"
          />
        </div>

        {/* 核心內容區 */}
        <div className="flex flex-col items-center text-center">
          <p className="font-general mb-10 text-[10px] uppercase">
            《電馭叛客 2077》發售五週年紀念！
          </p>

          <AnimatedTitle
            title="傳奇人物之城的時間飛逝<br />感謝玩家一起迎接發售五週年"
            className="special-font !md:text-[6.2rem] font-zentry w-full text-5xl! leading-[.9]! font-black!"
          />

          <Button
            title="觀看紀念影片"
            containerClass="mt-10 cursor-pointer"
            onClick={() =>
              window.open(
                "https://www.youtube.com/watch?v=C9beB4M88NU",
                "_blank",
              )
            }
          />
        </div>
      </div>
    </section>
  );
};

export default Contact;
