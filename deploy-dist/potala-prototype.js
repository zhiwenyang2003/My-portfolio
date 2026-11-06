(() => {
  const host = document.querySelector('[data-potala-prototype]');
  if (!host) return;
  const folder = 'images/potala-prototype/';
  const screens = [
    ['home','首页','01-home.png'],['booking','预约购票','02-booking.png'],
    ['map','地图全景','03-map-overview.png'],['map-list','全景列表','04-map-list.png'],
    ['palace','红宫介绍','05-palace-detail.png'],['culture','文创首页','06-culture.png'],
    ['culture-product','商品详情','06-culture-product.png'],['notice','参观须知','07-visit-notice.png'],
    ['blessing','云端祈福','08-blessing.png'],['blessing-info','祈福介绍','09-blessing-intro.png'],
    ['floors','分层地图','10-layer-map.png'],['activities','游玩项目','11-map-activities.png'],
    ['profile','个人页','12-profile.png']
  ].map(([id,title,file])=>({id,title,file}));
  const byId=Object.fromEntries(screens.map(s=>[s.id,s]));
  // Hit boxes use percentages of the ORIGINAL 1760 × 3824 export.
  // [action, accessible name, left, top, width, height]. No visible UI is added.
  const spots = {
    home:[['notice','参观须知',4.5,80,22,8],['booking','预约购票',34,78.4,32,11],['blessing','云端祈福',74,80,22,8],['map','进入完整地图',33.5,60,33,2.5]],
    notice:[['notice-ok','我知道了',34,65.9,32,4.8]],
    palace:[['back','返回',4.4,7.5,8.4,3.9],['floors','查看地图',75.5,39,20,2.6],['missing-palace-more','展开灵塔介绍',88,69.5,7,1.8],['missing-palace-more','展开坛城介绍',88,74.7,7,1.8],['missing-palace-more','展开壁画介绍',88,79.8,7,1.8]],
    culture:[['culture-product','原创卡通人物胸针',4.5,45.6,80.5,16.6],['culture-product','查看胸针详情',86,57.8,8,3.6],['cart','加入购物车',87,46.6,7,3.1],['missing-product','查看雪莲徽章',4.5,63.4,91,16.8],['missing-cart','查看购物车',86,85.6,14,5.2]],
    'culture-product':[['back','返回文创',4.4,7.5,8.4,3.9],['quantity-less','减少数量',76,67.3,5,2.2],['quantity-more','增加数量',90.8,67.3,4.8,2.2],['cart','加入购物车',86,85.6,14,5.2]],
    blessing:[['back','返回首页',4.4,7.5,8.4,3.9],['blessing-info','介绍',87.2,7.5,8.3,3.9],['mute','声音',87.2,13.5,8.3,3.9],['blessing-prev','左侧转经筒',0,55,18,32],['blessing-next','右侧转经筒',82,55,18,32]],
    'blessing-info':[['blessing-close','关闭祈福介绍',44.8,65.9,9.7,4.7]],
    floors:[['back','返回地图',4.3,5,6,3],['floor-4','4F',86.3,13,9.4,3.5],['floor-3','3F',86.3,17.1,9.4,3.5],['floor-2','2F',86.3,21.3,9.4,3.5],['floor-1','1F',86.3,25.5,9.4,3.5]],
    activities:[['missing-activity','波甜墙详情',5,11.7,90,37],['missing-activity','天使邮局详情',5,50,90,36]],
    profile:[['map','我的足迹',24,11.8,16,2.2],['booking-record','全部订单',8,36.3,14,6.2],['missing-orders','待支付',32,36.3,13,6.2],['culture','浏览记录',56,36.3,13,6.2],['missing-address','我的地址',80,36.3,14,6.2],['missing-feedback','意见反馈',7,47,86,5.4],['missing-identity','实名认证',7,54,86,5.2],['missing-settings','设置',7,60.9,86,5.2]]
  };
  const nav=[['home','首页'],['map','地图'],['culture','文创'],['profile','我的']];
  const navScreens=new Set(['home','booking','map','map-list','palace','culture','culture-product','activities','profile']);
  let current='home',history=[],floor=1,drawer=false,blessing=1,quantity=1;
  let status='',bookingRecord=null,suppressedUntil=0;
  let wheelBusy=false;
  const detailAssets={};
  const reservation={route:2,day:7,time:8,visitors:0,phone:''};
  const camera={x:0,y:0,zoom:1,width:0,height:0};
  const pointers=new Map();
  let gesture=null,loadVersion=0;
  const esc=v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const box=(x,y,w,h)=>`left:${x}%;top:${y}%;width:${w}%;height:${h}%`;
  const hit=([action,label,x,y,w,h],extra='')=>`<button type="button" class="potala-hotspot" data-action="${action}" aria-label="${esc(label)}" style="${box(x,y,w,h)}" ${extra}></button>`;
  // Reuse original pixels for fixed controls and map labels, without redrawing them.
  const crop=(file,[x,y,w,h],maskFloorUi=false)=>`<svg viewBox="${x*17.6} ${y*38.24} ${w*17.6} ${h*38.24}" preserveAspectRatio="none" aria-hidden="true"><image href="${folder+file}" width="1760" height="3824"/>${maskFloorUi?'<rect x="0" y="268" width="1760" height="688" fill="#fffad9"/>':''}</svg>`;
  const fileFor=()=>current==='floors'?(drawer&&floor===4?'10-layer-map-04-alternative.png':floor===1?'10-layer-map.png':`10-layer-map-0${floor}.png`):current==='blessing'&&blessing>1?`08-blessing-0${blessing}.png`:byId[current].file;
  function tell(message){status=message;const n=host.querySelector('.potala-toast');if(n)n.textContent=message;}
  const detailLoading=new Set();
  const loadFloorDetail=n=>{
    if(detailAssets[n]||detailLoading.has(n))return;
    detailLoading.add(n);
    const file=`10-layer-map-0${n}-detail.jpg`,image=new Image();
    image.onload=()=>{detailAssets[n]={url:folder+file,ratio:image.naturalWidth/image.naturalHeight};detailLoading.delete(n);if(current==='floors'&&floor===n)render();};
    image.onerror=()=>detailLoading.delete(n);
    image.src=folder+file;
  };
  function route(id,back=false){
    if(!byId[id]||(id===current&&!back))return;
    if(!back)history.push(current);
    current=id;status='';pointers.clear();gesture=null;if(id==='floors')loadFloorDetail(floor);render();
  }
  const mapPlaces=[
    {id:'red',name:'红宫',x:44,y:6,load:4},
    {id:'white',name:'白宫',x:57,y:18,load:4},
    {id:'west',name:'西广场',x:28,y:47,load:4},
    {id:'platform',name:'瞻佛台',x:44,y:68,load:2},
    {id:'east',name:'东广场',x:70,y:39,load:4},
    {id:'fort',name:'西大堡',x:12,y:13,load:4}
  ];
  const marker=p=>`<button type="button" class="potala-map-marker" data-action="place-${p.id}" aria-label="${p.name}，客流量${p.load}格" style="left:${p.x}%;top:${p.y/0.79}%;"><span class="potala-place-name">${p.name}</span><span class="potala-traffic"><span>人流量</span><span class="potala-traffic-bars">${[1,2,3,4,5].map(n=>`<i class="${n<=p.load?'is-filled':''}"></i>`).join('')}</span></span></button>`;
  const wheelFiles=['Group 1756.png','Group 1757.png','Group 1758.png'];
  const wheelMarkup=()=>current==='blessing'?`<div class="potala-wheel-stage" aria-hidden="true"><img class="potala-wheel-background" src="${folder}iPhone%2016%20Pro%20Max%20-%2060.png" alt="" loading="lazy" decoding="async" draggable="false">${wheelFiles.map((name,i)=>`<img class="potala-wheel-object" data-wheel-index="${i+1}" src="${folder+encodeURIComponent(name)}" alt="" loading="lazy" decoding="async" draggable="false">`).join('')}<span class="potala-wheel-instruction">顺时针滑动即刻祈福</span></div>`:'';
  const blessingChrome=()=>current==='blessing'?`<div class="potala-blessing-chrome" aria-hidden="true"><span style="${box(4.4,7.5,8.4,3.9)}">${crop('08-blessing.png',[4.4,7.5,8.4,3.9])}</span><span style="${box(87.2,7.5,8.3,3.9)}">${crop('08-blessing.png',[87.2,7.5,8.3,3.9])}</span><span style="${box(87.2,13.5,8.3,3.9)}">${crop('08-blessing.png',[87.2,13.5,8.3,3.9])}</span></div>`:'';
  function setWheelProgress(progress){
    const stage=host.querySelector('.potala-wheel-stage');if(!stage)return;
    const width=stage.clientWidth,height=stage.clientHeight;
    stage.querySelectorAll('.potala-wheel-object').forEach(el=>{
      const index=Number(el.dataset.wheelIndex);
      let offset=index-blessing;if(offset>1)offset-=3;if(offset< -1)offset+=3;
      const angle=(offset-progress)*.92;
      const x=Math.sin(angle)*width*.42,y=(1-Math.cos(angle))*height*.18;
      const prominence=Math.min(1,Math.abs(angle)/.92);
      const scale=1-prominence*.29;
      el.style.transform=`translate(${x}px,${y}px) rotate(${angle*18}deg) scale(${scale})`;
      el.style.opacity=String(1-prominence*.4);
      el.style.zIndex=String(Math.round(10-Math.abs(angle)*5));
    });
  }
  function mapMarkup(file){
    if(current==='map')return `<div class="potala-map-viewport" data-gesture="map" style="top:10%;height:81.4%"><div class="potala-map-world"><img class="potala-map-art" src="${folder}image%20126.png" alt="布达拉宫完整全景地图" loading="lazy" decoding="async" draggable="false">${mapPlaces.map(marker).join('')}</div></div><div class="potala-map-switch" aria-hidden="true">${crop(file,[38.47,86.4,22.9,2.04])}</div>`;
    if(current==='floors'){
      const height=drawer?68:81.5;
      const art=detailAssets[floor]?`<img class="potala-map-art potala-floor-detail-art" src="${detailAssets[floor].url}" alt="红宫${floor}层高清地图" loading="lazy" decoding="async" draggable="false">`:crop(file,[0,18,100,height],true);
      const panel=`<div class="potala-floor-panel${drawer?' is-open':''}" style="${box(0,drawer?80:92,100,drawer?20:8)};visibility:${drawer?'visible':'hidden'}"><img src="${folder}10-layer-map-04-alternative.png" alt="楼层信息卡" loading="lazy" decoding="async" draggable="false"></div>`;
      return `<div class="potala-map-viewport potala-floor-viewport" data-gesture="map" style="top:12%;height:${height}%"><div class="potala-map-world">${art}</div></div><div class="potala-floor-header" style="${box(0,0,100,18)}">${crop(file,[0,0,100,18])}</div><div class="potala-original-control potala-floor-controls" style="${box(86,12.8,10,16.5)}">${crop(file,[86,12.8,10,16.5])}</div>${panel}<div class="potala-drawer-gesture" data-gesture="drawer" role="button" tabindex="0" aria-label="${drawer?'向下滑动收起信息卡':'向上滑动查看信息卡'}" style="${box(0,drawer?80:92,100,drawer?20:8)}"></div>`;
    }
    return '';
  }
  function bookingMarkup(){
    let html='';
    [1,2].forEach((n,i)=>{html+=`<button type="button" class="potala-book-route" data-action="booking-route-${n}" aria-pressed="${reservation.route===n}" style="${box(42.3+i*24.8,7.3,20.6,3.5)}">${n===1?'一':'二'}号线</button>`;});
    [[7,81.4,24],[8,12.8,28],[9,24.2,28],[10,35.6,28],[11,47,28]].forEach(([n,x,y])=>{html+=hit([`booking-day-${n}`,`2月${n}日`,x,y,5.8,3.4],`aria-pressed="${reservation.day===n}"`);});
    for(let i=0;i<12;i++)html+=hit([`booking-time-${i}`,`预约时段${i+1}`,12.2+(i%3)*26.4,40.6+Math.floor(i/3)*5.02,22.8,4.15],`aria-pressed="${reservation.time===i}" ${i===11?'disabled':''}`);
    html+=hit(['booking-add','添加游客',29.4,69,41,3.4]);
    if(reservation.visitors)html+=`<span class="potala-original-text" style="${box(30,69.2,40,3)};background:white">已添加 ${reservation.visitors} 人（点击增加）</span>`;
    html+=`<input class="potala-phone-input" type="tel" inputmode="tel" aria-label="联系人电话" placeholder="" value="${esc(reservation.phone)}" style="${box(35,80,50,3.4)}">`;
    return html+hit(['booking-submit','立即预约',34,85.8,32,4.6]);
  }
  function screenHits(){
    let html=(spots[current]||[]).map(s=>hit(s)).join('');
    if(navScreens.has(current))html+=nav.map(([id,label],i)=>hit([id,label,i*25+2,91.4,21,6.1])).join('');
    if(['map','map-list','activities'].includes(current)){
      html+=hit(['map','宫殿',16,5.5,22,3.8])+hit(['missing-exhibits','展品',39,5.5,22,3.8])+hit(['activities','玩乐',62,5.5,22,3.8]);
      if(current!=='activities')html+=hit(['map','地图',38.5,86.3,11.2,2.3])+hit(['map-list','列表',50,86.3,11.5,2.3]);
    }
    if(current==='map-list')['red','white','west','platform','east'].forEach((id,i)=>{
      html+=hit([id==='red'?'palace':`locate-${id}`,`查看${mapPlaces.find(p=>p.id===id).name}`,4.5,10.5+i*15.1,74,13.6]);
      html+=hit([`locate-${id}`,'查看路线',79,10.6+i*15.1,16,3.9])+hit([`locate-${id}`,'地图定位',86.6,17.7+i*15.1,6,2.7]);
    });
    if(current==='blessing')html+='<div class="potala-blessing-gesture" data-gesture="blessing" aria-label="滑动转经筒" role="button" tabindex="0"></div>';
    if(current==='home')html+='<div class="potala-home-gesture" data-gesture="home"></div>';
    if(current==='booking')html+=bookingMarkup();
    if(current==='culture-product'&&quantity!==1)html+=`<span class="potala-original-text" style="${box(83,67.3,6,2.2)};background:white">${String(quantity).padStart(2,'0')}</span>`;
    return html;
  }
  function render(){
    const file=fileFor(),version=++loadVersion;
    host.innerHTML=`<div class="potala-prototype-layout"><div class="potala-phone-column"><div class="potala-phone"><div class="potala-phone-screen" data-screen="${current}" aria-label="${byId[current].title}"><img class="potala-screen-image" src="${folder+file}" alt="${byId[current].title}" loading="lazy" decoding="async" draggable="false">${mapMarkup(file)}${wheelMarkup(file)}${blessingChrome()}${screenHits()}</div></div><p class="potala-proto-help">${['map','floors'].includes(current)?'拖动查看地图 · 双指或滚轮缩放 · 双击复位':current==='blessing'?'左右拖动切换转经筒':'点击画面中原有的按钮进行体验'}</p><div class="potala-toast" role="status" aria-live="polite">${esc(status)}</div></div><div class="potala-screen-index"><h3>页面索引</h3><div class="potala-screen-grid">${screens.map(s=>`<button type="button" class="potala-screen-tile${s.id===current?' is-active':''}" data-action="${s.id}" aria-label="打开${s.title}"><span class="potala-screen-thumb"><img src="${folder+s.file}" alt="" loading="lazy" decoding="async"></span><span>${s.title}</span></button>`).join('')}</div></div></div>`;
    host.querySelector('.potala-screen-image').addEventListener('error',()=>{if(version===loadVersion)tell(`图片未加载：${file}`);});
    if(['map','floors'].includes(current))setupMap();
    if(current==='blessing')setWheelProgress(0);
  }
  function setupMap(focus='red'){
    const viewport=host.querySelector('.potala-map-viewport');if(!viewport)return;
    const w=viewport.clientWidth,h=viewport.clientHeight;
    camera.height=h;camera.width=current==='map'?h*8880/(2972*0.79):detailAssets[floor]?h*detailAssets[floor].ratio:w;camera.zoom=1;
    camera.x=current==='map'?w/2-camera.width*(mapPlaces.find(p=>p.id===focus)?.x||44)/100:(w-camera.width)/2;
    camera.y=0;updateMap();
  }
  function updateMap(){
    const viewport=host.querySelector('.potala-map-viewport'),world=host.querySelector('.potala-map-world');if(!viewport||!world)return;
    const w=camera.width*camera.zoom,h=camera.height*camera.zoom;
    camera.x=w<viewport.clientWidth?(viewport.clientWidth-w)/2:Math.max(viewport.clientWidth-w,Math.min(0,camera.x));
    camera.y=h<viewport.clientHeight?(viewport.clientHeight-h)/2:Math.max(viewport.clientHeight-h,Math.min(0,camera.y));
    world.style.width=camera.width+'px';world.style.height=camera.height+'px';world.style.transform=`translate(${camera.x}px,${camera.y}px) scale(${camera.zoom})`;
  }
  function zoomAt(next,x,y){
    const viewport=host.querySelector('.potala-map-viewport');if(!viewport)return;
    const min=current==='map'?viewport.clientWidth/camera.width:1;
    next=Math.max(min,Math.min(3,next));const ratio=next/camera.zoom;
    camera.x=x-(x-camera.x)*ratio;camera.y=y-(y-camera.y)*ratio;camera.zoom=next;updateMap();
  }
  function spinWheel(direction){
    if(wheelBusy||current!=='blessing')return;
    wheelBusy=true;
    host.querySelector('.potala-wheel-stage')?.classList.add('is-finishing');
    setWheelProgress(direction);
    window.setTimeout(()=>{
      blessing=(blessing+(direction===1?1:2)-1)%3+1;
      wheelBusy=false;
      if(current==='blessing')render();
    },360);
  }
  function act(name){
    if(name==='back'){route(history.pop()||'home',true);return;}
    if(name==='notice-ok'){route('home',true);history.pop();return;}
    if(name==='blessing-close'){route('blessing',true);history.pop();return;}
    if(name.startsWith('floor-')){floor=Number(name.slice(-1));drawer=false;loadFloorDetail(floor);render();return;}
    if(name==='drawer'){drawer=!drawer;render();return;}
    if(name==='blessing-next'||name==='blessing-prev'){spinWheel(name==='blessing-next'?1:-1);return;}
    if(name==='mute'){tell('当前素材没有音频，转经筒以静音展示。');return;}
    if(name.startsWith('place-')){const id=name.slice(6);if(id==='red')route('floors');else tell(`${mapPlaces.find(p=>p.id===id)?.name}：目前仅提供了红宫的分层详情。`);return;}
    if(name.startsWith('locate-')){route('map');setupMap(name.slice(7));return;}
    if(name.startsWith('booking-route-')){reservation.route=Number(name.slice(-1));render();return;}
    if(name.startsWith('booking-day-')){reservation.day=Number(name.slice(12));render();return;}
    if(name.startsWith('booking-time-')){reservation.time=Number(name.slice(13));render();return;}
    if(name==='booking-add'){reservation.visitors=reservation.visitors%4+1;render();return;}
    if(name==='booking-submit'){
      if(!reservation.visitors){tell('请先点击原图中的“添加游客”。');return;}
      if(!/^[0-9+ -]{7,20}$/.test(reservation.phone)){tell('请在原图的联系人电话处填写电话号码。');host.querySelector('.potala-phone-input')?.focus();return;}
      bookingRecord={...reservation};route('profile');tell(`模拟预约已记录：2月${bookingRecord.day}日，${bookingRecord.visitors}位游客。`);return;
    }
    if(name==='booking-record'){tell(bookingRecord?`模拟预约：2月${bookingRecord.day}日，${bookingRecord.visitors}位游客。`:'当前没有本次体验产生的预约记录。');return;}
    if(name==='quantity-more'||name==='quantity-less'){quantity=Math.max(1,Math.min(99,quantity+(name==='quantity-more'?1:-1)));render();return;}
    if(name==='cart'){tell(`已加入 ${quantity} 件胸针（本次体验记录）。`);return;}
    if(name.startsWith('missing-')){tell('这个按钮的位置已对应原图，但尚未提供它的后续页面素材。');return;}
    if(byId[name])route(name);
  }
  host.addEventListener('click',e=>{if(performance.now()<suppressedUntil&&e.target.closest('[data-gesture]'))return;const button=e.target.closest('[data-action]');if(button)act(button.dataset.action);});
  host.addEventListener('input',e=>{if(e.target.matches('.potala-phone-input'))reservation.phone=e.target.value;});
  host.addEventListener('wheel',e=>{
    const viewport=e.target.closest('.potala-map-viewport');if(!viewport)return;
    e.preventDefault();const r=viewport.getBoundingClientRect();zoomAt(camera.zoom*Math.exp(-e.deltaY*.002),e.clientX-r.left,e.clientY-r.top);
  },{passive:false});
  host.addEventListener('dblclick',e=>{if(e.target.closest('.potala-map-viewport')){e.preventDefault();setupMap();}});
  host.addEventListener('pointerdown',e=>{
    const zone=e.target.closest('[data-gesture]');if(!zone||e.button>0)return;
    const p={x:e.clientX,y:e.clientY};pointers.set(e.pointerId,p);
    if(!gesture)gesture={kind:zone.dataset.gesture,start:p,last:p,moved:false,action:e.target.closest('[data-action]')?.dataset.action};
    if(pointers.size===2){const[a,b]=[...pointers.values()];gesture.distance=Math.hypot(a.x-b.x,a.y-b.y);gesture.center={x:(a.x+b.x)/2,y:(a.y+b.y)/2};gesture.moved=true;}
    zone.setPointerCapture(e.pointerId);
  });
  host.addEventListener('pointermove',e=>{
    if(!gesture||!pointers.has(e.pointerId))return;
    const old=pointers.get(e.pointerId),p={x:e.clientX,y:e.clientY};pointers.set(e.pointerId,p);
    if(Math.hypot(p.x-gesture.start.x,p.y-gesture.start.y)>5)gesture.moved=true;
    if(gesture.kind==='blessing'){
      setWheelProgress(Math.max(-.95,Math.min(.95,(gesture.start.x-p.x)/110)));
    }
    if(gesture.kind==='drawer'){
      const screen=host.querySelector('.potala-phone-screen'),panel=host.querySelector('.potala-floor-panel'),viewport=host.querySelector('.potala-map-viewport'),zone=host.querySelector('.potala-drawer-gesture');
      if(screen&&panel&&viewport&&zone){
        const r=screen.getBoundingClientRect(),startTop=drawer?80:92;
        const top=Math.max(80,Math.min(92,startTop+(p.y-gesture.start.y)/r.height*100));
        gesture.drawerTop=top;panel.style.transition='none';viewport.style.transition='none';panel.style.visibility='visible';panel.style.top=top+'%';panel.style.height=(100-top)+'%';viewport.style.height=(top-12)+'%';zone.style.top=top+'%';zone.style.height=(100-top)+'%';
      }
    }
    if(gesture.kind==='map'){
      if(pointers.size===2){
        const[a,b]=[...pointers.values()],distance=Math.hypot(a.x-b.x,a.y-b.y),center={x:(a.x+b.x)/2,y:(a.y+b.y)/2};
        const r=host.querySelector('.potala-map-viewport').getBoundingClientRect();
        camera.x+=center.x-gesture.center.x;camera.y+=center.y-gesture.center.y;
        zoomAt(camera.zoom*distance/Math.max(1,gesture.distance),center.x-r.left,center.y-r.top);gesture.distance=distance;gesture.center=center;
      }else{camera.x+=p.x-old.x;camera.y+=p.y-old.y;updateMap();}
    }
    gesture.last=p;
  });
  function endGesture(e,cancelled=false){
    if(!gesture||!pointers.has(e.pointerId))return;pointers.delete(e.pointerId);if(pointers.size)return;
    const g=gesture;gesture=null;if(cancelled)return;suppressedUntil=performance.now()+350;
    if(g.kind==='home'&&g.last.x-g.start.x<-35){route('map');return;}
    if(g.kind==='blessing'){
      if(Math.abs(g.last.x-g.start.x)>20||!g.moved)spinWheel(g.last.x-g.start.x>0?-1:1);
      else {const stage=host.querySelector('.potala-wheel-stage');stage?.classList.add('is-finishing');setWheelProgress(0);window.setTimeout(()=>stage?.classList.remove('is-finishing'),360);}
      return;
    }
    if(g.kind==='drawer'){
      const screen=host.querySelector('.potala-phone-screen'),panel=host.querySelector('.potala-floor-panel'),viewport=host.querySelector('.potala-map-viewport'),zone=host.querySelector('.potala-drawer-gesture');
      const next=g.moved?(g.drawerTop??(drawer?80:92))<86:!drawer;
      drawer=next;
      if(screen&&panel&&viewport&&zone){
        const top=drawer?80:92,height=drawer?20:8;
        panel.style.transition='';viewport.style.transition='';panel.classList.toggle('is-open',drawer);panel.style.visibility=drawer?'visible':'hidden';panel.style.top=top+'%';panel.style.height=height+'%';viewport.style.height=(drawer?68:81.5)+'%';zone.style.top=top+'%';zone.style.height=height+'%';zone.setAttribute('aria-label',drawer?'向下滑动收起信息卡':'向上滑动查看信息卡');
        window.setTimeout(()=>{if(current==='floors'&&drawer===next)setupMap();},320);
      }
      return;
    }
    if(!g.moved&&g.action)act(g.action);
  }
  host.addEventListener('pointerup',e=>endGesture(e));host.addEventListener('pointercancel',e=>endGesture(e,true));
  host.addEventListener('keydown',e=>{
    if(e.key==='Escape'&&current==='notice')act('notice-ok');if(e.key==='Escape'&&current==='blessing-info')act('blessing-close');
    if((e.key==='Enter'||e.key===' ')&&e.target.matches('.potala-blessing-gesture')){e.preventDefault();act('blessing-next');}
    if((e.key==='Enter'||e.key===' ')&&e.target.matches('.potala-drawer-gesture')){e.preventDefault();act('drawer');}
  });
  render();
  let lastWidth=host.clientWidth;
  new ResizeObserver(()=>{if(host.clientWidth!==lastWidth){lastWidth=host.clientWidth;if(['map','floors'].includes(current))setupMap();}}).observe(host);
})();

