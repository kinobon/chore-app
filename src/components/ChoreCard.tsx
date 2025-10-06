import React from "react";
import { Card } from "./ui/Card";
import { Button } from "./ui/Button";
import type { Chore } from "@/store/useChoresStore";

interface ChoreCardProps {
  chore: Chore;
  onComplete: (id: string) => void;
  onUncomplete: (id: string) => void;
  onClick: (id: string) => void;
  onLongPress?: (id: string, position: { x: number; y: number }) => void;
  className?: string;
}

export const ChoreCard: React.FC<ChoreCardProps> = ({
  chore,
  onComplete,
  onUncomplete,
  onClick,
  onLongPress,
  className = "",
}) => {
  const [longPressTimer, setLongPressTimer] = React.useState<number | null>(
    null
  );

  const formatDate = (records: { date: string }[]) => {
    if (records.length === 0) return "未実施";
    const latestRecord = records.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )[0];
    return latestRecord.date;
  };

  const isCompletedToday = () => {
    const today = new Date().toISOString().split("T")[0];
    return chore.records.some((record) => record.date === today);
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isCompletedToday()) {
      onUncomplete(chore.id);
    } else {
      onComplete(chore.id);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!onLongPress) return;
    const touch = e.touches[0];
    const position = { x: touch.clientX, y: touch.clientY };

    const timer = setTimeout(() => {
      onLongPress(chore.id, position);
    }, 500); // 500msで長押し判定
    setLongPressTimer(timer);
  };

  const handleTouchEnd = () => {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!onLongPress) return;
    const position = { x: e.clientX, y: e.clientY };

    const timer = setTimeout(() => {
      onLongPress(chore.id, position);
    }, 500);
    setLongPressTimer(timer);
  };

  const handleMouseUp = () => {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }
  };

  return (
    <Card
      onClick={() => onClick(chore.id)}
      className={`mb-4 ${className}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center flex-1">
            <div
              className="w-4 h-4 rounded-full mr-3 flex-shrink-0"
              style={{ backgroundColor: chore.color }}
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-1">{chore.name}</h3>
              <p className="text-sm text-gray-500">
                前回実施日: {formatDate(chore.records)}
              </p>
            </div>
          </div>
          <Button
            variant={isCompletedToday() ? "success" : "ghost"}
            onClick={handleButtonClick}
            className="ml-4"
          >
            {isCompletedToday() ? (
              <span className="flex items-center">
                <svg
                  className="w-5 h-5 mr-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
                完了済み
              </span>
            ) : (
              <span className="flex items-center text-green-700">
                <svg
                  className="w-5 h-5 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                今日実施
              </span>
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
};
