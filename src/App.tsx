import { BottomNav } from "./components/ui/BottomNav";
import { AppBar } from "./components/ui/AppBar";
import { ChoresView } from "./views/ChoresView";
import { CalendarView } from "./views/CalendarView";
import { SettingsView } from "./views/SettingsView";
import { ChoreDetailView } from "./views/ChoreDetailView";
import { useUIStore } from "./store/useUIStore";
import { useEffect, useState } from "react";
import type { View } from "./store/useUIStore";

const viewOrder: View[] = ["chores", "calendar", "settings"];

function App() {
  const { currentView, setView } = useUIStore();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayView, setDisplayView] = useState(currentView);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");

  // ビュー毎のヘッダー設定
  const getHeaderConfig = (view: View) => {
    switch (view) {
      case "chores":
        return { title: "家事一覧", showBack: false };
      case "calendar":
        return { title: "カレンダー", showBack: false };
      case "settings":
        return { title: "設定", showBack: false };
      case "detail":
        return { title: "家事詳細", showBack: true };
      default:
        return { title: "", showBack: false };
    }
  };

  const headerConfig = getHeaderConfig(currentView);

  useEffect(() => {
    if (currentView !== displayView) {
      // 遷移方向を決定（detail画面は特別扱い）
      if (currentView === "detail" || displayView === "detail") {
        setDirection("forward");
      } else {
        const currentIndex = viewOrder.indexOf(currentView);
        const displayIndex = viewOrder.indexOf(displayView);
        setDirection(currentIndex > displayIndex ? "forward" : "backward");
      }

      setIsTransitioning(true);
      const timer = setTimeout(() => {
        setDisplayView(currentView);
        setIsTransitioning(false);
      }, 200); // アニメーション時間

      return () => clearTimeout(timer);
    }
  }, [currentView, displayView]);

  return (
    <div className="flex flex-col h-[100dvh] bg-gray-50">
      {/* 共通ヘッダー */}
      <AppBar
        title={headerConfig.title}
        leftIcon={
          headerConfig.showBack ? (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            </svg>
          ) : undefined
        }
        onLeftClick={
          headerConfig.showBack ? () => setView("chores") : undefined
        }
      />

      {/* コンテンツエリア */}
      <div className="flex-1 overflow-hidden relative">
        <div
          className={`absolute inset-0 transition-all duration-200 ease-in-out ${
            isTransitioning
              ? direction === "forward"
                ? "opacity-0 translate-x-[-20px]"
                : "opacity-0 translate-x-[20px]"
              : "opacity-100 translate-x-0"
          }`}
        >
          {displayView === "chores" && <ChoresView />}
          {displayView === "calendar" && <CalendarView />}
          {displayView === "settings" && <SettingsView />}
          {displayView === "detail" && <ChoreDetailView />}
        </div>
      </div>

      {/* ボトムナビゲーション */}
      {currentView !== "detail" && <BottomNav />}
    </div>
  );
}

export default App;
