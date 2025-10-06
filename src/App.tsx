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
  const { currentView, setView, isEditMode, toggleEditMode } = useUIStore();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayView, setDisplayView] = useState(currentView);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");

  // ビュー毎のヘッダー設定
  const getHeaderConfig = (view: View) => {
    switch (view) {
      case "chores":
        return {
          title: isEditMode ? "家事を編集" : "家事一覧",
          showBack: false,
          showEdit: true,
        };
      case "calendar":
        return { title: "カレンダー", showBack: false, showEdit: false };
      case "settings":
        return { title: "設定", showBack: false, showEdit: false };
      case "detail":
        return { title: "家事詳細", showBack: true, showEdit: false };
      default:
        return { title: "", showBack: false, showEdit: false };
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
        rightIcon={
          headerConfig.showEdit ? (
            isEditMode ? (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
              </svg>
            )
          ) : undefined
        }
        onRightClick={headerConfig.showEdit ? toggleEditMode : undefined}
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
      <BottomNav />
    </div>
  );
}

export default App;
