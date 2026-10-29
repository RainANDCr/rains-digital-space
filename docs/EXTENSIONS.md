# 扩展功能：维护与验收

## 路由与数据来源

| 功能 | 入口 | 数据及实现 |
|---|---|---|
| 万象图书馆 | /nexus | useContentNodes + utils/nexus；网格、时间轴、关系图，关键词/类型/标签组合筛选 |
| 世界之镜 | 顶栏按钮、/mirror | 原 PreferencesProvider 的 poetic / terminal；terminal 对应文档中的 digital，不创建第三套模式 |
| 旅人护照 | /passport | 原 spaceInteractionProgress 的 stamps；本地日期、PNG 导出、确认清空 |
| 旅程规划师 | /planner | data/extensions 的 tourRoutes；开始/继续/上一站/下一站/跳过/结束、收藏及完成记录 |
| 创造实验室 | /lab、/lab/:id | 用项目 ID 引用原 projects 中的介绍、技术栈、源码与演示；三项真实公开项目 |
| 虚拟装机工坊 | /workshop | 通用部件职责、点击/拖拽装配及顺序教学；不伪造个人配置和装机经历 |
| 限时主题展览 | /exhibitions、/exhibitions/:id | 按稳定内容 ID 引用原文与原项目；正在/往期/即将开始，日期采用 UTC 日界线 |
| 创作幕后 | /making-of、/making-of/:id | 可选 project.makingOf + 原 archive.log；没有资料的阶段明确显示暂无记录 |
| 人生物件博物馆 | /museum、/museum/:id | artifacts 中明确同意公开的物件；当前空列表，支持关键词、类型、年代筛选与关联 |
| 随身档案馆 | /pocket | opt-in PWA；详见 POCKET_ARCHIVE.md |
| 沉浸式/轻量模式 | /settings | 原偏好 key 扩展 experience，不清空主题、语言或界面模式 |

所有新入口集中在 `/explore` 的“继续探索”。原来的八个章节、旧 URL、文章与项目详情保留。项目详情新增幕后入口。现有全站搜索也使用共享内容索引，并保留原类别过滤。

## 内容节点协议

节点来自既有来源的适配，字段为 id、type、title、summary、可选 cover/time/language、tags、relatedIds、link、worldViewHints。ID 使用 `article:<slug>`、`project:<id>`、`memory:<id>` 等类型前缀。

数据不是第二份内容库：文章继续在 content/*.md 与 posts.js，项目继续在 projects.js，记录在 spaces.js，城市/照片在确认公开的 journeys。关联依据明确的 relatedIds 或共同标签，不推断真实人生关联。界面切换只改变视觉，不导航、不重置查询、表单和图片状态。

关系图适合当前个人内容规模，使用普通按钮与 SVG 连线；小屏退为列表，轻量模式退为静态网格。时间轴缺日期时显示“日期未提供”，不补造年代。

## 新增一条公开物件

在 src/data/extensions.js 的 artifacts 中添加本人同意公开的条目，例如下列**结构模板**，不是站主事实：

```js
{
 id: 'replace-with-stable-id',
 name: { 'zh-CN': '请填写真实物件名称', en: 'Provide the real object name' },
 era: '请填写可公开的年代',
 category: 'book', tags: ['reading'],
 cover: '', coverAlt: { 'zh-CN': '', en: '' },
 story: { 'zh-CN': '请填写本人确认公开的故事', en: 'An optional owner-approved English version' },
 relatedContentIds: ['article:cs-data-structures'],
 visibility: 'public', confirmed: true,
}
```

不要把私人故事先填进客户端文件再依赖 visibility 隐藏。新增构建检查会拒绝私密或未确认物件；私人内容应保存在项目公开源之外。图库、信件继续遵守原公开检查。

## 项目幕后与展览

- 在对应 project 中可添加 makingOf 数组，条目为 `{id,stage,title,date?,text,image?,imageAlt?,visibility:'public'}`。stage 为 idea/sketch/prototype/iteration/final。双语 title/text 使用原项目对象形式。无记录就保持空白，不把项目现状冒充开发历程。原日志继续独立展示，不重复复制。
- 展览配置包含 id、titleKey、summaryKey、curatorNoteKey、theme、startDate、endDate、visibility:'public'、itemIds。双语文本加在 locales/extensions.js，日期必须有效且有序。当前“从学习到创造”是本轮策划的线上内容索引，不是假造历史线下活动。
- labProjectIds 引用已有项目 ID。新增演示前核对现有 demo/source 地址。演示只有用户点击才创建 iframe，关闭或离开页面即卸载。sandbox 不允许弹窗、顶层导航、下载或表单；外部应用若不支持嵌入，使用旁边的 Demo 新窗口链接。全站开关只控制本站外壳，第三方演示自行管理其动效，可关闭演示停止运行。没有现场验证所有远程项目可用性。

## 存储与回滚

- `spacePreferences` version:2 继续原 key，新增 experience。首次根据系统减少动态设置推断 lite，用户可以手动选 immersive；系统减少动态仍优先禁止非必要动画。
- `spaceInteractionProgress` version:1 向后兼容旧章节/向导记录，新增 stamps、favorites、completedRoutes、tour；输入经过路径/ID/类型校验，不上传。导览和印章记录本地公开页面探索，不记录身份或输入内容。
- 重置向导不清空护照；清空护照需要页面内确认，不删除主题/语言或路线收藏。存储被浏览器禁止时使用内存状态，刷新后不保证保留。
- 回滚体验功能只撤销本批扩展页面/组件/路由/样式和存储字段读取，不要清空用户浏览器或硬重置旧开发成果。PWA 回滚需同时处理旧 worker，见离线文档。

## 体验模式影响范围

| 组件 | 沉浸式 | 轻量模式 |
|---|---|---|
| 原雨幕、粒子、视差、打字 | 仍尊重动效等级、系统偏好、后台暂停 | 关闭装饰背景和非必要动画，打字静态显示 |
| 世界之镜 | 原地切换现有视觉系统 | 原地立即切换，内容相同 |
| 图书馆 | 可用 SVG 关系图 | 静态列表/网格，关联详情完整 |
| 列车、书桌 | 插画分区及真实导航 | 保留列车文字入口，书桌改链接网格 |
| 护照、展览、实验室、装机、幕后、物件馆 | 主题卡片与可选封面 | 关闭非必要封面，保留全部操作 |
| 导览/PWA | 功能完整 | 功能完整；音频始终不自动播放 |

新模块没有额外音源、后台、账号或追踪。仍使用已有生成插画；本轮文档中的新封面/小图未批量生成，没有虚构图片地址。

## 验收入口

1. `/settings` 切换体验模式、界面模式、主题与语言，然后刷新。
2. `/nexus` 搜索 PYTHON，过滤文章和标签，再切换世界与视图；无结果可重置。
3. `/planner` 开始路线，前进/返回/跳过/结束，刷新后继续，收藏路线。
4. `/passport` 检查新增印章，重复访问不重复盖章；下载 PNG 并实际打开。
5. `/workshop` 教学模式尝试跳步，再按顺序装配；键盘按钮与拖放皆可用。它不校验真实插槽、尺寸、功率或电气安全。
6. `/exhibitions/learning-and-making` 打开展品原文；`/making-of/rains-digital-space` 只显示已有真实开发日志；`/museum` 当前明确空馆。
7. `/pocket` 在生产预览 4176 保存内容，再断网打开精选文章和未缓存页面，最后清除缓存。

自动化使用 npm.cmd test；生产专项设置 PRODUCTION_QA=1，需同时运行开发服务 4175 和最终 dist 预览 4176。没有 lint/typecheck 脚本；本轮不发布。

## 最终检查记录（2026-10-29）

- 完整套件：50 passed（4.3 分钟），包含生产预览专项，无跳过。
- 关系图文字和构建公开内容校验完善后：扩展功能、既有插画响应式及生产专项共 15 passed（55.4 秒）。
- 最终 npm.cmd run build 成功，598 个模块，worker 生成成功；没有增加运行依赖。主入口约 366.25KB，CSS 51.46KB；新页面分别按需加载。
- 实际验证本地 PNG 导出、路线完成、向导重置保留护照、外部演示按需加载/关闭、装机键盘顺序、无内容/无效 ID、双语言/双世界/两种体验模式以及 320–1440px 布局。
- 实际断网后读取 Markdown 正文，未精选页面回退，清除缓存后正文不再从档案缓存返回。未执行真机安装、生产域名跨版本更新、Firefox/Safari 或长期性能验收；远程演示测试使用受控页面，不声称远程服务始终在线。
- 截图在 output/previews/extensions，记录的是本地测试浏览器状态。未提交、推送或部署。
