import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { localized } from '../i18n'
import {flushSync} from 'react-dom'
import {usePreferences} from './PreferencesProvider'
import ApertureTransition from './ApertureTransition'
import CollageDecoration from './CollageDecoration'
import '../styles/travel.css'

function Photo({ photo, ...props }) {
 const [failed, setFailed] = useState(false)
 const { t, i18n } = useTranslation()
 useEffect(() => setFailed(false), [photo.src])
 return failed ? <span className="photo-failed" role="status">{t('travel.photoFailed')}</span> : <img {...props} src={photo.src} alt={localized(photo.alt, i18n.language)} onError={() => setFailed(true)} />
}

export default function PhotoGallery({ photos = [] }) {
 const { t, i18n } = useTranslation(), l = value => localized(value, i18n.language)
 const [active, setActive] = useState(null)
 const [origin,setOrigin] = useState(null)
 const {motionAllowed=false}=usePreferences()||{}
 const transition=useRef(null),sequence=useRef(0)
 const dialog = useRef(null)
 const opener = useRef(null)
 const current = active === null ? null : photos[active]
 useEffect(()=>{if(!motionAllowed)transition.current?.skipTransition()},[motionAllowed])
 useEffect(()=>()=>{sequence.current++;transition.current?.skipTransition();delete document.documentElement.dataset.photoTransition},[])
 useEffect(() => {
  if (current && !dialog.current.open) dialog.current.showModal()
 }, [current])
 function change(update) {
  transition.current?.skipTransition()
  const id=++sequence.current
  const apply=()=>{if(id===sequence.current)flushSync(update)}
  if(!motionAllowed||!document.startViewTransition){apply();setOrigin(null);return}
  document.documentElement.dataset.photoTransition='shared'
  const next=document.startViewTransition(apply);transition.current=next
  next.ready.catch(()=>{})
  next.finished.catch(()=>{}).finally(()=>{if(id===sequence.current){delete document.documentElement.dataset.photoTransition;setOrigin(null);transition.current=null}})
 }
 function close() { flushSync(()=>setOrigin(active));change(()=>{dialog.current?.close();setActive(null);opener.current?.focus()}) }
 function move(direction) { transition.current?.skipTransition();sequence.current++;delete document.documentElement.dataset.photoTransition;setOrigin(null);setActive(index => (index + direction + photos.length) % photos.length) }
 return photos.length ? <div className="travel-gallery">
  <h3>{t('travel.album')}</h3><CollageDecoration className="photo-strip" images>{photos.map((photo, index) => <button key={photo.src} className="photo-thumb" onClick={event => { opener.current = event.currentTarget;flushSync(()=>setOrigin(index));change(()=>setActive(index)) }} aria-label={t('travel.openPhoto', { number:index + 1 })}><Photo photo={photo} style={{viewTransitionName:active===null&&origin===index?'rain-photo':'none'}} loading="lazy" width="480" height="320" /><span>{l(photo.caption) || l(photo.alt)}</span></button>)}</CollageDecoration>
  <dialog ref={dialog} className="photo-dialog" aria-labelledby="photo-title" onCancel={event => { event.preventDefault(); close() }} onClose={() => {if(!dialog.current.open)setActive(null)}} onKeyDown={event => { if (event.key === 'ArrowRight') { event.preventDefault(); move(1) } if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1) } }}>
   {current && <><div className="photo-dialog-toolbar" data-glass="regular"><h2 id="photo-title">{t('travel.album')} / {active + 1} · {photos.length}</h2><button type="button" className="icon-button" onClick={close} aria-label={t('travel.close')}>×</button></div><figure><ApertureTransition frame={current.src}><Photo photo={current} style={{viewTransitionName:origin!==null?'rain-photo':'none'}} /></ApertureTransition><figcaption>{l(current.caption) || l(current.alt)}{current.credit && <small>{l(current.credit)}</small>}</figcaption></figure><div className="photo-controls"><button className="button secondary" onClick={() => move(-1)} disabled={photos.length < 2}>{t('travel.previous')}</button><button className="button secondary" onClick={() => move(1)} disabled={photos.length < 2}>{t('travel.next')}</button></div></>}
  </dialog>
 </div> : <p className="muted">{t('travel.noPhotos')}</p>
}
