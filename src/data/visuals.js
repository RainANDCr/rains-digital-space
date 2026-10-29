import files from './visual-assets.json'

// These are imagined concept scenes, never personal photographs or travel evidence.
const descriptions = {
 'world-transition': ['海边黄昏与深夜工作台由星光连接的双世界概念插画', 'Concept illustration connecting a sunset shore and a night workspace with starlight'],
 'hero-poetic': ['海边车站的夕阳、相机与翻开的手账', 'Sunset at a seaside station, a camera and an open journal'],
 'hero-digital': ['夜间工作台上的显示器、键盘与窗外月色', 'Monitors and keyboard at a night workspace beside a moonlit window'],
 'world-poster': ['列车、海洋、照片与数字窗口交织的世界观海报', 'A concept poster weaving together a train, ocean, photographs and digital windows'],
 'cover-memory-express': ['列车驶过星空下连接不同风景的拱桥', 'A train crossing an arched bridge connecting landscapes beneath the stars'],
 'cover-little-desk': ['雨夜窗边摆着电脑、相机、书与耳机的书桌', 'A desk with a computer, camera, books and headphones beside a rainy window'],
 'cover-rainos': ['星夜工作室里的虚构操作系统窗口', 'Imagined operating system windows in a starry night studio'],
 'cover-constellation': ['星轨连接学习与旅行片段的想象星图', 'An imagined constellation connecting scenes of learning and travel'],
 'cover-film-darkroom': ['暖色暗房中的胶卷、相机与显影盘', 'Film, a camera and developing trays in a warmly lit darkroom'],
 'cover-rain-post-office': ['雨夜邮局里的信封、明信片与台灯', 'Envelopes, postcards and a desk lamp in a rainy night post office'],
}
export const visualAssets = Object.fromEntries(Object.entries(files).map(([id, file]) => [id, {
 ...file, id, alt: {'zh-CN': descriptions[id][0], en: descriptions[id][1]},
 status: 'ready', origin: 'OpenAI image_gen · 2026-10-29 · original AI concept illustration',
}]))

export const sectionAssets = {archive:'cover-constellation',cinema:'cover-film-darkroom',letters:'cover-rain-post-office'}
export const deskLinks = [
 {id:'computer',route:'/projects',label:'projects',x:28,y:34},
 {id:'camera',route:'/cinema',label:'space.cinema',x:62,y:55},
 {id:'book',route:'/blog',label:'blog',x:31,y:78},
 {id:'letter',route:'/letters',label:'space.letters',x:76,y:80},
]
