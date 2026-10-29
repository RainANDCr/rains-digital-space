import {useTranslation} from 'react-i18next'
import {usePreferences} from './PreferencesProvider'
import {Filters} from './UI'
export default function ExperienceSwitch(){const {t}=useTranslation(),{experience,setPreference}=usePreferences();return <div className="experience-setting"><h2>{t('ext.experience')}</h2><p className="muted">{t('ext.experienceHint')}</p><Filters label={t('ext.experience')} value={experience} onChange={value=>setPreference('experience',value)} items={['immersive','lite'].map(id=>({id,label:t('ext.'+id)}))} /></div>}
