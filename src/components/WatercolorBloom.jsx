import {usePreferences} from './PreferencesProvider'
import {useVisibleMotion} from '../hooks/useVisibleMotion'
import '../styles/watercolor.css'
export default function WatercolorBloom({children,className='',enabled=true}) {
 const {mode}=usePreferences(),[ref,playing]=useVisibleMotion({once:true,enabled})
 return <div ref={ref} className={className+(enabled?' watercolor-bloom':'')} data-blooming={playing} data-bloom-world={mode}>{children}</div>
}
