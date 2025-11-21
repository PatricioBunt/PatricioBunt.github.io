// Service Worker for PWA and Pomodoro Timer Background Notifications
const CACHE_NAME = 'dev-toolkit'; // Increment version to clear old cache
const STATIC_CACHE = 'dev-toolkit-static'; // Increment version to clear old cache

// Install event - cache essential files
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(STATIC_CACHE).then((cache) => {
            return cache.addAll([
                '/',
                '/index.html',
                '/app.js',
                '/styles.css',
                '/favicon.svg',
                '/favicon-96x96.png',
                '/web-app-manifest-192x192.png',
                '/web-app-manifest-512x512.png'
            ]).catch(err => {
                console.log('Cache addAll failed:', err);
            });
        })
    );
    self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== STATIC_CACHE && cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    event.waitUntil(clients.claim());
});

self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'TIMER_COMPLETE') {
        const { isWorkTime, title, body } = event.data;
        
        // Show notification
        self.registration.showNotification(title, {
            body: body,
            icon: '/web-app-manifest-192x192.png',
            badge: '/favicon-96x96.png',
            tag: 'pomodoro-timer',
            requireInteraction: false,
            vibrate: [200, 100, 200],
            data: {
                timestamp: Date.now(),
                isWorkTime: isWorkTime
            }
        });
    }
});

// Fetch event - network first for HTML, cache first for assets
self.addEventListener('fetch', (event) => {
    // For HTML files, always try network first to get latest version
    if (event.request.mode === 'navigate' || event.request.url.endsWith('.html') || event.request.url.endsWith('/')) {
        event.respondWith(
            fetch(event.request).then((response) => {
                // If network succeeds, cache and return
                const responseClone = response.clone();
                caches.open(STATIC_CACHE).then((cache) => {
                    cache.put(event.request, responseClone);
                });
                return response;
            }).catch(() => {
                // If network fails, try cache
                return caches.match(event.request).then((cachedResponse) => {
                    return cachedResponse || caches.match('/index.html');
                });
            })
        );
    } else {
        // For other assets, cache first, fallback to network
        event.respondWith(
            caches.match(event.request).then((response) => {
                return response || fetch(event.request).then((fetchResponse) => {
                    // Cache the response for future use
                    const responseClone = fetchResponse.clone();
                    caches.open(STATIC_CACHE).then((cache) => {
                        cache.put(event.request, responseClone);
                    });
                    return fetchResponse;
                });
            })
        );
    }
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
            // Focus existing window or open new one
            for (let client of clientList) {
                if (client.url.includes(self.location.origin) && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow('/');
            }
        })
    );
});

