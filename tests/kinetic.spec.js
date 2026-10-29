import {test, expect} from '@playwright/test'

async function preferences(page, value = {}) {
 await page.addInitScript(value => localStorage.setItem('spacePreferences', JSON.stringify({experience:'immersive', motion:'system', reduced:false, rain:'off', cursor:false, guideEnabled:false, ...value})), value)
}

test.describe('kinetic titles', () => {
 test.use({reducedMotion:'no-preference'})

 for (const [mode, style] of [['poetic','ink'], ['terminal','digital']]) {
  test(`${style} aggregates once and leaves selectable semantic text`, async ({page}) => {
   await preferences(page, {mode})
   await page.goto('/nexus')
   const title = page.getByRole('heading', {level:1}), overlay = title.locator('.kinetic-glyphs')
   await expect(title).toHaveAttribute('data-kinetic-style', style)
   await expect(overlay).toHaveAttribute('aria-hidden','true')
   await expect(title).toHaveAccessibleName(await title.locator('.kinetic-text').innerText())
   await expect(page.locator('.page-enter')).toHaveCSS('animation-name','none')
   const text = await title.locator('.kinetic-text').innerText()
   expect(await title.evaluate(node => {const range=document.createRange(); range.selectNodeContents(node.querySelector('.kinetic-text')); const selection=getSelection(); selection.removeAllRanges(); selection.addRange(range); return selection.toString()})).toBe(text)
   await expect(overlay).toHaveCount(0)
   await page.evaluate(() => window.scrollTo(0,document.body.scrollHeight))
   await page.evaluate(() => window.scrollTo(0,0))
   await page.locator('.nav-actions .mode-button').click()
   await page.waitForTimeout(150)
   await expect(overlay).toHaveCount(0)
   await page.locator('.language-button').click()
   await expect(title.locator('.kinetic-text')).not.toHaveText(text)
   await expect(overlay).toHaveCount(0)
  })
 }

 test('active animation cancels on reduced motion and rapid route changes', async ({page}) => {
  await preferences(page)
  const errors=[];page.on('pageerror',error=>errors.push(error.message))
  await page.goto('/nexus')
  await expect(page.locator('.kinetic-glyphs')).toHaveCount(1)
  await page.emulateMedia({reducedMotion:'reduce'})
  await expect(page.locator('.kinetic-glyphs')).toHaveCount(0)
  await page.emulateMedia({reducedMotion:'no-preference'})
  await expect(page.locator('.kinetic-glyphs')).toHaveCount(0)
  await page.locator('#navigation a[href="/explore"]').click()
  await expect(page.getByRole('heading',{level:1})).toBeVisible()
  await page.locator('a[href="/archive"]').first().click()
  await expect(page.locator('.kinetic-glyphs')).toHaveCount(1)
  await page.goBack()
  await expect(page.locator('.kinetic-glyphs')).toHaveCount(0)
  expect(errors).toEqual([])
 })

 test('unsupported observers and lite mode retain the full heading', async ({page}) => {
  await preferences(page, {experience:'lite'})
  await page.goto('/archive')
  await expect(page.locator('.kinetic-title')).toBeVisible()
  await expect(page.locator('.kinetic-glyphs')).toHaveCount(0)
  await preferences(page)
  await page.addInitScript(() => {delete window.IntersectionObserver})
  await page.goto('/nexus')
  await expect(page.locator('.kinetic-text')).toBeVisible()
  await expect(page.locator('.kinetic-glyphs')).toHaveCount(0)
 })

 test('both worlds fit phone, tablet and desktop widths', async ({page}) => {
  await preferences(page)
  for (const width of [375,768,1024,1440]) {
   await page.setViewportSize({width,height:900})
   await page.goto('/nexus')
   for (let world=0;world<2;world++) {
    await expect(page.locator('.kinetic-text')).toBeVisible()
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true)
    await page.getByRole('button',{name:'切换主题',exact:true}).click()
    await expect(page.locator('.kinetic-text')).toBeVisible()
    await page.locator('.nav-actions .mode-button').click()
   }
  }
 })

 test('wrapped titles use the original text without a misaligned glyph layer', async ({page}) => {
  await preferences(page)
  await page.addInitScript(() => document.addEventListener('DOMContentLoaded', () => {
   const style=document.createElement('style');style.textContent='.space-heading h1{max-width:2ch!important}';document.head.append(style)
  }))
  await page.goto('/nexus')
  await expect(page.locator('.kinetic-text')).toBeVisible()
  expect(await page.locator('.kinetic-text').evaluate(node=>node.getClientRects().length)).toBeGreaterThan(1)
  await expect(page.locator('.kinetic-glyphs')).toHaveCount(0)
 })

 test('waits for the title to enter the viewport', async ({page}) => {
  await preferences(page)
  await page.addInitScript(() => document.addEventListener('DOMContentLoaded', () => {
   const style=document.createElement('style');style.textContent='.space-heading{margin-top:1500px!important}';document.head.append(style)
  }))
  await page.goto('/nexus')
  await expect(page.locator('.kinetic-title')).toHaveAttribute('data-kinetic-state','static')
  await expect(page.locator('.kinetic-glyphs')).toHaveCount(0)
  await page.locator('.kinetic-title').scrollIntoViewIfNeeded()
  await expect(page.locator('.kinetic-glyphs')).toHaveCount(1)
  await expect(page.locator('.kinetic-glyphs')).toHaveCount(0)
 })
})

test('system reduced motion starts with a static title', async ({page}) => {
 await preferences(page)
 await page.goto('/nexus')
 await expect(page.locator('.kinetic-title')).toHaveAttribute('data-kinetic-state','static')
 await expect(page.locator('.kinetic-glyphs')).toHaveCount(0)
 await expect(page.locator('.kinetic-text')).toBeVisible()
})
