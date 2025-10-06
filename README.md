# 家事管理アプリ

家事の管理と実施記録を行うウェブアプリケーションです。

**Note: このプロジェクトはNext.jsからVite + Reactに移行されました。**  
詳細は[README_JP.md](./README_JP.md)と[MIGRATION_SUMMARY.md](./MIGRATION_SUMMARY.md)を参照してください。

## 特徴

- 🚀 **Vite**: 高速な開発サーバーとビルド
- ⚛️ **React 19**: 最新のReactを使用
- 🎨 **Tailwind CSS**: ユーティリティファーストのCSSフレームワーク
- 🗃️ **Zustand**: シンプルで軽量な状態管理
- �� **PWA対応**: オフラインでも動作可能
- 🎯 **単一ルート**: パスベースのルーティングなし、全てZustandで管理

## セットアップ

### 依存関係のインストール

\`\`\`bash
pnpm install
\`\`\`

### 開発サーバーの起動

\`\`\`bash
pnpm dev
\`\`\`

http://localhost:5173 でアプリが起動します。

### ビルド

\`\`\`bash
pnpm build
\`\`\`

### プレビュー

\`\`\`bash
pnpm preview
\`\`\`

## 機能

- ✅ 家事の登録・編集・削除
- ✅ 日々の実施記録（チェックイン）
- ✅ カレンダービューで実施状況の可視化
- ✅ データのバックアップ・復元（JSON）
- ✅ PWA対応（オフラインでも動作可能）
- ✅ レスポンシブデザイン（モバイルフレンドリー）

## 技術スタック

- **フレームワーク**: Vite + React 19
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **状態管理**: Zustand (with persist middleware)
- **PWA**: vite-plugin-pwa
- **パッケージマネージャー**: pnpm

## プロジェクト構造

\`\`\`
src/
├── components/          # 再利用可能なコンポーネント
│   ├── ui/             # UIコンポーネント（Button, Modal, Card等）
│   ├── ChoreCard.tsx
│   ├── ChoreCalendar.tsx
│   └── ...
├── store/              # Zustandストア
│   ├── useChoresStore.ts
│   └── useUIStore.ts
├── views/              # ビュー（ページ）コンポーネント
│   ├── ChoresView.tsx
│   ├── CalendarView.tsx
│   ├── SettingsView.tsx
│   └── ChoreDetailView.tsx
└── App.tsx             # メインアプリコンポーネント
\`\`\`

## ライセンス

MIT
