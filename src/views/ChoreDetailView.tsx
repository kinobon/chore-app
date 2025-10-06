import React, { useState } from "react";
import { AppBar } from "../components/ui/AppBar";
import { Card } from "../components/ui/Card";
import { ChoreCalendar } from "../components/ChoreCalendar";
import { EditChoreModal } from "../components/EditChoreModal";
import { DeleteConfirmModal } from "../components/DeleteConfirmModal";
import { useChoresStore } from "@/store/useChoresStore";
import { useUIStore } from "@/store/useUIStore";

export const ChoreDetailView: React.FC = () => {
  const { chores, deleteChore, updateChore } = useChoresStore();
  const { selectedChoreId, setView } = useUIStore();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const chore = chores.find((c) => c.id === selectedChoreId);

  if (!chore) {
    return (
      <div className="flex flex-col h-screen">
        <AppBar
          title="家事詳細"
          leftIcon={
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            </svg>
          }
          onLeftClick={() => setView("chores")}
        />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-500">家事が見つかりませんでした</p>
        </div>
      </div>
    );
  }

  const handleDelete = () => {
    deleteChore(chore.id);
    setDeleteModalOpen(false);
    setView("chores");
  };

  const handleEditSave = (name: string, color: string) => {
    updateChore(chore.id, name, color);
  };

  const lastCompletedDate =
    chore.records.length > 0
      ? chore.records.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        )[0].date
      : "未実施";

  return (
    <div className="flex flex-col h-screen">
      <AppBar
        title="家事詳細"
        leftIcon={
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </svg>
        }
        onLeftClick={() => setView("chores")}
      />

      <div className="flex-1 overflow-y-auto pb-20 px-4 pt-4">
        <Card className="p-4 mb-4">
          <div className="flex items-center mb-3">
            <div
              className="w-6 h-6 rounded-full mr-3"
              style={{ backgroundColor: chore.color }}
            />
            <h2 className="text-2xl font-bold flex-1">{chore.name}</h2>
            <button
              onClick={() => setEditModalOpen(true)}
              className="p-2 text-primary hover:bg-blue-50 rounded-full transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
              </svg>
            </button>
            <button
              onClick={() => setDeleteModalOpen(true)}
              className="p-2 text-error hover:bg-red-50 rounded-full transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
              </svg>
            </button>
          </div>
          <p className="text-sm text-gray-500">
            前回実施日: {lastCompletedDate}
          </p>
        </Card>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold">実施カレンダー</h3>
            <span className="text-sm px-3 py-1 bg-gray-100 rounded-full">
              実施回数: {chore.records.length}回
            </span>
          </div>
          <ChoreCalendar chore={chore} />
        </div>

        <p className="text-sm text-gray-500 text-center">
          カレンダーの日付をタップして実施日を記録・削除できます
        </p>
      </div>

      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        choreName={chore.name}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
      />

      <EditChoreModal
        isOpen={editModalOpen}
        choreName={chore.name}
        choreColor={chore.color}
        onClose={() => setEditModalOpen(false)}
        onSave={handleEditSave}
      />
    </div>
  );
};
