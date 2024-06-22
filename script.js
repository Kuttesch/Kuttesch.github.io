// ----- CAROUSEL AUTOSCROLLING -----
// ----- Currently not in use -----
/* 
const carouselContent = document.querySelector('.carousel-content');
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

window.onscroll = function() {
  const logo = document.querySelector('.logo');
  const topRow = document.querySelector('.topRow');
  const scrollPosition = window.pageYOffset;

  logo.classList.toggle('logo-onScroll', scrollPosition > 0);
  topRow.classList.toggle('topRow-onScroll', scrollPosition > 0);
};


// ----- ON LOAD FUNCTIONS -----

window.onload = function() {
  const closeButton = document.querySelector('.close');
  if (closeButton) {
    closeButton.onclick = function() {
      document.getElementById('popup').style.display = 'none';
    };
  }
};


// ----- CAROUSEL BUTTON FUNCTIONALITY -----

const prevButton = document.getElementById('prev-projects');
const nextButton = document.getElementById('next-projects');

prevButton.addEventListener('click', () => {
  const currentScrollLeft = carouselContent.scrollLeft;
  const firstItemLeft = carouselItems[0].offsetLeft;

  if (currentScrollLeft <= firstItemLeft) {
    carouselContent.scrollTo({ left: carouselContent.scrollWidth - itemWidth, behavior: 'smooth' });
  } else {
    carouselContent.scrollBy({ left: -itemWidth, behavior: 'smooth' });
  }
});

nextButton.addEventListener('click', () => {
  const currentScrollLeft = carouselContent.scrollLeft;
  const lastItemRight = carouselItems[carouselItems.length - 1].offsetLeft + itemWidth;

  if (currentScrollLeft + carouselContent.offsetWidth >= lastItemRight) {
    carouselContent.scrollTo({ left: 0, behavior: 'smooth' });
  } else {
    carouselContent.scrollBy({ left: itemWidth, behavior: 'smooth' });
  }
});


// ----- SMOOTH SCROLL TO TARGET FUNCTION -----

function adjustScrollPosition(targetId) {
  const targetElement = document.getElementById(targetId);
  if (targetElement) {
    const topRowHeight = document.querySelector('.topRow').offsetHeight;
    const adjustedScrollTop = targetElement.getBoundingClientRect().top + window.pageYOffset - topRowHeight;

    setTimeout(() => {
      window.scrollTo({ top: adjustedScrollTop, behavior: 'smooth' });

      // Trigger scroll snap adjustment (if needed)
      const targetSite = targetElement.closest('.site');
      if (targetSite) {
        const scrollSnapEvent = new Event('scrollsnapstop');
        targetSite.dispatchEvent(scrollSnapEvent);
      }
    }, 100); // Adjust delay as needed
  }
}
