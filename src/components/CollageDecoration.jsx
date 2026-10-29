import {useVisibleMotion} from '../hooks/useVisibleMotion'
import '../styles/collage.css'
export default function CollageDecoration({children,className='',images=false}) {
 const [ref,settling]=useVisibleMotion({once:true})
 return <div ref={ref} className={'collage-decoration '+className} data-settling={settling} data-images={images}>{children}</div>
}
