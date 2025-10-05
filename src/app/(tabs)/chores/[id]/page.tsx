"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Container,
  Typography,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Card,
  CardContent,
  Chip,
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { useChoresStore } from "@/store/useChoresStore";
import { DeleteConfirmModal } from "@/components/DeleteConfirmModal";
import { EditChoreModal } from "@/components/EditChoreModal";
import { ChoreCalendar } from "@/components/ChoreCalendar";

export function generateStaticParams() {
  return [];
}

export default function ChoreDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { chores, deleteChore, updateChore } = useChoresStore();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const chore = chores.find((c) => c.id === id);

  if (!chore) {
    return (
      <>
        <AppBar position="static" elevation={1}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => router.back()}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              家事詳細
            </Typography>
          </Toolbar>
        </AppBar>
        <Container maxWidth="md" sx={{ py: 3 }}>
          <Typography>家事が見つかりませんでした</Typography>
        </Container>
      </>
    );
  }

  const handleDelete = () => {
    deleteChore(id);
    setDeleteModalOpen(false);
    router.push("/chores");
  };

  const handleEditSave = (name: string, color: string) => {
    updateChore(id, name, color);
  };

  return (
    <>
      <AppBar position="static" elevation={1}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => router.back()}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            家事詳細
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ py: 3, pb: 10 }}>
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Box
                sx={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  backgroundColor: chore.color,
                  mr: 2,
                }}
              />
              <Typography variant="h5" sx={{ flexGrow: 1 }}>
                {chore.name}
              </Typography>
              <IconButton
                color="primary"
                onClick={() => setEditModalOpen(true)}
                size="large"
              >
                <EditIcon />
              </IconButton>
              <IconButton
                color="error"
                onClick={() => setDeleteModalOpen(true)}
                size="large"
              >
                <DeleteIcon />
              </IconButton>
            </Box>
            <Typography variant="body2" color="text.secondary">
              前回実施日:{" "}
              {chore.records.length > 0
                ? chore.records.sort(
                    (a, b) =>
                      new Date(b.date).getTime() - new Date(a.date).getTime()
                  )[0].date
                : "未実施"}
            </Typography>
          </CardContent>
        </Card>

        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              実施カレンダー
            </Typography>
            <Chip label={`実施回数: ${chore.records.length}回`} />
          </Box>
          <ChoreCalendar chore={chore} />
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          カレンダーの日付をタップして実施日を記録・削除できます
        </Typography>
      </Container>

      <DeleteConfirmModal
        open={deleteModalOpen}
        choreName={chore.name}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
      />

      <EditChoreModal
        open={editModalOpen}
        choreName={chore.name}
        choreColor={chore.color}
        onClose={() => setEditModalOpen(false)}
        onSave={handleEditSave}
      />
    </>
  );
}
