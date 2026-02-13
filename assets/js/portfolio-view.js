/* ================= PAGE TRANSITION ================= */
if (typeof gsap !== "undefined") {

  const pageTransition = document.getElementById("pageTransition");

  if (pageTransition) {
    gsap.to(pageTransition, {
      scaleY: 0,
      duration: 1,
      ease: "power4.inOut"
    });

    document.querySelectorAll(".transition-link").forEach(link => {
      link.addEventListener("click", e => {
        e.preventDefault();
        const url = link.href;

        gsap.to(pageTransition, {
          scaleY: 1,
          transformOrigin: "bottom",
          duration: 0.8,
          ease: "power4.inOut",
          onComplete: () => window.location = url
        });
      });
    });
  }
}

/* ================= CAROUSEL ================= */
document.querySelectorAll(".carousel-wrapper").forEach(wrapper => {

  const track = wrapper.querySelector(".carousel-track");
  const items = wrapper.querySelectorAll(".carousel-item");
  const prev = wrapper.querySelector(".prev");
  const next = wrapper.querySelector(".next");

  if (!track || !items.length) return;

  let index = 0;
  let interval;

  function perView() {
    if (window.innerWidth <= 600) return 1;
    if (window.innerWidth <= 900) return 2;
    return 3;
  }

  function update() {
    const itemWidth = items[0].offsetWidth + 14;
    track.style.transform = `translateX(-${index * itemWidth}px)`;
  }

  function nextSlide() {
    index < items.length - perView() ? index++ : index = 0;
    update();
  }

  function prevSlide() {
    index > 0 ? index-- : index = items.length - perView();
    update();
  }

  /* Buttons */
  next && (next.onclick = nextSlide);
  prev && (prev.onclick = prevSlide);

  /* Auto slide */
  function startAuto() {
    interval = setInterval(nextSlide, 4000);
  }

  function stopAuto() {
    clearInterval(interval);
  }

  wrapper.addEventListener("mouseenter", stopAuto);
  wrapper.addEventListener("mouseleave", startAuto);

  startAuto();

  /* Swipe */
  let startX = 0;
  track.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
  });

  track.addEventListener("touchend", e => {
    const endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) nextSlide();
    if (endX - startX > 50) prevSlide();
  });

  window.addEventListener("resize", update);

  update();
});


/* ================= FULLSCREEN PREVIEW ================= */
const modal = document.getElementById("previewModal");
const modalImg = document.getElementById("previewImg");
const modalVideo = document.getElementById("previewVideo");
const closeBtn = document.getElementById("closePreview");

if (modal) {

  document.addEventListener("click", e => {

    const carouselItem = e.target.closest(".carousel-item");
    if (!carouselItem) return;

    /* IMAGE */
    if (e.target.tagName === "IMG") {
      modal.classList.add("show");
      modalVideo.pause();
      modalVideo.style.display = "none";
      modalImg.style.display = "block";
      modalImg.src = e.target.src;
    }

    /* VIDEO */
    if (e.target.tagName === "VIDEO") {
      modal.classList.add("show");
      modalImg.style.display = "none";
      modalVideo.style.display = "block";
      modalVideo.src = e.target.currentSrc || e.target.src;
      modalVideo.play();
    }

  });

  function closeModal() {
    modal.classList.remove("show");
    modalVideo.pause();
    modalVideo.currentTime = 0;
  }

  closeBtn && (closeBtn.onclick = closeModal);
  modal.onclick = e => {
    if (e.target === modal) closeModal();
  };
}


/* ================= LAZY LOAD ================= */
const lazyElements = document.querySelectorAll(".lazy, .lazy-video");

if ("IntersectionObserver" in window && lazyElements.length) {

  const lazyObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const el = entry.target;

      if (el.tagName === "IMG" && el.dataset.src) {
        el.src = el.dataset.src;
        el.onload = () => el.classList.add("loaded");
      }

      if (el.tagName === "VIDEO" && el.dataset.src) {
        el.innerHTML = `<source src="${el.dataset.src}" type="video/mp4">`;
      }

      lazyObserver.unobserve(el);
    });
  });

  lazyElements.forEach(el => lazyObserver.observe(el));
}


/* ================= GSAP SCROLL ================= */
if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {

  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray(".fade").forEach(el => {
    gsap.from(el, {
      opacity: 0,
      y: 60,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%"
      }
    });
  });
}
