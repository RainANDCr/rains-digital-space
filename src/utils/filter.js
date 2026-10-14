export function filterPosts(posts, { query = '', tag = '', category = '' }) {
 const term = query.trim().toLocaleLowerCase()
 return posts.filter(post => (!category || post.category === category) && (!tag || post.tags.includes(tag)) && [post.title, post.summary, ...post.tags].join(' ').toLocaleLowerCase().includes(term))
}
export const filterProjects = (projects, category) => projects.filter(project => category === 'All' || project.category === category)
export function safeExternal(url) {
 try { const parsed = new URL(url); return ['https:', 'http:'].includes(parsed.protocol) ? parsed.href : null } catch { return null }
}
