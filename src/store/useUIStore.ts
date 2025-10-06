import { create } from "zustand";

export type View = "chores" | "calendar" | "settings" | "detail";

interface UIState {
  currentView: View;
  selectedChoreId: string | null;
  isEditMode: boolean;
  selectedChoreIds: Set<string>;
  setView: (view: View, choreId?: string) => void;
  toggleEditMode: () => void;
  toggleChoreSelection: (choreId: string) => void;
  clearSelection: () => void;
  selectAll: (choreIds: string[]) => void;
}

export const useUIStore = create<UIState>((set) => ({
  currentView: "chores",
  selectedChoreId: null,
  isEditMode: false,
  selectedChoreIds: new Set(),
  setView: (view: View, choreId?: string) =>
    set({
      currentView: view,
      selectedChoreId: choreId || null,
      isEditMode: false, // ビュー切り替え時は編集モード解除
      selectedChoreIds: new Set(),
    }),
  toggleEditMode: () =>
    set((state) => ({
      isEditMode: !state.isEditMode,
      selectedChoreIds: new Set(), // 編集モード切り替え時は選択をクリア
    })),
  toggleChoreSelection: (choreId: string) =>
    set((state) => {
      const newSelection = new Set(state.selectedChoreIds);
      if (newSelection.has(choreId)) {
        newSelection.delete(choreId);
      } else {
        newSelection.add(choreId);
      }
      return { selectedChoreIds: newSelection };
    }),
  clearSelection: () => set({ selectedChoreIds: new Set() }),
  selectAll: (choreIds: string[]) =>
    set({ selectedChoreIds: new Set(choreIds) }),
}));
