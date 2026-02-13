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

/* pause video saat slide pindah */
document.querySelectorAll(".video-item").forEach(item=>{
item.classList.remove("playing");
const v=item.querySelector("video");
if(v){
v.pause();
v.removeAttribute("controls");
}
});
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

/* LAZY LOAD */
const lazyObs=new IntersectionObserver(entries=>{
entries.forEach(e=>{
if(e.isIntersecting){
if(e.target.tagName==="IMG"){
e.target.src=e.target.dataset.src;
e.target.onload=()=>e.target.classList.add("loaded");
}
if(e.target.tagName==="VIDEO"){
e.target.innerHTML=`<source src="${e.target.dataset.src}" type="video/mp4">`;
}
lazyObs.unobserve(e.target);
}
});
});
document.querySelectorAll(".lazy,.lazy-video").forEach(el=>lazyObs.observe(el));

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

/* ===== VIDEO PLAY ON CLICK ONLY ===== */
document.querySelectorAll(".video-item").forEach(item=>{
const video=item.querySelector("video");

item.addEventListener("click",()=>{
document.querySelectorAll(".video-item").forEach(other=>{
if(other!==item){
other.classList.remove("playing");
const v=other.querySelector("video");
if(v){
v.pause();
v.removeAttribute("controls");
}
}
});

if(video.paused){
video.play();
item.classList.add("playing");
video.setAttribute("controls","controls");
}else{
video.pause();
item.classList.remove("playing");
video.removeAttribute("controls");
}
});
});
