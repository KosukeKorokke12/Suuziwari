// キャッシュ名とキャッシュファイルの指定
var CACHE_NAME = 'pwa-sample-caches';
var urlsToCache = [
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
