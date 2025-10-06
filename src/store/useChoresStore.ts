import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ChoreRecord {
  date: string;
}

export interface Chore {
  id: string;
  name: string;
  color: string;
  records: ChoreRecord[];
}

interface ChoresState {
  chores: Chore[];
  addChore: (name: string, color: string) => void;
  updateChore: (id: string, name: string, color: string) => void;
  deleteChore: (id: string) => void;
  deleteChores: (ids: string[]) => void;
  reorderChores: (newOrder: Chore[]) => void;
  completeChore: (id: string, date?: string) => void;
  uncompleteChore: (id: string, date?: string) => void;
  exportData: () => string;
  importData: (jsonData: string) => void;
}

export const useChoresStore = create<ChoresState>()(
  persist(
    (set, get) => ({
      chores: [],
      addChore: (name: string, color: string) =>
        set((state) => ({
          chores: [
            ...state.chores,
            {
              id: crypto.randomUUID(),
              name,
              color,
              records: [],
            },
          ],
        })),
      updateChore: (id: string, name: string, color: string) =>
        set((state) => ({
          chores: state.chores.map((chore) =>
            chore.id === id ? { ...chore, name, color } : chore
          ),
        })),
      deleteChore: (id: string) =>
        set((state) => ({
          chores: state.chores.filter((chore) => chore.id !== id),
        })),
      deleteChores: (ids: string[]) =>
        set((state) => ({
          chores: state.chores.filter((chore) => !ids.includes(chore.id)),
        })),
      reorderChores: (newOrder: Chore[]) => set({ chores: newOrder }),
      completeChore: (id: string, date?: string) =>
        set((state) => ({
          chores: state.chores.map((chore) => {
            if (chore.id === id) {
              const targetDate = date || new Date().toISOString().split("T")[0];
              const hasDate = chore.records.some(
                (record) => record.date === targetDate
              );
              if (hasDate) {
                return chore;
              }
              return {
                ...chore,
                records: [...chore.records, { date: targetDate }].sort(
                  (a, b) =>
                    new Date(a.date).getTime() - new Date(b.date).getTime()
                ),
              };
            }
            return chore;
          }),
        })),
      uncompleteChore: (id: string, date?: string) =>
        set((state) => ({
          chores: state.chores.map((chore) => {
            if (chore.id === id) {
              const targetDate = date || new Date().toISOString().split("T")[0];
              return {
                ...chore,
                records: chore.records.filter(
                  (record) => record.date !== targetDate
                ),
              };
            }
            return chore;
          }),
        })),
      exportData: () => {
        const data = { chores: get().chores };
        return JSON.stringify(data, null, 2);
      },
      importData: (jsonData: string) => {
        try {
          const data = JSON.parse(jsonData);
          if (data.chores && Array.isArray(data.chores)) {
            set({ chores: data.chores });
          }
        } catch (error) {
          console.error("Invalid JSON data:", error);
        }
      },
    }),
    {
      name: "chores-storage",
    }
  )
);
