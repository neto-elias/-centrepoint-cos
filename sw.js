const CACHE='centrepoint-cos-v05';
const FILES=['./','index.html','assets/style.css','assets/app.js','manifest.json'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES))));
self.addEventListener('fetch',e=>e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))));
