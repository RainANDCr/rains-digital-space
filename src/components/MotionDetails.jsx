import {useEffect,useRef} from 'react'
import {usePreferences} from './PreferencesProvider'
import '../styles/motion-details.css'

export default function MotionDetails({effect='drawer',enabled=true,children,...props}) {
 const {motionAllowed,mode}=usePreferences(),animations=useRef([]),opened=useRef(false)
 function cancel(){animations.current.forEach(animation=>animation.cancel());animations.current=[]}
 useEffect(()=>{if(!motionAllowed||!enabled)cancel();return cancel},[motionAllowed,enabled,mode])
 function toggle(event) {
  cancel()
  const node=event.currentTarget
  if(!node.open)return
  const first=!opened.current;opened.current=true
  if(effect==='seal')node.dataset.sealBroken='true'
  if(!enabled||!motionAllowed||!node.animate)return
  const style=getComputedStyle(document.documentElement),duration=(parseFloat(style.getPropertyValue('--duration'))||220)*2,easing=style.getPropertyValue('--ease').trim()||'ease-out'
  if(effect==='seal') {
   const seal=node.querySelector('.wax-seal')
   if(first&&mode==='poetic'&&seal)animations.current=[seal.animate([{opacity:1,transform:'none'},{opacity:0,transform:'translateY(5px) rotate(10deg) scale(.9)'}],{duration,easing})]
  } else {
   if(matchMedia('(max-width:600px)').matches)return
   const frames=[{transform:'translateY(-5px)'},{transform:'translateY(1px)',offset:.75},{transform:'none'}]
   animations.current=[...node.children].filter(child=>child.tagName!=='SUMMARY').map(child=>child.animate(frames,{duration,easing}))
  }
 }
 return <details {...props} data-details-effect={effect} onToggle={toggle} onKeyDown={event=>{if(event.key==='Escape'&&!event.defaultPrevented&&event.currentTarget.open){event.preventDefault();event.currentTarget.open=false;cancel();event.currentTarget.querySelector('summary')?.focus()}}}>{children}</details>
}
