import React, { useState } from "react";
import { Card } from "./ui/Card";
import type { Chore } from "@/store/useChoresStore";
import { useChoresStore } from "@/store/useChoresStore";

interface ChoreCalendarProps {
  chore: Chore;
}

export const ChoreCalendar: React.FC<ChoreCalendarProps> = ({ chore }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { completeChore, uncompleteChore } = useChoresStore();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const isRecordedDate = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;
    return chore.records.some((record) => record.date === dateStr);
  };

  const handleDateClick = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;

    if (isRecordedDate(day)) {
      uncompleteChore(chore.id, dateStr);
    } else {
      completeChore(chore.id, dateStr);
    }
  };

  const weeks = [];
  let week = [];

  for (let i = 0; i < firstDayOfMonth; i++) {
    week.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    week.push(day);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }

  if (week.length > 0) {
    while (week.length < 7) {
      week.push(null);
    }
    weeks.push(week);
  }

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </svg>
        </button>
        <h3 className="text-lg font-semibold">
          {year}年{month + 1}月
        </h3>
        <button
          onClick={nextMonth}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {["日", "月", "火", "水", "木", "金", "土"].map((day) => (
          <div
            key={day}
            className="text-center text-sm font-bold text-gray-500"
          >
            {day}
          </div>
        ))}

        {weeks.map((week, weekIndex) =>
          week.map((day, dayIndex) => (
            <button
              key={`${weekIndex}-${dayIndex}`}
              onClick={() => day && handleDateClick(day)}
              disabled={!day}
              className={`aspect-square flex items-center justify-center rounded-full text-sm transition-colors ${
                day && isRecordedDate(day)
                  ? "text-white font-bold"
                  : day
                  ? "hover:bg-gray-100"
                  : ""
              }`}
              style={{
                backgroundColor:
                  day && isRecordedDate(day) ? chore.color : "transparent",
              }}
            >
              {day}
            </button>
          ))
        )}
      </div>
    </Card>
  );
};
