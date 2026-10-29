import { Link, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { localized } from '../i18n'
import { projects, projectCategories } from '../data/projects'
import { filterProjects, safeExternal } from '../utils/filter'
import { Card, Button, Filters } from '../components/UI'
import SectionCover from '../components/SectionCover'
import {usePreferences} from '../components/PreferencesProvider'
export default function Projects() {
 const { t, i18n } = useTranslation(), l = v => localized(v, i18n.language)
 const [params, setParams] = useSearchParams()
 const {mode}=usePreferences()
 const category = params.get('category') || 'All', query = params.get('q') || '', technology = params.get('technology') || ''
 const view = params.get('view') === 'timeline' ? 'timeline' : 'grid'
 const update = (key, value, replace = false) => setParams(previous => {
  const next = new URLSearchParams(previous)
  if (value) next.set(key, value); else next.delete(key)
  return next
 }, { replace })
 const visible = filterProjects(projects, category, { query, technology })
 if (view === 'timeline') visible.sort((a, b) => (b.date || '').localeCompare(a.date || ''))
 return <section className="container section"><p className="chapter-label">02 / {t('selectedWork')}</p><h1>{t('atelier')}</h1><p className="muted">{t('projectIntro')}</p>
  {mode==='terminal'&&<SectionCover assetId="cover-rainos" />}
  <div className="search-panel project-search"><label htmlFor="project-search">{t('projectSearch')}</label><div className="search-row"><input id="project-search" type="search" value={query} onChange={e => update('q', e.target.value, true)} placeholder={t('projectSearch')} /><Button secondary onClick={() => update('q', '', true)}>{t('clear')}</Button></div>
   <Filters label={t('category')} value={category} onChange={value => update('category', value === 'All' ? '' : value)} items={projectCategories.map(id => ({ id, label: id === 'All' ? t('all') : id }))} />
   <div className="project-toolbar"><div className="technology-select"><label htmlFor="technology">{t('technology')}</label><select id="technology" value={technology} onChange={e => update('technology', e.target.value)}><option value="">{t('allTechnologies')}</option>{[...new Set(projects.flatMap(p => p.technologies))].sort().map(tech => <option key={tech} value={tech}>{tech}</option>)}</select></div>
    <Filters label={t('projectView')} value={view} onChange={value => update('view', value === 'grid' ? '' : value)} items={[{ id:'grid', label:t('gridView') }, { id:'timeline', label:t('timelineView') }]} />
    <Button secondary onClick={() => setParams(view === 'timeline' ? { view } : {})}>{t('reset')}</Button></div>
  </div>
  <p role="status">{t('projectResults', { count:visible.length })}</p>{view === 'timeline' && <p className="muted project-order">{t('timelineOrder')}</p>}
  <div className={'project-grid' + (view === 'timeline' ? ' project-timeline' : '')}>{visible.map(p => <Card className="project-card" key={p.id}>
   <Link className="project-image-link" to={'/projects/' + p.id + (params.size ? '?' + params : '')} aria-label={l(p.name)}><img className="project-cover" src={p.cover || '/images/project-placeholder.svg'} alt="" width="800" height="450" loading="lazy" onError={e => { if (!e.currentTarget.src.endsWith('/images/project-placeholder.svg')) e.currentTarget.src = '/images/project-placeholder.svg' }} /></Link>
   <div className="project-body">{view === 'timeline' && <small className="project-date">{p.date ? <time dateTime={p.date}>{p.date}</time> : t('dateUnspecified')}</small>}<h2><Link to={'/projects/' + p.id + (params.size ? '?' + params : '')}>{l(p.name)}</Link></h2><p>{l(p.summary)}</p>
    <div className="tags">{p.technologies.map(tech => <span key={tech}>{tech}</span>)}</div><p><small>{t('status')}: {l(p.status)} {p.date && <time dateTime={p.date}>{p.date}</time>}</small></p>
    <details><summary>{t('detail')}</summary><p>{l(p.description)}</p></details>
    <Link className="text-link" to={'/projects/' + p.id + (params.size ? '?' + params : '')}>{t('openArchive')} ↗</Link>
    {(safeExternal(p.github) || safeExternal(p.demo)) && <div className="actions">{safeExternal(p.github) && <Button href={p.github}>GitHub</Button>}{safeExternal(p.demo) && <Button href={p.demo} secondary>Demo</Button>}</div>}
   </div>
  </Card>)}</div>{!visible.length && <p className="empty" role="status">{t('empty')}</p>}
 </section>
}

