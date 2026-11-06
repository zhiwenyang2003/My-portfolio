# 作品集网站会话交接

更新时间：2026-11-06  
项目位置：`G:\ChatGPT\portfolio vibe coding\portfolio-site`  
GitHub 仓库：<https://github.com/zhiwenyang2003/My-portfolio>  
线上发布：GitHub Pages，发布内容来自 `deploy-dist/`，工作流文件为 `.github/workflows/pages.yml`。

## 当前正在做什么

正在完善用户作品集中的「项目一：布达拉宫智慧导览平台」详情页，重点是页面内的手机交互原型。用户最近提出的三项要求为：

1. 分层地图页的底部抽屉要能随拖动升降，展开时必须出现信息卡。
2. 分层地图在换成高清图片后，背景仍须保持原设计的淡黄色，不能出现黑色透明区域。
3. 云端祈福页必须完整使用用户给的新背景图，不能出现标题重影、背景错位或额外黄色长条；转经筒滑动交互需继续保留。

## 已完成且已推送

最新已推送提交：`3a0c96e Fix Potala prototype map drawer and backgrounds`。

本地工作区在该提交后是干净的；`main` 已推送到 GitHub。

### 分层地图

- 修改文件：`dist/potala-prototype.js`、`dist/potala-prototype.css`，并同步到了 `deploy-dist/`。
- 底部抽屉由原来“仅松手后切换”改为拖动时实时跟随；松手后吸附到展开或收起位置。
- 展开状态从 `10-layer-map-04-alternative.png` 取底部卡片区域，避免重复显示两层抽屉。
- 抽屉关闭时沿用原地图图片内的蓝色抽屉把手；展开后卡片自底部上滑。
- 分层地图的手机屏幕、地图视口、图片透明区域的底色统一为 `#fffad9`。
- 四张高清地图 JPG 已重新导出：将透明区域平铺淡黄色后保存，避免此前 JPEG 转换把透明区压成黑色。

更新后的地图资源位于：

- `deploy-dist/images/potala-prototype/10-layer-map-01-detail.jpg`
- `deploy-dist/images/potala-prototype/10-layer-map-02-detail.jpg`
- `deploy-dist/images/potala-prototype/10-layer-map-03-detail.jpg`
- `deploy-dist/images/potala-prototype/10-layer-map-04-detail.jpg`

它们已由约 24–27 MB/张降到约 8.5–9.8 MB/张，分辨率为宽 9000 px，足以支持手机原型内缩放。

原始透明 PNG 仍保留在 `dist/images/potala-prototype/10-layer-map-0*-detail.png`，主要作为源文件；不要删除，除非用户明确要求。

### 云端祈福

- 新背景图：`images/potala-prototype/iPhone 16 Pro Max - 60.png`。
- 祈福背景已设置为整个手机屏幕铺满，不再使用旧的 `top:17% / bottom:3%` 局部区域。
- 新背景已经含有：状态栏、标题、浅蓝纹样、底部黄色渐变与 Home indicator。因此不能再额外叠加黄色底条或旧标题区域。
- 转经筒仍由三张透明前景图组成：`Group 1756.png`、`Group 1757.png`、`Group 1758.png`。
- 为保留用户原来的返回、介绍、声音按钮，只从旧图 `08-blessing.png` 裁切出三个小按钮叠在新背景上；不再叠加旧页面其他区域。

## 当前卡点／必须做的验证

代码和资源已推送，但本会话结束前**没有在浏览器中对刚发布的 GitHub Pages 实际操作验证**。下一位应优先完成以下检查：

1. 打开 GitHub Actions，确认 `Deploy portfolio to GitHub Pages` 对提交 `3a0c96e` 显示成功。
2. 打开线上网站，进入布达拉宫详情页的手机交互：
   - 点进“分层地图”。
   - 向上拖动底部蓝色抽屉，确认卡片跟手出现，释放后停在展开位置。
   - 向下拖动，确认抽屉收起。
   - 切换 1F、2F、3F、4F，确认地图的透明空白均为淡黄色，且地图可拖动、缩放。
3. 点进“云端祈福”：
   - 确认只出现一组“转动吉祥经筒 / 获享吉祥加持”标题。
   - 确认底部只使用用户给图片里的黄色渐变，没有多余黄色长条。
   - 左右滑动转经筒，确认三个状态仍会切换。
   - 确认返回、介绍、声音按钮仍可点。

若 GitHub Pages 尚未刷新，可等待 Actions 完成后进行硬刷新（Windows：`Ctrl + F5`）。

## 若验证仍有问题，应从哪里改

### 抽屉与地图

核心位置：`dist/potala-prototype.js` 中的 `mapMarkup()`、`pointermove` 里的 `gesture.kind==='drawer'` 分支，以及 `endGesture()` 中的 drawer 分支。

- 收起位置：`top: 92%`，高度 `8%`。
- 展开位置：`top: 80%`，高度 `20%`。
- 地图视口：收起高度 `81.5%`，展开高度 `68%`。
- 如果卡片位置或高度不合适，优先调整上述 80、92、20、8、68、81.5 六个数值；不要恢复先前的 `height:400%` 卡片图片样式，那会造成图像严重拉伸。
- 卡片图片 CSS 应维持：`width:100%; height:auto; bottom:0`。

### 祈福背景与转经筒

核心位置：

- `wheelMarkup()`：背景与三个转经筒图层。
- `blessingChrome()`：三个旧图按钮的小裁切。
- CSS 的 `.potala-wheel-stage`、`.potala-wheel-background`、`.potala-wheel-object`。

新背景图是完整 1760 × 3824 的手机画面，必须维持 `inset:0; width:100%; height:100%; object-fit:fill` 才能一比一覆盖对应手机比例。不要再把舞台限制到 `top:17%` 或 `bottom:3%`。

## 站点结构与发布规则

- `dist/`：本地预览和日常编辑使用的网页文件。
- `deploy-dist/`：GitHub Pages 实际上传目录。任何会影响线上展示的改动，都必须同步到这里。
- `.github/workflows/pages.yml`：每次推送 `main` 时，自动把 `deploy-dist/` 发布到 GitHub Pages。
- 用户已明确要求：之后网页设计修改可先在本地看效果；确认后再推送 GitHub。
- 用户此前也部署过腾讯云 CloudBase 静态托管。当前主要发布渠道已转向 GitHub Pages；若用户要求腾讯云同步，需要手动把 `deploy-dist` 上传到 CloudBase 文件管理，而不是只推 GitHub。

## 用户偏好与沟通注意事项

- 用户对“改了但页面上没看到”非常敏感。每次修改后先核实本地和 `deploy-dist` 都更新，再提交、推送，并明确说明是否已经实际验证线上效果。
- 用户希望视觉严格对照截图：不要擅自删掉卡片、抽屉、背景层、标题或底部渐变。
- 用户偏好直接动手完成，避免反复让她处理技术步骤；需要她操作浏览器账号、文件选择、云端上传时，再给出非常明确的一步操作。
- 用户在意加载速度。图片替换时，应优先保留正确比例，再做压缩；不要把透明 PNG 直接转 JPEG 而不先铺正确背景色。

## 下一步建议

1. 先验证提交 `3a0c96e` 的线上交互结果。
2. 根据用户实际截图微调抽屉展开高度或祈福转经筒位置。
3. 若后续还有设计改动：先改 `dist`，确认后同步同名文件到 `deploy-dist`，然后提交并推送 `main`。
