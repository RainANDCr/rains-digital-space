# 十张概念插画：映射与替换

来源：本轮使用 OpenAI 内置 image_gen 按用户提供的提示词生成的原创概念插画。它们不代表真实旅行照片、站长肖像或已发生的人生事件。所有下表资源均为 ready，非占位。部分画中存在装饰性伪文字，正式文案由网页渲染。

原图：output/imagegen/2026-10-29-priority-10。生成提示词：同目录 PROMPTS.md。网页版本：public/images/worlds，每张提供 720px 与至多 1440px 宽 WebP（不放大原图）。实际宽高在 src/data/visual-assets.json，双语 alt 与来源在 src/data/visuals.js。

| 素材 ID | 原文件 | 实际用途 |
|---|---|---|
| world-transition | 01-dual-worlds.png | /explore 顶部双世界封面 |
| hero-poetic | 02-poetic-hero.png | 首页诗意模式首屏 |
| hero-digital | 03-digital-hero.png | 首页终端模式首屏 |
| world-poster | 04-world-poster.png | /explore 世界观介绍 |
| cover-memory-express | 05-memory-express.png | 首页时光列车真实导航、探索页旅行入口 |
| cover-little-desk | 06-little-desk.png | /explore 书桌导航 |
| cover-rainos | 07-rain-os.png | 数字模式 /projects 封面、探索页项目入口 |
| cover-constellation | 08-memory-constellation.png | /archive 封面、探索入口 |
| cover-film-darkroom | 09-film-darkroom.png | /cinema 封面、探索入口 |
| cover-rain-post-office | 10-rain-post-office.png | /letters 封面、探索入口 |

列车和书桌的操作均为真实链接，书桌在手机上改为图下列表。当前书桌提供电脑→项目、相机→影像厅、书本→博客、信封→书信；不把生成图片里的图形当成可用软件。

## 尚缺素材与功能边界

- 6 张封面缺失：atmosphere-studio、time-layers、living-journal、secret-garden、seasonal-stories、time-capsule。
- 14 张独立 mini 缺失；探索页复用现有封面裁切，未声称它们是新生成的小图。
- 两张独立 16:9 hero-memory-express / hero-little-desk 缺失；现阶段在分区复用对应封面，没有拉伸或创建死链接。
- guide-default 与独立表情组缺失；继续使用旧向导插画，不改人物身份。
- 未实现模拟操作系统多窗口、音轨调音、季节粒子、胶囊私人草稿等后续业务功能；已有页面仍提供原能力。本轮没有新增公开内容或私人草稿发布路径。

## 替换步骤

1. 将新原图放在原始素材目录，保留旧图备份；在 scripts/prepare-visuals.py 的 FILES 中调整来源文件名。
2. 使用已安装 Pillow 的 Python 运行 `python scripts/prepare-visuals.py`。该脚本仅生成图片与尺寸清单，不处理网站内容数据；项目不新增浏览器依赖。
3. 调整 src/data/visuals.js 中准确的中英文 alt。Home 的 position 控制首页裁切，其他组件可传 position；不要把整段生图提示词作为 alt。
4. 运行 `npm.cmd run build`，打开首页和 /explore，检查两模式、两语言、亮暗主题和小屏。后续部署前更新资源文件名以避免旧缓存（本轮路径是新路径）。
5. 检查缺图时标题和链接仍可用；原图只用于素材存档，网站引用压缩 WebP。

## 手动验收路径

- 首页切换顶栏界面模式：两张主视觉切换，当前 URL 保持；主题与语言仍可独立改变。
- 首页时光列车：四个站点进入既有页面；关闭动画后仍可点击。
- /explore：八个原有入口、四个书桌入口和世界观海报；320px 时书桌入口转为图下网格。
- /archive、/cinema、/letters：封面有真实 alt 与 AI 图标识；原筛选、空状态和表单仍可操作。
- 网络面板阻止 /images/worlds：显示渐变回退，导航和正文不消失。

自动化检查结果在本次交付中报告；截图与测试产物存放在忽略提交的 test-results。未把本地快速指标当作真实移动网络或完整真机验收。
