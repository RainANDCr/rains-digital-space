export const skillCategories = [{ id: 'languages', label: { 'zh-CN': '编程语言', en: 'Languages' } }, { id: 'web', label: { 'zh-CN': 'Web 开发', en: 'Web development' } }, { id: 'tools', label: { 'zh-CN': 'AI 与开发工具', en: 'AI & developer tools' } }]
export const skills = [
 ...['Java', 'Python', 'JavaScript'].map(name => ({ name, category: 'languages', status: 'learning' })),
 ...['HTML', 'CSS', 'React', 'Vite'].map(name => ({ name, category: 'web', status: 'learning' })),
 ...['ChatGPT', 'Codex', 'GitHub', 'Git'].map(name => ({ name, category: 'tools', status: 'learning' }))
]
