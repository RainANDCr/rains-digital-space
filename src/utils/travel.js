export function publicJourneys(entries) {
 return entries.filter(entry => entry.visibility === 'public' && entry.confirmed === true)
}
export function cityKey(entry) {
 return typeof entry.city === 'string' ? entry.city : entry.city?.['zh-CN'] || entry.city?.en || ''
}
export function filterJourneys(entries, { year = '', city = '', tag = '' } = {}) {
 return publicJourneys(entries).filter(entry => (!year || entry.visitDate?.slice(0, 4) === year) &&
  (!city || cityKey(entry) === city) && (!tag || entry.tags?.includes(tag)))
}
export function mapPosition(coordinates) {
 const { lat, lng } = coordinates || {}
 if (!Number.isFinite(lat) || !Number.isFinite(lng) || Math.abs(lat) > 90 || Math.abs(lng) > 180) return null
 return { x: (lng + 180) / 360 * 100, y: (90 - lat) / 180 * 100 }
}
