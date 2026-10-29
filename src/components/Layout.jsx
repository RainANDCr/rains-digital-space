import { useEffect, useState, useRef } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useTheme } from './ThemeProvider'
import PointerParticles from './PointerParticles'
import { world } from '../data/world'
import { localized } from '../i18n'
import Guide from './Guide'
import { usePreferences } from './PreferencesProvider'
import {useCardMotion} from '../hooks/useCardMotion'
import WorldMirror from './WorldMirror'
import TourGuide from './TourGuide'
import {visitRoutes} from '../data/extensions'
import {useGlassNavigation} from '../hooks/useGlassNavigation'
export default function Layout() {
 const { t, i18n } = useTranslation()
 const { theme, toggle } = useTheme()
 const { recordVisit } = usePreferences()
 const [open, setOpen] = useState(false)
 const [scrolled, setScrolled] = useState(false)
 const location = useLocation()
 const navigation=useRef(null)
 useGlassNavigation(navigation,location.pathname+location.hash,i18n.language,open)
 useEffect(()=>{if(visitRoutes.includes(location.pathname))recordVisit(location.pathname)},[location.pathname,recordVisit])
 useCardMotion()
 useEffect(() => {
  const update = () => setScrolled(window.scrollY > 16)
  update(); window.addEventListener('scroll', update, { passive: true })
  return () => window.removeEventListener('scroll', update)
 }, [])
 useEffect(() => {
  setOpen(false)
  const target = location.hash && document.getElementById(location.hash.slice(1))
  if (target) { target.scrollIntoView(); target.focus({ preventScroll: true }) }
  else { window.scrollTo(0, 0); document.getElementById('main')?.focus({ preventScroll: true }) }
 }, [location.pathname, location.hash])
 useEffect(() => {
  const media = matchMedia('(prefers-reduced-motion: reduce)')
  if (media.matches||!('IntersectionObserver' in window)) return
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
   if (entry.isIntersecting) { entry.target.classList.remove('reveal-pending'); observer.unobserve(entry.target) }
  }), { threshold: .08 })
  document.querySelectorAll('[data-reveal]').forEach(el => { el.classList.add('reveal-pending'); observer.observe(el) })
  const show = () => document.querySelectorAll('.reveal-pending').forEach(el => el.classList.remove('reveal-pending'))
  media.addEventListener('change', show)
  return () => { show(); observer.disconnect(); media.removeEventListener('change', show) }
 }, [location.pathname])
 return <div className="site-layout">

  <PointerParticles />
  <a className="skip-link" href="#main">{t('skip')}</a>
  <header className={'site-header ' + (scrolled ? 'scrolled' : '')}>
   <div className="nav-shell" data-glass="regular">
    <Link className="brand" to="/">Rain<span>.space</span></Link>
    <button className="menu-toggle icon-button" data-glass="clear" aria-expanded={open} aria-controls="navigation" aria-label={t('menu')} onKeyDown={event=>{if(event.key==='Escape')setOpen(false)}} onClick={() => setOpen(!open)}>☰</button>
    <nav ref={navigation} id="navigation" className={open ? 'open' : ''} aria-label={t('nav')} onKeyDown={e => { if (e.key === 'Escape') { setOpen(false); document.querySelector('.menu-toggle')?.focus() } }} onClick={() => setOpen(false)}>
     <span className="glass-nav-indicator" aria-hidden="true" />
     <Link to="/" aria-current={location.pathname === '/' && !location.hash ? 'page' : undefined}>{t('home')}</Link><Link to="/#about" aria-current={location.pathname === '/' && location.hash === '#about' ? 'location' : undefined}>{t('about')}</Link>
     <NavLink to="/projects">{t('projects')}</NavLink><NavLink to="/travel">{t('travel.nav')}</NavLink><NavLink to="/blog">{t('blog')}</NavLink><NavLink to="/explore">{t('space.explore')}</NavLink><Link to="/#contact" aria-current={location.pathname === '/' && location.hash === '#contact' ? 'location' : undefined}>{t('contact')}</Link>
    </nav>
    <div className="nav-actions"><button className="icon-button" data-glass="clear" onClick={toggle} aria-label={t('theme')} title={t('theme')}>{theme === 'dark' ? '☾' : '☀'}</button>
    <button className="language-button" data-glass="clear" onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'zh-CN' : 'en')}>{t('language')}</button><WorldMirror /><Link className="settings-link" data-glass="clear" to="/settings" aria-label={t('space.settings')}>⚙</Link></div>
   </div>
  </header>
  <main id="main" tabIndex={-1}><TourGuide /><div key={location.pathname} className="page-enter"><Outlet /></div></main>
  <Guide />
  <footer className="site-footer"><div><Link className="brand" to="/">Rain's Digital Space</Link><p>{t('footer')}</p></div><p>© {new Date().getFullYear()} Rain</p><Link to="/#contact">{t('contact')} ↗</Link><button className="back-top" onClick={() => { window.scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }); document.getElementById('main')?.focus({ preventScroll: true }) }} aria-label={localized(world.top, i18n.language)}>↑</button></footer>
 </div>
}
