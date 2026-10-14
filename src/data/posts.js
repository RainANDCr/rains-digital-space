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
]
export function readingMinutes(body) {
 const chinese = (body.match(/[\u3400-\u9fff]/g) || []).length
 const words = body.replace(/[\u3400-\u9fff]/g, ' ').split(/\s+/).filter(Boolean).length
 return Math.max(1, Math.ceil(chinese / 400 + words / 200))
}

