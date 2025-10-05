"use client";

import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

interface DeleteConfirmModalProps {
  open: boolean;
  choreName: string;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  open,
  choreName,
  onClose,
  onConfirm,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>家事を削除</DialogTitle>
      <DialogContent>
        <Typography>「{choreName}」を削除しますか？</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          記録も全て削除されます。
        </Typography>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button
          onClick={onClose}
          color="inherit"
          variant="outlined"
          sx={{ mr: 1 }}
        >
          キャンセル
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          color="error"
          sx={{ minWidth: 80 }}
        >
          削除
        </Button>
      </DialogActions>
    </Dialog>
  );
};
