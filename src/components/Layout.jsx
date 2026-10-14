import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useTheme } from './ThemeProvider'
import PointerParticles from './PointerParticles'
export default function Layout() {
 const { t, i18n } = useTranslation()
 const { theme, toggle } = useTheme()
 const [open, setOpen] = useState(false)
 const [scrolled, setScrolled] = useState(false)
 const location = useLocation()
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
  if (media.matches) return
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
   <div className="nav-shell">
    <Link className="brand" to="/">Rain<span>.space</span></Link>
    <button className="menu-toggle icon-button" aria-expanded={open} aria-controls="navigation" aria-label={t('menu')} onClick={() => setOpen(!open)}>☰</button>
    <nav id="navigation" className={open ? 'open' : ''} aria-label={t('nav')} onKeyDown={e => { if (e.key === 'Escape') { setOpen(false); document.querySelector('.menu-toggle')?.focus() } }} onClick={() => setOpen(false)}>
     <NavLink to="/" end>{t('home')}</NavLink><Link to="/#about">{t('about')}</Link>
     <NavLink to="/projects">{t('projects')}</NavLink><NavLink to="/blog">{t('blog')}</NavLink><Link to="/#contact">{t('contact')}</Link>
    </nav>
    <div className="nav-actions"><button className="icon-button" onClick={toggle} aria-label={t('theme')} title={t('theme')}>{theme === 'dark' ? '☾' : '☀'}</button>
    <button className="language-button" onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'zh-CN' : 'en')}>{t('language')}</button></div>
   </div>
  </header>
  <main id="main" tabIndex={-1}><div key={location.pathname} className="page-enter"><Outlet /></div></main>
  <footer className="site-footer"><div><Link className="brand" to="/">Rain's Digital Space</Link><p>{t('footer')}</p></div><p>© {new Date().getFullYear()} Rain</p><Link to="/#contact">{t('contact')} ↗</Link></footer>
 </div>
}
