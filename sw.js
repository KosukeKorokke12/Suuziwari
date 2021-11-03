// キャッシュ名とキャッシュファイルの指定
var CACHE_NAME = 'pwa-sample-caches';
var urlsToCache = [
    '/Suuziwari/index.html',
    '/Suuziwari/index.min.html',
    '/Suuziwari/BGM.mp3',
    '/Suuziwari/dont touch/tyuui.html',
    '/Suuziwari/dont touch/korokke.js',
    '/Suuziwari/dont touch/jquery-3.6.0.min.js',
    '/Suuziwari/dont touch/ress.min.js',
    '/Suuziwari/dont touch/korokke.min.js',
    '/Suuziwari/dont touch/style.css',
    '/Suuziwari/dont touch/style.min.css',
    '/Suuziwari/dont touch/Answer.mp3',
    '/Suuziwari/dont touch/buzzer.mp3',
    '/Suuziwari/dont touch/suuziwari.png',
    '/Suuziwari/dont touch/Suuziwari.png',
];

// インストール処理
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then(function(cache) {
                return cache.addAll(urlsToCache);
            })
    );
});

// リソースフェッチ時のキャッシュロード処理
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches
            .match(event.request)
            .then(function(response) {
                return response ? response : fetch(event.request);
            })
    );
});
