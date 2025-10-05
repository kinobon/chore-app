"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Box,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
} from "@mui/material";
import {
  List as ListIcon,
  CalendarMonth as CalendarIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";

export default function TabsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const getTabValue = () => {
    if (pathname.startsWith("/chores")) return 0;
    if (pathname.startsWith("/calendar")) return 1;
    if (pathname.startsWith("/settings")) return 2;
    return 0;
  };

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    switch (newValue) {
      case 0:
        router.push("/chores");
        break;
      case 1:
        router.push("/calendar");
        break;
      case 2:
        router.push("/settings");
        break;
    }
  };

  return (
    <Box sx={{ pb: 7 }}>
      {children}

      <Paper
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
        }}
        elevation={3}
      >
        <BottomNavigation
          value={getTabValue()}
          onChange={handleChange}
          showLabels
        >
          <BottomNavigationAction label="家事一覧" icon={<ListIcon />} />
          <BottomNavigationAction label="カレンダー" icon={<CalendarIcon />} />
          <BottomNavigationAction label="設定" icon={<SettingsIcon />} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
