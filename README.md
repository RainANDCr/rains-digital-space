# Rain's Digital Space

Rain 的个人博客与项目作品集，用来记录计算机科学、编程与数学学习，也分享城市观察、生活思考和公开项目。

**[访问网站](https://rains-digital-space.pages.dev)** · **[阅读博客](https://rains-digital-space.pages.dev/blog)** · **[浏览项目](https://rains-digital-space.pages.dev/projects)** · **[GitHub 源码](https://github.com/RainANDCr/rains-digital-space)**

另一个部署地址：[Cloudflare Workers](https://rains-digital-space.1785114661.workers.dev)。Pages 通过手动部署更新，Workers 配有 Git 集成，推送后应检查是否实际触发构建；必要时手动补发。两者需要分别确认版本。部分网络可能无法访问 Cloudflare 默认域名。

## 博客介绍

- **学习笔记**：数据结构、Java、Python、AI 与大语言模型，以及微积分、线性代数。
- **城市与生活**：北京、西安、苏州的城市观察文章，以及大学学习与生活总结。
- **项目作品集**：收录 9 个公开 GitHub 项目，覆盖算法可视化、学习管理、记录工具和小游戏，提供源码与 Demo 入口。
- **阅读体验**：Markdown 正文、代码高亮、关键词搜索、分类与标签筛选，支持深浅主题、中文与英文界面和手机阅读。

Rain's personal blog and portfolio, featuring computer science and mathematics notes, city essays, and public projects. The interface supports Chinese and English; articles keep their original language.

本站使用 JavaScript + React + Vite，内容直接维护在仓库文件中，没有数据库或后台管理系统。新增文章或修改项目资料后，构建并发布即可更新网站。

## 安装、开发与验证

使用 Node.js 24 和随附的 npm：

```powershell
npm ci
npm run dev
```

生产构建和预览：

```powershell
npm run build
npm run preview
```

浏览器测试（先构建，再在一个终端启动生产预览服务）：

```powershell
npm run build
npm run preview -- --host 127.0.0.1 --port 4175 --strictPort
# 保持预览终端运行，在另一个终端执行：
npm test
```

测试默认使用 Windows 已安装的 Microsoft Edge。其他环境可安装 Playwright Chromium：执行 `npx playwright install chromium`，再移除 `playwright.config.js` 中的 `channel: 'msedge'`。测试端口为 4175，测试连接该端口的生产预览服务；结束后在预览终端按 Ctrl+C 停止服务。这避免了受限 Windows 环境下自动回收服务进程可能挂起的问题。

Windows 终端找不到 npm 时，重新打开安装 Node.js 后的终端，或使用：
```powershell
& 'C:\Program Files\nodejs\npm.cmd' run dev
```

构建目录是 `dist/`。提交代码时保留 `package-lock.json`，不提交依赖和构建结果。受限环境若无法写入 npm 默认缓存，可临时设置 `$env:npm_config_cache = Join-Path (Get-Location) '.npm-cache'`。

## 代码地图

| 文件 / 目录 | 用途 |
| --- | --- |
| `src/main.jsx` | React、Router、ThemeProvider 与 i18n 入口 |
| `src/App.jsx` | 路由、页面元数据和文章详情懒加载 |
| `src/components/Layout.jsx` | 导航、移动菜单、锚点、滚动状态、页脚、页面与滚动动效 |
| `src/components/UI.jsx` | 可复用 Button、Card、Filters |
| `src/components/ThemeProvider.jsx` | Context 主题状态与持久化 |
| `public/theme-init.js` | React 加载前读取主题，减少闪烁 |
| `src/hooks/useTypewriter.js` | 打字效果，响应减少动态效果设置并清理定时器 |
| `src/pages/` | Home、Projects、Blog、BlogDetail、NotFound |
| `src/data/profile.js` | 头像、昵称、双语文案、按钮、联系方式、About 与时间线 |
| `src/data/skills.js` | 技能类别和可编辑状态 |
| `src/data/projects.js` | 公开项目与保留的项目构想，含中英双语资料 |
| `src/data/posts.js` | 文章索引、元信息、Markdown 导入与阅读时间估算 |
| `src/content/` | Markdown 正文，11 篇中文长文 |
| `src/locales/` | zh-CN、en 公共界面翻译 |
| `src/i18n.js` | i18next 初始化、语言偏好、双语字段回退 |
| `src/styles/global.css` | 主题变量、排版、布局、组件样式、断点和轻量动效 |
| `src/utils/filter.js` | 组合搜索、项目筛选与安全外链处理 |
| `src/assets/`、`public/images/` | 本地头像和项目封面，新增 SVG 为项目示意图 |
| `tests/site.spec.js` | 搜索、过滤、导航、Markdown、偏好和响应式测试 |

## 路由

- `/`：首页；`/#about`、`/#contact`：首页锚点。
- `/projects`：项目分类。
- `/blog`：博客搜索，关键词、标签和分类可组合。
- `/blog/beijing-travel`、`/blog/freshman-year-review` 等：完整文章。
- 其他路由、未知文章 slug：应用内 404。

## 替换个人资料与项目

在 `profile.js` 中编辑头像地址、双语文案、按钮链接、GitHub 和邮箱。头像可以使用本地 import 或 https 图片地址。学校、日期和经历是明确占位；请填写真实内容。

技能状态默认是可编辑的 `learning`（学习中），可改为 `using`（使用中），不包含虚构的熟练度百分比。

添加项目：复制 `projects.js` 中的对象，填写唯一 id、双语 name/summary/description、cover、technologies、github、demo、category、status、date，并将真实项目的 sample 设为 false。分类可选 Web、Java、Python、AI、Other；date 使用 YYYY-MM-DD 或空字符串。GitHub 与 Demo 地址留空时不产生无效链接，外链仅接受 http/https。当前示例没有真实仓库或演示地址。

项目目录于 2026-10-28 根据 [RainANDCr 的公开仓库](https://github.com/RainANDCr?tab=repositories)、各仓库 README 和 package.json 核对。现收录 9 个公开项目：Snake Lab、知行 StudyFlow、落叶物语、数据结构实验平台 Codex 版、平生述、DataStruct Lab、今天吃什么、2048 和本站。两个数据结构仓库分别维护，卡片名称已区分；原作品集构想已替换为本站真实仓库，另外两个构想仍保留。

新增项目的 Demo 地址来自仓库 README；本地网络策略阻止了在线访问，未据此宣称已验证功能或在线状态。新增封面是本地 SVG 示意图，不是实际界面截图。没有确认的开发日期留空，未使用仓库创建时间推断。此目录是静态数据，不会自动同步 GitHub 的后续更新。

## 写博客

1. 在 `src/content/` 新建 Markdown 文件。正文从二级标题开始，页面会显示元数据中的主标题。
2. 在 `src/data/posts.js` 用 `import body from '../content/your-post.md?raw'` 导入。
3. 在 posts 中增加唯一 slug、title、summary、date、updated、language、tags、category、body。
4. 打开 `/blog/你的-slug`。日期使用 YYYY-MM-DD。
5. Markdown 支持标题、列表、表格、代码、图片和链接，代码围栏标注语言即可高亮。

文章保留原语言。切换界面语言不会翻译文章；语言不一致时显示明确提示。React Markdown 使用安全默认 URL 处理和 `skipHtml`，没有启用原始 HTML 解析。不要增加 rehype-raw 来处理不可信文章。

阅读时间根据中英文文本粗略估算，不代表精确阅读时长。当前文章索引包含正文；文章继续增加时可改为按 slug 加载。

目前有 3 篇城市游记、3 篇计算机学习笔记、2 篇微积分笔记、2 篇线性代数笔记和 1 篇大一年度总结，每篇正文至少 2000 个汉字。正文只有中文；英文界面会提示暂无译文。游记写成城市观察文章，没有声称真实到访；年度总结没有编造学校、成绩或活动。发布前请确认这些内容符合你的个人表达，并核对发布日期。

## 主题、语言与动效

主题变量位于 CSS 的 `:root` 和 `[data-theme="light"]`，包括颜色、圆角、间距和内容宽度。首次访问跟随系统主题，手动选择存入 localStorage 的 theme；语言根据浏览器语言选择，手动选择存入 language。存储不可用时仍可在当前页面切换。

使用 CSS 过渡与 IntersectionObserver；减少动态效果时停止打字、入场和悬停动画。导航和过滤按钮具有焦点与选择状态，移动端菜单支持 Escape 收起。

## 本地检查与限制

测试覆盖 375 / 768 / 1024 / 1440px，两种主题、两种语言，以及首页、项目、博客列表、游记和总结详情及 404；检查页面显示、横向溢出、偏好刷新保持、手机菜单和主要交互。截图生成在忽略提交的 test-results 中。浏览器验证使用 Edge，不代表已测试所有浏览器和真实设备。

应用设置各页面 title、description 和 Open Graph 文本；静态 HTML 提供默认元数据。当前是客户端 SPA，不执行 JavaScript 的分享爬虫只能读取默认首页元数据。如果上线后需要每篇文章独立的分享卡片，再引入静态预渲染。域名尚未提供，未编造 canonical、og:url 或线上分享图片地址。

源文件检查没有发现硬编码 API 密钥。前端的任何 VITE_* 环境变量最终都会公开，不应保存秘密。笔记中的代码块是学习示例。

## 更新与部署

代码仓库已经公开在 [RainANDCr/rains-digital-space](https://github.com/RainANDCr/rains-digital-space)，默认分支为 `main`。修改源码后先在本地检查：

```powershell
npm run build
git diff --check
git status
```

确认待提交内容后，按文件选择暂存，再提交与推送：

```powershell
git add README.md src public/images tests
git diff --cached --stat
git commit -m "Update blog and portfolio"
git push origin main
```

`handoff.md` 是本地运维交接资料，不属于网站内容；不要使用 `git add .` 将它无意公开。`node_modules`、`dist`、本地缓存和 `.env` 已由 `.gitignore` 排除。不要提交任何认证令牌。

### Cloudflare Workers：Git 集成与手动补发

本仓库已配置 Workers Builds，预期在推送到 `main` 后由 Cloudflare 执行构建与部署：

- 构建命令：`npm run build`
- 部署命令：`npx wrangler deploy`
- 静态资源目录：`dist`
- 配置文件：`wrangler.jsonc`
- 地址：[rains-digital-space.1785114661.workers.dev](https://rains-digital-space.1785114661.workers.dev)

保留 `assets.not_found_handling: "single-page-application"`，确保博客和项目子路径可直接访问与刷新。部署完成后，在 Cloudflare 的构建和部署记录中核对提交 SHA；不要只凭本地网络超时判断网站故障。

如果推送后没有对应的新部署记录，可在确认本地构建成功后运行 `npx wrangler deploy` 手动补发。本次 2026-10-28 更新已通过 CLI 同步到 Workers；自动构建触发尚未确认，请勿将“GitHub 推送成功”等同于“网站部署成功”。

### Cloudflare Pages：手动同步网站地址

README 顶部的网站地址是 [rains-digital-space.pages.dev](https://rains-digital-space.pages.dev)。该 Pages 项目使用直接上传，GitHub 推送不会自动同步它。需要发布相同版本时：

```powershell
npm run build
npx wrangler pages deploy dist --project-name=rains-digital-space --branch=main
```

首次使用 Wrangler 时按工具提示登录。也可使用电脑上已经安装的 Wrangler CLI。不要把 OAuth 或 API Token 写进仓库。

发布后检查首页、`/projects`、`/blog` 和 `/blog/beijing-travel`，确认刷新不会返回静态 404。Pages 没有顶层 `404.html` 时使用默认 SPA 回退；不要添加会破坏回退的静态 404。当前 Vite 按根路径部署，没有配置 GitHub Pages 仓库子路径。

这两套部署互相独立。维护时要同时更新，或以后明确只保留一个访问入口。GitHub 用于托管源码，当前网站运行在 Cloudflare，并非 GitHub Pages。

## 自定义域名

Pages 项目在 **Custom domains → Set up a domain** 中关联域名；根域名需要按向导配置 Cloudflare nameservers，外部 DNS 的子域名通常通过 CNAME 指向项目的 `pages.dev` 地址。先在 Pages 关联域名，再配置 DNS，等待证书生效并检查 HTTPS。

Workers 地址则在对应 Worker 的 **Settings → Domains & Routes** 中配置自定义域名。请按最终选定的站点入口配置，不要把同一个主机名同时指向两套独立站点。

参考：[Cloudflare Workers 静态资源](https://developers.cloudflare.com/workers/static-assets/)、[Pages 自定义域名](https://developers.cloudflare.com/pages/configuration/custom-domains/)。
