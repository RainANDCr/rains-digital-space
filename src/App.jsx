import { lazy, Suspense, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Layout from './components/Layout'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Blog from './pages/Blog'
import NotFound from './pages/NotFound'
import { posts } from './data/posts'
import { profile } from './data/profile'
import { localized } from './i18n'
const BlogDetail = lazy(() => import('./pages/BlogDetail'))
export default function App() {
 const { t, i18n } = useTranslation(), { pathname } = useLocation()
 useEffect(() => {
  const post = posts.find(p => pathname === '/blog/' + p.slug)
  const key = pathname === '/' ? 'home' : pathname === '/projects' ? 'projects' : pathname === '/blog' ? 'blog' : 'notFound'
  const title = (post?.title || t(key)) + " | Rain's Digital Space"
  const description = post?.summary || (key === 'projects' ? t('projectIntro') : key === 'blog' ? t('blogIntro') : localized(profile.bio, i18n.language))
  document.title = title
  document.querySelector('meta[name="description"]').content = description
  document.querySelector('meta[property="og:title"]').content = title
  document.querySelector('meta[property="og:description"]').content = description
  document.querySelector('meta[property="og:type"]').content = post ? 'article' : 'website'
  document.querySelector('meta[property="og:locale"]').content = i18n.language === 'en' ? 'en_US' : 'zh_CN'
 }, [pathname, t, i18n.language])
 return <Routes><Route element={<Layout />}>
  <Route index element={<Home />} /><Route path="projects" element={<Projects />} /><Route path="blog" element={<Blog />} />
  <Route path="blog/:slug" element={<Suspense fallback={<p className="container" role="status">{t('loading')}</p>}><BlogDetail /></Suspense>} />
  <Route path="*" element={<NotFound />} />
 </Route></Routes>
}
