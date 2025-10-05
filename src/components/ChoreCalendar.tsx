"use client";

import React, { useState } from "react";
import { Box, Typography, IconButton, Paper } from "@mui/material";
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";
import { Chore, useChoresStore } from "@/store/useChoresStore";

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
      // 記録を削除
      uncompleteChore(chore.id, dateStr);
    } else {
      // 記録を追加
      completeChore(chore.id, dateStr);
    }
  };

  const weeks = [];
  let week = [];

  // 月初の空白
  for (let i = 0; i < firstDayOfMonth; i++) {
    week.push(null);
  }

  // 日付
  for (let day = 1; day <= daysInMonth; day++) {
    week.push(day);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }

  // 最終週の空白
  if (week.length > 0) {
    while (week.length < 7) {
      week.push(null);
    }
    weeks.push(week);
  }

  return (
    <Paper sx={{ p: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <IconButton onClick={prevMonth} color="primary">
          <ChevronLeftIcon />
        </IconButton>
        <Typography variant="h6">
          {year}年{month + 1}月
        </Typography>
        <IconButton onClick={nextMonth} color="primary">
          <ChevronRightIcon />
        </IconButton>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: 1,
        }}
      >
        {["日", "月", "火", "水", "木", "金", "土"].map((day) => (
          <Box
            key={day}
            sx={{
              textAlign: "center",
              color: "text.secondary",
              fontSize: "0.875rem",
              fontWeight: "bold",
            }}
          >
            {day}
          </Box>
        ))}

        {weeks.map((week, weekIndex) =>
          week.map((day, dayIndex) => (
            <Box
              key={`${weekIndex}-${dayIndex}`}
              onClick={() => day && handleDateClick(day)}
              sx={{
                aspectRatio: "1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: day ? "pointer" : "default",
                borderRadius: "50%",
                backgroundColor:
                  day && isRecordedDate(day) ? chore.color : "transparent",
                color: day && isRecordedDate(day) ? "white" : "inherit",
                fontWeight: day && isRecordedDate(day) ? "bold" : "normal",
                "&:hover": day
                  ? {
                      backgroundColor: isRecordedDate(day)
                        ? chore.color
                        : "rgba(0, 0, 0, 0.04)",
                    }
                  : {},
              }}
            >
              {day && <Typography variant="body2">{day}</Typography>}
            </Box>
          ))
        )}
      </Box>
    </Paper>
  );
};
