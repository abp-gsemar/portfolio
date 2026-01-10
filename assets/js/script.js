/* =====================
   NAV MENU
===================== */
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("show");
  });
}

/* =====================
   DARK MODE
===================== */
const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
  });
}

/* =====================
   SCROLL REVEAL
===================== */
const reveals = document.querySelectorAll(".reveal");

if (reveals.length) {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  reveals.forEach(el => observer.observe(el));
}

/* =====================
   NORMAL CAROUSEL (IF EXISTS)
===================== */
const track = document.querySelector(".carousel-track");
const items = document.querySelectorAll(".carousel-item");
const prevBtn = document.querySelector(".carousel-btn.prev");
const nextBtn = document.querySelector(".carousel-btn.next");

let index = 0;
let autoSlideInterval;

if (track && items.length && prevBtn && nextBtn) {

  const itemsPerView = () => {
    if (window.innerWidth <= 600) return 1;
    if (window.innerWidth <= 900) return 2;
    return 3;
  };

  const updateCarousel = () => {
    const itemWidth = items[0].clientWidth + 20;
    track.style.transform = `translateX(-${index * itemWidth}px)`;
  };

  const nextSlide = () => {
    if (index < items.length - itemsPerView()) {
      index++;
    } else {
      index = 0;
    }
    updateCarousel();
  };

  const prevSlide = () => {
    if (index > 0) {
      index--;
    } else {
      index = items.length - itemsPerView();
    }
    updateCarousel();
  };

  const startAutoSlide = () => {
    autoSlideInterval = setInterval(nextSlide, 3500);
  };

  const stopAutoSlide = () => {
    clearInterval(autoSlideInterval);
  };

  nextBtn.addEventListener("click", () => {
    stopAutoSlide();
    nextSlide();
    startAutoSlide();
  });

  prevBtn.addEventListener("click", () => {
    stopAutoSlide();
    prevSlide();
    startAutoSlide();
  });

  track.addEventListener("mouseenter", stopAutoSlide);
  track.addEventListener("mouseleave", startAutoSlide);

  window.addEventListener("resize", () => {
    index = 0;
    updateCarousel();
  });

  updateCarousel();
  startAutoSlide();
}

/* =====================
   STACK CAROUSEL (NEW)
===================== */
const stackCarousel = document.querySelector(".stack-carousel");
const stackItems = document.querySelectorAll(".stack-item");
const stackNext = document.querySelector(".stack-btn.next");
const stackPrev = document.querySelector(".stack-btn.prev");

let stackIndex = 0;
let stackAuto;

if (stackCarousel && stackItems.length) {

  function renderStack() {
    stackItems.forEach((item, i) => {
      item.className = "stack-item";

      if (i === stackIndex) item.classList.add("active");
      else if (i === stackIndex + 1) item.classList.add("next");
      else if (i === stackIndex - 1) item.classList.add("prev");
      else item.classList.add("back");
    });
  }

  function nextStack() {
    stackIndex++;
    if (stackIndex >= stackItems.length) stackIndex = 0;
    renderStack();
  }

  function prevStack() {
    stackIndex--;
    if (stackIndex < 0) stackIndex = stackItems.length - 1;
    renderStack();
  }

  if (stackNext) {
    stackNext.onclick = () => {
      stopStackAuto();
      nextStack();
      startStackAuto();
    };
  }

  if (stackPrev) {
    stackPrev.onclick = () => {
      stopStackAuto();
      prevStack();
      startStackAuto();
    };
  }

  /* AUTOPLAY */
  function startStackAuto() {
    stackAuto = setInterval(nextStack, 3500);
  }

  function stopStackAuto() {
    clearInterval(stackAuto);
  }

  stackCarousel.addEventListener("mouseenter", stopStackAuto);
  stackCarousel.addEventListener("mouseleave", startStackAuto);

  /* SWIPE MOBILE */
  let startX = 0;

  stackCarousel.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
  });

  stackCarousel.addEventListener("touchend", e => {
    let endX = e.changedTouches[0].clientX;

    if (startX - endX > 50) nextStack();
    if (endX - startX > 50) prevStack();
  });

  renderStack();
  startStackAuto();
}

/* =====================
   SMOOTH SCROLL
===================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document
      .querySelector(this.getAttribute("href"))
      ?.scrollIntoView({ behavior: "smooth" });
  });
});

/* =====================
   FULLSCREEN IMAGE VIEW
===================== */
const modal = document.getElementById("imgModal");
const modalImg = document.getElementById("modalImg");
const closeModal = document.querySelector(".close-modal");

/* CLICK IMAGE */
document.querySelectorAll(
  ".carousel-item img, .stack-item img"
).forEach(img=>{
  img.addEventListener("click",()=>{
    modal.classList.add("show");
    modalImg.src = img.src;
  });
});

/* CLOSE */
closeModal.onclick = ()=>modal.classList.remove("show");

/* CLICK OUTSIDE */
modal.addEventListener("click",e=>{
  if(e.target===modal){
    modal.classList.remove("show");
  }
});

/* ESC */
document.addEventListener("keydown",e=>{
  if(e.key==="Escape"){
    modal.classList.remove("show");
  }
});

