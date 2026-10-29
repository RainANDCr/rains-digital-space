import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import zh from './locales/zh-CN.json'
import en from './locales/en.json'
import { spaceText } from './locales/space'
import {extensionText} from './locales/extensions'
let language
try { language = localStorage.getItem('language') } catch {}
if (!['zh-CN', 'en'].includes(language)) language = navigator.language.startsWith('zh') ? 'zh-CN' : 'en'
const space = index => Object.fromEntries(Object.entries(spaceText).map(([key, values]) => [key, values[index]]))
const extension=index=>Object.fromEntries(Object.entries(extensionText).map(([key,values])=>[key,values[index]]))
i18n.use(initReactI18next).init({ resources: { 'zh-CN': { translation: { ...zh, space:space(0),ext:extension(0) } }, en: { translation: { ...en, space:space(1),ext:extension(1) } } }, lng: language, fallbackLng: 'zh-CN', interpolation: { escapeValue: false } })
i18n.on('languageChanged', lng => { document.documentElement.lang = lng; try { localStorage.setItem('language', lng) } catch {} })
document.documentElement.lang = language
export default i18n
export const localized = (v, lng) => typeof v === 'string' ? v : v?.[lng] ?? v?.['zh-CN'] ?? ''
