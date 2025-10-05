"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  Button,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
} from "@mui/icons-material";
import { Chore } from "../store/useChoresStore";
import { DeleteConfirmModal } from "./DeleteConfirmModal";

interface ChoreCardProps {
  chore: Chore;
  onDelete: (id: string) => void;
  onComplete: (id: string) => void;
  onUncomplete: (id: string) => void;
}

export const ChoreCard: React.FC<ChoreCardProps> = ({
  chore,
  onDelete,
  onComplete,
  onUncomplete,
}) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const router = useRouter();
  const formatDate = (records: { date: string }[]) => {
    if (records.length === 0) return "未実施";
    // 最新の記録を取得
    const latestRecord = records.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )[0];
    const date = new Date(latestRecord.date);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")}`;
  };

  const isCompletedToday = () => {
    const today = new Date().toISOString().split("T")[0];
    return chore.records.some((record) => record.date === today);
  };

  const handleButtonClick = () => {
    if (isCompletedToday()) {
      onUncomplete(chore.id);
    } else {
      onComplete(chore.id);
    }
  };

  const handleDeleteClick = () => {
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    onDelete(chore.id);
    setDeleteModalOpen(false);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // ボタンやアイコンクリックの場合は無視
    const target = e.target as HTMLElement;
    if (target.closest("button") || target.closest('[role="button"]')) {
      return;
    }
    router.push(`/chores/${chore.id}`);
  };

  return (
    <>
      <Card
        sx={{ mb: 2, boxShadow: 2, cursor: "pointer" }}
        onClick={handleCardClick}
      >
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
              <Box
                sx={{
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  backgroundColor: chore.color,
                  mr: 2,
                  flexShrink: 0,
                }}
              />
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" component="h2" gutterBottom>
                  {chore.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  前回実施日: {formatDate(chore.records)}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <Button
                variant={isCompletedToday() ? "outlined" : "contained"}
                startIcon={<CheckCircleIcon />}
                onClick={handleButtonClick}
                size="small"
                color={isCompletedToday() ? "success" : "inherit"}
                sx={{
                  backgroundColor: isCompletedToday()
                    ? "transparent"
                    : "#9e9e9e",
                  color: isCompletedToday() ? "#2e7d32" : "white",
                  borderColor: isCompletedToday() ? "#2e7d32" : "transparent",
                  "&:hover": {
                    backgroundColor: isCompletedToday()
                      ? "rgba(46, 125, 50, 0.04)"
                      : "#757575",
                    borderColor: isCompletedToday() ? "#2e7d32" : "transparent",
                  },
                }}
              >
                {isCompletedToday() ? "完了済み" : "今日実施"}
              </Button>
              <IconButton
                onClick={handleDeleteClick}
                color="error"
                size="small"
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
        </CardContent>
      </Card>

      <DeleteConfirmModal
        open={deleteModalOpen}
        choreName={chore.name}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
};
