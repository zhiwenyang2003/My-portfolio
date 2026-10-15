# 作品集文字修改说明

所有可替换的文字集中在 `dist/content.js`。用记事本或代码编辑器打开，修改引号中的文字，保存后刷新网页即可。

- `home`：首页的大标题、中文介绍、按钮文字。
- `projects.title`：项目页英文大标题。
- `projects.items`：六个项目，按顺序对应六张卡片。每张卡片的 `title` 是英文项目标题，`type` 和 `description` 是中文文字。
- `about`、`resume`、`connect`：三个独立页面的文字。
- `name`：左上角姓名。

要替换项目封面，把图片放入 `dist/images/`，然后修改对应项目的 `image`，例如 `image: "images/project-01.jpg"`。建议使用横向图片。

修改时保留英文引号、逗号和花括号。若文字里需要输入英文双引号，请写成 `\"`。

首页：`dist/index.html`；其他页面：`dist/projects.html`、`dist/about.html`、`dist/resume.html`、`dist/connect.html`。

字体使用电脑中已安装的 DIN Next Devanagari Std 与阿里巴巴普惠体，通过 CSS 的本地字体名称加载。其他访客的电脑若未安装，浏览器会使用后备字体。若未来要让所有访客看到完全相同的字形，需要确认 DIN 的网页嵌入许可并配置授权的网页字体文件。
