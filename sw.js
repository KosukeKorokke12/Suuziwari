if('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('/sw.js')
             .then(function() { console.log("Service Worker Registered"); })
             .catch(function() { console.log("Service Worker Not Registered"); });
  }
  const STATIC_DATA = [
    'index.htm',
    'index.min.htm',
    'BGM.mp3',
    '/IE互換用/korokke.IE.js',
    '/IE互換用/数字割りゲーム.IE.htm',
    '/IE互換用/style.IE.css',
    '/dont touch/tyuui.htm',
    '/dont touch/korokke.js',
    '/dont touch/jquery-3.6.0.min.js',
    '/dont touch/ress.min.js',
    '/dont touch/korokke.min.js',
    '/dont touch/style.css',
    '/dont touch/style.min.css',
    '/dont touch/Answer.mp3',
    '/dont touch/buzzer.mp3',
    '/dont touch/suuziwari.png',
    '/dont touch/Suuziwari.png',
  ];

  self.addEventListener('install', function(e) {
   e.waitUntil(
     caches.open('cache_v1').then(function(cache) {
       return cache.addAll(STATIC_DATA);
     })
   );
  });

  self.addEventListener('fetch', function(event) {
   console.log(event.request.url);

   event.respondWith(
     caches.match(event.request).then(function(response) {
       return response || fetch(event.request);
     })
   );
  });
