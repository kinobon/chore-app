import { create } from "zustand";

export type View = "chores" | "calendar" | "settings" | "detail";

interface UIState {
  currentView: View;
  selectedChoreId: string | null;
  setView: (view: View, choreId?: string) => void;
}

export const useUIStore = create<UIState>((set) => ({
  currentView: "chores",
  selectedChoreId: null,
  setView: (view: View, choreId?: string) =>
    set({ currentView: view, selectedChoreId: choreId || null }),
}));
