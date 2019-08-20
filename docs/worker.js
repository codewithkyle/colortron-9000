self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('v2').then((cache) => {
        return cache.addAll([
            'index.html',
            'assets/icon.png',
            'assets/packages/color-convert.js',
            'assets/styles/color-breakdown-component.css',
            'assets/components/new-color-component.js',
            'assets/components/color-block-component.js',
            'assets/components/color-modal-component.js',
            'assets/components/color-pallet-component.js',
            'assets/components/pallet-breakdown-component.js',
            'assets/components/color-breakdown-component.js',
            'assets/components/color-value-component.js',
            'assets/styles/color-block-component.css',
            'assets/styles/color-modal-component.css',
            'assets/styles/color-value-component.css',
            'assets/styles/new-color-component.css',
            'assets/styles/pallet-breakdown-component.css'
        ]);
      })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((resp) => {
            return resp || fetch(event.request).then((response) => {
                return caches.open('v2').then((cache) => {
                    cache.put(event.request, response.clone());
                    return response;
                });  
            });
        })
    );
});
