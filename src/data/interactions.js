export const chapterRegistry = [
 {id:'home',path:'/'},
 {id:'projects',path:'/projects'},
 {id:'travel',path:'/travel'},
 ...['archive','hardware','history','learning','cinema','letters'].map(id=>({id,path:'/'+id}))
]
export const guideRegistry = {
 nameKey:'space.guide',image:'/images/rain-prologue.webp',unlockAfter:3,
 scripts:[
  {id:'welcome',scene:'/',priority:1,text:'guideHome',state:'greeting'},
  {id:'projects',scene:'/projects',priority:1,text:'guideProjects',state:'thinking'},
  {id:'travel',scene:'/travel',priority:1,text:'guideTravel',state:'greeting'},
  {id:'history',scene:'/history',priority:1,text:'historyGuide',state:'thinking'},
  {id:'cinema',scene:'/cinema',priority:1,text:'cinemaGuide',state:'idle'},
  {id:'explorer',condition:'explored',priority:2,text:'explorerGuide',state:'celebrating'},
  {id:'default',priority:0,text:'guideOther',state:'idle'}
 ]
}
export const parallaxLayers = { far:.08,middle:.13,near:.18,maxOffset:28 }
