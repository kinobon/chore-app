import { BottomNav } from "./components/ui/BottomNav";
import { ChoresView } from "./views/ChoresView";
import { CalendarView } from "./views/CalendarView";
import { SettingsView } from "./views/SettingsView";
import { ChoreDetailView } from "./views/ChoreDetailView";
import { useUIStore } from "./store/useUIStore";

function App() {
  const { currentView } = useUIStore();

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="flex-1 overflow-hidden">
        {currentView === "chores" && <ChoresView />}
        {currentView === "calendar" && <CalendarView />}
        {currentView === "settings" && <SettingsView />}
        {currentView === "detail" && <ChoreDetailView />}
      </div>
      {currentView !== "detail" && <BottomNav />}
    </div>
  );
}

export default App;
