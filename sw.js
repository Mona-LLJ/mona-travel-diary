// Mona Travel Diary - Service Worker
// Caches app shell for offline use
const CACHE_NAME = 'mona-travel-diary-v17';
const CACHE_URLS = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-180.png'
];

// Install: pre-cache app shell
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(CACHE_URLS).catch(function(err) {
        // Don't fail install if external resources can't be cached
        console.log('[SW] Cache error (non-critical):', err);
      });
    })
  );
  self.skipWaiting();
});

// Activate: clean old caches and notify clients to reload
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(names) {
      return Promise.all(
        names.filter(function(n) { return n !== CACHE_NAME; })
          .map(function(n) { return caches.delete(n); })
      );
    }).then(function() {
      // Notify all clients that SW has been updated
      return self.clients.matchAll({includeUncontrolled: true});
    }).then(function(clients) {
      clients.forEach(function(client) {
        client.postMessage({type: 'SW_UPDATED', version: CACHE_NAME});
      });
    })
  );
  self.clients.claim();
});

// Fetch: cache-first for app shell, network-first for API calls
self.addEventListener('fetch', function(event) {
  var url = new URL(event.request.url);

  // Skip non-GET requests
  if (event.request.method !== 'GET') return;

  // Skip API calls and map resources - always use network
  if (url.hostname === 'api.github.com' ||
      url.hostname.includes('open-meteo') ||
      url.hostname.includes('geocoding-api') ||
      url.hostname.includes('nominatim') ||
      url.hostname.includes('geojs') ||
      url.hostname.includes('get.geojs') ||
      url.hostname.includes('map.qq.com') ||
      url.hostname.includes('apis.map.qq.com')) {
    return;
  }

  // Cache-first for everything else
  event.respondWith(
    caches.match(event.request).then(function(cached) {
      if (cached) return cached;
      return fetch(event.request).then(function(response) {
        // Cache successful responses
        if (response.ok && url.origin === self.location.origin) {
          var clone = response.clone();
          caches.open(CACHE_NAME).then(function(cache) {
            cache.put(event.request, clone).catch(function(){});
          });
        }
        return response;
      }).catch(function() {
        // Offline fallback
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
