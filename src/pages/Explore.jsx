import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { areas } from '../data/spaces'
import SceneImage from '../components/SceneImage'
import SectionCover from '../components/SectionCover'
import DeskNavigation from '../components/DeskNavigation'
import {extensionFeatures} from '../data/extensions'
const covers={'/projects':'cover-rainos','/travel':'cover-memory-express','/archive':'cover-constellation','/cinema':'cover-film-darkroom','/letters':'cover-rain-post-office'}
export default function Explore() {
 const {t}=useTranslation()
 const chapters=[{path:'/projects',key:'atelier',glyph:'⌘',mark:'02'},{path:'/travel',key:'travel.title',glyph:'◇',mark:'03'},...areas]
 return <section className="container section"><p className="chapter-label">Rain’s Digital Space</p><h1>{t('space.explore')}</h1><p className="section-description">{t('space.intro')}</p>
  <SectionCover assetId="world-transition" className="explore-art" />
  <DeskNavigation />
  <div className="chapter-portal">{chapters.map(area=><Link key={area.path} to={area.path}>{covers[area.path]?<SceneImage className="portal-art" assetId={covers[area.path]} decorative sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 400px" />:<span aria-hidden="true">{area.glyph}</span>}<small>{area.mark}</small><h2>{t(area.key.includes('.')||area.key==='atelier'?area.key:'space.'+area.key)}</h2><p>{t('space.open')} ↗</p></Link>)}</div>
  <div className="actions"><Link className="button secondary" to="/search">{t('space.search')}</Link><Link className="button secondary" to="/settings">{t('space.settings')}</Link></div>
  <section className="space-block" aria-labelledby="extensions-heading"><h2 id="extensions-heading">{t('ext.extensionHeading')}</h2><div className="extension-grid">{extensionFeatures.map(feature=><Link className="extension-tile" key={feature.id} to={feature.path}><span aria-hidden="true">{feature.glyph}</span><h3>{t('ext.'+feature.id)}</h3><p>{t('ext.'+feature.id+'Intro')}</p></Link>)}</div></section>
  <section className="world-intro" aria-labelledby="worlds-title"><SceneImage assetId="world-poster" sizes="(max-width: 600px) 100vw, 480px" /><div><h2 id="worlds-title">{t('space.worldsTitle')}</h2><p>{t('space.worldsIntro')}</p><p><small>{t('space.conceptArt')}</small></p><Link className="button secondary" to="/settings">{t('space.visualMode')}</Link></div></section>
 </section>
}
