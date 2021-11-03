var CACHE_NAME = 'pwa-sample-caches';
var urlsToCache = [
    '/Suuziwari/',
    '/Suuziwari/BGM.mp3',
    '/Suuziwari/dont%20touch/tyuui.html',
    '/Suuziwari/dont%20touch/korokke.js',
    '/Suuziwari/dont%20touch/jquery-3.6.0.min.js',
    '/Suuziwari/dont%20touch/ress.min.js',
    '/Suuziwari/dont%20touch/style.css',
    '/Suuziwari/dont%20touch/Answer.mp3',
    '/Suuziwari/dont%20touch/buzzer.mp3',
    '/Suuziwari/dont%20touch/suuziwari.png',
    '/Suuziwari/dont%20touch/Suuziwari.png',
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
