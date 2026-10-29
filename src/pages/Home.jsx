import { useState } from 'react'
import ParallaxScene from '../components/ParallaxScene'
import {usePreferences} from '../components/PreferencesProvider'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { localized } from '../i18n'
import { profile, about } from '../data/profile'
import { world } from '../data/world'
import { projects } from '../data/projects'
import { posts } from '../data/posts'
import { skills, skillCategories } from '../data/skills'
import { Button, Card, Filters } from '../components/UI'
import { useTypewriter } from '../hooks/useTypewriter'
import SceneImage from '../components/SceneImage'
import SectionCover from '../components/SectionCover'
export default function Home() {
 const { t, i18n } = useTranslation(), l = v => localized(v, i18n.language)
 const [category, setCategory] = useState('')
 const {motionAllowed,mode}=usePreferences()
 const typed = useTypewriter(profile.roles,motionAllowed)
 return <>
  <section className="prologue" aria-labelledby="prologue-title">
   <ParallaxScene><SceneImage className="prologue-art" assetId={mode==='terminal'?'hero-digital':'hero-poetic'} position={mode==='terminal'?'68% center':'72% center'} priority sizes="100vw" /></ParallaxScene>
   <div className="prologue-shade" />
   <div className="prologue-content container"><p className="chapter-label"><span className="chapter-rule" />00 / {l(world.prologue)}</p>
    <h1 id="prologue-title">Rain’s<br />Digital Space<span className="title-star" aria-hidden="true">✧</span></h1>
    <p className="prologue-line">{l(world.line)}</p><p className="prologue-intro">{l(world.intro)}</p>
    <div className="actions"><Button to={mode==='terminal'?'/projects':'/#chapters'}>{mode==='terminal'?t('projects'):l(world.enter)} ↓</Button><Link className="prologue-skip" to={mode==='terminal'?'/hardware':'/#about'}>{mode==='terminal'?t('space.hardware'):l(world.skip)}</Link></div>
   </div><div className="prologue-bottom container"><span>{mode==='terminal'?t('space.digitalCaption'):l(world.caption)}</span><small>{mode==='terminal'?t('space.digitalArtwork'):l(world.artwork)}</small></div>
  </section>
  <section id="chapters" tabIndex={-1} className="chapter-index container section" aria-labelledby="chapter-heading">
   <div className="chapter-intro"><span className="tiny-star" aria-hidden="true">✧</span><h2 id="chapter-heading">{l(world.chaptersTitle)}</h2><p>{l(profile.note)}</p></div>
   <div className="chapter-links">{world.chapters.map(chapter => <Link key={chapter.mark} to={chapter.to}><span className="chapter-number">{chapter.mark}</span><span><strong>{l(chapter.title)}</strong><small>{l(chapter.text)}</small></span><span className="chapter-arrow" aria-hidden="true">↗</span></Link>)}</div>
  </section>
  <section className="container" aria-labelledby="train-title"><SectionCover assetId="cover-memory-express" className="train-entrance"><h2 id="train-title">{t('space.memoryExpress')}</h2><p>{t('space.trainIntro')}</p><nav className="train-stops" aria-label={t('space.memoryExpress')}>{[['/travel','travel.nav'],['/projects','projects'],['/history','space.history'],['/archive','space.archive']].map(([to,key])=><Link key={to} data-glass="clear" to={to}>{t(key)}</Link>)}</nav></SectionCover></section>
  <section className="hero container introduction">
   <div className="hero-copy"><p className="eyebrow hero-eyebrow"><span className="status-dot" />{l(profile.eyebrow)}</p><h2>{l(profile.title)}.</h2>
    <div className="typewriter" aria-hidden="true">{typed}<span className="caret">|</span></div><span className="sr-only">{profile.roles.join(', ')}</span>
    <p className="hero-description">{l(profile.bio)}</p>
    <div className="actions">{profile.actions.map((action, index) => <Button key={action.to} to={action.to} secondary={index > 0}>{l(action.label)} ↗</Button>)}</div>
    <div className="social">{profile.github ? <Button href={profile.github} secondary>GitHub</Button> : <span className="muted">{t('githubMissing')}</span>}</div><p className="hero-note">{l(profile.note)}</p>
   </div>
   <div className="portrait"><div className="portrait-frame"><img src={profile.avatar} width="320" height="320" alt={profile.nickname} /><p><span className="status-dot" />{profile.nickname} / Computer Science</p></div></div>
  </section>
  <section id="about" tabIndex={-1} className="container section" data-reveal><p className="eyebrow">01 / {t('about')}</p><h2>{t('about')}</h2>
   <div className="about-grid"><div><Card><span className="card-icon" aria-hidden="true">⌘</span><h3>{profile.nickname}</h3><p>{l(profile.bio)}</p><h3>{t('interests')}</h3><div className="tags">{about.interests.map((x, i) => <span key={i}>{l(x)}</span>)}</div></Card>
    <div className="grid two"><Card><h3>↗ {t('current')}</h3><p>{l(about.current)}</p></Card><Card><h3>◎ {t('goals')}</h3><p>{l(about.goals)}</p></Card></div></div>
    <Card><h3>{t('timeline')}</h3><ol className="timeline">{about.timeline.map((event, i) => <li key={i}><small>{l(event.date)}</small><h3>{l(event.title)}</h3><p>{l(event.text)}</p></li>)}</ol></Card>
   </div>
  </section>
  <section className="atelier-section" aria-labelledby="atelier-heading"><div className="container section" data-reveal>
   <div className="section-heading"><div><p className="chapter-label">02 / {t('selectedWork')}</p><h2 id="atelier-heading">{l(world.atelier)}</h2><p className="muted">{l(world.atelierIntro)}</p></div><Link className="text-link" to="/projects">{l(world.allProjects)} ↗</Link></div>
   <div className="featured-grid">{world.featuredIds.map(id => projects.find(p => p.id === id)).filter(Boolean).map(project => <Link className="featured-project" key={project.id} to={'/projects/' + project.id}><div className="film-frame"><img src={project.cover} width="800" height="450" loading="lazy" alt={l(project.name)} /><span>{project.technologies.slice(0, 2).join(' / ')}</span></div><h3>{l(project.name)}</h3><p>{l(project.summary)}</p></Link>)}</div>
  </div></section>
  <section id="journal" tabIndex={-1} className="container section" data-reveal>
   <div className="section-heading"><div><p className="chapter-label">03 / {t('categories.Travel')}</p><h2>{l(world.journal)}</h2></div><Link className="text-link" to="/travel">{t('travel.explore')} ↗</Link></div><p className="section-description">{l(world.journalIntro)}</p>
   <div className="postcard-grid">{world.cities.map(city => { const post = posts.find(p => p.slug === city.slug); return post && <Link className="postcard" key={city.slug} to={'/blog/' + city.slug}><span className="postcard-mark" aria-hidden="true">{city.motif}</span><span className="postcard-stamp" aria-hidden="true">✧</span><small>{l(world.originalLanguage)}</small><h3>{l(city.name)}</h3><p>{post.title}</p><span className="postcard-read">{t('read')} ↗</span></Link> })}</div>
  </section>
  <section id="archive" tabIndex={-1} className="container section archive-section" data-reveal>
   <div><p className="chapter-label">04 / {t('notes')}</p><h2>{l(world.archive)}</h2><p className="section-description">{l(world.archiveIntro)}</p><Link className="text-link" to="/archive">{t('space.open')} ↗</Link><br /><Link className="text-link" to="/explore">{t('space.explore')} ↗</Link></div>
   <div className="archive-list">{['cs-ai-llm', 'calculus-limits', 'freshman-year-review'].map(slug => posts.find(p => p.slug === slug)).filter(Boolean).map(post => <Link key={post.slug} to={'/blog/' + post.slug}><small>{t('categories.' + post.category)} / {l(world.originalLanguage)}</small><h3>{post.title}</h3><p>{post.summary}</p><span aria-hidden="true">↗</span></Link>)}</div>
  </section>
  <section className="container section" data-reveal><p className="eyebrow">{t('skillIntro')}</p><h2>{t('skills')}</h2>
   <Filters label={t('skills')} value={category} onChange={setCategory} items={[{ id: '', label: t('all') }, ...skillCategories.map(c => ({ id: c.id, label: l(c.label) }))]} />
   <div className="skills-grid">{skills.filter(s => !category || s.category === category).map(skill => <Card key={skill.name}><span className="skill-mark" aria-hidden="true">{skill.name.slice(0, 2)}</span><div><h3>{skill.name}</h3><small>{t(skill.status)}</small></div></Card>)}</div>
  </section>
  <section id="contact" tabIndex={-1} className="container section" data-reveal><Card className="contact-card"><p className="eyebrow">05 / {l(world.chapters[4].title)}</p><h2>{t('contact')}</h2><p>{t('contactIntro')}</p><div className="actions">{profile.github && <Button href={profile.github}>GitHub</Button>}{profile.email && <a className="button secondary" href={'mailto:' + profile.email}>{profile.email}</a>}{!profile.github && !profile.email && <p className="muted">{t('contactMissing')}</p>}</div></Card></section>
 </>
}
