// ==========================================================================
// eBookPirates - PWA Service Worker (5. Pillér)
// Version: 20261016_v2
// ==========================================================================

const CACHE_NAME = 'ebp-cache-v20261016_v2';

// Előre gyorstárazandó statikus alapfájlok (Core App Shell)
const PRECACHE_ASSETS = [
    './',
    'index.html',
    'styles.css',
    'app.js',
    'web_fordito.js',
    'manifest.json',
    'https://cdn.jsdelivr.net/npm/flag-icons/css/flag-icons.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css',
    'https://storage.googleapis.com/kalozsziget-assets/tutorial/assets/images/Zozo_SteamPunk_Front_Dirty_02_portrait.png'
];

// 1. INSTALL ESEMÉNY: Alapfájlok letöltése és gyorstárazása
self.addEventListener('install', (event) => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[ServiceWorker] Alapfájlok gyorstárazása...');
            return cache.addAll(PRECACHE_ASSETS).catch((err) => {
                console.warn('[ServiceWorker] Néhány nem kritikus fájl előtöltése sikertelen:', err);
            });
        })
    );
});

// 2. ACTIVATE ESEMÉNY: Korábbi, elavult cache-ek törlése
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log('[ServiceWorker] Régi cache törlése:', cache);
                        return caches.delete(cache);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// 3. FETCH ESEMÉNY: Intelligens Kettős Stratégia
self.addEventListener('fetch', (event) => {
    const request = event.request;
    const url = request.url;

    // A: KIZÁRÓLAG GET kéréseket kezelünk cache-ből
    if (request.method !== 'GET') {
        return;
    }

    // B: Google Apps Script Backend (doPost/API) SOHA NEM CACHE-ELHETŐ! (Élő adatok védelme)
    if (url.includes('script.google.com') || url.includes('exec') || url.includes('google.script')) {
        return;
    }

    // C: Chrome Extensions és nem-http protokollok kizárása
    if (!url.startsWith('http')) {
        return;
    }

    // D: Fejlesztői környezet (localhost / 127.0.0.1): Mindig friss hálózati kérés (Network First) a gyors Live Server teszteléshez
    if (url.includes('localhost') || url.includes('127.0.0.1')) {
        event.respondWith(
            fetch(request).catch(() => caches.match(request))
        );
        return;
    }

    // D: Navigációs kérések (HTML oldalak) -> Network First, Offline Fallbackkel
    if (request.mode === 'navigate') {
        event.respondWith(
            fetch(request)
                .then((networkResponse) => {
                    return caches.open(CACHE_NAME).then((cache) => {
                        cache.put(request, networkResponse.clone());
                        return networkResponse;
                    });
                })
                .catch(() => {
                    return caches.match(request).then((cachedResponse) => {
                        return cachedResponse || caches.match('index.html');
                    });
                })
        );
        return;
    }

    // E: Statikus eszközök (CSS, JS, Fontok, Képek) -> Stale-While-Revalidate
    event.respondWith(
        caches.match(request).then((cachedResponse) => {
            const fetchPromise = fetch(request)
                .then((networkResponse) => {
                    if (networkResponse && networkResponse.status === 200) {
                        const responseClone = networkResponse.clone();
                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(request, responseClone);
                        });
                    }
                    return networkResponse;
                })
                .catch((fetchErr) => {
                    // Csendes fallback hálózati kimaradás esetén
                    return null;
                });

            // Ha van a memóriában, azonnal visszaadjuk (0 ms), háttérben frissítünk
            return cachedResponse || fetchPromise;
        })
    );
});
