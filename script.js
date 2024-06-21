window.onscroll = function() {
    var logo = document.querySelector('.logo');
    if (window.pageYOffset > 0) {
        logo.classList.add('logo-onScroll');
    } else {
        logo.classList.remove('logo-onScroll');
    }
    var topRow = document.querySelector('.topRow');
    if (window.pageYOffset > 0) {
        topRow.classList.add('topRow-onScroll');
    } else {
        topRow.classList.remove('topRow-onScroll');
    }
};
window.onload = function() {
    // Get the close button element
    var closeButton = document.getElementsByClassName('close')[0];

    // When the user clicks on the close button, close the popup
    closeButton.onclick = function() {
        document.getElementById('popup').style.display = 'none';
    }
}
const prevButton = document.getElementById('prev-projects');
const nextButton = document.getElementById('next-projects');
const carouselContent = document.querySelector('.carousel-content');
const carouselItems = carouselContent.querySelectorAll('.carousel-item');

// Calculate item width
const itemWidth = carouselContent.offsetWidth;

// Event listeners for prev/next buttons
prevButton.addEventListener('click', () => {
    const currentScrollLeft = carouselContent.scrollLeft;
    const firstItemLeft = carouselItems[0].offsetLeft;

    if (currentScrollLeft <= firstItemLeft) {
        // Reset to the last item (without smooth transition to avoid visual glitch)
        carouselContent.scrollTo({
            left: carouselContent.scrollWidth - itemWidth, // Scroll to the very end
            behavior: 'smooth' // Instant scroll
        });
    } else {
        carouselContent.scrollBy({
            left: -itemWidth,
            behavior: 'smooth'
        });
    }
});

nextButton.addEventListener('click', () => {
    const currentScrollLeft = carouselContent.scrollLeft;
    const lastItemRight = carouselItems[carouselItems.length - 1].offsetLeft + carouselItems[carouselItems.length - 1].offsetWidth;

    if (currentScrollLeft + carouselContent.offsetWidth >= lastItemRight) {
        // Reset to the first item
        carouselContent.scrollTo({
            left: 0,
            behavior: 'smooth'
        });
    } else {
        carouselContent.scrollBy({
            left: itemWidth,
            behavior: 'smooth'
        });
    }
});

function adjustScrollPosition(targetId) {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const topRowHeight = document.querySelector('.topRow').offsetHeight; // Get fixed top row height
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