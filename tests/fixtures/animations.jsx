import React from 'react'
import {createRoot} from 'react-dom/client'
import {PreferencesProvider} from '../../src/components/PreferencesProvider'
import PhotoGallery from '../../src/components/PhotoGallery'
import '../../src/i18n'
import '../../src/styles/global.css'
import '../../src/styles/world.css'
createRoot(document.getElementById('root')).render(<PreferencesProvider><PhotoGallery photos={[
 {src:'/images/2048-cover.svg',alt:'测试图片一'},
 {src:'/images/what-to-eat-cover.svg',alt:'测试图片二'}
]} /></PreferencesProvider>)
