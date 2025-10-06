# GitHub Pages 404エラーの修正

## 問題

GitHub Pagesにデプロイ後、404エラーが発生していました:

```
404
File not found

The site configured at this address does not contain the requested file.
```

## 原因

1. **Jekyllの処理**: GitHub PagesはデフォルトでJekyllを使用してサイトをビルドします。Jekyllは`_`で始まるファイルやディレクトリを無視するため、Viteが生成した`_app`などのファイルがアクセスできませんでした。

2. **SPAルーティング**: シングルページアプリケーション（SPA）では、クライアントサイドルーティングを使用しますが、GitHub Pagesは静的ファイルのみを提供するため、リロード時に404エラーが発生する可能性があります。

## 解決策

### 1. `.nojekyll` ファイルの追加

`public/.nojekyll` ファイルを作成してJekyllの処理を無効にしました。このファイルは空のファイルで、Jekyllによる処理をスキップするようGitHub Pagesに指示します。

```bash
touch public/.nojekyll
```

### 2. `404.html` の追加

SPAのルーティングに対応するため、`public/404.html` を作成しました。このファイルは、存在しないパスにアクセスされた場合にルートにリダイレクトします。

```html
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <script>
      // GitHub Pages SPAハック
      // 404ページから実際のページにリダイレクト
      sessionStorage.redirect = location.href;
    </script>
    <meta http-equiv="refresh" content="0;URL='/chore-app/'">
  </head>
  <body>
  </body>
</html>
```

### 3. `index.html` の修正

リダイレクト処理を`index.html`に追加して、404ページからのリダイレクトを処理します。

```html
<script>
  // GitHub Pages SPAハック - 404ページからのリダイレクトを処理
  (function() {
    var redirect = sessionStorage.redirect;
    delete sessionStorage.redirect;
    if (redirect && redirect !== location.href) {
      history.replaceState(null, null, redirect);
    }
  })();
</script>
```

## 動作確認

### ビルド時の確認

```bash
NODE_ENV=production pnpm build
ls -la dist/ | grep -E "(404|nojekyll)"
```

以下のファイルがdistディレクトリに存在することを確認:
- `.nojekyll`
- `404.html`

### デプロイ後の確認

1. GitHub Actionsのワークフローが正常に完了することを確認
2. https://kinobon.github.io/chore-app/ にアクセスして動作を確認
3. ページリロードが正常に動作することを確認

## 追加の注意事項

### ベースパスの設定

`vite.config.ts` でベースパスが正しく設定されていることを確認:

```typescript
base: process.env.NODE_ENV === "production" ? "/chore-app/" : "/",
```

### GitHub Pagesの設定

GitHubリポジトリの設定で、GitHub Pagesが有効になっていることを確認:
1. Settings → Pages
2. Source: GitHub Actions
3. Custom domain: (設定している場合)

## トラブルシューティング

### まだ404エラーが発生する場合

1. **キャッシュをクリア**: ブラウザのキャッシュをクリアして再度アクセス
2. **GitHub Actionsのログを確認**: エラーがないか確認
3. **デプロイされたファイルを確認**: `.nojekyll`と`404.html`が含まれているか確認

### アセットが読み込まれない場合

1. ブラウザの開発者ツールでネットワークタブを確認
2. アセットのパスが正しく `/chore-app/` から始まっているか確認
3. `vite.config.ts` の `base` 設定を再確認

## 参考リンク

- [GitHub Pages and Single Page Apps](https://github.com/rafgraph/spa-github-pages)
- [Vite - Static Deploy](https://vitejs.dev/guide/static-deploy.html)
- [GitHub Pages - Bypassing Jekyll](https://github.blog/2009-12-29-bypassing-jekyll-on-github-pages/)

---

修正日: 2025-10-07
