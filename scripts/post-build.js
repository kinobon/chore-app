const fs = require("fs");
const path = require("path");

// GitHub Pages のクライアントサイドルーティング用に 404.html を作成
const outDir = path.join(__dirname, "..", "out");
const indexPath = path.join(outDir, "index.html");
const notFoundPath = path.join(outDir, "404.html");

if (fs.existsSync(indexPath)) {
  fs.copyFileSync(indexPath, notFoundPath);
  console.log("✓ Created 404.html for GitHub Pages client-side routing");
}
