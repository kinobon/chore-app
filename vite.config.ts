import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === "production" ? "/chore-app/" : "/",
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      devOptions: {
        enabled: true
      },
      manifest: {
        name: "家事管理アプリ",
        short_name: "家事管理",
        description: "家事の管理と実施記録アプリ",
        theme_color: "#2196f3",
        background_color: "#ffffff",
        display: "standalone",
        orientation: "portrait",
        start_url: "/chore-app/",
        scope: "/chore-app/",
        icons: [
          {
            src: "/chore-app/manifest-icon-192.maskable.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any"
          },
          {
            src: "/chore-app/manifest-icon-192.maskable.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable"
          },
          {
            src: "/chore-app/manifest-icon-512.maskable.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any"
          },
          {
            src: "/chore-app/manifest-icon-512.maskable.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable"
          },
          {
            src: "/chore-app/apple-icon-180.png",
            sizes: "180x180",
            type: "image/png"
          },
          {
            src: "/chore-app/favicon-196.png",
            sizes: "196x196",
            type: "image/png"
          }
        ],
      },
      includeAssets: [
        "favicon.ico",
        "apple-icon-180.png",
        "favicon-196.png",
        "manifest-icon-192.maskable.png",
        "manifest-icon-512.maskable.png",
        "apple-splash-*.jpg"
      ],
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,jpg}"],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1年
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
