import React, { useState } from "react";
import { Modal } from "./ui/Modal";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";

interface AddChoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (name: string, color: string) => void;
}

const colorOptions = [
  "#4caf50", // 緑
  "#2196f3", // 青
  "#ff9800", // オレンジ
  "#9c27b0", // 紫
  "#f44336", // 赤
  "#00bcd4", // シアン
];

export const AddChoreModal: React.FC<AddChoreModalProps> = ({
  isOpen,
  onClose,
  onAdd,
}) => {
  const [choreName, setChoreName] = useState("");
  const [selectedColor, setSelectedColor] = useState(colorOptions[0]);

  const handleAdd = () => {
    if (choreName.trim()) {
      onAdd(choreName.trim(), selectedColor);
      setChoreName("");
      setSelectedColor(colorOptions[0]);
      onClose();
    }
  };

  const handleClose = () => {
    setChoreName("");
    setSelectedColor(colorOptions[0]);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="新しい家事を追加"
      footer={
        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={handleClose}>
            キャンセル
          </Button>
          <Button
            variant="primary"
            onClick={handleAdd}
            disabled={!choreName.trim()}
          >
            追加
          </Button>
        </div>
      }
    >
      <div className="space-y-4">
        <Input
          label="家事名"
          placeholder="例: トイレ掃除"
          value={choreName}
          onChange={(e) => setChoreName(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleAdd();
            }
          }}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            色を選択
          </label>
          <div className="flex gap-2 flex-wrap">
            {colorOptions.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-12 h-12 rounded-full transition-transform hover:scale-110 ${
                  selectedColor === color
                    ? "ring-4 ring-black ring-offset-2"
                    : ""
                }`}
                style={{ backgroundColor: color }}
              >
                {selectedColor === color && (
                  <svg
                    className="w-6 h-6 text-white mx-auto"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};
