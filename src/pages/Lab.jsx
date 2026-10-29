import {useState,useEffect} from 'react'
import {Link,useParams} from 'react-router-dom'
import {useTranslation} from 'react-i18next'
import {projects} from '../data/projects'
import {labProjectIds} from '../data/extensions'
import {localized} from '../i18n'
import {safeExternal} from '../utils/filter'
import {Button,Card} from '../components/UI'
import ExtensionHeading from '../components/ExtensionHeading'
import NotFound from './NotFound'
export default function Lab(){
 const {id}=useParams(),{t,i18n}=useTranslation(),l=value=>localized(value,i18n.language),[playing,setPlaying]=useState(false)
 const items=projects.filter(p=>labProjectIds.includes(p.id)),project=items.find(p=>p.id===id)
 useEffect(()=>setPlaying(false),[id])
 if(id&&!project)return <NotFound />
 const source=safeExternal(project?.demo)
 return <section className="container section"><ExtensionHeading id="lab" />{project?<><h2>{l(project.name)}</h2><p>{l(project.description)}</p><div className="tags">{project.technologies.map(tech=><span key={tech}>{tech}</span>)}</div><p className="notice">{t('ext.externalDemoHint')}</p><div className="actions">{source&&<Button onClick={()=>setPlaying(!playing)}>{t(playing?'ext.closeDemo':'ext.openDemo')}</Button>}{source&&<Button secondary href={source}>Demo</Button>}{safeExternal(project.github)&&<Button secondary href={project.github}>GitHub</Button>}</div>{playing&&source&&<iframe className="lab-frame" src={source} title={l(project.name)} sandbox="allow-scripts allow-same-origin" referrerPolicy="no-referrer" loading="lazy" />}<h2>{t('ext.principle')}</h2><p>{t('ext.'+(id==='game-2048'?'demo2048':id==='snake-lab'?'demoSnake':'demoStructures'))}</p><h2>{t('ext.reading')}</h2><div className="actions"><Link to={'/projects/'+id}>{t('ext.openContent')}</Link><Link to="/blog/cs-data-structures">{t('ext.article')}</Link><Link to="/lab">← {t('ext.back')}</Link></div></>:<div className="nexus-results">{items.map(p=><Card key={p.id}><img src={p.cover} alt="" width="800" height="450" loading="lazy" /><h2><Link to={'/lab/'+p.id}>{l(p.name)}</Link></h2><p>{l(p.summary)}</p><div className="tags">{p.technologies.map(tech=><span key={tech}>{tech}</span>)}</div></Card>)}</div>}</section>
}
