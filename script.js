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