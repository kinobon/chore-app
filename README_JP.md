# 家事管理アプリ (Vite版)

Next.jsで実装された家事管理アプリをVite + React + TailwindCSSで移植したバージョンです。

## 特徴

- 🚀 **Vite**: 高速な開発サーバーとビルド
- ⚛️ **React 19**: 最新のReactを使用
- 🎨 **Tailwind CSS**: ユーティリティファーストのCSSフレームワーク
- 🗃️ **Zustand**: シンプルで軽量な状態管理
- 📱 **PWA対応**: オフラインでも動作可能
- 🎯 **単一ルート**: パスベースのルーティングなし、全てZustandで管理

## 機能

- ✅ 家事の登録・編集・削除
- ✅ 日々の実施記録（チェックイン）
- ✅ カレンダービューで実施状況の可視化
- ✅ データのバックアップ・復元（JSON）
- ✅ PWA対応（オフラインでも動作可能）
- ✅ レスポンシブデザイン（モバイルフレンドリー）

## セットアップ

### 依存関係のインストール

```bash
pnpm install
```

### 開発サーバーの起動

```bash
pnpm dev
```

http://localhost:5173 でアプリが起動します。

### ビルド

```bash
pnpm build
```

### プレビュー

```bash
pnpm preview
```

## プロジェクト構造

```
src/
├── components/          # 再利用可能なコンポーネント
│   ├── ui/             # UIコンポーネント（Button, Modal, Card等）
│   ├── ChoreCard.tsx
│   ├── ChoreCalendar.tsx
│   ├── AddChoreModal.tsx
│   ├── EditChoreModal.tsx
│   └── DeleteConfirmModal.tsx
├── store/              # Zustandストア
│   ├── useChoresStore.ts  # 家事データの状態管理
│   └── useUIStore.ts      # UIビューの状態管理
├── views/              # ビュー（ページ）コンポーネント
│   ├── ChoresView.tsx     # 家事一覧
│   ├── CalendarView.tsx   # カレンダー
│   ├── SettingsView.tsx   # 設定
│   └── ChoreDetailView.tsx # 家事詳細
├── App.tsx             # メインアプリコンポーネント
├── main.tsx            # エントリーポイント
└── index.css           # グローバルスタイル
```

## 技術スタック

- **フレームワーク**: Vite + React 19
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **状態管理**: Zustand (with persist middleware)
- **PWA**: vite-plugin-pwa
- **パッケージマネージャー**: pnpm

## 移植のポイント

### Next.jsからの主な変更点

1. **ルーティング**: 
   - Next.jsのファイルベースルーティング → Zustandによる状態管理
   - `useUIStore`で現在のビューを管理

2. **スタイリング**: 
   - Material-UI → Tailwind CSS
   - すべてのコンポーネントを自前実装

3. **PWA対応**: 
   - Next.jsのPWA設定 → vite-plugin-pwa

4. **データ永続化**: 
   - 両方ともZustandのpersistミドルウェアを使用（互換性あり）

## データ形式

データはLocalStorageに`chores-storage`キーで保存されます。

```json
{
  "chores": [
    {
      "id": "uuid",
      "name": "トイレ掃除",
      "color": "#4caf50",
      "records": [
        { "date": "2025-10-01" },
        { "date": "2025-10-05" }
      ]
    }
  ]
}
```

## ライセンス

MIT
