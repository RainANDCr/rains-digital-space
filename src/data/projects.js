export const projectCategories = ['All', 'Web', 'Java', 'Python', 'AI', 'Other']
export const projects = [
 {
  id: 'what-to-eat-today', name: { 'zh-CN': '今天吃什么？', en: 'What To Eat Today' },
  summary: { 'zh-CN': '随机美食推荐网站：抽签、幸运大转盘、收藏与美食图鉴，含 400+ 道原神联动美食。', en: 'A random food picker with a lucky wheel, favorites, and a food encyclopedia, including 400+ Genshin Impact collab dishes.' },
  description: { 'zh-CN': 'React 19 + TypeScript + Tailwind CSS 4 构建的纯前端应用：可按时段、预算、口味与形式筛选，支持幸运大转盘、自定义食物、排除清单与 localStorage 持久化；图鉴按拼音首字母分组，附 Vitest 单元测试。已部署上线。', en: 'A pure front-end app built with React 19, TypeScript, and Tailwind CSS 4. Filter by time, budget, taste, and format; spin the lucky wheel, manage custom foods and exclusions, and persist everything with localStorage. The encyclopedia groups foods by pinyin initials, with unit tests via Vitest. Deployed live.' },
  cover: '/images/what-to-eat-cover.png', technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Vitest'], github: 'https://github.com/RainANDCr/what-to-eat-today', demo: 'https://what-to-eat-today-1gh.pages.dev', category: 'Web',
  status: { 'zh-CN': '已上线', en: 'Live' }, date: '2026-10-14', sample: false
 },
 {
  id: 'game-2048', name: { 'zh-CN': '2048 数字游戏', en: '2048 Game' },
  summary: { 'zh-CN': '原生 HTML/CSS/JS 实现的 2048，支持键盘与触屏，附带 Windows 安装包和 Android APK。', en: 'A 2048 game in vanilla HTML/CSS/JS with keyboard and touch support, plus Windows installers and an Android APK.' },
  description: { 'zh-CN': '零依赖原生实现：方向键/WASD 与滑动操作、合并与出现动画、最高分记录，以及彩蛋复活口令机制；通过 WebView2 壳打包为 Windows 安装版/免安装版与 Android APK，支持离线游玩，已发布在 GitHub Pages。', en: 'A zero-dependency implementation: arrow keys/WASD and swipe input, merge and spawn animations, a high-score record, and a passphrase-based revive easter egg. Packaged via a WebView2 shell into Windows installers and an Android APK with offline play. Published on GitHub Pages.' },
  cover: '/images/2048-cover.png', technologies: ['JavaScript', 'HTML', 'CSS', 'WebView2'], github: 'https://github.com/RainANDCr/2048', demo: 'https://rainandcr.github.io/2048/', category: 'Web',
  status: { 'zh-CN': '已上线', en: 'Live' }, date: '2026-10-10', sample: false
 },
 {
  id: 'example-portfolio', name: { 'zh-CN': '个人作品集网站', en: 'Portfolio website' },
  summary: { 'zh-CN': '展示个人介绍、技术兴趣与项目的响应式网站构想。', en: 'A responsive site concept for an introduction, interests, and projects.' },
  description: { 'zh-CN': '可作为练习 React 组件、路由与响应式布局的项目构想；此卡片不代表已完成作品。', en: 'A project idea for practicing React components, routing, and responsive layout. This card does not represent completed work.' },
  cover: '/images/portfolio-cover.png', technologies: ['React', 'Vite', 'CSS'], github: '', demo: '', category: 'Web',
  status: { 'zh-CN': '项目构想', en: 'Project idea' }, date: '', sample: true
 },
 {
  id: 'example-study-planner', name: { 'zh-CN': '学习计划管理器', en: 'Study planner' },
  summary: { 'zh-CN': '用命令行记录学习任务与完成情况的 Java 小项目构想。', en: 'A Java command-line project idea for tracking study tasks and progress.' },
  description: { 'zh-CN': '可练习面向对象设计、集合与文件读写；功能与仓库尚未实现。', en: 'An idea for practicing object-oriented design, collections, and file I/O. The app and repository have not been built.' },
  cover: '/images/study-planner-cover.png', technologies: ['Java'], github: '', demo: '', category: 'Java',
  status: { 'zh-CN': '项目构想', en: 'Project idea' }, date: '', sample: true
 },
 {
  id: 'example-notes-tool', name: { 'zh-CN': '笔记整理工具', en: 'Notes organizer' },
  summary: { 'zh-CN': '按关键词整理本地学习笔记的 Python 脚本构想。', en: 'A Python script idea for organizing local study notes by keyword.' },
  description: { 'zh-CN': '可练习文本处理、文件操作与简单搜索；此条目仅用于展示项目布局。', en: 'An idea for practicing text processing, file operations, and simple search. This entry only demonstrates the project layout.' },
  cover: '/images/notes-organizer-cover.png', technologies: ['Python'], github: '', demo: '', category: 'Python',
  status: { 'zh-CN': '项目构想', en: 'Project idea' }, date: '', sample: true
 }
]
