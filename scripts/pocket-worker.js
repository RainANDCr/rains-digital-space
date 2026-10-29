/* Build-time constants: CACHE, PREFIX, RESOURCES and ROUTES. No dynamic caching of user requests. */
const marker='/__rain_pocket_ready__'
async function prepare(){const cache=await caches.open(CACHE);await cache.addAll(RESOURCES.map(path=>new Request(path,{cache:'reload'})));await cache.put(marker,new Response('ready'));return true}
self.addEventListener('install',event=>event.waitUntil((async()=>{const keys=(await caches.keys()).filter(key=>key.startsWith(PREFIX));const optedIn=await Promise.all(keys.map(async key=>!!await (await caches.open(key)).match(marker)));if(optedIn.some(Boolean))await prepare()})()))
self.addEventListener('activate',event=>event.waitUntil((async()=>{const current=await caches.open(CACHE);if(await current.match(marker))for(const key of await caches.keys())if(key.startsWith(PREFIX)&&key!==CACHE)await caches.delete(key);await self.clients.claim()})()))
self.addEventListener('message',event=>{
 if(event.data?.type==='ACTIVATE'){event.waitUntil(self.skipWaiting());return}
 if(!['PREPARE','CLEAR','STATUS'].includes(event.data?.type))return
 event.waitUntil((async()=>{try{
  if(event.data.type==='PREPARE')await prepare()
  if(event.data.type==='CLEAR')for(const key of await caches.keys())if(key.startsWith(PREFIX))await caches.delete(key)
  const cache=await caches.open(CACHE),ready=!!await cache.match(marker)
  event.ports[0]?.postMessage({ok:true,ready})
 }catch{event.ports[0]?.postMessage({ok:false})}})())
})
self.addEventListener('fetch',event=>{
 const url=new URL(event.request.url)
 if(event.request.method!=='GET'||url.origin!==self.location.origin)return
 if(event.request.mode==='navigate'){
  event.respondWith(fetch(event.request).catch(async()=>{
   if(!url.search&&ROUTES.includes(url.pathname)){const cache=await caches.open(CACHE);if(await cache.match(marker)){const shell=await cache.match('/index.html');if(shell)return shell}}
   return new Response('<!doctype html><meta name="viewport" content="width=device-width"><meta charset="utf-8"><title>Offline · Rain</title><main style="max-width:44rem;margin:12vh auto;padding:24px;font:18px/1.8 system-ui"><h1>当前离线 / Offline</h1><p>此页面尚未离线保存。联网后可在随身档案馆保存精选公开内容。<br>This page is not saved offline. Save selected public content in Pocket Archive while online.</p><a href="/pocket">随身档案馆 / Pocket Archive</a></main>',{status:503,headers:{'Content-Type':'text/html;charset=utf-8'}})
  }));return
 }
 // Only fixed public build files use this lookup; preview responses vary by Origin.
 if(RESOURCES.includes(url.pathname)&&!url.search)event.respondWith((async()=>{const cache=await caches.open(CACHE),cached=await cache.match(url.pathname,{ignoreVary:true});return cached||fetch(event.request)})())
})
