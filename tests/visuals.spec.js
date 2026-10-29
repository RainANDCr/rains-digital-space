import {test,expect} from '@playwright/test'
import {readFileSync,existsSync} from 'node:fs'

test('all ten assets have real responsive files and preserve original sources',()=>{
 const assets=JSON.parse(readFileSync('src/data/visual-assets.json','utf8'))
 expect(Object.keys(assets)).toHaveLength(10)
 for(const asset of Object.values(assets)){
  expect(existsSync('output/imagegen/2026-10-29-priority-10/'+asset.source)).toBe(true)
  expect(asset.variants).toHaveLength(2)
  for(const image of asset.variants){expect(existsSync('public'+image.src)).toBe(true);expect(image.width).toBeGreaterThan(0);expect(image.height).toBeGreaterThan(0)}
 }
})

test('world artwork switches without losing the current URL or project filters',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message))
 await page.goto('/');await expect(page.locator('.prologue-art')).toHaveAttribute('data-state','ready')
 await expect(page.locator('.prologue-art img')).toHaveAttribute('src',/hero-poetic/)
 await page.locator('.mode-button').click();await expect(page).toHaveURL(/4175\/$/)
 await expect(page.locator('.prologue-art img')).toHaveAttribute('src',/hero-digital/)
 await expect(page.locator('.prologue-art')).toHaveAttribute('data-state','ready')
 await page.goto('/projects?category=AI&q=ai');const url=page.url()
 await expect(page.locator('.section-cover img')).toHaveAttribute('src',/rainos/)
 const count=await page.locator('.project-card').count();await page.locator('.mode-button').click()
 await expect(page).toHaveURL(url);await expect(page.locator('.project-card')).toHaveCount(count)
 await page.reload();await expect(page.locator('html')).toHaveAttribute('data-mode','poetic')
 expect(errors).toEqual([])
})

test('missing artwork keeps the hero and desk navigation usable',async({page})=>{
 await page.route('**/images/worlds/**',route=>route.abort())
 await page.goto('/');await expect(page.locator('.prologue-art')).toHaveAttribute('data-state','error')
 await expect(page.locator('h1')).toBeVisible();await page.locator('.train-stops a').first().click();await expect(page).toHaveURL(/\/travel$/)
 await page.goto('/explore');await expect(page.locator('.chapter-portal>a')).toHaveCount(8)
 await page.locator('.desk-hotspots a').first().click();await expect(page).toHaveURL(/\/projects$/)
})

test('artwork and navigation fit narrow screens in both worlds and languages',async({page})=>{
 test.setTimeout(120000)
 await page.goto('/')
 for(const width of [320,375,768,1024,1440]){
  await page.setViewportSize({width,height:900})
  for(const mode of ['poetic','terminal']){
   await page.evaluate(mode=>localStorage.setItem('spacePreferences',JSON.stringify({mode,motion:'off'})),mode)
   for(const path of ['/','/explore','/archive','/cinema','/letters']){
    await page.goto(path);await expect(page.locator('h1')).toBeVisible()
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${width} ${mode} ${path}`).toBe(true)
    if(path==='/explore'){await expect(page.locator('.desk-hotspots a').first()).toBeVisible();await page.getByRole('button',{name:'English',exact:true}).click();await expect(page.locator('#desk-title')).toHaveText('My Little Desk');expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);await page.getByRole('button',{name:'简体中文',exact:true}).click()}
    if([375,1440].includes(width)&&path==='/'){await expect(page.locator('.prologue-art')).toHaveAttribute('data-state','ready');await page.screenshot({path:`test-results/visual-${width}-${mode}.png`})}
   }
  }
 }
})
