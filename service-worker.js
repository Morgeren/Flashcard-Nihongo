const CACHE_PREFIX = 'nihongo-study-deck-pwa-';
const CACHE_VERSION = 'v19.0.0-foundation-2';
const CACHE_NAME = CACHE_PREFIX + CACHE_VERSION;
const APP_SHELL = [
  './', './index.html', './manifest.webmanifest',
  './icons/icon-192.png', './icons/icon-512.png', './icons/icon-512-maskable.png',
  "./assets/js/legacy/01-core-flashcards.js", "./assets/js/legacy/02-v3-skills.js", "./assets/js/legacy/03-toolbar.js", "./assets/js/legacy/04-storage-migration.js", "./assets/js/legacy/05-v10-learning-lab.js", "./assets/js/legacy/06-v11-reading.js", "./assets/js/legacy/07-v12-enhancements.js", "./assets/js/legacy/08-v13-personal-tutor.js", "./assets/js/legacy/09-v182-smart-reader.js", "./assets/js/legacy/10-v186-advanced-flashcard.js", "./assets/js/legacy/11-v187-simplified-ui.js", "./assets/js/legacy/12-pwa-bootstrap.js", "./assets/js/v19/bootstrap.js", "./assets/js/v19/data-audit.js", "./assets/js/v19/matching.js", "./assets/js/v19/srs-engine.js"
];
self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(APP_SHELL);
    await self.skipWaiting();
  })());
});
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});
self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const response = await fetch(request);
        if (response && response.ok) { const cache=await caches.open(CACHE_NAME); cache.put('./index.html',response.clone()).catch(()=>{}); }
        return response;
      } catch (_) { return (await caches.match(request)) || (await caches.match('./index.html')) || Response.error(); }
    })());
    return;
  }
  event.respondWith((async () => {
    const cached = await caches.match(request);
    if (cached) return cached;
    try {
      const response = await fetch(request);
      if (response && response.ok) { const cache=await caches.open(CACHE_NAME); cache.put(request,response.clone()).catch(()=>{}); }
      return response;
    } catch (_) { return Response.error(); }
  })());
});
