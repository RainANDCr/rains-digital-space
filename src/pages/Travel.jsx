import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { journeys } from '../data/travel'
import { posts } from '../data/posts'
import { world } from '../data/world'
import { localized } from '../i18n'
import { publicJourneys, filterJourneys, mapPosition, cityKey } from '../utils/travel'
import { Button, Filters } from '../components/UI'
import PhotoGallery from '../components/PhotoGallery'
import '../styles/travel.css'

export default function Travel({ entries = journeys }) {
 const { t, i18n } = useTranslation(), l = value => localized(value, i18n.language)
 const [view, setView] = useState('map'), [year, setYear] = useState(''), [city, setCity] = useState(''), [tag, setTag] = useState(''), [selected, setSelected] = useState('')
 const published = publicJourneys(entries), visible = filterJourneys(entries, { year, city, tag })
 const current = visible.find(entry => entry.slug === selected) || visible[0]
 const points = visible.map(entry => ({ entry, position:mapPosition(entry.publicCoordinates) })).filter(point => point.position)
 const mapEmptyTitle = !published.length ? 'travel.emptyTitle' : !visible.length ? 'travel.noResults' : 'travel.noCoordinates'
 const mapEmptyText = !published.length ? 'travel.emptyText' : !visible.length ? 'travel.filterHint' : 'travel.mapFallback'
 return <section className="container section travel-page">
  <header className="travel-heading"><div><p className="chapter-label">03 / {t('travel.footprints')}</p><h1>{t('travel.title')}</h1><p className="section-description">{t('travel.intro')}</p></div><span className="travel-compass" aria-hidden="true">✧</span></header>
  <div className="travel-toolbar" data-glass="regular"><Filters label={t('travel.view')} value={view} onChange={setView} items={[{ id:'map', label:t('travel.map') }, { id:'list', label:t('travel.list') }]} /><div className="travel-selects">
   <label>{t('travel.year')}<select value={year} onChange={e => setYear(e.target.value)}><option value="">{t('all')}</option>{[...new Set(published.map(entry => entry.visitDate?.slice(0, 4)).filter(Boolean))].sort().reverse().map(value => <option key={value}>{value}</option>)}</select></label>
   <label>{t('travel.city')}<select value={city} onChange={e => setCity(e.target.value)}><option value="">{t('all')}</option>{[...new Map(published.map(entry => [cityKey(entry), entry.city]))].map(([key, name]) => <option key={key} value={key}>{l(name)}</option>)}</select></label>
   <label>{t('travel.tag')}<select value={tag} onChange={e => setTag(e.target.value)}><option value="">{t('all')}</option>{[...new Set(published.flatMap(entry => entry.tags || []))].map(value => <option key={value}>{value}</option>)}</select></label>
   <Button secondary onClick={() => { setYear(''); setCity(''); setTag(''); setSelected('') }}>{t('reset')}</Button></div></div>
  <p className="muted travel-count" role="status">{t('travel.count', { count:visible.length })}</p>
  {view === 'map' && <div className="travel-atlas"><div className="atlas-canvas"><svg viewBox="0 0 1000 500" role="img" aria-label={t('travel.mapLabel')} preserveAspectRatio="none"><defs><pattern id="atlas-grid" width="83.333" height="83.333" patternUnits="userSpaceOnUse"><path d="M 83.333 0 L 0 0 0 83.333" fill="none" stroke="currentColor" strokeWidth="1" /></pattern></defs><rect width="1000" height="500" fill="url(#atlas-grid)" /><path d="M0 250H1000 M500 0V500" stroke="currentColor" strokeDasharray="4 8" /><text x="15" y="240">0°</text><text x="510" y="30">0°</text><text x="15" y="480">180° W</text><text x="915" y="480">180° E</text></svg>
   {!points.length && <div className="atlas-empty"><span aria-hidden="true">✧</span><h2>{t(mapEmptyTitle)}</h2><p>{t(mapEmptyText)}</p><button className="button secondary" onClick={() => setView('list')}>{t('travel.showList')}</button></div>}
   {points.map(({ entry, position }) => <button key={entry.slug} className="atlas-pin" style={{ left:`${position.x}%`, top:`${position.y}%` }} aria-label={l(entry.city)} aria-pressed={current?.slug === entry.slug} onClick={() => setSelected(entry.slug)}><span aria-hidden="true">●</span><span>{l(entry.city)}</span></button>)}
  </div><p className="atlas-caption">{t('travel.mapCaption')}</p></div>}
  {view === 'list' && !visible.length && <div className="travel-empty"><span aria-hidden="true">✉</span><h2>{t(published.length ? 'travel.noResults' : 'travel.emptyTitle')}</h2><p>{t(published.length ? 'travel.filterHint' : 'travel.emptyText')}</p></div>}
  {visible.length > 0 && <div className="travel-content"><div className="journey-list" role="group" aria-label={t('travel.destinations')}>{visible.map(entry => <button key={entry.slug} aria-pressed={current.slug === entry.slug} onClick={() => setSelected(entry.slug)}><small>{entry.visitDate || t('dateUnspecified')}</small><strong>{l(entry.city)}</strong><span>{l(entry.summary)}</span></button>)}</div>
   <article className="journey-postcard" aria-labelledby="journey-title"><p className="chapter-label">{current.visitDate || t('dateUnspecified')}</p><h2 id="journey-title">{l(current.title) || l(current.city)}</h2><p>{l(current.memory) || l(current.summary)}</p>{current.historyNote && <p className="notice">{l(current.historyNote)}</p>}<div className="tags">{current.tags?.map(value => <span key={value}>{value}</span>)}</div><PhotoGallery key={current.slug} photos={current.photos || []} />{current.articleSlug && posts.some(post => post.slug === current.articleSlug) && <Link className="text-link" to={'/blog/' + current.articleSlug}>{t('read')} ↗</Link>}</article>
  </div>}
  <section className="travel-writing" aria-labelledby="travel-writing-title"><div className="section-heading"><div><p className="chapter-label">{t('travel.writingLabel')}</p><h2 id="travel-writing-title">{t('travel.writing')}</h2></div><Link className="text-link" to="/blog">{l(world.allNotes)} ↗</Link></div><p className="section-description">{t('travel.writingNotice')}</p><div className="postcard-grid">{world.cities.map(place => { const post = posts.find(item => item.slug === place.slug); return post && <Link className="postcard" key={place.slug} to={'/blog/' + place.slug}><span className="postcard-mark" aria-hidden="true">{place.motif}</span><span className="postcard-stamp" aria-hidden="true">✧</span><small>{l(world.originalLanguage)}</small><h3>{l(place.name)}</h3><p>{post.summary}</p><span className="postcard-read">{t('read')} ↗</span></Link> })}</div></section>
 </section>
}
