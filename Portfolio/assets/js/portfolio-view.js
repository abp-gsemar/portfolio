/* =====================
   CAROUSEL 3 VIEW (AUTO)
===================== */
document.querySelectorAll(".carousel-wrapper").forEach(wrapper => {
    const track = wrapper.querySelector(".carousel-track");
    const items = wrapper.querySelectorAll(".carousel-item");
    const prev = wrapper.querySelector(".prev");
    const next = wrapper.querySelector(".next");
  
    let index = 0;
    let autoSlide;
  
    const itemsPerView = () => {
      if (window.innerWidth <= 600) return 1;
      if (window.innerWidth <= 900) return 2;
      return 3;
    };
  
    const update = () => {
      const itemWidth = items[0].clientWidth + 20;
      track.style.transform = `translateX(-${index * itemWidth}px)`;
    };
  
    const slideNext = () => {
      if (index < items.length - itemsPerView()) {
        index++;
      } else {
        index = 0;
      }
      update();
    };
  
    const slidePrev = () => {
      if (index > 0) {
        index--;
      } else {
        index = items.length - itemsPerView();
      }
      update();
    };
  
    const startAuto = () => {
      autoSlide = setInterval(slideNext, 4000);
    };
  
    const stopAuto = () => clearInterval(autoSlide);
  
    next.addEventListener("click", () => {
      stopAuto();
      slideNext();
      startAuto();
    });
  
    prev.addEventListener("click", () => {
      stopAuto();
      slidePrev();
      startAuto();
    });
  
    track.addEventListener("mouseenter", stopAuto);
    track.addEventListener("mouseleave", startAuto);
  
    window.addEventListener("resize", () => {
      index = 0;
      update();
    });
  
    update();
    startAuto();
  });
  