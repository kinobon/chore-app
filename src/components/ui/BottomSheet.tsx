import React, { useEffect } from "react";
import { createPortal } from "react-dom";

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  actions: {
    label: string;
    icon?: React.ReactNode;
    onClick: () => void;
    variant?: "default" | "danger";
  }[];
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpen,
  onClose,
  title,
  actions,
}) => {
  // ボトムシート表示中はbodyのスクロールを防ぐ
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const content = (
    <>
      {/* 背景オーバーレイ */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50 animate-fadeIn"
        onClick={onClose}
      />

      {/* ボトムシート本体 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-50 animate-slideUp safe-area-bottom">
        {/* ドラッグハンドル */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-12 h-1 bg-gray-300 rounded-full" />
        </div>

        {/* タイトル */}
        {title && (
          <div className="px-6 pb-2">
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          </div>
        )}

        {/* アクション */}
        <div className="pb-safe">
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={() => {
                action.onClick();
                onClose();
              }}
              className={`w-full px-6 py-4 flex items-center gap-4 hover:bg-gray-50 active:bg-gray-100 transition-colors text-left ${
                action.variant === "danger" ? "text-red-600" : "text-gray-800"
              } ${index === actions.length - 1 ? "pb-6" : ""}`}
            >
              {action.icon && (
                <div className="flex-shrink-0 w-6 h-6">{action.icon}</div>
              )}
              <span className="text-base font-medium">{action.label}</span>
            </button>
          ))}

          {/* キャンセルボタン */}
          <div className="px-4 pb-4 pt-2">
            <button
              onClick={onClose}
              className="w-full py-3 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 rounded-xl text-gray-800 font-medium transition-colors"
            >
              キャンセル
            </button>
          </div>
        </div>
      </div>
    </>
  );

  return createPortal(content, document.body);
};
