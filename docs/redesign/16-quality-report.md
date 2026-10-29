# 阶段 16：质量记录

2026-10-29，Windows / Edge，本地开发 4175、生产预览 4176，没有线上回归。

## 实际结果

- 完整回归：26 passed，3.0 分钟。涵盖旧内容、全部章节、深链接、目录、搜索、模式/语言/主题持久化、移动菜单、灯箱与焦点。
- 随后表单空白边界与放映室专项：2 passed，2.9 秒。胶片/相册/大图列数、无自动播放和灯箱 Esc 通过；修复灯箱样式独立引入，避免依赖先访问旅行页。
- 生产专项：1 passed，最终重验 4.7 秒。验证真实 dist 的首页/章节/档案、截图与核心对比度。
- 375/768/1024/1440，新页面覆盖诗意/终端 × 深/浅 × 中/英组合，无横向溢出或运行时异常。
- npm.cmd run build 通过：主入口 JS 约 405.5 KB / gzip 140.3 KB；另有共享运行时，各新页与 Markdown 详情按需加载。WebP 首图 249428 bytes，无外部字体和新依赖。
- git diff --check 无格式错误，仅换行提示。公开源码目录常见密钥/私钥头/console.log/debugger 模式扫描无匹配，不等于完整秘密审计。
- 没有 lint/typecheck 脚本；Lighthouse/axe 未安装，不虚报评分。

## 本地性能快照

生产首页，PerformanceObserver 在首屏完成绘制后采样；未限速、无真实访客数据。

| 视口 | LCP | CLS | DOMContentLoaded | 传输资源 |
| --- | --- | --- | --- | --- |
| 375×900 | 360 ms | 0 | 83.0 ms | 525333 bytes |
| 1440×900 | 268 ms | 0 | 53.9 ms | 525333 bytes |

原始记录在忽略提交的 .npm-cache/quality-metrics.json。第一次采样过早 LCP=null，已改为实际绘制后采样。无改版前可比记录，不编造提升百分比。数据不是 Lighthouse 或现场 INP，不代表手机网络；长期 CPU/内存、真机触摸、屏幕阅读器完整流程、字体放大仍需人工验收。

## 可访问性、安全、SEO

深浅主题中 text/muted/accent 对 bg/surface 的 12 个核心组合都达到 4.5:1，两视口重复验证；不是逐像素检查所有插画。键盘焦点、跳主内容、菜单 Esc、灯箱左右键/Esc/焦点返回和目录定位有自动覆盖。向导不强制展开，系统减少动态和手动关闭背景动画生效。

Markdown 保留 skipHtml，外链 safeExternal；信箱只有复制/mailto，无自动传输、数据库、跟踪、密钥。未来信件不是秘密存储。夹具未进入 dist，忽略 node_modules/dist/.env/.npm-cache/test-results/.wrangler。

页面 title/description/canonical/OG 随路由变化，新增 favicon、robots、33 条公开 sitemap；设置/搜索/404 noindex。纯 React 元数据依赖 JS，部分社交爬虫只读默认 index.html，尚无 SSR。外站 Demo 实时可达性、邮箱客户端发送、生产域名/Cloudflare 自动触发未在本次测试。

待补：本人确认的真实旅行、照片、硬件、历史文章、学习预算与公开信件，对应正式内容为空，未用夹具或 AI 冒充。
