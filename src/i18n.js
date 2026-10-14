import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import zh from './locales/zh-CN.json'
import en from './locales/en.json'
let language
try { language = localStorage.getItem('language') } catch {}
if (!['zh-CN', 'en'].includes(language)) language = navigator.language.startsWith('zh') ? 'zh-CN' : 'en'
i18n.use(initReactI18next).init({ resources: { 'zh-CN': { translation: zh }, en: { translation: en } }, lng: language, fallbackLng: 'zh-CN', interpolation: { escapeValue: false } })
i18n.on('languageChanged', lng => { document.documentElement.lang = lng; try { localStorage.setItem('language', lng) } catch {} })
document.documentElement.lang = language
export default i18n
export const localized = (v, lng) => typeof v === 'string' ? v : v?.[lng] ?? v?.['zh-CN'] ?? ''
