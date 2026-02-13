/* ===== CAROUSEL ===== */
document.querySelectorAll(".ai-carousel").forEach(carousel => {

  const track = carousel.querySelector(".ai-track");
  const items = carousel.querySelectorAll(".ai-item");
  const next = carousel.querySelector(".next");
  const prev = carousel.querySelector(".prev");

  let index = 0;
  let interval;

  function perView(){
    if(window.innerWidth <= 768) return 1;
    if(window.innerWidth <= 1100) return 2;
    return 3;
  }

  function update(){
    const width = items[0].offsetWidth + 40;
    track.style.transform = `translateX(-${index * width}px)`;
  }

  function nextSlide(){
    index < items.length - perView() ? index++ : index = 0;
    update();
  }

  function prevSlide(){
    index > 0 ? index-- : index = items.length - perView();
    update();
  }

  next.onclick = nextSlide;
  prev.onclick = prevSlide;

  function startAuto(){
    interval = setInterval(nextSlide,4000);
  }

  function stopAuto(){
    clearInterval(interval);
  }

  carousel.addEventListener("mouseenter",stopAuto);
  carousel.addEventListener("mouseleave",startAuto);

  startAuto();
  window.addEventListener("resize",update);
  update();
});


/* ===== MODAL OPEN ===== */
const modal = document.getElementById("aiModal");
const modalVideo = document.getElementById("aiModalVideo");
const closeBtn = document.querySelector(".ai-close");

document.querySelectorAll(".ai-thumb").forEach(item=>{
  item.addEventListener("click",()=>{
    const videoSrc = item.dataset.video;
    modal.classList.add("show");
    modalVideo.src = videoSrc;
    modalVideo.play();
  });
});

closeBtn.onclick = ()=>{
  modal.classList.remove("show");
  modalVideo.pause();
  modalVideo.currentTime = 0;
};

modal.onclick = e=>{
  if(e.target === modal){
    modal.classList.remove("show");
    modalVideo.pause();
    modalVideo.currentTime = 0;
  }
};
