import {sceneSchedule,chapterRegistry} from '../data/interactions.js'
import {visitRoutes,tourRoutes} from '../data/extensions.js'
export function sceneForHour(hour) {
 return [...sceneSchedule].reverse().find(entry=>hour>=entry.hour)?.scene||'night'
}
export function normalizePreferences(value={},lowPower=false) {
 const raw=value&&typeof value==='object'?value:{}
 const oneOf=(key,choices,fallback)=>choices.includes(raw[key])?raw[key]:fallback
 const bool=(key,fallback)=>typeof raw[key]==='boolean'?raw[key]:fallback
 return {version:2,mode:oneOf('mode',['poetic','terminal'],'poetic'),experience:oneOf('experience',['immersive','lite'],'immersive'),scene:oneOf('scene',['auto','dawn','day','dusk','night'],'auto'),reduced:bool('reduced',lowPower),motion:oneOf('motion',['system','reduced','off'],'system'),rain:oneOf('rain',['off','light','medium'],'light'),cursor:bool('cursor',true),parallax:bool('parallax',true),guideEnabled:bool('guideEnabled',true)}
}
export function readStored(key,fallback) {try{return JSON.parse(localStorage.getItem(key))??fallback}catch{return fallback}}
export function saveStored(key,value) {try{localStorage.setItem(key,JSON.stringify(value))}catch{}}
export function normalizeProgress(value={}) {
 const raw=value&&typeof value==='object'?value:{}
 const strings=(key,allowed)=>Array.isArray(raw[key])?[...new Set(raw[key].filter(x=>typeof x==='string'&&(!allowed||allowed.includes(x))))].slice(0,50):[]
 const tour=tourRoutes.find(route=>route.id===raw.tour?.id)
 const stamps=Object.fromEntries(Object.entries(raw.stamps&&typeof raw.stamps==='object'?raw.stamps:{}).filter(([path,date])=>visitRoutes.includes(path)&&typeof date==='string'&&/^\d{4}-\d{2}-\d{2}T/.test(date)&&Number.isFinite(Date.parse(date))))
 return {version:1,chapters:strings('chapters',chapterRegistry.map(c=>c.id)),visited:strings('visited',chapterRegistry.map(c=>c.path)),dialogues:strings('dialogues'),stamps,favorites:strings('favorites',tourRoutes.map(route=>route.id)),completedRoutes:strings('completedRoutes',tourRoutes.map(route=>route.id)),tour:tour?{id:tour.id,step:Number.isInteger(raw.tour.step)?Math.max(0,Math.min(tour.stops.length-1,raw.tour.step)):0}:null}
}
