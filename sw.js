// 定義緩存名稱
const CACHE_NAME = "pwa";

// 離線使用
self.addEventListener("install", (event) => {
  // 跳過等待
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      //  在安裝 Service Worker 時，將相關資源進行緩存
      cache.addAll(["images/epay.png", "custom404.html", "/", "index.html"]);
    })
  );
});

// 網路層攔截response為404的頁面
self.addEventListener("fetch", (event) => {
  return event.respondWith(
    fetch(event.request)
      .then((res) => {
        if (event.request.mode == "navigate" && res.status == 404) {
          return fetch("custom404.html");
        }
        return res;
      })
      // 離線狀態下的處理
      .catch(() => {
        return caches.open(CACHE_NAME).then((cache) => {
          // 從 Cache 裡取資源
          return cache.match(event.request).then((response) => {
            if (response) return response;
            return cache.match("custom404.html");
          });
        });
      })
  );
});

// 立即受控
self.addEventListener("activate", (event) => clients.claim());
