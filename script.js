// ----- CAROUSEL AUTOSCROLLING -----
// ----- Currently not in use -----
/* 
const carouselContent = document.querySelector('.carousel');
const carouselItems = document.querySelectorAll('.carousel-item');

// Calculate item width only once
const itemWidth = carouselContent.offsetWidth;

let autoScrollInterval;

function startAutoScroll() {
  autoScrollInterval = setInterval(() => {
    const currentScrollLeft = carouselContent.scrollLeft;
    const lastItemRight = carouselItems[carouselItems.length - 1].offsetLeft + itemWidth;

    if (currentScrollLeft + carouselContent.offsetWidth >= lastItemRight) {
      carouselContent.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      carouselContent.scrollBy({ left: 20, behavior: 'smooth' }); 
    }
  }, 3000); // Adjust interval duration
}

function stopAutoScroll() {
  clearInterval(autoScrollInterval);
}

carouselContent.addEventListener('mouseenter', stopAutoScroll);
carouselContent.addEventListener('mouseleave', startAutoScroll);

// Start auto-scrolling when the page loads
startAutoScroll();

 */
// ----- ON SCROLL FUNCTIONS -----
window.onscroll = function () {
    const logo = document.querySelector('.logo');
    const topRow = document.querySelector('.topRow');
    const scrollPosition = window.pageYOffset;
  
    logo.classList.toggle('logo-onScroll', scrollPosition > 0);
    topRow.classList.toggle('topRow-onScroll', scrollPosition > 0);
  };
  
  
  // ----- CAROUSEL FUNCTIONALITY -----
  const carouselContent = document.querySelector('.carousel');
  const carouselItems = carouselContent.querySelectorAll('.carousel-item');
  const itemWidth = carouselContent.offsetWidth;
  
  // Scroll to a specific carousel item
  function scrollCarouselTo(index) {
    const targetScrollLeft = carouselItems[index].offsetLeft;
    carouselContent.scrollTo({ left: targetScrollLeft, behavior: 'smooth' });
  }
  
  // Event Listeners for Carousel Buttons
  document.getElementById('prev-projects').addEventListener('click', () => {
    const currentItemIndex = Math.round(carouselContent.scrollLeft / itemWidth);
    const targetIndex = (currentItemIndex === 0) ? carouselItems.length - 1 : currentItemIndex - 1;
    scrollCarouselTo(targetIndex);
  });
  
  document.getElementById('next-projects').addEventListener('click', () => {
    const currentItemIndex = Math.round(carouselContent.scrollLeft / itemWidth);
    const targetIndex = (currentItemIndex === carouselItems.length - 1) ? 0 : currentItemIndex + 1;
    scrollCarouselTo(targetIndex);
  });
  
  // ----- SMOOTH SCROLL TO TARGET FUNCTION -----
  function adjustScrollPosition(targetId) {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const topRowHeight = document.querySelector('.topRow').offsetHeight;
      const adjustedScrollTop = targetElement.getBoundingClientRect().top + window.pageYOffset - topRowHeight;
  
      window.scrollTo({ top: adjustedScrollTop, behavior: 'smooth' });
  
      // Scroll snap adjustment (if needed)
      setTimeout(() => {
        const scrollSnapDelta = window.scrollY % document.documentElement.clientHeight;
        if (scrollSnapDelta > 0) {
          window.scrollBy({ top: -scrollSnapDelta });
        }
      }, 100); // Adjust delay as needed
    }
  }
  