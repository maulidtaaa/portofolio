document.addEventListener('DOMContentLoaded',()=>{
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const pre=document.getElementById('preloader'), pct=document.getElementById('splashPercent'), splashStars=document.getElementById('splashStars');
  for(let i=0;i<110;i++){const s=document.createElement('i');s.className='star';s.style.left=Math.random()*100+'%';s.style.top=Math.random()*100+'%';s.style.opacity=.25+Math.random()*.75;s.style.setProperty('--t',(1.5+Math.random()*4)+'s');if(splashStars)splashStars.appendChild(s)}
  if(pre){let n=0;const timer=setInterval(()=>{n=Math.min(100,n+Math.floor(3+Math.random()*9));if(pct)pct.textContent=String(n).padStart(2,'0')+'%';if(n>=100){clearInterval(timer);setTimeout(()=>{document.getElementById('splashName')?.classList.add('show');setTimeout(()=>pre.classList.add('done'),reduced?180:1700)},reduced?50:500)}},reduced?20:90)}
  const starLayer=document.getElementById('starLayer');
  if(starLayer&&!reduced){for(let i=0;i<95;i++){const s=document.createElement('i');s.className='star';s.style.left=Math.random()*100+'%';s.style.top=Math.random()*100+'%';s.style.setProperty('--t',(1.5+Math.random()*5)+'s');s.style.animationDelay=(-Math.random()*5)+'s';starLayer.appendChild(s)}}
  const cursor=document.getElementById('cursorOrb');window.addEventListener('pointermove',e=>{if(cursor){cursor.style.left=e.clientX+'px';cursor.style.top=e.clientY+'px'}});
  const menu=document.getElementById('menuButton'),nav=document.getElementById('navDock');if(menu&&nav){menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open))});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')))}
  const reveals=document.querySelectorAll('.reveal');if('IntersectionObserver'in window&&!reduced){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.12});reveals.forEach((e,i)=>{e.style.transitionDelay=(i%5)*.06+'s';io.observe(e)})}else reveals.forEach(e=>e.classList.add('visible'));
  const links=[...document.querySelectorAll('.nav-dock a')],sections=links.map(a=>document.querySelector(a.getAttribute('href'))).filter(Boolean);const spy=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id))}}),{rootMargin:'-35% 0px -55%'});sections.forEach(s=>spy.observe(s));
  const theme=document.getElementById('themeButton');
  const applyTheme=(mode)=>{
    document.body.classList.toggle('light',mode==='light');
    if(theme){theme.textContent=mode==='light'?'☀':'◐';theme.setAttribute('aria-label',mode==='light'?'Kembali ke tema Galaxy':'Gunakan tema Bumi');}
    try{localStorage.setItem('myf-theme',mode)}catch(e){}
  };
  let savedTheme='dark';
  try{savedTheme=localStorage.getItem('myf-theme')||'dark'}catch(e){}
  applyTheme(savedTheme);
  theme?.addEventListener('click',()=>applyTheme(document.body.classList.contains('light')?'dark':'light'));
  const gallery=[...document.querySelectorAll('[data-gallery-index]')].map(b=>({index:Number(b.dataset.galleryIndex),src:b.querySelector('img')?.src,alt:b.querySelector('img')?.alt||'Portfolio'})).filter(x=>x.src).sort((a,b)=>a.index-b.index);
  const box=document.getElementById('lightbox'),img=document.getElementById('lightboxImage'),cap=document.getElementById('lightboxCaption'),counter=document.getElementById('lightboxCounter');let current=0;
  function show(i){if(!gallery.length)return;current=(i+gallery.length)%gallery.length;img.src=gallery[current].src;img.alt=gallery[current].alt;cap.textContent=gallery[current].alt;counter.textContent=(current+1)+' / '+gallery.length}
  function open(i){show(i);box.classList.add('open');box.setAttribute('aria-hidden','false');document.body.style.overflow='hidden'}function close(){box.classList.remove('open');box.setAttribute('aria-hidden','true');document.body.style.overflow=''}
  document.querySelectorAll('[data-gallery-index]').forEach(b=>b.addEventListener('click',()=>open(Number(b.dataset.galleryIndex))));document.querySelector('[data-open-gallery]')?.addEventListener('click',()=>open(Number(document.querySelector('[data-open-gallery]').dataset.openGallery)));
  document.getElementById('lightboxClose')?.addEventListener('click',close);document.getElementById('lightboxPrev')?.addEventListener('click',()=>show(current-1));document.getElementById('lightboxNext')?.addEventListener('click',()=>show(current+1));box?.addEventListener('click',e=>{if(e.target===box)close()});document.addEventListener('keydown',e=>{if(!box.classList.contains('open'))return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')show(current-1);if(e.key==='ArrowRight')show(current+1)});
  document.querySelectorAll('[data-project-url]').forEach(a=>a.addEventListener('click',e=>{if((a.dataset.projectUrl||'').startsWith('GANTI_')){e.preventDefault();alert('Ganti data-project-url pada index.html dengan link project Anda.')}}));
  const form=document.getElementById('contactForm');form?.addEventListener('submit',e=>{e.preventDefault();const name=document.getElementById('senderName').value.trim(),email=document.getElementById('senderEmail').value.trim(),message=document.getElementById('senderMessage').value.trim();if(!name||!email||!message){alert('Lengkapi nama, email, dan pesan terlebih dahulu.');return}location.href='mailto:maulidtayuwandafronika@gmail.com?subject='+encodeURIComponent('Pesan dari Portfolio - '+name)+'&body='+encodeURIComponent('Nama: '+name+'\nEmail: '+email+'\n\nPesan:\n'+message)});
  const year=document.getElementById('year');if(year)year.textContent=new Date().getFullYear();
});
