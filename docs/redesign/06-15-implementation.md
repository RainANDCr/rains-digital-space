# 阶段 06–15：本地实现与内容维护

2026-10-29，未提交/推送/部署。

| 阶段 | 实现 | 正式内容状态 |
| --- | --- | --- |
| 06 | /archive 展开时间线、筛选、相关项目、到期公开信件 | 复用既有学习阶段，新增实际本地改版事件；未造学校/成绩 |
| 07 | /hardware 2D 机箱组件热点、配置卡、设备日志 | 型号/使用体验留空，不将示意图当成持有设备 |
| 08 | /history 关键词/年代/地区、复用博客与目录、出处 | 历史文章待提供；城市文章保留原链接 |
| 09 | /learning 技能星图与分类、公开计划、学习笔记、StudyFlow | 状态读取 skills.js，无熟练度或虚假统计 |
| 10 | /cinema 胶片/相册/大图、灯箱、按需视频 | 个人媒体为空；用独立夹具验证模式和播放器 |
| 11 | /letters 校验、预览、复制与 mailto | 不上传、不保存到网站、不自动发送 |
| 12 | 可手动展开/关闭的雨夜向导、逐字或立即显示、情境文案 | 复用已有原创生成插画，无聊天 API |
| 13 | 自动/昼/暮/夜、背景雨纹、独立减少动画 | 用访客本地时间，无定位/音效；低核/省流降级 |
| 14 | 诗意/终端双模式，导航栏原地切换 | 共享内容，保留路径/筛选/滚动/语言，与亮暗独立 |
| 15 | /search 文章、项目与公开记录组合检索 | 不加入未公开或未确认的新内容；中文文章标注原语言 |

## 数据规范

`src/data/spaces.js` 管理新章节和内容；旧 profile/skills/projects/posts/content 不迁移。`src/locales/space.js` 值为 `[中文, English]`，初始化并入现有 i18next。`world.js` 的章节进入新路由，旧 /#archive、/#journal 仍保留。

前端数据文件可被读取，visibility/日期判断不是保密措施。只放准备公开的资料，私密信件、住址、私人原图保留在项目外。

- archiveEvents：`{id,date,topic,titleKey,textKey,visibility:'public',projects:[],cities:[]}`，key 对应 space.js；未知关联不生成链接。日期支持年/月/日粒度，未记录不猜测。
- futureLetters：`{id,title:{...},body:{...},visibility:'public',confirmed:true,unlockDate:'YYYY-MM-DD'}`。仅确认公开且有效日期已到者显示。客户端时间可改，秘密不能预先打包以模拟安全定时发布。
- hardwareConfig：cpu/gpu/memory/board/storage/cooling/display/peripheral 对应 `{model,notes:{...},source:'https://...'}`。hardwareLog：`{id,date,title:{...},text:{...},visibility:'public'}`，文字明确当前/曾用/计划，不暗示已购买；参数注明来源或本人记录。
- 历史文章直接加入原 posts，category 为 History，正文仍用 Markdown。`historyMeta[slug]={era,region,sources:[{title,url}]}`。正文区分史实、引用、个人观点，争议事实需核对来源；历史年代不混进个人成长线。
- learningPlan：`{id,title:{...},text:{...},visibility:'public'}`。路线、周预算、长期目标、里程碑和月回顾由本人写入 text。无真实实际数据时不生成对比图，不读取日历或 StudyFlow 私人数据。
- mediaAlbums：`{id,title:{...},story:{...},date,visibility:'public',confirmed:true,photos:[{src,alt,caption,credit}],video:{src,poster,title,captions,language}}`。图片放 public/images，视频字幕用 VTT；压缩/EXIF 见 05-content-guide.md。无自动播放，提供准确 alt 和来源。

新增公开路由/文章/项目后更新 public/sitemap.xml，检查稳定 id/slug 和内部链接。搜索不需要后端服务。

## 向导设定与来源

雨夜向导：安静、简短、只给站内方向；午夜蓝/星雾紫/雨空青。沿用阶段 02 原创 AI 场景里的人物局部裁切，不是现实人物、私人照片或外部动画剧照，不是独立新立绘。来源与完整生成提示词见 assets.md。

默认按钮 44px，展开宽 350px、手机 300px；可立即收起，系统/手动减少动态时直接显示文字。对话集中在 space.js 的 guideHome/Projects/Travel/Other。原 Canvas 粒子仍是唯一粒子系统，环境雨纹为低透明 CSS、pointer-events:none；无持续声音、假终端命令或强制开场。
