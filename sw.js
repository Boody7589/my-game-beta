const CACHE='hlm-1791845582';
const ASSETS=["./", "index.html", "manifest.webmanifest", "three.min.js", "fonts.css", "fonts/lalezar-arabic-400-normal.woff2", "fonts/tajawal-arabic-400-normal.woff2", "fonts/tajawal-arabic-500-normal.woff2", "fonts/tajawal-arabic-700-normal.woff2", "fonts/tajawal-arabic-800-normal.woff2", "fonts/lalezar-latin-400-normal.woff2", "fonts/tajawal-latin-400-normal.woff2", "fonts/tajawal-latin-500-normal.woff2", "fonts/tajawal-latin-700-normal.woff2", "fonts/tajawal-latin-800-normal.woff2", "icons/icon-192.png", "icons/icon-512.png", "icons/icon-maskable-512.png", "icons/apple-touch-icon.png"];
self.addEventListener('install',(e)=>{e.waitUntil(caches.open(CACHE).then((c)=>c.addAll(ASSETS)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',(e)=>{e.waitUntil(caches.keys().then((ks)=>Promise.all(ks.filter((k)=>k!==CACHE).map((k)=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',(e)=>{
  if(e.request.method!=='GET')return;
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then((hit)=>hit||fetch(e.request).then((res)=>{
    if(res&&res.ok&&e.request.url.startsWith(self.location.origin)){const cp=res.clone();caches.open(CACHE).then((c)=>c.put(e.request,cp))}
    return res;
  }).catch(()=>caches.match('index.html'))));
});
