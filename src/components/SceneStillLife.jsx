import {useVisibleMotion} from '../hooks/useVisibleMotion'
import '../styles/still-life.css'

export default function SceneStillLife({shadows=true}) {
 const [ref,playing]=useVisibleMotion()
 return <svg ref={ref} className="scene-still-life" data-playing={playing} viewBox="0 0 180 100" aria-hidden="true">
  <rect x="1" y="1" width="178" height="98" rx="12" className="still-panel"/>
  <g className="still-clock"><circle cx="47" cy="47" r="30"/><circle cx="47" cy="47" r="25"/>
   <path className="clock-hour" d="M47 47L47 32"/><path className="clock-minute" d="M47 47L66 47"/><circle cx="47" cy="47" r="2"/>
  </g>
  {shadows&&<ellipse className="lamp-shadow" cx="128" cy="88" rx="30" ry="4" />}
  <g className="still-lamp"><path d="M105 84H157M130 84V50L148 29"/><path className="lamp-shade" d="M135 23L159 37L151 49L126 34Z"/><path className="lamp-light" d="M131 39L100 77H159L149 48Z"/></g>
 </svg>
}
