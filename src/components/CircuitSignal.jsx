import {useTranslation} from 'react-i18next'
import {teachingParts} from '../data/extensions'
import {useVisibleMotion} from '../hooks/useVisibleMotion'
import '../styles/circuit.css'

export default function CircuitSignal({active,installed}) {
 const {t}=useTranslation(),[ref,visible]=useVisibleMotion()
 return <figure ref={ref} className="circuit-signal" data-running={visible}>
  <svg viewBox="0 0 360 170" aria-hidden="true">
   {teachingParts.map((part,index)=>{
    const x=40+(index%3)*140,y=35+Math.floor(index/3)*95,selected=active===part
    return <g key={part} data-part={part} data-selected={selected} data-installed={installed.includes(part)}>
     <path className="circuit-track" d={`M180 82H${x}V${y}`} />
     {selected&&<path key={active} className="circuit-pulse" pathLength="1" d={`M180 82H${x}V${y}`} />}
     <rect x={x-34} y={y-15} width="68" height="30" rx="5"/>
     <text x={x} y={y+4} textAnchor="middle">{t((part==='psu'?'ext.':'space.')+part)}</text>
    </g>
   })}
  </svg><figcaption>{t('ext.circuitHint')}</figcaption>
 </figure>
}
