"use client";

import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Divider,
  Alert,
  Snackbar,
} from "@mui/material";
import {
  CloudUpload as CloudUploadIcon,
  CloudDownload as CloudDownloadIcon,
  DeleteSweep as DeleteSweepIcon,
  ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";
import { useChoresStore } from "@/store/useChoresStore";

export default function SettingsPage() {
  const { exportData, importData, chores } = useChoresStore();
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [importText, setImportText] = useState("");
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });

  const handleExport = () => {
    const data = exportData();
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `chore_backup_${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setExportModalOpen(false);
    setSnackbar({
      open: true,
      message: "データをエクスポートしました",
      severity: "success",
    });
  };

  const handleImport = () => {
    try {
      importData(importText);
      setImportModalOpen(false);
      setImportText("");
      setSnackbar({
        open: true,
        message: "データをインポートしました",
        severity: "success",
      });
    } catch {
      setSnackbar({
        open: true,
        message: "無効なJSONデータです",
        severity: "error",
      });
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      setImportText(text);
    };
    reader.onerror = () => {
      setSnackbar({
        open: true,
        message: "ファイルの読み込みに失敗しました",
        severity: "error",
      });
    };
    reader.readAsText(file);
    // input要素をリセット（同じファイルを再度選択可能にする）
    event.target.value = "";
  };

  const handleDeleteAll = () => {
    importData(JSON.stringify({ chores: [] }));
    setDeleteModalOpen(false);
    setSnackbar({
      open: true,
      message: "すべてのデータを削除しました",
      severity: "success",
    });
  };

  return (
    <>
      <AppBar position="static" elevation={1}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            設定
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ py: 3, pb: 10 }}>
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="overline"
            color="text.secondary"
            sx={{ px: 2, display: "block", mb: 1 }}
          >
            データ管理
          </Typography>
          <List sx={{ bgcolor: "background.paper", borderRadius: 1 }}>
            <ListItem disablePadding>
              <ListItemButton onClick={() => setExportModalOpen(true)}>
                <ListItemIcon>
                  <CloudUploadIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="データをエクスポート"
                  secondary="家事データをJSONファイルとして保存"
                />
                <ChevronRightIcon />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding>
              <ListItemButton onClick={() => setImportModalOpen(true)}>
                <ListItemIcon>
                  <CloudDownloadIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="データをインポート"
                  secondary="JSONファイルから家事データを復元"
                />
                <ChevronRightIcon />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography
            variant="overline"
            color="text.secondary"
            sx={{ px: 2, display: "block", mb: 1 }}
          >
            危険な操作
          </Typography>
          <List sx={{ bgcolor: "background.paper", borderRadius: 1 }}>
            <ListItem disablePadding>
              <ListItemButton onClick={() => setDeleteModalOpen(true)}>
                <ListItemIcon>
                  <DeleteSweepIcon color="error" />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography color="error">すべてのデータを削除</Typography>
                  }
                  secondary="家事データをすべて削除します"
                />
                <ChevronRightIcon />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography
            variant="overline"
            color="text.secondary"
            sx={{ px: 2, display: "block", mb: 1 }}
          >
            アプリについて
          </Typography>
          <List sx={{ bgcolor: "background.paper", borderRadius: 1 }}>
            <ListItem>
              <ListItemText primary="アプリ名" secondary="家事管理アプリ" />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary="バージョン" secondary="1.0.0" />
            </ListItem>
          </List>
        </Box>
      </Container>

      {/* エクスポートモーダル */}
      <Dialog open={exportModalOpen} onClose={() => setExportModalOpen(false)}>
        <DialogTitle>データをエクスポート</DialogTitle>
        <DialogContent>
          <Typography>
            現在の家事データ（{chores.length}
            件）をJSONファイルとして保存しますか？
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={() => setExportModalOpen(false)} color="inherit">
            キャンセル
          </Button>
          <Button onClick={handleExport} variant="contained">
            エクスポート
          </Button>
        </DialogActions>
      </Dialog>

      {/* インポートモーダル */}
      <Dialog
        open={importModalOpen}
        onClose={() => setImportModalOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>データをインポート</DialogTitle>
        <DialogContent>
          <Alert severity="warning" sx={{ mb: 2 }}>
            インポートすると現在のデータは上書きされます
          </Alert>

          <Box sx={{ mb: 2 }}>
            <Button
              variant="outlined"
              component="label"
              fullWidth
              startIcon={<CloudDownloadIcon />}
              sx={{ mb: 2 }}
            >
              ファイルを選択
              <input
                type="file"
                accept="application/json,.json"
                hidden
                onChange={handleFileUpload}
              />
            </Button>
            <Typography variant="body2" color="text.secondary" align="center">
              または直接JSONを貼り付け
            </Typography>
          </Box>

          <TextField
            multiline
            rows={10}
            fullWidth
            placeholder='{"chores": [...]}'
            value={importText}
            onChange={(e) => setImportText(e.target.value)}
            variant="outlined"
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button
            onClick={() => {
              setImportModalOpen(false);
              setImportText("");
            }}
            color="inherit"
          >
            キャンセル
          </Button>
          <Button
            onClick={handleImport}
            variant="contained"
            disabled={!importText.trim()}
          >
            インポート
          </Button>
        </DialogActions>
      </Dialog>

      {/* 削除確認モーダル */}
      <Dialog open={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
        <DialogTitle>すべてのデータを削除</DialogTitle>
        <DialogContent>
          <Alert severity="error" sx={{ mb: 2 }}>
            この操作は取り消せません
          </Alert>
          <Typography>
            すべての家事データ（{chores.length}件）と実施記録を削除しますか？
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={() => setDeleteModalOpen(false)} color="inherit">
            キャンセル
          </Button>
          <Button onClick={handleDeleteAll} variant="contained" color="error">
            削除
          </Button>
        </DialogActions>
      </Dialog>

      {/* スナックバー */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
