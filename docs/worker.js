self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((resp) => {
            return resp || fetch(event.request).then((response) => {
                return caches.open('v3').then((cache) => {
                    cache.put(event.request, response.clone());
                    return response;
                });  
            });
        })
    );
});
