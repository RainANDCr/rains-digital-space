export const projectCategories = ['All', 'Web', 'Java', 'Python', 'AI', 'Other']
export const projects = [
 {
  id: 'snake-lab', name: { 'zh-CN': 'Snake Lab 贪吃蛇实验室', en: 'Snake Lab' },
  summary: { 'zh-CN': '集经典贪吃蛇、AI 寻路实验、本地双人对战和地图编辑器于一体的网页游戏。', en: 'A browser snake game with AI pathfinding experiments, local versus play, and a map editor.' },
  description: { 'zh-CN': '使用 React、TypeScript 与 Canvas 实现游戏与算法展示，提供关卡挑战、每日挑战、成就统计和本地存档。AI 实验室可观察寻路过程，地图编辑器支持导入与导出。', en: 'Built with React, TypeScript, and Canvas, with level and daily challenges, achievements, and local saves. The AI lab visualizes pathfinding, while the map editor supports import and export.' },
  cover: '/images/snake-lab-cover.svg', technologies: ['React', 'TypeScript', 'Canvas', 'Vite'], github: 'https://github.com/RainANDCr/snake-lab', demo: 'https://rainandcr.github.io/snake-lab/', category: 'Web',
  status: { 'zh-CN': '源码已公开', en: 'Source available' }, date: '', sample: false
 },
 {
  id: 'studyflow', name: { 'zh-CN': '知行 StudyFlow', en: 'StudyFlow' },
  summary: { 'zh-CN': '本地优先的学习目标管理工具，结合每日任务、打卡、专注计时与学习周报。', en: 'A local-first study planner combining daily targets, check-ins, focus sessions, and weekly reports.' },
  description: { 'zh-CN': '使用 React 与 TypeScript 构建，网页版通过 Dexie / IndexedDB 保存数据，Windows 版使用 Tauri 与 SQLite。支持目标管理、进度记录和 JSON 备份，网页与桌面数据通过导入导出迁移，不会自动同步。', en: 'Built with React and TypeScript. The web app stores data through Dexie / IndexedDB, while the Windows app uses Tauri and SQLite. Goals, progress tracking, and JSON backups are supported; web and desktop data migrate manually through import and export.' },
  cover: '/images/studyflow-cover.svg', technologies: ['React', 'TypeScript', 'Dexie', 'Tauri', 'SQLite'], github: 'https://github.com/RainANDCr/studyflow', demo: 'https://rainandcr.github.io/studyflow/', category: 'Web',
  status: { 'zh-CN': '源码已公开', en: 'Source available' }, date: '', sample: false
 },
 {
  id: 'leafstory', name: { 'zh-CN': '落叶物语', en: 'LeafStory' },
  summary: { 'zh-CN': '以树叶和故事书呈现回忆的双人日记应用，支持纪念日、心愿与时光信件。', en: 'A shared diary that turns memories into leaves and storybooks, with anniversaries, wishes, and time letters.' },
  description: { 'zh-CN': '使用 React、TypeScript 和 Tailwind CSS，支持本地浏览器存储；配置 Supabase 后可使用云端双人同步。提供照片、地点记录、可选的自带密钥 AI 功能，以及数据导出。', en: 'Built with React, TypeScript, and Tailwind CSS, with local browser storage and optional Supabase configuration for cloud sharing. Includes photos, location memories, optional bring-your-own-key AI features, and data export.' },
  cover: '/images/leafstory-cover.svg', technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Capacitor'], github: 'https://github.com/RainANDCr/leafstory', demo: 'https://rainandcr.github.io/leafstory/', category: 'Web',
  status: { 'zh-CN': '源码已公开', en: 'Source available' }, date: '', sample: false
 },
 {
  id: 'datastructure-codex', name: { 'zh-CN': '数据结构实验平台 · Codex 版', en: 'DataStruct Lab · Codex Edition' },
  summary: { 'zh-CN': '将知识讲解、算法逐步动画、代码对照、练习与复习记录整合在一起的学习平台。', en: 'A learning platform combining concepts, step-by-step algorithm animations, code comparison, practice, and review records.' },
  description: { 'zh-CN': '主界面使用 React、TypeScript 与 Vite，提供课程知识体系、算法对比、指针与内存模拟和递归调用栈等实验台。支持 C、C++、Python 教学代码对照、自定义案例与学习记录备份；代码执行和内存地址均为教学模拟。', en: 'The React, TypeScript, and Vite interface offers course concepts, algorithm comparison, pointer and memory simulations, and recursion views. Supports C, C++, and Python reference code, custom cases, and learning-record backups; code execution and memory addresses are educational simulations.' },
  cover: '/images/datastructure-codex-cover.svg', technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS'], github: 'https://github.com/RainANDCr/DataStructure-Lab-codex-version', demo: 'https://rainandcr.github.io/DataStructure-Lab-codex-version/', category: 'Web',
  status: { 'zh-CN': '源码已公开', en: 'Source available' }, date: '', sample: false
 },
 {
  id: 'pingshengshu', name: { 'zh-CN': '平生述', en: 'Pingshengshu · Life Memoir' },
  summary: { 'zh-CN': '本地优先的人生回忆录工具，用时间轴、年龄书架和人物簿整理回忆。', en: 'A local-first memoir app organizing memories with timelines, age-based bookshelves, and a people journal.' },
  description: { 'zh-CN': '以 HTML / JavaScript 网页内核提供记录、足迹、人物、碎片箱与专题合集。数据默认保存在 IndexedDB，支持导出和 WebDAV 备份；AI 润写与故事整理需自备服务商密钥，可选使用。仓库同时提供 Windows 与 Android 版本。', en: 'An HTML / JavaScript core provides memories, locations, people, fragments, and themed collections. Data is stored in IndexedDB with export and WebDAV backup. Optional AI rewriting and story organization require a user-supplied provider key. Windows and Android versions are also available in the repository.' },
  cover: '/images/pingshengshu-cover.svg', technologies: ['JavaScript', 'HTML', 'IndexedDB', 'Electron', 'Capacitor'], github: 'https://github.com/RainANDCr/pingshengshu', demo: 'https://rainandcr.github.io/pingshengshu/', category: 'AI',
  status: { 'zh-CN': '源码已公开', en: 'Source available' }, date: '', sample: false
 },
 {
  id: 'datastruct-lab', name: { 'zh-CN': 'DataStruct Lab 算法可视化', en: 'DataStruct Lab · Algorithm Visualizer' },
  summary: { 'zh-CN': '以真实算法状态驱动动画，覆盖排序、查找、树与图等九章数据结构内容。', en: 'Algorithm-state-driven visualizations covering nine data-structure chapters, including sorting, searching, trees, and graphs.' },
  description: { 'zh-CN': '使用 React、TypeScript、Zustand 和 SVG，提供逐步播放、代码高亮、变量监视与自定义输入。链式结构配有 C/C++ 指针与堆内存教学视图，学习进度保存在本地。此项目与 Codex 版分别维护。', en: 'Built with React, TypeScript, Zustand, and SVG, with step playback, code highlighting, variable inspection, and custom inputs. Linked structures include educational C/C++ pointer and heap views; progress is stored locally. Maintained separately from the Codex edition.' },
  cover: '/images/datastruct-lab-cover.svg', technologies: ['React', 'TypeScript', 'Zustand', 'SVG', 'Vite'], github: 'https://github.com/RainANDCr/datastruct-lab', demo: 'https://rainandcr.github.io/datastruct-lab/', category: 'Web',
  status: { 'zh-CN': '源码已公开', en: 'Source available' }, date: '', sample: false
 },
 {
  id: 'what-to-eat-today', name: { 'zh-CN': '今天吃什么？', en: 'What To Eat Today' },
  summary: { 'zh-CN': '随机美食推荐网站：抽签、幸运大转盘、收藏与美食图鉴，含 400+ 道原神联动美食。', en: 'A random food picker with a lucky wheel, favorites, and a food encyclopedia, including 400+ Genshin Impact collab dishes.' },
  description: { 'zh-CN': 'React 19 + TypeScript + Tailwind CSS 4 构建的纯前端应用：可按时段、预算、口味与形式筛选，支持幸运大转盘、自定义食物、排除清单与 localStorage 持久化；图鉴按拼音首字母分组，附 Vitest 单元测试。已部署上线。', en: 'A pure front-end app built with React 19, TypeScript, and Tailwind CSS 4. Filter by time, budget, taste, and format; spin the lucky wheel, manage custom foods and exclusions, and persist everything with localStorage. The encyclopedia groups foods by pinyin initials, with unit tests via Vitest. Deployed live.' },
  cover: '/images/what-to-eat-cover.svg', technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Vitest'], github: 'https://github.com/RainANDCr/what-to-eat-today', demo: 'https://what-to-eat-today-1gh.pages.dev', category: 'Web',
  status: { 'zh-CN': '已上线', en: 'Live' }, date: '2026-10-14', sample: false
 },
 {
  id: 'game-2048', name: { 'zh-CN': '2048 数字游戏', en: '2048 Game' },
  summary: { 'zh-CN': '原生 HTML/CSS/JS 实现的 2048，支持键盘与触屏，附带 Windows 安装包和 Android APK。', en: 'A 2048 game in vanilla HTML/CSS/JS with keyboard and touch support, plus Windows installers and an Android APK.' },
  description: { 'zh-CN': '零依赖原生实现：方向键/WASD 与滑动操作、合并与出现动画、最高分记录，以及彩蛋复活口令机制；通过 WebView2 壳打包为 Windows 安装版/免安装版与 Android APK，支持离线游玩，已发布在 GitHub Pages。', en: 'A zero-dependency implementation: arrow keys/WASD and swipe input, merge and spawn animations, a high-score record, and a passphrase-based revive easter egg. Packaged via a WebView2 shell into Windows installers and an Android APK with offline play. Published on GitHub Pages.' },
  cover: '/images/2048-cover.svg', technologies: ['JavaScript', 'HTML', 'CSS', 'WebView2'], github: 'https://github.com/RainANDCr/2048', demo: 'https://rainandcr.github.io/2048/', category: 'Web',
  status: { 'zh-CN': '已上线', en: 'Live' }, date: '2026-10-10', sample: false
 },
 {
  id: 'rains-digital-space', name: { 'zh-CN': "Rain's Digital Space 个人网站", en: "Rain's Digital Space" },
  summary: { 'zh-CN': '展示个人资料、公开项目和 Markdown 博客的双语个人网站。', en: 'A bilingual personal website featuring a profile, public projects, and a Markdown blog.' },
  description: { 'zh-CN': '当前网站的源码：React + Vite + JavaScript，支持深浅主题、中英文切换、项目分类、博客搜索、响应式布局与轻量粒子动效，使用 Cloudflare 托管静态资源。', en: 'The source code for this site: React, Vite, and JavaScript, featuring light/dark themes, Chinese/English UI, project filters, blog search, responsive layouts, and lightweight pointer particles, hosted on Cloudflare.' },
  archive: {
   story: { 'zh-CN': '将作品与学习记录放进同一个可维护的个人空间，并逐步用章节、插画和文章串起内容。保留可直接访问的链接，让视觉改版与内容维护互不牵制。', en: 'Bring projects and learning notes into one maintainable personal space, connected through chapters, illustrations, and writing. Stable links keep visual changes independent of content maintenance.' },
   features: [
    { 'zh-CN': 'React Router 管理首页、项目与博客的静态站路由，支持直接访问详情。', en: 'React Router connects the home page, projects, and blog with directly accessible detail URLs.' },
    { 'zh-CN': '通过 i18next 与 CSS 变量提供中英文界面、深浅主题及本地偏好保存。', en: 'i18next and CSS variables provide bilingual UI, light/dark themes, and saved local preferences.' },
    { 'zh-CN': 'Markdown 正文禁用原始 HTML，支持表格、代码高亮与文章组合筛选。', en: 'Markdown disables raw HTML and supports tables, code highlighting, and combined article filters.' },
    { 'zh-CN': '项目使用独立数据文件；所有页面共享响应式布局、键盘焦点与减少动态效果设置。', en: 'Projects live in a dedicated data file; pages share responsive layouts, keyboard focus, and reduced-motion support.' }
   ],
   log: [{ date: '2026-10-28', text: { 'zh-CN': '在本地增量改造雨与星空设计系统、序章首页和章节入口；新增项目搜索、视图切换与档案详情。此记录描述本地开发，不代表已发布到生产环境。', en: 'Locally introduced the rain-and-starlight design system, prologue, and chapter links, followed by project search, view switching, and detail archives. This is a local development record, not a production release.' } }],
   next: { 'zh-CN': '计划按开发手册分阶段完善旅行、摄影与内容关联。真实足迹、设备和个人影像待本人补充确认；这些功能尚未实施。', en: 'The staged roadmap includes travel, photography, and related content. Real locations, hardware, and personal photos still require owner confirmation; these features are not implemented yet.' }
  },
  cover: '/images/portfolio-cover.png', technologies: ['React', 'JavaScript', 'Vite', 'i18next'], github: 'https://github.com/RainANDCr/rains-digital-space', demo: 'https://rains-digital-space.pages.dev', category: 'Web',
  status: { 'zh-CN': '源码已公开', en: 'Source available' }, date: '', sample: false
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
