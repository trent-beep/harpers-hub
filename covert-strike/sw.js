/* Covert Strike service worker — offline + installable. Bump CACHE on new builds. */
const CACHE = 'covert-strike-v2';
const CORE = ['./','./index.html','./manifest.webmanifest','./icon-180.png','./icon-192.png','./icon-512.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys()
    .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  if (req.mode === 'navigate' || req.destination === 'document') {
    e.respondWith(fetch(req)
      .then((res) => { const c = res.clone(); caches.open(CACHE).then((k) => k.put(req, c)).catch(() => {}); return res; })
      .catch(() => caches.match(req).then((m) => m || caches.match('./index.html'))));
    return;
  }
  e.respondWith(caches.match(req).then((hit) => {
    const net = fetch(req)
      .then((res) => { const c = res.clone(); caches.open(CACHE).then((k) => k.put(req, c)).catch(() => {}); return res; })
      .catch(() => hit);
    return hit || net;
  }));
});
