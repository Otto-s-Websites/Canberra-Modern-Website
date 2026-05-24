/*getting elements for Mobile Menu*/
const mobileMenu = document.getElementById('mobileMenu');
const openBtn = document.getElementById('openMenuBtn');
const closeBtn = document.getElementById('closeMenuBtn');

/*Adding event listeners to open menu and pause scrolling*/
if (openBtn && closeBtn && mobileMenu) {
  openBtn.addEventListener('click', () => {
    mobileMenu.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  });

  closeBtn.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    document.body.style.overflow = ''; 
  });
}

/* ==========================================================================
   Home Page Gallery Auto-Scroll & Drag Logic
   ========================================================================== */
const gallery = document.querySelector('.gallery-wrapper');

// Only run if the home page gallery exists
if (gallery) {
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
}

/* ==========================================================================
   Canberra's modern Gallery
   ========================================================================== */
const mainGallery = document.getElementById('cmMainGallery');
const thumbGallery = document.getElementById('cmThumbGallery');

// Only run this code if the galleries actually exist on the current page
if (mainGallery && thumbGallery) {
  const thumbs = thumbGallery.querySelectorAll('img');
  const prevBtn = document.querySelector('.prev-arrow');
  const nextBtn = document.querySelector('.next-arrow');

  // Click a thumbnail to scroll main gallery
  thumbs.forEach((thumb, index) => {
    thumb.addEventListener('click', () => {
      // Remove active state from all
      thumbs.forEach(t => t.classList.remove('active-thumb'));
      // Add active state to clicked thumb
      thumb.classList.add('active-thumb');
      
      // Scroll the main gallery to match the clicked image
      const mainImages = mainGallery.querySelectorAll('img');
      if (mainImages[index]) {
        mainImages[index].scrollIntoView({ 
          behavior: 'smooth', 
          block: 'nearest', 
          inline: 'center' 
        });
      }
    });
  });

  // Arrow buttons to scroll the thumbnail strip
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      thumbGallery.scrollBy({ left: -150, behavior: 'smooth' });
    });
    
    nextBtn.addEventListener('click', () => {
      thumbGallery.scrollBy({ left: 150, behavior: 'smooth' });
    });
  }
}

// ==========================================================================
// Events Page Accordion
// ==========================================================================
const festBtns = document.querySelectorAll('.ep-fest-btn');

if (festBtns.length > 0) {
  festBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const card = this.closest('.ep-fest-card');
      const moreText = card.querySelector('.ep-more-text');
      const icon = this.querySelector('i');
      const btnText = this.querySelector('span');

      moreText.classList.toggle('show');
      
      if (moreText.classList.contains('show')) {
        icon.classList.replace('fa-plus', 'fa-minus');
        btnText.textContent = 'SHOW LESS';
      } else {
        icon.classList.replace('fa-minus', 'fa-plus');
        btnText.textContent = 'SHOW MORE';
      }
    });
  });
}