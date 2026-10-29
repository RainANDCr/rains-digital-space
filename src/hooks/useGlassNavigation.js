import {useLayoutEffect} from 'react'

// Measure only on selection/size changes; CSS retargets interrupted transitions.
export function useGlassNavigation(ref,selection,language,open) {
 useLayoutEffect(()=>{
  const nav=ref.current,indicator=nav?.querySelector('.glass-nav-indicator')
  if(!nav||!indicator)return
  let disposed=false
  const update=()=>{
   if(disposed)return
   const active=nav.querySelector('a[aria-current]')
   if(!active||!nav.getClientRects().length){indicator.dataset.ready='false';return}
   const bounds=nav.getBoundingClientRect(),target=active.getBoundingClientRect()
   indicator.style.transform=`translate3d(${target.left-bounds.left}px,${target.top-bounds.top}px,0)`
   indicator.style.width=target.width+'px';indicator.style.height=target.height+'px'
   indicator.dataset.ready='true'
  }
  update()
  const observer=typeof ResizeObserver==='function'?new ResizeObserver(update):null
  observer?.observe(nav)
  if(!observer)window.addEventListener('resize',update)
  document.fonts?.ready.then(update)
  return()=>{disposed=true;observer?.disconnect();window.removeEventListener('resize',update)}
 },[ref,selection,language,open])
}
