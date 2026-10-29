import {useTranslation} from 'react-i18next'
import {extensionFeatures} from '../data/extensions'
import SectionCover from './SectionCover'
import KineticTypography from './KineticTypography'
export default function ExtensionHeading({id}){const {t}=useTranslation(),feature=extensionFeatures.find(f=>f.id===id);return <><header className="space-heading"><KineticTypography>{t('ext.'+id)}</KineticTypography><p className="section-description">{t('ext.'+id+'Intro')}</p></header>{feature?.assetId&&<SectionCover assetId={feature.assetId} />}</>}
