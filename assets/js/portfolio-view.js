document.querySelectorAll(".carousel-wrapper").forEach(wrapper=>{

const track = wrapper.querySelector(".carousel-track");
const items = wrapper.querySelectorAll(".carousel-item");
const prev = wrapper.querySelector(".prev");
const next = wrapper.querySelector(".next");

let index=0;
let startX=0;

function perView(){
if(window.innerWidth<=600) return 1;
if(window.innerWidth<=900) return 2;
return 3;
}

function update(){
const w = items[0].offsetWidth + 14;
track.style.transform=`translateX(-${index*w}px)`;
}

function slideNext(){
if(index < items.length - perView()) index++;
else index=0;
update();
}

function slidePrev(){
if(index>0) index--;
else index=items.length - perView();
update();
}

next.onclick=slideNext;
prev.onclick=slidePrev;

/* auto */
setInterval(slideNext,4000);

/* swipe */
track.addEventListener("touchstart",e=>{
startX = e.touches[0].clientX;
});

track.addEventListener("touchend",e=>{
let endX = e.changedTouches[0].clientX;
if(startX-endX>50) slideNext();
if(endX-startX>50) slidePrev();
});

window.addEventListener("resize",update);
update();

});
