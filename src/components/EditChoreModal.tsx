import React, { useState, useEffect } from "react";
import { Modal } from "./ui/Modal";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";

interface EditChoreModalProps {
  isOpen: boolean;
  choreName: string;
  choreColor: string;
  onClose: () => void;
  onSave: (name: string, color: string) => void;
}

const colors = [
  "#4caf50",
  "#2196f3",
  "#ff9800",
  "#9c27b0",
  "#f44336",
  "#00bcd4",
];

export const EditChoreModal: React.FC<EditChoreModalProps> = ({
  isOpen,
  choreName,
  choreColor,
  onClose,
  onSave,
}) => {
  const [name, setName] = useState(choreName);
  const [selectedColor, setSelectedColor] = useState(choreColor);

  useEffect(() => {
    if (isOpen) {
      setName(choreName);
      setSelectedColor(choreColor);
    }
  }, [isOpen, choreName, choreColor]);

  const handleSave = () => {
    if (name.trim()) {
      onSave(name.trim(), selectedColor);
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="家事を編集"
      footer={
        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={onClose}>
            キャンセル
          </Button>
          <Button
            variant="primary"
            onClick={handleSave}
            disabled={!name.trim()}
          >
            保存
          </Button>
        </div>
      }
    >
      <div className="space-y-4">
        <Input
          label="家事名"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSave();
            }
          }}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            色を選択
          </label>
          <div className="flex gap-2">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-10 h-10 rounded-full transition-transform hover:scale-110 ${
                  selectedColor === color
                    ? "ring-4 ring-black ring-offset-2"
                    : ""
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};
