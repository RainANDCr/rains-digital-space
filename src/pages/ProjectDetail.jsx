import { Link, useParams, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { projects } from '../data/projects'
import { localized } from '../i18n'
import { safeExternal } from '../utils/filter'
import { Button, Card } from '../components/UI'
import NotFound from './NotFound'

export default function ProjectDetail() {
 const { id } = useParams(), [params] = useSearchParams()
 const { t, i18n } = useTranslation(), l = value => localized(value, i18n.language)
 const project = projects.find(p => p.id === id)
 if (!project) return <NotFound />
 const archive = project.archive
 return <article className="container section project-archive">
  <nav className="breadcrumbs" aria-label={t('breadcrumb')}><Link to="/">{t('home')}</Link><span aria-hidden="true">/</span><Link to={'/projects' + (params.size ? '?' + params : '')}>{t('atelier')}</Link><span aria-hidden="true">/</span><span aria-current="page">{l(project.name)}</span></nav>
  <header className="project-archive-header"><p className="chapter-label">{project.category} / {l(project.status)}</p><h1>{l(project.name)}</h1><p className="project-lead">{l(project.summary)}</p><div className="tags">{project.technologies.map(tech => <span key={tech}>{tech}</span>)}</div>{project.date && <time className="muted" dateTime={project.date}>{project.date}</time>}</header>
  <figure className="archive-cover"><img src={project.cover || '/images/project-placeholder.svg'} alt={l(project.name) + ' — ' + t('projectVisual')} width="800" height="450" fetchPriority="high" onError={e => { if (!e.currentTarget.src.endsWith('/images/project-placeholder.svg')) e.currentTarget.src = '/images/project-placeholder.svg' }} /><figcaption>{t('illustrationNotice')}</figcaption></figure>
  {project.sample && <p className="notice">{t('projectIdeaNotice')}</p>}
  <div className="project-archive-grid"><div className="project-story">
   <section><h2>{t('projectOverview')}</h2><p>{l(project.description)}</p></section>
   {archive?.story && <section><h2>{t('projectStory')}</h2><p>{l(archive.story)}</p></section>}
   <section><h2>{t('technicalApproach')}</h2><div className="tags">{project.technologies.map(tech => <span key={tech}>{tech}</span>)}</div>{archive?.features && <ul className="feature-list">{archive.features.map((feature, index) => <li key={index}>{l(feature)}</li>)}</ul>}</section>
   <section><h2>{t('projectLog')}</h2>{archive?.log?.length ? <ol className="timeline">{archive.log.map((event, index) => <li key={index}><time dateTime={event.date}>{event.date}</time><p>{l(event.text)}</p></li>)}</ol> : <p className="muted">{t('noProjectLog')}</p>}</section>
   <p><Link to={'/making-of/'+project.id}>{t('ext.making-of')} ↗</Link></p>
   <section><h2>{t('projectNext')}</h2><p className="muted">{archive?.next ? l(archive.next) : t('noProjectNext')}</p></section>
  </div><aside><Card className="project-access"><h2>{t('projectAccess')}</h2><p>{l(project.status)}</p><div className="actions">{safeExternal(project.github) && <Button href={project.github}>GitHub</Button>}{safeExternal(project.demo) && <Button href={project.demo} secondary>Demo</Button>}</div>{(safeExternal(project.github) || safeExternal(project.demo)) && <p className="muted">{t('projectLinkNotice')}</p>}<Link className="text-link" to={'/projects' + (params.size ? '?' + params : '')}>← {t('backProjects')}</Link></Card></aside></div>
 </article>
}
