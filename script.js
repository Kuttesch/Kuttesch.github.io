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
    if (!localStorage.getItem('firstLoadDone')) {
        // Show the popup
        document.getElementById('popup').style.display = 'block';
        localStorage.setItem('firstLoadDone', 'true');
    }

    // Get the close button element
    var closeButton = document.getElementsByClassName('close')[0];

    // When the user clicks on the close button, close the popup
    closeButton.onclick = function() {
        document.getElementById('popup').style.display = 'none';
    }
}