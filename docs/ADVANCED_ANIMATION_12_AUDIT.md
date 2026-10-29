# 12 项高级动画 · 阶段 00 审计

日期：2026-10-29。依据用户提供的《12个动画Rains_Digital_Space_.md》及当前源码。

**初次仅执行阶段 00；用户随后要求继续剩余阶段，实施记录见末尾。** 下方审计矩阵保留实施前结论。没有生成图片或增加业务页面。上一轮动画保留，编号与上一轮不同，不能混用。

## 1. 当前项目与场景

- JavaScript、React 19、Vite 8、React Router 7；静态 Markdown 使用 react-markdown、remark-gfm、rehype-highlight，skipHtml 保持开启。没有 Motion、GSAP、Canvas/WebGL 渲染库，无需为本轮安装依赖。
- App.jsx 已有首页、旅行、历史、档案、硬件、影院、邮局、工坊和博物馆路由；路由存在不代表场景、公开数据或素材已经存在。
- `wrangler.jsonc` 指向 `./dist`，配置 `single-page-application`；这是 Workers 静态资源配置。未找到 `.github` 工作流或 `public/_redirects`，不能据此声称远程 Cloudflare Pages 设置已验证。本轮不改部署、不发布。

| 场景 | 状态 | 实际证据 |
| --- | --- | --- |
| 海边首页 | 部分存在 | Home → ParallaxScene → SceneImage，poetic 使用 hero-poetic；海景在单张 WebP 中，没有独立海面 DOM 或水面遮罩 |
| 数字书桌 | 存在，但原插画未分层 | DeskNavigation 有整图和真实链接热点；SceneStillLife 是独立原创 SVG 小面板，含时钟、台灯、灯光；没有可擦玻璃、独立窗景或台灯开关 |
| 摄影灯箱 | 功能存在，公开照片数据为空 | PhotoGallery 已支持 dialog、共享元素、光圈；journeys 与 mediaAlbums 为空。测试夹具有图片，不能把测试内容当作本人照片 |
| 历史文章与地图 | 部分存在 | History 有分类/筛选；当前 posts 没有 History 分类文章，historyMeta 为空。没有古地图、来源年代或地图图例 |
| 档案与旧物 | 部分存在 | Archive 有真实 details/summary 索引与年份筛选；Museum 已有页面但 artifacts 无已确认公开物件。没有木抽屉或物件分层素材 |
| 邮局与公开信 | 部分存在 | Letters 是明信片表单、预览、mailto。FutureLetters 在 Archive 展示公开信；futureLetters 为空，demoLetters 有明确标记的公开演示。不能把表单提交当作公开信开启 |
| 时间胶囊 | 仅日期展示/演示 | FutureLetters 展示 locked/open 状态，但没有“封存成功/开启成功”的持久操作或成功事件。展开 details 不是胶囊成功事件 |
| 硬件与工坊 | 部分存在 | Hardware 为部件选择示意；Workshop 有真实教学步骤、active/installed 状态及 CircuitSignal。hardwareConfig 为空，无特定型号 PCB/外壳/散热器分层图 |
| 城市可探索场景 | 不存在 | Travel 有地图/列表框架、游记，但没有逐栋建筑/地面/交通等可探索城市资源层 |
| 长文与日记 | 文章存在，批注不存在 | BlogDetail 渲染 11 篇 Markdown；扫描内容未发现现成 mark、annotation、引用块或明确加粗标注。普通标题、技术正文不能自动当作作者重点批注 |

## 2. 十二项去重与落地矩阵

“缺失”不等于现在就该开发；必须同时有承载场景和可靠素材。所有可实现项默认沿用 motionAllowed、世界模式、原控件及原数据。

| 编号 / 名称 | 目标页面 / 去重结论 | 分层素材现状 | 是否新增状态 | 建议及当前可落地范围 | 性能 / 无障碍 |
| --- | --- | --- | --- | --- | --- |
| 01 雨窗擦拭 | `/explore`；缺失，旧雨幕不是擦拭 | 单张书桌图，无独立玻璃/雾层 | 当前不新增；有素材后才需局部笔触状态 | **暂缓**，先标定真实窗户与清晰背景。不能在整幅书桌上覆盖雾层冒充玻璃 | 中；将来仅局部按住拖动，保留擦开/恢复按钮，触屏滚动优先 |
| 02 镜头拉焦 | PhotoGallery；与已有光圈的 blur 聚焦部分相似 | 无前中后景；单图聚焦已有 | 不新增灯箱或焦点全局状态 | **跳过单图实现**，复用 ApertureTransition；有独立焦点层后再做真正拉焦。打开共享元素、切图光圈已经占用交互槽 | 中；blur 仅图片，不碰说明与按钮；必须可取消 |
| 03 动态投影 | SceneStillLife；已有灯光，缺少实体投影 | SVG 有 lamp-shade、lamp-light 及底板，能可靠增补对应影子 | **不新增开关**，复用 currentScene 与 playing | **可最小整合**，在同一 SVG 灯具附近添加低对比投影，先静态随现有昼夜变化；如运动，只做可见时低频 opacity | 低；aria-hidden、pointer-events:none，保持热点可操作；不新增第二个灯光系统 |
| 04 古地图展开 | `/history`；不适用，缺地图 | 无授权古地图、图例、年代 | 不新增 | **跳过**；不能把旅行示意地图或普通封面当作古地图 | 有素材后中；外层固定尺寸展开，不拆在线地图瓦片，来源文本一直可读 |
| 05 档案抽屉 | Archive 的 memory-entry；相似：已有原生折叠内容，无惯性 | 现有纸质 details 卡片可承载紧凑效果，无木抽屉资源 | **不新增开合状态**，复用 details.open | **可最小整合**，仅内容小位移/轻阻尼；手机仍是普通折叠面板。不能创建新抽屉导航或物件记录 | 低；保留 summary 键盘行为，关闭不丢焦点，不对每卡运行物理模拟 |
| 06 水面焦散 | 首页；缺失但缺局部海面边界 | 整张 hero-poetic，无水域 mask | 不新增时间状态 | **暂缓**；先有与现有响应式裁切对齐的水域遮罩，再限定海面。不可给整个首页或 terminal 叠水纹 | 持续中；移动端静态或关闭，离视野/后台暂停；不得妨碍 CTA 对比 |
| 07 蜡封开启 | FutureLetters；缺失；纸角反馈不是蜡封 | 可用简单 CSS 圆形印记，无需新图 | **不新增可见性/日期状态**，复用 details.open | **条件可行**：只能增强公开可读条目；当前只可接入明确标注的公开信演示，默认列表仍为空。不得给 locked 条目开放正文 | 低；原 summary 即时响应，不等动画；一次性、无遮罩，键盘与触屏沿用原行为 |
| 08 流沙沉降 | 日期信件展示；不适用 | 没有封存/开启成功容器或事件 | 不新增成功状态 | **跳过**；不能伪造胶囊保存成功，也不把展开预览当作成功。若以后已有真实成功事件再接入短反馈 | 未来中；限制颗粒与时长，隐藏/卸载立即取消，失败不播成功动画 |
| 09 硬件分层拆解 | Hardware / Workshop；缺失；部件选择和电路线不是内部拆解 | 无具体型号、可靠层级及分层图 | 当前不新增拆解状态 | **暂缓真实拆解**；继续使用现有部件说明/教学示意作为非误导替代，不凭空画 PCB 或散热器内部结构 | 中；以后必须固定尺寸、有标签和一键归位，原参数表保持可读 |
| 10 手绘批注 | BlogDetail；缺失；已有目录、胶带、标题聚合均不等价 | Markdown 中没有明确批注内容 | 不新增作者观点/标注数据 | **暂缓**；先由作者在已有文章指定批注位置及文本，再增强该标记。不把所有段落、标题或代码改成重点 | 低；复用一次可见性观察器，保留真实文本、选择复制和窄屏换行 |
| 11 微缩场景搭建 | Travel；不适用；现有视差不能复制 | 无可探索城市场景与建筑图层 | 不新增场景状态或页面 | **跳过**；书桌整图已有视差，不再包装成模型搭建。等真实分层城市页面存在再接入 | 中；将来用户主动进入才播，热点尽早可用、支持跳过 |
| 12 水彩晕染 | Letters 的 letter-preview；缺失；与胶带装饰近似但不是同一材质 | 现有信纸容器，可用 CSS 小面积渐变，不需生成素材 | 不新增信件状态；一次播放用现有 hook | **可新增**，只在信纸边缘装饰首次可见时晕染；terminal 改静态/简短数字光晕。不要放到已用胶带的文章标签上叠加 | 低；伪元素 pointer-events:none，正文不模糊、不位移；轻量/减少动态效果直接静态 |

## 3. 现有动画来源及复用

| 来源 | 代码定位 | 可复用能力 / 限制 |
| --- | --- | --- |
| CSS 动画 | global / world / space / interactions / visuals / extensions 样式，以及 kinetic、still-life、relations、year-roller、collage、circuit、paper-corner | 页面入场、天气、卡片反馈、标题聚合、静物、连线、年份、拼贴和纸角；新效果不得重复这些职责 |
| WAAPI | ApertureTransition.jsx | 切换照片时的圆形遮罩与轻微聚焦；effect cleanup 调用 cancel。未发现独立多焦点拉焦器 |
| 原生 View Transition | PhotoGallery.jsx | 已有缩略图/详情共享元素，快速取消和普通淡入降级；复用 dialog 和返回焦点逻辑 |
| Canvas 2D + RAF | PointerParticles.jsx | 已有小规模指针粒子，不能复用成第二套全屏粒子背景。本轮不增加 Canvas |
| 事件驱动 RAF | useCardMotion.js、ParallaxScene.jsx | 指针卡片和视差更新；复用原功能，不为新效果复制全局 pointer/scroll 监听 |
| IntersectionObserver | Layout、KineticTypography、useVisibleMotion | 后者可负责局部可见性和一次触发。已管理的同一装饰不再叠另一观察器 |
| 计时器 | PreferencesProvider、Guide、useTypewriter | 昼夜分钟更新、向导与职业打字。新动画不得借此复制第二套时间、对话或打字状态 |
| Motion / GSAP / WebGL | 未发现相关依赖或实现 | 当前无安装理由，不建立新动画引擎 |

## 4. 唯一状态源与最小接口建议

- 世界：`usePreferences().mode`，实际名称 **poetic / terminal**。文档里的 digital 映射到 terminal，不新建 worldTheme。
- 体验：`experience` 为 immersive / lite；`motion` 为 system / reduced / off。
- `motionAllowed` 由 PreferencesProvider 统一计算，包含系统减少动态效果、用户减少动态设置、轻量模式及 document.hidden；低算力/省流量默认值由现有 normalizePreferences 处理。
- 昼夜：沿用 `currentScene`（dawn/day/dusk/night），不读取第二个时间源。当前没有四季引擎。
- `animationEnabled`：未来组件的局部 `enabled` 与 motionAllowed 合取即可；不新建全局开关面板。每项单独可禁用。
- `motionLevel`：直接从现有 experience/motion/mode 推导，不持久化第二份。
- `playOnce`：使用 `useVisibleMotion({once:true,enabled})`；静态内容始终可见，隐藏页后不强制重播。
- `cancelOnRouteChange`：沿用 React 路由卸载和 effect cleanup；动画实例调用 cancel，Observer disconnect，若以后使用指针捕获则在取消/卸载释放。
- `pauseWhenHidden`：现有 motionAllowed 变为 false 时，应停止/取消实际计算，不只是透明隐藏。
- `cleanup`：每项负责自己的 WAAPI/监听器/Observer；现在不写统一调度器、队列或物理引擎。

这些是接口建议，本阶段不增加尚无调用方的 hook、组件或状态。

## 5. 同页预算与冲突分配

| 页面 | 主动画 | 允许的低强度辅助 | 必须避开的冲突 |
| --- | --- | --- | --- |
| Home | 保留既有首页入场/视觉交互 | 原有环境层 | 没有海面遮罩前不加焦散；不把整张 hero 模糊当分层拉焦 |
| Explore / 书桌 | 原有导航和场景交互 | 优先把灯光/投影整合在同一个 SceneStillLife 中 | 时钟、灯光与新影子整体控制强度；不另建玻璃窗口、不复制视差 |
| PhotoGallery | 打开/关闭共享元素，切图光圈，按不同动作互斥 | 首次缩略图拼贴结束后保持静态 | 不再叠加拉焦；若将来分层拉焦取代某次光圈，需取消旧实例；沿用 data-film-developing 互斥约定 |
| Archive | 用户展开某项时可做轻量内容抽拉 | 年份是另一次用户操作；信件演示蜡封只能作用于可读信件 | 标题进入与显式操作重叠时用户操作优先，先取消标题装饰；不同时播放两项大面积进入效果 |
| BlogDetail | 当前只保留既有阅读体验 | 胶带已用作辅助，批注待有原标记后再接 | 不自动标全文；新增批注时不要再加水彩与胶带三重装饰 |
| Letters | 原有明信片预览即时响应 | 小面积信纸水彩边缘 | 不把邮寄或预览当作已发送/已封存；不模糊正文和表单 |
| Workshop / Hardware | 原有选部件与教学信号 | 保留静态说明 | 无可靠层级前不加拆解；即使以后有拆解，也不能与电路动画同一操作同时抢焦点 |

主动画 ≤1，辅助 ≤1 是后续逐页验收预算，不代表当前已经自动仲裁。现有标题、route fade、灯光等需要在每个新阶段接入点再次核对；本阶段不大范围改旧动画。

## 6. 推荐执行顺序与拟修改文件

基于当前资源，对文档建议顺序作实际调整：

1. **03 动态投影最小整合**：SceneStillLife.jsx、still-life.css；复用 currentScene / playing；增加对应测试。没有新的台灯业务开关。
2. **12 信纸边缘水彩**：Letters.jsx、单独局部样式，必要时一个小组件；复用 useVisibleMotion，新增可见/静态/文本选择测试。
3. **05 档案折叠内容惯性**：Archive.jsx、局部样式；原生 details 不变，加入快速开关和键盘测试。
4. **07 公开信演示蜡封**：FutureLetters.jsx、局部 CSS/SVG；仅演示可读条目，保留 locked、private、日期守卫测试。
5. 其余先补对应真实资产或编辑标注，再重新审计；02 当前复用光圈，不新建等价组件。

建议按以上每次一个阶段推进，完成后再进入下一项。当前不创建这些拟议文件。

素材缺口：窗景/雾层与区域坐标、海面遮罩及响应式裁切对齐数据、带来源年代图例的古地图、特定硬件的真实部件层及关系、作者明确指定的批注、已有城市页的建筑/地面/摆件层、真实胶囊成功事件。不能用生图补造史料、个人照片或特定硬件内部结构。

## 7. 基线与验证范围

- 本轮实际运行 `npm.cmd run build`：**成功，613 modules**；公开内容守卫与离线 worker 生成正常；worker 版本 `rain-pocket-15c191348d31d7c2`。
- 本次构建全部 46 个 JS/CSS 文件合计 **956,764 字节**，这是总产物，不是首屏下载量。主 JS 约 366.78kB / gzip 127.88kB；没有新增运行时代码或资源。
- 仓库 `output/animation-expansion-metrics.json` 保留上轮本地 Edge 快照：375px LCP 196ms / CLS 0.04077；1440px LCP 200ms / CLS 0.00702。**本轮未重测 Web Vitals**；不能把此前快照当作当前新测或线上值。
- 动画帧率、CPU/GPU 峰值、内存长期泄漏、弱网、200% 缩放、高对比模式及低端真机：**本轮尚未测量**。
- 未更改产品代码，因此本轮没有重复执行旧测试；上轮 67/67 的结果属于上轮，不作为本阶段新跑结果。package.json 未配置 lint 或 typecheck，本项目为 JavaScript，不添加 TypeScript 检查来凑数。
- 本阶段仅新增本报告。撤销方式：删除本报告即可。没有推送、部署、数据迁移或权限改动。

## 8. 用户继续实施后的记录

用户随后要求继续剩余阶段。阶段 03、12、05、07 的最小整合及阶段 13 联调已执行；其余因素材、内容标注或成功事件缺失跳过。详见 [实施与验收记录](ADVANCED_ANIMATION_12_IMPLEMENTATION.md)，本报告上方矩阵仍作为实施前基线。
