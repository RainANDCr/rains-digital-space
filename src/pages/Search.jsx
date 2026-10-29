import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { learningPlan,mediaAlbums,hardwareLog } from '../data/spaces'
import {useContentNodes} from '../hooks/useContentNodes'
import { searchRecords } from '../utils/search'
import { localized } from '../i18n'
import { Filters,Card,Button } from '../components/UI'
const words=value=>typeof value==='string'?value:Object.values(value||{}).join(' ')
export default function Search() {
 const {t,i18n}=useTranslation(),l=v=>localized(v,i18n.language),[query,setQuery]=useState(''),[kind,setKind]=useState('')
 const nodes=useContentNodes()
 const records=[
  ...nodes.map(node=>({id:node.id,kind:node.type==='article'?'posts':node.type==='project'?'projects':'records',title:node.title,summary:node.summary,url:node.link,text:node.searchText||[node.title,node.summary,...node.tags].join(' '),language:node.language})),
  ...[[learningPlan.filter(e=>e.visibility==='public'),'/learning'],[mediaAlbums.filter(e=>e.visibility==='public'&&e.confirmed),'/cinema'],[hardwareLog.filter(e=>e.visibility==='public'),'/hardware']].flatMap(([entries,url])=>entries.map(e=>({id:url+(e.id||e.slug),kind:'records',title:l(e.title||e.city),summary:l(e.summary||e.text||e.story),url,text:[words(e.title||e.city),words(e.summary||e.text||e.story),...(e.tags||[])].join(' ')})))
 ]
 const visible=searchRecords(records,query,kind)
 return <section className="container section"><h1>{t('space.search')}</h1><div className="search-panel"><label htmlFor="global-search">{t('space.keyword')}</label><div className="search-row"><input id="global-search" type="search" value={query} onChange={e=>setQuery(e.target.value)} /><Button secondary onClick={()=>{setQuery('');setKind('')}}>{t('reset')}</Button></div><Filters label={t('space.type')} value={kind} onChange={setKind} items={[{id:'',label:t('all')},...['posts','projects','records'].map(id=>({id,label:t('space.'+id)}))]} /></div><p role="status">{t('space.found',{count:visible.length})}</p><div className="grid">{visible.map(record=><Card key={record.kind+record.id}><small>{t('space.'+record.kind)}{record.language==='zh-CN'&&i18n.language==='en'?' / '+t('space.original'):''}</small><h2 className="search-title"><Link to={record.url}>{record.title}</Link></h2><p>{record.summary}</p></Card>)}</div>{!visible.length&&<p className="empty">{t('empty')}</p>}</section>
}
