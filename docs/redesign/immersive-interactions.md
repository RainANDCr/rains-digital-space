# 七项沉浸式交互：增量实现与验收

依据用户提供的《digital space前端交互.md》，在既有 React / Vite / JavaScript / React Router / i18next / Context / CSS 基础上实现。沿用上一轮本地成果；不新增依赖、不推送、不部署、不修改账号/域名。

## 对接与文件

| 功能 | 原状与补齐 | 主要文件 |
| --- | --- | --- |
| 共享偏好 | 保留旧 mode/scene/reduced，增加 schema 校验及 version:2；存储失败回退内存 | PreferencesProvider、utils/interactions.js |
| 雨幕/昼夜 | 加入 dawn 和时段表、off/light/medium、静态降级与隐藏页暂停 | data/interactions.js、styles/interactions.css |
| 章节转场 | 保留即时路由与 CSS 进入；按用户要求移除章节旁白及设置 | Layout |
| 鼠标反馈 | 少量点击粒子替代高频拖尾，项目/照片卡细微倾斜与高光，失焦复位 | useCardMotion、PointerParticles |
| 首页视差 | 一处远景插画、中景渐变海平线、近景星光；正文固定，离屏暂停 | ParallaxScene、Home、parallaxLayers |
| 向导 | 保留人物插画，补状态、情境脚本、一次欢迎、已读/探索/彩蛋、持久隐藏和图片失败回退 | Guide、guideRegistry |
| 未来信件 | 正式空列表；可显式查看一开一锁演示，排序/年份，锁定只含预告；构建校验 | FutureLetters、demoLetters、utils/archive、scripts/check-public-letters.mjs |
| 双模式 | 复用已有诗意/终端和亮暗主题；原地切换，不丢页面、表单和筛选 | 原 PreferencesProvider、CSS token |

局部装饰层不拦截事件。无精细指针、窄屏、减少动态、手动关闭或隐藏页时，不启动鼠标/视差 RAF。没有强制滚动、假命令、聊天 API、音效、真实天气或定位。

## 设置与使用

打开 `/settings`：

1. 氛围选自动、晨光、白日、黄昏或夜晚。自动分段：05–11 晨光、11–17 白日、17–20 黄昏，其余夜晚；用访客本地时间，每分钟检查，隐藏后恢复时立即更新。
2. 雨幕选关闭/轻雨/中雨，默认轻雨。文章/项目详情静态或低强度；终端模式默认静态，中雨可作为显式增强选择。
3. 动效等级为跟随系统/减弱/关闭，保留旧“减少背景动画”开关。系统减少动态始终优先。关闭覆盖首页打字、卡片、视差、粒子及 CSS 动画，不只隐藏画面。
4. 鼠标、视差和向导可独立关闭。页面跳转保留轻量进入动效，不显示章节旁白。
5. 向导默认收起，主动点击后按页面介绍。浏览三个真实章节后可选看到一张虚构旧车票的短句，只展示一次；不是个人经历。可在对话中永久本地隐藏，在设置重新开启/重置已读。
6. `/archive` 中点击“查看演示信件”，可看一封公开演示和一封无正文的预告，不是站长真实信件。再次点击返回正式空列表。

## 存储与边界

- `theme`、`language` 不迁移、不删除。
- `spacePreferences` 保留原 key，JSON version:2；旧字段兼容，新增 rain/cursor/parallax/guideEnabled/motion。已移除的 narration 字段忽略，其他偏好保留。非法值默认回退，无 localStorage 时仍可使用本次内存状态。
- 新 `spaceInteractionProgress` version:1，只记录公开章节 ID、已读脚本与探索页面，不记查询内容、身份或用户信件。重置按钮只重置这些记录并恢复向导显示，不清空其他数据。
- 未做访客私人草稿编辑器，不读取或上传私人内容；原静态联系表单仍只复制/mailto。

## 信件安全约定

`unlockDate` 为 ISO 日期 YYYY-MM-DD，统一在该日 00:00 UTC 到达展示日，避免访客时区来回跳动。设备时钟依然可被修改，纯静态判断不是保密门。锁定条目只能有公开 title/teaser/writtenAt/unlockDate，不能有 body 或 bodyKey。

`npm.cmd run build` 先检查公开信件：私密、未确认、日期无效、重复 ID、锁定时附带正文/正文引用均阻止构建。正文适合公开且到期后再加入源文件；不将未来秘密放入静态站。已有解锁公开文本也不靠“隐藏”保证撤回。

更换角色：改 guideRegistry.image/nameKey；资源失败显示可访问的星形占位。脚本按 scene/condition/priority/text/state 配置，文案放 locales/space.js。状态为 idle/greeting/thinking/celebrating，无 Live2D 运行时。视差比例建议横向插画 16:9，背景保留余量；可替换透明中/近景，深度参数在 parallaxLayers，别给正文添加漂移。

## 检查记录与限制

专项检查覆盖时段边界、旧数据迁移、非法存储、存储被禁用、雨量/动画持久化、首访旁白/返回刷新、向导探索/隐藏、信件正反例、鼠标失焦恢复与视差开关。首次浏览器测试时原预览已停止，重启后执行；另修复旁白 Escape 注册时机。旧导航测试补等待正确博客 URL/搜索框，避免把输入填到尚未切换掉的项目搜索框。

本轮全量 35 项：33 通过、1 生产专项默认跳过、1 旧博客测试竞态失败；修正定位和路由等待后该项单独重跑通过（4.3 秒）。随后交互专项扩为 8 项并全部通过（11.9 秒），包括新增终端英文窄屏检查，因此共 35 项功能/响应式检查均已有通过结果。另对最终 dist 执行生产专项 1 passed（4.0 秒），最终构建通过。窗口截图发现首访旁白与向导欢迎叠放，已改为不同时展示；展开向导时旁白收起视觉层。

最终本地生产快照（Edge，无限速）：375px LCP 312ms、1440px LCP 240ms、CLS 均为 0，DOMContentLoaded 分别 86.2ms/51.6ms。它不是 Lighthouse 或真实网络成绩，不作改版前后提升承诺。主入口约 417.54KB / gzip 145.17KB，主 CSS 42.02KB / gzip 9.80KB，无新增依赖。原始数据在忽略提交的 .npm-cache/quality-metrics.json。

测试夹具不打包，生产专项需 dist 预览端口 4176 和 PRODUCTION_QA=1；完整测试需开发端口 4175。没有 lint/typecheck 脚本，不虚报评分。未实测 Firefox/Safari、触摸真机、长时间 CPU/内存或真实网络；低性能降级基于设备提示，不能代表所有手机。

回滚按本批指定文件差异撤销，保留前几轮未提交成果和用户文档，不硬重置/清空存储。发布仍按 17-release.md：本地 → 获授权预览部署 → 验证 → 确认正式发布 → 必要时独立回滚。此轮不操作生产环境。
