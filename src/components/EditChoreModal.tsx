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
} from "@mui/material";

const colors = [
  "#4CAF50",
  "#2196f3",
  "#ff9800",
  "#9c27b0",
  "#f44336",
  "#00bcd4",
];

interface EditChoreModalProps {
  open: boolean;
  choreName: string;
  choreColor: string;
  onClose: () => void;
  onSave: (name: string, color: string) => void;
}

export const EditChoreModal: React.FC<EditChoreModalProps> = ({
  open,
  choreName,
  choreColor,
  onClose,
  onSave,
}) => {
  const [name, setName] = useState(choreName);
  const [selectedColor, setSelectedColor] = useState(choreColor);

  // モーダルが開いたときに初期値をリセット
  React.useEffect(() => {
    if (open) {
      setName(choreName);
      setSelectedColor(choreColor);
    }
  }, [open, choreName, choreColor]);

  const handleSave = () => {
    if (name.trim()) {
      onSave(name.trim(), selectedColor);
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>家事を編集</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="家事名"
          type="text"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSave();
            }
          }}
        />
        <Box sx={{ mt: 2 }}>
          <Box sx={{ mb: 1, fontSize: "0.875rem", color: "text.secondary" }}>
            色を選択
          </Box>
          <Box sx={{ display: "flex", gap: 1 }}>
            {colors.map((color) => (
              <Box
                key={color}
                onClick={() => setSelectedColor(color)}
                sx={{
                  width: 40,
                  height: 40,
                  backgroundColor: color,
                  borderRadius: "50%",
                  cursor: "pointer",
                  border:
                    selectedColor === color
                      ? "3px solid #000"
                      : "3px solid transparent",
                  transition: "all 0.2s",
                  "&:hover": {
                    transform: "scale(1.1)",
                  },
                }}
              />
            ))}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>キャンセル</Button>
        <Button
          onClick={handleSave}
          variant="contained"
          disabled={!name.trim()}
        >
          保存
        </Button>
      </DialogActions>
    </Dialog>
  );
};
