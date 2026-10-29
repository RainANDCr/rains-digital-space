import { useEffect,useState,useRef } from 'react'
import { useLocation,Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { guideRegistry,chapterRegistry } from '../data/interactions'
import { usePreferences } from './PreferencesProvider'
export default function Guide() {
 const {t}=useTranslation(),{pathname}=useLocation(),{motionAllowed,guideEnabled,progress,recordProgress,setPreference}=usePreferences()
 const [open,setOpen]=useState(false),[active,setActive]=useState('default'),[count,setCount]=useState(0),[failed,setFailed]=useState(false),[welcome,setWelcome]=useState(false)
 const toggle=useRef(null),panel=useRef(null)
 const route=chapterRegistry.find(chapter=>chapter.path===pathname||chapter.path!=='/'&&pathname.startsWith(chapter.path+'/'))?.path
 const available=guideRegistry.scripts.filter(script=>script.condition==='explored'?progress.visited.length>=guideRegistry.unlockAfter&&!progress.dialogues.includes(script.id):!script.scene||script.scene===route).sort((a,b)=>b.priority-a.priority)
 const script=guideRegistry.scripts.find(script=>script.id===active),text=t('space.'+script.text)
 const close=()=>{setOpen(false);toggle.current?.focus()}
 function show(next=false){setWelcome(false);const candidate=available.find(script=>!next||script.id!==active)||available[0];setActive(candidate.id);recordProgress('dialogues',candidate.id);setOpen(true)}
 useEffect(()=>{if(route)recordProgress('visited',route);if(pathname==='/'&&!progress.dialogues.includes('welcomeSeen')){setWelcome(true);recordProgress('dialogues','welcomeSeen')}else setWelcome(false);setOpen(false)},[pathname,recordProgress])
 useEffect(()=>{if(!open)return;panel.current?.querySelector('button')?.focus();const escape=e=>{if(e.key==='Escape')close()};addEventListener('keydown',escape);return()=>removeEventListener('keydown',escape)},[open])
 useEffect(()=>{
  if(!open)return
  if(!motionAllowed){setCount(text.length);return}
  setCount(0);const timer=setInterval(()=>setCount(value=>{if(value>=text.length){clearInterval(timer);return value}return value+1}),35)
  return()=>clearInterval(timer)
 },[text,open,motionAllowed])
 if(!guideEnabled)return null
 return <aside className={'site-guide'+(open?' is-open':'')} aria-label={t(guideRegistry.nameKey)} data-state={open?script.state:'idle'}>
  {welcome&&!open&&<div className="guide-welcome"><p>{t('space.guideWelcome')}</p><button aria-label={t('space.guideClose')} onClick={()=>setWelcome(false)}>×</button></div>}
  {open&&<div ref={panel} className="guide-panel"><div className="guide-heading"><strong>{t(guideRegistry.nameKey)}</strong><button className="icon-button" onClick={close} aria-label={t('space.guideClose')}>×</button></div><div className="guide-content">{failed?<span className="guide-fallback" role="img" aria-label={t('space.guidePortrait')}>✧</span>:<img src={guideRegistry.image} alt={t('space.guidePortrait')} width="80" height="100" onError={()=>setFailed(true)} />}<p><span aria-hidden="true">{text.slice(0,count)}</span><span className="sr-only">{text}</span></p></div><div className="guide-actions"><button onClick={()=>setCount(text.length)}>{t('space.showAll')}</button><button onClick={()=>show(true)}>{t('space.next')}</button><Link to="/explore" onClick={close}>{t('space.explore')}</Link><button onClick={()=>{setPreference('guideEnabled',false);document.querySelector('.settings-link')?.focus()}}>{t('space.hideGuide')}</button></div></div>}
  <button ref={toggle} className="guide-toggle" aria-expanded={open} onClick={()=>open?close():show()} aria-label={t(open?'space.guideClose':'space.guideOpen')}>✧</button>
 </aside>
}
