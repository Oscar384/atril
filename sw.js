const CACHE='atril-bb008c7e';
const ASSETS=["./", "index.html", "manifest.webmanifest", "fonts/atkinson-hyperlegible-latin-400-normal.woff2", "fonts/atkinson-hyperlegible-latin-700-normal.woff2", "fonts/bricolage-grotesque-latin-700-normal.woff2", "fonts/bricolage-grotesque-latin-800-normal.woff2", "fonts/figtree-latin-400-normal.woff2", "fonts/figtree-latin-500-normal.woff2", "fonts/figtree-latin-600-normal.woff2", "fonts/figtree-latin-700-normal.woff2", "fonts/jetbrains-mono-latin-400-normal.woff2", "fonts/jetbrains-mono-latin-700-normal.woff2", "icons/icon-180.png", "icons/icon-192.png", "icons/icon-512.png", "icons/maskable-512.png"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET') return;
  const isPage=e.request.mode==='navigate';
  e.respondWith(isPage
    ? fetch(e.request).then(r=>{const c=r.clone();caches.open(CACHE).then(x=>x.put('index.html',c));return r}).catch(()=>caches.match('index.html'))
    : caches.match(e.request).then(r=>r||fetch(e.request)));
});
