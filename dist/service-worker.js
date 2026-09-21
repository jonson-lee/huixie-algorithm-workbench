const CACHE_NAME = "huixie-shell-v23";
const CORE_ASSETS = ["./", "./index.html", "./styles.css?v=9", "./curated-problems.js?v=3", "./storage.js?v=2", "./app.js?v=17", "./judge.js?v=2", "./pyodide-worker.js?v=6", "./fonts/SmileySans-Oblique.woff2", "./fonts/OFL.txt", "./CONTENT_NOTICE.txt", "./THIRD_PARTY_NOTICES.txt"];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET" || new URL(event.request.url).origin !== self.location.origin) return;

  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .then(async (response) => {
          if (response.ok) {
            const copy = response.clone();
            const cache = await caches.open(CACHE_NAME);
            await cache.put("./index.html", copy);
          }
          return response;
        })
        .catch(() => caches.match("./index.html"))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request).then(async (response) => {
      if (response.ok) {
        const copy = response.clone();
        const cache = await caches.open(CACHE_NAME);
        await cache.put(event.request, copy);
      }
      return response;
    }))
  );
});
