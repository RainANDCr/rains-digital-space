import {test,expect} from '@playwright/test'
import {normalizePreferences,normalizeProgress} from '../src/utils/interactions.js'
import {letterState,assertPublishableLetters} from '../src/utils/archive.js'
import {demoLetters} from '../src/data/demoLetters.js'

test('legacy weather preferences are discarded',()=>{
 const legacy=normalizePreferences({mode:'terminal',scene:'dusk',reduced:true})
 expect(legacy).toMatchObject({version:2,mode:'terminal',reduced:true})
 expect(normalizePreferences({narration:'always'})).not.toHaveProperty('narration')
 expect(normalizePreferences({scene:'bad',rain:'storm',cursor:'true',motion:'invalid'})).toMatchObject({cursor:true,motion:'system'})
 expect(normalizePreferences(null).guideEnabled).toBe(true)
 expect(normalizeProgress({chapters:['home','home','bad'],visited:['/travel','https://other.test'],dialogues:null})).toMatchObject({chapters:['home'],visited:['/travel'],dialogues:[]})
 expect(letterState(demoLetters[0],'2026-10-29')).toBe('unlocked');expect(letterState(demoLetters[1],'2026-10-29')).toBe('locked')
 expect(demoLetters[1]).not.toHaveProperty('body');expect(demoLetters[1]).not.toHaveProperty('bodyKey')
 expect(()=>assertPublishableLetters(demoLetters,'2026-10-29')).not.toThrow()
 expect(()=>assertPublishableLetters([{...demoLetters[1],body:'must not ship'}],'2026-10-29')).toThrow(/must not bundle/)
 expect(()=>assertPublishableLetters([{...demoLetters[0],visibility:'private'}],'2026-10-29')).toThrow(/private/)
})

test('removed weather controls stay absent and motion preferences persist',async({page})=>{
 await page.goto('/settings');await expect(page.getByRole('heading',{name:'环境场景',exact:true})).toHaveCount(0);await expect(page.getByRole('heading',{name:'雨幕强度',exact:true})).toHaveCount(0)
 await page.getByRole('button',{name:'关闭动画',exact:true}).click();await expect(page.locator('html')).toHaveAttribute('data-motion','off');await page.reload();await expect(page.locator('html')).toHaveAttribute('data-motion','off')
 await page.goto('/');await expect(page.locator('.prologue-art')).toBeVisible();await expect(page.locator('.page-enter')).toHaveCSS('animation-name','none');await expect(page.locator('.typewriter')).toHaveText('Computer Science Student|')
})

test('chapter narration stays removed with legacy preferences and navigation',async({page})=>{
 await page.addInitScript(()=>{if(!localStorage.getItem('spacePreferences'))localStorage.setItem('spacePreferences',JSON.stringify({narration:'always',scene:'dusk',rain:'off'}))})
 for(const path of ['/','/projects','/settings']){await page.goto(path);await expect(page.locator('h1')).toBeVisible();await expect(page.locator('.chapter-narration')).toHaveCount(0)}
 await expect(page.getByRole('heading',{name:'章节旁白'})).toHaveCount(0)
 await expect(page.getByRole('checkbox',{name:'显示雨夜向导'})).toBeVisible()
 expect(await page.locator('html').getAttribute('data-scene')).toBeNull();expect(await page.locator('html').getAttribute('data-rain')).toBeNull()
 await page.reload();await expect(page.locator('h1')).toBeVisible();await expect(page.locator('.chapter-narration')).toHaveCount(0)
 await page.goBack();await expect(page.locator('.project-card')).toHaveCount(11);await expect(page.locator('.chapter-narration')).toHaveCount(0)
})

test('guide remembers exploration, reveals one optional ticket and can stay hidden',async({page})=>{
 for(const path of ['/','/projects','/travel']){await page.goto(path);await expect(page.locator('h1')).toBeVisible();await expect.poll(()=>page.evaluate(path=>JSON.parse(localStorage.getItem('spaceInteractionProgress')||'{}').visited?.includes(path),path)).toBe(true)}
 await page.getByRole('button',{name:'打开雨夜向导',exact:true}).click();await expect(page.locator('.guide-panel')).toContainText('旧车票')
 await page.keyboard.press('Escape');await expect(page.getByRole('button',{name:'打开雨夜向导',exact:true})).toBeFocused()
 await page.getByRole('button',{name:'打开雨夜向导',exact:true}).click();await expect(page.locator('.guide-panel')).toContainText('真实足迹')
 await page.getByRole('button',{name:'在此浏览器隐藏向导'}).click();await page.reload();await expect(page.locator('.site-guide')).toHaveCount(0)
 await page.goto('/settings');await page.getByRole('checkbox',{name:'显示雨夜向导'}).check();await expect(page.locator('.guide-toggle')).toBeVisible()
})

test('future letters show only public demos and teasers contain no body',async({page})=>{
 await page.goto('/archive');await page.getByRole('button',{name:'查看演示信件'}).click();await expect(page.locator('.future-envelope')).toHaveCount(2)
 await expect(page.locator('.is-locked')).toContainText('没有附带正文');await expect(page.locator('.is-locked details')).toHaveCount(0)
 await page.locator('.is-unlocked summary').click();await expect(page.locator('.future-body')).toContainText('不是站长的真实经历')
 await page.getByRole('button',{name:'界面风格: 诗意模式',exact:true}).click();await expect(page.locator('.future-body')).toBeVisible();await expect(page.locator('html')).toHaveAttribute('data-mode','terminal')
})

test('fine pointer tilt and home parallax reset when disabled',async({page})=>{
 await page.emulateMedia({reducedMotion:'no-preference'})
 await page.setViewportSize({width:1440,height:1000})
 await page.addInitScript(()=>{if(!localStorage.getItem('spacePreferences'))localStorage.setItem('spacePreferences',JSON.stringify({reduced:false}))})
 await page.goto('/projects');const card=page.locator('.project-card').first();await card.scrollIntoViewIfNeeded();const rect=await card.boundingBox();await page.mouse.move(rect.x+40,rect.y+40)
 await expect(card).toHaveClass(/living-card/);await expect.poll(()=>card.evaluate(el=>el.style.getPropertyValue('--tilt-x'))).not.toBe('')
 await page.mouse.move(1,1);await expect(card).not.toHaveClass(/living-card/)
 await page.goto('/');await page.evaluate(()=>window.scrollTo(0,180));await expect.poll(()=>page.locator('.parallax-scene').evaluate(el=>parseFloat(el.style.getPropertyValue('--far-y')))).toBeGreaterThan(0)
 await page.goto('/settings');await page.getByRole('checkbox',{name:'首页多层视差'}).uncheck();await page.getByRole('checkbox',{name:'鼠标与卡片反馈'}).uncheck()
 await page.goto('/');await page.evaluate(()=>window.scrollTo(0,180));expect(await page.locator('.parallax-scene').evaluate(el=>el.style.getPropertyValue('--far-y'))).toBe('')
})

test('unavailable localStorage does not block navigation or settings',async({page})=>{
 await page.addInitScript(()=>{Storage.prototype.getItem=()=>{throw new DOMException('blocked','SecurityError')};Storage.prototype.setItem=()=>{throw new DOMException('blocked','QuotaExceededError')}})
 await page.goto('/settings');await expect(page.locator('h1')).toBeVisible();await page.getByRole('checkbox',{name:'首页多层视差'}).uncheck();await page.goto('/projects');await expect(page.locator('.project-card')).toHaveCount(11)
})

test('terminal English layout stays readable on a narrow screen',async({page})=>{
 await page.setViewportSize({width:375,height:812})
 await page.addInitScript(()=>{localStorage.setItem('language','en');localStorage.setItem('spacePreferences',JSON.stringify({mode:'terminal',motion:'off'}))})
 for(const path of ['/','/settings','/blog/cs-java-python','/archive']){await page.goto(path);await expect(page.locator('h1')).toBeVisible();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true)}
})
