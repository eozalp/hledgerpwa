/* Ledgie — Service Worker
   Fully path-relative: works wherever sw.js and ledgie_v11.html are placed.
   Deploy both files to the same directory. No configuration needed.
*/

const VERSION  = 'ledgie-v11-r1';
const SW_URL   = self.location.href;
// Page URL = sw.js URL with the filename swapped — works at any path depth
const PAGE_URL = SW_URL.replace(/\/sw\.js(\?.*)?$/, '/ledgie_v11.html');
const SCOPE    = SW_URL.replace(/\/sw\.js(\?.*)?$/, '/');
const CACHE    = VERSION + '-' + SCOPE.replace(/[^a-z0-9]/gi, '_').slice(-32);

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE)
            .then(cache => Promise.all([
                cache.add(new Request(PAGE_URL, { cache: 'reload' })),
                cache.add(new Request(SW_URL,   { cache: 'reload' }))
            ]))
            .then(() => self.skipWaiting())
            .catch(err => {
                // Offline reinstall — skip caching, SW still activates
                console.warn('[SW] install cache skipped (offline?):', err);
                return self.skipWaiting();
            })
    );
});

self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys()
            .then(keys => Promise.all(
                keys.filter(k => k !== CACHE).map(k => caches.delete(k))
            ))
            .then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', e => {
    if (e.request.method !== 'GET') return;
    const url = new URL(e.request.url);
    // Only handle same-origin requests within our scope
    if (url.origin !== self.location.origin) return;
    if (!url.pathname.startsWith(new URL(SCOPE).pathname)) return;

    e.respondWith(
        caches.match(e.request).then(cached => {
            if (cached) return cached;
            return fetch(e.request).then(res => {
                if (res && res.status === 200) {
                    caches.open(CACHE).then(c => c.put(e.request, res.clone()));
                }
                return res;
            });
        }).catch(() => caches.match(PAGE_URL))
    );
});

self.addEventListener('message', e => {
    if (e.data === 'skipWaiting') self.skipWaiting();
});
