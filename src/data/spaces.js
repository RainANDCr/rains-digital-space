// 这里只能放已同意公开的资料。前端 visibility/日期过滤不是保密或定时发布服务。
export const areas = [
 { path:'/archive', key:'archive', mark:'04', glyph:'◷' }, { path:'/hardware', key:'hardware', mark:'05', glyph:'⌘' },
 { path:'/history', key:'history', mark:'06', glyph:'▤' }, { path:'/learning', key:'learning', mark:'07', glyph:'✧' },
 { path:'/cinema', key:'cinema', mark:'08', glyph:'▧' }, { path:'/letters', key:'letters', mark:'09', glyph:'✉' }
]
export const archiveEvents = [{
 id:'local-redesign', date:'2026-10-28', topic:'engineering', titleKey:'siteUpdate', textKey:'siteUpdateText', visibility:'public',
 projects:['rains-digital-space'], cities:[]
}]
export const futureLetters = []
export const hardwareParts = ['cpu','gpu','memory','board','storage','cooling','display','peripheral']
export const hardwareConfig = {}
export const hardwareLog = []
export const historyMeta = {}
export const learningPlan = []
export const mediaAlbums = []
