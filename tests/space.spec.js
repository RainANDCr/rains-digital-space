import {test,expect} from '@playwright/test'
import {publicEvents,publicLetters} from '../src/utils/archive.js'
import {searchRecords} from '../src/utils/search.js'
import {spaceText} from '../src/locales/space.js'

test('public archive and date gates reject invalid or unpublished letters',()=>{
 const letters=[{id:'ready',visibility:'public',confirmed:true,unlockDate:'2026-10-29'},{id:'later',visibility:'public',confirmed:true,unlockDate:'2026-10-30'},{id:'private',visibility:'private',confirmed:true,unlockDate:'2020-01-01'},{id:'invalid',visibility:'public',confirmed:true,unlockDate:'2026-02-30'},{id:'unconfirmed',visibility:'public',unlockDate:'2020-01-01'}]
 expect(publicLetters(letters,'2026-10-29').map(x=>x.id)).toEqual(['ready'])
 expect(publicLetters(letters,'invalid')).toEqual([])
 expect(publicEvents([{visibility:'public',date:'2026-10',topic:'learning'},{visibility:'private',date:'2026',topic:'learning'}],{year:'2026',topic:'learning'})).toHaveLength(1)
 const records=[{kind:'posts',text:'React 中文'},{kind:'projects',text:'REACT app'}]
 expect(searchRecords(records,' react ')).toHaveLength(2)
 expect(searchRecords(records,'react','posts')).toHaveLength(1)
 expect(searchRecords(records,'unknown')).toHaveLength(0)
 for(const translations of Object.values(spaceText)){expect(translations).toHaveLength(2);expect(translations.every(x=>typeof x==='string'&&x.length>0)).toBe(true)}
})

test('all chapters load directly with no runtime errors',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message))
 await page.goto('/explore');await expect(page.locator('.chapter-portal>a')).toHaveCount(8)
 const paths=await page.locator('.chapter-portal>a').evaluateAll(links=>links.map(link=>new URL(link.href).pathname))
 for(const path of [...paths,'/search','/settings']){await page.goto(path);await expect(page.locator('h1')).toBeVisible();await expect(page).not.toHaveTitle(/页面不存在/);expect(await page.locator('link[rel=canonical]').getAttribute('href')).toContain(path)}
 expect(errors).toEqual([])
})

test('archive hardware and learning stay interactive without invented content',async({page})=>{
 await page.goto('/archive');await expect(page.locator('.memory-entry')).toHaveCount(4)
 await page.getByRole('button',{name:'工程实践',exact:true}).click();await expect(page.locator('.memory-entry')).toHaveCount(1)
 await page.locator('.memory-entry summary').click();await page.locator('.memory-entry a').click();await expect(page).toHaveURL(/projects\/rains-digital-space/)
 await page.goto('/hardware');await page.getByRole('button',{name:'显卡',exact:true}).click();await expect(page.locator('.hardware-detail h2')).toHaveText('显卡');await expect(page.locator('.hardware-detail')).toContainText('待本人补充')
 await page.goto('/learning');await expect(page.locator('.knowledge-star')).toHaveCount(11);await page.getByRole('button',{name:'Web 开发'}).click();await expect(page.locator('.knowledge-star')).toHaveCount(4)
 await page.goto('/cinema');await page.getByRole('button',{name:'大图观赏'}).click();await expect(page.locator('.cinema-empty')).toBeVisible()
})

test('postcard validates previews and opens a real mailto without sending',async({page,context})=>{
 await context.grantPermissions(['clipboard-read','clipboard-write'])
 await page.goto('/letters');await page.getByRole('button',{name:'预览明信片'}).click();await expect(page.locator('.letter-body')).toHaveCount(0)
 await page.getByLabel('你的称呼').fill('   ');await page.getByLabel('想说的话').fill('   ');await page.getByRole('button',{name:'预览明信片'}).click();await expect(page.getByRole('alert')).toContainText('非空白')
 await page.getByLabel('你的称呼').fill('Visitor');await page.getByLabel('回复邮箱（可选）').fill('visitor@example.com');await page.getByLabel('想说的话').fill('测试明信片，不发送。')
 await page.getByRole('button',{name:'预览明信片'}).click();await expect(page.locator('.letter-body')).toContainText('Visitor')
 await page.getByRole('button',{name:'复制信件',exact:true}).click();await expect(page.getByRole('status')).toContainText('信件已复制')
 const href=await page.getByRole('link',{name:'打开邮件客户端'}).getAttribute('href');expect(href).toMatch(/^mailto:chengrui3571@gmail.com\?/);expect(decodeURIComponent(href)).toContain('测试明信片，不发送。')
 await page.getByLabel('想说的话').fill('changed');await expect(page.locator('.letter-body')).toHaveCount(0)
})

test('cinema display modes and media do not autoplay',async({page})=>{
 await page.setViewportSize({width:1200,height:900});await page.goto('/tests/fixtures/cinema.html')
 await expect(page.locator('video')).toHaveAttribute('preload','none');await expect(page.locator('video')).not.toHaveAttribute('autoplay')
 const filmColumns=await page.locator('.photo-strip').evaluate(el=>getComputedStyle(el).gridTemplateColumns.split(' ').length);expect(filmColumns).toBe(4)
 await page.getByRole('button',{name:'相册集',exact:true}).click();expect(await page.locator('.photo-strip').evaluate(el=>getComputedStyle(el).gridTemplateColumns.split(' ').length)).toBe(3)
 await page.getByRole('button',{name:'大图观赏',exact:true}).click();expect(await page.locator('.photo-strip').evaluate(el=>getComputedStyle(el).gridTemplateColumns.split(' ').length)).toBe(1)
 await page.getByRole('button',{name:'打开第 1 张照片'}).click();await expect(page.getByRole('dialog')).toBeVisible();await page.keyboard.press('Escape');await expect(page.getByRole('dialog')).not.toBeVisible()
})

test('mode scene motion and language persist without resetting search',async({page})=>{
 await page.goto('/projects?q=react&category=Web&view=timeline');const url=page.url()
 await page.getByRole('button',{name:'界面风格: 诗意模式',exact:true}).click();await expect(page.locator('html')).toHaveAttribute('data-mode','terminal');expect(page.url()).toBe(url);await expect(page.getByRole('searchbox')).toHaveValue('react')
 await page.goto('/settings');await page.getByRole('checkbox',{name:'减少背景动画'}).check();expect(await page.locator('html').getAttribute('data-scene')).toBeNull();await expect(page.locator('.pointer-particles')).toBeHidden()
 await page.getByRole('button',{name:'English',exact:true}).click();await page.reload();await expect(page.locator('html')).toHaveAttribute('data-mode','terminal');expect(await page.locator('html').getAttribute('data-scene')).toBeNull();await expect(page.locator('html')).toHaveAttribute('lang','en');await expect(page.getByRole('checkbox',{name:'Reduce background motion'})).toBeChecked()
 await page.getByRole('button',{name:'Open the rainy-night guide',exact:true}).click();await expect(page.locator('.guide-panel')).toBeVisible();await page.locator('.guide-panel').getByRole('button',{name:'Close guide'}).click();await expect(page.locator('.guide-panel')).toHaveCount(0)
})

test('global search combines kinds and article contents link to real headings',async({page})=>{
 await page.goto('/search');await page.getByRole('searchbox').fill('sTuDyFlOw');await page.getByRole('button',{name:'项目',exact:true}).click();await expect(page.locator('.grid .card')).toHaveCount(1);await page.locator('.grid .card a').click();await expect(page).toHaveURL(/projects\/studyflow/)
 await page.goto('/blog/cs-data-structures');await page.locator('.article-contents summary').click();const link=page.locator('.article-contents a').first();const target=await link.getAttribute('href');await link.click();await expect(page.locator(target)).toBeVisible();await expect(page.locator(target)).toBeFocused()
})

for(const width of [375,768,1024,1440])test('new chapters responsive combinations '+width,async({page})=>{
 test.setTimeout(60000)
 test.setTimeout(60000)
 await page.setViewportSize({width,height:900})
 for(const mode of ['poetic','terminal'])for(const theme of ['dark','light'])for(const language of ['zh-CN','en']){
  await page.addInitScript(({mode,theme,language})=>{localStorage.setItem('theme',theme);localStorage.setItem('language',language);localStorage.setItem('spacePreferences',JSON.stringify({mode,scene:'night',reduced:true}))},{mode,theme,language})
  for(const path of ['/explore','/archive','/hardware','/history','/learning','/cinema','/letters','/settings','/search']){await page.goto(path);await expect(page.locator('h1')).toBeVisible();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true)}
 }
})
