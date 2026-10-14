import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { localized } from '../i18n'
import { profile, about } from '../data/profile'
import { skills, skillCategories } from '../data/skills'
import { Button, Card, Filters } from '../components/UI'
import { useTypewriter } from '../hooks/useTypewriter'
export default function Home() {
 const { t, i18n } = useTranslation(), l = v => localized(v, i18n.language)
 const [category, setCategory] = useState('')
 const typed = useTypewriter(profile.roles)
 return <>
  <section className="hero container">
   <div className="hero-copy"><p className="eyebrow hero-eyebrow"><span className="status-dot" />{l(profile.eyebrow)}</p><h1>{l(profile.title)}<span className="accent">.</span></h1>
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
  <section className="container section" data-reveal><p className="eyebrow">02 / {t('skills')}</p><h2>{t('skills')}</h2><p className="muted">{t('skillIntro')}</p>
   <Filters label={t('skills')} value={category} onChange={setCategory} items={[{ id: '', label: t('all') }, ...skillCategories.map(c => ({ id: c.id, label: l(c.label) }))]} />
   <div className="skills-grid">{skills.filter(s => !category || s.category === category).map(skill => <Card key={skill.name}><span className="skill-mark" aria-hidden="true">{skill.name.slice(0, 2)}</span><div><h3>{skill.name}</h3><small>{t(skill.status)}</small></div></Card>)}</div>
  </section>
  <section id="contact" tabIndex={-1} className="container section" data-reveal><Card className="contact-card"><p className="eyebrow">03 / {t('contact')}</p><h2>{t('contact')}</h2><p>{t('contactIntro')}</p><div className="actions">{profile.github && <Button href={profile.github}>GitHub</Button>}{profile.email && <a className="button secondary" href={'mailto:' + profile.email}>{profile.email}</a>}{!profile.github && !profile.email && <p className="muted">{t('contactMissing')}</p>}</div></Card></section>
 </>
}
