const CACHE_NAME = "disaster-hud-v1";
const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/manifest.json",
  "/icon-192.png",
  "/icon-512.png",
  "/icon-maskable-512.png",
  "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",
  "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
];

// Install Event
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[Service Worker] Pre-caching Core Shell...");
      return cache.addAll(STATIC_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Activate Event
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("[Service Worker] Clearing Old Cache:", cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event with custom caching strategies
self.addEventListener("fetch", (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // Skip non-GET requests (e.g., POST endpoints for database operations, WebSockets)
  if (req.method !== "GET") {
    return;
  }

  // Handle local API requests or socket.io bypass
  if (url.pathname.startsWith("/api") || url.pathname.startsWith("/socket.io")) {
    // Network-First with backup fallback
    event.respondWith(
      fetch(req)
        .then((response) => {
          // If successful, clone and put in cache for offline survival
          if (response.status === 200) {
            const resClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(req, resClone);
            });
          }
          return response;
        })
        .catch(() => {
          // Offline fallback
          return caches.match(req).then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse;
            }
            // Return a default offline JSON for offline APIs
            return new Response(
              JSON.stringify({ 
                error: "Offline link disconnected. Retaining local cached disaster telemetry.",
                offline: true 
              }), 
              { headers: { "Content-Type": "application/json" } }
            );
          });
        })
    );
    return;
  }

  // Static Assets / Fonts / Map Tiles - Cache-First or Stale-While-Revalidate
  event.respondWith(
    caches.match(req).then((cachedResponse) => {
      if (cachedResponse) {
        // Fetch in background to update cache (Stale-While-Revalidate)
        fetch(req)
          .then((networkResponse) => {
            if (networkResponse.status === 200) {
              caches.open(CACHE_NAME).then((cache) => cache.put(req, networkResponse));
            }
          })
          .catch(() => {/* Ignore network update errors when offline */});
        return cachedResponse;
      }

      // Network Fallback
      return fetch(req)
        .then((networkResponse) => {
          if (!networkResponse || networkResponse.status !== 200) {
            return networkResponse;
          }
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(req, responseToCache);
          });
          return networkResponse;
        })
        .catch(() => {
          // Default index.html fallback for client-side SPA navigation
          if (req.mode === "navigate") {
            return caches.match("/index.html");
          }
        });
    })
  );
});
