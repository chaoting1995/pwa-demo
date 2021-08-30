// 網路層攔截圖片
self.addEventListener("fetch", (event) => {
  if (/epay\.png$/.test(event.request.url)) {
    return event.respondWith(fetch("images/epay-girl.svg"));
  }
});
// 剛修改完 sw.js
// 第一次刷新，用於註冊修改後的新sw.js
// 完成註冊後，圖片的request已經結束，pwa也就無法攔截圖片的request
// 第二次刷新，方能攔截成功

// ----------------------------------------------
// 網路層攔截response為404的頁面
self.addEventListener("fetch", (event) => {
  if (event.request.mode == "navigate") {
    return event.respondWith(
      fetch(event.request).then((res) => {
        if (res.status == 404) return fetch("custom404.html");
        return res;
      })
    );
  }
});
// 剛修改完 sw.js
// 第一次刷新，用於註冊修改後的新sw.js
// 完成註冊後，404.html的request已經結束，pwa也就無法攔截 404.html
// 第二次刷新，方能攔截成功
