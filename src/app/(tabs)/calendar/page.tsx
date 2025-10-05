"use client";

import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  AppBar,
  Toolbar,
  Paper,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useChoresStore } from "@/store/useChoresStore";

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { chores } = useChoresStore();
  const router = useRouter();

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

  const getChoresForDate = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;

    return chores.filter((chore) =>
      chore.records.some((record) => record.date === dateStr)
    );
  };

  const hasRecordsForDate = (day: number) => {
    return getChoresForDate(day).length > 0;
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
    <>
      <AppBar position="static" elevation={1}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            カレンダー
          </Typography>
        </Toolbar>
      </AppBar>

      <Container
        maxWidth="md"
        sx={{
          py: 3,
          pb: 10,
          height: "calc(100vh - 56px - 56px)", // AppBarとBottomNavigationの高さを引く
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <Paper sx={{ p: 2, mb: 3, flexShrink: 0 }}>
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
              week.map((day, dayIndex) => {
                const dateStr = day
                  ? `${year}-${String(month + 1).padStart(2, "0")}-${String(
                      day
                    ).padStart(2, "0")}`
                  : "";
                const isSelected = dateStr === selectedDate;

                return (
                  <Box
                    key={`${weekIndex}-${dayIndex}`}
                    onClick={() => day && handleDateClick(day)}
                    sx={{
                      aspectRatio: "1",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: day ? "pointer" : "default",
                      borderRadius: "50%",
                      backgroundColor: isSelected
                        ? "#2196f3"
                        : isToday(day || 0)
                        ? "#e3f2fd"
                        : "transparent",
                      color: isSelected ? "white" : "inherit",
                      border:
                        isToday(day || 0) && !isSelected
                          ? "2px solid #2196f3"
                          : "none",
                      "&:hover": day
                        ? {
                            backgroundColor: isSelected
                              ? "#2196f3"
                              : "rgba(0, 0, 0, 0.04)",
                          }
                        : {},
                    }}
                  >
                    {day && (
                      <>
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: isToday(day) ? "bold" : "normal" }}
                        >
                          {day}
                        </Typography>
                        {hasRecordsForDate(day) && (
                          <Box
                            sx={{
                              width: 4,
                              height: 4,
                              borderRadius: "50%",
                              backgroundColor: isSelected ? "white" : "#4caf50",
                              mt: 0.5,
                            }}
                          />
                        )}
                      </>
                    )}
                  </Box>
                );
              })
            )}
          </Box>
        </Paper>

        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <Typography variant="h6" sx={{ mb: 2, flexShrink: 0 }}>
            {selectedDate} の実施記録
          </Typography>
          <Box
            sx={{
              flex: 1,
              overflowY: "scroll", // 常にスクロールバー領域を確保
            }}
          >
            {getChoresForSelectedDate().length === 0 ? (
              <Paper sx={{ p: 3, textAlign: "center" }}>
                <Typography color="text.secondary">
                  この日の実施記録はありません
                </Typography>
              </Paper>
            ) : (
              <List>
                {getChoresForSelectedDate().map((chore) => (
                  <Paper key={chore.id} sx={{ mb: 1 }}>
                    <ListItem disablePadding>
                      <ListItemButton
                        onClick={() => router.push(`/chores/${chore.id}`)}
                      >
                        <Box
                          sx={{
                            width: 16,
                            height: 16,
                            borderRadius: "50%",
                            backgroundColor: chore.color,
                            mr: 2,
                          }}
                        />
                        <ListItemText primary={chore.name} />
                      </ListItemButton>
                    </ListItem>
                  </Paper>
                ))}
              </List>
            )}
          </Box>
        </Box>
      </Container>
    </>
  );
}
