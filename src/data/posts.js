import beijing from '../content/beijing-travel.md?raw'
import xian from '../content/xian-travel.md?raw'
import suzhou from '../content/suzhou-travel.md?raw'
import structures from '../content/cs-data-structures.md?raw'
import languages from '../content/cs-java-python.md?raw'
import ai from '../content/cs-ai-llm.md?raw'
import limits from '../content/calculus-limits.md?raw'
import derivatives from '../content/calculus-derivatives.md?raw'
import systems from '../content/linear-systems.md?raw'
import eigen from '../content/linear-eigenvalues.md?raw'
import review from '../content/freshman-year-review.md?raw'
import photography from '../content/photography-and-memory.md?raw'
import aiPath from '../content/ai-era-path.md?raw'
import examRoadmap from '../content/graduate-exam-roadmap.md?raw'
import beijingNight from '../content/beijing-night-walk.md?raw'
import xianHistory from '../content/xian-daily-history.md?raw'
import suzhouBus from '../content/suzhou-bus-moment.md?raw'
import cRestart from '../content/c-restart-notes.md?raw'
import dataErrors from '../content/data-structure-errors.md?raw'
import englishListening from '../content/english-listening-rebuild.md?raw'
import mathRecovery from '../content/math-recovery-method.md?raw'
import aiWorkflow from '../content/ai-verification-workflow.md?raw'
import readmeEngineering from '../content/readme-as-engineering.md?raw'
import sophomoreRhythm from '../content/sophomore-weekly-rhythm.md?raw'
import educationPessimism from '../content/pessimism-about-education.md?raw'
export const posts = [
 { slug: 'beijing-travel', title: '北京游记：在新旧之间认识一座城', summary: '从城市节奏与个人观察出发的一篇北京城市漫游。', date: '2026-10-13', updated: '2026-10-13', language: 'zh-CN', tags: ["北京","游记"], category: 'Travel', body: beijing },
 { slug: 'xian-travel', title: '西安游记：从历史走进日常', summary: '把古都印象写成个人观察，而不是景点清单。', date: '2026-10-13', updated: '2026-10-13', language: 'zh-CN', tags: ["西安","游记"], category: 'Travel', body: xian },
 { slug: 'suzhou-travel', title: '苏州游记：留一点慢下来的时间', summary: '关于园林、街巷与旅行节奏的游记。', date: '2026-10-13', updated: '2026-10-13', language: 'zh-CN', tags: ["苏州","游记"], category: 'Travel', body: suzhou },
 { slug: 'cs-data-structures', title: '数据结构学习笔记：从数组和链表开始', summary: '整理基本操作、时间复杂度与容易忽略的前提。', date: '2026-10-13', updated: '2026-10-13', language: 'zh-CN', tags: ["数据结构","计算机"], category: 'Computer Science', body: structures },
 { slug: 'cs-java-python', title: 'Java 与 Python 学习心得：用同一个任务比较', summary: '通过词频统计区分算法思路与语言写法。', date: '2026-10-13', updated: '2026-10-13', language: 'zh-CN', tags: ["Java","Python"], category: 'Computer Science', body: languages },
 { slug: 'cs-ai-llm', title: 'AI 与大语言模型学习心得：先验证，再使用', summary: '记录使用模型辅助学习时的核对方法。', date: '2026-10-13', updated: '2026-10-13', language: 'zh-CN', tags: ["AI","大语言模型"], category: 'Computer Science', body: ai },
 { slug: 'calculus-limits', title: '微积分笔记：极限与函数值的区别', summary: '用一个可约分例子理解极限与定义域。', date: '2026-10-13', updated: '2026-10-13', language: 'zh-CN', tags: ["微积分","极限"], category: 'Calculus', body: limits },
 { slug: 'calculus-derivatives', title: '微积分笔记：导数、变化率与单调性', summary: '从导数定义连接切线斜率和函数变化。', date: '2026-10-13', updated: '2026-10-13', language: 'zh-CN', tags: ["微积分","导数"], category: 'Calculus', body: derivatives },
 { slug: 'linear-systems', title: '线性代数笔记：矩阵与线性方程组', summary: '通过消元、主元和自由变量理解解的情况。', date: '2026-10-13', updated: '2026-10-13', language: 'zh-CN', tags: ["线性代数","矩阵"], category: 'Linear Algebra', body: systems },
 { slug: 'linear-eigenvalues', title: '线性代数笔记：特征值与特征向量', summary: '把公式和线性变换中的方向联系起来。', date: '2026-10-13', updated: '2026-10-13', language: 'zh-CN', tags: ["线性代数","特征值"], category: 'Linear Algebra', body: eigen },
 { slug: 'freshman-year-review', title: '大一年度总结：学习、生活与情感', summary: '回顾大一的学习方法、生活节奏，以及对理解与表达的思考。', date: '2026-10-13', updated: '2026-10-13', language: 'zh-CN', tags: ["年度总结","大一"], category: 'Reflection', body: review }
 ,{ slug: 'photography-and-memory', title: '只拍风景和别人，也能留下自己的坐标', summary: '关于不拍自己时，如何通过风景、他人和文字记住旅行。', date: '2026-10-29', updated: '2026-10-29', language: 'zh-CN', tags: ["摄影","记忆"], category: 'Travel', body: photography }
 ,{ slug: 'ai-era-path', title: 'AI 时代，普通计算机学生如何找到自己的路', summary: '从重建基础、核对模型输出和完成小项目谈现实选择。', date: '2026-10-29', updated: '2026-10-29', language: 'zh-CN', tags: ["AI","学习规划","计算机"], category: 'Computer Science', body: aiPath }
 ,{ slug: 'graduate-exam-roadmap', title: '从二本计算机学生到考研准备：一条可执行的路线', summary: '把不挂科、补基础、英语和考研目标放进同一套节奏。', date: '2026-10-29', updated: '2026-10-29', language: 'zh-CN', tags: ["考研","学习规划","计算机"], category: 'Reflection', body: examRoadmap }
 ,{ slug: 'beijing-night-walk', title: '北京夜行：在热闹之后听见城市', summary: '从夜晚街道、旧与新和不确定的路线观察北京。', date: '2026-10-29', updated: '2026-10-29', language: 'zh-CN', tags: ["北京","城市观察"], category: 'Travel', body: beijingNight }
 ,{ slug: 'xian-daily-history', title: '西安：历史不是远处的背景', summary: '把古城历史放回街道、人和日常生活中理解。', date: '2026-10-29', updated: '2026-10-29', language: 'zh-CN', tags: ["西安","历史","游记"], category: 'Travel', body: xianHistory }
 ,{ slug: 'suzhou-bus-moment', title: '苏州公交车会等你坐好再开', summary: '从一个公交车瞬间记录苏州城市生活的温度。', date: '2026-10-29', updated: '2026-10-29', language: 'zh-CN', tags: ["苏州","观察"], category: 'Travel', body: suzhouBus }
 ,{ slug: 'c-restart-notes', title: '重新学习 C 语言：从能运行到能解释', summary: '用数据流、错误记录和小程序重新搭起 C 语言基础。', date: '2026-10-29', updated: '2026-10-29', language: 'zh-CN', tags: ["C语言","基础"], category: 'Computer Science', body: cRestart }
 ,{ slug: 'data-structure-errors', title: '数据结构复习：把会背变成会判断', summary: '从操作约束和复杂度条件重新理解常见数据结构。', date: '2026-10-29', updated: '2026-10-29', language: 'zh-CN', tags: ["数据结构","复习"], category: 'Computer Science', body: dataErrors }
 ,{ slug: 'english-listening-rebuild', title: '六级之后重新练听力：把听见变成理解', summary: '用短材料、复述和专业阅读重建英语听力习惯。', date: '2026-10-29', updated: '2026-10-29', language: 'zh-CN', tags: ["英语","六级","学习规划"], category: 'Reflection', body: englishListening }
 ,{ slug: 'math-recovery-method', title: '数学基础忘了以后，怎样重新开始', summary: '从概念、条件和完整推导开始恢复高数与线代基础。', date: '2026-10-29', updated: '2026-10-29', language: 'zh-CN', tags: ["高等数学","线性代数","复习"], category: 'Calculus', body: mathRecovery }
 ,{ slug: 'ai-verification-workflow', title: '使用大语言模型学习：我的核对工作流', summary: '记录提问、运行、查文档和验证模型回答的学习方法。', date: '2026-10-29', updated: '2026-10-29', language: 'zh-CN', tags: ["AI","大语言模型","方法"], category: 'Computer Science', body: aiWorkflow }
 ,{ slug: 'readme-as-engineering', title: '一个 README 能说明多少软件工程', summary: '从启动、复现和限制说明理解文档的工程价值。', date: '2026-10-29', updated: '2026-10-29', language: 'zh-CN', tags: ["软件工程","README","项目"], category: 'Computer Science', body: readmeEngineering }
 ,{ slug: 'sophomore-weekly-rhythm', title: '大二的每周节奏：让目标落到普通日子里', summary: '把课程、基础复习、英语和项目安排进可持续的一周。', date: '2026-10-29', updated: '2026-10-29', language: 'zh-CN', tags: ["大二","学习规划"], category: 'Reflection', body: sophomoreRhythm }
 ,{ slug: 'pessimism-about-education', title: '我为什么对二本计算机教育感到悲观', summary: '从课程、基础、AI 和考研目标出发，记录我对二本计算机教育的现实判断。', date: '2026-10-29', updated: '2026-10-29', language: 'zh-CN', tags: ["二本教育","计算机教育","考研","个人观察"], category: 'Reflection', body: educationPessimism }
]
export function readingMinutes(body) {
 const chinese = (body.match(/[\u3400-\u9fff]/g) || []).length
 const words = body.replace(/[\u3400-\u9fff]/g, ' ').split(/\s+/).filter(Boolean).length
 return Math.max(1, Math.ceil(chinese / 400 + words / 200))
}

