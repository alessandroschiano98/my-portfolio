import fs from 'node:fs';
import vm from 'node:vm';
import {parseHTML} from 'linkedom';
const read=name=>parseHTML(fs.readFileSync(`html/${name}.html`,'utf8')).document;
const translations=vm.runInNewContext(fs.readFileSync('js/translations.js','utf8')+';translations',{document:{addEventListener(){}}});
const home=read('homepage'),works=read('works'),about=read('aboutme');
const localized=(markup,lang)=>{const {document}=parseHTML(`<html><body>${markup}</body></html>`);for(const el of document.querySelectorAll('[data-i18n]')){const value=translations[lang][el.dataset.i18n];if(value)el.innerHTML=value;}for(const image of document.querySelectorAll('img')){image.setAttribute('loading','lazy');image.setAttribute('decoding','async');}return document.body.innerHTML;};
const templates={};
for(const lang of ['it','en']){
 const hero=home.querySelector('.future-hero').cloneNode(true);hero.querySelector('.map-stage').replaceWith(Object.assign(home.createElement('div'),{id:'globe-placeholder'}));
 templates[lang]={hero:localized(hero.outerHTML,lang),pillars:localized(home.querySelector('.core-bar-section').outerHTML,lang),profile:localized(about.querySelector('.about-hero').outerHTML,lang),skills:localized(about.querySelector('.skills-section').outerHTML,lang),story:localized(about.querySelector('.story-section').outerHTML,lang),documents:localized(about.querySelector('.documents-section').outerHTML,lang)};
}
const projects=[...works.querySelectorAll('.branding-card')].map(card=>{const slug=card.querySelector('.buttons a').getAttribute('href').replace('.html','');const detail=read(slug);return {id:slug,name:card.querySelector('h3').textContent,cover:card.querySelector('img').getAttribute('src'),descriptionKey:card.querySelector('.projectContent>p').dataset.i18n,detailKey:detail.querySelector('.works-description').dataset.i18n,category:card.querySelector('.tech').textContent,images:[...detail.querySelectorAll('.clickable-img')].map(el=>({src:el.getAttribute('src'),alt:el.alt}))};});
const web=[...works.querySelectorAll('.extra-dev-section .projectCard')].map(card=>({name:card.querySelector('h3').textContent,cover:card.querySelector('img').getAttribute('src'),descriptionKey:card.querySelector('.projectContent>p').dataset.i18n,links:[...card.querySelectorAll('.buttons a')].map(a=>({href:a.href,label:a.textContent}))}));
const art=[...works.querySelectorAll('.visualCard img')].map((img,i)=>({src:img.getAttribute('src'),alt:`Artwork / ${String(i+1).padStart(2,'0')}`}));
fs.mkdirSync('src/data',{recursive:true});fs.mkdirSync('src/styles',{recursive:true});
fs.writeFileSync('src/data/content.json',JSON.stringify({translations,templates,projects,web,art}));
const map=vm.runInNewContext(fs.readFileSync('js/world-map.js','utf8')+';window.portfolioWorldMap',{window:{}});
fs.writeFileSync('src/data/world.json',JSON.stringify(map));
fs.writeFileSync('src/styles/about.css',about.querySelector('style').textContent);
fs.copyFileSync('css/future.css','src/styles/theme.css');
fs.copyFileSync('css/homepage.css','src/styles/navigation.css');
fs.copyFileSync('css/works.css','src/styles/archive.css');
console.log('Existing content preserved in both languages; three case studies and galleries extracted.');
