import {useEffect, useRef, useState} from 'react'
import {usePreferences} from './PreferencesProvider'
import '../styles/kinetic.css'

// Keep the real text in the document; the disposable glyph layer is decorative.
export default function KineticTypography({as: Heading = 'h1', children, className = '', ...props}) {
 const {motionAllowed, mode} = usePreferences()
 const root = useRef(null), consumed = useRef(false)
 const [running, setRunning] = useState(false)
 const text = String(children)
 const glyphs = typeof Intl.Segmenter === 'function'
  ? [...new Intl.Segmenter(undefined, {granularity: 'grapheme'}).segment(text)].map(item => item.segment)
  : Array.from(text)

 useEffect(() => {
  if (!motionAllowed || glyphs.length > 64 || !('IntersectionObserver' in window)) {
   consumed.current = true
   setRunning(false)
   return
  }
  if (consumed.current) {setRunning(false); return}
  const observer = new IntersectionObserver(entries => {
   if (!entries.some(entry => entry.isIntersecting)) return
   consumed.current = true
   // Inline glyphs cannot preserve a wrapped word's kerning; keep multiline titles static.
   if (root.current.querySelector('.kinetic-text').getClientRects().length > 1) {observer.disconnect(); return}
   setRunning(true)
   observer.disconnect()
  }, {threshold: 0.5})
  observer.observe(root.current)
  return () => observer.disconnect()
 }, [motionAllowed, text, mode, glyphs.length])

 useEffect(()=>{
  if(!running)return
  const page=root.current.closest('.page-enter')
  if(!page)return
  const settle=()=>setRunning(false)
  page.addEventListener('pointerdown',settle,{capture:true})
  page.addEventListener('keydown',settle,{capture:true})
  return()=>{page.removeEventListener('pointerdown',settle,{capture:true});page.removeEventListener('keydown',settle,{capture:true})}
 },[running])

 return <Heading {...props} ref={root} className={`kinetic-title ${className}`} data-kinetic-style={mode === 'terminal' ? 'digital' : 'ink'} data-kinetic-state={running ? 'running' : 'static'}>
  <span className="kinetic-text">{children}</span>
  {running && <span className="kinetic-glyphs" aria-hidden="true" onAnimationEnd={event => {if (event.target === event.currentTarget) setRunning(false)}}>
   {glyphs.map((glyph, index) => <span key={index} data-digit={index % 2} style={{'--glyph-delay': `${index * 5}ms`, '--glyph-x': `${(index % 5 - 2) * 0.14}em`, '--glyph-y': `${index % 2 ? -0.22 : 0.22}em`}}>{glyph}</span>)}
  </span>}
 </Heading>
}
