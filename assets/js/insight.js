/* PAGE TRANSITION */
gsap.to("#pageTransition",{scaleY:0,duration:1,ease:"power4.inOut"});

document.querySelectorAll(".transition-link").forEach(link=>{
link.addEventListener("click",e=>{
e.preventDefault();
const url=link.href;
gsap.to("#pageTransition",{
scaleY:1,
transformOrigin:"bottom",
duration:1,
onComplete:()=>window.location=url
});
});
});

/* CAROUSEL */
document.querySelectorAll(".carousel-wrapper").forEach(wrapper=>{

const track=wrapper.querySelector(".carousel-track");
const items=wrapper.querySelectorAll(".carousel-item");
const prev=wrapper.querySelector(".prev");
const next=wrapper.querySelector(".next");

let index=0,startX=0;

function perView(){
if(innerWidth<=600) return 1;
if(innerWidth<=900) return 2;
return 3;
}

function update(){
const w=items[0].offsetWidth+14;
track.style.transform=`translateX(-${index*w}px)`;
}

function nextSlide(){
index<items.length-perView()?index++:index=0;
update();
}

function prevSlide(){
index>0?index--:index=items.length-perView();
update();
}

next.onclick=nextSlide;
prev.onclick=prevSlide;
setInterval(nextSlide,4000);

/* swipe */
track.addEventListener("touchstart",e=>startX=e.touches[0].clientX);
track.addEventListener("touchend",e=>{
let endX=e.changedTouches[0].clientX;
if(startX-endX>50) nextSlide();
if(endX-startX>50) prevSlide();
});

window.addEventListener("resize",update);
update();
});

/* FULLSCREEN */
const modal=document.getElementById("previewModal");
const modalImg=document.getElementById("previewImg");
const close=document.getElementById("closePreview");

document.addEventListener("click",e=>{
if(e.target.tagName==="IMG" && e.target.closest(".carousel-item")){
modal.classList.add("show");
modalImg.src=e.target.src;
}
});

close.onclick=()=>modal.classList.remove("show");
modal.onclick=e=>{if(e.target===modal)modal.classList.remove("show")};

/* LAZY LOAD */
const obs=new IntersectionObserver(entries=>{
entries.forEach(e=>{
if(e.isIntersecting){
e.target.src=e.target.dataset.src;
e.target.onload=()=>e.target.classList.add("loaded");
obs.unobserve(e.target);
}
});
});

document.querySelectorAll(".lazy").forEach(img=>obs.observe(img));

/* GSAP */
gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray(".fade").forEach(el=>{
gsap.from(el,{
opacity:0,
y:60,
duration:1,
scrollTrigger:{trigger:el,start:"top 80%"}
});
});
