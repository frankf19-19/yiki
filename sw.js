/* 憶起玩 Yiki — service worker（離線快取） */
const BUILD = '2.46.0';
const CACHE = 'yiki-' + BUILD;
const ASSETS = ['./', './index.html', './privacy.html', './manifest.json', './manifest.zh-TW.json', './manifest.ja-JP.json', './manifest.ko-KR.json', './manifest.en-US.json', './manifest.en-CA.json', './locales/zh-TW.js', './locales/ja-JP.js', './locales/ko-KR.js', './locales/en-US.js', './locales/en-CA.js', './art.js', './lib/qrcode.js', './fonts/zh-TW.css', './fonts/ja-JP.css', './fonts/ko-KR.css', './fonts/en-US.css', './fonts/en-CA.css', './icons/icon-192.png', './icons/icon-512.png', './icons/icon-maskable-512.png', './icons/apple-touch-icon.png', './icons/icon.svg', './icons/favicon-32.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  if (url.origin !== self.location.origin) return;
  e.respondWith(fetch(e.request).then(r => {
    // 只快取成功的回應，避免把錯誤頁存起來、離線時打開變成錯誤頁
    if (r.ok && r.type === 'basic') { const copy = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); }
    return r;
  }).catch(() => caches.match(e.request, { ignoreSearch: true }).then(m => m || (e.request.mode === 'navigate' ? caches.match('./index.html') : undefined)).then(m => m || Response.error())));
});
