import { useTranslation } from 'react-i18next'
import SectionCover from './SectionCover'
import {sectionAssets} from '../data/visuals'
import KineticTypography from './KineticTypography'
export default function SpaceHeading({ name, mark }) {
 const { t } = useTranslation()
 return <><header className="space-heading"><p className="chapter-label">{mark} / Rain’s Digital Space</p><KineticTypography>{t('space.' + name)}</KineticTypography><p className="section-description">{t('space.' + name + 'Intro')}</p></header>{sectionAssets[name]&&<SectionCover assetId={sectionAssets[name]} />}</>
}
