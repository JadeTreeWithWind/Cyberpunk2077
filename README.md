<div align="center">

  <div>
    <img src="https://img.shields.io/badge/-React_JS-black?style=for-the-badge&logoColor=white&logo=react&color=61DAFB" alt="react.js" />
    <img src="https://img.shields.io/badge/-GSAP-black?style=for-the-badge&logoColor=white&logo=greensock&color=88CE02" alt="greensock" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
  </div>

</div>

## 📋 目錄

- [📋 目錄](#-目錄)
- [🤖 說明](#-說明)
- [✨ 專案亮點](#-專案亮點)
- [🛠 技術與工具](#-技術與工具)
- [🚀 如何安裝與執行](#-如何安裝與執行)
- [⚠️ 免責聲明](#️-免責聲明)

---

## 🤖 說明

這個專案是練習**網頁動畫**與**敘事型 UI** 的作品。主要靈感來自於 [Zentry](https://zentry.com/)，目標是使用 React 實作那些複雜的視覺轉場與捲動體驗。

## ✨ 專案亮點

- **捲動同步 (Scroll-Driven)**：利用 GSAP 與 ScrollTrigger 確保動畫節奏與使用者捲動手感一致。
- **幾何裁切轉場 (Clip-path)**：實作非傳統的矩形轉場，讓頁面切換看起來更有電影感。
- **影片串接與優化**：處理多個影片元件的加載與播放邏輯，確保在轉場時不會有斷層，並採用 React `Suspense` 加速首屏渲染。
- **互動回饋**：滑鼠 hover 時的 3D 傾斜與變換效果。
- **模組化組件**：如 `Hero`, `About`, `Features`, `Story` 與 `Contact` 等，達到高可維護性的架構設計。

## 🛠 技術與工具

- **React 19** - UI 邏輯與元件架構，善用 `lazy` 延遲載入組件。
- **GSAP (GreenSock)** - 動畫的核心，包含 ScrollTrigger 與 `@gsap/react` 配合。
- **Tailwind CSS v4** - 快速處理樣式，特別是複雜的排版設計。
- **Vite** - 處理現代化前端的超高速開發環境與打包。
- **其他輔助庫** - `react-use` (處理複雜的 Hook 狀態)、`clsx` (動態樣式邏輯)、`react-icons` (圖示整合)。

## 🚀 如何安裝與執行

確保你已經安裝了 [Node.js](https://nodejs.org/) 與 [pnpm](https://pnpm.io/)，接著執行以下指令：

```bash
# 1. 複製本專案
git clone <repository_url>

# 2. 進入資料夾
cd Zentry

# 3. 安裝依賴
pnpm install

# 4. 啟動本機開發伺服器
pnpm dev
```

開啟瀏覽器並前往終端機提示的 `http://localhost:5173/` 即可預覽專案。

## ⚠️ 免責聲明

- 網站原始設計概念與視覺素材版權歸 [**Zentry**](https://zentry.com/) 及原著作者所有。
- 這個專案純粹是**前端技術交流與學習**用途，請勿用於商業目的。
- 如果你覺得這對你有幫助，歡迎點個 Star 或一起討論交流。

---
