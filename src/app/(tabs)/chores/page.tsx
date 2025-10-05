"use client";

import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Fab,
  AppBar,
  Toolbar,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { useChoresStore } from "@/store/useChoresStore";
import { ChoreCard } from "@/components/ChoreCard";
import { AddChoreModal } from "@/components/AddChoreModal";

export default function ChoresPage() {
  const {
    chores,
    addChore,
    updateChore,
    deleteChore,
    completeChore,
    uncompleteChore,
  } = useChoresStore();
  const [modalOpen, setModalOpen] = useState(false);

  const handleAddChore = (name: string, color: string) => {
    addChore(name, color);
  };

  return (
    <>
      <AppBar position="static" elevation={1}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            家事一覧
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ py: 3, pb: 10 }}>
        <Box sx={{ mb: 3 }}>
          {chores.length === 0 ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "50vh",
                textAlign: "center",
              }}
            >
              <Typography variant="h6" color="text.secondary" gutterBottom>
                家事が登録されていません
              </Typography>
              <Typography variant="body2" color="text.secondary">
                右下の + ボタンから家事を追加してください
              </Typography>
            </Box>
          ) : (
            chores.map((chore) => (
              <ChoreCard
                key={chore.id}
                chore={chore}
                onDelete={deleteChore}
                onComplete={completeChore}
                onUncomplete={uncompleteChore}
                onUpdate={updateChore}
              />
            ))
          )}
        </Box>
      </Container>

      <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: "fixed",
          bottom: 80,
          right: 24,
        }}
        onClick={() => setModalOpen(true)}
      >
        <AddIcon />
      </Fab>

      <AddChoreModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={handleAddChore}
      />
    </>
  );
}
