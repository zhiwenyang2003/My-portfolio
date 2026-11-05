// 修改引号中的文字，保存后刷新网页即可。
// 封面图片放入 dist/images/，再将 image 改成 "images/文件名.jpg"。
window.portfolioContent = {
  name: "Zhiwen Yang",
  home: {
    profileImage: "images/profile.jpg",
    phone: "13703580114",
    email: "upupup147536@outlook.com",
    title: ["Hello!", "I'm Zhiwen Yang."],
    projectTypes: ["#UX/UI Design", "#User Research", "#Branding", "#Packaging design", "#Using Al as Tools"],
    tools: [
      { name: "Photoshop", mark: "Ps" }, { name: "Illustrator", mark: "Ai" }, { name: "After Effects", mark: "Ae" },
      { name: "Figma", mark: "F" }, { name: "Blender", mark: "B" }, { name: "即梦", mark: "即" },
      { name: "Midjourney", mark: "Mj" }, { name: "ChatGPT", mark: "✳" }, { name: "Gemini", mark: "✦" }, { name: "Liblib", mark: "L" }
    ],
    intro: [
      "我叫杨智雯，陕西科技大学视觉传达设计本科生，前六学期绩点4.1/5且专业排名1/70，曾获国家奖学金及多项国家级设计赛事奖项。在学习期间通过多个课题切入UI界面设计、交互系统的全流程，体会到“视觉为功能服务”的核心价值，因此坚定地将职业规划聚焦于UI/UX交互设计及数字化体验方向。",
      "独立主导完成多个端到端设计项目，擅长利用双钻石模型与用户旅程分析驱动设计决策。在智慧导览UI项目中，针对空间信息过载与特殊生理环境开展实地访谈与痛点挖掘，独立搭建全套Figma组件库，构建2.5D多层级地图、卡片式布局与健康预警交互系统，实现“调研-原型-视觉-交互规范”的完整闭环。已通过英语六级，具备顺畅阅读英文交互规范与技术文档能力，拥有较强的逻辑拆解力与跨学科协作韧性。"
    ],
    cta: "查看项目"
  },
  // 每个项目的卡片与详情页文字都在同一个对象中修改，保存后刷新网页即可。
  // title=名称，subtitle=详情副标题，type=项目类型。多个类型用顿号、逗号或 | 分隔；页面会自动排版，不用手动换行。
  // about=详情介绍，awardsText=获奖文字，awardsImage=获奖小图片。
  // description=列表卡片简介，image=列表封面图片。
  // sections=详情页下方各部分；title 是标题，cards 是旧版占位卡片数量，image 是布达拉宫单张大卡片图片路径。
  projects: {
    title: "Selected Projects.",
    items: [
      {
        layout: "potala", // 布达拉宫专属详情页版式
        title: "布达拉宫智慧导览平台", // 项目名称
        subtitle: "有关探索布达拉宫智慧导览的UI设计", // 详情副标题
        type: "#UI设计、#云端祈福、#地图导航", // 卡片上的项目类型，同时显示在详情页 TYPE 下
        time: "2026.01-2026.02", // 详情页 TIME 下的文字
        about: "本项目针对布达拉宫复杂垂直空间导致的“空间迷失感”，为中青年群体打造了一套集“可视化、安全性、趣味性”于一体的数字化导览交互方案。在可视化层面，利用2.5D分层轴测地图视觉解构重叠的建筑层级，配合“足迹点亮”交互，将宏大的空间探索转化为直观的进度成就感。针对高海拔环境下的安全性需求，系统采用非侵入式交互，在不打扰游览的同时，仅在监测到连续攀爬15分钟时于界面触发红字休息预警，精准平衡了游览沉浸感与生理保护。项目核心基于认知-情感理论，构建“先游览，后祈福”的行为路径，通过数字化转经筒交互将实地共鸣转化为长效的精神寄托，实现了世界文化遗产在高情感价值维度的数字化转译，有效解决了目前导览系统在信息感知与情感连接上的供给不足。",
        awardsImage: "images/awards1.png", // 可替换为自己的获奖图片
        awardsText: "蓝桥杯  省级三等奖\n好创意大赛  优秀奖\n未来设计师  省级三等奖\n西部国际设计双年展  入围奖", // 每行一项获奖内容
        definitionImage: "images/design-definition.webp", // 右侧大卡片图片；图片放入 images 文件夹后填写路径
        // 布达拉宫详情页新增的三个展示模块图片
        showcaseSections: [
          { title: "HI- FIDELITY", image: "images/potala-hi-fidelity.webp" },
          { title: "UI DESIGN", image: "images/potala-ui-design.png" },
          { title: "TOUCHPOINT", image: "images/potala-touchpoint.webp" }
        ],
        sections: [
          { title: "BACKGROUND  RESEARCH", image: "images/background-research.png", cards: 1 },
          { title: "USER  INTERVIEW", image: "images/user-interview.png", cards: 1 },
          { title: "INSIGHT", image: "", cards: 1 }
        ],
        designSections: [
          { title: "DESIGN GOALS", image: "images/design-goals.png" },
          { title: "PERFECT TOUR GUIDE APP", image: "images/perfect-tour-guide-app.png" },
          { title: "APP FUNCTION DESIGN & PROTOTYPE", image: "images/app-function-design-prototype.webp" }
        ],
        description: "专为高海拔纵向建筑打造，通过2.5D分层地图、高反安全预警与“云端祈福”，解决迷路痛点并引发年轻人的情感共鸣。", // 项目简介
        image: "images/project-potala.webp" // 项目列表封面
      },
      {
        layout: "kongkong", // 空空项目独立排版
        title: "《空空》",
        subtitle: "有关保护生物多样性的科普绘本读物",
        type: "#IP设计、#书籍设计、#周边设计、#环保理念",
        time: "2025.07-2025.08",
        about: "《空空》是一本从过度捕捞切入，科普保护生物多样性重要性的绘本读物。我以纽芬兰渔场这一典型案例为原型，讲述了无节制的捕捞最终导致渔场枯竭、生态破坏，渔民失业、渔场关闭。这场危机中，人类、生物与环境皆为输家，长远看无人受益。书名《空空》既指向资源耗尽的现实，也隐喻过度索取后的虚无。通过“空网—空海”的画面递进，把过度捕捞的后果直观呈现，让读者在阅读中自然意识到海洋资源并非取之不尽。",
        awardsImage: "images/awards-kongkong.png",
        awardsText: "米兰设计周  省级二等奖\n西部国际设计双年展  入围奖",
        sections: [
          { title: "前期调研", image: "images/kongkong-research.webp" },
          { title: "设计目标", image: "images/kongkong-design-goals.png" },
          { title: "情绪版", image: "images/kongkong-moodboard.webp" },
          { title: "草图", image: "images/kongkong-sketch.png" },
          { title: "故事板", image: "images/kongkong-storyboard.webp" },
          { title: "角色设计", image: "images/kongkong-character-design.png" },
          { title: "设计规范", image: "images/kongkong-design-guidelines.png" },
          { title: "效果图", image: "images/kongkong-effects.webp" },
          { title: "书籍内页设计" },
          { title: "周边设计", image: "images/kongkong-merchandise.webp" },
          { title: "信息可视化设计", image: "images/kongkong-infographic.webp" }
        ],
        description: "以“过度捕捞”切入，结合反差感绘本、数据图表与3D海底打卡展厅，实现从儿童共鸣到公众反思的环保科普。",
        image: "images/project-kongkong.webp"
      },
      {
        layout: "newfoundland",
        title: "万鱼之寂",
        subtitle: "有关探索纽芬兰渔场兴衰始末的展示设计",
        type: "#展示设计、#环保理念",
        time: "2025.10-2025.12",
        about: "本项目以加拿大纽芬兰渔场的生态兴衰历程为叙事蓝本，针对亲子家庭与青少年群体，构建了沉浸式科普展示空间。设计依托用户体验地图，以“沉浸序厅—捕捞与破损—见证三条鱼—纽芬兰故事—互动尾厅”为空间动线。通过图文信息板、三维实体模型、分层悬吊与交互式展台等多模态展示媒介，深度解构过度捕捞对海洋生态链造成的不可逆创伤。全展以层级递进的情感曲线驱动观展体验，引导受众从对自然造物的感知敬畏，走向对海洋生物多样性保护的理性行动与责任共建。",
        awardsImage: "images/awards-newfoundland.png",
        awardsText: "好创意大赛  省级一等奖",
        sections: [
          { title: "策展报告", image:  "images/newfoundland-curatorial-report.webp", cards: 1, ratio: 0.96 },
          { title: "设计介绍", image: "images/newfoundland-design-introduction.webp", cards: 1, ratio: 0.455 }
        ],
        description: "将平面海洋科普转译为三维体验，通过3D鱼类模型悬挂与深海层叠打卡背景板，打造沉浸式且具社交传播属性的科普展厅。",
        image: "images/project-newfoundland.webp"
      },
      {
        layout: "herbal",
        title: "本草序",
        subtitle: "基于东方草本文化的中草药种子品牌设计",
        type: "#纹样设计、#品牌设计、#传承创新",
        time: "2025.06-2025.09",
        about: "《本草序》是一个以东方草本文化为灵感的中草药种子品牌。品牌以党参、百合、连翘、金银花、益母草与当归六种草药为核心，呈现它们从种子萌发到盛放成熟的生命历程。设计以“生长·平衡·和合”为核心理念，将自然疗愈与东方美学融合，展现草木的生命节奏与四时之道。\n\n视觉语言融合中国传统纹样与现代设计手法，运用藻井、团花等对称结构，象征生命的循环与秩序。整体风格清雅而富层次，兼具文化底蕴与当代审美。《本草序》希望通过中草药种子的视觉化叙事，传递人与自然共生的东方精神，让生命的治愈力量在每一次萌芽中被重新感知。",
        awardsImage: "images/awards-herbal.png",
        awardsText: "蓝桥杯  国家级一等奖\n蓝桥杯  省级一等奖\n米兰设计周  省级三等奖\n未来设计师  省级三等奖\n西部国际设计双年展  入围奖",
        sections: [
          { title: "背景调研", image: "images/herbal-background-research.webp", detailImage: "images/herbal-background-research-detail.webp", cards: 1, ratio: 2.05 },
          { title: "设计过程", image: "images/herbal-design-process.webp", cards: 1, ratio: 0.76 },
          { title: "草药生长图鉴", image: "images/atlas-background.png", cards: 1, ratio: 2.35 },
          { title: "设计完整展示", image: "images/herbal-full-showcase.webp", cards: 1, ratio: 2.35 },
          { title: "设计规范", image: "images/herbal-design-guidelines.png", cards: 1, ratio: 1.2 },
          { title: "包装刀版图", image: "images/herbal-packaging-dieline.webp", cards: 1, ratio: 0.95 },
          { title: "效果图", image: "images/herbal-mockups.webp", cards: 1, ratio: 1.25 }
        ],
        description: "从“种子”切入，将草本生长特征重构为藻井万花筒纹样，搭配环保纸浆盒型，打造年轻化的自然疗愈包装。",
        image: "images/project-herbal.webp"
      },
      {
        layout: "huangling",
        title: "面说黄陵",
        subtitle: "基于民俗符号日常转译的黄陵面花创新包装设计",
        type: "#包装设计、#简易互动、#可持续设计",
        time: "2026.05-2026.06",
        about: "本项目聚焦于国家级非物质文化遗产“黄陵面花”的日常化转译与包装活化设计。传统面花因体量庞大、仪式重度，难以融入现代年轻家庭的消费场景。本设计打破传统礼器的束缚，以“全生命周期”为核心设计理念，在产品端实现微型适口化改动；在包装端引入“一盒多用”的再生结构，使其在面花食用后，能通过亲子手作蜕变为家具摆件，实现从“开启、享用、拆解、再造”到“点亮”的五步完整行为闭环。",
        awardsImage: "images/awards-huangling.png",
        awardsText: "西部国际设计双年展  入围奖",
        sections: [
          { title: "BACKGROUND RESEARCH", image: "images/huangling-background-research.webp", width: "half", ratio: 0.8522 },
          { title: "USER INTERVIEW", image: "images/huangling-user-interview.png", width: "half", ratio: 0.8669 },
          { title: "PERSONA", image: "images/huangling-persona.png", width: "half", ratio: 1.8940 },
          { title: "ANALYSIS SUMMARY", image: "images/huangling-analysis-summary.png", width: "half", ratio: 1.8974 },
          { title: "PRODUCT IDEATION", image: "images/huangling-product-ideation.webp", ratio: 1.9853 },
          { title: "DESIGN DESCRIPTION", image: "images/huangling-design-description.png", ratio: 4.8935, tone: "cream" },
          { title: "VISUAL GUIDELINE", image: "images/huangling-visual-guideline.png", ratio: 2.3823 },
          { title: "OUTER PACKAGING", image: "images/huangling-outer-packaging.webp", ratio: 2.0102 },
          { title: "USER GUIDE", image: "images/huangling-user-guide.png", ratio: 4.8875 },
          { title: "RENDERINGS", image: "images/huangling-renderings.webp", ratio: 2.6962 }
        ],
        description: "采用“六棱柱错层结构”与“一盒多用”设计，让空盒通过亲子手作变为非遗花灯，将传统礼仪转化为日常亲子陪伴。",
        image: "images/project-huangling.webp"
      },
      {
        layout: "dali-embroidery",
        title: "《锦绣大荔》",
        subtitle: "有关大荔刺绣纹样的书籍装帧设计",
        type: "#书籍设计、#民俗文化、#非遗传承",
        time: "2025.10-2025.12",
        about: "本项目以陕西省大荔县的传统民间刺绣为核心调研对象。大荔刺绣作为黄河流域艺术的瑰宝，以其“粗犷与精巧并存”的独特审美著称，不仅是农耕生活的缩影，更承载着数千年华夏文明的审美根源。\n\n书籍设计围绕“一生万相”的哲学核心展开，系统梳理了从制作技艺、作品赏析到创作源头的完整脉络。内容涵盖了护佑孩童的年俗刺绣、见证“十里红妆”的婚俗刺绣，以及慎终追远的丧俗刺绣等生命礼仪图谱，还原了关中女性“以针为笔，以线寄情”的民俗传统。\n\n在装帧形式上，主书采用古线装结合创意拉页，将读者视角从宏观的纷繁绣面切换至微观的针线细节，寓意华丽绣品均植根于质朴工具与漫长光阴。配套经折装小书《荔绣微赏》则通过连绵的视觉序列，使传统非遗在方寸开合间焕发现代审美新生。",
        awardsImage: "images/awards-dali.png",
        awardsText: "米兰设计周  省级三等奖\n未来设计师  省级二等奖",
        sections: [
          { title: "书籍介绍", titleImage: "images/Group 1597882048.png", image: "images/dali-book-introduction.png", area: "book-intro", ratio: 7 },
          { title: "书籍信息", titleImage: "images/Group 1597882049.png", image: "images/dali-book-information.png", area: "book-info", ratio: 2.36 },
          { title: "发展历史", titleImage: "images/Group 1597882050.png", image: "images/dali-development-history.png", area: "history", ratio: 0.45 },
          { title: "设计背景", titleImage: "images/Group 1597882051.png", image: "images/dali-design-background.webp", area: "design-background", ratio: 1.22 },
          { title: "封面&内页展示", titleImage: "images/Group 1597882037.png", image: "images/dali-cover-inner-pages.webp", area: "cover-pages", ratio: 0.79 },
          { title: "小书展示", titleImage: "images/Group 1597882052.png", image: "images/dali-small-book-display.webp", area: "small-book", ratio: 3.04 },
          { title: "实物展示", titleImage: "images/Group 1597882053.png", image: "images/dali-physical-display.webp", area: "physical-display", ratio: 1.77 }
        ],
        description: "采用“古法线装大书+经折装小书”的复合结构，搭配矢量纹样与高饱和玫红视觉，实现陕西地方非遗的活态传承。",
        image: "images/project-dali.webp"
      }
    ]
  },
  about: { title: "About Me.", lead: "你好，欢迎来到我的作品集。", body: "这里可以写你的背景、关注的设计领域，以及你希望通过作品表达的观点。", note: "这部分目前是占位文字，等你提供个人介绍后即可替换。" },
  resume: {
    title: "Resume.",
    location: "山西太原",
    education: "陕西科技大学 · 设计与艺术学院",
    major: "视觉传达设计",
    gpa: "4.1 / 5.0",
    rank: "1 / 70",
    english: "CET-4 483 · CET-6 461",
    skills: ["Photoshop", "Illustrator", "After Effects", "Figma", "Blender", "Gemini", "ChatGPT", "Midjourney", "Liblib", "即梦"],
    strengths: ["专业基础扎实", "专注且有韧性", "兼具创意与共情", "严谨的逻辑"],
    summary: "视觉传达设计专业，具备品牌视觉、文化遗产数字化、科普叙事与包装设计的项目实践。曾作为项目负责人完成从调研、概念构建到视觉系统与落地呈现的完整设计过程。",
    projects: [
      { title: "海洋生物多样性保护——从平面到空间", role: "项目负责人", bullets: ["独立完成 28 页科普绘本，以现代视觉语言重构海洋保护叙事。", "打造原创鱼类 IP，并使用 Blender 完成 3D 建模，为空间呈现提供视觉资产。", "将视觉元素延展至线下沉浸式展示，升级从平面到空间的感官体验。"] },
      { title: "本草序——东方种子品牌视觉体系设计", role: "项目负责人", bullets: ["结合本草文化与“自然疗愈”理念，平衡东方美学与当代品牌叙事。", "数字化重构敦煌藻井纹样，融合古典韵味与现代审美。", "完成 Logo、Slogan 与系列包装设计，建立统一的品牌视觉形象。"] },
      { title: "布达拉宫智慧导览平台——数字化赋能文化遗产", role: "项目负责人", bullets: ["通过用户调研梳理高客流与复杂建筑空间中的游览痛点，构建可视化、趣味性与安全性并重的导览逻辑。", "引入 2.5D 分层地图与实时数据可视化，优化宫殿空间导引，并整合高原环境预防监测功能。", "设计“云端祈福”情感模块，让地域文化从线上交互延伸至沉浸体验。"] },
      { title: "面说黄陵——黄陵面花创新包装设计", role: "项目负责人", bullets: ["解构黄陵传统非遗符号并将其日常化，完成传统符号的年轻化重构。", "引入低门槛亲子手作材料包，让儿童在无工具负担的体验中产生代际情感连接。", "将包装设计延展至生命周期末端，使包装在完成食品保护后转化为新中式明灯。"] }
    ],
    awards: [
      "国家奖学金（前 0.5%）、林溪奖学金（前 2%）、校一等学业奖学金（前 3%）",
      "蓝桥杯：国家级一等奖、省级一等奖及三等奖",
      "米兰设计周：国家级三等奖、省级二等奖及三等奖",
      "未来设计师：省级二等奖、三等奖；好创意：省级一等奖及优秀奖",
      "时报金犊优秀奖、西部国际设计双年展入围奖"
    ],
    research: "2026 年《Highlights in Business, Economics and Management》独立作者。研究以 Midjourney 与 ChatGPT 为基础，设计 2×2 对照实验，对比 4 种生成路径与 8 项指标，探讨 AIGC 在敦煌藻井纹样设计中的应用。",
    strengthsNote: "专业基础扎实 · 专注且有韧性 · 兼具创意与共情 · 严谨的逻辑"
  },
  connect: { title: "Connect.", lead: "期待与你交流。", body: "欢迎就项目合作、工作机会或设计想法联系我。", note: "请在这里填写你的邮箱和社交平台链接。" }
};
