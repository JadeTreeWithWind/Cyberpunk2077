/**
 * Footer 組件
 * 渲染頁尾區塊
 *
 * @returns {JSX.Element} Footer 區塊
 */
const Footer = () => {
  return (
    <footer className="w-screen bg-[#fcee0a] py-4 text-black">
      <div className="container mx-auto flex flex-col items-center justify-center gap-4 px-4 md:flex-row">
        <p className="text-center text-sm font-light md:text-left">
          @TJ.Wang 2026. All rights reserved.
        </p>

      </div>
    </footer>
  );
};

export default Footer;
