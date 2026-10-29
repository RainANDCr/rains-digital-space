import SceneImage from './SceneImage'
import {useTranslation} from 'react-i18next'
export default function SectionCover({assetId,children,className=''}) {
 const {t}=useTranslation()
 return <div className={'section-cover '+className}><SceneImage assetId={assetId} /><small className="art-credit">{t('space.conceptArt')}</small>{children&&<div className="cover-copy">{children}</div>}</div>
}
