import {letterState,validDay} from './archive.js'
const publicItem=item=>!item.draft&&(!item.visibility||item.visibility==='public')
const words=value=>typeof value==='string'?[value]:Object.values(value||{})
export function buildContentNodes({posts=[],projects=[],memories=[],cities=[],letters=[],artifacts=[],exhibitions=[],labs=[]},l=value=>typeof value==='string'?value:value?.['zh-CN']||'',t=key=>key){
 const nodes=[
  ...posts.filter(publicItem).map(p=>({id:'article:'+p.slug,title:p.title,summary:p.summary,language:p.language,type:'article',tags:p.tags||[],time:p.date,link:'/blog/'+p.slug,relatedIds:p.relatedIds||[]})),
  ...projects.filter(publicItem).map(p=>({id:'project:'+p.id,title:l(p.name),summary:l(p.summary),cover:p.cover,searchText:[...words(p.name),...words(p.summary),...(p.technologies||[])].join(' '),type:'project',tags:p.technologies||[],time:p.date,link:'/projects/'+p.id,relatedIds:p.relatedIds||[]})),
  ...memories.filter(p=>p.visibility==='public').map(p=>({id:'memory:'+p.id,title:t('space.'+p.titleKey),summary:t('space.'+p.textKey),type:'memory',tags:[p.topic],time:p.date,link:'/archive',relatedIds:(p.projects||[]).map(id=>'project:'+id)})),
  ...cities.filter(p=>p.visibility==='public'&&p.confirmed===true).flatMap(p=>[{id:'city:'+p.slug,title:l(p.city),summary:l(p.summary),type:'city',tags:p.tags||[],time:p.visitDate,link:'/travel',relatedIds:p.relatedIds||[]},...(p.photos||[]).filter(publicItem).map((photo,index)=>({id:'photo:'+p.slug+':'+(photo.id||index),title:l(photo.alt),summary:l(photo.caption),cover:photo.src,type:'photo',tags:p.tags||[],time:p.visitDate,link:'/travel',relatedIds:['city:'+p.slug]}))]),
  ...letters.filter(p=>letterState(p)==='unlocked').map(p=>({id:'letter:'+p.id,title:l(p.title),summary:l(p.teaser),type:'letter',tags:p.tags||[],time:p.writtenAt,link:'/archive',relatedIds:p.relatedIds||[]})),
  ...artifacts.filter(p=>p.visibility==='public'&&p.confirmed===true).map(p=>({id:'artifact:'+p.id,title:l(p.name),summary:l(p.story),cover:p.cover,type:'artifact',tags:[p.category,...(p.tags||[])].filter(Boolean),time:p.era,link:'/museum/'+p.id,relatedIds:p.relatedContentIds||[]})),
  ...exhibitions.filter(p=>p.visibility==='public').map(p=>({id:'exhibition:'+p.id,title:l(p.title)||t('ext.'+p.titleKey),summary:l(p.description)||t('ext.'+p.summaryKey),type:'exhibition',tags:p.theme||[],time:p.startDate,link:'/exhibitions/'+p.id,relatedIds:p.itemIds})),
  ...labs.map(id=>({id:'lab-demo:'+id,title:l(projects.find(p=>p.id===id)?.name),summary:t('ext.labIntro'),type:'lab-demo',tags:projects.find(p=>p.id===id)?.technologies||[],link:'/lab/'+id,relatedIds:['project:'+id]})),
 ]
 const ids=new Set(nodes.map(n=>n.id))
 // shortcut: pairwise tag matching suits this small archive; pre-index tags if it grows to thousands of nodes.
 return nodes.map(node=>({...node,worldViewHints:['poetic','terminal'],relatedIds:[...new Set([...node.relatedIds,...nodes.filter(other=>other.id!==node.id&&other.tags.some(tag=>node.tags.includes(tag))).map(other=>other.id)])].filter(id=>ids.has(id)&&id!==node.id)}))
}
export function filterNodes(nodes,{query='',type='',tag=''}={}){const q=query.trim().toLocaleLowerCase();return nodes.filter(n=>(!type||n.type===type)&&(!tag||n.tags.includes(tag))&&(n.searchText||[n.title,n.summary,...n.tags].join(' ')).toLocaleLowerCase().includes(q))}
export function exhibitionState(item,today=new Date().toISOString().slice(0,10)){return today<item.startDate?'upcoming':today>item.endDate?'past':'current'}
export function assertPublishableExtensions({artifacts=[],projects=[],exhibitions=[]}){
 const ids=new Set()
 for(const artifact of artifacts){if(!artifact.id||ids.has(artifact.id)||artifact.visibility!=='public'||artifact.confirmed!==true)throw new Error('Artifacts must be public, confirmed and have unique IDs');ids.add(artifact.id)}
 ids.clear()
 for(const item of exhibitions){if(!item.id||ids.has(item.id)||item.visibility!=='public'||!validDay(item.startDate)||!validDay(item.endDate)||item.startDate>item.endDate)throw new Error('Exhibitions must be public with unique IDs and valid ordered dates');ids.add(item.id)}
 for(const project of projects)for(const entry of project.makingOf||[]){if(entry.visibility!=='public'||!['idea','sketch','prototype','iteration','final'].includes(entry.stage))throw new Error('Making-of entries must be public and use a documented stage')}
}
