# 随身档案馆：PWA 缓存边界与维护

## 开启方式

`npm.cmd run build` 完成 Vite 构建后执行 scripts/build-pocket.mjs。它依据最终文件生成 dist/sw.js 与内容哈希版本；manifest 和 192/512px PNG 图标来自 public。图标沿用网站原雨滴/星形标志，没有增加外部素材。

`npm.cmd run preview -- --host 127.0.0.1 --port 4176` 后访问 `/pocket`。开发服务器 4175 不注册 worker。安装按钮仅在浏览器提供 beforeinstallprompt 时显示，否则使用浏览器菜单的“安装应用/添加到主屏幕”。没有自动安装、自动弹安装窗或请求通知权限。

## 精选缓存策略

首次注册 worker 不下载离线内容；只有用户点击保存才准备缓存。缓存范围是固定同源构建文件：index.html、主题引导、favicon、manifest、图标、当前 JS/CSS。精选入口由 data/extensions.js 中 offlineRoutes 维护。

精选文章正文复用现有 React/Markdown 构建包。共享构建包本身可能包含其他**已公开**文章，因此精选是保证离线可打开的入口清单，不是内容保密边界。没有缓存表单输入、POST、私人草稿、网络请求历史或外部 iframe；新插画和远程项目没有被加入离线缓存。

导航在线优先。网络失败时，仅无查询参数且在精选清单中的入口可返回缓存的应用壳；其他直达页面显示中英文离线说明。站内 React 导航可能仍能打开已经包含在公开构建包中的页面，不承诺阻止访问其他公开内容。

静态文件只查固定同源白名单，兼容预览服务器 Vary: Origin；不把忽略 Vary 用到用户接口或动态响应。没有通用“缓存所有请求”的逻辑。浏览器可以因存储压力清除数据，不能保证永久离线。

## 更新与清除

- 版本哈希包含所有公开壳资源、worker 模板及精选入口。旧版本存在有效离线标记时，新 worker 安装阶段先准备新缓存；准备失败保留旧 worker/缓存。
- 新 worker 等待时，页面显示“更新并刷新”，只有用户点击才主动 skipWaiting 和刷新；不在填写表单时自动刷新。
- 新版本激活并拥有完整缓存后，只清除 rain-pocket- 前缀的旧版本，不删除其他网站缓存或本地偏好。
- “清除离线内容”删除此功能全部缓存，不删除护照、收藏、主题和语言。卸载 PWA 不一定自动删除浏览器数据，优先使用此按钮。
- 本地 cache 数据仅在该来源可用；4175、4176 与生产域名彼此独立。

若回滚为完全不含 PWA 的历史版本，先通过浏览器站点设置注销该站 service worker 并清除 rain-pocket- 缓存，再刷新；或者保留一版只做注销/退役的 worker。只删除 sw.js 文件不能保证旧 worker 立即退出。不要通过清空整台浏览器恢复站点。

## 校验与限制

自动化实际执行保存、断网直达 Markdown 文章、未精选 `/letters` 离线回退、清除缓存及清除后的回退。应用安装和跨版本更新入口也有实现，但未在真机进行桌面/主屏幕安装或生产域名更新验收。

安装可用性依赖浏览器及 HTTPS/localhost 条件；离线测试通过不代表所有手机均可安装。公开客户端中的内容都可被查看；不要把未公开正文放进静态源码、JS 或 public。

缓存与更新流程参考 [MDN：使用 Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers) 和 [MDN：PWA 缓存](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Caching)。
