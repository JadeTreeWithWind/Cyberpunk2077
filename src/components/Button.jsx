import clsx from "clsx";

/**
 * 通用按鈕組件
 * 包含懸停時的文字滾動效果
 *
 * @param {string} id - DOM ID
 * @param {string} title - 按鈕文字
 * @param {ReactNode} rightIcon - 右側圖標
 * @param {ReactNode} leftIcon - 左側圖標
 * @param {string} containerClass - 額外樣式
 */
const Button = ({ id, title, rightIcon, leftIcon, containerClass }) => {
  return (
    <button
      id={id}
      type="button" // 健壯性優化：防止意外觸發表單提交
      className={clsx(
        "group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full bg-[#fcee0a] px-7 py-3 text-black",
        containerClass,
      )}
    >
      {leftIcon}

      <div className="font-general flex-center relative inline-flex overflow-hidden text-xs font-bold uppercase">
        <div className="translate-y-0 skew-y-0 transition duration-500 group-hover:translate-y-[-160%] group-hover:skew-y-12">
          {title}
        </div>
        <div className="absolute translate-y-[164%] skew-y-12 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0">
          {title}
        </div>
      </div>

      {rightIcon}
    </button>
  );
};

export default Button;
