import avatar from '../assets/rain-avatar.jpg'
export const profile = {
 nickname: 'Rain', avatar, github: 'https://github.com/RainANDCr', email: 'chengrui3571@gmail.com',
 title: { 'zh-CN': '你好，我是 Rain', en: "Hi, I'm Rain" },
 bio: { 'zh-CN': '我是一名计算机科学与技术专业学生，正在探索编程、人工智能与开源技术。这里记录我的学习过程，也展示我正在构建的项目。', en: 'I study Computer Science and explore programming, AI, and open source. This is where I document what I learn and share what I build.' },
 eyebrow: { 'zh-CN': '欢迎来到我的数字空间', en: 'Welcome to my digital space' },
 note: { 'zh-CN': '持续学习 · 动手实践 · 开放分享', en: 'Keep learning · Build things · Share openly' },
 roles: ['Computer Science Student', 'Developer', 'AI Enthusiast', 'Open Source Explorer'],
 actions: [
 { label: { 'zh-CN': '查看我的项目', en: 'Explore projects' }, to: '/projects' },
 { label: { 'zh-CN': '了解更多', en: 'More about me' }, to: '/#about' }
 ]
}
export const about = {
 interests: [{ 'zh-CN': '人工智能与大语言模型', en: 'AI & large language models' }, { 'zh-CN': 'Java 和 Python 编程', en: 'Java & Python programming' }, { 'zh-CN': 'Web 前端开发', en: 'Web development' }, { 'zh-CN': '开源项目', en: 'Open-source projects' }, { 'zh-CN': '软件工程', en: 'Software engineering' }],
 // 示例经历：仅依据“大二”阶段编写，发布前请按真实经历调整。
 timeline: [
  { date: { 'zh-CN': '大一', en: 'Year 1' }, title: { 'zh-CN': '建立编程基础', en: 'Building programming foundations' }, text: { 'zh-CN': '从课程和练习出发，逐步熟悉编程思维、基础语法与问题拆解。', en: 'Learning programming concepts, basic syntax, and how to break down problems through coursework and practice.' } },
  { date: { 'zh-CN': '大一至大二', en: 'Year 1–2' }, title: { 'zh-CN': '探索不同技术方向', en: 'Exploring technical directions' }, text: { 'zh-CN': '尝试用 Java、Python 和 Web 技术完成小练习，寻找自己感兴趣的方向。', en: 'Trying small exercises with Java, Python, and web technologies to discover areas of interest.' } },
  { date: { 'zh-CN': '大二 · 目前', en: 'Year 2 · Now' }, title: { 'zh-CN': '继续学习与实践', en: 'Continuing to learn and build' }, text: { 'zh-CN': '关注人工智能、前端开发与开源项目，把学到的知识逐步用于实践。', en: 'Exploring AI, frontend development, and open source while putting new knowledge into practice.' } },
 ],
 current: { 'zh-CN': '围绕 Java、Python 和 Web 前端打牢基础，同时了解人工智能与大语言模型的应用，并通过小项目练习把知识串起来。', en: 'Strengthening my foundations in Java, Python, and web development, exploring practical AI and large language model applications, and connecting what I learn through small projects.' },
 goals: { 'zh-CN': '持续完善计算机基础与软件工程能力，完成有实际用途的项目，学习阅读和参与开源项目，并逐步形成稳定的技术写作习惯。', en: 'Keep improving my computer science and software engineering skills, build useful projects, learn to read and contribute to open source, and develop a consistent technical writing habit.' }
}
