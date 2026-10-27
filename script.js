"use strict";
const menuButton=document.querySelector('.menu-toggle');
const mobileMenu=document.querySelector('#mobile-menu');
function closeMenu(){mobileMenu.hidden=true;menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Open menu');}
menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Close menu':'Open menu');mobileMenu.hidden=!open;});
mobileMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
window.addEventListener('resize',()=>{if(window.innerWidth>780)closeMenu();});
document.querySelector('#year').textContent=new Date().getFullYear();
document.querySelectorAll('.photo img').forEach(img=>{function fail(){img.hidden=true;const label=img.parentElement.querySelector('.missing');if(label)label.hidden=false;}img.addEventListener('error',fail);if(img.complete&&img.naturalWidth===0)fail();});
document.querySelectorAll('.logo').forEach(img=>{function fail(){img.hidden=true;img.nextElementSibling.hidden=false;}img.addEventListener('error',fail);if(img.complete&&img.naturalWidth===0)fail();});
const photos=["working on car night.jpg", "new crate engine.jpg", "car on hill.jpg", "working on car with kid.jpg", "car with logo on back glass.webp", "outdoor engine work.webp"];
const dialog=document.querySelector('.lightbox'),large=dialog.querySelector('img'),count=dialog.querySelector('.count');let index=0,opener=null,oldOverflow='';
function showPhoto(i){index=(i+photos.length)%photos.length;large.src=encodeURI(photos[index]);large.alt=photos[index].replace(/\.(jpg|webp)$/,'');count.textContent=`${index+1} / ${photos.length}`;}
document.querySelectorAll('.gallery-item').forEach(button=>button.addEventListener('click',()=>{opener=button;showPhoto(Number(button.dataset.index));oldOverflow=document.body.style.overflow;document.body.style.overflow='hidden';dialog.showModal();dialog.querySelector('.close').focus();}));
dialog.querySelector('.close').addEventListener('click',()=>dialog.close());dialog.querySelector('.prev').addEventListener('click',()=>showPhoto(index-1));dialog.querySelector('.next').addEventListener('click',()=>showPhoto(index+1));
dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});dialog.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();showPhoto(index+1);}if(e.key==='ArrowLeft'){e.preventDefault();showPhoto(index-1);}});dialog.addEventListener('close',()=>{document.body.style.overflow=oldOverflow;opener?.focus();});
const video=document.querySelector('#work-video');video.muted=false;video.volume=1;video.addEventListener('error',()=>document.querySelector('.video-error').hidden=false);video.querySelector('source').addEventListener('error',()=>document.querySelector('.video-error').hidden=false);
if('IntersectionObserver' in window&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches&&window.innerWidth>900){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.remove('pending');observer.unobserve(entry.target);}}),{threshold:.08});document.querySelectorAll('.reveal').forEach(el=>{el.classList.add('pending');observer.observe(el);});}
