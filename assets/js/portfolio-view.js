/* =====================
   MULTI CAROUSEL
===================== */
document.querySelectorAll(".carousel-wrapper").forEach(wrapper => {

  const track = wrapper.querySelector(".carousel-track");
  const items = wrapper.querySelectorAll(".carousel-item");
  const prev = wrapper.querySelector(".prev");
  const next = wrapper.querySelector(".next");

  if (!track || !items.length || !prev || !next) return;

  let index = 0;
  let autoSlide;
  let startX = 0;

  const itemsPerView = () => {
    if (window.innerWidth <= 600) return 1;
    if (window.innerWidth <= 900) return 2;
    return 3;
  };

  const update = () => {
    const itemWidth = items[0].offsetWidth + 20;
    track.style.transform = `translateX(-${index * itemWidth}px)`;
  };

  const slideNext = () => {
    if (index < items.length - itemsPerView()) index++;
    else index = 0;
    update();
  };

  const slidePrev = () => {
    if (index > 0) index--;
    else index = items.length - itemsPerView();
    update();
  };

  const startAuto = () => {
    autoSlide = setInterval(slideNext, 4000);
  };

  const stopAuto = () => clearInterval(autoSlide);

  next.onclick = () => { stopAuto(); slideNext(); startAuto(); };
  prev.onclick = () => { stopAuto(); slidePrev(); startAuto(); };

  track.addEventListener("mouseenter", stopAuto);
  track.addEventListener("mouseleave", startAuto);

  track.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
  });

  track.addEventListener("touchend", e => {
    const endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) slideNext();
    if (endX - startX > 50) slidePrev();
  });

  update();
  startAuto();
});

/* =====================
   VIDEO MODAL
===================== */
const videoModal = document.getElementById("videoModal");
const modalVideo = document.getElementById("modalVideo");
const closeVideo = document.querySelector(".close-video");

document.querySelectorAll(".video-wrapper").forEach(item=>{
  item.addEventListener("click",()=>{
    modalVideo.src = item.dataset.video;
    videoModal.classList.add("show");
    modalVideo.play();
  });
});

function closeVideoModal(){
  modalVideo.pause();
  modalVideo.src="";
  videoModal.classList.remove("show");
}

closeVideo.onclick = closeVideoModal;

videoModal.addEventListener("click",e=>{
  if(e.target===videoModal){
    closeVideoModal();
  }
});

document.addEventListener("keydown",e=>{
  if(e.key==="Escape"){
    closeVideoModal();
  }
});
