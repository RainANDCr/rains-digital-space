import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { profile } from '../data/profile'
import { Button } from '../components/UI'
import SpaceHeading from '../components/SpaceHeading'
import WatercolorBloom from '../components/WatercolorBloom'
export default function Letters() {
 const {t}=useTranslation(),[sender,setSender]=useState(''),[email,setEmail]=useState(''),[message,setMessage]=useState(''),[preview,setPreview]=useState(false),[status,setStatus]=useState('')
 const body=sender.trim()+'\n'+(email.trim()?email.trim()+'\n':'')+'\n'+message.trim()
 const mailto='mailto:'+profile.email+'?subject='+encodeURIComponent(t('space.letterSubject'))+'&body='+encodeURIComponent(body)
 function showPreview(e) { e.preventDefault();if(!sender.trim()||message.trim().length<2){setStatus('required');setPreview(false);return}setPreview(true);setStatus('') }
 return <section className="container section"><SpaceHeading name="letters" mark="09" /><p className="notice">{t('space.mailHint')}</p><div className="letter-desk"><form className="letter-form" onSubmit={showPreview}><label htmlFor="sender">{t('space.sender')}</label><input id="sender" required maxLength={60} value={sender} onChange={e=>{setSender(e.target.value);setPreview(false);setStatus('')}} /><label htmlFor="reply-email">{t('space.email')}</label><input id="reply-email" type="email" maxLength={254} value={email} onChange={e=>{setEmail(e.target.value);setPreview(false)}} /><label htmlFor="letter-message">{t('space.message')}</label><textarea id="letter-message" required minLength={2} maxLength={1000} rows={8} value={message} onChange={e=>{setMessage(e.target.value);setPreview(false);setStatus('')}} /><small>{message.length} / 1000</small><button className="button" type="submit">{t('space.preview')}</button>{status==='required'&&<p role="alert">{t('space.required')}</p>}</form><WatercolorBloom className="letter-preview"><span aria-hidden="true">✉</span>{preview?<><h2>{t('space.preview')}</h2><p className="letter-body">{body}</p><div className="actions"><Button secondary onClick={async()=>{try{await navigator.clipboard.writeText(body);setStatus('copied')}catch{setStatus('copyFailed')}}}>{t('space.copy')}</Button><a className="button" href={mailto}>{t('space.mail')}</a></div><p role="status">{status&&t('space.'+status)}</p></>:<p>{t('space.mailHint')}</p>}</WatercolorBloom></div></section>
}
