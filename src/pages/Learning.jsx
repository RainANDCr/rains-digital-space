import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { skills,skillCategories } from '../data/skills'
import { posts } from '../data/posts'
import { learningPlan } from '../data/spaces'
import { localized } from '../i18n'
import { Filters,Card } from '../components/UI'
import SpaceHeading from '../components/SpaceHeading'
import RelationLines from '../components/RelationLines'
export default function Learning() {
 const {t,i18n}=useTranslation(),l=v=>localized(v,i18n.language),[category,setCategory]=useState('')
 const visible=skills.filter(s=>!category||s.category===category)
 return <section className="container section"><SpaceHeading name="learning" mark="07" /><h2>{t('space.knowledge')}</h2><p className="muted">{t('space.skillState')}</p><Filters label={t('skills')} value={category} onChange={setCategory} items={[{id:'',label:t('all')},...skillCategories.map(c=>({id:c.id,label:l(c.label)}))]} /><div className="knowledge-map"><RelationLines key={category} viewBox="0 0 1000 260" preserveAspectRatio="none"><path pathLength="1" d="M50 170L230 50 420 190 600 70 800 190 960 60 M230 50L600 70 420 190 800 190" fill="none" stroke="currentColor" /></RelationLines>{visible.map((skill,index)=><div className="knowledge-star" key={skill.name}><span aria-hidden="true">✧</span><strong>{skill.name}</strong><small>{t(skill.status)}</small></div>)}</div><section className="space-block"><h2>{t('space.plan')}</h2>{learningPlan.filter(p=>p.visibility==='public').length?learningPlan.filter(p=>p.visibility==='public').map(p=><Card key={p.id}><h3>{l(p.title)}</h3><p>{l(p.text)}</p></Card>):<p className="muted">{t('space.noPlan')}</p>}<Link className="button secondary" to="/projects/studyflow">{t('space.studyflow')} ↗</Link></section><section className="space-block"><h2>{t('space.notes')}</h2><div className="grid">{posts.filter(p=>['Computer Science','Calculus','Linear Algebra'].includes(p.category)).map(post=><Card key={post.slug}><small>{t('categories.'+post.category)}</small><h3>{post.title}</h3><p>{post.summary}</p><Link to={'/blog/'+post.slug}>{t('read')} ↗</Link></Card>)}</div></section></section>
}
