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

const mainGallery = document.getElementById('cmMainGallery');
const thumbGallery = document.getElementById('cmThumbGallery');

// Only run this code if the galleries actually exist on the current page
if (mainGallery && thumbGallery) {
  const thumbs = thumbGallery.querySelectorAll('img');
  const prevBtn = document.querySelector('.prev-arrow');
  const nextBtn = document.querySelector('.next-arrow');

  // Click a thumbnail to scroll main gallery
  thumbs.forEach((thumb, index) => {
    thumb.addEventListener('click', () => {``
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