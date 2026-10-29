import {Children} from 'react'
import {useVisibleMotion} from '../hooks/useVisibleMotion'
import '../styles/relations.css'

export default function RelationLines({children,...props}) {
 const [ref,drawing]=useVisibleMotion({once:true,enabled:Children.toArray(children).length<=120})
 return <svg {...props} ref={ref} className="relation-lines" data-drawing={drawing} aria-hidden="true">{children}</svg>
}
