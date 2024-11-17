const CACHE_NAME = "clinic-registers-cache-v1";
const urlsToCache = [
  "./", // Root directory
  "./index.html",
  "./style.css",
  "./app.js",
  "./utils.js",
  "https://cdnjs.cloudflare.com/ajax/libs/dexie/3.2.3/dexie.min.js", // Dexie.js library
];

// Install event: Cache files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch event: Serve files from cache or fetch from the network
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return (
        response ||
        fetch(event.request).catch(() =>
          caches.match("./index.html") // Fallback to the main page if offline
        )
      );
    })
  );
});

// Activate event: Cleanup old caches
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            console.log("Deleting old cache:", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
