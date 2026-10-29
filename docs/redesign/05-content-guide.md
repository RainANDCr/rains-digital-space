# 添加真实旅行资料

入口 `/travel`，数据 `src/data/travel.js`。目前数组为空，这是有意的：不能根据既有文章认定真实到访。

只把本人已决定公开的资料放进该文件。`visibility` 和 `confirmed` 控制页面展示，不保护文件中的秘密；静态站的源数据和图片可被读取。私人日记、精确住址与未授权照片不要存入项目。

字段模板（文档示例，不自动加入页面）：

```js
{
 slug: 'replace-with-unique-id',
 city: { 'zh-CN': '待填写城市', en: 'City to fill in' },
 title: { 'zh-CN': '待填写标题', en: 'Title to fill in' },
 summary: { 'zh-CN': '待填写简介', en: 'Summary to fill in' },
 memory: { 'zh-CN': '本人撰写并允许公开的感受' },
 visitDate: '', // 可留空；也可用 YYYY、YYYY-MM、YYYY-MM-DD
 tags: [],
 visibility: 'draft',
 confirmed: false,
 publicCoordinates: null, // 可选 { lat, lng }，只填允许公开的城市中心近似坐标
 photos: [], // [{ src:'/images/travel/filename.webp', alt:{'zh-CN':'图片内容说明'}, caption:{'zh-CN':'说明'}, credit:'来源/许可' }]
 articleSlug: '', // 可选，对应现有博客 slug；无效关联不会显示链接
 historyNote: '' // 可选，本人整理并核对来源的城市见闻
}
```

确认公开后再设 `visibility: 'public'` 与 `confirmed: true`。slug 应唯一。同一城市可有多条旅行记录，城市筛选会一起显示；中文城市名作为稳定筛选值，切换语言不会丢失选择。

相册使用项目内的图片最便于维护。建议风景图 1600px 长边、缩略素材适当压缩为 WebP/AVIF；发布前清除 EXIF 中的 GPS 与设备身份等元数据，检查画面里是否有他人肖像、车牌、门牌等不希望公开的信息。原图保存在项目之外备份。不要将 AI 插画标成真实摄影。

地图为自绘经纬网示意，没有真实国界/街道底图，也不提供缩放、道路导航或位置获取。纬度范围 -90 到 90，经度 -180 到 180；缺少/无效坐标的条目仍能从列表阅读。无需地图密钥、第三方服务或网络请求。

灯箱支持按钮翻页、左右键与 Esc；关闭后回到打开它的缩略图。图片缺失显示失败提示，不能影响明信片文字阅读。照片 credit 字段显示来源说明，不自动证明拥有授权。

无真实资料时页面保持空状态；原三篇文章在“已有旅行文字”中继续可用，不显示为已确认的个人足迹。
