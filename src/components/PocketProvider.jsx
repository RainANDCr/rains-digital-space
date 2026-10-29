import {createContext,useContext,useEffect,useState,useRef} from 'react'
const PocketContext=createContext(null)
export function PocketProvider({children}){
 const [online,setOnline]=useState(navigator.onLine),[registration,setRegistration]=useState(null),[waiting,setWaiting]=useState(null),[installPrompt,setInstallPrompt]=useState(null),[ready,setReady]=useState(false),[busy,setBusy]=useState(false),[error,setError]=useState(false)
 const reloading=useRef(false)
 useEffect(()=>{
  const updateOnline=()=>setOnline(navigator.onLine),install=event=>{event.preventDefault();setInstallPrompt(event)},installed=()=>setInstallPrompt(null),reload=()=>{if(reloading.current)location.reload()}
  addEventListener('online',updateOnline);addEventListener('offline',updateOnline);addEventListener('beforeinstallprompt',install);addEventListener('appinstalled',installed)
  let disposed=false,removeUpdate=()=>{}
  if(import.meta.env.PROD&&'serviceWorker' in navigator){
   navigator.serviceWorker.addEventListener('controllerchange',reload)
   navigator.serviceWorker.register('/sw.js',{updateViaCache:'none'}).then(async reg=>{
    if(disposed)return;setWaiting(reg.waiting)
    const update=()=>{const worker=reg.installing;if(worker)worker.addEventListener('statechange',()=>{if(!disposed&&worker.state==='installed')setWaiting(reg.waiting)})}
    reg.addEventListener('updatefound',update);removeUpdate=()=>reg.removeEventListener('updatefound',update)
    const active=await navigator.serviceWorker.ready;if(disposed)return;setRegistration(active)
    try{const result=await message(active,'STATUS');if(!disposed)setReady(result.ready)}catch{}
   }).catch(()=>{if(!disposed)setError(true)})
  }
  return()=>{disposed=true;removeUpdate();removeEventListener('online',updateOnline);removeEventListener('offline',updateOnline);removeEventListener('beforeinstallprompt',install);removeEventListener('appinstalled',installed);navigator.serviceWorker?.removeEventListener('controllerchange',reload)}
 },[])
 async function cacheAction(action){if(!registration)return;setBusy(true);setError(false);try{const result=await message(registration,action);if(!result.ok)throw new Error('Cache failed');setReady(result.ready)}catch{setError(true)}finally{setBusy(false)}}
 return <PocketContext.Provider value={{production:import.meta.env.PROD,online,ready,busy,error,waiting,available:!!registration,canInstall:!!installPrompt,install:async()=>{try{await installPrompt?.prompt();setInstallPrompt(null)}catch{setError(true)}},prepare:()=>cacheAction('PREPARE'),clear:()=>cacheAction('CLEAR'),update:()=>{if(waiting){reloading.current=true;waiting.postMessage({type:'ACTIVATE'})}}}}>{children}</PocketContext.Provider>
}
function message(registration,type){return new Promise((resolve,reject)=>{const worker=registration.active;if(!worker)return reject(new Error('No active worker'));const channel=new MessageChannel(),timer=setTimeout(()=>{channel.port1.close();reject(new Error('Worker timed out'))},90000);channel.port1.onmessage=event=>{clearTimeout(timer);channel.port1.close();resolve(event.data)};worker.postMessage({type},[channel.port2])})}
export const usePocket=()=>useContext(PocketContext)
