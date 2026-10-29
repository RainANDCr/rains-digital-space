import {useEffect} from 'react'
import {useLocation} from 'react-router-dom'
import {usePreferences} from '../components/PreferencesProvider'
export function useCardMotion() {
 const {pathname}=useLocation(),{cursor,motionAllowed}=usePreferences()
 useEffect(()=>{
  if(!cursor||!motionAllowed||!matchMedia('(hover: hover) and (pointer: fine)').matches)return
  const selector='.project-card,.featured-project,.photo-thumb,.nav-actions button[data-glass],.button[data-glass]'
  let active=null,frame=0,latest=null
  const reset=()=>{cancelAnimationFrame(frame);frame=0;if(active){for(const key of ['--tilt-x','--tilt-y','--light-x','--light-y'])active.style.removeProperty(key);active.classList.remove('living-card','glass-pointer');active=null}}
  const update=()=>{frame=0;if(!active||!latest)return;const rect=active.getBoundingClientRect();const x=Math.max(0,Math.min(1,(latest.clientX-rect.left)/rect.width)),y=Math.max(0,Math.min(1,(latest.clientY-rect.top)/rect.height));active.style.setProperty('--tilt-x',((.5-y)*3).toFixed(2)+'deg');active.style.setProperty('--tilt-y',((x-.5)*3).toFixed(2)+'deg');active.style.setProperty('--light-x',x*100+'%');active.style.setProperty('--light-y',y*100+'%')}
  const move=e=>{if(e.pointerType!=='mouse')return;const card=e.target instanceof Element?e.target.closest(selector):null;if(card!==active){reset();active=card;if(active)active.classList.add(active.matches('[data-glass]')?'glass-pointer':'living-card')}if(!active)return;latest=e;if(!frame)frame=requestAnimationFrame(update)}
  const leave=e=>{if(active&&!active.contains(e.relatedTarget))reset()}
  document.addEventListener('pointermove',move,{passive:true});document.addEventListener('pointerout',leave);addEventListener('blur',reset)
  return()=>{reset();document.removeEventListener('pointermove',move);document.removeEventListener('pointerout',leave);removeEventListener('blur',reset)}
 },[pathname,cursor,motionAllowed])
}
