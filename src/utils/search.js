export function searchRecords(records, query = '', kind = '') {
 const term=query.trim().toLocaleLowerCase()
 return records.filter(record=>(!kind||record.kind===kind)&&record.text.toLocaleLowerCase().includes(term))
}
