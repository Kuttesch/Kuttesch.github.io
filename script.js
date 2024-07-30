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
// ----- POPUP FUNCTIONALITY -----
var popup = document.getElementById("popup");
var span = document.getElementsByClassName("close")[0];
var dontShowAgain = document.getElementById("dontShowAgain");

// Load previous checkbox state from localStorage
if (localStorage.getItem('dontshowPopup') === 'true') {
  popup.style.display = "none";
} else {
  popup.style.display = "flex";
}

// Function to close the popup
function closePopup() {
  popup.style.display = "none";
  localStorage.setItem('dontshowPopup', dontShowAgain.checked); // Store the correct state
}

span.onclick = closePopup;
window.onclick = function (event) {
  if (event.target == popup) {
    closePopup();
  }
};

// ----- ON SCROLL FUNCTIONS -----
window.addEventListener('scroll', function () {
  const logo = document.querySelector('.logo');
  const topRow = document.querySelector('.topRow');
  const scrollPosition = window.scrollY; 
  logo.classList.toggle('logo-onScroll', scrollPosition > 0);
  topRow.classList.toggle('topRow-onScroll', scrollPosition > 0);

  // ----- FAVICON FUNCTIONALITY ----- (Moved inside the scroll event)
  const faviconLinks = document.querySelectorAll('link[rel="icon"]');
  const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');

  function updateFavicon() {
      faviconLinks.forEach(link => {
          link.disabled = !(colorSchemeQuery.matches === (link.media === '(prefers-color-scheme: dark)'));
      });
  }

  updateFavicon(); 
});



// ----- CAROUSEL FUNCTIONALITY -----
const carouselContent = document.querySelector('.carousel');
const carouselItems = carouselContent.querySelectorAll('.carousel-item');

// Calculate item width only once
const itemWidth = carouselItems[0].offsetWidth; 

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


// --- Get GitHub Repo Info ---
async function getGitHubRepoInfo(repoLink) {
  try {
    const repoUrlParts = repoLink.split('/');
    const repoUrl = `https://api.github.com/repos/${repoUrlParts[3]}/${repoUrlParts[4]}`;
    const response = await fetch(repoUrl);
    const data = await response.json();

    console.log("fetched data:", data);

    return {
      name: data.name || "Error fetching",
      description: data.description || "No description or/and name available"
    };
  } catch (error) {
    console.error("Error fetching GitHub data:", error);
    return {
      name: "Error fetching name",
      description: "Error fetching description"
    };
  }
}

// Function to update carousel content based on GitHub data
async function updateCarouselWithGitHubData() {
  const carouselLeftContents = document.querySelectorAll('.carousel-left-content');

  for (const content of carouselLeftContents) {
    const linkElement = content.querySelector('a'); // Find the link element (if it exists)

    if (linkElement && linkElement.href.includes('github.com')) {
      const repoInfo = await getGitHubRepoInfo(linkElement.href);

      const titleElement = content.querySelector('.project-title');
      const textElement = content.querySelector('.project-text');

      if (titleElement) titleElement.textContent = repoInfo.name;
      if (textElement) textElement.textContent = repoInfo.description;
    }
  }
}

// Call the update function when the page loads
updateCarouselWithGitHubData(); 