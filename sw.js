const staticName = 'app-v1'
self.addEventListener('install', event => {
  event.waitUntill(
    caches.open(staticName).then( cache => {
      return cache.addAll([
        'index.html',
        'main.css',
        'main.js',
        'idb.js',
        'imgs/IMG_20180506_224521_813.jpg',
        'https://free.currencyconverterapi.com/api/v5/currencies'
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then( resp => {
      return resp || fetch(event.request)
    })
  );
}); 