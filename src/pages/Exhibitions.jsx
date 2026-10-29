import {Link,useParams} from 'react-router-dom'
import {useTranslation} from 'react-i18next'
import {useState} from 'react'
import {exhibitions} from '../data/extensions'
import {useContentNodes} from '../hooks/useContentNodes'
import {exhibitionState} from '../utils/nexus'
import {Filters,Card} from '../components/UI'
import ExtensionHeading from '../components/ExtensionHeading'
import NotFound from './NotFound'
export default function Exhibitions(){const {t}=useTranslation(),{id}=useParams(),nodes=useContentNodes(),[status,setStatus]=useState('');const publicExhibitions=exhibitions.filter(e=>e.visibility==='public'),exhibition=publicExhibitions.find(e=>e.id===id)
 if(id&&!exhibition)return <NotFound />
 return <section className="container section"><ExtensionHeading id="exhibitions" />{exhibition?<><h2>{t('ext.'+exhibition.titleKey)}</h2><p>{exhibition.startDate} — {exhibition.endDate} · {t('ext.'+exhibitionState(exhibition))}</p><p className="notice">{t('ext.'+exhibition.curatorNoteKey)}</p><h2>{t('ext.exhibits')}</h2><div className="exhibit-wall">{exhibition.itemIds.map(id=>nodes.find(node=>node.id===id)).filter(Boolean).map(node=><Card key={node.id}><small>{t('ext.'+node.type)}</small><h3><Link to={node.link}>{node.title}</Link></h3><p>{node.summary}</p><Link to={'/nexus?node='+encodeURIComponent(node.id)}>{t('ext.related')}</Link></Card>)}</div><p>{t('ext.exhibitionEnd')}</p><Link to="/exhibitions">← {t('ext.back')}</Link></>:<><Filters label={t('status')} value={status} onChange={setStatus} items={[{id:'',label:t('all')},...['current','past','upcoming'].map(id=>({id,label:t('ext.'+id)}))]} />{publicExhibitions.filter(e=>!status||exhibitionState(e)===status).map(e=><Card key={e.id}><p>{t('ext.'+exhibitionState(e))}</p><h2><Link to={'/exhibitions/'+e.id}>{t('ext.'+e.titleKey)}</Link></h2><p>{t('ext.'+e.summaryKey)}</p><small>{e.startDate} — {e.endDate}</small></Card>)}{!publicExhibitions.some(e=>!status||exhibitionState(e)===status)&&<p className="empty">{t('empty')}</p>}</>}</section>
}
