# Liquid Glass 增量升级记录

## 阶段 00：去重与实施边界

实际技术栈为 React 19、Vite 8、React Router、原生 CSS，无 Motion 依赖。沿用 `UI.jsx` 的 Button/Card/Filters、Layout 原响应式导航、PhotoGallery 原生 dialog、PreferencesProvider 的双世界/体验/动态偏好。新样式不改变内容、路由或交互语义。

| 检查项 | 已有实现 | 本次处理 |
| --- | --- | --- |
| 设计 token / 双世界 | global/world/space CSS、data-theme/data-mode | 新增独立玻璃材质变量，引用现有颜色与动效 token |
| 玻璃拟态 | 滚动导航已有 14px backdrop-filter | 复用导航，改为局部胶囊材质；不保留双重模糊 |
| 指针高光 | useCardMotion 单一委托监听、RAF 和 --light-x/y | 扩展少量现有工具按钮，只有当前 hover 元素更新 |
| 卡片与按钮 | Button、Card、Filters | 扩展 Button/Card 可选 glass 参数，不把所有卡片玻璃化 |
| 导航选中状态 | aria-current 与下划线 | 增加单一装饰滑块，保留真实链接和焦点 |
| 弹窗/菜单 | 原生相册 dialog、Guide、手机菜单 | 只给工具层或小面板加玻璃，不模糊图片 |
| SVG/动画 | 无玻璃 SVG 滤镜；已有 shared photo transition | 使用渐变模拟边缘偏折；导航使用 CSS 衔接，不接管照片转场 |
| RainOS 窗口 | 仅概念插画，没有窗口管理器 | 阶段 06 跳过；不新建窗口业务 |
| 昼夜/雨幕 | 按用户要求已移除 | 本次保持删除，环境色由亮暗主题和双世界决定 |
| 页面层级 | sticky header z20、guide z25、photo top layer | 保持现有层级，不新增全屏模糊层 |
| 移动与轻量 | 900px 折叠菜单、现有 motionAllowed | 保留断点；轻量/减少动态/高对比下关闭模糊与液态动画 |

设计方向：保留原有宋体展示标题与无衬线正文、左对齐内容；以悬浮胶囊导航作为主要视觉变化。诗意世界从米白、浅蓝、淡紫取色，终端世界从深蓝、冷紫、银灰取色；亮暗仍由现有主题变量决定。玻璃只包围操作，不覆盖大图或正文。

材质接口为 `data-glass="clear|regular|tinted|elevated"`；默认不模糊，支持 backdrop-filter 时才渐进增强。边缘折射为渐变、内描边、阴影形成的光学近似，不宣称真实物理折射。

后续阶段按材质 → 导航 → 有限形变 → 选择性应用 → 兼容与验收依次实施。各阶段具体文件、检查和回滚记录在完成后补充。

## 阶段 01–08：实现与回滚

| 阶段 | 修改文件 / 复用对象 | 效果与成本 | 检查及回滚 |
| --- | --- | --- | --- |
| 01 材质 | `styles/glass.css`、`main.jsx`、`components/UI.jsx` | Clear/Regular/Tinted/Elevated 属性统一接口；Card 默认无材质，Button 默认 clear，可 `glass={false}` 关闭。无依赖/新图片 | 01–04 接入后 build 通过；撤销 glass.css 导入并移除 UI 的 glass/data-glass 扩展 |
| 02 光学 | `glass.css`、`hooks/useCardMotion.js` | 渐变镜面、内描边、轻微双色边缘。复用单一 pointermove 委托与 RAF，只更新当前 hover；停用/隐藏/离开清理，静止时无持续 RAF | 指针清理专项通过；还原 hook 选择器和 glass-pointer 分支，仅删光学 CSS 即可撤销 |
| 03 导航 | `Layout.jsx`、`hooks/useGlassNavigation.js` | 悬浮胶囊、滚动后更不透明，单个 aria-hidden 滑块。尺寸仅路由/语言/展开/ResizeObserver/字体加载完成时测量；无滚动测量循环。1100px 及以下折叠 | 快速导航、语言重排、手机 Escape 测试通过；删除 hook 调用/装饰 span、恢复导航样式和 data 属性。保留原导航语义 |
| 04 融合 | `glass.css`、`WorldMirror.jsx`、原 ExperienceSwitch | 模式按钮圆角/按压、体验选择胶囊滑动，CSS 接续中断；不使用 SVG 滤镜或新增转场管理器 | lite 立即静态，pointer tracker 清理测试通过；单独删除 experience filters 伪元素和 transform/transition 规则 |
| 05 双世界 | `glass.css` 的 data-mode/data-theme 变量 | 同一材质接口，诗意暖反射、终端冷反射，四种组合共用内容 | 双世界、亮暗与高对比测试通过；删除 terminal/light 玻璃变量覆盖即可回退 |
| 06 RainOS | 无 | 跳过，仓库只有 RainOS 插画，无真实窗口系统，未创建窗口管理器 | 不涉及回滚 |
| 07 页面操作层 | Guide、PhotoGallery、DeskNavigation、Home、BlogDetail、Travel、Settings | 向导 elevated，图片工具条 regular，车站/书桌工具 clear，设置面板 tinted，文章目录 regular。图片与正文不模糊，普通卡片未统一玻璃化 | 原相册/项目筛选测试通过；移除各调用点 data-glass 或 Card glass 参数及对应局部样式即可独立回退 |
| 08 性能与可访问性 | `glass.css`、现有 PreferencesProvider | 仅导航与小向导面板允许 blur；移动端 8px、向导无 blur；lite/reduced/off/more-contrast/forced-colors 不模糊。轻量模式复用 motionAllowed 真正取消监听和 RAF | 四屏宽、中英文、键盘、lite 清理、减少动态与强制颜色专项通过；回退相应媒体/偏好规则前须保留可访问性约束 |

这次没有新增 React Glass 包装组件：Button/Card 沿用现有组件；已有原生容器使用 `data-glass` 相同接口。素材与字体未更换。用户之前删除的雨幕/环境场景没有恢复。

## 阶段 09：验收范围

- 基准：本次开始时 dist 的全部 JS/CSS 共 47 文件、995,551 字节（未压缩，所有路由合计，不等同首屏下载）。最终值在下面记录。
- 动态没有引入新依赖、全屏 blur、全站持续高光循环。重复按钮/标签只使用静态反射，只有悬浮导航和小向导面板有 backdrop-filter。ResizeObserver 会在清理时 disconnect，字体 promise 的迟到回调有 disposed guard。
- 使用本机 Edge/Playwright 检查，不声称 Safari/Chrome 实机或弱设备 GPU 已验证；没有受控帧率、INP、长时间内存或能耗对比，不能宣称性能提升。
- 无 backdrop-filter 时默认使用不透明 surface；增强放在 @supports 内。减少动态/强制颜色的静态回退已测试，但没有真正不支持 backdrop-filter 的旧浏览器实机测试。
- 导航透明基色分别叠加纯白/纯黑背景，检查亮暗与双世界四种组合的文字对比度 ≥4.5。该测试未模拟任意图像和光学高光所有像素。
- 玻璃专项包含快速导航、移动菜单 Escape、偏好保存、跟踪清理、四屏宽和高对比。原有回归发现三个与玻璃无关的内容问题：测试固定文章数为 11 而实际 25（两项），新文章正文带 # 标题造成两处 h1（一项）。未修改文章或降低原有长度标准，保留失败证据。
- 本地实现，不提交、推送或部署。完整视觉细节仍需人工查看，不能以 DOM/计算样式测试代替实际观感验收。

## 本地查看

最终检查：`npm.cmd test -- glass.spec.js` **8/8 通过（11.3 秒）**；包含 glass/site/interactions 的回归 **28/31 通过**，三项失败原因见上文。`npm.cmd run build` 成功（633 modules），最终全部 JS/CSS 47 文件共 **1,005,359 字节**，比基准增加 **9,808 字节（约 0.99%）**。这是所有路由的未压缩合计，不是首屏体积或运行时性能提升。

保持开发服务器运行，访问 `http://127.0.0.1:4175/`、`/settings`、`/explore`、`/travel`、`/blog/cs-java-python`。切换亮暗/诗意与终端，检查顶部胶囊和标签文字；在设置切换体验模式，lite 不模糊、不跟踪高光；手机展开导航后，链接可用且 Escape 能收起。相册通过已有真实照片或测试夹具验收，不新增虚构相册。

回退时保留本次之前尚未提交的“删除环境/雨幕”与视差修复；不要整文件恢复 HEAD，以免撤销用户的其他修改。
