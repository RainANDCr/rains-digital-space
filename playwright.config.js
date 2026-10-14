import { defineConfig } from '@playwright/test'
export default defineConfig({
 testDir: './tests', timeout: 30000, workers: 1,
 use: { baseURL: 'http://127.0.0.1:4175', browserName: 'chromium', channel: 'msedge', locale: 'zh-CN', reducedMotion: 'reduce' },
})

