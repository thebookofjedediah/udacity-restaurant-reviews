var cacheStorage = 'rest-reviews-';
var cacheNum = Math.round(Math.random() * 100) + 1;
cacheStorage += cacheNum;

const filesToCache = [
    '/css/styles.css',
    '/data/restaurants.json',
    '/js/dbhelper.js',
    '/js/main.js',
    '/js/restaurant_info.js',
    '/js/sw_reg.js',
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg',
    '/index.html',
    '/restaurant.html'
];

// Install Event
self.addEventListener('install', function(event) {
    event.waitUntil(caches.open(cacheStorage).then(function(cache) {
            return cache.addAll(filesToCache);
        })
    );
});

// Activate Event
self.addEventListener('activate', function(event) {
    event.waitUntil(caches.keys().then(function(cacheNames) {
        return Promise.all(
            cacheNames.filter(function(cacheName) {
                return cacheName.startsWith('rest-reviews-') &&
                       cacheName != cacheStorage;
            }).map(function(cacheName) {
              // Delete old Cache
                return caches.delete(cacheName);
            })
        );
    }));
});

// Fetch Listener
self.addEventListener('fetch', function(event) {
    // Check Cache for Response
    event.respondWith(caches.match(event.request).then(function(response) {
        // Respond with Cache
        if (response) return response;
        // Respond with Network
        return fetch(event.request).then(function(response) {
            return caches.open(cacheStorage).then(function(cache) {
                cache.put(event.request.url, response.clone());
                return response;
            });
        });
    }));
});
