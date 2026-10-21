import React,{useEffect,useRef} from 'react';
import './styles/space.css';
export default function SpaceBackground({theme}){
 const canvasRef=useRef(),themeRef=useRef(theme),redraw=useRef(()=>{});themeRef.current=theme;
 useEffect(()=>{
  const canvas=canvasRef.current,ctx=canvas.getContext('2d');if(!ctx)return;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)'),fine=matchMedia('(pointer: fine)');
  let width=0,height=0,stars=[],frame=0,last=0,time=0,scroll=window.scrollY,targetX=0,targetY=0,x=0,y=0;
  function draw(){
   const dark=themeRef.current==='dark';ctx.clearRect(0,0,width,height);
   for(const star of stars){
    const depth=star.depth,px=(star.x*width+x*depth*19+Math.sin(time*.025+star.phase)*depth*5+width+30)%(width+60)-30,py=(star.y*height+y*depth*14-scroll*depth*.018+height*10)%(height+60)-30;
    const twinkle=reduced.matches?1:.85+.15*Math.sin(time*.45+star.phase);
    ctx.globalAlpha=(.14+depth*.42)*twinkle;ctx.fillStyle=dark?'#d7e0ec':'#535e6c';ctx.beginPath();ctx.arc(px,py,star.radius,0,Math.PI*2);ctx.fill();
   }
   ctx.globalAlpha=1;
  }
  function tick(now){frame=0;if(document.hidden||reduced.matches)return;frame=requestAnimationFrame(tick);if(now-last<40)return;const dt=Math.min((now-last)/1000,.06);last=now;time+=dt;x+=(targetX-x)*.045;y+=(targetY-y)*.045;draw();}
  function sync(){cancelAnimationFrame(frame);frame=0;last=performance.now();draw();if(!document.hidden&&!reduced.matches)frame=requestAnimationFrame(tick);}
  function resize(){width=innerWidth;height=innerHeight;const dpr=Math.min(devicePixelRatio||1,1.5);canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);let seed=73;const random=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};const count=Math.min(width<700?85:190,Math.round(width*height/6500));stars=Array.from({length:count},()=>{const depth=.15+random()*.85;return {x:random(),y:random(),depth,radius:.35+depth*.8,phase:random()*Math.PI*2};});draw();}
  const move=e=>{if(reduced.matches||!fine.matches)return;targetX=(e.clientX/width-.5)*2;targetY=(e.clientY/height-.5)*2;};
  const leave=()=>{targetX=targetY=0;};const onScroll=()=>{scroll=window.scrollY;if(reduced.matches)draw();};
  const motionChange=()=>{if(reduced.matches){x=y=targetX=targetY=0;}sync();};
  redraw.current=draw;resize();sync();addEventListener('resize',resize);addEventListener('pointermove',move,{passive:true});document.addEventListener('pointerleave',leave);addEventListener('scroll',onScroll,{passive:true});document.addEventListener('visibilitychange',sync);reduced.addEventListener('change',motionChange);
  return()=>{cancelAnimationFrame(frame);removeEventListener('resize',resize);removeEventListener('pointermove',move);document.removeEventListener('pointerleave',leave);removeEventListener('scroll',onScroll);document.removeEventListener('visibilitychange',sync);reduced.removeEventListener('change',motionChange);redraw.current=()=>{};};
 },[]);
 useEffect(()=>redraw.current(),[theme]);
 return <div className="star-background" aria-hidden="true"><canvas ref={canvasRef}/></div>;
}
