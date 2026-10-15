// 修改引号中的文字，保存后刷新网页即可。
// 封面图片放入 dist/images/，再将 image 改成 "images/文件名.jpg"。
window.portfolioContent = {
  name: "Zhiwen Yang",
  home: {
    eyebrow: "个人作品集 / 精选项目",
    title: "Zhiwen Yang.",
    intro: "这里展示我的项目、想法与设计实践。欢迎通过顶部导航了解我的作品与经历。",
    cta: "查看项目"
  },
  projects: {
    title: "Selected Projects.",
    intro: "以下是六个项目的位置。你可以逐个替换封面、标题、项目类型和简介。",
    items: [
      { title: "Project One", type: "项目类型待填写", description: "用一两句话介绍项目背景、你的工作和成果。", image: "" },
      { title: "Project Two", type: "项目类型待填写", description: "用一两句话介绍项目背景、你的工作和成果。", image: "" },
      { title: "Project Three", type: "项目类型待填写", description: "用一两句话介绍项目背景、你的工作和成果。", image: "" },
      { title: "Project Four", type: "项目类型待填写", description: "用一两句话介绍项目背景、你的工作和成果。", image: "" },
      { title: "Project Five", type: "项目类型待填写", description: "用一两句话介绍项目背景、你的工作和成果。", image: "" },
      { title: "Project Six", type: "项目类型待填写", description: "用一两句话介绍项目背景、你的工作和成果。", image: "" }
    ]
  },
  about: { title: "About Me.", lead: "你好，我是 Zhiwen Yang。", body: "这里可以写你的背景、关注的设计领域，以及你希望通过作品表达的观点。", note: "这部分目前是占位文字，等你提供个人介绍后即可替换。" },
  resume: { title: "Resume.", lead: "我的经历与能力", body: "这里可以填写教育经历、工作经历、技能和获得的认可。", note: "简历文件准备好后，可将其放入 dist/files/，并在此页添加下载链接。" },
  connect: { title: "Connect.", lead: "期待与你交流。", body: "欢迎就项目合作、工作机会或设计想法联系我。", note: "请在这里填写你的邮箱和社交平台链接。" }
};
