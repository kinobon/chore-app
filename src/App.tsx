import { BottomNav } from "./components/ui/BottomNav";
import { ChoresView } from "./views/ChoresView";
import { CalendarView } from "./views/CalendarView";
import { SettingsView } from "./views/SettingsView";
import { ChoreDetailView } from "./views/ChoreDetailView";
import { useUIStore } from "./store/useUIStore";
import { useEffect, useState } from "react";
import type { View } from "./store/useUIStore";

const viewOrder: View[] = ["chores", "calendar", "settings"];

function App() {
  const { currentView } = useUIStore();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayView, setDisplayView] = useState(currentView);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");

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
      {currentView !== "detail" && <BottomNav />}
    </div>
  );
}

export default App;
