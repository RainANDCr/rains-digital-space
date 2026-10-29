# 生成插画接入：实施范围与检查

## 本轮范围

采用《digitalspaces前端生图.md》的素材接入路线：审查现有工程，接入已生成的十张图片，改进双世界首页、探索入口及已有栏目。本轮不是阶段 00–21 全功能重建。章节旁白按用户最新要求继续移除。

复用 React 19 / Vite 8 / JavaScript、React Router、PreferencesProvider、ThemeProvider、i18next、既有 Markdown 与公开数据模型、CSS 动效。没有新增运行依赖或后端。

## 审查与复用

| 内容 | 代码依据 | 接入方式 |
|---|---|---|
| 路由及 SEO | src/App.jsx | 保留全部 URL、元数据逻辑和懒加载 |
| 内容源 | src/data/profile.js、projects.js、posts.js、spaces.js、travel.js | 不复制文章、项目或真实记录 |
| 双模式及存储 | components/PreferencesProvider.jsx、utils/interactions.js | 保留 poetic / terminal，terminal 对应手册中的数字世界；不改已有存储 key |
| 主题、语言 | ThemeProvider、i18n.js、locales | 继续与界面模式独立；增加中英文公共文案 |
| 动效 | ParallaxScene、PointerParticles、useCardMotion、styles/interactions.css | 原控制与减少动态保持；不重新加入旁白 |
| 资源 | output/imagegen/2026-10-29-priority-10 | 原图完整保留，新增 WebP 版本，不覆盖旧资源 |
| 部署 | wrangler.jsonc、npm build、dist；Pages 无顶层 404.html | 保留 Pages 默认 SPA 回退和 Workers 单页回退；本轮不部署 |

## 组件和数据流

原始 PNG → scripts/prepare-visuals.py → public/images/worlds + visual-assets.json

visual-assets.json + visuals.js（双语 alt、来源、状态）→ SceneImage → SectionCover / Home / DeskNavigation / Explore / SpaceHeading。

SceneImage 只处理尺寸、srcset、加载与错误状态；SectionCover 保留 DOM 文案；现有 Router 继续处理所有链接。Home 根据既有 mode 选择图片，不更换内容 ID，也不清空筛选、主题或语言。

## 风险和回滚

- 生成图为虚构插画，页面标明 AI 概念插画；不添加到真实旅行照片或人生事件中。
- 主视觉深色遮罩保证文字可读，小屏书桌热点改为文字网格，缺图保留所有入口。
- 首屏仅当前模式图片优先加载，其他图片懒加载；20 份 WebP 合计 3,664,422 字节，不会同时全部用于首屏。
- 回滚只撤销本轮 Home、Explore、Projects、SpaceHeading、main 和新增素材组件/样式的改动；不要清空浏览器偏好或重置此前未提交开发成果。
- 原始 PNG 未被移动或覆盖；移除新引用后才能删除 public/images/worlds。保留旧 rain-prologue.webp 作为历史备份及向导素材。

详细映射、替换说明及缺图状态见 [ASSET_GUIDE.md](ASSET_GUIDE.md)。

## 最终检查（2026-10-29，本地）

- `npm.cmd run build` 成功，577 个模块；无新增运行依赖。
- 设置 `PRODUCTION_QA=1` 后运行完整 Playwright 套件：**40 passed，3.8 分钟**，包含生产预览检查，无跳过。
- 覆盖旧文章/项目/筛选/导航/偏好、缺图回退、存储失败、键盘、减少动态、双模式/双语言/双主题及响应式。新增图片检查宽度包括 320、375、768、1024、1440px。
- 旧测试对唯一导航的假设已改为定位 `#navigation`；语言按钮按实际“简体中文”定位。修正后完整套件通过。
- Edge 本机生产预览，无网络或 CPU 限速：375px LCP 220ms、CLS 0.0408；1440px LCP 204ms、CLS 0.0070。仅本地快照，不代表真实网络或真机成绩。
- 已查看首页桌面/手机和书桌手机截图；截图在 output/imagegen/2026-10-29-priority-10/site-home-desktop.png、site-desk-mobile.png。
- 仓库没有 lint/typecheck 脚本；未实测 Firefox/Safari、触摸真机或长期性能。未推送、未部署。
