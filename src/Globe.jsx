import React,{useEffect,useRef,useState} from 'react';
import world from './data/world.json';
import cities from './data/destinations.json';
const vector=([lon,lat],r=1)=>{const a=lon*Math.PI/180,b=lat*Math.PI/180;return [Math.cos(b)*Math.sin(a)*r,-Math.sin(b)*r,Math.cos(b)*Math.cos(a)*r];};
// Geography and routes are prepared once; animation only transforms existing points.
const coasts=world.coasts.map(line=>line.map(p=>vector(p))),land=world.dots.map(p=>vector(p));
const grid=[];for(let lat=-75;lat<=75;lat+=15){const line=[];for(let lon=-180;lon<=180;lon+=5)line.push(vector([lon,lat]));grid.push(line);}for(let lon=-180;lon<180;lon+=15){const line=[];for(let lat=-90;lat<=90;lat+=5)line.push(vector([lon,lat]));grid.push(line);}
const origin=vector([cities[0].lon,cities[0].lat]);
const routes=cities.slice(1).map(city=>{const end=vector([city.lon,city.lat]),angle=Math.acos(origin.reduce((s,v,i)=>s+v*end[i],0)),line=[];for(let j=0;j<=40;j++){const t=j/40,a=Math.sin((1-t)*angle)/Math.sin(angle),b=Math.sin(t*angle)/Math.sin(angle),r=1+.1*Math.sin(t*Math.PI);line.push(origin.map((v,i)=>(v*a+end[i]*b)*r));}return line;});
export default function Globe({lang}){
 const canvasRef=useRef(),actions=useRef({}),langRef=useRef(lang);langRef.current=lang;
 const [playing,setPlaying]=useState(()=>!matchMedia('(prefers-reduced-motion: reduce)').matches),[selected,setSelected]=useState(0);
 useEffect(()=>{const canvas=canvasRef.current,ctx=canvas.getContext('2d');if(!ctx)return;let size=0,yaw=-.25,pitch=-.35,visible=false,play=!matchMedia('(prefers-reduced-motion: reduce)').matches,frame=0,last=0,drag=null,selection=0,hit=[],scheduled=0;const media=matchMedia('(prefers-reduced-motion: reduce)');
  function draw(){
   if(!size)return;const ca=Math.cos(yaw),sa=Math.sin(yaw),cb=Math.cos(pitch),sb=Math.sin(pitch),r=size*.385;
   const project=([vx,vy,vz])=>{const x=vx*ca+vz*sa,z=vz*ca-vx*sa;return [size/2+x*r,size*.48+(vy*cb-z*sb)*r,z*cb+vy*sb];};
   function stroke(points,alpha,width){ctx.beginPath();let pen=false;for(const v of points){const p=project(v);if(p[2]<0){pen=false;continue;}pen?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]);pen=true;}ctx.strokeStyle=`rgba(0,0,0,${alpha})`;ctx.lineWidth=width;ctx.stroke();}
   ctx.clearRect(0,0,size,size);ctx.beginPath();ctx.arc(size/2,size*.48,r,0,Math.PI*2);ctx.fillStyle='#e9e8e8';ctx.fill();ctx.strokeStyle='#999';ctx.lineWidth=.8;ctx.stroke();
   for(const line of grid)stroke(line,.14,.6);for(const line of coasts)stroke(line,.56,.85);
   ctx.beginPath();for(const v of land){const p=project(v);if(p[2]>.02){ctx.moveTo(p[0]+.8,p[1]);ctx.arc(p[0],p[1],.8,0,Math.PI*2);}}ctx.fillStyle='#0006';ctx.fill();
   for(const line of routes)stroke(line,.17,.65);
   hit=[];cities.forEach((city,i)=>{const p=project(vector([city.lon,city.lat],1.005));if(p[2]<.02)return;hit.push({i,x:p[0],y:p[1]});ctx.beginPath();ctx.arc(p[0],p[1],i===0?4:1.8,0,Math.PI*2);ctx.fillStyle=i===0?'#000':'#777';ctx.fill();if(i===0){ctx.beginPath();ctx.arc(p[0],p[1],8,0,Math.PI*2);ctx.strokeStyle='#000';ctx.lineWidth=.8;ctx.stroke();ctx.font='9px monospace';ctx.fillText(city.name[langRef.current],p[0]+12,p[1]+3);}});
  }
  function drawSoon(){if(!scheduled)scheduled=requestAnimationFrame(()=>{scheduled=0;draw();});}
  function animate(t){if(t-last>=42){if(!drag)yaw+=.0018;draw();last=t;}frame=requestAnimationFrame(animate);}
  function sync(){cancelAnimationFrame(frame);if(visible&&!document.hidden&&play)frame=requestAnimationFrame(animate);else drawSoon();}
  const resize=()=>{size=canvas.clientWidth;const dpr=Math.min(devicePixelRatio||1,size<500?1.25:1.5);canvas.width=Math.round(size*dpr);canvas.height=Math.round(size*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);drawSoon();};
  const down=e=>{drag={x:e.clientX,y:e.clientY,sx:e.clientX,sy:e.clientY,moved:false};canvas.setPointerCapture(e.pointerId);};
  const move=e=>{if(!drag)return;drag.moved ||= Math.hypot(e.clientX-drag.sx,e.clientY-drag.sy)>5;yaw+=(e.clientX-drag.x)*.006;if(e.pointerType!=='touch')pitch=Math.max(-.7,Math.min(.7,pitch+(e.clientY-drag.y)*.004));drag.x=e.clientX;drag.y=e.clientY;drawSoon();};
  const up=e=>{if(drag&&!drag.moved){const rect=canvas.getBoundingClientRect(),target=hit.map(p=>({...p,distance:Math.hypot(p.x-(e.clientX-rect.left),p.y-(e.clientY-rect.top))})).filter(p=>p.distance<17).sort((a,b)=>a.distance-b.distance)[0];if(target){selection=target.i;setSelected(selection);drawSoon();}}drag=null;};const cancel=()=>{drag=null;};
  const keys=e=>{if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key))return;e.preventDefault();if(e.key==='ArrowLeft')yaw-=.12;if(e.key==='ArrowRight')yaw+=.12;if(e.key==='ArrowUp')pitch=Math.max(-.7,pitch-.08);if(e.key==='ArrowDown')pitch=Math.min(.7,pitch+.08);drawSoon();};
  actions.current={play(value){play=value;sync();},reset(){yaw=-.25;pitch=-.35;selection=0;setSelected(0);drawSoon();},next(){selection=(selection+1)%cities.length;yaw=-cities[selection].lon*Math.PI/180;setSelected(selection);drawSoon();},draw:drawSoon};
  const intersection=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync();},{rootMargin:'60px'});intersection.observe(canvas);const observer=new ResizeObserver(resize);observer.observe(canvas);document.addEventListener('visibilitychange',sync);const reducedChange=()=>setPlaying(!media.matches);media.addEventListener('change',reducedChange);
  canvas.addEventListener('pointerdown',down);canvas.addEventListener('pointermove',move);canvas.addEventListener('pointerup',up);canvas.addEventListener('pointercancel',cancel);canvas.addEventListener('lostpointercapture',cancel);canvas.addEventListener('keydown',keys);resize();
  return()=>{cancelAnimationFrame(frame);cancelAnimationFrame(scheduled);intersection.disconnect();observer.disconnect();document.removeEventListener('visibilitychange',sync);media.removeEventListener('change',reducedChange);canvas.removeEventListener('pointerdown',down);canvas.removeEventListener('pointermove',move);canvas.removeEventListener('pointerup',up);canvas.removeEventListener('pointercancel',cancel);canvas.removeEventListener('lostpointercapture',cancel);canvas.removeEventListener('keydown',keys);actions.current={};};
 },[]);
 useEffect(()=>actions.current.play?.(playing),[playing]);useEffect(()=>actions.current.draw?.(),[lang]);
 const city=cities[selected],it=lang==='it';
 return <div className="orbital-stage map-stage"><div className="orbital-grid" aria-hidden="true"/><span className="stage-label">AS / {it?'15 PAESI VISITATI':'15 COUNTRIES VISITED'}</span><canvas ref={canvasRef} id="tech-globe" tabIndex="0" role="img" aria-label={it?'Globo interattivo. Trascina o usa le frecce per ruotare.':'Interactive globe. Drag or use arrow keys to rotate.'}/><span className="map-hint">{it?'TRASCINA PER ESPLORARE':'DRAG TO EXPLORE'} ↔</span><div className="map-controls"><button className="map-toggle" type="button" aria-pressed={playing} onClick={()=>setPlaying(!playing)}>{playing?(it?'Ⅱ PAUSA':'Ⅱ PAUSE'):(it?'▷ RUOTA':'▷ ROTATE')}</button><button className="map-city" type="button" onClick={()=>actions.current.next?.()}>{it?'ESPLORA':'EXPLORE'} ↗</button><button className="map-reset" type="button" onClick={()=>actions.current.reset?.()}>{it?'RIPRISTINA':'RESET'} ↺</button></div><span className="map-location" aria-live="polite">{city.name[lang]} · {Math.abs(city.lat).toFixed(2)}°{city.lat<0?'S':'N'} / {Math.abs(city.lon).toFixed(2)}°{city.lon<0?'W':'E'}</span></div>;
}
