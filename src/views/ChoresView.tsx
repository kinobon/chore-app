import React, { useState } from "react";
import { FAB } from "../components/ui/FAB";
import { ChoreCard } from "../components/ChoreCard";
import { AddChoreModal } from "../components/AddChoreModal";
import { EditChoreModal } from "../components/EditChoreModal";
import { BottomSheet } from "../components/ui/BottomSheet";
import { useChoresStore } from "@/store/useChoresStore";
import { useUIStore } from "@/store/useUIStore";
import type { Chore } from "@/store/useChoresStore";

export const ChoresView: React.FC = () => {
  const {
    chores,
    addChore,
    updateChore,
    completeChore,
    uncompleteChore,
    deleteChores,
    reorderChores,
  } = useChoresStore();
  const {
    setView,
    isEditMode,
    toggleChoreSelection,
    selectedChoreIds,
    clearSelection,
    selectAll,
  } = useUIStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);
  const [selectedChore, setSelectedChore] = useState<Chore | null>(null);

  const handleAddChore = (name: string, color: string) => {
    addChore(name, color);
  };

  const handleChoreClick = (choreId: string) => {
    if (isEditMode) {
      toggleChoreSelection(choreId);
    } else {
      setView("detail", choreId);
    }
  };

  const handleDeleteSelected = () => {
    if (selectedChoreIds.size === 0) return;
    if (confirm(`${selectedChoreIds.size}個の家事を削除しますか?`)) {
      deleteChores(Array.from(selectedChoreIds));
      clearSelection();
    }
  };

  const handleSelectAll = () => {
    if (selectedChoreIds.size === chores.length) {
      clearSelection();
    } else {
      selectAll(chores.map((c) => c.id));
    }
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const newChores = [...chores];
    [newChores[index - 1], newChores[index]] = [
      newChores[index],
      newChores[index - 1],
    ];
    reorderChores(newChores);
  };

  const handleMoveDown = (index: number) => {
    if (index === chores.length - 1) return;
    const newChores = [...chores];
    [newChores[index], newChores[index + 1]] = [
      newChores[index + 1],
      newChores[index],
    ];
    reorderChores(newChores);
  };

  const handleLongPress = (choreId: string) => {
    if (isEditMode) return; // 編集モード時は無効
    const chore = chores.find((c) => c.id === choreId);
    if (chore) {
      setSelectedChore(chore);
      setBottomSheetOpen(true);
    }
  };

  const handleEdit = () => {
    if (selectedChore) {
      setEditModalOpen(true);
    }
  };

  const handleSaveEdit = (name: string, color: string) => {
    if (selectedChore) {
      updateChore(selectedChore.id, name, color);
    }
  };

  const handleDelete = () => {
    if (selectedChore && confirm(`「${selectedChore.name}」を削除しますか?`)) {
      deleteChores([selectedChore.id]);
    }
  };

  return (
    <div className="flex flex-col h-full relative">
      {/* 編集モード時のツールバー */}
      {isEditMode && (
        <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <button
            onClick={handleSelectAll}
            className="text-sm text-primary font-medium"
          >
            {selectedChoreIds.size === chores.length ? "全選択解除" : "全選択"}
          </button>
          <span className="text-sm text-gray-600">
            {selectedChoreIds.size}個選択中
          </span>
          <button
            onClick={handleDeleteSelected}
            disabled={selectedChoreIds.size === 0}
            className="text-sm font-medium disabled:text-gray-400 text-red-600"
          >
            削除
          </button>
        </div>
      )}

      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-4">
        {chores.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
            <h2 className="text-xl font-semibold text-gray-600 mb-2">
              家事が登録されていません
            </h2>
            <p className="text-gray-500">
              右下の + ボタンから家事を追加してください
            </p>
          </div>
        ) : (
          chores.map((chore, index) => (
            <div key={chore.id} className="flex items-center gap-2 mb-4">
              {/* チェックボックス */}
              {isEditMode && (
                <div className="flex-shrink-0 pl-2">
                  <input
                    type="checkbox"
                    checked={selectedChoreIds.has(chore.id)}
                    onChange={() => toggleChoreSelection(chore.id)}
                    className="w-5 h-5 rounded border-gray-300"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              )}

              {/* カード本体 */}
              <div className="flex-1">
                <ChoreCard
                  chore={chore}
                  onComplete={completeChore}
                  onUncomplete={uncompleteChore}
                  onClick={handleChoreClick}
                  onLongPress={handleLongPress}
                />
              </div>

              {/* 並び替えボタン */}
              {isEditMode && (
                <div className="flex flex-col gap-1 pr-2">
                  <button
                    onClick={() => handleMoveUp(index)}
                    disabled={index === 0}
                    className="p-1 rounded hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <svg
                      className="w-6 h-6 text-gray-600"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleMoveDown(index)}
                    disabled={index === chores.length - 1}
                    className="p-1 rounded hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <svg
                      className="w-6 h-6 text-gray-600"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {!isEditMode && <FAB onClick={() => setModalOpen(true)} />}

      <AddChoreModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={handleAddChore}
      />

      <BottomSheet
        isOpen={bottomSheetOpen}
        onClose={() => setBottomSheetOpen(false)}
        title={selectedChore?.name}
        actions={[
          {
            label: "編集",
            icon: (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
              </svg>
            ),
            onClick: handleEdit,
          },
          {
            label: "削除",
            icon: (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
              </svg>
            ),
            onClick: handleDelete,
            variant: "danger" as const,
          },
        ]}
      />

      <EditChoreModal
        isOpen={editModalOpen}
        choreName={selectedChore?.name || ""}
        choreColor={selectedChore?.color || "#4caf50"}
        onClose={() => setEditModalOpen(false)}
        onSave={handleSaveEdit}
      />
    </div>
  );
};
