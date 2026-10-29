import { createContext,useContext,useEffect,useState,useCallback } from 'react'
import {normalizePreferences,normalizeProgress,readStored,saveStored} from '../utils/interactions'
const PreferencesContext=createContext(null)
function initialPreferences() {
 const saved=readStored('spacePreferences',{})
 return normalizePreferences({...saved,experience:saved?.experience??(matchMedia('(prefers-reduced-motion: reduce)').matches?'lite':'immersive')},navigator.connection?.saveData===true||navigator.hardwareConcurrency<=2)
}
export function PreferencesProvider({children}) {
 const [preferences,setPreferences]=useState(initialPreferences)
 const [progress,setProgress]=useState(()=>normalizeProgress(readStored('spaceInteractionProgress',{})))
 const [systemReduced,setSystemReduced]=useState(()=>matchMedia('(prefers-reduced-motion: reduce)').matches)
 const [visible,setVisible]=useState(()=>!document.hidden)
 const motionAllowed=visible&&!systemReduced&&!preferences.reduced&&preferences.motion==='system'&&preferences.experience!=='lite'
 useEffect(()=>{const media=matchMedia('(prefers-reduced-motion: reduce)');const update=()=>setSystemReduced(media.matches);const visibility=()=>setVisible(!document.hidden);media.addEventListener('change',update);document.addEventListener('visibilitychange',visibility);return()=>{media.removeEventListener('change',update);document.removeEventListener('visibilitychange',visibility)}},[])
 useEffect(()=>{
  const root=document.documentElement
  root.dataset.mode=preferences.mode;root.dataset.experience=preferences.experience;root.dataset.motion=preferences.motion==='off'?'off':motionAllowed?'full':'reduced';delete root.dataset.rain;delete root.dataset.scene;root.dataset.visibility=visible?'visible':'hidden'
  saveStored('spacePreferences',preferences)
 },[preferences,motionAllowed,visible])
 useEffect(()=>saveStored('spaceInteractionProgress',progress),[progress])
 const recordProgress=useCallback((key,value)=>setProgress(previous=>previous[key].includes(value)?previous:normalizeProgress({...previous,[key]:[...previous[key],value]})),[])
 const updateProgress=useCallback(patch=>setProgress(previous=>normalizeProgress({...previous,...(typeof patch==='function'?patch(previous):patch)})),[])
 const recordVisit=useCallback(path=>setProgress(previous=>previous.stamps[path]?previous:normalizeProgress({...previous,stamps:{...previous.stamps,[path]:new Date().toISOString()}})),[])
 return <PreferencesContext.Provider value={{...preferences,progress,motionAllowed,recordProgress,recordVisit,updateProgress,resetProgress:()=>setProgress(previous=>normalizeProgress({...previous,chapters:[],visited:[],dialogues:[]})),setPreference:(key,value)=>setPreferences(previous=>normalizePreferences({...previous,[key]:value}))}}>{children}</PreferencesContext.Provider>
}
export const usePreferences=()=>useContext(PreferencesContext)
