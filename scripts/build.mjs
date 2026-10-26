import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import sharp from 'sharp';
import {build} from 'vite';
const data=JSON.parse(await fs.readFile('src/data/content.json','utf8'));
const sources=new Set(['../img/logo.png']);
const serialized=JSON.stringify(data);
for(const match of serialized.matchAll(/(?:\.\.\/)?img\/[a-zA-Z0-9_/. -]+\.(?:png|webp|jpe?g)/g))sources.add(match[0].replace(/^img\//,'../img/'));
await fs.mkdir('public/media',{recursive:true});await fs.mkdir('public/fonts',{recursive:true});await fs.mkdir('public/documents',{recursive:true});
const assets={};let originalBytes=0,optimizedBytes=0;
for(const source of sources){
 const input=source.replace(/^\.\.\//,'');const buffer=await fs.readFile(input);originalBytes+=buffer.length;
 const basename=path.basename(input).replace(/\.(png|webp|jpe?g)$/i,'').replace(/[^a-z0-9-]/gi,'-').toLowerCase();
 const hash=crypto.createHash('sha256').update(buffer).update('webp-v1').digest('hex').slice(0,10);
 const width=input.endsWith('/logo.png')?192:input.includes('Icon')?72:input.includes('certificates/')?700:1600;
 const file=`${basename}-${hash}.webp`;const output=await fs.readFile(`public/media/${file}`).catch(()=>sharp(buffer).rotate().resize({width,withoutEnlargement:true}).webp({quality:80,effort:5}).toBuffer());
 await fs.writeFile(`public/media/${file}`,output);optimizedBytes+=output.length;const meta=await sharp(output).metadata();
 assets[source]={src:`media/${file}`,width:meta.width,height:meta.height};
 if(!input.includes('Icon')&&!input.includes('certificates/')&&!input.endsWith('/logo.png')){
  const thumb=`${basename}-${hash}-small.webp`;const small=await fs.readFile(`public/media/${thumb}`).catch(()=>sharp(buffer).rotate().resize({width:800,withoutEnlargement:true}).webp({quality:77}).toBuffer());await fs.writeFile(`public/media/${thumb}`,small);assets[source].thumb=`media/${thumb}`;optimizedBytes+=small.length;
 }
}
assets['../img/logo.png']={src:'brand/schianology-symbol.svg',width:1000,height:1000};
await fs.writeFile('src/data/assets.json',JSON.stringify(assets));
await sharp('public/'+assets['../img/logo.png'].src).negate({alpha:false}).webp().toFile('public/favicon-white.webp');
await fs.copyFile('fonts/Gyroscope-Sans.woff2','public/fonts/Gyroscope-Sans.woff2');
for(const file of await fs.readdir('documents'))if(file.endsWith('.pdf'))await fs.copyFile(`documents/${file}`,`public/documents/${file}`);
if(process.argv.includes('--assets-only'))process.exit(0);
await build();
await fs.mkdir('dist/html',{recursive:true});
for(const [name,fragment] of Object.entries({homepage:'home',index:'home',works:'projects',aboutme:'about',AboutMe:'about',taptap:'project/taptap',tokko:'project/tokko',exxxplicit:'project/exxxplicit'})){
 const url=`../index.html#${fragment}`;await fs.writeFile(`dist/html/${name}.html`,`<!doctype html><html lang="it"><meta charset="utf-8"><meta http-equiv="refresh" content="0;url=${url}"><title>Alessandro Schiano</title><a href="${url}">Apri il portfolio</a></html>`);
}
console.log(`Image originals: ${(originalBytes/1048576).toFixed(2)} MB; optimized + responsive sizes: ${(optimizedBytes/1048576).toFixed(2)} MB`);
await fs.writeFile('dist/build-report.json',JSON.stringify({originalImageBytes:originalBytes,optimizedImageBytes:optimizedBytes,assets:Object.keys(assets).length},null,2));
