import {useState} from 'react'
import {Link,useParams} from 'react-router-dom'
import {useTranslation} from 'react-i18next'
import {artifacts} from '../data/extensions'
import {useContentNodes} from '../hooks/useContentNodes'
import {localized} from '../i18n'
import {Card} from '../components/UI'
import ExtensionHeading from '../components/ExtensionHeading'
import NotFound from './NotFound'
export default function Museum(){const {t,i18n}=useTranslation(),l=value=>localized(value,i18n.language),{id}=useParams(),nodes=useContentNodes(),[query,setQuery]=useState(''),[category,setCategory]=useState(''),[era,setEra]=useState('')
 const items=artifacts.filter(item=>item.visibility==='public'&&item.confirmed===true),item=items.find(item=>item.id===id),visible=items.filter(item=>(!category||item.category===category)&&(!era||item.era===era)&&[l(item.name),l(item.story),...(item.tags||[])].join(' ').toLocaleLowerCase().includes(query.trim().toLocaleLowerCase()))
 if(id&&!item)return <NotFound />
 return <section className="container section"><ExtensionHeading id="museum" />{item?<Card><h2>{l(item.name)}</h2>{item.cover&&<img src={item.cover} alt={l(item.coverAlt)} loading="lazy" />}<p>{item.era}</p><p>{l(item.story)}</p><h3>{t('ext.related')}</h3><div className="actions">{(item.relatedContentIds||[]).map(id=>nodes.find(n=>n.id===id)).filter(Boolean).map(n=><Link key={n.id} to={n.link}>{n.title}</Link>)}</div><Link to="/museum">← {t('ext.back')}</Link></Card>:<><div className="archive-filters"><label>{t('space.keyword')}<input type="search" value={query} onChange={e=>setQuery(e.target.value)} /></label><label>{t('category')}<select value={category} onChange={e=>setCategory(e.target.value)}><option value="">{t('all')}</option>{[...new Set(items.map(i=>i.category))].map(value=><option key={value}>{value}</option>)}</select></label><label>{t('ext.era')}<select value={era} onChange={e=>setEra(e.target.value)}><option value="">{t('all')}</option>{[...new Set(items.map(i=>i.era))].map(value=><option key={value}>{value}</option>)}</select></label></div><div className="nexus-results">{visible.map(item=><Card key={item.id}><h2><Link to={'/museum/'+item.id}>{l(item.name)}</Link></h2><p>{l(item.story)}</p></Card>)}</div>{!visible.length&&<p className="empty">{t(items.length?'empty':'ext.museumIntro')}</p>}</>}</section>
}
