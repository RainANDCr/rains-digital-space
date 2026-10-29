export function filterPosts(posts, { query = '', tag = '', category = '' }) {
 const term = query.trim().toLocaleLowerCase()
 return posts.filter(post => (!category || post.category === category) && (!tag || post.tags.includes(tag)) && [post.title, post.summary, ...post.tags].join(' ').toLocaleLowerCase().includes(term))
}
export function filterProjects(projects, category = 'All', { query = '', technology = '' } = {}) {
 const term = query.trim().toLocaleLowerCase()
 return projects.filter(project => (category === 'All' || project.category === category) &&
  (!technology || project.technologies?.includes(technology)) &&
  [project.name, project.summary, project.description].flatMap(value => typeof value === 'string' ? value : Object.values(value || {}))
   .concat(project.technologies || []).join(' ').toLocaleLowerCase().includes(term))
}
export function safeExternal(url) {
 try { const parsed = new URL(url); return ['https:', 'http:'].includes(parsed.protocol) ? parsed.href : null } catch { return null }
}
