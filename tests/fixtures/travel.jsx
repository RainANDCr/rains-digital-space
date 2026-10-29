// 独立测试页面，不被应用入口引用，也不会打包到 dist。
import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import '../../src/i18n'
import '../../src/styles/global.css'
import '../../src/styles/world.css'
import Travel from '../../src/pages/Travel'
const entries = [
 { slug:'fixture-a', city:'测试城市 A', title:'测试明信片 A', visibility:'public', confirmed:true, visitDate:'2024-06', tags:['海边'], summary:'仅用于交互测试', publicCoordinates:{ lat:20, lng:35 }, photos:[
  { src:'/images/2048-cover.svg', alt:'测试插画 A', caption:'第一张测试图' },
  { src:'/images/what-to-eat-cover.svg', alt:'测试插画 B', caption:'第二张测试图' },
  { src:'/images/missing-fixture.webp', alt:'测试失败图片', caption:'失败图测试' }
 ] },
 { slug:'fixture-b', city:'测试城市 B', visibility:'public', confirmed:true, visitDate:'2025', tags:['历史'], summary:'无坐标的测试条目', photos:[] },
 { slug:'fixture-hidden', city:'不得展示的测试条目', visibility:'draft', confirmed:false }
]
createRoot(document.getElementById('root')).render(<BrowserRouter><Travel entries={entries} /></BrowserRouter>)
