import { useTranslation } from 'react-i18next'
import { usePreferences } from '../components/PreferencesProvider'
import { Filters,Card } from '../components/UI'
import ResetGuide from '../components/ResetGuide'
import ExperienceSwitch from '../components/ExperienceSwitch'
export default function Settings() {
 const {t}=useTranslation(),{mode,reduced,motion,cursor,parallax,guideEnabled,motionAllowed,setPreference}=usePreferences()
 // Experience depth and visual world are independent preferences.
 return <section className="container section settings-page"><h1>{t('space.settings')}</h1><p className="muted">{t('space.preferences')}</p><p className="muted">{t('space.atmosphereHint')}</p>{!motionAllowed&&<p className="notice" role="status">{t('space.motionInactive')}</p>}<Card glass="tinted"><ExperienceSwitch /><h2>{t('space.visualMode')}</h2><Filters label={t('space.visualMode')} value={mode} onChange={v=>setPreference('mode',v)} items={['poetic','terminal'].map(id=>({id,label:t('space.'+id)}))} /><h2>{t('space.motionLevel')}</h2><Filters label={t('space.motionLevel')} value={motion} onChange={v=>setPreference('motion',v)} items={[{id:'system',label:t('space.systemMotion')},{id:'reduced',label:t('space.reducedMotion')},{id:'off',label:t('space.noMotion')}]} /><label className="motion-setting"><input type="checkbox" checked={reduced} onChange={e=>setPreference('reduced',e.target.checked)} />{t('space.reduce')}</label><p className="muted">{t('space.reduceHint')}</p>{[['cursor',cursor,'cursorEffect'],['parallax',parallax,'parallaxEffect'],['guideEnabled',guideEnabled,'guideEnabled']].map(([key,value,label])=><label className="motion-setting" key={key}><input type="checkbox" checked={value} onChange={e=>setPreference(key,e.target.checked)} />{t('space.'+label)}</label>)}<ResetGuide /></Card></section>
}
