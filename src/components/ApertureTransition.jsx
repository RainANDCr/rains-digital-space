import {useEffect,useRef} from 'react'
import {usePreferences} from './PreferencesProvider'

export default function ApertureTransition({frame,children}) {
 const ref=useRef(null),previous=useRef(frame)
 const {motionAllowed=false}=usePreferences()||{}
 useEffect(()=>{
  const changed=previous.current!==frame;previous.current=frame
  const node=ref.current
  if(!changed||!motionAllowed||!node.animate||document.documentElement.dataset.photoTransition||node.closest('[data-film-developing="true"]'))return
  const style=getComputedStyle(document.documentElement),duration=parseFloat(style.getPropertyValue('--duration'))||220
  const frames=CSS.supports('clip-path','circle(50%)')
   ? [{clipPath:'circle(0% at 50% 50%)',filter:'blur(2px)'},{clipPath:'circle(72% at 50% 50%)',filter:'blur(0px)'}]
   : [{opacity:0},{opacity:1}]
  const animation=node.animate(frames,{duration:duration*2,easing:style.getPropertyValue('--ease').trim()||'ease-out'})
  return()=>animation.cancel()
 },[frame,motionAllowed])
 return <div ref={ref} className="aperture-transition">{children}</div>
}
