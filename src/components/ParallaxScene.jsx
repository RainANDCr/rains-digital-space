import {useEffect,useRef} from 'react'
import {usePreferences} from './PreferencesProvider'
import {parallaxLayers} from '../data/interactions'
export default function ParallaxScene({children}) {
 const ref=useRef(null),{parallax,cursor,motionAllowed,mode}=usePreferences()
 useEffect(()=>{
  if(!parallax||!motionAllowed||mode==='terminal'||!('IntersectionObserver' in window)||!matchMedia('(min-width: 901px) and (pointer: fine)').matches)return
  const scene=ref.current,surface=scene.parentElement;let frame=0,inView=true,pointerX=0,pointerY=0
  const draw=()=>{frame=0;if(!inView)return;const rect=scene.getBoundingClientRect(),offset=Math.max(0,Math.min(rect.height,-rect.top));for(const [name,depth] of Object.entries(parallaxLayers)){if(name==='maxOffset')continue;scene.style.setProperty('--'+name+'-y',Math.min(parallaxLayers.maxOffset,offset*depth)+'px')}scene.style.setProperty('--star-x',pointerX+'px');scene.style.setProperty('--star-y',pointerY+'px')}
  const schedule=()=>{if(inView&&!frame)frame=requestAnimationFrame(draw)}
  const move=e=>{if(!cursor||e.pointerType!=='mouse')return;const rect=scene.getBoundingClientRect();pointerX=((e.clientX-rect.left)/rect.width-.5)*6;pointerY=((e.clientY-rect.top)/rect.height-.5)*4;schedule()}
  const reset=()=>{pointerX=0;pointerY=0;schedule()}
  const observer=new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;if(inView)schedule();else{cancelAnimationFrame(frame);frame=0}})
  observer.observe(scene);addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule);surface.addEventListener('pointermove',move,{passive:true});surface.addEventListener('pointerleave',reset);addEventListener('blur',reset);schedule()
  return()=>{cancelAnimationFrame(frame);observer.disconnect();removeEventListener('scroll',schedule);removeEventListener('resize',schedule);surface.removeEventListener('pointermove',move);surface.removeEventListener('pointerleave',reset);removeEventListener('blur',reset);for(const key of ['far-y','middle-y','near-y','star-x','star-y'])scene.style.removeProperty('--'+key)}
 },[parallax,cursor,motionAllowed,mode])
 return <div ref={ref} className="parallax-scene">{children}<div className="parallax-horizon" aria-hidden="true" /><div className="parallax-near" aria-hidden="true"><span>✧</span><span>·</span><span>✧</span></div></div>
}
