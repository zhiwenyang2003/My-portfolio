const data=window.portfolioContent,page=document.body.dataset.page||'home',app=document.getElementById('app'),navPage=page==='project'?'projects':page;
const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const projectTypeTags=value=>String(value??'').split(/[、，,|]/).map(tag=>tag.trim()).filter(Boolean);
const projectMedia=(src,alt,extra='')=>`<div class="project-section-card${extra?' '+extra:''}">${src?`<img src="${esc(src)}" alt="${esc(alt)} 项目内容" loading="lazy" decoding="async">`:'<div class="project-placeholder" aria-label="图片占位"></div>'}</div>`;
const potalaOriginalSections=item=>{
  const sections=item.sections||[],designSections=item.designSections||[];
  return sections.map((entry,index)=>`<section class="project-case-section"><h2>${esc(entry.title)}</h2>${entry.title==='INSIGHT'?'':projectMedia(entry.image,entry.title,'project-section-card--'+(index+1))}</section>`).join('')+
    `<div class="potala-design-layout"><section class="project-case-section potala-design-goals"><h2>${esc(designSections[0]?.title||'Design goals')}</h2>${projectMedia(designSections[0]?.image,designSections[0]?.title||'Design goals')}</section><section class="project-case-section potala-perfect-tour"><h2>${esc(designSections[1]?.title||'Perfect tour guide app')}</h2>${projectMedia(designSections[1]?.image,designSections[1]?.title||'Perfect tour guide app')}</section>${projectMedia(item.definitionImage,'Design definition','potala-design-definition')}<section class="project-case-section potala-app-function"><h2>${esc(designSections[2]?.title||'APP Function Design & Prototype')}</h2>${projectMedia(designSections[2]?.image,designSections[2]?.title||'APP Function Design & Prototype')}</section></div>`;
};
const potalaShowcase=item=>{
  const sections=item.showcaseSections||[
    {title:'HI- FIDELITY',image:''},
    {title:'UI DESIGN',image:''},
    {title:'TOUCHPOINT',image:''}
  ];
  const section=(entry,extra='')=>`<section class="project-case-section${extra?' '+extra:''}"><h2>${esc(entry.title)}</h2>${projectMedia(entry.image,entry.title,'potala-followup-card')}</section>`;
  return section(sections[0]||{title:'HI- FIDELITY',image:''},'potala-followup-hi')+
    '<div class="potala-followup-pair">'+sections.slice(1,3).map(entry=>section(entry)).join('')+'</div>';
};
const kongkongSections=sections=>{
  const section=(index,area)=>`<section class="project-case-section kongkong-section kongkong-${area}"><h2>${esc(sections[index]?.title||'')}</h2>${projectMedia(sections[index]?.image,sections[index]?.title||'',`kongkong-card kongkong-card--${area}${sections[index]?.image?' kongkong-card--image':''}`)}</section>`;
  const book=index=>'<section id="kongkong-book" class="project-case-section kongkong-section kongkong-book"><h2>'+esc(sections[index]?.title||'')+'</h2>'+
    '<div class="kongkong-book-reader" data-book-reader data-mode="showcase"><div class="book-stage" tabindex="0" role="group" aria-label="书籍展示：移动鼠标轻微调整视角，点击纸页展开阅读">'+
    '<button class="book-nav book-previous" type="button" aria-label="上一页" disabled><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m14 6-6 6 6 6"/></svg></button>'+
    '<div class="book-model"><div class="book-showcase">'+Array.from({length:15},(_,i)=>{const front=i===0?0:i*2,back=i===14?29:i*2+1,angle=-180+i*24;const image=n=>n===0?'images/book-pages/cover.png':n===29?'images/book-pages/back-cover.png':'images/book-pages/previews/page-'+String(n).padStart(2,'0')+'.webp';const name=n=>n===0?'封面':n===29?'封底':'第 '+String(n).padStart(2,'0')+' 页';return '<button type="button" class="book-fan-leaf" style="--leaf-angle:'+angle+'deg" data-base-angle="'+angle+'" data-book-front="'+front+'" data-book-back="'+back+'" aria-label="展开'+name(front)+'或'+name(back)+'"><img class="book-leaf-front" src="'+image(front)+'" alt="'+name(front)+'预览" loading="lazy" decoding="async" draggable="false"><img class="book-leaf-back" src="'+image(back)+'" alt="" aria-hidden="true" loading="lazy" decoding="async" draggable="false"></button>'}).join('')+'</div>'+
    '<div class="book-open-spread" hidden><button class="book-page book-page--left" type="button" aria-label="点击左页向前翻"><img alt="左页" loading="lazy" decoding="async" draggable="false"></button><button class="book-page book-page--right" type="button" aria-label="点击右页向后翻"><img alt="右页" loading="lazy" decoding="async" draggable="false"></button><div class="book-turn-leaf" hidden aria-hidden="true"><img class="book-turn-front" alt="" loading="lazy" decoding="async" draggable="false"><img class="book-turn-back" alt="" loading="lazy" decoding="async" draggable="false"></div></div></div>'+
    '<button class="book-nav book-next" type="button" aria-label="下一页"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m10 6 6 6-6 6"/></svg></button></div>'+
    '<div class="book-reader-controls"><span class="book-hint">移动鼠标调整视角 · 点击纸页展开</span><span class="book-position" role="status" aria-live="polite">预览 · 内页 01–28</span><button class="book-return" type="button" hidden>返回展开预览</button></div></div></section>';
  return `<div class="kongkong-layout">${section(0,'research')}<div class="kongkong-middle">${section(1,'goals')}${section(2,'mood')}${section(3,'sketch')}</div>${section(4,'storyboard')}<div class="kongkong-bottom">${section(5,'character')}${section(6,'guidelines')}</div><div class="kongkong-color-stack"><section class="kongkong-color-panel kongkong-charcoal-panel">${section(7,'effects')}${book(8)}${section(9,'merchandise')}</section><section class="kongkong-color-panel kongkong-navy-panel">${section(10,'visualization')}</section></div></div>`;
};
const herbalSections=sections=>{
  const card=(src,title,extra='')=>src?`<div class="herbal-card${extra?' '+extra:''}"><img src="${esc(src)}" alt="${esc(title)}" loading="lazy" decoding="async"></div>`:`<div class="project-placeholder herbal-card${extra?' '+extra:''}" role="img" aria-label="${esc(title)} 图片占位"></div>`;
  const atlas=()=>{
    // Coordinates on the background's 2048 x 864 display plane.
    // Each plant: fixed photo anchor, final motif centre/diameter, small elements.
    const groups=[
      ['honeysuckle','金银花','#ee9768',[
        [65,350,105,127,76,[[111,222,30]]],
        [216,350,250,97,94,[[255,185,30],[252,263,30]]],
        [374,350,418,169,88,[[424,246,30]]],
        [522,350,569,82,96,[[578,199,45]]]]],
      ['forsythia','连翘','#e6af28',[
        [819,350,866,198,78,[[868,269,30]]],
        [968,350,1009,91,98,[[1009,180,28],[1008,258,35]]],
        [1128,350,1157,135,90,[[1178,225,35],[1161,292,24]]],
        [1276,350,1320,85,98,[[1330,203,31]]]]],
      ['angelica','当归','#7098e0',[
        [1554,350,1579,195,87,[[1596,265,30]]],
        [1702,350,1743,93,99,[[1734,215,29]]],
        [1863,350,1925,150,104,[[1940,229,33]]],
        [2011,350,2035,74,88,[[2028,168,32]]]]],
      ['codonopsis','党参','#8fb440',[
        [65,795,112,636,83,[[115,701,29]]],
        [216,795,285,592,104,[[256,679,30]]],
        [374,795,424,546,103,[[425,641,37]]],
        [522,795,585,543,98,[[574,664,30]]]]],
      ['lily','百合','#e58abc',[
        [819,795,866,595,94,[[865,683,35]]],
        [968,795,1007,535,108,[[1006,623,40],[1000,705,30]]],
        [1128,795,1160,532,99,[[1178,651,39]]],
        [1276,795,1303,583,94,[[1320,671,39],[1306,733,29]]]]],
      ['motherwort','益母草','#b38bdb',[
        [1554,795,1598,590,94,[[1597,719,32]]],
        [1702,795,1728,534,106,[[1750,645,32]]],
        [1863,795,1925,524,121,[[1940,640,43]]],
        [2011,795,2035,615,92,[[2028,699,31]]]]]
    ];
    // Smooth reference arcs; endpoints follow the PNG alpha silhouette.
    // Regenerate with node portfolio-site/build-herbal-stems.cjs.
    const stemGeometry={
      "honeysuckle-01": [
        "M 65 350 L 65 257 Q 65 192.36 82.122 156.656",
        "M 65 291 Q 65 241.313 106.297 223.838"
      ],
      "honeysuckle-02": [
        "M 216 350 L 216 226 Q 216 164.7 229.292 129.625",
        "M 216 284 Q 216 217.375 246.58 191.116",
        "M 216 329 Q 216 286.778 241.508 268.873"
      ],
      "honeysuckle-03": [
        "M 374 350 L 374 279 Q 374 207.689 406.015 177.998",
        "M 374 319 Q 374 270.621 412.019 251.107"
      ],
      "honeysuckle-04": [
        "M 522 350 L 522 230 Q 522 155.032 542.878 114.252",
        "M 522 282 Q 522 224.991 567.739 203.234"
      ],
      "forsythia-01": [
        "M 819 350 L 819 289 Q 819 243.354 839.473 218.321",
        "M 819 327 Q 819 287.108 859.132 271.917"
      ],
      "forsythia-02": [
        "M 968 350 L 968 215 Q 968 155.487 984.35 121.689",
        "M 968 284 Q 968 210.967 1003.005 184.106",
        "M 968 330 Q 968 283.16 997.309 263.753"
      ],
      "forsythia-03": [
        "M 1128 350 L 1128 252 Q 1128 189.2 1142.465 156.747",
        "M 1128 308 Q 1128 254.272 1164.274 231.855",
        "M 1128 340 Q 1128 306.502 1155.825 294.05"
      ],
      "forsythia-04": [
        "M 1276 350 L 1276 224 Q 1276 156.998 1293.7 119.072",
        "M 1276 284 Q 1276 226.287 1323.461 205.595"
      ],
      "angelica-01": [
        "M 1554 350 L 1554 283 Q 1554 247.353 1561.102 224.706",
        "M 1554 326 Q 1554 287.475 1583.004 270.854"
      ],
      "angelica-02": [
        "M 1702 350 L 1702 230 Q 1702 162.218 1719.376 124.627",
        "M 1702 300 Q 1702 246.124 1724.258 222.991"
      ],
      "angelica-03": [
        "M 1863 350 L 1863 255 Q 1863 209.295 1883.339 181.5",
        "M 1863 312 Q 1863 254.25 1927.537 232.675"
      ],
      "angelica-04": [
        "M 2011 350 L 2011 224 Q 2011 138.87 2024.383 97.237",
        "M 2011 286 Q 2011 206.902 2024.225 175.538"
      ],
      "codonopsis-01": [
        "M 65 795 L 65 733 Q 65 688.234 82.331 662.067",
        "M 65 773 Q 65 724.532 104.228 705.437"
      ],
      "codonopsis-02": [
        "M 216 795 L 216 708 Q 216 649.352 246.536 617.398",
        "M 216 768 Q 216 709.458 245.964 685.583"
      ],
      "codonopsis-03": [
        "M 374 795 L 374 677 Q 374 618.235 391.42 583.202",
        "M 374 742 Q 374 674.183 413.809 647.361"
      ],
      "codonopsis-04": [
        "M 522 795 L 522 674 Q 522 601.271 555.619 564.894",
        "M 522 749 Q 522 689.293 566.42 667.344"
      ],
      "lily-01": [
        "M 819 795 L 819 712 Q 819 640.753 849.174 608.565",
        "M 819 769 Q 819 710.552 855.785 687.865"
      ],
      "lily-02": [
        "M 968 795 L 968 667 Q 968 598.682 986.087 562.197",
        "M 968 731 Q 968 667.552 990.706 637.662",
        "M 968 779 Q 968 729.72 992.57 709.985"
      ],
      "lily-03": [
        "M 1128 795 L 1128 672 Q 1128 599.382 1142.906 560.675",
        "M 1128 747 Q 1128 685.13 1163.955 659.158"
      ],
      "lily-04": [
        "M 1276 795 L 1276 708 Q 1276 640.122 1289.784 605.428",
        "M 1276 765 Q 1276 703.99 1308.09 678.629",
        "M 1276 789 Q 1276 751.302 1299.537 736.451"
      ],
      "motherwort-01": [
        "M 1554 795 L 1554 713 Q 1554 656.748 1569.933 623.657",
        "M 1554 781 Q 1554 740.135 1586.341 723.519"
      ],
      "motherwort-02": [
        "M 1702 795 L 1702 674 Q 1702 610.346 1711.305 572.748",
        "M 1702 748 Q 1702 675.689 1742.959 649.081"
      ],
      "motherwort-03": [
        "M 1863 795 L 1863 672 Q 1863 607.155 1883.606 567.888",
        "M 1863 746 Q 1863 675.087 1922.663 646.883"
      ],
      "motherwort-04": [
        "M 2011 795 L 2011 730 Q 2011 674.064 2020.83 642.622",
        "M 2011 783 Q 2011 729.582 2022.903 706.746"
      ]
    };
    const rings=(x,y,size,isDetail)=>{
      const radii=isDetail?[.39,.57,.76]:[.34,.45,.56,.67,.78];
      const widths=isDetail?[2.2,1.5,.9]:[3.1,2.6,2.1,1.6,1.15];
      const fades=isDetail?[.66,.40,.19]:[.9,.74,.57,.4,.24];
      return radii.map((radius,i)=>'<circle cx="'+x+'" cy="'+y+'" r="'+(size*radius)+'" fill="none" stroke="currentColor" stroke-width="'+widths[i]+'" opacity="'+fades[i]+'"/>').join('');
    };
    const parts=groups.flatMap(([key,name,color,plants])=>plants.map(([bx,by,fx,fy,size,small],i)=>{
      const number=String(i+1).padStart(2,'0'),base='images/herbal-atlas/'+key+'-'+number;
      const files=key==='lily'&&i===3?['detail-0','detail-2']:small.map((_,j)=>'detail-'+String(j+1).padStart(2,'0'));
      const plantKey=key+'-'+number;
      const stems=stemGeometry[plantKey].map(d=>'<path d="'+d+'"/>').join('');
      const motif=(x,y,s,file,isDetail)=>'<g class="atlas-motif"><g class="atlas-ring-set">'+rings(x,y,s,isDetail)+'</g><image href="'+file+'" x="'+(x-s/2)+'" y="'+(y-s/2)+'" width="'+s+'" height="'+s+'" preserveAspectRatio="xMidYMid meet"/></g>';
      return '<g data-atlas-plant data-anchor-x="'+bx+'" data-anchor-y="'+by+'" data-crown-x="'+fx+'" data-crown-y="'+fy+'" style="color:'+color+'"><title>'+name+'第'+(i+1)+'株</title><g class="atlas-stems">'+stems+'</g>'+motif(fx,fy,size,base+'-final.png',false)+small.map(([x,y,s],j)=>motif(x,y,s,base+'-'+files[j]+'.png',true)).join('')+'</g>';
    })).join('');
    return '<div class="herbal-atlas" data-herbal-atlas role="img" aria-label="六种草药的交互生长图鉴，移动鼠标使植物随风摆动"><svg class="atlas-artwork" viewBox="0 0 2112 864" aria-hidden="true"><g transform="scale(.99158653846 1)">'+parts+'</g></svg><img class="herbal-atlas-background" src="images/atlas-background.png" alt="" loading="lazy" decoding="async"></div>';
  };
  const section=(index,area,extra='')=>`<section class="herbal-section herbal-${area}${extra?' '+extra:''}"><h2>${esc(sections[index]?.title||'')}</h2>${area==='growth-atlas'?atlas():card(sections[index]?.image,sections[index]?.title||'', 'herbal-card--'+area)}</section>`;
  const researchExtra=card(sections[0]?.detailImage,'背景调研补充图','herbal-research-extra');
  return `<div class="herbal-layout">${section(0,'research')}<div class="herbal-middle">${researchExtra}${section(1,'process')}</div>${section(2,'growth-atlas')}${section(3,'full-showcase')}<div class="herbal-spec-row">${section(4,'guidelines')}${section(5,'dieline')}</div>${section(6,'effects')}</div>`;
};
const huanglingSections=sections=>`<div class="huangling-layout">${sections.map(section=>`<section class="project-case-section huangling-section${section.width==='half'?' huangling-section--half':''}${section.tone==='cream'?' huangling-section--cream':''}"><h2>${esc(section.title)}</h2><div class="project-placeholder huangling-card" style="--huangling-card-ratio:${section.ratio||2.05}" role="img" aria-label="${esc(section.title)} 图片占位">${section.image?`<img src="${esc(section.image)}" alt="${esc(section.title)}" loading="lazy" onerror="this.hidden=true">`:''}</div></section>`).join('')}</div>`;
const daliEmbroiderySections=sections=>{
  const block=section=>`<section class="dali-section dali-section--${esc(section.area)}"><img class="dali-title-image" src="${esc(section.titleImage)}" alt="${esc(section.title)}" loading="lazy" decoding="async"><div class="dali-card" style="--dali-card-ratio:${section.ratio};aspect-ratio:var(--dali-card-ratio)" role="img" aria-label="${esc(section.title)} 图片占位">${section.image?`<img src="${esc(section.image)}" alt="${esc(section.title)} 作品图" loading="lazy" onload="this.parentElement.style.aspectRatio=this.naturalWidth+'/'+this.naturalHeight" onerror="this.hidden=true">`:''}</div></section>`;
  const gradient='<img class="dali-gradient" src="images/Rectangle 6.png" alt="" loading="lazy" decoding="async">';
  return `<div class="dali-content">${gradient}<div class="dali-opening-grid">${sections.slice(0,4).map(block).join('')}</div>${gradient}${block(sections[4])}${gradient}${block(sections[5])}${gradient}${block(sections[6])}</div>`;
};
const nav=[['projects','Projects'],['about','About'],['connect','Connect']];
const header=`<header class="site-header"><a class="wordmark" href="index.html" aria-label="返回首页">${esc(data.name)}<span>.</span></a><nav aria-label="主导航">${nav.map(([key,label])=>`<a href="${key}.html" ${navPage===key?'aria-current="page"':''}>${label}${key==='connect'?' <img class="arrow-icon" src="images/icons/arrow-up-right.png" alt="" width="14" height="14">':''}</a>`).join('')}</nav></header>`;
const footer=`<footer class="site-footer wrap"><span>© ${new Date().getFullYear()} ${esc(data.name)}</span><a href="index.html">返回首页 ↑</a></footer>`;
let main='';
if(page==='home')main=`<main class="home wrap"><section class="home-profile"><div class="home-photo-wrap"><img class="home-photo" src="${esc(data.home.profileImage)}" alt="${esc(data.name)} 的个人照片"><section class="toolbox"><div class="tool-grid">${data.home.tools.map((tool,i)=>`<div class="tool-item"><img class="tool-image" src="images/icons/tool-${String(i+1).padStart(2,'0')}.png" alt="${esc(tool.name)} 图标占位" width="40" height="40"><span>${esc(tool.name)}</span></div>`).join('')}</div></section><div class="home-contact"><a href="tel:${esc(data.home.phone)}"><img class="contact-icon-image" src="images/icons/contact-phone.png" alt="" width="28" height="28"><span class="contact-text"><b>${esc(data.home.phone)}</b></span></a><a href="mailto:${esc(data.home.email)}"><img class="contact-icon-image" src="images/icons/contact-email.png" alt="" width="28" height="28"><span class="contact-text"><b>${esc(data.home.email)}</b></span></a></div></div><div class="home-intro"><span class="eyebrow"><span class="status-dot"></span>个人作品集</span><h1>${data.home.title.map((line,i)=>`<span>${i===1?esc(line).replace('Zhiwen Yang.','<span class="name-highlight">Zhiwen Yang.</span>'):esc(line)}</span>`).join('')}</h1><div class="project-types">${[0,2,4].map(i=>`<div class="type-line${i===4?' cta-line':''}">${data.home.projectTypes.slice(i,i+2).map(type=>`<div class="type-row"><strong>${esc(type)}</strong></div>`).join('')}${i===4?`<a class="text-link" href="projects.html">${esc(data.home.cta)} <img class="arrow-icon" src="images/icons/arrow-up-right.png" alt="" width="16" height="16"></a>`:''}</div>`).join('')}</div><div class="home-summary">${data.home.intro.map(text=>`<p>${esc(text)}</p>`).join('')}</div></div></section></main>`;
else if(page==='projects'){
  const projectCard=(item,i)=>`<a class="project-card project-card-link" href="project.html?id=${i+1}" aria-label="查看项目：${esc(item.title)}"><div class="project-card-content"><div class="project-cover cover-${i+1}">${item.image?`<img src="${esc(item.image)}" alt="${esc(item.title)} 项目封面" loading="${i===0?'eager':'lazy'}" decoding="async"${i===0?' fetchpriority="high"':''}>`:`<div class="cover-graphic" aria-hidden="true"><span>${String(i+1).padStart(2,'0')}</span><i></i><b></b></div>`}<span class="project-glass-cursor" aria-hidden="true"><span class="project-glass-eyes">👀</span><span>View</span></span></div><div class="card-meta"><span class="project-card-types">${projectTypeTags(item.type).map(tag=>`<span>${esc(tag.startsWith('#')?tag:'#'+tag)}</span>`).join('')}</span><span>${String(i+1).padStart(2,'0')}</span></div><h2>${esc(item.title)}</h2><p>${esc(item.description)}</p></div></a>`;
  const pairs=[0,2,4].map((start,index)=>`<div class="project-pair" data-stack-index="${index}">${data.projects.items.slice(start,start+2).map((item,offset)=>projectCard(item,start+offset)).join('')}</div>`).join('');
  main=`<main class="wrap inner-page projects-page"><section class="project-stack-scene"><div class="project-stack-stage"><div class="page-head"><h1>${esc(data.projects.title)}</h1></div><div class="project-stack-frame">${pairs}</div></div></section></main>`;
}
else if(page==='project'){
  const projectIndex=Number(new URLSearchParams(location.search).get('id'))-1;
  const item=data.projects.items[projectIndex];
  const sections=item?.sections||[];
  const designSections=item?.designSections||[];
  main=item?`<main class="wrap inner-page project-detail-page${item.layout==='potala'?' project-detail-page--potala':''}${item.layout==='newfoundland'?' project-detail-page--newfoundland':''}${item.layout==='herbal'?' project-detail-page--herbal':''}${item.layout==='huangling'?' project-detail-page--huangling':''}${item.layout==='dali-embroidery'?' project-detail-page--dali-embroidery':''}"><header class="project-detail-heading"><h1 class="project-detail-title">${esc(item.title)}</h1><p class="project-detail-subtitle">${esc(item.subtitle)}</p></header><div class="project-detail-overview"><section class="project-detail-about"><h2>ABOUT THE PROJECT</h2><p>${esc(item.about)}</p></section><div class="project-detail-facts"><section class="project-detail-awards"><h2>AWARDS</h2>${item.awardsImage?`<img src="${esc(item.awardsImage)}" alt="" width="44" height="44" loading="lazy" decoding="async">`:'<div class="project-award-image-space" aria-hidden="true"></div>'}<p>${esc(item.awardsText)}</p></section><section class="project-detail-type"><h2>TYPE</h2><p>${projectTypeTags(item.type).map(tag=>`<span>${esc(tag.startsWith('#')?tag:'#'+tag)}</span>`).join('')}</p></section><section class="project-detail-time"><h2>TIME</h2><p>${esc(item.time)}</p></section></div></div>${item.layout==='herbal'?herbalSections(sections):item.layout==='huangling'?huanglingSections(sections):item.layout==='dali-embroidery'?daliEmbroiderySections(sections):item.layout==='potala'?potalaOriginalSections(item)+potalaShowcase(item):sections.map(section=>`<section class="project-case-section"><h2>${esc(section.title)}</h2><div class="project-case-grid" style="--case-card-ratio:${section.ratio||1.45}">${Array.from({length:section.cards||1},()=>section.image?`<div class="project-placeholder project-placeholder--image"><img src="${esc(section.image)}" alt="${esc(section.title)}" loading="lazy" decoding="async"></div>`:'<div class="project-placeholder" aria-label="图片占位"></div>').join('')}</div></section>`).join('')}<nav class="project-detail-nav"><a href="projects.html">查看全部项目 ↗</a>${projectIndex<5?`<a href="project.html?id=${projectIndex+2}">下一个项目 →</a>`:''}</nav></main>`:`<main class="wrap inner-page project-detail-page"><div class="page-head"><h1>项目不存在</h1><a href="projects.html">返回项目列表</a></div></main>`;
  if(item?.layout==='kongkong'){
    const overviewStart=main.indexOf('class="project-detail-overview"');
    const overviewEnd=main.indexOf('</div></div>',overviewStart)+'</div></div>'.length;
    const navStart=main.indexOf('<nav class="project-detail-nav">',overviewEnd);
    main=main.slice(0,overviewEnd)+kongkongSections(sections)+main.slice(navStart);
    main=main.replace('class="wrap inner-page project-detail-page"','class="wrap inner-page project-detail-page project-detail-page--kongkong"');
  }
}
else if(page==='resume'){const r=data.resume;main=`<main class="wrap resume-layout"><div class="resume-page-title"><h1>${esc(r.title)}</h1></div><aside class="resume-sidebar"><img class="resume-photo" src="${esc(data.home.profileImage)}" alt="${esc(data.name)} 的个人照片"><h1 class="resume-person-name">杨智雯</h1><p class="resume-location">${esc(r.location)} · 视觉传达设计</p><div class="resume-contact"><a href="mailto:${esc(data.home.email)}">${esc(data.home.email)}</a><a href="tel:${esc(data.home.phone)}">${esc(data.home.phone)}</a></div><section class="resume-side-section"><h2>Education</h2><h3>${esc(r.education)}</h3><p>${esc(r.major)}</p></section><section class="resume-side-section"><h2>Academic Record</h2><p>GPA <b>${esc(r.gpa)}</b></p><p>成绩排名 <b>${esc(r.rank)}</b></p><p>英语成绩 <b>${esc(r.english)}</b></p></section><section class="resume-side-section"><h2>Tools</h2><div class="skill-chips">${r.skills.map(skill=>`<span>${esc(skill)}</span>`).join('')}</div></section><section class="resume-side-section"><h2>Strengths</h2><p>${esc(r.strengthsNote)}</p></section></aside><div class="resume-main"><section class="resume-section"><h2>Summary</h2><p class="resume-summary">${esc(r.summary)}</p></section><section class="resume-section"><h2>Experience</h2><div class="experience-list">${r.projects.map((project,i)=>`<article class="experience-item"><div class="experience-index">${String(i+1).padStart(2,'0')}</div><div><h3>${esc(project.title)}</h3><div class="experience-role">${esc(project.role)}</div><ul>${project.bullets.map(bullet=>`<li>${esc(bullet)}</li>`).join('')}</ul></div></article>`).join('')}</div></section><section class="resume-section"><h2>Selected Awards</h2><ul class="award-list">${r.awards.map(award=>`<li>${esc(award)}</li>`).join('')}</ul></section><section class="resume-section"><h2>Research</h2><p>${esc(r.research)}</p></section></div></main>`}
else if(page==='about'){
  const r=data.resume;
  const topics=[
    ['My Education',`<div class="education-detail"><div class="education-line education-school"><span class="education-date education-dot">2022.9&nbsp;--&nbsp;2027.6</span><span class="education-leader"></span><div class="education-school-copy"><strong>陕西科技大学</strong><strong>视觉传达设计</strong></div></div><div class="education-line education-school"><span class="education-date education-dot">2027.9&nbsp;--&nbsp;2030.6</span><span class="education-leader"></span><div class="education-school-copy"><strong>北京科技大学</strong><strong>设计学</strong></div><small>（已保研）</small></div><p class="education-bullet"><b>英语成绩：</b><span class="education-din">CET-4&nbsp; 483、CET-6&nbsp; 461</span></p><p class="education-bullet"><b>主修课程：</b>西方艺术史（<span class="education-din">92</span>）、中国美术史（<span class="education-din">94</span>）、西部民间艺术（<span class="education-din">95</span>）、展示设计（<span class="education-din">95</span>）、图形与字体设计（<span class="education-din">95</span>）、数字绘画技法（<span class="education-din">94</span>）、书籍装帧设计（<span class="education-din">95</span>）等</p><p class="education-bullet"><b>平均绩点：</b><span class="education-din">4.1/5</span><b class="education-rank-label">绩点排名：</b><span class="education-din education-rank"><span class="education-rank-one">1</span>/70</span></p><div class="education-bullet education-awards"><b>主要荣誉：</b><div class="education-award-list"><div class="education-award"><span class="education-din">2023-2024</span><span class="education-leader"></span><strong>国家奖学金</strong><span>（前<span class="education-din">0.5</span>%）</span></div><div class="education-award"><span class="education-din">2023-2024</span><span class="education-leader"></span><strong>林溪奖学金</strong><span>（前<span class="education-din">2</span>%）</span></div><div class="education-award"><span class="education-din">2024-2025</span><span class="education-leader"></span><strong>校一等奖优秀学业奖学金</strong><span>（前<span class="education-din">3</span>%）</span></div><div class="education-award"><span class="education-din">2026.06</span><span class="education-leader"></span><span>蓝桥杯</span><strong>国家级一等奖</strong></div><div class="education-award"><span class="education-din">2026.06</span><span class="education-leader"></span><span>米兰设计周</span><strong>国家级三等奖</strong></div><div class="education-award"><span class="education-din">2026.05</span><span class="education-leader"></span><span>蓝桥杯</span><strong>省级一等奖</strong></div><div class="education-award"><span class="education-din">2026.08</span><span class="education-leader"></span><span>好创意</span><strong>省级一等奖</strong></div><div class="education-award"><span class="education-din">2026.05</span><span class="education-leader"></span><span>米兰设计周</span><strong>省级三等奖 *2</strong></div><div class="education-award"><span class="education-din">2026.08</span><span class="education-leader"></span><span>未来设计师</span><strong>省级二等奖 *2</strong></div><div class="education-award"><span class="education-din">2026.05</span><span class="education-leader"></span><span>米兰设计周</span><strong>省级三等奖 *3</strong></div><div class="education-award"><span class="education-din">2026.08</span><span class="education-leader"></span><span>未来设计师</span><strong>省级三等奖 *2</strong></div><div class="education-award"><span class="education-din">2026.05</span><span class="education-leader"></span><span>蓝桥杯</span><strong>省级三等奖 *2</strong></div><div class="education-award"><span class="education-din">2026.08</span><span class="education-leader"></span><span>好创意</span><strong>省级优秀奖</strong></div><div class="education-award"><span class="education-din">2026.07</span><span class="education-leader"></span><span>时报金犊</span><strong>优秀奖 *2</strong></div><div class="education-award"><span class="education-din">2026.08</span><span class="education-leader"></span><span>西部国际设计双年展</span><strong>入围奖 *4</strong></div></div></div></div>`],
    ['My Design Experience',`<div class="experience-detail"><section class="experience-project"><h3><span class="experience-din">项目1</span>：海洋生物多样性保护——从平面到空间</h3><ul><li>独立完成28页科普绘本，以现代视觉语言重构海洋保护的叙事逻辑；</li><li>打造高辨识度原创鱼类IP形象，利用<span class="experience-din">Blender</span>实现<span class="experience-din">3D</span>建模，为后续多维空间呈现提供标准化视觉资产；</li><li>将视觉元素延展至线下沉浸式展示设计，实现从平面到空间的感官体验升级。</li></ul></section><section class="experience-project"><h3><span class="experience-din">项目2</span>：本草序——东方种子品牌视觉体系设计</h3><ul><li>结合本草文化与“自然疗愈”理念，平衡东方美学与当代品牌叙事；</li><li>数字化重构敦煌藻井纹样，实现古典韵味与现代审美逻辑的深度统一；</li><li>统合核心<span class="experience-din">Logo</span>、<span class="experience-din">Slogan</span>及全套系列包装设计，以高度一致的设计语言，构建具备辨识度的品牌视觉形象。</li></ul></section><section class="experience-project"><h3><span class="experience-din">项目3</span>：布达拉宫智慧导览平台——数字化赋能文化遗产</h3><ul><li>聚焦其高客流量与复杂建筑空间的游览痛点，通过用户调研构建“可视化、趣味性、安全性”三位一体的数字化导览逻辑；</li><li>引入<span class="experience-din">2.5D</span>分层地图与实时数据可视化系统，重构复杂的宫殿空间导引，并针对高原环境整合高反预防监测功能，提供人文关怀；</li><li>挖掘地域文化符号并延展至线上交互，设计“云端祈福”情感模块，实现从“走马观花”到“深度共鸣”的感知升级。</li></ul></section><section class="experience-project"><h3><span class="experience-din">项目4</span>：面说黄陵——黄陵面花创新包装设计</h3><ul><li>解构黄陵传统非遗符号并将其微型日常化，把厚重的民间礼俗转化为现代年轻家庭高频消费的指尖祝福，完成传统符号的年轻化重构；</li><li>引入低门槛亲子手作材料包，围绕“覆膜、置灯、挂饰、合拢”，让儿童在无工具负担的触觉体验中产生代际情感黏性；</li><li>将视觉传达延展至全生命周期的功能再生，使包装主体在完成食品保护使命后蜕变为新中式明灯，实现非遗符号的长效活态留存。</li></ul></section><section class="experience-project experience-paper"><h3><span class="experience-din">2026</span>年《<span class="experience-din experience-paper-title">Highlights in Business, Economics and Management</span>》独立作者</h3><ul><li><b>论文题目：</b><span class="experience-din">Research on Generative Design of Chinese “Dunhuang Zaojing” Patterns Based on AIGC</span><br>该研究基于<span class="experience-din">Midjourney</span>与<span class="experience-din">ChatGPT</span>模型，设计了<span class="experience-din">2×2</span>准实验对比<span class="experience-din">4</span>种生成路径。</li><li><b>研究发现：</b>基于<span class="experience-din">4</span>组提示词路径实验与<span class="experience-din">8</span>项指标测评，探究<span class="experience-din">AIGC</span>在敦煌藻井纹样设计中的应用，验证了“图文协同”对数字化重构的有效性。</li></ul></section></div>`],
    ['What Can I Do?',`<div class="capability-grid">${[['ui .png','UI设计','结合用户研究、信息架构与视觉叙事，打造直观易用、兼具功能性与情感体验的数字界面。','相关项目','Project 1 布达拉宫智慧导览平台的UI设计'],['exhibition.png','展示设计','结合视觉传达、互动展示与空间叙事，将故事和信息转化为具有沉浸感的空间体验。','相关项目','Project 3 万鱼之寂'],['package.png','包装设计','通过独特的视觉识别、创意包装结构与互动体验，让文化故事融入当代生活。','相关项目','Project 4 本草序 中草药种子品牌包装设计<br>Project 5 面说黄陵 黄陵面花包装设计'],['book.png','书籍设计','通过图文排版与装帧结构，将传统文化和信息转化为富有吸引力的视觉叙事。','相关项目','Project 2《空空》<br>Project 6《大荔刺绣》']].map(([icon,title,body,label,projects])=>`<article class="capability-card"><header><img src="images/${icon}" alt=""><h3>${title}</h3></header><p>${body}</p><div class="capability-links"><span>${label}</span><span>${projects}</span></div></article>`).join('')}</div>`],
    ['My Design Process With AI',`<div class="design-process"><div class="process-phases">${[['Discover','资料整理、访谈分析、需求提取'],['Define','问题归纳、策略推导、信息架构'],['Develop','视觉探索、界面草案、交互原型'],['Deliver','反馈分析、流程检查、界面优化']].map(([title,desc],i)=>`<div class="process-phase"><h3>${title}</h3><div class="phase-ribbon phase-ribbon-${i+1}"></div><p>${desc}</p></div>`).join('')}</div><div class="process-compare"><div class="process-row"><div class="process-side"><strong>Before</strong><span>AI出现前</span></div>${[['收集背景资料与竞品案例','开展用户调研与访谈','整理信息，提炼用户需求'],['归纳问题，明确设计目标','确定设计定位与概念','制定设计策略'],['创意构思&视觉参考收集','绘制草图，探索设计方案','比较方案，深化视觉设计'],['完善设计细节与应用','开展设计测试，收集反馈','修改方案，完成设计成果']].map((items,i)=>`<ul class="process-list process-list-${i%2?'blue':'yellow'}">${items.map(item=>`<li>${item}</li>`).join('')}</ul>`).join('')}</div><div class="process-row"><div class="process-side"><strong>After</strong><span>AI出现后</span></div>${[['人工收集资料，AI辅助整理','AI分析访谈，设计师核实痛点','人机协同提炼设计机会'],['AI整合问题，设计师筛选重点','AI辅助概念发散与策略推导','设计师确定最终设计方向'],['设计师提出创意，AI辅助发散','设计师筛选并二次创作'],['AI辅助检查设计问题','AI归纳反馈，提出优化建议','设计师验证并完善最终方案']].map((items,i)=>`<ul class="process-list process-list-${i%2?'blue':'yellow'}">${items.map(item=>`<li>${item}</li>`).join('')}</ul>`).join('')}</div></div><div class="process-examples"><div class="process-side"><strong>Example</strong><span>AI辅助设计案例</span><p>布达拉宫<br>智慧导览平台<br>UI设计</p></div>${[[['背景资料整理','收集布达拉宫游客数据、建筑特点及转经文化资料，利用ChatGPT分类整理，提取研究重点','With AI'],['竞品功能对比','利用ChatGPT检索迪士尼、环球影城及故宫的导览案例，对比地图导航、预约服务与文化体验功能，筛选可借鉴的设计策略','With AI'],['用户调研','围绕游客的预约体验、空间导航、高原安全及文化需求开展访谈与问卷，收集反馈'],['需求分析','将访谈记录导入Codex，归纳用户痛点及情绪变化，结合原始反馈完善用户画像与旅程地图','With AI']],[['痛点优先级分析','利用ChatGPT将预约排队、空间导航、高原安全、文化体验等问题分类，辅助判断核心设计需求','With AI'],['设计定位确定','根据用户痛点，明确“可视化、趣味性、安全性”的设计定位'],['功能策略推导','利用Codex探索分层导航、参观提醒等功能的实现思路，设计师筛选适合布达拉宫游览场景的方案','With AI'],['信息架构搭建','独立梳理预约购票、分层地图、云端祈福等模块，确定页面层级与功能关系']],[['交互原型设计','根据功能架构，绘制预约购票、地图导航及云端祈福等页面的低保真原型'],['建筑视觉探索','提取布达拉宫的红白墙体、金色屋顶与层叠结构，利用Midjourney生成不同风格的建筑插画参考','With AI'],['地图布局探索','利用ChatGPT生成地图页面的布局草案，比较楼层切换、路线指引与建筑信息的展示方式','With AI'],['高保真界面设计','筛选视觉参考，完善2.5D地图、图标、色彩及高保真UI界面']],[['原型测试','邀请同学和老师体验地图导航、预约购票与高原安全提醒等功能，观察操作过程并收集反馈'],['测试反馈分析','利用ChatGPT归纳用户反馈，识别导航理解、信息查找及操作体验中的共性问题','With AI'],['交互问题检查','利用Codex分析页面操作路径，辅助发现楼层切换、弹窗提醒等功能中可能存在的操作障碍','With AI'],['设计优化完善','结合真实测试结果，调整页面布局、交互细节及视觉规范，完成最终方案']]].map((items,i)=>`<div class="example-column">${items.map(([title,body,tag])=>`<article class="example-card"><h3>${title}${tag?` <span class="ai-tag">${tag}</span>`:''}</h3><p>${body}</p></article>`).join('')}<div class="process-tools">${(i===2?['images/ChatGPT.png','images/midjourney.png']:['images/ChatGPT.png','images/codex.png']).map(src=>`<img src="${src}" alt="" loading="eager">`).join('')}</div></div>`).join('')}</div></div>`]
  ];
  main=`<main class="wrap inner-page about-page"><div class="page-head"><h1>${esc(data.about.title)}</h1></div><section class="about-accordion" aria-label="关于我的详细信息">${topics.map(([title,detail])=>`<details class="about-item"><summary><span>${esc(title)}</span><span class="about-triangle" aria-hidden="true"></span></summary><div class="about-detail">${detail}</div></details>`).join('')}</section></main>`;
}
else{const s=data[page],section=page==='connect'?'':'';main=`<main class="wrap inner-page text-page"><div class="page-head">${section}<h1>${esc(s.title)}</h1></div><div class="text-content"><h2>${esc(s.lead)}</h2><p>${esc(s.body)}</p><div class="connect-contact"><a href="tel:${esc(data.home.phone)}"><img src="images/icons/contact-phone.png" alt=""><span>${esc(data.home.phone)}</span></a><a href="mailto:${esc(data.home.email)}"><img src="images/icons/contact-email.png" alt=""><span>${esc(data.home.email)}</span></a></div></div></main>`}
app.innerHTML=header+main+footer;
const herbalAtlas=app.querySelector('[data-herbal-atlas]');
if(herbalAtlas){
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const plants=[...herbalAtlas.querySelectorAll('[data-atlas-plant]')].map(el=>({
    el,bx:+el.dataset.anchorX,by:+el.dataset.anchorY,x:+el.dataset.crownX,y:+el.dataset.crownY,
    angle:0,velocity:0,target:0
  }));
  let frame=0,last=0,previousX=null;
  const animate=time=>{
    const dt=Math.min((time-last)/1000||1/60,1/30);last=time;
    let moving=false;
    for(const p of plants){
      p.velocity+=(p.target-p.angle)*85*dt;
      p.velocity*=Math.exp(-6.5*dt);
      p.angle+=p.velocity*dt;
      p.el.setAttribute('transform','rotate('+p.angle.toFixed(3)+' '+p.bx+' '+p.by+')');
      if(Math.abs(p.velocity)>.02||Math.abs(p.target-p.angle)>.01)moving=true;
    }
    frame=moving?requestAnimationFrame(animate):0;
  };
  const start=()=>{if(!frame){last=0;frame=requestAnimationFrame(animate)}};
  herbalAtlas.addEventListener('pointermove',event=>{
    if(reduced.matches)return;
    const r=herbalAtlas.getBoundingClientRect(),x=(event.clientX-r.left)/r.width*2048,y=(event.clientY-r.top)/r.height*864;
    const speed=previousX===null?0:Math.max(-35,Math.min(35,x-previousX));previousX=x;
    for(const p of plants){
      const strength=Math.exp(-Math.pow((x-p.x)/220,2)-Math.pow((y-(p.y+p.by)/2)/250,2));
      p.target=Math.max(-11,Math.min(11,((x-p.x)/14+speed*.55)*strength));
    }
    start();
  },{passive:true});
  const release=()=>{previousX=null;for(const p of plants)p.target=0;start()};
  herbalAtlas.addEventListener('pointerleave',release);
  herbalAtlas.addEventListener('pointercancel',release);
  document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(frame);frame=0;for(const p of plants){p.target=p.angle=p.velocity=0;p.el.removeAttribute('transform')}}});
}
if(page==='project'&&new URLSearchParams(location.search).get('id')==='1'){
  const prototype=document.createElement('section');
  prototype.id='potala-interactive-prototype';
  prototype.className='potala-prototype-section';
  prototype.innerHTML='<h2>INTERACTIVE PROTOTYPE</h2><p>点击画面体验预约、导览、祈福及文创流程。</p><div data-potala-prototype></div>';
  app.querySelector('.potala-followup-pair')?.before(prototype);
}
const initKongkongBook=()=>{
  const reader=document.querySelector('[data-book-reader]');
  if(!reader)return;
  const stage=reader.querySelector('.book-stage'),model=reader.querySelector('.book-model');
  const showcase=reader.querySelector('.book-showcase'),spread=reader.querySelector('.book-open-spread');
  const left=reader.querySelector('.book-page--left'),right=reader.querySelector('.book-page--right'),leaf=reader.querySelector('.book-turn-leaf');
  const previous=reader.querySelector('.book-previous'),next=reader.querySelector('.book-next');
  const position=reader.querySelector('.book-position'),back=reader.querySelector('.book-return'),hint=reader.querySelector('.book-hint');
  const pagePath=n=>'images/book-pages/page-'+String(n).padStart(2,'0')+'.png';
  // 0=封面；1..14=01–02、03–04……27–28；15=封底。
  const spreads=[{single:true,files:['images/book-pages/cover.png'],labels:['封面']}];
  for(let n=1;n<=28;n+=2)spreads.push({single:false,files:[pagePath(n),pagePath(n+1)],labels:[String(n).padStart(2,'0'),String(n+1).padStart(2,'0')]});
  spreads.push({single:true,files:['images/book-pages/back-cover.png'],labels:['封底']});
  let current=1,mode='showcase',busy=false,version=0,activeAnimation=null;
  let pitch=0,yaw=0,targetPitch=0,targetYaw=0,frame=0,lastTime=0;
  const fanLeaves=[...showcase.querySelectorAll('.book-fan-leaf')];
  const faceAudience=angle=>{
    if(mode!=='showcase')return;
    const step=360/fanLeaves.length;
    // A page at -90° projects toward the viewer; 0° points sideways.
    const frontDirection=-90-angle;
    const phase=(((frontDirection+180)/step)%fanLeaves.length+fanLeaves.length)%fanLeaves.length;
    const leftIndex=Math.floor(phase)%fanLeaves.length,rightIndex=(leftIndex+1)%fanLeaves.length;
    // Reserve an 80° opening between the two sheets at the front of the book.
    const firstAngle=-180+leftIndex*step;
    fanLeaves.forEach((button,index)=>{
      const offset=(index-rightIndex+fanLeaves.length)%fanLeaves.length;
      const leafAngle=firstAngle+40+offset*(280/(fanLeaves.length-1));
      button.style.setProperty('--leaf-angle',leafAngle+'deg');
      button.classList.toggle('is-facing',index===leftIndex||index===rightIndex);
    });
  };
  const cache=new Map(),reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const load=src=>{
    if(!cache.has(src)){
      const image=new Image();image.src=src;
      const ready=image.decode?image.decode():new Promise((resolve,reject)=>{image.onload=resolve;image.onerror=reject;if(image.complete&&image.naturalWidth)resolve();});
      cache.set(src,ready.then(()=>src).catch(error=>{cache.delete(src);throw error;}));
    }
    return cache.get(src);
  };
  const prepare=index=>Promise.all(spreads[index].files.map(load));
  const warm=()=>{
    for(const index of [current-1,current+1])if(spreads[index])prepare(index).catch(()=>{});
    const keep=new Set(spreads.slice(Math.max(0,current-1),current+2).flatMap(item=>item.files));
    for(const src of cache.keys())if(!keep.has(src))cache.delete(src);
  };
  const label=index=>spreads[index].single?spreads[index].labels[0]+' · 内页共 28 页':spreads[index].labels.join('–')+' / 28';
  const controls=message=>{
    previous.disabled=busy||mode==='showcase'||current===0;
    next.disabled=busy||(mode==='reading'&&current===spreads.length-1);
    left.disabled=busy||current===0;right.disabled=busy||current===spreads.length-1;
    back.hidden=mode!=='reading';back.disabled=busy;
    reader.setAttribute('aria-busy',String(busy));
    position.textContent=message||(mode==='reading'?label(current):'预览 · 内页 01–28');
  };
  const put=(button,src,text)=>{
    const img=button.querySelector('img');
    if(img.getAttribute('src')!==src)img.src=src;
    img.alt=text==='封面'||text==='封底'?text:'第 '+text+' 页';
  };
  const paint=index=>{
    const item=spreads[index];
    spread.classList.toggle('is-single',item.single);left.hidden=item.single;
    if(item.single)put(right,item.files[0],item.labels[0]);
    else{put(left,item.files[0],item.labels[0]);put(right,item.files[1],item.labels[1]);}
    spread.setAttribute('aria-label',label(index));
  };
  const settleTilt=time=>{
    const amount=1-Math.exp(-Math.min(40,lastTime?time-lastTime:16)/65);lastTime=time;
    pitch+=(targetPitch-pitch)*amount;yaw+=(targetYaw-yaw)*amount;
    model.style.transform='rotateX('+pitch+'deg) rotateY('+yaw+'deg)';
    faceAudience(yaw);
    if(Math.abs(pitch-targetPitch)+Math.abs(yaw-targetYaw)>.02)frame=requestAnimationFrame(settleTilt);
    else{frame=0;lastTime=0;}
  };
  const tilt=(x,y)=>{targetPitch=x;targetYaw=y;if(!frame)frame=requestAnimationFrame(settleTilt);};
  const open=async index=>{
    if(busy)return;
    busy=true;const token=++version;controls(label(index));
    try{
      await prepare(index);if(token!==version)return;
      current=index;paint(current);
      mode='reading';reader.dataset.mode=mode;showcase.hidden=true;spread.hidden=false;
      hint.textContent='点击左右页或两侧箭头翻页';
      tilt(0,0);busy=false;controls();warm();
    }catch(error){busy=false;controls('图片未加载成功，请再点击一次');}
  };
  const turn=async direction=>{
    if(busy)return;
    if(mode==='showcase'){if(direction>0)await open(0);return;}
    const target=current+direction;if(!spreads[target])return;
    busy=true;const token=++version;controls(label(target));
    try{
      await prepare(target);if(token!==version)return;
      const from=spreads[current],to=spreads[target];
      if(!from.single&&!to.single&&!reduced){
        const front=leaf.querySelector('.book-turn-front'),reverse=leaf.querySelector('.book-turn-back');
        front.src=from.files[direction>0?1:0];reverse.src=to.files[direction>0?0:1];
        await Promise.all([front.decode(),reverse.decode()]);
        if(token!==version)return;
        leaf.classList.toggle('turn-backward',direction<0);leaf.hidden=false;
        // Keep the old face on the turning sheet and reveal the new page beneath it.
        if(direction>0)put(right,to.files[1],to.labels[1]);
        else put(left,to.files[0],to.labels[0]);
        activeAnimation=leaf.animate([{transform:'rotateY(0deg)'},{transform:'rotateY('+(direction>0?-180:180)+'deg)'}],{duration:850,easing:'cubic-bezier(.22,.72,.2,1)',fill:'forwards'});
        await activeAnimation.finished;
      }
      if(token!==version)return;
      current=target;paint(current);
      leaf.hidden=true;activeAnimation?.cancel();activeAnimation=null;
      busy=false;controls();warm();
    }catch(error){
      leaf.hidden=true;activeAnimation?.cancel();activeAnimation=null;paint(current);busy=false;controls('图片未加载成功，请重试');
    }
  };
  showcase.querySelectorAll('[data-book-front]').forEach(button=>{
    const visiblePage=()=>{
      const shownAngle=Number.parseFloat(button.style.getPropertyValue('--leaf-angle'))+yaw;
      return Number(Math.cos(shownAngle*Math.PI/180)>=0?button.dataset.bookFront:button.dataset.bookBack);
    };
    const spreadIndex=number=>number===0?0:number===29?spreads.length-1:Math.floor((number-1)/2)+1;
    const showPage=()=>{if(mode==='showcase'&&!busy){const number=visiblePage(),index=spreadIndex(number);position.textContent=(number===0?'封面':number===29?'封底':'第 '+String(number).padStart(2,'0')+' 页')+' · '+label(index)}};
    const clearPage=()=>{if(mode==='showcase'&&!busy)controls()};
    button.addEventListener('pointerenter',showPage);
    button.addEventListener('pointerleave',clearPage);
    button.addEventListener('focus',showPage);
    button.addEventListener('blur',clearPage);
    button.addEventListener('click',()=>open(spreadIndex(visiblePage())));
  });
  previous.addEventListener('click',()=>turn(-1));next.addEventListener('click',()=>turn(1));
  left.addEventListener('click',()=>turn(-1));right.addEventListener('click',()=>turn(1));
  back.addEventListener('click',()=>{
    if(busy)return;
    version++;mode='showcase';reader.dataset.mode=mode;spread.hidden=true;showcase.hidden=false;
    hint.textContent='移动鼠标调整视角 · 点击纸页展开';tilt(0,0);controls();
  });
  stage.addEventListener('pointermove',event=>{
    if(event.pointerType==='touch'||busy||reduced)return;
    const rect=stage.getBoundingClientRect();
    const x=Math.max(-1,Math.min(1,(event.clientX-rect.left)/rect.width*2-1));
    const y=Math.max(-1,Math.min(1,(event.clientY-rect.top)/rect.height*2-1));
    tilt((mode==='showcase'?0:-3)-y*(mode==='showcase'?35:10),x*(mode==='showcase'?180:10));
  });
  stage.addEventListener('pointerleave',()=>tilt(mode==='showcase'?0:-3,0));
  stage.addEventListener('keydown',event=>{
    if(event.key==='ArrowLeft'){event.preventDefault();turn(-1);}
    else if(event.key==='ArrowRight'){event.preventDefault();turn(1);}
    else if(event.key==='Escape'&&mode==='reading'&&!busy)back.click();
  });
  const observer=new IntersectionObserver(entries=>{
    if(entries.some(entry=>entry.isIntersecting)){prepare(1).then(()=>prepare(2)).catch(()=>{});observer.disconnect();}
  },{rootMargin:'700px'});
  observer.observe(reader);controls();faceAudience(0);
};
initKongkongBook();
if(page==='projects'){
  const scene=document.querySelector('.project-stack-scene');
  const stage=document.querySelector('.project-stack-stage');
  const frame=document.querySelector('.project-stack-frame');
  const pageHead=scene.querySelector('.page-head');
  const pageHeadHeight=pageHead.offsetHeight;
  const pageHeadMargin=parseFloat(getComputedStyle(pageHead).marginBottom)||0;
  const pairs=[...document.querySelectorAll('.project-pair')];
  document.querySelectorAll('.project-cover').forEach(cover=>{
    const cursor=cover.querySelector('.project-glass-cursor');
    let targetX=0,targetY=0,currentX=0,currentY=0,frameId=0;
    const setTarget=event=>{
      const rect=cover.getBoundingClientRect(),padX=cursor.offsetWidth/2,padY=cursor.offsetHeight/2;
      targetX=Math.max(padX,Math.min(rect.width-padX,event.clientX-rect.left));
      targetY=Math.max(padY,Math.min(rect.height-padY,event.clientY-rect.top));
    };
    const move=()=>{
      const dx=targetX-currentX,dy=targetY-currentY,distance=Math.hypot(dx,dy);
      const follow=Math.min(.48,.11+distance*.014);
      currentX+=dx*follow;currentY+=dy*follow;
      cursor.style.setProperty('--x',`${currentX}px`);
      cursor.style.setProperty('--y',`${currentY}px`);
      if(distance>.18)frameId=requestAnimationFrame(move);else frameId=0;
    };
    cover.addEventListener('pointerenter',event=>{
      if(event.pointerType==='touch')return;
      setTarget(event);currentX=targetX;currentY=targetY;
      cursor.style.setProperty('--x',`${currentX}px`);cursor.style.setProperty('--y',`${currentY}px`);
      cursor.classList.add('is-visible');
    });
    cover.addEventListener('pointermove',event=>{
      if(event.pointerType==='touch')return;
      setTarget(event);
      if(!frameId)frameId=requestAnimationFrame(move);
    });
    cover.addEventListener('pointerleave',()=>{cursor.classList.remove('is-visible');cancelAnimationFrame(frameId);frameId=0});
  });
  const animated=window.matchMedia('(min-width: 900px) and (min-height: 680px) and (prefers-reduced-motion: no-preference)');
  let pending=false;
  let animating=false;
  let animationFrame=0;
  const clamp=(value,min,max)=>Math.min(max,Math.max(min,value));
  const ease=value=>value*value*(3-2*value);
  const update=()=>{
    pending=false;
    if(!animated.matches){
      frame.style.height='';
      pageHead.style.height='';pageHead.style.marginBottom='';pageHead.style.opacity='';pageHead.style.transform='';
      pairs.forEach(pair=>{
        pair.style.transform='';
        pair.querySelectorAll('.project-card').forEach(card=>{
          card.style.transform='';
          card.querySelectorAll('.project-cover > img, .project-cover > .cover-graphic').forEach(visual=>{visual.style.filter=''});
        });
      });
      return;
    }
    const pairHeight=Math.max(...pairs.map(pair=>pair.offsetHeight));
    const reveal=52;
    frame.style.height=`${pairHeight+reveal*2}px`;
    const range=Math.max(1,scene.offsetHeight-stage.offsetHeight);
    const sceneStart=window.scrollY+scene.getBoundingClientRect().top;
    const elapsed=clamp(window.scrollY-sceneStart,0,range);
    const progress=elapsed/range*2;
    const titleOut=ease(clamp((progress-.65)/.35,0,1));
    pageHead.style.height=`${pageHeadHeight*(1-titleOut)}px`;
    pageHead.style.marginBottom=`${pageHeadMargin*(1-titleOut)}px`;
    pageHead.style.opacity=String(1-titleOut);
    pageHead.style.transform=`translateY(${-Math.round(titleOut*pageHeadHeight)}px)`;
    pairs.forEach((pair,index)=>{
      if(index>0){
        const local=ease(clamp(progress-(index-1),0,1));
        const start=frame.clientHeight+24;
        const end=index*reveal;
        pair.style.transform=`translate3d(0,${Math.round(start+(end-start)*local)}px,0)`;
      }
      const behind=clamp(progress-index,0,1);
      const scale=1-behind*(index===0 ? .14 : .07);
      const blur=behind*3;
      pair.querySelectorAll('.project-card').forEach(card=>{
        card.style.transform=`scale(${scale})`;
        card.querySelectorAll('.project-cover > img, .project-cover > .cover-graphic').forEach(visual=>{visual.style.filter=`blur(${blur.toFixed(2)}px)`});
      });
    });
  };
  const schedule=()=>{if(!pending){pending=true;requestAnimationFrame(update)}};
  const handleWheel=event=>{
    if(!animated.matches||Math.abs(event.deltaY)<2)return;
    const bounds=scene.getBoundingClientRect();
    if(bounds.bottom<=0||bounds.top>=window.innerHeight)return;
    if(animating){event.preventDefault();return}
    const sceneStart=window.scrollY+bounds.top;
    const range=Math.max(1,scene.offsetHeight-stage.offsetHeight);
    const stepDistance=range/2;
    const currentStep=Math.round(clamp((window.scrollY-sceneStart)/stepDistance,0,2));
    const nextStep=clamp(currentStep+(event.deltaY>0?1:-1),0,2);
    if(nextStep===currentStep)return;
    event.preventDefault();
    animating=true;
    cancelAnimationFrame(animationFrame);
    const from=window.scrollY;
    const to=sceneStart+stepDistance*nextStep;
    const started=performance.now();
    const duration=1150;
    const animate=now=>{
      const t=clamp((now-started)/duration,0,1);
      const eased=t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
      window.scrollTo(0,from+(to-from)*eased);
      schedule();
      if(t<1)animationFrame=requestAnimationFrame(animate);
      else{window.scrollTo(0,to);schedule();animating=false}
    };
    animationFrame=requestAnimationFrame(animate);
  };
  addEventListener('wheel',handleWheel,{passive:false});
  addEventListener('scroll',schedule,{passive:true});
  addEventListener('resize',schedule);
  animated.addEventListener('change',schedule);
  schedule();
}
