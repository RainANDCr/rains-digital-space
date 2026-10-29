import {useTranslation} from 'react-i18next'
import {usePreferences} from './PreferencesProvider'
export default function WorldMirror({label=false}) {
 const {t}=useTranslation(),{mode,setPreference}=usePreferences()
 return <button className="mode-button" data-glass="tinted" onClick={()=>setPreference('mode',mode==='poetic'?'terminal':'poetic')} aria-label={t('space.visualMode')+': '+t('space.'+mode)} title={t('ext.mirror')}><span aria-hidden="true">{mode==='poetic'?'⌘':'✧'}</span>{label&&<span>{t('ext.mirror')} · {t('space.'+mode)}</span>}</button>
}
