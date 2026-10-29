import {useTranslation} from 'react-i18next'
import {usePreferences} from './PreferencesProvider'
export default function ResetGuide(){const {t}=useTranslation(),{resetProgress,setPreference}=usePreferences();return <button className="button secondary" onClick={()=>{resetProgress();setPreference('guideEnabled',true)}}>{t('space.resetGuide')}</button>}
