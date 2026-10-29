import MotionDetails from '../components/MotionDetails'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { about } from '../data/profile'
import { archiveEvents } from '../data/spaces'
import { projects } from '../data/projects'
import { journeys } from '../data/travel'
import { publicEvents } from '../utils/archive'
import { publicJourneys } from '../utils/travel'
import { localized } from '../i18n'
import { Filters } from '../components/UI'
import SpaceHeading from '../components/SpaceHeading'
import FutureLetters from '../components/FutureLetters'
import YearRoller from '../components/YearRoller'
export default function Archive() {
 const { t, i18n } = useTranslation(), l = value => localized(value, i18n.language)
 const [year,setYear] = useState(''), [topic,setTopic] = useState('')
 const entries = publicEvents(archiveEvents,{year,topic})
 return <section className="container section"><SpaceHeading name="archive" mark="04" />
  <div className="archive-filters"><label>{t('space.year')}<select value={year} onChange={e=>setYear(e.target.value)}><option value="">{t('all')}</option>{[...new Set(archiveEvents.filter(e=>e.visibility==='public' && e.date).map(e=>e.date.slice(0,4)))].sort().reverse().map(y=><option key={y}>{y}</option>)}</select></label><Filters label={t('space.topic')} value={topic} onChange={setTopic} items={[{id:'',label:t('all')},{id:'learning',label:t('space.learning')},{id:'engineering',label:t('space.engineering')}]} /></div>
  <YearRoller value={year||t('all')} /><p className="muted">{t('space.dateFilterHint')}</p><div className="memory-timeline">
   {!year && (!topic || topic==='learning') && about.timeline.map((event,index)=><MotionDetails key={index} className="memory-entry"><summary><small>{l(event.date)}</small><h2>{l(event.title)}</h2><span>{t('space.details')}</span></summary><p>{l(event.text)}</p><small>{t('space.outlineNote')}</small></MotionDetails>)}
   {entries.map(event=><MotionDetails key={event.id} className="memory-entry"><summary><small><time dateTime={event.date}>{event.date}</time> / {t('space.'+event.topic)}</small><h2>{t('space.'+event.titleKey)}</h2><span>{t('space.details')}</span></summary><p>{t('space.'+event.textKey)}</p><div className="actions">{(event.projects||[]).map(id=>projects.find(p=>p.id===id)).filter(Boolean).map(p=><Link key={p.id} to={'/projects/'+p.id}>{l(p.name)} ↗</Link>)}{(event.cities||[]).filter(id=>publicJourneys(journeys).some(city=>city.slug===id)).map(id=><Link key={id} to="/travel">{t('travel.title')} ↗</Link>)}</div></MotionDetails>)}
   {!entries.length && (year || topic==='engineering') && <p className="empty">{t('empty')}</p>}
  </div><FutureLetters />
 </section>
}
