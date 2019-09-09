const cacheId = 'v6';
var urlsToCache = [
    '/',
    '/app'
];

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((resp) => {
            return resp || fetch(event.request).then((response) => {
                return caches.open(cacheId).then((cache) => {
                    cache.put(event.request, response.clone());
                    return response;
                });
            });
        })
    );
});

self.addEventListener('message', (event)=>{
    if (event.data.cachebust)
    {
        cacheId = event.data.cachebust;

        caches.keys().then((cacheNames)=>{
            return Promise.all(
                cacheNames.map((cacheName)=>{
                    if (cacheName !== cacheId)
                    {
                        return caches.delete(cacheName);
                    }
                })
            );
        });
    }
});

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});
