import {useNavigate,useLocation} from 'react-router-dom'
import {useTranslation} from 'react-i18next'
import {tourRoutes} from '../data/extensions'
import {usePreferences} from './PreferencesProvider'
import {Button} from './UI'
export default function TourGuide(){
 const {t}=useTranslation(),{progress,updateProgress}=usePreferences(),navigate=useNavigate(),location=useLocation(),tour=tourRoutes.find(route=>route.id===progress.tour?.id)
 if(!tour)return null
 const step=progress.tour.step,current=tour.stops[step]
 function move(index){updateProgress({tour:{id:tour.id,step:index}});navigate(tour.stops[index])}
 return <aside className="tour-guide" aria-label={t('ext.tourNames')}><div><strong>{t('ext.'+tour.id+'Route')}</strong><p>{t('ext.routeProgress',{step:step+1,total:tour.stops.length})}</p></div><div className="actions"><Button secondary onClick={()=>move(Math.max(0,step-1))} disabled={step===0}>{t('ext.previous')}</Button>{location.pathname+location.hash!==current&&<Button secondary onClick={()=>navigate(current)}>{t('ext.returnStop')}</Button>}{step<tour.stops.length-1?<><Button onClick={()=>move(step+1)}>{t('ext.next')}</Button><Button secondary onClick={()=>move(step+1)}>{t('ext.skip')}</Button></>:<Button onClick={()=>updateProgress(previous=>({tour:null,completedRoutes:[...previous.completedRoutes,tour.id]}))}>{t('ext.complete')}</Button>}<Button secondary onClick={()=>updateProgress({tour:null})}>{t('ext.finish')}</Button></div></aside>
}
