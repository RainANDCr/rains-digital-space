import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { localized } from '../i18n'
import { projects, projectCategories } from '../data/projects'
import { filterProjects, safeExternal } from '../utils/filter'
import { Card, Button, Filters } from '../components/UI'
export default function Projects() {
 const { t, i18n } = useTranslation(), l = v => localized(v, i18n.language)
 const [category, setCategory] = useState('All')
 const visible = filterProjects(projects, category)
 return <section className="container section"><p className="eyebrow">{t('selectedWork')}</p><h1>{t('projects')}</h1><p className="muted">{t('projectIntro')}</p>
  <Filters label={t('category')} value={category} onChange={setCategory} items={projectCategories.map(id => ({ id, label: id === 'All' ? t('all') : id }))} />
  <div className="project-grid">{visible.map(p => <Card className="project-card" key={p.id}>
   <img className="project-cover" src={p.cover || '/images/project-placeholder.svg'} alt={l(p.name)} width="800" height="450" loading="lazy" />
   <div className="project-body"><h2>{l(p.name)}</h2><p>{l(p.summary)}</p>
    <div className="tags">{p.technologies.map(tech => <span key={tech}>{tech}</span>)}</div><p><small>{t('status')}: {l(p.status)} {p.date && <time dateTime={p.date}>{p.date}</time>}</small></p>
    <details><summary>{t('detail')}</summary><p>{l(p.description)}</p></details>
    {(safeExternal(p.github) || safeExternal(p.demo)) && <div className="actions">{safeExternal(p.github) && <Button href={p.github}>GitHub</Button>}{safeExternal(p.demo) && <Button href={p.demo} secondary>Demo</Button>}</div>}
   </div>
  </Card>)}</div>{!visible.length && <p className="empty" role="status">{t('empty')}</p>}
 </section>
}

