(() => {
  'use strict';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const progress = document.createElement('div');
  progress.className = 'future-progress';
  document.body.append(progress);
  let scrollQueued = false;
  function updateScroll() {
    const length = document.documentElement.scrollHeight - innerHeight;
    progress.style.transform = `scaleX(${length > 0 ? scrollY / length : 0})`;
    scrollQueued = false;
  }
  addEventListener('scroll', () => { if (!scrollQueued) { scrollQueued = true; requestAnimationFrame(updateScroll); } }, {passive:true});
  addEventListener('resize', updateScroll);
  updateScroll();
  const current = location.pathname.split('/').pop() || 'homepage.html';
  document.querySelectorAll('.nav-list a').forEach(a => { if (a.getAttribute('href') === current) a.setAttribute('aria-current','page'); });
  const toggle = document.querySelector('#hamburger-checkbox');
  const links = document.querySelector('.navbar-links');
  if (toggle && links) {
    toggle.setAttribute('aria-label', 'Open navigation');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.addEventListener('change', () => {
      links.classList.toggle('active', toggle.checked);
      toggle.setAttribute('aria-expanded', String(toggle.checked));
    });
    document.addEventListener('keydown', e => { if(e.key === 'Escape') { toggle.checked=false; links.classList.remove('active'); toggle.setAttribute('aria-expanded','false'); } });
  }
  if ('IntersectionObserver' in window && !reduced.matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }), {threshold:.08});
    document.querySelectorAll('.work-card,.contact-box,.stat-category,.timeline-item,.section-header').forEach(el => {el.classList.add('reveal-ready');observer.observe(el);});
  }
  const lightbox = document.querySelector('#visual-lightbox');
  if (lightbox) {
    const close = document.createElement('button');
    close.className='lightbox-close';close.textContent='×';close.setAttribute('aria-label','Close image');lightbox.append(close);
    lightbox.setAttribute('role','dialog');lightbox.setAttribute('aria-modal','true');lightbox.setAttribute('aria-label','Project image');lightbox.setAttribute('aria-hidden','true');
    let opener;
    const dismiss = () => {lightbox.classList.remove('show');lightbox.setAttribute('aria-hidden','true');document.body.style.overflow='';if(opener)opener.focus();};
    close.addEventListener('click',dismiss);
    lightbox.addEventListener('click',e=>{if(e.target===lightbox)dismiss();});
    document.querySelectorAll('.clickable-img').forEach(img=>{
      img.tabIndex=0;img.setAttribute('role','button');img.setAttribute('aria-label',`Open ${img.alt}`);
      const open=()=>{opener=img;lightbox.querySelector('img').src=img.src;lightbox.querySelector('img').alt=img.alt;lightbox.classList.add('show');lightbox.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';close.focus();};
      img.addEventListener('click',open);
      img.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open();}});
    });
    lightbox.addEventListener('keydown',e=>{if(e.key==='Escape')dismiss();if(e.key==='Tab'){e.preventDefault();close.focus();}});
  }
  const canvas=document.querySelector('#tech-globe');
  if(!canvas||!window.portfolioWorldMap)return;
  const ctx=canvas.getContext('2d');if(!ctx)return;
  const data=window.portfolioWorldMap,stage=canvas.closest('.map-stage');
  const status=stage.querySelector('.map-location'),mapToggle=stage.querySelector('.map-toggle');
  const cities=[{name:'NAPOLI / IT',lat:40.85,lon:14.27},{name:'LONDON / UK',lat:51.51,lon:-.13},{name:'NEW YORK / US',lat:40.71,lon:-74},{name:'TOKYO / JP',lat:35.68,lon:139.69},{name:'SÃO PAULO / BR',lat:-23.55,lon:-46.63}];
  let size=0,yaw=-.25,pitch=-.35,frame=0,last=0,playing=!reduced.matches,visible=true,drag=null,selected=0,hit=[];
  const vector=([lon,lat],radius=1)=>{const a=lon*Math.PI/180,b=lat*Math.PI/180;return [Math.cos(b)*Math.sin(a)*radius,-Math.sin(b)*radius,Math.cos(b)*Math.cos(a)*radius];};
  const coast=data.coasts.map(path=>path.map(p=>vector(p))),dots=data.dots.map(p=>vector(p));
  const project=v=>{const x=v[0]*Math.cos(yaw)+v[2]*Math.sin(yaw),z=v[2]*Math.cos(yaw)-v[0]*Math.sin(yaw),y=v[1]*Math.cos(pitch)-z*Math.sin(pitch),depth=z*Math.cos(pitch)+v[1]*Math.sin(pitch);return [size/2+x*size*.385,size*.48+y*size*.385,depth];};
  function path(points,alpha,width=1){let pen=false;ctx.beginPath();for(const v of points){const p=project(v);if(p[2]<0){pen=false;continue;}pen?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]);pen=true;}ctx.strokeStyle=`rgba(0,0,0,${alpha})`;ctx.lineWidth=width;ctx.stroke();}
  function draw(){
    ctx.clearRect(0,0,size,size);
    ctx.beginPath();ctx.arc(size/2,size*.48,size*.385,0,Math.PI*2);ctx.fillStyle='#e9e8e8';ctx.fill();ctx.strokeStyle='#999';ctx.lineWidth=.8;ctx.stroke();
    for(let lat=-75;lat<=75;lat+=15){const row=[];for(let lon=-180;lon<=180;lon+=3)row.push(vector([lon,lat]));path(row,.13,.6);}
    for(let lon=-180;lon<180;lon+=15){const row=[];for(let lat=-90;lat<=90;lat+=3)row.push(vector([lon,lat]));path(row,.13,.6);}
    for(const line of coast)path(line,.6,.85);
    ctx.fillStyle='rgba(0,0,0,.4)';for(const v of dots){const p=project(v);if(p[2]>.02){ctx.beginPath();ctx.arc(p[0],p[1],.9,0,Math.PI*2);ctx.fill();}}
    const origin=vector([cities[0].lon,cities[0].lat]);
    for(let c=1;c<cities.length;c++){const end=vector([cities[c].lon,cities[c].lat]),angle=Math.acos(Math.max(-1,Math.min(1,origin.reduce((s,v,i)=>s+v*end[i],0)))),route=[];
      for(let j=0;j<=60;j++){const t=j/60,a=Math.sin((1-t)*angle)/Math.sin(angle),b=Math.sin(t*angle)/Math.sin(angle),r=1+.12*Math.sin(t*Math.PI);route.push(origin.map((v,i)=>(v*a+end[i]*b)*r));}path(route,.28,.8);}
    hit=[];cities.forEach((city,i)=>{const p=project(vector([city.lon,city.lat],1.005));if(p[2]<.02)return;hit.push({i,x:p[0],y:p[1]});ctx.beginPath();ctx.arc(p[0],p[1],i===selected?4:2.7,0,Math.PI*2);ctx.fillStyle='#000';ctx.fill();ctx.beginPath();ctx.arc(p[0],p[1],i===selected?8:6,0,Math.PI*2);ctx.strokeStyle=i===selected?'#000':'#777';ctx.lineWidth=.7;ctx.stroke();if(i===selected){ctx.font='9px monospace';ctx.fillText(city.name,p[0]+12,p[1]+3);}});
  }
  function label(){const c=cities[selected];status.textContent=`${c.name} · ${Math.abs(c.lat).toFixed(2)}°${c.lat<0?'S':'N'} / ${Math.abs(c.lon).toFixed(2)}°${c.lon<0?'W':'E'}`;}
  function resize(){size=canvas.clientWidth;const dpr=Math.min(devicePixelRatio||1,2);canvas.width=size*dpr;canvas.height=size*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);draw();}
  function animate(t){if(t-last>32){if(playing&&!drag)yaw+=.0018;draw();last=t;}frame=requestAnimationFrame(animate);}
  function sync(){cancelAnimationFrame(frame);mapToggle.textContent=playing?(document.documentElement.lang==='it'?'Ⅱ PAUSA':'Ⅱ PAUSE'):(document.documentElement.lang==='it'?'▷ RUOTA':'▷ ROTATE');mapToggle.setAttribute('aria-pressed',String(playing));if(visible&&!document.hidden&&playing)frame=requestAnimationFrame(animate);else draw();}
  mapToggle.addEventListener('click',()=>{playing=!playing;sync();});
  stage.querySelector('.map-reset').addEventListener('click',()=>{yaw=-.25;pitch=-.35;selected=0;label();draw();});
  stage.querySelector('.map-city').addEventListener('click',()=>{selected=(selected+1)%cities.length;yaw=-cities[selected].lon*Math.PI/180;label();draw();});
  canvas.addEventListener('pointerdown',e=>{drag={x:e.clientX,y:e.clientY,startX:e.clientX,startY:e.clientY,moved:false};canvas.setPointerCapture(e.pointerId);});
  canvas.addEventListener('pointermove',e=>{if(!drag)return;const dx=e.clientX-drag.x,dy=e.clientY-drag.y;drag.moved ||= Math.hypot(e.clientX-drag.startX,e.clientY-drag.startY)>5;yaw+=dx*.006;if(e.pointerType!=='touch')pitch=Math.max(-.7,Math.min(.7,pitch+dy*.004));drag.x=e.clientX;drag.y=e.clientY;draw();});
  function release(e){if(!drag)return;if(!drag.moved){const r=canvas.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;const target=hit.find(p=>Math.hypot(p.x-x,p.y-y)<16);if(target){selected=target.i;label();draw();}}drag=null;}
  canvas.addEventListener('pointerup',release);canvas.addEventListener('pointercancel',()=>{drag=null;});canvas.addEventListener('lostpointercapture',()=>{drag=null;});
  canvas.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key))return;e.preventDefault();if(e.key==='ArrowLeft')yaw-=.12;if(e.key==='ArrowRight')yaw+=.12;if(e.key==='ArrowUp')pitch=Math.max(-.7,pitch-.08);if(e.key==='ArrowDown')pitch=Math.min(.7,pitch+.08);draw();});
  reduced.addEventListener('change',()=>{playing=!reduced.matches;sync();});document.addEventListener('visibilitychange',sync);document.addEventListener('portfolio-language-change',sync);
  if('IntersectionObserver'in window)new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync();}).observe(canvas);
  new ResizeObserver(resize).observe(canvas);resize();label();sync();
})();
