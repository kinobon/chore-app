import React, { useEffect } from "react";

interface ContextMenuProps {
  isOpen: boolean;
  onClose: () => void;
  position?: { x: number; y: number };
  actions: {
    label: string;
    icon?: React.ReactNode;
    onClick: () => void;
    variant?: "default" | "danger";
  }[];
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
  isOpen,
  onClose,
  position,
  actions,
}) => {
  useEffect(() => {
    if (isOpen) {
      const handleClickOutside = () => onClose();
      // 少し遅延させてクリックイベントが伝播しないようにする
      setTimeout(() => {
        document.addEventListener("click", handleClickOutside);
      }, 100);

      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // 画面サイズを考慮した位置調整
  const menuStyle: React.CSSProperties = position
    ? {
        position: "fixed",
        top: `${Math.min(position.y, window.innerHeight - 300)}px`,
        left: `${Math.min(position.x, window.innerWidth - 220)}px`,
      }
    : {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      };

  return (
    <>
      {/* 背景オーバーレイ */}
      <div className="fixed inset-0 z-40 animate-fadeIn" />

      {/* メニュー本体 */}
      <div
        className="bg-white rounded-lg shadow-2xl z-50 min-w-[200px] animate-scaleIn"
        style={menuStyle}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="py-2">
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={() => {
                action.onClick();
                onClose();
              }}
              className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-100 transition-colors text-left ${
                action.variant === "danger" ? "text-red-600" : "text-gray-800"
              }`}
            >
              {action.icon && (
                <div className="flex-shrink-0 w-5 h-5">{action.icon}</div>
              )}
              <span className="text-sm font-medium">{action.label}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};
