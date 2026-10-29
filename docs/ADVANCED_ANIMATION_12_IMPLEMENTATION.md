# 12 项高级动画 · 实施与验收记录

日期：2026-10-29。依据 `ADVANCED_ANIMATION_12_AUDIT.md` 的真实资源与用户继续实施的要求。

## 最终分项状态

| 编号 | 状态 | 结果 / 限制 |
| --- | --- | --- |
| 01 雨窗擦拭 | 缺素材，跳过 | 没有可辨识的窗户容器、独立清晰窗景与雾层；不把整张概念图变成玻璃 |
| 02 镜头拉焦 | 复用已有，跳过重复开发 | 无前后景；已有 ApertureTransition 的单图聚焦，继续与共享元素、光圈互斥，不另加一次 blur |
| 03 动态投影 | 最小整合完成 | SceneStillLife 在台灯底座旁增加真实独立 SVG 投影。沿用 currentScene，昼夜改变强度和形状；有动效时短过渡，没有新增常驻循环或台灯开关。不是原书桌合成图内部的物理重建 |
| 04 古地图展开 | 缺史料素材，跳过 | 无有来源、年代、图例的古地图；不新增史料 |
| 05 档案抽屉 | 简化整合完成 | Archive 原生 details 卡片内容打开时最多 5px 位移和极轻回弹；关闭即时、Escape 返回 summary 焦点。正文不透明度不变；手机直接展开。没有伪装木抽屉或新建导航 |
| 06 水面焦散 | 缺遮罩，跳过 | 现有海景是响应式裁切的整图，没有独立水面 mask，不全屏叠纹理 |
| 07 蜡封开启 | 条件整合完成 | FutureLetters 只为 unlocked 可读条目渲染蜡封；当前默认公开信为空，只能通过“查看演示信件”体验。原生正文立即显示、蜡封每次挂载最多动一次，之后不强迫重看。locked 条目无正文/打开控件 |
| 08 流沙沉降 | 缺成功事件，跳过 | 没有胶囊封存/开启成功业务，不能把展开预览当作保存成功 |
| 09 硬件拆解 | 缺真实分层关系，跳过 | 现有是通用教学示意，不是可靠型号内构；继续原说明与电路选择，不补造 PCB/尺寸 |
| 10 手绘批注 | 缺作者批注，跳过 | 原文无明确 annotation/mark；不替作者挑观点或批量划重点 |
| 11 微缩场景 | 缺场景，跳过 | 无已有可探索城市及建筑/地面/交通层，不新增空页面，也不复制视差 |
| 12 水彩晕染 | 完成 | WatercolorBloom 接入 Letters 原信纸预览，48×20px 角落渐变一次展开；正文和按钮不位移、不失焦。terminal 静态数字渐变；lite/reduced 静态 |
| 13 统一联调 | 已实施，最终测试结果见下方 | 四种世界/体验组合、减少动态效果、隐藏/恢复模拟、原生键盘、快速开关、旧功能回归；未测项单列，不把全部 12 项标记完成 |

## 每阶段范围、文件和风险

### 03 投影

- 修改 `SceneStillLife.jsx`、`still-life.css`。独立实体是原 SVG 台灯，而非图片里猜测的灯。
- `shadows={false}` 可单独禁用新增投影，不影响原时钟、灯光、热点。
- 只在已有 motionAllowed 为 true 时有短过渡；静态昼夜层次仍可用。无计时器、RAF、滤镜、图片或事件监听增量。
- 检查路径：`/settings` 选择星夜/白日 → `/explore`，比较灯底投影；系统减少动态效果时无过渡。
- 初次测试因开发服务未运行连接失败，已启动本地服务；另修正测试脚本不应在每次跳页覆盖刚保存的偏好。没有修改用户偏好业务逻辑。
- 回滚：移除 SVG `.lamp-shadow`、相关 CSS 和 currentScene 属性读取；或仅传 `shadows={false}`。

### 12 水彩

- 新增 `WatercolorBloom.jsx`、`watercolor.css`；Letters.jsx 将原 `div.letter-preview` 换为组件，原 class、孩子、预览和 mailto 保持。
- `enabled={false}` 可独立停用，恢复普通容器。伪元素只在信纸顶部留白，pointer-events:none，无新增图片。
- 复用 useVisibleMotion 的一次观察器；隐藏或减少动态效果变为静态，之后不强制重播。不降低正文 opacity。
- 检查路径：`/letters` 输入测试文字 → 预览；只观察角落，确认复制/表单和发送入口没有被遮挡。实际未发送邮件。
- 回滚：组件标签换回 div，保留 letter-preview class，再删组件与 CSS import/文件。

### 05 档案卡片惯性

- 新增 `MotionDetails.jsx`、`motion-details.css`（与 07 复用），Archive.jsx 仅替换原 details 标签，保留 summary、日期、正文和链接。
- 使用原生 open 状态，没有第二套 React 开合状态。开启的少量子节点使用短期 WAAPI，重开先 cancel，关上/卸载/动效设置变化立即取消。
- 不移动 summary、不给列表每卡模拟物理；窄屏直接展开，正文颜色和透明度始终不变。
- `enabled={false}` 停用动画，仍保留原生内容。Escape 关闭已展开项并把焦点放回 summary。
- 检查路径：`/archive`，Enter 打开、快速开关、Escape、Tab 进入项目链接；减少动态效果下检查没有 WAAPI 实例。
- 回滚：Archive 的 MotionDetails 改回 details，去掉 import；若保留 07，不删除公共组件。

### 07 演示蜡封

- FutureLetters.jsx 只将原 unlocked 分支的 details 换为 `MotionDetails effect="seal"`，添加 aria-hidden 圆形印记。日期、visibility、确认状态及数据文件均未修改。
- 不等动画才显示正文。首次打开后装饰保持消失，每次挂载至多一次，不声明跨会话永久“拆封”。terminal/lite/reduced 直接静态消失。
- 针对这些封口控件抑制旧 future-body 淡入和纸角，避免同一操作叠三套效果；其他控件的纸角系统保留。
- summary 触控高度至少 44px，原 Enter/Space 与原生语义保留。没有新路由、弹窗、发送、保存或权限。
- 检查路径：`/archive#future` → 查看演示信件 → 可读演示的“打开”；未解锁演示无打开按钮与正文。快速关闭、再开不重播蜡封。
- 回滚：只把 FutureLetters 中 MotionDetails 改回 details，移除 wax-seal span/import；如保留 05，保留公共组件。删除 CSS 中 seal 专属规则即可恢复原正文淡入/纸角。

### 13 优先级与清理

- KineticTypography 新增仅在播放期间注册的页面局部 pointerdown/keydown 监听；用户输入立即结束标题装饰，离开/结束即移除。没有全局事件总线或新动画调度器。
- 新增的主体交互只有档案展开/蜡封，复用同一取消函数；水彩为局部辅助，投影不增加循环。没有引入任何运行时依赖。
- 独立回滚优先级修复：移除 KineticTypography 中以 running 为依赖的第二个 effect；标题原显示逻辑不变。
- 本轮不处理与新增动画无关的旧文件，不更换路由、编辑器、数据结构或部署配置。

## 测试与性能

- 新增 `tests/advanced-animation.spec.js`：4 项功能 + 4 种 world/experience 组合 + 用户输入/隐藏页取消，共 9 项。隐藏页使用测试模拟 document.hidden 与 visibilitychange，**不是实体浏览器切后台的人工验证**。
- 各阶段均执行过构建。四项基础功能及上一轮字形测试合计 12 项已通过。最终设置 PRODUCTION_QA=1 执行 npm.cmd test：**76/76 通过，7.6 分钟，无跳过**；覆盖原有功能、四档屏幕、四种世界/体验组合、生产预览质量与新增 9 项检查。
- 最终构建：成功，617 modules；worker `rain-pocket-22e9d5a53df3195c`。本阶段 JS/CSS 总产物 960,527B；阶段 00 基线 956,764B，增加 **3,763B**（未压缩，全部路由总量，不代表首屏增量）。没有新增位图或第三方包。
- 本轮生产预览质量脚本通过：本地 Edge、无网络/CPU 限速、系统减少动态效果下，两档首页 LCP 均为 484ms；375px CLS 0.04077、1440px CLS 0.00702，主题核心文字对比检查通过。与阶段 00 引用的旧快照相比 CLS 相同、LCP 不同；运行负载不是受控 A/B 条件，不能据此归因于新增动画或宣称帧率提升。记录为 `output/advanced-animation-12-metrics.json`，该质量快照在最终纯位移微调打包前采集，不代表最终产物的逐字节尺寸。
- lint/typecheck：package.json 未配置，本项目是 JavaScript；不虚构执行结果，不为本轮引入 TypeScript。
- 真实低端设备、实体触屏、Safari/Firefox、200% 缩放、弱网、长时间内存曲线及动画帧率：未测。不能用本机功能测试代替这些结论。
- 内置浏览器请求本地页面时遭安全策略拒绝；未重试或改用其他方式绕过，所以没有新增侧栏人工预览截图。独立项目测试为此前已启动的验收流程。
- 没有推送、部署、发布个人资料或发送邮件。
