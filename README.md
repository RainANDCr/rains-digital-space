# Rain's Digital Space

JavaScript + React + Vite 个人网站。包含响应式首页、About、技能筛选、项目分类、静态 Markdown 博客、组合搜索、深浅主题和中英文界面。没有服务器、数据库或管理后台。

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
| `src/data/projects.js` | 项目字段与示例数据 |
| `src/data/posts.js` | 文章索引、元信息、Markdown 导入与阅读时间估算 |
| `src/content/` | Markdown 正文，11 篇中文长文 |
| `src/locales/` | zh-CN、en 公共界面翻译 |
| `src/i18n.js` | i18next 初始化、语言偏好、双语字段回退 |
| `src/styles/global.css` | 主题变量、排版、布局、组件样式、断点和轻量动效 |
| `src/utils/filter.js` | 组合搜索、项目筛选与安全外链处理 |
| `src/assets/`、`public/images/` | 本地头像和项目封面占位图 |
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

## GitHub：由你确认后执行

当前文件夹尚未初始化 Git，没有配置或修改远程仓库。以下命令只作为操作指导。

1. 在 GitHub 创建一个空仓库，建议先选 Private；不要勾选初始化 README，以免产生独立历史。确认准备公开时再自行调整可见性。
2. 在本地项目目录执行：
```powershell
git init -b main
git add .
git status
git diff --cached --stat
git commit -m "Build Rain's Digital Space"
```
3. 检查暂存清单不含个人秘密、node_modules、dist、.env。将下列占位地址替换为你刚创建的仓库，再执行：
```powershell
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git remote -v
git push -u origin main
```
4. 通过 GitHub 登录流程完成认证，不要把访问令牌写进代码或仓库地址。

参考：[GitHub 本地代码推送指南](https://docs.github.com/en/migrations/importing-source-code/using-the-command-line-to-import-source-code/adding-locally-hosted-code-to-github)。

## Cloudflare Pages：确认公开后部署

1. 进入 Cloudflare 控制台的 Workers & Pages，选择 Create application → Pages → Import an existing Git repository。
2. 连接 GitHub，选择仓库和 main 分支，根目录使用仓库根目录。
3. 构建命令填写 `npm run build`，构建输出目录填写 `dist`。设置 Node.js 版本 24（可用环境变量 NODE_VERSION=24）。
4. 确认愿意公开站点后，再点击部署。私有 GitHub 仓库不表示 Pages 站点私有。
5. 部署后访问 pages.dev 地址，并直接访问、刷新 `/projects`、`/blog/beijing-travel`；检查主题、语言和静态图片。

Cloudflare Pages 在没有顶层 `404.html` 时会按 SPA 方式回退到根入口，因此这里没有添加冲突的 catch-all 重定向或静态 404。应用内 404 通常仍返回 HTTP 200，这是纯 SPA 的限制。换到其他托管服务时需配置等价的 history fallback。

官方说明：[React 部署](https://developers.cloudflare.com/pages/framework-guides/deploy-a-react-site/)、[SPA 路由回退](https://developers.cloudflare.com/pages/configuration/serving-pages/)。

## 自定义域名

1. 进入 Pages 项目 → Custom domains → Set up a domain，先在 Pages 中关联域名。
2. 根域名（如 example.com）需要加入同一 Cloudflare 账户，并按向导配置 Cloudflare nameservers。
3. 子域名（如 blog.example.com）可在 DNS 服务商添加 CNAME，指向项目的 YOUR_SITE.pages.dev；按控制台实际给出的值操作。
4. 等待 DNS 和证书生效，然后验证 HTTPS 与文章子路径刷新。不要只添加 CNAME 而跳过 Pages 域名关联。

参考：[Cloudflare 自定义域名](https://developers.cloudflare.com/pages/configuration/custom-domains/)。

本次没有创建公开仓库、推送代码、连接云平台、修改 DNS 或发布网站。发布前请核对游记与年度总结，并将项目构想替换为真实作品。

