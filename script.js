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
  
    // Toggle classes based on scroll position (concise version)
    logo.classList.toggle('logo-onScroll', scrollPosition > 0);
    topRow.classList.toggle('topRow-onScroll', scrollPosition > 0);
  };
  
  
  // ----- ON LOAD FUNCTIONS -----
  window.onload = function () {
    // Popup Handling
    const closeButton = document.getElementsByClassName('close')[0];
    if (closeButton) {
      closeButton.onclick = function () {
        document.getElementById('popup').style.display = 'none';
      };
    }
  };
  
  
  // ----- CAROUSEL FUNCTIONALITY -----
  const prevButton = document.getElementById('prev-projects');
  const nextButton = document.getElementById('next-projects');
  const carouselContent = document.querySelector('.carousel');
  const carouselItems = carouselContent.querySelectorAll('.carousel-item');
  const itemWidth = carouselContent.offsetWidth; // Calculate item width once
  
  // Carousel Navigation Functions
  function scrollCarouselTo(targetIndex) {
    const targetScrollLeft = carouselItems[targetIndex].offsetLeft;
    carouselContent.scrollTo({ left: targetScrollLeft, behavior: 'smooth' });
  }
  
  function scrollCarouselBy(delta) {
    carouselContent.scrollBy({ left: delta * itemWidth, behavior: 'smooth' });
  }
  
  // Event Listeners for Carousel Buttons
  prevButton.addEventListener('click', () => {
    const currentItemIndex = Math.round(carouselContent.scrollLeft / itemWidth);
    const targetIndex = (currentItemIndex === 0) ? carouselItems.length - 1 : currentItemIndex - 1;
    scrollCarouselTo(targetIndex); 
  });
  
  nextButton.addEventListener('click', () => {
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
  
      setTimeout(() => {
        window.scrollTo({ top: adjustedScrollTop, behavior: 'smooth' });
        // (Scroll snap adjustment logic remains the same)
      }, 100); // Adjust delay as needed
    }
  }
  