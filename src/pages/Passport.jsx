import {useState} from 'react'
import {Link} from 'react-router-dom'
import {useTranslation} from 'react-i18next'
import {visitRoutes} from '../data/extensions'
import {usePreferences} from '../components/PreferencesProvider'
import {Button} from '../components/UI'
import {exportPassport} from '../utils/exportPassport'
import ExtensionHeading from '../components/ExtensionHeading'
const names={'/':'home','/blog':'blog','/projects':'projects','/travel':'travel.nav','/archive':'space.archive','/hardware':'space.hardware','/history':'space.history','/learning':'space.learning','/cinema':'space.cinema','/letters':'space.letters'}
export default function Passport(){const {t,i18n}=useTranslation(),{progress,updateProgress}=usePreferences(),[confirm,setConfirm]=useState(false),[error,setError]=useState(false)
 const entries=visitRoutes.map(path=>({path,label:t(names[path]||'ext.'+path.slice(1)),unlocked:!!progress.stamps[path],date:progress.stamps[path]?new Date(progress.stamps[path]).toLocaleDateString(i18n.language):''}))
 return <section className="container section"><ExtensionHeading id="passport" /><p role="status">{t('ext.stamps',{count:entries.filter(e=>e.unlocked).length,total:entries.length})}</p><div className="passport-grid">{entries.map(entry=><Link key={entry.path} to={entry.path} className={'passport-stamp '+(entry.unlocked?'unlocked':'locked')}><span aria-hidden="true">{entry.unlocked?'✧':'◇'}</span><h2>{entry.label}</h2><small>{entry.date||t('ext.lockedStamp')}</small></Link>)}</div><div className="actions"><Button onClick={async()=>{try{await exportPassport(t('ext.passport'),entries);setError(false)}catch{setError(true)}}}>{t('ext.exportCard')}</Button><Button secondary onClick={()=>setConfirm(true)}>{t('ext.clearPassport')}</Button></div>{confirm&&<div className="notice"><p>{t('ext.confirmClear')}</p><Button secondary onClick={()=>{updateProgress({stamps:{},completedRoutes:[]});setConfirm(false)}}>{t('ext.clearPassport')}</Button><Button secondary onClick={()=>setConfirm(false)}>{t('ext.cancel')}</Button></div>}{error&&<p role="alert">{t('ext.exportFailed')}</p>}</section>}
