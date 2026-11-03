import React,{useState,useEffect,useRef} from 'react';
import content from './data/content.json';
import assets from './data/assets.json';
import './styles/portrait.css';
export default function AnimatedPortrait({lang}){
 const ref=useRef(),it=lang==='it';
 const [ready,setReady]=useState(false),[failed,setFailed]=useState(false),[scene,setScene]=useState(null),[visible,setVisible]=useState(false),[hidden,setHidden]=useState(document.hidden),[playing,setPlaying]=useState(()=>!matchMedia('(prefers-reduced-motion: reduce)').matches);
 const get=key=>assets[content.portrait[key]]?.src||content.portrait[key].replace('../','');
 useEffect(()=>{const observer=new IntersectionObserver(entries=>setVisible(entries[0].isIntersecting),{rootMargin:'40px'});observer.observe(ref.current);const media=matchMedia('(prefers-reduced-motion: reduce)'),onMotion=()=>{setPlaying(!media.matches);setScene(null);},onVisibility=()=>setHidden(document.hidden);media.addEventListener('change',onMotion);document.addEventListener('visibilitychange',onVisibility);return()=>{observer.disconnect();media.removeEventListener('change',onMotion);document.removeEventListener('visibilitychange',onVisibility);};},[]);
 const show=ready&&!failed,scenes=it?['Graffiti','Grafite','Stelle']:['Graffiti','Graphite','Stars'];
 return <div ref={ref} className={`photo-wrapper animated-portrait ${show?'is-ready':''} ${scene!==null?'is-manual':''}`} style={{'--portrait-play':playing&&visible&&!hidden?'running':'paused'}}>
  <div className="portrait-backdrops" aria-hidden="true">{scenes.map((label,index)=><div key={index} className={`portrait-scene portrait-scene-${index} ${scene===index?'is-chosen':''}`} style={index===0?{backgroundImage:`url("${get('background')}")`}:undefined}>{index===2&&<div className="portrait-starfield"/>}</div>)}<div className="portrait-halo"/></div>
  <img className="portrait-cutout" src={get('foreground')} alt="Alessandro Schiano" loading="lazy" decoding="async" onLoad={()=>setReady(true)} onError={()=>setFailed(true)}/>
  <img className="portrait-fallback" src={get('fallback')} alt={show?'':'Alessandro Schiano'} aria-hidden={show} loading="lazy" decoding="async"/>
  {show&&<div className="portrait-controls"><div className="portrait-scenes" role="group" aria-label={it?'Sfondo del ritratto':'Portrait background'}>{scenes.map((label,index)=><button key={label} type="button" aria-label={label} title={label} aria-pressed={scene===index} onClick={()=>{setScene(index);setPlaying(false);}}><span/></button>)}</div><button type="button" className="portrait-pause" aria-label={playing?(it?'Ferma gli sfondi':'Pause backgrounds'):(it?'Avvia gli sfondi':'Play backgrounds')} title={playing?(it?'Pausa':'Pause'):(it?'Riprendi':'Play')} aria-pressed={!playing} onClick={()=>{if(!playing)setScene(null);setPlaying(!playing);}}><svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">{playing?<path d="M6 4h4v16H6zm8 0h4v16h-4z"/>:<path d="m8 4 12 8-12 8z"/>}</svg></button></div>}
 </div>;
}
