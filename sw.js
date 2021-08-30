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

// // 自定義安裝時機
// // 0.捕獲安裝題提示事件
// var installPromptEvent = null;
// window.addEventListener("beforeinstallprompt", (event) => {
//   event.preventDefault(); //Chrome <= 67 可以阻止顯示
//   installPromptEvent = event; // 拿到事件的引用
//   document.querySelector("#btn-install").disabled = false;
//   //更新安裝UI，通知用戶可以安裝
// });

// // 1.顯示prompt 對話框
// document.querySelector("#btn-install").addEventListener("click", () => {
//   if (!installPromptEvent) return;
// });
// installPromptEvent.prompt();
// installPromptEvent.userChoice.then((choiceResult) => {
//   if (choiceResult.outcome == "accepted") {
//     console.log("用戶已同意添加到桌面");
//   } else {
//     console.log("用戶已取消添加到桌面");
//   }
// });

// // 2.已安裝事件處理
// window.addEventListener("appintstalled", (evt) => {
//   console.log("已安裝到桌面屏幕");
// });

// // 3.環境判斷
// if (window.matchMedia("(display-mode:standalone)").matches) {
//   console.log("display-mode 是 standalone");
// }
