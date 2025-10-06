import React, { useState } from "react";
import { FAB } from "../components/ui/FAB";
import { ChoreCard } from "../components/ChoreCard";
import { AddChoreModal } from "../components/AddChoreModal";
import { useChoresStore } from "@/store/useChoresStore";
import { useUIStore } from "@/store/useUIStore";

export const ChoresView: React.FC = () => {
  const { chores, addChore, completeChore, uncompleteChore } = useChoresStore();
  const { setView } = useUIStore();
  const [modalOpen, setModalOpen] = useState(false);

  const handleAddChore = (name: string, color: string) => {
    addChore(name, color);
  };

  const handleChoreClick = (choreId: string) => {
    setView("detail", choreId);
  };

  return (
    <div className="flex flex-col h-full relative">
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
          chores.map((chore) => (
            <ChoreCard
              key={chore.id}
              chore={chore}
              onComplete={completeChore}
              onUncomplete={uncompleteChore}
              onClick={handleChoreClick}
            />
          ))
        )}
      </div>

      <FAB onClick={() => setModalOpen(true)} />

      <AddChoreModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={handleAddChore}
      />
    </div>
  );
};
