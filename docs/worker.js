const cacheId = 'v6';

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
});
