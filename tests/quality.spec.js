import {test,expect} from '@playwright/test'
import {writeFileSync,readFileSync,readdirSync} from 'node:fs'
import {gzipSync} from 'node:zlib'
test('production preview metrics and core contrast',{tag:'@production'},async({browser})=>{
 test.skip(process.env.PRODUCTION_QA!=='1','Run with PRODUCTION_QA=1 and a dist preview on port 4176.')
 test.skip(process.env.PRODUCTION_QA!=='1','Run with PRODUCTION_QA=1 and a dist preview on port 4176.')
 const metrics=[]
 for(const width of [375,1440]){
  const context=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce'})
  await context.addInitScript(()=>{
   window.__quality={lcp:null,cls:0}
   new PerformanceObserver(list=>{for(const entry of list.getEntries())window.__quality.lcp=entry.startTime}).observe({type:'largest-contentful-paint',buffered:true})
   new PerformanceObserver(list=>{for(const entry of list.getEntries())if(!entry.hadRecentInput)window.__quality.cls+=entry.value}).observe({type:'layout-shift',buffered:true})
  })
  const page=await context.newPage()
  await page.goto('http://127.0.0.1:4176/')
  await page.locator('.prologue-art img').evaluate(image=>image.decode())
  await page.evaluate(async()=>{await document.fonts.ready;await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)))})
  await page.screenshot({path:'test-results/final-home-'+width+'.png'})
  await expect.poll(()=>page.evaluate(()=>window.__quality.lcp),{timeout:3000}).not.toBeNull()
  metrics.push(await page.evaluate(()=>({width:innerWidth,...window.__quality,domContentLoaded:performance.getEntriesByType('navigation')[0].domContentLoadedEventEnd,transferredBytes:performance.getEntriesByType('resource').reduce((sum,r)=>sum+r.transferSize,0)})))
  for(const theme of ['dark','light']){
   await page.evaluate(value=>document.documentElement.dataset.theme=value,theme)
   const colors=await page.evaluate(()=>{const css=getComputedStyle(document.documentElement);return Object.fromEntries(['bg','surface','text','muted','accent'].map(key=>[key,css.getPropertyValue('--'+key).trim()]))})
   const luminance=hex=>{const rgb=hex.replace('#','').match(/../g).map(x=>parseInt(x,16)/255).map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4);return rgb[0]*.2126+rgb[1]*.7152+rgb[2]*.0722}
   for(const foreground of ['text','muted','accent'])for(const background of ['bg','surface']){const a=luminance(colors[foreground]),b=luminance(colors[background]);expect((Math.max(a,b)+.05)/(Math.min(a,b)+.05),theme+' '+foreground+'/'+background).toBeGreaterThanOrEqual(4.5)}
  }
  await page.goto('http://127.0.0.1:4176/explore');await expect(page.locator('.chapter-portal>a')).toHaveCount(8)
  await page.screenshot({path:'test-results/final-explore-'+width+'.png',fullPage:true})
  await page.goto('http://127.0.0.1:4176/archive');await expect(page.locator('.memory-entry')).toHaveCount(4)
  await context.close()
 }
 const assets=readdirSync('dist/assets').filter(name=>/\.(js|css)$/.test(name)).map(name=>({name,bytes:readFileSync('dist/assets/'+name).length,gzip:gzipSync(readFileSync('dist/assets/'+name)).length}))
 expect(readdirSync('dist')).not.toContain('tests')
 writeFileSync('.npm-cache/quality-metrics.json',JSON.stringify({environment:'Local Edge production preview; no network or CPU throttling. Snapshot only, not Lighthouse or field INP.',metrics,assets},null,2))
})
