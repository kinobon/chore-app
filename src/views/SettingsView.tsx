import React, { useState } from "react";
import { AppBar } from "../components/ui/AppBar";
import { Card } from "../components/ui/Card";
import { Modal } from "../components/ui/Modal";
import { Button } from "../components/ui/Button";
import { useChoresStore } from "@/store/useChoresStore";

export const SettingsView: React.FC = () => {
  const { exportData, importData, chores } = useChoresStore();
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [importText, setImportText] = useState("");
  const [snackbar, setSnackbar] = useState<{
    show: boolean;
    message: string;
    type: "success" | "error";
  }>({ show: false, message: "", type: "success" });

  const showSnackbar = (message: string, type: "success" | "error") => {
    setSnackbar({ show: true, message, type });
    setTimeout(
      () => setSnackbar({ show: false, message: "", type: "success" }),
      3000
    );
  };

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
    showSnackbar("データをエクスポートしました", "success");
  };

  const handleImport = () => {
    try {
      importData(importText);
      setImportModalOpen(false);
      setImportText("");
      showSnackbar("データをインポートしました", "success");
    } catch {
      showSnackbar("無効なJSONデータです", "error");
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
      showSnackbar("ファイルの読み込みに失敗しました", "error");
    };
    reader.readAsText(file);
    event.target.value = "";
  };

  const handleDeleteAll = () => {
    importData(JSON.stringify({ chores: [] }));
    setDeleteModalOpen(false);
    showSnackbar("すべてのデータを削除しました", "success");
  };

  return (
    <div className="flex flex-col h-full">
      <AppBar title="設定" />

      <div className="flex-1 overflow-y-auto px-4 pt-4">
        <div className="mb-6">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 px-2">
            データ管理
          </h3>
          <Card className="divide-y">
            <button
              onClick={() => setExportModalOpen(true)}
              className="w-full p-4 flex items-center hover:bg-gray-50 transition-colors"
            >
              <svg
                className="w-6 h-6 text-primary mr-3"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z" />
              </svg>
              <div className="flex-1 text-left">
                <div className="font-medium">データをエクスポート</div>
                <div className="text-sm text-gray-500">
                  家事データをJSONファイルとして保存
                </div>
              </div>
              <svg
                className="w-5 h-5 text-gray-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
              </svg>
            </button>

            <button
              onClick={() => setImportModalOpen(true)}
              className="w-full p-4 flex items-center hover:bg-gray-50 transition-colors"
            >
              <svg
                className="w-6 h-6 text-primary mr-3"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M9 16h6v-6h4l-7-7-7 7h4v6zm-4 2h14v2H5v-2z" />
              </svg>
              <div className="flex-1 text-left">
                <div className="font-medium">データをインポート</div>
                <div className="text-sm text-gray-500">
                  JSONファイルから家事データを復元
                </div>
              </div>
              <svg
                className="w-5 h-5 text-gray-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
              </svg>
            </button>
          </Card>
        </div>

        <div className="mb-6">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 px-2">
            危険な操作
          </h3>
          <Card>
            <button
              onClick={() => setDeleteModalOpen(true)}
              className="w-full p-4 flex items-center hover:bg-gray-50 transition-colors"
            >
              <svg
                className="w-6 h-6 text-error mr-3"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
              </svg>
              <div className="flex-1 text-left">
                <div className="font-medium text-error">
                  すべてのデータを削除
                </div>
                <div className="text-sm text-gray-500">
                  家事データをすべて削除します
                </div>
              </div>
              <svg
                className="w-5 h-5 text-gray-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
              </svg>
            </button>
          </Card>
        </div>

        <div className="mb-6">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 px-2">
            アプリについて
          </h3>
          <Card className="divide-y">
            <div className="p-4 flex justify-between">
              <div className="font-medium">アプリ名</div>
              <div className="text-gray-500">家事管理アプリ</div>
            </div>
            <div className="p-4 flex justify-between">
              <div className="font-medium">バージョン</div>
              <div className="text-gray-500">1.0.0</div>
            </div>
          </Card>
        </div>
      </div>

      {/* エクスポートモーダル */}
      <Modal
        isOpen={exportModalOpen}
        onClose={() => setExportModalOpen(false)}
        title="データをエクスポート"
        footer={
          <div className="flex justify-end gap-2">
            <Button
              variant="secondary"
              onClick={() => setExportModalOpen(false)}
            >
              キャンセル
            </Button>
            <Button variant="primary" onClick={handleExport}>
              エクスポート
            </Button>
          </div>
        }
      >
        <p>
          現在の家事データ（{chores.length}
          件）をJSONファイルとして保存しますか？
        </p>
      </Modal>

      {/* インポートモーダル */}
      <Modal
        isOpen={importModalOpen}
        onClose={() => setImportModalOpen(false)}
        title="データをインポート"
        footer={
          <div className="flex justify-end gap-2">
            <Button
              variant="secondary"
              onClick={() => {
                setImportModalOpen(false);
                setImportText("");
              }}
            >
              キャンセル
            </Button>
            <Button
              variant="primary"
              onClick={handleImport}
              disabled={!importText.trim()}
            >
              インポート
            </Button>
          </div>
        }
      >
        <div className="space-y-3">
          <div className="bg-yellow-50 border border-yellow-200 rounded p-3 text-sm text-yellow-800">
            インポートすると現在のデータは上書きされます
          </div>

          <div>
            <input
              type="file"
              accept="application/json,.json"
              id="file-upload"
              className="hidden"
              onChange={handleFileUpload}
            />
            <label htmlFor="file-upload" className="block w-full mb-2">
              <Button
                variant="secondary"
                className="w-full"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("file-upload")?.click();
                }}
              >
                ファイルを選択
              </Button>
            </label>
            <p className="text-sm text-gray-500 text-center mb-2">
              または直接JSONを貼り付け
            </p>
          </div>

          <textarea
            className="w-full h-40 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-mono text-sm"
            placeholder='{"chores": [...]}'
            value={importText}
            onChange={(e) => setImportText(e.target.value)}
          />
        </div>
      </Modal>

      {/* 削除確認モーダル */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="すべてのデータを削除"
        footer={
          <div className="flex justify-end gap-2">
            <Button
              variant="secondary"
              onClick={() => setDeleteModalOpen(false)}
            >
              キャンセル
            </Button>
            <Button variant="error" onClick={handleDeleteAll}>
              削除
            </Button>
          </div>
        }
      >
        <div className="space-y-3">
          <div className="bg-red-50 border border-red-200 rounded p-3 text-sm text-red-800">
            この操作は取り消せません
          </div>
          <p>
            すべての家事データ（{chores.length}件）と実施記録を削除しますか？
          </p>
        </div>
      </Modal>

      {/* スナックバー */}
      {snackbar.show && (
        <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-50">
          <div
            className={`px-6 py-3 rounded-lg shadow-lg ${
              snackbar.type === "success"
                ? "bg-success text-white"
                : "bg-error text-white"
            }`}
          >
            {snackbar.message}
          </div>
        </div>
      )}
    </div>
  );
};
