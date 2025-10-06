import { BottomNav } from "./components/ui/BottomNav";
import { ChoresView } from "./views/ChoresView";
import { CalendarView } from "./views/CalendarView";
import { SettingsView } from "./views/SettingsView";
import { ChoreDetailView } from "./views/ChoreDetailView";
import { useUIStore } from "./store/useUIStore";

function App() {
  const { currentView } = useUIStore();

  return (
    <div className="min-h-screen bg-gray-50">
      {currentView === "chores" && <ChoresView />}
      {currentView === "calendar" && <CalendarView />}
      {currentView === "settings" && <SettingsView />}
      {currentView === "detail" && <ChoreDetailView />}
      {currentView !== "detail" && <BottomNav />}
    </div>
  );
}

export default App;
