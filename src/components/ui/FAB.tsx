import React from "react";

interface FABProps {
  onClick: () => void;
  icon?: React.ReactNode;
}

export const FAB: React.FC<FABProps> = ({ onClick, icon }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-20 right-6 w-14 h-14 bg-primary text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 z-30"
    >
      {icon || (
        <svg
          className="w-8 h-8 mx-auto"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
      )}
    </button>
  );
};
