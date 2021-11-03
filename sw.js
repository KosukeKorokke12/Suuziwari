// Cache name
const CACHE_NAME = 'pwa-sample-caches-v1';
// Cache targets
const urlsToCache = [
    './Suuziwari/',
    './Suuziwari/index.html',
    './Suuziwari/index.min.html',
    './Suuziwari/BGM.mp3',
    './Suuziwari/dont%20touch/tyuui.html',
    './Suuziwari/dont%20touch/korokke.js',
    './Suuziwari/dont%20touch/jquery-3.6.0.min.js',
    './Suuziwari/dont%20touch/ress.min.js',
    './Suuziwari/dont%20touch/style.css',
    './Suuziwari/dont%20touch/Answer.mp3',
    './Suuziwari/dont%20touch/buzzer.mp3',
    './Suuziwari/dont%20touch/suuziwari.png',
    './Suuziwari/dont%20touch/Suuziwari.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        return response ? response : fetch(event.request);
      })
  );
});
