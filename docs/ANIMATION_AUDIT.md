# 新旧动画去重报告 · 2026-10-29

本报告以实际组件、样式和调用点为依据。初次完成阶段 01；继续执行后已接入 02–05、07–10。06 缺少原有窗口管理器，保持未实施。不增加依赖、AI、业务页面，也不推送。下方去重表保留实施前审查结论。

## 已有系统边界

| 系统 | 判定 | 代码证据及处理 |
| --- | --- | --- |
| 动态雨幕 | 已有完全相同效果，跳过 | interactions.css 的 gentle-rain；复用 PreferencesProvider |
| 昼夜 / 四季 | 已有类似效果，需要整合 | PreferencesProvider、sceneForHour 有 dawn/day/dusk/night；未找到四季状态，本轮不补建 |
| 鼠标卡片悬浮 | 已有完全相同效果，跳过 | useCardMotion；不再实现卡片倾斜 |
| 多层视差 | 已有完全相同效果，跳过 | ParallaxScene；不新建滚动引擎 |
| 视觉小说章节 | 已有类似效果，需要整合 | Guide、章节锚点、page-enter；章节旁白已移除，不恢复 |
| 时光列车 | 已有类似效果，需要整合 | Home 列车封面和站点导航；未找到独立镜头转场，本轮不补建 |
| 胶片显影 | 已有类似效果，需要整合 | film-frame、SceneImage 淡入、PhotoGallery；未找到独立显影播放器，本轮不补建 |
| 双世界 | 已有完全相同效果，跳过 | WorldMirror + mode poetic/terminal |
| 沉浸式 / 轻量 | 已有完全相同效果，跳过 | ExperienceSwitch、PreferencesProvider、extensions.css |

## 新阶段差异及顺序

| 阶段 | 判定 | 现有能力 / 后续整合边界 |
| --- | --- | --- |
| 01 字形聚合 | 可以新增 | useTypewriter 只做职业打字，通用 reveal 只做淡入；新增 KineticTypography，复用 motionAllowed 和世界状态 |
| 02 共享元素镜头 | 已有类似效果，需要整合 | PhotoGallery 原生 dialog 已处理关闭、切图、返回焦点；未来在该调用处增强，保留路由和灯箱 |
| 03 场景静物 | 尚未实现 | DeskNavigation 是单张合成图和热点；先准备可对齐的独立前景层，不能整体平移代替静物 |
| 04 相机光圈 | 可以新增 | 没有光圈；未来只接摄影入口，需和实际显影播放状态互斥 |
| 05 关系线生长 | 已有类似效果，需要整合 | Learning SVG 路径、Nexus SVG 连线及选中高亮已存在；只增强真实关系线的绘制 |
| 06 RainOS 磁吸 | 尚未实现 | cover-rainos 是配图，未找到 OS 窗口管理器；Workshop 的零件拖放不是窗口。缺少前置系统，暂缓 |
| 07 年份滚轮 | 可以新增 | Archive 有真实年份筛选及日期；只增强显示，不改年份数据 |
| 08 手账拼贴 | 已有类似效果，需要整合 | 现有图片、标签、通用淡入可复用；后续只对装饰落位，不移动正文 |
| 09 电路点亮 | 可以新增 | Hardware 静态示意、Workshop 装机步骤；后续只表达实际选中步骤，不生成虚假技术参数 |
| 10 纸角折叠 | 可以新增 | FutureLetters、目录和书签已有原生控件；后续只加局部视觉，不替换交互 |

## 阶段 01 实施记录

### 方案与范围

- 使用 React + CSS，一层真实标题加一次性、aria-hidden 的装饰字形。选择此方案以保持文本选择、无障碍名称和 DOM 中的真实文字；不引入 canvas 或逐帧改写标题。
- 表世界：墨迹模糊、位移收拢；里世界：0/1 碎片和分步字形收拢。文字、字体、颜色都沿用现有 token。
- ExtensionHeading 和 SpaceHeading 接入；首页复杂排版、职业打字、卡片标题保持现有实现。
- 每次组件挂载首次进入视野播放一次，滚动返回、切换语言或世界不重播；重新进入路由会产生新挂载，可再播放。
- 含新标题的页面取消原 page-enter 动画，避免同一进入动作叠加两套主动画。其他页面保持现有转场。
- 单次最长 1 秒；最多 64 个字形。长标题、换行标题、缺少 IntersectionObserver、轻量模式及减少动态效果直接显示原文。
- 开始后关闭动效、隐藏页面或切换世界/语言会立即静态收尾。Observer 触发后及卸载时断开；CSS 动画结束后移除装饰 DOM。没有新增全局事件监听、计时器或 RAF。

### 文件和回滚

- 新增 `src/components/KineticTypography.jsx`、`src/styles/kinetic.css`、`tests/kinetic.spec.js`。
- 修改 `src/components/ExtensionHeading.jsx`、`src/components/SpaceHeading.jsx` 的 h1 调用。
- 独立撤销：在上述两个调用文件删除 KineticTypography import，把 KineticTypography 开闭标签改回 h1，再删除三个新增文件；不使用全仓库 reset（当前有其他未提交工作）。本报告可保留。

### 性能及限制

- 没有新增依赖、图片或持续播放循环；每标题至多一个短期观察器、64 个短期字形节点。只在标题进入视野时创建字形。
- CSS 使用 transform/opacity；墨迹额外包含局部 3px blur，移动端减小位移。不声称已完成低端真机帧率测试。
- 装饰字形逐字排版与英文连字字距可能略有差异；多行直接静态，避免错位。真实标题排版始终由原文决定，不制造布局占位变化。
- 无 JavaScript 预渲染仍沿用项目原有 Vite SPA 方式；本组件保留 DOM 文字，不新增服务端渲染能力。

### 手动验收

1. 系统允许动画、设置沉浸式后进入 `/nexus`，观察墨迹收拢；等待完成，滚动返回不重播。
2. 切里世界后重新访问该路由，观察数字碎片；标题应仍可选中复制，屏幕阅读器只读一次完整标题。
3. 播放中切换世界、语言、减少动态效果或快速离开页面，确认直接静态结束且无残留。
4. 在轻量模式及系统减少动态效果下访问 `/nexus`、`/archive`，应直接显示完整文字。
5. 在 375/768/1024/1440px 下检查两世界和深浅色；键盘操作原导航、搜索及筛选不变。

### 验证结果

- `node node_modules/@playwright/test/cli.js test tests/kinetic.spec.js`：最终 **8/8 通过**，19.0 秒。包含两世界、一次触发、真实文字复制和可访问名称、播放中减少动态效果、播放中路由离开、观察器缺失、轻量模式、多行降级、视野外等待和四档宽度的深浅主题。
- `node node_modules/@playwright/test/cli.js test tests/kinetic.spec.js tests/interactions.spec.js tests/visuals.spec.js`：补充视野等待测试前 **19/19 通过**，52.5 秒；其中原有交互 8 项和图片/响应式 4 项全部通过。随后仅更新测试，重跑字形 8 项通过，产品代码保持不变。
- `npm.cmd run build`：成功，600 modules。新组件产物 JS 1.33 kB / gzip 0.75 kB，CSS 1.81 kB / gzip 0.60 kB；这些是产物大小，不是首屏耗时或帧率测量。
- 本地浏览器确认 `/nexus` 手机视图的标题、封面和筛选布局。静态结束态截图：`output/previews/kinetic-stage01.png`；截图不能证明完整动画流畅度。
- 未运行全站全部测试；未做真实低端设备、Safari/Firefox、屏幕阅读器语音实测。没有提交、推送或部署。

## 后续阶段实施记录

| 阶段 | 结果及修改文件 | 性能影响 | 手动验收与已知限制 |
| --- | --- | --- | --- |
| 02 | PhotoGallery.jsx、travel.css：原生 View Transition 连接缩略图与 dialog；关闭返回当前图片缩略图，焦点回到打开按钮 | 单次原生快照过渡；无图片下载和新增依赖 | 在本地 animations 测试页打开、左右切换、Escape、快速关闭/重开；图片 contain 保持内容比例。无 API 时普通淡入；公开图库目前为空，不添加虚构个人照片 |
| 03 | SceneStillLife.jsx、still-life.css、DeskNavigation.jsx、useVisibleMotion.js：独立 SVG 时钟、台灯层 | 仅可见时运行两条指针 transform 与灯光 opacity；滚出视野或关闭动效即停止 | `/explore` 数字书桌右上角新增原创矢量静物面板。不是对原合成图中物体的分层重建，不平移整张插画；时钟为装饰，不提供准确时间 |
| 04 | ApertureTransition.jsx、PhotoGallery.jsx：仅切图时光圈和聚焦 | 一次短期 WAAPI clip-path/blur，取消及卸载销毁 | 相册中左右切换；打开用共享元素，切图用光圈；共享过渡或祖先 data-film-developing=true 时禁止光圈。当前未发现独立显影播放器，后续接入者需遵守该互斥标记 |
| 05 | RelationLines.jsx、relations.css、Nexus.jsx、Learning.jsx：现有 SVG 线绘制 | 连接超过 120 条静态降级；一次观察器触发后断开；无逐帧 JS | `/nexus?view=graph` 点击节点，关系高亮及数据不变；`/learning` 查看既有示意线。动画关闭立即完整显示；没有新建关系数据或推断关系 |
| 06 | **未实施：缺少前置系统** | 无 | 仓库只有 RainOS 图片，没有窗口管理、边界、焦点、最小化/最大化状态。为满足“不增加业务板块、增强已有管理器”的约束，不新建一套 OS，也不把装机拖放冒充窗口磁吸 |
| 07 | YearRoller.jsx、year-roller.css、Archive.jsx：机械 / 数字两种当前年份入位 | CSS 短动画，无计时器；快速切换由 React key 替换装饰 | `/archive` 年份选择 2026 / 全部 / 2026；真实年份始终显示，装饰层只包含当前数字，不滚过错误年份；公开数据只有一个精确年份，不编造其他年份 |
| 08 | CollageDecoration.jsx、collage.css、PhotoGallery.jsx、BlogDetail.jsx：胶带与相片一次落位 | 复用可见性 hook，transform/opacity；移动端取消照片位移 | 文章顶部标签胶带、相册缩略图进入视野；正文与标签文字不位移，图片预留尺寸。只增强已有内容，未添加虚构手账或贴纸数据 |
| 09 | CircuitSignal.jsx、circuit.css、Workshop.jsx、locales/extensions.js：当前教学部件信号描绘 | 6 个 SVG 节点，只有一个选中信号短动画；不可见或关闭动画即静态 | `/workshop` 选部件、安装、取下、重置；高亮反映 active/installed 状态。图注明不是实际布线、通电或性能数据，不模拟硬件参数 |
| 10 | paper-corner.css、FutureLetters.jsx、BlogDetail.jsx、Planner.jsx：原控件局部纸角 | 仅一个 CSS 伪元素，短 transform；触屏及减少动态效果取消过渡 | `/planner` 键盘收藏；博客目录 Enter 展开；`/archive` 信件演示展开。保留原生按钮和 details 行为，没有整页翻书 |

### 分阶段验证

- 02：原旅行灯箱交互测试 1 项通过，构建成功；后续新增原生/降级与快速取消检查。
- 03：可见/不可见、减少动态效果测试通过，构建成功。
- 04：切图光圈及关闭动效取消测试通过，构建成功。
- 05：原关系数量、选中高亮、静态降级测试通过，构建成功。首次测试读取早于懒加载完成，已改为先等待 SVG 挂载。
- 06：无代码改动，无可运行窗口验收，不标记完成。
- 07：快速年份切换、无错误年份和减少动态效果测试通过，构建成功。
- 08：正文无动画、装饰静态降级测试通过，构建成功。
- 09：选中/安装/重置状态测试通过，构建成功。
- 10：键盘书签与目录测试已纳入整体回归，构建成功；测试使用稳定的卡片按钮定位，避免收藏名称变化后选中下一张卡片。
- 整体回归还发现影院测试夹具缺少阶段 01 标题所需 PreferencesProvider，已将该夹具与实际应用一致地包在 Provider 中；不修改生产页面数据。

### 单独撤销说明

每个阶段修改前的调用文件副本位于 `output/animation-rollbacks/NN/`，仅供本地对照，不发布到 dist，且已在 .gitignore 中排除。**同一文件被后续阶段修改后，不要整文件覆盖副本**；按下面的单阶段步骤撤销，保留其他阶段。

| 阶段 | 独立撤销步骤 |
| --- | --- |
| 02 | 仅在 PhotoGallery 删除 change 的 View Transition 分支，直接同步执行 update；去掉缩略图及大图 viewTransitionName 和 travel.css 的 ::view-transition 规则。保留 ApertureTransition、CollageDecoration、dialog 和焦点处理 |
| 03 | DeskNavigation 移除 SceneStillLife 调用和 import，删除 SceneStillLife.jsx、still-life.css；useVisibleMotion 已被后续阶段复用，保留 |
| 04 | 在 PhotoGallery 去掉 ApertureTransition 包裹，保留其中 Photo 图片；移除 import 和组件文件。共享元素与拼贴仍可独立运行 |
| 05 | 两个页面的 RelationLines 标签改回 svg，移除组件 import；可保留 pathLength=1（不改变静态图形），删除 RelationLines.jsx、relations.css |
| 07 | Archive 删除 YearRoller 调用和 import，删除 YearRoller.jsx、year-roller.css；原年份筛选不变 |
| 08 | BlogDetail 和 PhotoGallery 的 CollageDecoration 改回 div 并保留原 className；去掉 images 属性/import，再删除组件及 collage.css |
| 09 | Workshop 删除 CircuitSignal 调用/import，删除组件及 circuit.css；仅移除 locales 中 circuitHint 键，保留装机状态逻辑 |
| 10 | 三个调用文件删除 paper-corner class 与 CSS import，保留 Button 原有 button secondary 类和所有回调，再删除 paper-corner.css |

新增测试：`tests/animation-expansion.spec.js`；隔离相册测试页 `tests/fixtures/animations.html` / `.jsx` 不被 Vite 生产入口引用，不进入 dist。撤销某阶段时同步移除对应编号测试，其他阶段测试保留。

### 最终验收状态

- 新动画定向测试：`tests/animation-expansion.spec.js` **9/9 通过**，10.9 秒；覆盖共享元素降级/快速取消、静物可见性、光圈取消、关系高亮、年份准确性、正文不位移、教学状态和键盘纸角控件。
- 最终构建：`npm.cmd run build` 成功，613 modules；公开内容守卫、打包及离线 worker 生成均成功。
- 生产预览质量检查通过：本地 Edge、无网络/CPU 限速、减少动态效果下，375px 首页 LCP 196ms / CLS 约 0.04，1440px LCP 200ms / CLS 约 0.01；核心主题 token 的文字对比检查通过。属于本机单次快照，不能当作线上性能、动画帧率或 Lighthouse 成绩。
- 产物示例：RelationLines JS 348B、拼贴 JS 301B；PhotoGallery 含原灯箱及新增逻辑共 4,237B（gzip 1,685B）。CSS 分块及完整测量保存在 `output/animation-expansion-metrics.json`。没有新增位图素材。
- 本地手机视图已确认教学示意、重置按钮和原有详情卡片，截图为 `output/previews/animation-expansion-workshop.png`。静态截图不证明整个动画过程。
- 最终完整回归：设置 `PRODUCTION_QA=1` 后运行 `npm.cmd test`，**67/67 通过，4.6 分钟**，无跳过。包括原有功能、8 项字形检查、9 项扩展动画检查、四档宽度与双世界/双语/两种体验模式组合，以及生产预览质量检查。初轮 65 项发现的影院夹具上下文缺失已修复，并在此次完整回归通过。
- 未做低端真机帧率、Safari/Firefox 或真实读屏语音实测；未提交、推送或部署。无新增大型依赖、全局持续 RAF 或服务器。
