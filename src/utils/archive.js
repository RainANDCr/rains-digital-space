export function publicEvents(events, { year='', topic='' } = {}) {
 return events.filter(event => event.visibility === 'public' && (!year || event.date?.slice(0,4) === year) && (!topic || event.topic === topic))
}
export function validDay(value) {
 if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false
 const date = new Date(value + 'T00:00:00Z')
 return Number.isFinite(date.getTime()) && date.toISOString().slice(0,10) === value
}
function localDay() { return new Date().toISOString().slice(0,10) }
export function publicLetters(letters, today = localDay()) {
 // 这里只控制展示；秘密信件不能放进任何前端数据文件。
 return validDay(today) ? letters.filter(letter => letter.visibility === 'public' && letter.confirmed === true && validDay(letter.unlockDate) && letter.unlockDate <= today) : []
}
export function letterState(letter,today=localDay()) {
 if(letter.visibility!=='public'||letter.confirmed!==true)return 'private'
 if(!validDay(today)||!validDay(letter.unlockDate)||(letter.writtenAt&&!validDay(letter.writtenAt)))return 'invalid'
 return letter.unlockDate>today?'locked':'unlocked'
}
export function assertPublishableLetters(letters,today=localDay()) {
 const ids=new Set()
 for(const letter of letters){
  if(!letter.id||ids.has(letter.id))throw new Error('Future-letter IDs must be unique and nonempty.')
  ids.add(letter.id)
  const state=letterState(letter,today)
  if(state==='private'||state==='invalid')throw new Error('Do not bundle private, unconfirmed or invalid future letters: '+letter.id)
  if(state==='locked'&&(letter.body||letter.bodyKey))throw new Error('Locked teasers must not bundle a body or body reference: '+letter.id)
 }
}
