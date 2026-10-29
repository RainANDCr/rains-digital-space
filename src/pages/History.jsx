import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { posts } from '../data/posts'
import { historyMeta } from '../data/spaces'
import { safeExternal } from '../utils/filter'
import { Card } from '../components/UI'
import SpaceHeading from '../components/SpaceHeading'
export default function History() {
 const {t}=useTranslation(),[query,setQuery]=useState(''),[era,setEra]=useState(''),[region,setRegion]=useState('')
 const history=posts.filter(p=>p.category==='History')
 const visible=history.filter(p=>(!era||historyMeta[p.slug]?.era===era)&&(!region||historyMeta[p.slug]?.region===region)&&[p.title,p.summary,...p.tags].join(' ').toLocaleLowerCase().includes(query.trim().toLocaleLowerCase()))
 return <section className="container section"><SpaceHeading name="history" mark="06" /><div className="search-panel"><label htmlFor="history-search">{t('search')}</label><input id="history-search" type="search" value={query} onChange={e=>setQuery(e.target.value)} /><div className="archive-filters">{[['era',era,setEra],['region',region,setRegion]].map(([key,value,set])=><label key={key}>{t('space.'+key)}<select value={value} onChange={e=>set(e.target.value)}><option value="">{t('all')}</option>{[...new Set(history.map(p=>historyMeta[p.slug]?.[key]).filter(Boolean))].map(x=><option key={x}>{x}</option>)}</select></label>)}</div></div>
  {!visible.length?<div className="empty"><h2>{t('space.noHistory')}</h2><p>{t('space.noHistoryHint')}</p></div>:<div className="history-index">{visible.map(post=><Card key={post.slug}><small>{historyMeta[post.slug]?.era}</small><h2><Link to={'/blog/'+post.slug}>{post.title}</Link></h2><p>{post.summary}</p>{historyMeta[post.slug]?.sources?.filter(source=>safeExternal(source.url)).map(source=><p key={source.url}><a href={safeExternal(source.url)} target="_blank" rel="noopener noreferrer">{t('space.source')}: {source.title}</a></p>)}</Card>)}</div>}
  <section className="space-block"><h2>{t('space.cityReading')}</h2><div className="grid">{posts.filter(p=>p.category==='Travel').map(post=><Card key={post.slug}><h3>{post.title}</h3><p>{post.summary}</p><Link to={'/blog/'+post.slug}>{t('read')} ↗</Link></Card>)}</div></section></section>
}
