"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import { Close as CloseIcon, Check as CheckIcon } from "@mui/icons-material";

interface AddChoreModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (name: string, color: string) => void;
}

const colorOptions = [
  "#4caf50", // 緑
  "#2196f3", // 青
  "#ff9800", // オレンジ
  "#9c27b0", // 紫
  "#f44336", // 赤
  "#00bcd4", // シアン
];

export const AddChoreModal: React.FC<AddChoreModalProps> = ({
  open,
  onClose,
  onAdd,
}) => {
  const [choreName, setChoreName] = useState("");
  const [selectedColor, setSelectedColor] = useState(colorOptions[0]);

  const handleAdd = () => {
    if (choreName.trim()) {
      onAdd(choreName.trim(), selectedColor);
      setChoreName("");
      setSelectedColor(colorOptions[0]);
      onClose();
    }
  };

  const handleClose = () => {
    setChoreName("");
    setSelectedColor(colorOptions[0]);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        新しい家事を追加
        <IconButton onClick={handleClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            家事名
          </Typography>
          <TextField
            autoFocus
            placeholder="例: トイレ掃除"
            fullWidth
            variant="outlined"
            value={choreName}
            onChange={(e) => setChoreName(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleAdd();
              }
            }}
          />
        </Box>

        <Box>
          <Typography variant="subtitle1" gutterBottom>
            色を選択
          </Typography>
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            {colorOptions.map((color) => (
              <Box
                key={color}
                onClick={() => setSelectedColor(color)}
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  backgroundColor: color,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border:
                    selectedColor === color
                      ? "3px solid #000"
                      : "2px solid transparent",
                  transition: "border 0.2s ease",
                  "&:hover": {
                    transform: "scale(1.1)",
                  },
                }}
              >
                {selectedColor === color && (
                  <CheckIcon sx={{ color: "white", fontSize: 20 }} />
                )}
              </Box>
            ))}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button
          onClick={handleClose}
          color="inherit"
          variant="outlined"
          sx={{ mr: 1 }}
        >
          キャンセル
        </Button>
        <Button
          onClick={handleAdd}
          variant="contained"
          disabled={!choreName.trim()}
          sx={{ minWidth: 80 }}
        >
          追加
        </Button>
      </DialogActions>
    </Dialog>
  );
};
