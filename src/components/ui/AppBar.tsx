import React from "react";

interface AppBarProps {
  title: string;
  leftIcon?: React.ReactNode;
  onLeftClick?: () => void;
  rightIcon?: React.ReactNode;
  onRightClick?: () => void;
}

export const AppBar: React.FC<AppBarProps> = ({
  title,
  leftIcon,
  onLeftClick,
  rightIcon,
  onRightClick,
}) => {
  return (
    <header className="bg-primary text-white shadow-md sticky top-0 z-40">
      <div className="flex items-center h-14 px-4">
        {/* 左側: 戻るボタンまたはスペーサー */}
        <div className="w-8 flex items-center justify-center">
          {leftIcon && (
            <button
              onClick={onLeftClick}
              className="p-1 rounded-full hover:bg-blue-700 transition-colors animate-fadeInLeft"
            >
              {leftIcon}
            </button>
          )}
        </div>

        {/* 中央: タイトル */}
        <h1 className="text-xl font-semibold flex-1 text-center">{title}</h1>

        {/* 右側: アクションボタンまたはスペーサー */}
        <div className="w-8 flex items-center justify-center">
          {rightIcon && (
            <button
              onClick={onRightClick}
              className="p-1 rounded-full hover:bg-blue-700 transition-colors animate-fadeInLeft"
            >
              {rightIcon}
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
