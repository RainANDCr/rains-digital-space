import {useState} from 'react'
import {useTranslation} from 'react-i18next'
import {teachingParts} from '../data/extensions'
import {hardwareConfig} from '../data/spaces'
import {localized} from '../i18n'
import {Filters,Button,Card} from '../components/UI'
import ExtensionHeading from '../components/ExtensionHeading'
import CircuitSignal from '../components/CircuitSignal'
export default function Workshop(){
 const {t,i18n}=useTranslation(),[mode,setMode]=useState('quick'),[installed,setInstalled]=useState([]),[active,setActive]=useState('board'),[error,setError]=useState(false)
 const name=part=>t((part==='psu'?'ext.':'space.')+part),next=teachingParts.find(part=>!installed.includes(part))
 function install(part){if(!teachingParts.includes(part)||installed.includes(part))return;if(mode==='teaching'&&part!==next){setError(true);return}setInstalled(previous=>[...previous,part]);setActive(part);setError(false)}
 return <section className="container section"><ExtensionHeading id="workshop" /><Filters label={t('ext.workshop')} value={mode} onChange={value=>{setMode(value);setInstalled([]);setError(false)}} items={['quick','teaching'].map(id=>({id,label:t('ext.'+id)}))} /><p>{t('ext.assemblyHint')}</p><p role="status">{t('ext.assemblyProgress',{count:installed.length,total:teachingParts.length})}</p>{mode==='teaching'&&next&&<p>{t('ext.stepHint',{part:name(next)})}</p>}{error&&<p role="alert">{t('ext.wrongStep')}</p>}
 <div className="hardware-workbench"><div><div className="workshop-parts">{teachingParts.map(part=><div key={part} draggable={!installed.includes(part)} onDragStart={event=>event.dataTransfer.setData('text/plain',part)} className="workshop-part"><button className="button secondary" aria-pressed={active===part} onClick={()=>setActive(part)}>{name(part)}</button><Button disabled={installed.includes(part)} onClick={()=>install(part)}>{t(installed.includes(part)?'ext.installed':'ext.install')} · {name(part)}</Button></div>)}</div><div className="assembly-case" onDragOver={event=>event.preventDefault()} onDrop={event=>{event.preventDefault();install(event.dataTransfer.getData('text/plain'))}} aria-label={t('ext.workshop')}><span aria-hidden="true">▦</span><CircuitSignal active={active} installed={installed} />{installed.map(part=><button key={part} className="button secondary" onClick={()=>setActive(part)}>{name(part)} ✓</button>)}{!installed.length&&<p>{t('ext.assemblyHint')}</p>}</div><div className="actions"><Button secondary onClick={()=>{setInstalled([]);setError(false)}}>{t('ext.resetBuild')}</Button>{installed.includes(active)&&<Button secondary onClick={()=>setInstalled(items=>items.filter(part=>part!==active))}>{t('ext.remove')} · {name(active)}</Button>}</div></div><Card><h2>{name(active)}</h2><p>{t('ext.'+active+'Info')}</p><p className="muted">{hardwareConfig[active]?.notes?localized(hardwareConfig[active].notes,i18n.language):t('ext.noPersonalStory')}</p></Card></div></section>
}
