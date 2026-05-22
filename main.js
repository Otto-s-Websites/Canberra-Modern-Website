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