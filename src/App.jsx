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
import { projects } from './data/projects'
import { localized } from './i18n'
import {extensionFeatures,labProjectIds,artifacts,exhibitions} from './data/extensions'
const extensionPages={nexus:lazy(()=>import('./pages/Nexus')),mirror:lazy(()=>import('./pages/Mirror')),passport:lazy(()=>import('./pages/Passport')),planner:lazy(()=>import('./pages/Planner')),lab:lazy(()=>import('./pages/Lab')),workshop:lazy(()=>import('./pages/Workshop')),exhibitions:lazy(()=>import('./pages/Exhibitions')),'making-of':lazy(()=>import('./pages/MakingOf')),museum:lazy(()=>import('./pages/Museum')),pocket:lazy(()=>import('./pages/Pocket'))}
const BlogDetail = lazy(() => import('./pages/BlogDetail'))
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'))
const Travel = lazy(() => import('./pages/Travel'))
const Explore = lazy(() => import('./pages/Explore'))
const Archive = lazy(() => import('./pages/Archive'))
const Hardware = lazy(() => import('./pages/Hardware'))
const History = lazy(() => import('./pages/History'))
const Learning = lazy(() => import('./pages/Learning'))
const Cinema = lazy(() => import('./pages/Cinema'))
const Letters = lazy(() => import('./pages/Letters'))
const Settings = lazy(() => import('./pages/Settings'))
const Search = lazy(() => import('./pages/Search'))
const spacePages = { '/explore':{Component:Explore,key:'explore'}, '/archive':{Component:Archive,key:'archive'}, '/hardware':{Component:Hardware,key:'hardware'}, '/history':{Component:History,key:'history'}, '/learning':{Component:Learning,key:'learning'}, '/cinema':{Component:Cinema,key:'cinema'}, '/letters':{Component:Letters,key:'letters'}, '/settings':{Component:Settings,key:'settings'}, '/search':{Component:Search,key:'search'} }
export default function App() {
 const { t, i18n } = useTranslation(), { pathname } = useLocation()
 useEffect(() => {
  const post = posts.find(p => pathname === '/blog/' + p.slug)
  const project = projects.find(p => pathname === '/projects/' + p.id)
  const extension=extensionFeatures.find(feature=>{if(pathname===feature.path)return true;const id=pathname.slice(feature.path.length+1);return pathname.startsWith(feature.path+'/')&&({lab:labProjectIds,'making-of':projects.map(p=>p.id),museum:artifacts.filter(p=>p.visibility==='public'&&p.confirmed).map(p=>p.id),exhibitions:exhibitions.filter(p=>p.visibility==='public').map(p=>p.id)}[feature.id]||[]).includes(id)})
  const key = extension?'ext.'+extension.id:spacePages[pathname] ? 'space.'+spacePages[pathname].key : pathname === '/' ? 'home' : pathname === '/projects' ? 'projects' : pathname === '/travel' ? 'travel.title' : pathname === '/blog' ? 'blog' : 'notFound'
  const title = (post?.title || (project && localized(project.name, i18n.language)) || (key === 'projects' ? t('atelier') : t(key))) + " | Rain's Digital Space"
  const description = post?.summary || (project && localized(project.summary, i18n.language)) || (extension?t('ext.'+extension.id+'Intro'):key === 'projects' ? t('projectIntro') : key === 'travel.title' ? t('travel.intro') : key === 'blog' ? t('blogIntro') : localized(profile.bio, i18n.language))
  document.title = title
  document.querySelector('meta[name="description"]').content = description
  document.querySelector('meta[property="og:title"]').content = title
  document.querySelector('meta[property="og:description"]').content = description
  document.querySelector('meta[property="og:type"]').content = post ? 'article' : 'website'
  document.querySelector('meta[property="og:locale"]').content = i18n.language === 'en' ? 'en_US' : 'zh_CN'
  document.querySelector('link[rel="canonical"]').href='https://rains-digital-space.pages.dev'+pathname
  document.querySelector('meta[property="og:url"]').content='https://rains-digital-space.pages.dev'+pathname
  document.querySelector('meta[name="robots"]').content=['/search','/settings','/passport'].includes(pathname)||(!post&&!project&&key==='notFound')?'noindex,follow':'index,follow'
 }, [pathname, t, i18n.language])
 return <Routes><Route element={<Layout />}>
  <Route index element={<Home />} /><Route path="projects" element={<Projects />} /><Route path="blog" element={<Blog />} />
  {Object.entries(extensionPages).map(([path,Component])=><Route key={path} path={path} element={<Suspense fallback={<p className="container" role="status">…</p>}><Component /></Suspense>} />)}
  {['lab','exhibitions','making-of','museum'].map(path=>{const Component=extensionPages[path];return <Route key={path+'-detail'} path={path+'/:id'} element={<Suspense fallback={<p className="container" role="status">…</p>}><Component /></Suspense>} />})}
  {Object.entries(spacePages).map(([path,{Component}])=><Route key={path} path={path.slice(1)} element={<Suspense fallback={<p className="container" role="status">…</p>}><Component /></Suspense>} />)}
  <Route path="travel" element={<Suspense fallback={<p className="container" role="status">{t('travel.loading')}</p>}><Travel /></Suspense>} />
  <Route path="projects/:id" element={<Suspense fallback={<p className="container" role="status">{t('loadingProject')}</p>}><ProjectDetail /></Suspense>} />
  <Route path="blog/:slug" element={<Suspense fallback={<p className="container" role="status">{t('loading')}</p>}><BlogDetail /></Suspense>} />
  <Route path="*" element={<NotFound />} />
 </Route></Routes>
}
