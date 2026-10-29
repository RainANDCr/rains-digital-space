import {usePreferences} from './PreferencesProvider'
import '../styles/year-roller.css'

export default function YearRoller({value}) {
 const {motionAllowed,mode}=usePreferences()
 const numeric=/^\d{4}$/.test(value)
 return <output className="year-roller" data-style={mode==='terminal'?'digital':'mechanical'} aria-live="polite">
  <span>{value}</span>
  {numeric&&motionAllowed&&<span key={value} className="year-digits" aria-hidden="true">{Array.from(value).map((digit,index)=><span key={index}><i style={{animationDelay:`${index*25}ms`}}>{digit}</i></span>)}</span>}
 </output>
}
