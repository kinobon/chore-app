import React from "react";
import { Modal } from "./ui/Modal";
import { Button } from "./ui/Button";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  choreName: string;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  choreName,
  onClose,
  onConfirm,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="家事を削除"
      footer={
        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={onClose}>
            キャンセル
          </Button>
          <Button variant="error" onClick={onConfirm}>
            削除
          </Button>
        </div>
      }
    >
      <div className="space-y-2">
        <p className="text-gray-800">「{choreName}」を削除しますか？</p>
        <p className="text-sm text-gray-500">記録も全て削除されます。</p>
      </div>
    </Modal>
  );
};
