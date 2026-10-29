# 本地改版：仓库盘点与第一批实施计划

基线：`0d08363`，2026-10-28。仅本地预览，不提交、不推送、不部署。

## 当前架构

React 19 / Vite 8 / JavaScript / React Router；i18next；CSS 变量；React Context 主题；Markdown 静态文章。没有数据库、后台、联系表单或地图服务。

```
Layout（导航、主题、语言、粒子、页脚）
├─ / Home：介绍 → 关于/时间线 → 技术栈 → 联系
├─ /projects Projects：11 个项目、分类、仓库/Demo、展开描述
├─ /blog Blog：11 篇文章、搜索、分类与标签组合筛选
├─ /blog/:slug BlogDetail：安全 Markdown、代码高亮、阅读元数据
└─ * NotFound
```

数据来自 src/data 与 src/content；已有 Button/Card/Filters、useTypewriter、主题初始化及系统减少动态效果支持。部署保留 Cloudflare Pages 直传与 Workers assets 的 SPA fallback；本次不改部署配置。

## 保留与风险

- 保留：所有原始文章、项目、头像、邮箱、GitHub、URL、筛选、语言与主题偏好。
- 可复用：Layout、UI、主题变量、打字效果、IntersectionObserver、项目与博客数据。
- 视觉问题：当前首页以通用开发者卡片为主，缺少文档要求的海、黄昏、章节与胶片感。
- 内容风险：既有生成游记不能作为已核实旅行足迹；本次只作为已有文章入口，不创建真实足迹地图。硬件型号、摄影、私人事件均无资料。
- 首屏风险：生成插画必须压缩、设置尺寸并预留背景降级；不能新增常驻动画或阻塞开场。
- 回归风险：双主题文字对比、手机导航、原有 heading 测试、页面锚点和图片布局须检查。

## 第一批范围（00–03）

1. 本文记录审查，新增 world.js 集中管理双语首页叙事与章节入口。
2. 新增 world.css：雨夜蓝、星雾紫、雨空青、信纸白、落日粉；宋体式标题与系统无衬线正文，无外部字体请求。兼容旧 CSS 类名与暗/亮主题。
3. Home 增量改造：海边序章、即刻进入/跳过、头像名片、章节目录、真实项目精选、已有文章入口、原有关于/技能/联系。
4. Layout 保留所有导航和偏好，加入返回顶部与锚点当前位置。
5. 新增一张 AI 插画，记录生成来源；不是旅行摄影。没有地图、3D、后端、新依赖或自动发布。

涉及：Home.jsx、Layout.jsx、main.jsx、world.js、world.css、public/images/rain-prologue.webp 与文档；原有数据只读取。

## 后续路线

04 项目详情与搜索；05 待确认旅行数据后地图/相册；06 公开时间线；07 硬件资料；08 历史文章；09 学习星图；10 真实摄影；11 静态信箱；12 可选向导；13 环境设置；14 双视觉模式；15 搜索整合；16 全面质量；17 经授权发布。后续均按手册逐阶段验收。

## 命令与回滚

实际可用脚本：npm.cmd run dev、npm.cmd run build、npm.cmd run preview、npm.cmd test。没有 lint/typecheck 脚本，JavaScript 项目不强装 TypeScript。执行结果见本批验收文档。

回滚：本批未提交；可在版本管理界面对照 0d08363 撤销本批指定文件，删除本批新增文件，保留用户原有 handoff.md 和开发手册。不要硬重置整个工作区。
