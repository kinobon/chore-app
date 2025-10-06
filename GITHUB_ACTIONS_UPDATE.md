# GitHub Actions 更新完了

## 変更内容

### .github/workflows/deploy.yml

#### 更新箇所

1. **pnpmバージョンの更新**
   - `pnpm/action-setup@v3` → `pnpm/action-setup@v4`
   - バージョン: `8` → `10`

2. **ビルド出力ディレクトリの変更**
   - Next.js: `./out` → Vite: `./dist`
   - `Upload artifact` ステップの `path` を更新

### vite.config.ts

#### ベースパスの設定

```typescript
base: process.env.NODE_ENV === "production" ? "/chore-app/" : "/",
```

GitHub Pagesでは、リポジトリ名がURLパスの一部になるため、本番環境では `/chore-app/` をベースパスとして設定しました。

開発環境では `/` のままなので、ローカル開発には影響しません。

## デプロイフロー

1. **main** ブランチにプッシュ
2. GitHub Actions が自動的にトリガー
3. ビルドジョブ実行:
   - Node.js 20のセットアップ
   - pnpm 10のインストール
   - 依存関係のキャッシュと復元
   - `pnpm install`
   - `pnpm build` (NODE_ENV=production)
   - `dist/` ディレクトリをアーティファクトとしてアップロード
4. デプロイジョブ実行:
   - GitHub Pagesへデプロイ

## デプロイURL

デプロイ後、以下のURLでアクセス可能:
```
https://kinobon.github.io/chore-app/
```

## 確認事項

✅ ビルド出力ディレクトリが `dist/` に変更されている  
✅ ベースパスが `/chore-app/` に設定されている  
✅ pnpmバージョンが 10 に更新されている  
✅ 本番ビルドが正常に動作する  
✅ アセットパスが正しく `/chore-app/` から始まっている

## ローカルでの本番ビルドテスト

```bash
# 本番環境用ビルド
NODE_ENV=production pnpm build

# プレビュー（ベースパスを考慮）
pnpm preview
```

## トラブルシューティング

### 404エラーが発生する場合

ベースパスの設定を確認してください:
- `vite.config.ts` の `base` 設定
- GitHub Pagesの設定（Settings > Pages）

### アセットが読み込まれない場合

ビルド時に `NODE_ENV=production` が設定されていることを確認してください。

## 次のステップ

1. ローカルでテスト完了後、プッシュ:
   ```bash
   git push origin main
   ```

2. GitHub Actionsのログを確認:
   - https://github.com/kinobon/chore-app/actions

3. デプロイが完了したらアプリにアクセス:
   - https://kinobon.github.io/chore-app/

---

更新日: 2025-10-07
