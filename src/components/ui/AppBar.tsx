import React from "react";

interface AppBarProps {
  title: string;
  leftIcon?: React.ReactNode;
  onLeftClick?: () => void;
}

export const AppBar: React.FC<AppBarProps> = ({
  title,
  leftIcon,
  onLeftClick,
}) => {
  return (
    <header className="bg-primary text-white shadow-md sticky top-0 z-40">
      <div className="flex items-center h-14 px-4">
        {leftIcon && (
          <button
            onClick={onLeftClick}
            className="mr-3 p-1 rounded-full hover:bg-blue-700 transition-colors"
          >
            {leftIcon}
          </button>
        )}
        <h1 className="text-xl font-semibold flex-1">{title}</h1>
      </div>
    </header>
  );
};
