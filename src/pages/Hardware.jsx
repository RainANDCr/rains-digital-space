import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { hardwareParts,hardwareConfig,hardwareLog } from '../data/spaces'
import { localized } from '../i18n'
import { safeExternal } from '../utils/filter'
import { Card } from '../components/UI'
import SpaceHeading from '../components/SpaceHeading'
export default function Hardware() {
 const {t,i18n}=useTranslation(),l=v=>localized(v,i18n.language),[active,setActive]=useState('cpu')
 const part=hardwareConfig[active]
 return <section className="container section"><SpaceHeading name="hardware" mark="05" /><p className="muted">{t('space.hardwareHint')}</p><div className="hardware-workbench"><div className="computer-case" role="group" aria-label={t('space.hardware')}>{hardwareParts.map(key=><button key={key} className={'part part-'+key} aria-pressed={active===key} onClick={()=>setActive(key)}><span aria-hidden="true">{key==='cpu'?'▦':key==='cooling'?'◎':'▤'}</span>{t('space.'+key)}</button>)}</div><Card className="hardware-detail"><p className="chapter-label">{active.toUpperCase()}</p><h2>{t('space.'+active)}</h2><h3>{t('space.model')}</h3><p>{part?.model || t('space.pending')}</p><p>{part?.notes?l(part.notes):t('space.noHardware')}</p>{safeExternal(part?.source) && <a href={safeExternal(part.source)} target="_blank" rel="noopener noreferrer">{t('space.source')} ↗</a>}</Card></div><section className="space-block"><h2>{t('space.deviceLog')}</h2>{hardwareLog.filter(e=>e.visibility==='public').length ? hardwareLog.filter(e=>e.visibility==='public').map(e=><Card key={e.id}><small>{e.date}</small><h3>{l(e.title)}</h3><p>{l(e.text)}</p></Card>):<p className="empty">{t('space.noRecords')}</p>}</section></section>
}
