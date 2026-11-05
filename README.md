# 作品集文字修改说明

所有可替换的文字集中在 `dist/content.js`。用记事本或代码编辑器打开，修改引号中的文字后，按 **Ctrl+S**（Mac 上按 **⌘S**）保存文件；然后回到浏览器按 **Ctrl+R** 或 **F5** 刷新页面。网页里没有单独的保存按钮。

- `home`：首页姓名标题、英文项目类型、中文自我介绍、工具名称、电话和邮箱。
- `home.profileImage`：首页圆形个人照片，当前使用的是你中文简历中的照片。若要换照片，把新照片放进 `dist/images/`，然后修改 `profileImage` 路径。
- `home.projectTypes`：姓名下方的英文项目类型占位文字，可直接替换成你自己的方向。
- `home.tools`：照片下方展示的 10 个工具名称。工具图片占位文件在 `dist/images/icons/tool-01.svg` 到 `tool-10.svg`；将你自己的正方形图标替换对应文件即可，文件名保持不变。
- 首页 12 个图片图标位由 10 个工具图标和 `dist/images/icons/contact-phone.svg`、`contact-email.svg` 两个联系方式图标组成；后两个也可用自己的图片替换，保持文件名不变。
- `projects.title`：项目页英文大标题。
- `projects.items`：六个项目，按顺序对应六张卡片及六个详情页。每项都可以分别修改项目名称、副标题、类型、时间、介绍和获奖信息。
- `about`、`connect`：对应独立页面的文字。`resume` 中包含根据中文简历整理的教育背景、四个项目、奖项、研究、技能和个人特点。
- `name`：左上角姓名。

要替换项目封面，把图片放入 `dist/images/`，然后修改对应项目的 `image`，例如 `image: "images/project-01.jpg"`。建议使用横向图片。

修改时保留英文引号、逗号和花括号。若文字里需要输入英文双引号，请写成 `\"`。

首页：`dist/index.html`；其他页面：`dist/projects.html`、`dist/about.html`、`dist/resume.html`、`dist/connect.html`。

首页主标题使用 Archivo Black；项目类型使用 DIN Next LT W05 Medium，联系方式使用 DIN Next LT W05 Regular；中文介绍使用阿里巴巴普惠体 2.0。字体文件已放在 `dist/fonts/`，随网站一起加载。

之后不需要每次生成新文件：文字继续在这个 `dist/content.js` 里修改即可。你自己改完并保存后，内容会留在同一个项目文件里；之后希望我帮你改页面或调整内容时，继续在当前对话告诉我，我会接着修改这套文件。

### GitHub Pages 发布准备

仓库里的 `deploy-dist/` 是已经压缩过的静态发布目录。GitHub Pages 工作流会从这个目录发布，避免把原始超大图片直接作为网页资源上传。修改网页后，先在本地更新 `dist/`，再运行图片准备脚本把更新同步到 `deploy-dist/`，确认本地效果后再提交到 GitHub。

`.github/workflows/pages.yml` 已准备好自动发布配置。将仓库推送到 GitHub 后，在仓库的 Settings → Pages → Build and deployment 中选择 GitHub Actions；之后每次推送到 `main` 都会自动更新网页。当前准备阶段不会创建远程仓库、推送代码或改变仓库可见性。
### 修改项目页文字

打开 `dist/content.js`，找到 `projects.items`。每个项目各占一个对象，按字段修改并保存：

- `title`：项目名称（卡片标题和详情页标题会同步更新）
- `subtitle`：详情页主标题下的副标题
- `type`：项目类型（卡片与详情页的 TYPE 共用）
- `time`：详情页的 TIME 文字
- `about`：详情页 ABOUT THE PROJECT 的介绍
- `awardsImage`：详情页 AWARDS 的小图，例如 `images/award-placeholder.svg`；可把自己的图片放进 `dist/images/` 再改路径
- `awardsText`：详情页 AWARDS 图片下的文字
- `sections`：详情页下方的部分。修改每项的 `title` 可改标题；布达拉宫项目的 `image` 可替换对应的大卡片图片，图片先放进 `dist/images/`。其他项目目前保留网格占位，`cards` 控制每个部分的占位卡片数量。
- `description`：项目列表卡片简介
- `image`：封面图片路径，例如 `images/project-01.jpg`；图片放在 `dist/images/`

保存后刷新网页即可看到变化。布达拉宫详情页目前每个部分各有一张空白大卡片；其他五个项目先保留原有的多卡片网格，后续可分别调整。

布达拉宫详情页下方部分标题的字号在 `dist/styles.css` 的 `.project-detail-page--potala .project-case-section h2` 规则中修改 `font-size:clamp(24px,2.7vw,35px)`。其中 `24px` 是最小字号，`2.7vw` 随浏览器宽度变化，`35px` 是最大字号。布达拉宫标题后面的珊瑚色方块大小可在紧随其后的 `.project-detail-page--potala .project-case-section h2::before` 规则中修改 `width` 和 `height`；默认颜色定义在 `.project-case-section h2::before` 的 `background` 中。
