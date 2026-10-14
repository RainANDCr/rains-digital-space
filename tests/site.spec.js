import { test, expect } from '@playwright/test'
import { filterPosts, filterProjects, safeExternal } from '../src/utils/filter.js'
import { readFileSync, readdirSync } from 'node:fs'

test('eleven complete articles meet the length requirement', () => {
 const files = readdirSync('src/content').filter(name => name.endsWith('.md'))
 expect(files).toHaveLength(11)
 for (const name of files) {
  const article = readFileSync('src/content/' + name, 'utf8')
  expect((article.match(/[\u3400-\u9fff]/g) || []).length, name).toBeGreaterThanOrEqual(2000)
 }
})

test('every article URL loads directly', async ({ page }) => {
 for (const name of readdirSync('src/content').filter(name => name.endsWith('.md'))) {
  await page.goto('/blog/' + name.slice(0, -3))
  await expect(page.locator('.prose')).toBeVisible()
  await expect(page.locator('.reading h1')).toBeVisible()
  await expect(page.getByText('草稿', { exact: true })).toHaveCount(0)
 }
})
test('search combinations and safe external links', () => {
 const posts = [{title:'React Guide',summary:'Intro',tags:['JS'],category:'Web'},{title:'Python',summary:'React comparison',tags:['AI'],category:'AI'}]
 expect(filterPosts(posts,{query:'REACT'})).toHaveLength(2)
 expect(filterPosts(posts,{query:'react',tag:'JS',category:'Web'})).toHaveLength(1)
 expect(filterPosts(posts,{query:'react',tag:'AI',category:'Web'})).toHaveLength(0)
 expect(filterPosts(posts,{query:'  INTRO '})).toHaveLength(1)
 expect(filterProjects([{category:'Web'}],'Java')).toHaveLength(0)
 expect(filterProjects([{category:'Web'}],'All')).toHaveLength(1)
 expect(safeExternal('javascript:alert(1)')).toBeNull()
 expect(safeExternal('')).toBeNull()
 expect(safeExternal('https://github.com/example/repo')).toBe('https://github.com/example/repo')
 const read = lang => JSON.parse(readFileSync('src/locales/' + lang + '.json','utf8').replace(/^\uFEFF/,''))
 expect(Object.keys(read('en')).sort()).toEqual(Object.keys(read('zh-CN')).sort())
})
test('navigation, filters, markdown and persisted preferences', async ({page}) => {
 const errors = []; page.on('pageerror', error => errors.push(error.message))
 await page.goto('/')
 await expect(page.getByRole('heading',{name:'你好，我是 Rain.'})).toBeVisible()
 await page.getByRole('link',{name:'关于我',exact:true}).click()
 await expect(page).toHaveURL(/#about/)
 await page.getByRole('group',{name:'技术栈'}).getByRole('button',{name:'Web 开发'}).click()
 await expect(page.locator('.skills-grid .card')).toHaveCount(4)
 await page.getByRole('link',{name:'项目',exact:true}).click()
 await page.getByRole('button',{name:'AI',exact:true}).click()
 await expect(page.locator('.empty')).toBeVisible()
 await page.getByRole('button',{name:'全部',exact:true}).click()
 await expect(page.locator('.project-card')).toHaveCount(3)
 await expect(page.locator('.project-card a')).toHaveCount(0)
 await page.getByRole('link',{name:'博客',exact:true}).click()
 await page.getByRole('searchbox').fill('PYTHON')
 await expect(page.locator('.blog-grid .card')).toHaveCount(1)
 await page.getByRole('group',{name:'标签',exact:true}).getByRole('button',{name:'北京',exact:true}).click()
 await expect(page.locator('.blog-grid .card')).toHaveCount(0)
 await page.getByRole('button',{name:'重置筛选'}).click()
 await expect(page.locator('.blog-grid .card')).toHaveCount(11)
 await page.goto('/blog/cs-data-structures')
 await expect(page.locator('.prose table')).toBeVisible()
 await page.goto('/blog/cs-java-python')
 await expect(page.locator('.prose .hljs-keyword').first()).toBeVisible()
 await expect(page.locator('.prose script')).toHaveCount(0)
 await page.reload()
 await expect(page.locator('.prose')).toBeVisible()
 await page.getByRole('button',{name:'English',exact:true}).click()
 await expect(page.locator('.notice')).toContainText('No translation')
 const before = await page.locator('html').getAttribute('data-theme')
 await page.getByRole('button',{name:'Toggle theme'}).click()
 const after = await page.locator('html').getAttribute('data-theme')
 expect(after).not.toBe(before)
 await page.reload()
 await expect(page.locator('html')).toHaveAttribute('data-theme',after)
 await expect(page.locator('html')).toHaveAttribute('lang','en')
 await page.goto('/blog/missing')
 await expect(page.getByRole('heading',{name:'Page not found'})).toBeVisible()
 expect(errors).toEqual([])
})
for (const width of [375,768,1024,1440]) {
 test('responsive themes and pages at ' + width, async ({page}) => {
  await page.setViewportSize({width,height:900})
  for (const theme of ['dark','light']) {
   await page.addInitScript(value => localStorage.setItem('theme',value),theme)
   for (const language of ['zh-CN','en']) {
    await page.addInitScript(value => localStorage.setItem('language',value),language)
    for (const path of ['/','/projects','/blog','/blog/beijing-travel','/blog/freshman-year-review','/missing']) {
     await page.goto(path)
     await expect(page.locator('h1').first()).toBeVisible()
     expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
     await expect(page.locator('html')).toHaveAttribute('data-theme',theme)
     await expect(page.locator('html')).toHaveAttribute('lang',language)
    }
   }
  }
  if (width === 375) {
   await page.goto('/')
   await page.getByRole('button',{name:'Toggle navigation'}).click()
   await expect(page.getByRole('navigation')).toBeVisible()
   await page.getByRole('navigation').getByRole('link',{name:'Projects',exact:true}).click()
   await expect(page.getByRole('navigation')).toBeHidden()
  }
  await page.goto('/')
  await page.screenshot({path:'test-results/home-' + width + '.png',fullPage:true})
 })
}
test('system defaults, reduced motion, keyboard and dark screenshots', async ({browser}) => {
 const context = await browser.newContext({locale:'en-US',colorScheme:'dark',reducedMotion:'no-preference',viewport:{width:1440,height:1000}})
 const page = await context.newPage()
 await page.goto('http://127.0.0.1:4175/')
 await expect(page.locator('html')).toHaveAttribute('data-theme','dark')
 await expect(page.locator('html')).toHaveAttribute('lang','en')
 const initial = await page.locator('.typewriter').textContent()
 await expect.poll(() => page.locator('.typewriter').textContent()).not.toBe(initial)
 await page.emulateMedia({reducedMotion:'reduce'})
 await expect(page.locator('.typewriter')).toHaveText('Computer Science Student|')
 await expect(page.locator('.page-enter')).toHaveCSS('animation-name','none')
 await page.screenshot({path:'test-results/dark-desktop.png',fullPage:true})
 await page.setViewportSize({width:375,height:900})
 await page.screenshot({path:'test-results/dark-mobile.png',fullPage:true})
 await page.getByRole('button',{name:'Toggle navigation'}).click()
 await page.getByRole('navigation').getByRole('link',{name:'Home',exact:true}).focus()
 await page.keyboard.press('Escape')
 await expect(page.getByRole('navigation')).toBeHidden()
 await expect(page.getByRole('button',{name:'Toggle navigation'})).toBeFocused()
 await page.goto('http://127.0.0.1:4175/blog/freshman-year-review')
 await expect(page).toHaveTitle(/大一年度总结/)
 await expect(page.locator('meta[property="og:type"]')).toHaveAttribute('content','article')
 await context.close()
 const light = await browser.newContext({locale:'zh-CN',colorScheme:'light'})
 const lightPage = await light.newPage()
 await lightPage.goto('http://127.0.0.1:4175/')
 await expect(lightPage.locator('html')).toHaveAttribute('data-theme','light')
 await expect(lightPage.locator('html')).toHaveAttribute('lang','zh-CN')
 await light.close()
})
