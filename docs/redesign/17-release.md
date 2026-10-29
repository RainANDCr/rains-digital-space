# 阶段 17：发布准备与回滚（未发布）

用户要求本地展示。本阶段完成发布前核验与操作手册，不推送 GitHub、不发布 Cloudflare、不改真实域名。基线 0d08363，改版仍为本地未提交文件。

## 已通过的本地冒烟路径

- 原首页/关于/技能/联系，项目分类与搜索，博客搜索/标签/原文/Markdown/刷新/404。
- 探索章节 → 项目、旅行、档案、硬件、历史、学习、放映室、信箱，均可直接打开。
- 档案 → 网站项目，学习 → StudyFlow，城市文字 → 原博客，全站搜索 → 项目详情，文章目录 → 正文。
- 两种主题/语言/视觉模式、持久化、背景动画关闭、向导收起、四种视口。
- 信件校验、复制、mailto 格式（没有自动发送）；相册/视频用独立夹具测试。
- 构建/生产预览成功，夹具没有进入 dist。细节与边界见 16-quality-report.md。

## 复现

```powershell
npm.cmd install
npm.cmd run dev -- --host 127.0.0.1 --port 4175
# 另一个终端，开发服务器保持运行
npm.cmd test
npm.cmd run build
npm.cmd run preview -- --host 127.0.0.1 --port 4176
# 生产专项，4176 预览保持运行
$env:PRODUCTION_QA='1'
npm.cmd test -- quality.spec.js
```

夹具需要 Vite 开发服务器；完整开发测试不能只对不含 tests 的 dist 运行。生产专项默认跳过，需显式 PRODUCTION_QA=1 和端口 4176。没有 lint/typecheck，未增加 TypeScript 或后端。

## 后续取得发布授权后

1. 再检查完整差异、构建与待补资料。只暂存审过的源代码、资源、测试、文档；不要把 handoff.md、用户提示词、凭证、缓存或私人原图公开。
2. 建议独立分支与 Cloudflare Pages 预览分支，验证上述路径并留存预览 URL。GitHub 推送不表示两个 Cloudflare 入口均已更新。
3. 用户确认预览后，Pages 仍用 `npx wrangler pages deploy dist --project-name=rains-digital-space --branch=main`；构建 `npm.cmd run build`，目录 dist。现有 wrangler.jsonc 为 Workers assets，不能仅为消除 Pages 提示而随意覆盖。
4. Workers 若保留，独立检查 Git 集成是否实际触发；必要时按既有 `npx wrangler deploy` 同步同一构建。不要引入另一个 GitHub Pages 发布流程。
5. 分别检查两个生产入口首页、旧文章、新页面及刷新，确认正确版本、偏好和移动菜单。Pages 保持默认 SPA fallback，不新添顶层 404.html；Workers 保持 not_found_handling=single-page-application。
6. 域名只有单独授权后才操作。本批没有新增密钥或环境变量。

## 回滚

尚未提交：按编辑器差异逐文件撤销目标阶段，保留其他本地成果与用户文档，不硬重置整个工作区。

以后发布出错：优先在 Cloudflare 恢复上一个已验证生产部署，Pages/Workers 各自回滚。代码用新的 revert 提交保留历史，不 force-push。必要时在独立工作区检出 0d08363 重新构建恢复版本，不覆盖当前未提交成果。

只在浏览器保存主题、语言和视觉偏好，没有新增云数据库；回滚不清空 localStorage。已公开资料不能靠客户端隐藏或回滚承诺彻底撤回。

## 可选后续

高价值：本人真实资料、手机与屏幕阅读器验收。中价值：限速 Lighthouse、社交分享预渲染、公开学习路线。可暂缓：3D、音效、真实留言后台和账号同步。本轮不擅自开展。
