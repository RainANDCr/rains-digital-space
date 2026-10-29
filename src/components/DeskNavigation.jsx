import {Link} from 'react-router-dom'
import {useTranslation} from 'react-i18next'
import SceneImage from './SceneImage'
import {deskLinks} from '../data/visuals'
import SceneStillLife from './SceneStillLife'
export default function DeskNavigation() {
 const {t}=useTranslation()
 return <section className="desk-navigation" aria-labelledby="desk-title"><div className="section-heading"><div><h2 id="desk-title">{t('space.littleDesk')}</h2><p className="muted">{t('space.deskIntro')}</p></div></div><div className="desk-scene"><SceneImage assetId="cover-little-desk" /><SceneStillLife /><nav className="desk-hotspots" aria-label={t('space.littleDesk')}>{deskLinks.map(item=><Link data-glass="clear" key={item.id} to={item.route} style={{left:item.x+'%',top:item.y+'%'}}>{t(item.label)} <span aria-hidden="true">↗</span></Link>)}</nav></div></section>
}
