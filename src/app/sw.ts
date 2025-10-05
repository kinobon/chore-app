import { defaultCache } from "@serwist/next/worker";
import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";
import { Serwist } from "serwist";

// This declares the value of `injectionPoint` to TypeScript.
// `injectionPoint` is the string that will be replaced by the
// actual precache manifest. By default, this string is set to
// `"self.__SW_MANIFEST"`.
declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: defaultCache,
});

serwist.addEventListeners();

// クライアントサイドルーティングのサポート
// オフライン時に動的ルートにアクセスした場合、index.htmlを返す
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // ナビゲーションリクエスト（ページ遷移）の場合
  if (request.mode === "navigate") {
    // 動的ルート（/chores/detail など）へのアクセスを index.html にフォールバック
    event.respondWith(
      fetch(request).catch(() => {
        return caches.match("/index.html").then((response) => {
          return response || fetch("/index.html");
        });
      })
    );
  }
});
