import MotionDetails from './MotionDetails'
import '../styles/paper-corner.css'
import {useState} from 'react'
import {useTranslation} from 'react-i18next'
import {futureLetters} from '../data/spaces'
import {demoLetters} from '../data/demoLetters'
import {letterState} from '../utils/archive'
import {localized} from '../i18n'
export default function FutureLetters() {
 const {t,i18n}=useTranslation(),l=value=>localized(value,i18n.language)
 const [demos,setDemos]=useState(false),[sort,setSort]=useState('unlockDate'),[year,setYear]=useState('')
 const letters=(demos?demoLetters:futureLetters).filter(letter=>letterState(letter)!=='private')
 const visible=letters.filter(letter=>!year||(letter[sort]||'').slice(0,4)===year).sort((a,b)=>(a[sort]||'').localeCompare(b[sort]||''))
 return <section id="future" className="future-letter future-collection" tabIndex={-1}><span aria-hidden="true">✉</span><h2>{t('space.future')}</h2><p>{t('space.futurePrivacy')}</p><button className="button secondary" aria-pressed={demos} onClick={()=>{setDemos(!demos);setYear('')}}>{t('space.demoLetters')}</button>{demos&&<p className="notice">{t('space.demosOnly')}</p>}
  {letters.length>0&&<div className="archive-filters"><label>{t('space.sortLetters')}<select value={sort} onChange={e=>{setSort(e.target.value);setYear('')}}><option value="writtenAt">{t('space.writtenSort')}</option><option value="unlockDate">{t('space.unlockSort')}</option></select></label><label>{t('space.year')}<select value={year} onChange={e=>setYear(e.target.value)}><option value="">{t('all')}</option>{[...new Set(letters.map(letter=>(letter[sort]||'').slice(0,4)).filter(Boolean))].sort().map(y=><option key={y}>{y}</option>)}</select></label></div>}
  {!visible.length&&<p>{t('space.noLetters')}</p>}{visible.map(letter=>{const state=letterState(letter),title=letter.titleKey?t('space.'+letter.titleKey):l(letter.title);return state==='invalid'?<p key={letter.id} role="alert">{t('space.invalidLetter')}</p>:<article key={letter.id} className={'future-envelope is-'+state}><small>{t('space.'+state)} / {letter.demo?t('space.demosOnly'):''}</small><h3>{title}</h3><p className="letter-dates">{letter.writtenAt&&<span>{t('space.written')}: <time dateTime={letter.writtenAt}>{letter.writtenAt}</time></span>}<span>{t('space.unlockDate')}: <time dateTime={letter.unlockDate}>{letter.unlockDate}</time></span></p>{state==='locked'?<><p>{letter.teaserKey?t('space.'+letter.teaserKey):l(letter.teaser)}</p><p>{t('space.noBody')}</p></>:<MotionDetails effect="seal"><summary className="paper-corner"><span className="wax-seal" aria-hidden="true">✧</span>{t('space.open')}</summary><p className="future-body">{letter.bodyKey?t('space.'+letter.bodyKey):l(letter.body)||t('space.noBody')}</p></MotionDetails>}</article>})}
 </section>
}
