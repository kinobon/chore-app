import React, { useState } from "react";
import { Card } from "../components/ui/Card";
import { useChoresStore } from "@/store/useChoresStore";
import { useUIStore } from "@/store/useUIStore";

export const CalendarView: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { chores } = useChoresStore();
  const { setView } = useUIStore();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const [selectedDate, setSelectedDate] = useState<string | null>(
    new Date().toISOString().split("T")[0]
  );

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const hasRecordsForDate = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;
    return chores.some((chore) =>
      chore.records.some((record) => record.date === dateStr)
    );
  };

  const handleDateClick = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;
    setSelectedDate(dateStr);
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

  const getChoresForSelectedDate = () => {
    if (!selectedDate) return [];
    return chores.filter((chore) =>
      chore.records.some((record) => record.date === selectedDate)
    );
  };

  const today = new Date().toISOString().split("T")[0];
  const isToday = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;
    return dateStr === today;
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-4">
        <Card className="p-4 mb-4">
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
              week.map((day, dayIndex) => {
                const dateStr = day
                  ? `${year}-${String(month + 1).padStart(2, "0")}-${String(
                      day
                    ).padStart(2, "0")}`
                  : "";
                const isSelected = dateStr === selectedDate;

                return (
                  <button
                    key={`${weekIndex}-${dayIndex}`}
                    onClick={() => day && handleDateClick(day)}
                    disabled={!day}
                    className={`aspect-square flex flex-col items-center justify-center rounded-full text-sm transition-colors ${
                      isSelected
                        ? "bg-primary text-white"
                        : isToday(day || 0)
                        ? "border-2 border-primary"
                        : day
                        ? "hover:bg-gray-100"
                        : ""
                    }`}
                  >
                    {day && (
                      <>
                        <span className={isToday(day) ? "font-bold" : ""}>
                          {day}
                        </span>
                        {hasRecordsForDate(day) && (
                          <span
                            className={`w-1 h-1 rounded-full mt-0.5 ${
                              isSelected ? "bg-white" : "bg-success"
                            }`}
                          />
                        )}
                      </>
                    )}
                  </button>
                );
              })
            )}
          </div>
        </Card>

        <div>
          <h3 className="text-lg font-semibold mb-3">
            {selectedDate} の実施記録
          </h3>
          {getChoresForSelectedDate().length === 0 ? (
            <Card className="p-6 text-center">
              <p className="text-gray-500">この日の実施記録はありません</p>
            </Card>
          ) : (
            <div className="space-y-2">
              {getChoresForSelectedDate().map((chore) => (
                <Card
                  key={chore.id}
                  onClick={() => setView("detail", chore.id)}
                  className="p-4"
                >
                  <div className="flex items-center">
                    <div
                      className="w-4 h-4 rounded-full mr-3"
                      style={{ backgroundColor: chore.color }}
                    />
                    <span className="text-base">{chore.name}</span>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
