/* =====================
   CAROUSEL 3 VIEW (PRO)
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

  /* RESPONSIVE VIEW */
  const itemsPerView = () => {
    if (window.innerWidth <= 600) return 1;
    if (window.innerWidth <= 900) return 2;
    return 3;
  };

  /* UPDATE POSISI */
  const update = () => {
    const itemWidth = items[0].offsetWidth + 20;
    track.style.transform = `translateX(-${index * itemWidth}px)`;
  };

  /* NEXT */
  const slideNext = () => {
    if (index < items.length - itemsPerView()) {
      index++;
    } else {
      index = 0;
    }
    update();
  };

  /* PREV */
  const slidePrev = () => {
    if (index > 0) {
      index--;
    } else {
      index = items.length - itemsPerView();
    }
    update();
  };

  /* AUTOPLAY */
  const startAuto = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    autoSlide = setInterval(slideNext, 4000);
  };

  const stopAuto = () => clearInterval(autoSlide);

  /* BUTTON */
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

  /* HOVER */
  track.addEventListener("mouseenter", stopAuto);
  track.addEventListener("mouseleave", startAuto);

  /* SWIPE MOBILE */
  track.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
  });

  track.addEventListener("touchend", e => {
    const endX = e.changedTouches[0].clientX;

    if (startX - endX > 50) slideNext();
    if (endX - startX > 50) slidePrev();
  });

  /* TAB NOT ACTIVE → PAUSE */
  document.addEventListener("visibilitychange", () => {
    document.hidden ? stopAuto() : startAuto();
  });

  /* RESIZE */
  window.addEventListener("resize", () => {
    index = 0;
    update();
  });

  /* INIT */
  update();
  startAuto();
});
