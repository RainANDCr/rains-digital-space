import {Link,useParams} from 'react-router-dom'
import {useTranslation} from 'react-i18next'
import {projects} from '../data/projects'
import {localized} from '../i18n'
import {Card,Button} from '../components/UI'
import ExtensionHeading from '../components/ExtensionHeading'
import NotFound from './NotFound'
export default function MakingOf(){const {id}=useParams(),{t,i18n}=useTranslation(),l=value=>localized(value,i18n.language),project=projects.find(p=>p.id===id)
 if(id&&!project)return <NotFound />
 const stages=project?.makingOf||[],logs=project?.archive?.log||[]
 return <section className="container section"><ExtensionHeading id="making-of" />{project?<><h2>{l(project.name)}</h2><div className="making-stages">{['idea','sketch','prototype','iteration','final'].map(stage=><Card key={stage}><h3>{t('ext.'+stage)}</h3>{stages.filter(item=>item.stage===stage&&item.visibility==='public').length?stages.filter(item=>item.stage===stage&&item.visibility==='public').map(item=><div key={item.id}><h4>{l(item.title)}</h4>{item.date&&<time>{item.date}</time>}<p>{l(item.text)}</p>{item.image&&<img src={item.image} alt={l(item.imageAlt)} loading="lazy" />}</div>):<p className="muted">{t('ext.unrecorded')}</p>}</Card>)}</div>{logs.length>0&&<section><h2>{t('ext.recorded')}</h2><ol className="timeline">{logs.map((entry,index)=><li key={index}><time>{entry.date}</time><p>{l(entry.text)}</p></li>)}</ol></section>}<div className="actions"><Link to={'/projects/'+project.id}>{t('ext.openContent')}</Link>{project.github&&<Button secondary href={project.github}>GitHub</Button>}<Link to="/making-of">← {t('ext.back')}</Link></div></>:<div className="nexus-results">{projects.map(p=><Card key={p.id}><h2><Link to={'/making-of/'+p.id}>{l(p.name)}</Link></h2><p>{l(p.summary)}</p><small>{p.archive?.log?.length||p.makingOf?.some(item=>item.visibility==='public')?t('ext.recorded'):t('ext.unrecorded')}</small></Card>)}</div>}</section>
}
