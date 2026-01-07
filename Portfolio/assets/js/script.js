const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const themeToggle = document.getElementById("themeToggle");

/* MENU */
menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("show");
});

/* DARK MODE */
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

/* SCROLL REVEAL */
const reveals = document.querySelectorAll(".reveal");

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

/* =====================
   DESIGN CAROUSEL AUTO SLIDE
===================== */
const track = document.querySelector(".carousel-track");
const items = document.querySelectorAll(".carousel-item");
const prevBtn = document.querySelector(".carousel-btn.prev");
const nextBtn = document.querySelector(".carousel-btn.next");

let index = 0;
let autoSlideInterval;

/* Hitung item per view */
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

/* AUTO SLIDE */
const startAutoSlide = () => {
  autoSlideInterval = setInterval(nextSlide, 3500);
};

const stopAutoSlide = () => {
  clearInterval(autoSlideInterval);
};

/* EVENTS */
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

/* Pause on hover */
track.addEventListener("mouseenter", stopAutoSlide);
track.addEventListener("mouseleave", startAutoSlide);

/* Responsive update */
window.addEventListener("resize", () => {
  index = 0;
  updateCarousel();
});

/* INIT */
updateCarousel();
startAutoSlide();

/* Smooth scroll for internal links */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href"))
        ?.scrollIntoView({ behavior: "smooth" });
    });
  });
  