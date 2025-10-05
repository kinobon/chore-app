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
  deleteChore: (id: string) => void;
  completeChore: (id: string) => void;
  uncompleteChore: (id: string) => void;
  exportData: () => string;
  importData: (jsonData: string) => void;
}

export const useChoresStore = create<ChoresState>()(
  persist(
    (set, get) => ({
      chores: [
        {
          id: "d52399b7-318e-4c3d-88a2-e8384abd6ec1",
          name: "トイレ掃除",
          color: "#4CAF50",
          records: [
            { date: "2025-10-01" },
            { date: "2025-10-02" },
            { date: "2025-10-05" },
          ],
        },
      ],
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
      deleteChore: (id: string) =>
        set((state) => ({
          chores: state.chores.filter((chore) => chore.id !== id),
        })),
      completeChore: (id: string) =>
        set((state) => ({
          chores: state.chores.map((chore) => {
            if (chore.id === id) {
              const today = new Date().toISOString().split("T")[0];
              // 今日の記録が既にある場合は追加しない
              const hasToday = chore.records.some(
                (record) => record.date === today
              );
              if (hasToday) {
                return chore;
              }
              return {
                ...chore,
                records: [...chore.records, { date: today }],
              };
            }
            return chore;
          }),
        })),
      uncompleteChore: (id: string) =>
        set((state) => ({
          chores: state.chores.map((chore) => {
            if (chore.id === id) {
              const today = new Date().toISOString().split("T")[0];
              // 今日の記録を削除
              return {
                ...chore,
                records: chore.records.filter(
                  (record) => record.date !== today
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
