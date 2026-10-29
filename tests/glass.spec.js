import {test,expect} from '@playwright/test'

async function start(page,path='/') {
 await page.emulateMedia({reducedMotion:'no-preference'})
 await page.addInitScript(()=>{if(!localStorage.getItem('spacePreferences'))localStorage.setItem('spacePreferences',JSON.stringify({experience:'immersive',cursor:true,reduced:false,guideEnabled:false}))})
 await page.goto(path)
}
test('navigation glass follows actual links after rapid navigation, language and resize',async({page})=>{
 await page.setViewportSize({width:1440,height:900});await start(page)
 const nav=page.locator('#navigation'),indicator=nav.locator('.glass-nav-indicator')
 await expect(indicator).toHaveAttribute('data-ready','true')
 await nav.getByRole('link',{name:'项目',exact:true}).click()
 await nav.getByRole('link',{name:'博客',exact:true}).click()
 await expect(page).toHaveURL(/\/blog$/)
 await page.getByRole('button',{name:'English',exact:true}).click()
 await expect.poll(()=>nav.evaluate(el=>{
  const a=el.querySelector('a[aria-current]').getBoundingClientRect(),b=el.querySelector('.glass-nav-indicator').getBoundingClientRect()
  return Math.abs(a.left-b.left)+Math.abs(a.width-b.width)
 })).toBeLessThan(2)
 await page.keyboard.press('Tab');expect(await page.evaluate(()=>document.activeElement.tagName)).not.toBe('BODY')
 await page.setViewportSize({width:375,height:812})
 const toggle=page.locator('.menu-toggle');await toggle.click()
 await expect(nav).toBeVisible();await expect(toggle).toHaveAttribute('aria-expanded','true')
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true)
 await page.keyboard.press('Escape');await expect(toggle).toBeFocused();await expect(nav).toBeHidden()
})
test('glass highlight reuses pointer tracking and is cleared in lite mode',async({page})=>{
 await page.setViewportSize({width:1440,height:900});await start(page,'/settings')
 const control=page.locator('.nav-actions .mode-button')
 await control.hover();await expect(control).toHaveClass(/glass-pointer/)
 await expect.poll(()=>control.evaluate(el=>el.style.getPropertyValue('--light-x'))).not.toBe('')
 await page.getByRole('button',{name:'轻量模式',exact:true}).click()
 await expect(control).not.toHaveClass(/glass-pointer/)
 await expect(page.locator('.nav-shell')).toHaveCSS('backdrop-filter','none')
 await control.hover();await expect(control).not.toHaveClass(/glass-pointer/)
 expect(await control.evaluate(el=>el.style.getPropertyValue('--light-x'))).toBe('')
 await expect(page.getByRole('button',{name:'轻量模式',exact:true})).toHaveAttribute('aria-pressed','true')
 await page.reload();await expect(page.locator('html')).toHaveAttribute('data-experience','lite')
})
test('glass stays readable with reduced motion, high contrast and a no-blur fallback',async({page})=>{
 await start(page,'/blog/cs-java-python')
 await expect(page.locator('.prose')).toHaveCSS('backdrop-filter','none')
 for(const theme of ['light','dark'])for(const mode of ['poetic','terminal']){
  await page.evaluate(({theme,mode})=>{document.documentElement.dataset.theme=theme;document.documentElement.dataset.mode=mode},{theme,mode})
  await page.emulateMedia({reducedMotion:'reduce'})
  await expect(page.locator('.nav-shell')).toHaveCSS('backdrop-filter','none')
  await expect(page.locator('.nav-shell')).toHaveCSS('color',await page.locator('html').evaluate(el=>getComputedStyle(el).color))
 }
 await page.emulateMedia({forcedColors:'active'})
 await expect(page.locator('.nav-shell')).toHaveCSS('backdrop-filter','none')
 await expect(page.locator('.nav-shell')).toHaveCSS('background-image','none')
})
for(const width of [375,768,1024,1440])test(`glass controls fit ${width}px in both worlds and languages`,async({page})=>{
 await page.setViewportSize({width,height:900});await start(page,'/settings')
 for(const language of ['zh-CN','en'])for(const mode of ['poetic','terminal']){
  if(await page.locator('html').getAttribute('lang')!==language)await page.locator('.language-button').click()
  if(await page.locator('html').getAttribute('data-mode')!==mode)await page.locator('.nav-actions .mode-button').click()
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true)
  const buttons=page.locator('.nav-actions button')
  for(const button of await buttons.all())expect((await button.boundingBox()).height).toBeGreaterThanOrEqual(44)
 }
})

test('transparent navigation text meets 4.5 contrast over light and dark backdrops',async({page})=>{
 await page.setViewportSize({width:1440,height:900});await start(page)
 for(const theme of ['dark','light'])for(const mode of ['poetic','terminal']){
  const contrasts=await page.evaluate(({theme,mode})=>{
   document.documentElement.dataset.theme=theme;document.documentElement.dataset.mode=mode
   const nav=document.querySelector('.nav-shell'),link=document.querySelector('#navigation>a')
   const canvas=document.createElement('canvas');canvas.width=canvas.height=1;const ctx=canvas.getContext('2d')
   const pixel=(paint,base)=>{ctx.clearRect(0,0,1,1);ctx.fillStyle=base;ctx.fillRect(0,0,1,1);ctx.fillStyle=paint;ctx.fillRect(0,0,1,1);return [...ctx.getImageData(0,0,1,1).data].slice(0,3)}
   const luminance=rgb=>rgb.map(v=>v/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4).reduce((sum,v,i)=>sum+v*[.2126,.7152,.0722][i],0)
   const a=luminance(pixel(getComputedStyle(link).color,'white'))
   return ['white','black'].map(base=>{const b=luminance(pixel(getComputedStyle(nav).backgroundColor,base));return (Math.max(a,b)+.05)/(Math.min(a,b)+.05)})
  },{theme,mode})
  for(const value of contrasts)expect(value).toBeGreaterThanOrEqual(4.5)
 }
})
