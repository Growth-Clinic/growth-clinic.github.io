document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileNavTrigger = document.getElementById('mobile-nav-trigger');
    const mobileNavMenu = document.getElementById('mobile-nav-menu');
    
    mobileNavTrigger.addEventListener('click', function() {
        this.classList.toggle('mobile-navbar-trigger__menu-active');
        
        if (mobileNavMenu.style.display === 'block') {
            mobileNavMenu.style.display = 'none';
        } else {
            mobileNavMenu.style.display = 'block';
            
            // Optional animation if you're using GSAP
            if (typeof TimelineMax !== 'undefined') {
                var mobileMenuAnimate = new TimelineMax();
                mobileMenuAnimate.from("#mobile-nav-menu", 1.5, {
                    y: -10,
                    ease: Bounce.easeOut
                });
            }
        }
    });
    
    // Mobile dropdown toggle
    const mobileDropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');
    
    mobileDropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            const parent = this.parentElement;
            parent.classList.toggle('active');
        });
    });
});