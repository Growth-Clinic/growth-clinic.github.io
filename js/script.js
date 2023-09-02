// Menu toggle

document.getElementById('mobile-nav-trigger').addEventListener('click', function () {
    var spanElement = document.querySelector('.mobile-navbar-trigger');
    spanElement.classList.toggle('mobile-navbar-trigger__menu-active');

    var navMenu = document.getElementById('mobile-nav-menu');

    var mobileMenuAnimate = new TimelineMax();
    
    if (navMenu.style.display === 'block') {
        navMenu.style.display = 'none';
    } 
    else {
        navMenu.style.display = 'block';
        
        mobileMenuAnimate.from("#mobile-nav-menu", 1.5, {
            y:-10,
            ease:Bounce.easeOut
        });
    }

});