import React from 'react'
import { createRoot } from 'react-dom/client'
import '../../src/i18n'
import '../../src/styles/global.css'
import '../../src/styles/world.css'
import '../../src/styles/travel.css'
import '../../src/styles/space.css'
import Cinema from '../../src/pages/Cinema'
import {PreferencesProvider} from '../../src/components/PreferencesProvider'
const media=[{id:'fixture-film',title:'仅用于测试的相册',visibility:'public',confirmed:true,photos:[{src:'/images/2048-cover.svg',alt:'项目插画测试图'}],video:{src:'/test-only-missing-video.mp4',title:'测试视频，不播放'}}]
createRoot(document.getElementById('root')).render(<PreferencesProvider><Cinema media={media} /></PreferencesProvider>)
