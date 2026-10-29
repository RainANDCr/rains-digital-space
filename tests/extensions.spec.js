import {test,expect} from '@playwright/test'
import {readFileSync} from 'node:fs'
import {normalizePreferences,normalizeProgress} from '../src/utils/interactions.js'
import {buildContentNodes,filterNodes,exhibitionState,assertPublishableExtensions} from '../src/utils/nexus.js'
import {extensionFeatures,tourRoutes} from '../src/data/extensions.js'
import {extensionText} from '../src/locales/extensions.js'

test('extension schemas preserve preferences, validate progress and filter public nodes',()=>{
 expect(normalizePreferences({mode:'terminal',experience:'lite',rain:'off'})).toMatchObject({mode:'terminal',experience:'lite'})
 expect(normalizePreferences({experience:'invalid'}).experience).toBe('immersive')
 const progress=normalizeProgress({tour:{id:'intro',step:999},stamps:{'/projects':'2026-10-29T00:00:00.000Z','https://evil.test':'2026-10-29T00:00:00.000Z','/lab':'invalid'},favorites:['intro','intro','fake']})
 expect(progress.tour.step).toBe(2);expect(Object.keys(progress.stamps)).toEqual(['/projects']);expect(progress.favorites).toEqual(['intro'])
 const nodes=buildContentNodes({posts:[{slug:'a',title:'Python',summary:'Notes',tags:['React']},{slug:'secret',title:'secret',draft:true}],projects:[{id:'b',name:'React app',summary:'Demo',technologies:['React']}],memories:[{id:'c',visibility:'public',titleKey:'a',textKey:'b',projects:['b','bad']}],artifacts:[{id:'private',visibility:'private',confirmed:true}]})
 expect(nodes.map(n=>n.id)).toEqual(['article:a','project:b','memory:c']);expect(nodes[0].relatedIds).toContain('project:b');expect(nodes[2].relatedIds).not.toContain('project:bad')
 expect(filterNodes(nodes,{query:'PYTHON',type:'article',tag:'React'})).toHaveLength(1)
 expect(exhibitionState({startDate:'2026-01-01',endDate:'2026-12-31'},'2026-10-29')).toBe('current')
 expect(()=>assertPublishableExtensions({artifacts:[{id:'secret',visibility:'private',confirmed:true}]})).toThrow(/public/)
 expect(()=>assertPublishableExtensions({exhibitions:[{id:'bad',visibility:'public',startDate:'2026-02-30',endDate:'2026-12-31'}]})).toThrow(/valid/)
 expect(()=>assertPublishableExtensions({projects:[{makingOf:[{stage:'idea',visibility:'private'}]}]})).toThrow(/public/)
 for(const values of Object.values(extensionText))expect(values.every(v=>typeof v==='string'&&v.length>0)).toBe(true)
 for(const route of tourRoutes)expect(route.stops.length).toBeGreaterThan(1)
})

test('experience switch preserves preferences and keeps train navigation in lite mode',async({page})=>{
 await page.goto('/settings');await expect(page.locator('html')).toHaveAttribute('data-experience','lite')
 await page.getByRole('button',{name:'沉浸式',exact:true}).click();await expect(page.locator('html')).toHaveAttribute('data-experience','immersive')
 await page.getByRole('button',{name:'轻量模式',exact:true}).click();await page.reload()
 expect(await page.locator('html').getAttribute('data-scene')).toBeNull();await expect(page.locator('html')).toHaveAttribute('data-experience','lite')
 await page.goto('/');await expect(page.locator('.train-stops')).toBeVisible();await expect(page.locator('.atmosphere')).toBeHidden();await expect(page.locator('.page-enter')).toHaveCSS('animation-name','none')
})

test('nexus combines search and tags and preserves selection when mirroring worlds',async({page})=>{
 await page.addInitScript(()=>localStorage.setItem('spacePreferences',JSON.stringify({experience:'immersive'})))
 await page.goto('/nexus');await page.getByRole('searchbox').fill('PYTHON');await page.getByRole('button',{name:'文章',exact:true}).click();await expect(page.locator('.nexus-node')).toHaveCount(1)
 await page.locator('.nexus-node').click();await expect(page.locator('.nexus-detail')).toContainText('Java 与 Python')
 const url=page.url();await page.locator('.nav-actions .mode-button').click();await expect(page).toHaveURL(url);await expect(page.locator('.nexus-detail')).toContainText('Java 与 Python')
 await page.getByRole('button',{name:'重置筛选',exact:true}).click();await page.getByRole('button',{name:'关系图',exact:true}).click();await expect(page.locator('.nexus-graph')).toBeVisible()
 await page.locator('#nexus-tag').selectOption('React');expect(await page.locator('.nexus-node').count()).toBeGreaterThan(0)
 await page.getByRole('searchbox').fill('zz-no-content');await expect(page.locator('.empty')).toBeVisible()
})

test('planner supports saved routes, previous, skip and completion',async({page})=>{
 await page.setViewportSize({width:375,height:900})
 await page.goto('/planner');const card=page.locator('.nexus-results .card').first()
 await card.getByRole('button',{name:'收藏路线',exact:true}).click();await expect(card.getByRole('button',{name:'取消收藏'})).toHaveAttribute('aria-pressed','true')
 await card.getByRole('button',{name:'开始路线'}).click();await expect(page).toHaveURL(/#about$/)
 const guide=page.locator('.tour-guide');await guide.getByRole('button',{name:'下一站'}).click();await expect(page).toHaveURL(/\/projects$/)
 await guide.getByRole('button',{name:'上一站'}).click();await expect(page).toHaveURL(/#about$/)
 await guide.getByRole('button',{name:'跳过此站'}).click();await guide.getByRole('button',{name:'下一站'}).click();await expect(page).toHaveURL(/\/letters$/)
 await guide.getByRole('button',{name:'完成路线'}).click();await expect(guide).toHaveCount(0)
 expect(await page.evaluate(()=>JSON.parse(localStorage.getItem('spaceInteractionProgress')).completedRoutes)).toContain('intro')
})

test('passport persists unique stamps and exports a real PNG',async({page})=>{
 await page.goto('/projects');await expect(page.locator('h1')).toBeVisible();await page.goto('/passport');await expect(page.locator('.passport-stamp.unlocked')).toHaveCount(2)
 await page.reload();await expect(page.locator('.passport-stamp.unlocked')).toHaveCount(2)
 const download=page.waitForEvent('download');await page.getByRole('button',{name:'导出纪念卡'}).click();const file=await (await download).path();expect(readFileSync(file).subarray(0,8).toString('hex')).toBe('89504e470d0a1a0a')
 await page.goto('/settings');await page.getByRole('button',{name:'重置向导与已读记录',exact:true}).click();await page.goto('/passport');await expect(page.locator('.passport-stamp.unlocked')).toHaveCount(2)
 await page.getByRole('button',{name:'清空护照记录',exact:true}).click();await page.locator('.notice').getByRole('button',{name:'清空护照记录'}).click();await expect(page.locator('.passport-stamp.unlocked')).toHaveCount(0)
})

test('lab loads an isolated external frame only on demand',async({page})=>{
 const external=[];page.on('request',request=>{if(request.url().startsWith('https://rainandcr.github.io/'))external.push(request.url())})
 await page.route('https://rainandcr.github.io/**',route=>route.fulfill({contentType:'text/html',body:'<h1>Controlled demo fixture</h1>'}))
 await page.goto('/lab/game-2048');await expect(page.locator('h1')).toBeVisible();await expect(page.locator('iframe')).toHaveCount(0);expect(external).toHaveLength(0)
 await page.getByRole('button',{name:'加载外部演示'}).click();await expect(page.locator('iframe')).toHaveAttribute('sandbox','allow-scripts allow-same-origin')
 await expect.poll(()=>external.length).toBeGreaterThan(0);await page.getByRole('button',{name:'关闭演示'}).click();await expect(page.locator('iframe')).toHaveCount(0)
})

test('hardware teaching checks order and supports keyboard assembly',async({page})=>{
 await page.goto('/workshop');await page.getByRole('button',{name:'教学模式',exact:true}).click()
 await page.getByRole('button',{name:'安装 · 处理器',exact:true}).click();await expect(page.getByRole('alert')).toBeVisible()
 for(const name of ['主板','处理器','内存','存储','显卡','电源'])await page.getByRole('button',{name:'安装 · '+name,exact:true}).press('Enter')
 await expect(page.getByRole('status')).toContainText('6 / 6');await page.getByRole('button',{name:'重新组装'}).click();await expect(page.getByRole('status')).toContainText('0 / 6')
})

test('exhibitions reuse original content and missing stories stay honest',async({page})=>{
 await page.goto('/exhibitions');await page.getByRole('button',{name:'往期展览',exact:true}).click();await expect(page.locator('.empty')).toBeVisible();await page.getByRole('button',{name:'全部',exact:true}).click()
 await page.getByRole('link',{name:'从学习到创造',exact:true}).click();await expect(page.locator('.exhibit-wall .card')).toHaveCount(4)
 await page.goto('/making-of/rains-digital-space');await expect(page.locator('.timeline li')).toHaveCount(1);await expect(page.locator('.making-stages .card')).toHaveCount(5)
 await page.goto('/museum');await expect(page.locator('.empty')).toContainText('还没有公开藏品')
 for(const path of ['/museum/missing','/lab/missing','/exhibitions/missing','/making-of/missing']){await page.goto(path);await expect(page.locator('h1')).toContainText('页面不存在')}
})

test('new routes fit mobile and desktop in both worlds, languages and experiences',async({page})=>{
 test.setTimeout(90000);const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto('/')
 for(const [index,width] of [320,375,768,1024,1440].entries()){
  await page.setViewportSize({width,height:900})
  await page.evaluate(index=>{localStorage.setItem('spacePreferences',JSON.stringify({mode:index%2?'terminal':'poetic',experience:index%2?'lite':'immersive',motion:'off'}));localStorage.setItem('language',index%2?'en':'zh-CN');localStorage.setItem('theme',index%2?'dark':'light')},index)
  for(const feature of extensionFeatures){await page.goto(feature.path);await expect(page.locator('h1')).toBeVisible();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),width+' '+feature.id).toBe(true);await expect(page.locator('h1')).not.toContainText('ext.')}
 }
 expect(errors).toEqual([])
})

test('offline archive opt-in, offline reading, excluded pages and clearing',async({browser})=>{
 test.setTimeout(90000);const context=await browser.newContext({locale:'zh-CN',reducedMotion:'reduce'}),page=await context.newPage()
 await page.goto('http://127.0.0.1:4176/pocket');await expect(page.getByRole('button',{name:'保存精选内容供离线阅读'})).toBeEnabled()
 const hasMarker=()=>page.evaluate(async()=>{for(const key of await caches.keys())if(key.startsWith('rain-pocket-')&&await(await caches.open(key)).match('/__rain_pocket_ready__'))return true;return false})
 expect(await hasMarker()).toBe(false)
 await page.getByRole('button',{name:'保存精选内容供离线阅读'}).click();await expect(page.getByRole('status')).toContainText('精选内容已离线可用',{timeout:30000})
 await context.setOffline(true);await page.goto('http://127.0.0.1:4176/blog/cs-data-structures');await expect(page.locator('.prose')).toContainText('数组')
 await page.goto('http://127.0.0.1:4176/letters');await expect(page.locator('h1')).toContainText('Offline')
 await page.goto('http://127.0.0.1:4176/pocket');await page.getByRole('button',{name:'清除离线内容'}).click();await expect.poll(hasMarker).toBe(false)
 await page.goto('http://127.0.0.1:4176/blog/cs-data-structures');await expect(page.locator('h1')).toContainText('Offline')
 await context.setOffline(false);await context.close()
})
