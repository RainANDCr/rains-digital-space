import {useSearchParams,Link} from 'react-router-dom'
import {useTranslation} from 'react-i18next'
import {useContentNodes} from '../hooks/useContentNodes'
import {usePreferences} from '../components/PreferencesProvider'
import {filterNodes} from '../utils/nexus'
import {Card,Filters,Button} from '../components/UI'
import ExtensionHeading from '../components/ExtensionHeading'
import RelationLines from '../components/RelationLines'
export default function Nexus(){
 const {t}=useTranslation(),nodes=useContentNodes(),{experience}=usePreferences(),[params,setParams]=useSearchParams()
 const query=params.get('q')||'',type=params.get('type')||'',tag=params.get('tag')||'',view=params.get('view')||'grid'
 const update=(key,value)=>setParams(previous=>{const next=new URLSearchParams(previous);value?next.set(key,value):next.delete(key);return next},{replace:key==='q'})
 const visible=filterNodes(nodes,{query,type,tag}),selected=nodes.find(n=>n.id===params.get('node'))
 const sorted=view==='timeline'?[...visible].sort((a,b)=>(b.time||'').localeCompare(a.time||'')):visible
 const graph=view==='graph'&&experience!=='lite',rows=Math.max(1,Math.ceil(sorted.length/4)),positions=sorted.map((_,i)=>({x:(i%4+.5)/4*100,y:(Math.floor(i/4)+.5)/rows*100}))
 return <section className="container section"><ExtensionHeading id="nexus" /><div className="search-panel"><label htmlFor="nexus-query">{t('space.keyword')}</label><div className="search-row"><input id="nexus-query" type="search" value={query} onChange={e=>update('q',e.target.value)} /><Button secondary onClick={()=>setParams({})}>{t('reset')}</Button></div><Filters label={t('space.type')} value={type} onChange={v=>update('type',v)} items={[{id:'',label:t('all')},...[...new Set(nodes.map(n=>n.type))].map(id=>({id,label:t('ext.'+id)}))]} /><label htmlFor="nexus-tag">{t('tags')}</label><select id="nexus-tag" value={tag} onChange={e=>update('tag',e.target.value)}><option value="">{t('all')}</option>{[...new Set(nodes.flatMap(n=>n.tags))].sort().map(item=><option key={item}>{item}</option>)}</select><Filters label={t('ext.view')} value={view} onChange={v=>update('view',v)} items={['grid','timeline','graph'].map(id=>({id,label:t('ext.'+id)}))} /></div>
 <p role="status">{t('space.found',{count:visible.length})}</p><p className="muted">{t('ext.relationHint')}</p>
 <div className={graph?'nexus-graph':'nexus-results '+(view==='timeline'?'nexus-timeline':'')} style={graph?{'--graph-height':Math.max(600,rows*120)+'px'}:undefined}>
 {graph&&<RelationLines key={sorted.map(node=>node.id).join(',')} viewBox="0 0 100 100" preserveAspectRatio="none">{sorted.flatMap((node,i)=>node.relatedIds.map(id=>{const j=sorted.findIndex(n=>n.id===id);return j>i?<line pathLength="1" key={node.id+id} x1={positions[i].x} y1={positions[i].y} x2={positions[j].x} y2={positions[j].y} className={selected?.id===node.id||selected?.id===id?'selected':''} />:null}))}</RelationLines>}
 {sorted.map((node,i)=><button key={node.id} className="nexus-node" style={graph?{left:positions[i].x+'%',top:positions[i].y+'%'}:undefined} aria-pressed={selected?.id===node.id} onClick={()=>update('node',node.id)}><small>{t('ext.'+node.type)}{view==='timeline'?' / '+(node.time||t('ext.noDate')):''}</small><strong>{node.title}</strong></button>)}</div>
 {!visible.length&&<p className="empty">{t('empty')}</p>}
 <section className="nexus-detail" aria-live="polite">{selected?<Card><h2>{selected.title}</h2><p>{selected.summary}</p><Link className="button" to={selected.link}>{t('ext.openContent')}</Link><h3>{t('ext.related')}</h3><div className="tags">{selected.relatedIds.map(id=>nodes.find(n=>n.id===id)).filter(Boolean).map(node=><button key={node.id} onClick={()=>update('node',node.id)}>{node.title}</button>)}</div></Card>:<p>{t('ext.chooseNode')}</p>}</section></section>
}
