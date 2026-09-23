/* 스케줄러 서비스 워커
   전략: 네트워크 우선(network-first). 온라인이면 항상 최신을 보여주고,
   오프라인일 때만 캐시로 대체 → 업데이트가 즉시 반영되면서 오프라인도 지원. */
const CACHE = "scheduler-cache-v16";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-512-maskable.png",
];

self.addEventListener("install", (e) => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).catch(() => {}));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// 알림(윈도우 팝업) 클릭/액션 처리 — 확인은 닫기, 30분/1시간은 페이지에 스누즈 요청
self.addEventListener("notificationclick", (e) => {
  const n = e.notification; const act = e.action; n.close();
  e.waitUntil(self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((cs) => {
    if (act === "s30" || act === "s60") {
      const minutes = act === "s30" ? 30 : 60;
      cs.forEach((c) => c.postMessage({ type: "snooze", minutes, data: n.data || {} }));
    } else if (cs[0]) {
      cs[0].focus();
    }
  }));
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  // 같은 출처만 처리 (구글 폰트 등 교차출처는 브라우저 기본 처리)
  const sameOrigin = new URL(req.url).origin === self.location.origin;
  if (!sameOrigin) return;

  e.respondWith(
    fetch(req)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
        return res;
      })
      .catch(() =>
        caches.match(req).then((hit) => hit || (req.mode === "navigate" ? caches.match("./index.html") : undefined))
      )
  );
});
