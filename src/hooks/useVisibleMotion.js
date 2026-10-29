import {useEffect,useRef,useState} from 'react'
import {usePreferences} from '../components/PreferencesProvider'

export function useVisibleMotion({once=false,enabled=true}={}) {
 const ref=useRef(null),played=useRef(false)
 const [visible,setVisible]=useState(false)
 const {motionAllowed=false}=usePreferences()||{}
 useEffect(()=>{
  if(!motionAllowed||!enabled||!window.IntersectionObserver){setVisible(false);return}
  if(once&&played.current){setVisible(false);return}
  const observer=new IntersectionObserver(entries=>{
   const showing=entries.some(entry=>entry.isIntersecting)
   setVisible(showing)
   if(showing&&once){played.current=true;observer.disconnect()}
  },{threshold:.1})
  if(ref.current)observer.observe(ref.current)
  return()=>observer.disconnect()
 },[motionAllowed,enabled,once])
 return [ref,visible&&motionAllowed&&enabled]
}
