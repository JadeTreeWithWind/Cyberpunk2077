import clsx from "clsx";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { useWindowScroll } from "react-use";
import { TiLocationArrow } from "react-icons/ti";

// 內部組件
import Button from "./Button";

// Constants
const NAV_ITEMS = ["關於", "介紹", "故事", "聯絡我們"];
const NAV_LINKS = ["#about", "#features", "#story", "#contact"];
const AUDIO_SRC = "/audio/loop.mp3";

const NavBar = () => {
  // 1. State
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);

  // 2. Refs
  const navContainerRef = useRef(null);
  const audioElementRef = useRef(null);
  const lastScrollYRef = useRef(0);

  // 3. Computed / Hooks Data
  const { y: currentScrollY } = useWindowScroll();

  // 4. Handlers
  /**
   * 切換音效播放狀態與視覺指示器
   */
  const handleAudioToggle = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  const handleScroll = (e) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute("href");
    if (!href.startsWith("#")) return;

    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  // 5. Effects (邏輯與 Side Effects)

  // 管理音頻播放
  useEffect(() => {
    if (!audioElementRef.current) return;

    if (isAudioPlaying) {
      audioElementRef.current.play().catch((error) => {
        console.warn("Audio playback failed:", error);
        setIsAudioPlaying(false);
      });
    } else {
      audioElementRef.current.pause();
    }
  }, [isAudioPlaying]);

  const isNavVisibleRef = useRef(true);

  useEffect(() => {
    if (currentScrollY === 0) {
      // Topmost
      isNavVisibleRef.current = true;
      navContainerRef.current.classList.remove("floating-nav");
      gsap.to(navContainerRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.2,
      });
    } else if (currentScrollY > lastScrollYRef.current) {
      // Scrolling Down
      navContainerRef.current.classList.add("floating-nav");
      if (isNavVisibleRef.current) {
        isNavVisibleRef.current = false;
        gsap.to(navContainerRef.current, {
          y: -100,
          opacity: 0,
          duration: 0.2,
        });
      }
    } else if (currentScrollY < lastScrollYRef.current) {
      // Scrolling Up
      navContainerRef.current.classList.add("floating-nav");
      if (!isNavVisibleRef.current) {
        isNavVisibleRef.current = true;
        gsap.to(navContainerRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.2,
        });
      }
    }

    lastScrollYRef.current = currentScrollY;
  }, [currentScrollY]);

  return (
    <div
      ref={navContainerRef}
      className={clsx(
        "fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6",
      )}
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between p-4">
          <div className="flex items-center gap-7">
            <Button
              id="product-button"
              title="前往購買"
              rightIcon={<TiLocationArrow />}
              containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"
            />
          </div>

          <div className="flex h-full items-center">
            <div className="hidden md:block">
              {NAV_ITEMS.map((item, index) => (
                <a
                  key={item}
                  href={NAV_LINKS[index]}
                  className="nav-hover-btn"
                  onClick={handleScroll}
                >
                  {item}
                </a>
              ))}
            </div>

            <button
              onClick={handleAudioToggle}
              className="ml-6 flex h-4 w-4 cursor-pointer items-center space-x-0.5"
            >
              <audio
                ref={audioElementRef}
                className="hidden"
                src={AUDIO_SRC}
                loop
              />

              {[1, 2, 3, 4].map((bar) => (
                <div
                  key={bar}
                  className={clsx("indicator-line", {
                    active: isIndicatorActive,
                  })}
                  style={{
                    animationDelay: `${bar * 0.1}s`,
                  }}
                />
              ))}
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default NavBar;
