# PWA Icons

このディレクトリにPWAアイコンを配置してください。

必要なファイル:
- pwa-192x192.png (192x192px)
- pwa-512x512.png (512x512px)
- apple-touch-icon.png (180x180px)
- favicon.ico

アイコンは家事管理アプリをイメージしたデザインで、
背景色は #2196f3 (青) を使用することを推奨します。

一時的に、以下のコマンドでプレースホルダーを作成できます:
```bash
# ImageMagickがインストールされている場合
convert -size 192x192 xc:#2196f3 pwa-192x192.png
convert -size 512x512 xc:#2196f3 pwa-512x512.png
convert -size 180x180 xc:#2196f3 apple-touch-icon.png
```
