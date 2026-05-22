/*getting elements for Mobile Menu*/

const mobileMenu = document.getElementById('mobileMenu');
const openBtn = document.getElementById('openMenuBtn');
const closeBtn = document.getElementById('closeMenuBtn');

/*Adding event listeners to open menu and pause scrolling*/

openBtn.addEventListener('click', () => {
  mobileMenu.classList.add('active');
  document.body.style.overflow = 'hidden'; // Prevent background scrolling
});

closeBtn.addEventListener('click', () => {
  mobileMenu.classList.remove('active');
  document.body.style.overflow = ''; 
});

/* ==========================================================================
   Gallery Auto-Scroll & Drag Logic
   ========================================================================== */
const gallery = document.querySelector('.gallery-wrapper');

// 1. Clone the images so it looks infinite
gallery.innerHTML += gallery.innerHTML;

let isDown = false;
let startX;
let scrollLeft;
let autoScrollTimer;

// 2. Auto-scroll logic
const startAutoScroll = () => {
  autoScrollTimer = setInterval(() => {
    gallery.scrollLeft += 1; // Change this number to adjust speed
    // If scrolled past the first set of images, snap back to start silently
    if (gallery.scrollLeft >= gallery.scrollWidth / 2) {
      gallery.scrollLeft = 0;
    }
  }, 20);
};

const stopAutoScroll = () => clearInterval(autoScrollTimer);

// Start scrolling immediately
startAutoScroll();

// 3. Mouse Drag logic
gallery.addEventListener('mousedown', (e) => {
  isDown = true;
  stopAutoScroll(); // Pause auto-scroll when user clicks
  startX = e.pageX - gallery.offsetLeft;
  scrollLeft = gallery.scrollLeft;
});

gallery.addEventListener('mouseleave', () => {
  if (isDown) {
    isDown = false;
    startAutoScroll();
  }
});

gallery.addEventListener('mouseup', () => {
  isDown = false;
  startAutoScroll(); // Resume auto-scroll when user lets go
});

gallery.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - gallery.offsetLeft;
  const walk = (x - startX) * 2; // The * 2 makes it scroll faster than the mouse moves
  gallery.scrollLeft = scrollLeft - walk;
});