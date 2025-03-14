document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const mobileToggle = document.getElementById('mobile-nav-trigger');
  const mobileMenu = document.getElementById('mobile-nav-menu');
  
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', function() {
      this.classList.toggle('active');
      mobileMenu.classList.toggle('active');
    });
  }
  
  // Mobile dropdown toggle
  const mobileDropdowns = document.querySelectorAll('.mobile-item.dropdown');
  mobileDropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector('.dropdown-toggle');
    if (toggle) {
      toggle.addEventListener('click', function(e) {
        e.preventDefault();
        dropdown.classList.toggle('active');
      });
    }
  });
  
  // COMMON GOOGLE ANALYTICS TRACKING
  // =========================================================
  
  // Track basic button and link interactions
  function setupCommonTracking() {
    // Only proceed if Google Analytics is loaded
    if (typeof gtag !== 'function') return;
    
    // Track button clicks
    var buttons = document.querySelectorAll('.cta-button, .hero-button, .secondary-button');
    buttons.forEach(function(button) {
      button.addEventListener('click', function() {
        gtag('event', 'button_click', {
          'button_text': this.innerText || 'unknown',
          'page_location': window.location.href
        });
      });
    });

    // Track program links
    var programLinks = document.querySelectorAll('.program-link, .dropdown-menu a[href*="accelerator"]');
    programLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        gtag('event', 'program_interest', {
          'program_name': this.innerText || 'unknown',
          'page_path': this.getAttribute('href')
        });
      });
    });
    
    // Track social media clicks
    var socialLinks = document.querySelectorAll('.footer__link-item a[href*="linkedin"], .footer__link-item a[href*="twitter"], .footer__link-item a[href*="instagram"], .footer__link-item a[href*="facebook"]');
    socialLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        gtag('event', 'social_click', {
          'social_platform': this.innerText || 'unknown'
        });
      });
    });
    
    // Newsletter subscription tracking
    var subscribeButtons = document.querySelectorAll('button[onclick*="eepurl.com"]');
    subscribeButtons.forEach(function(button) {
      button.addEventListener('click', function() {
        gtag('event', 'newsletter_subscription', {
          'page_location': window.location.href
        });
      });
    });
  }
  
  // Set up page-specific tracking based on URL path
  function setupPageSpecificTracking() {
    // Only proceed if Google Analytics is loaded
    if (typeof gtag !== 'function') return;
    
    const currentPath = window.location.pathname;
    
    // Home page tracking
    if (currentPath === '/' || currentPath.includes('index.html')) {
      // Track "Get Started" and "Find Hidden Jobs" buttons
      var getStartedBtn = document.querySelector('button.hero-button[onclick*="job-search-accelerator.html"]');
      if (getStartedBtn) {
        getStartedBtn.addEventListener('click', function() {
          gtag('event', 'homepage_cta', {
            'cta_type': 'get_started'
          });
        });
      }
      
      var hiddenJobsBtn = document.querySelector('button.secondary-button[onclick*="hidden-opportunities.html"]');
      if (hiddenJobsBtn) {
        hiddenJobsBtn.addEventListener('click', function() {
          gtag('event', 'homepage_cta', {
            'cta_type': 'hidden_jobs'
          });
        });
      }
    }
    
    // Job Search Accelerator page tracking
    if (currentPath.includes('job-search-accelerator')) {
      // Track "Apply Now" buttons
      var applyButtons = document.querySelectorAll('button[onclick*="forms.gle"], a[href*="forms.gle"]');
      applyButtons.forEach(function(button) {
        button.addEventListener('click', function() {
          gtag('event', 'application_started', {
            'program': 'Job Search Accelerator'
          });
        });
      });
      
      // Track pricing section views
      var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            gtag('event', 'pricing_section_viewed', {
              'program': 'Job Search Accelerator'
            });
            // Unobserve after triggering once
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
      
      var pricingSection = document.querySelector('.white-section');
      if (pricingSection) {
        observer.observe(pricingSection);
      }
      
      // Track clicks on "Try our free Hidden Opportunity Search Tool"
      var hiddenToolLink = document.querySelector('a[href="hidden-opportunities.html"]');
      if (hiddenToolLink) {
        hiddenToolLink.addEventListener('click', function() {
          gtag('event', 'tool_interest', {
            'tool': 'Hidden Opportunity Search'
          });
        });
      }
    }
    
    // Career Accelerator and Side Project Accelerator pages tracking
    if (currentPath.includes('career-accelerator') || currentPath.includes('side-project-accelerator')) {
      // Track waitlist signups
      var waitlistButtons = document.querySelectorAll('button[onclick*="waitlist"], a[href*="waitlist"], form[action*="forms.gle"] button');
      waitlistButtons.forEach(function(button) {
        button.addEventListener('click', function() {
          gtag('event', 'waitlist_signup', {
            'program': currentPath.includes('career-accelerator') ? 'Career Accelerator' : 'Side Project Accelerator'
          });
        });
      });
      
      // Track form submissions
      var forms = document.querySelectorAll('form');
      forms.forEach(function(form) {
        form.addEventListener('submit', function() {
          gtag('event', 'waitlist_form_submitted', {
            'program': currentPath.includes('career-accelerator') ? 'Career Accelerator' : 'Side Project Accelerator'
          });
        });
      });
    }
    
    // Hangouts page tracking
    if (currentPath.includes('hangouts')) {
      // Track event registration
      var eventButtons = document.querySelectorAll('button[onclick*="event"], a[href*="event"], button[onclick*="docs.google.com/forms"]');
      eventButtons.forEach(function(button) {
        button.addEventListener('click', function() {
          gtag('event', 'event_registration_click', {
            'page_location': window.location.href
          });
        });
      });
      
      // Track image gallery views
      var galleryImages = document.querySelectorAll('.hang-logo-wrap__item img');
      if (galleryImages.length > 0) {
        var observer = new IntersectionObserver(function(entries) {
          if (entries.some(entry => entry.isIntersecting)) {
            gtag('event', 'event_gallery_viewed', {
              'page_location': window.location.href
            });
            // Unobserve after triggering once
            galleryImages.forEach(img => observer.unobserve(img));
          }
        }, { threshold: 0.5 });
        
        galleryImages.forEach(img => observer.observe(img));
      }
    }
    
    // About page tracking
    if (currentPath.includes('about')) {
      // Track team section views
      var teamSection = document.querySelector('.mission-wrap');
      if (teamSection) {
        var observer = new IntersectionObserver(function(entries) {
          if (entries[0].isIntersecting) {
            gtag('event', 'team_section_viewed', {
              'page_location': window.location.href
            });
            // Unobserve after triggering once
            observer.unobserve(teamSection);
          }
        }, { threshold: 0.5 });
        
        observer.observe(teamSection);
      }
      
      // Track contact clicks
      var contactLinks = document.querySelectorAll('a[href*="mailto"]');
      contactLinks.forEach(function(link) {
        link.addEventListener('click', function() {
          gtag('event', 'contact_click', {
            'contact_type': 'email',
            'page_location': window.location.href
          });
        });
      });
    }
    
    // Hidden Opportunities page tracking is handled separately
  }
  
  // Only run if we have Google Analytics available
  if (typeof gtag === 'function') {
    // Set up all tracking
    setupCommonTracking();
    setupPageSpecificTracking();
  }
  
  // Check if we're on the Hidden Opportunities page by looking for the generate button
  const generateBtn = document.getElementById('generateBtn');
  
  if (generateBtn) {
    // We're on the Hidden Opportunities page, add tool-specific functionality
    const results = document.getElementById('results');
    const emailCapture = document.getElementById('emailCapture');
    const spinner = document.getElementById('spinner');
    
    // Hide email capture on load
    if (emailCapture) emailCapture.style.display = 'none';
    
    // Copy button functionality
    document.querySelectorAll('.copy-btn').forEach(button => {
      button.addEventListener('click', function() {
        const targetId = this.getAttribute('data-target');
        const textToCopy = document.getElementById(targetId).textContent;
        
        // Track copy event for analytics
        if (typeof gtag === 'function') {
          gtag('event', 'search_formula_copied', {
            'formula_type': targetId.replace('-result', '')
          });
        }
        
        navigator.clipboard.writeText(textToCopy).then(() => {
          // Change button text temporarily
          const originalText = this.textContent;
          this.textContent = 'Copied!';
          setTimeout(() => {
            this.textContent = originalText;
          }, 2000);
        });
      });
    });
    
    // Generate formulas when button is clicked
    generateBtn.addEventListener('click', function() {
      // Track generation event for analytics
      if (typeof gtag === 'function') {
        gtag('event', 'search_formula_generated', {
          'page_location': window.location.href
        });
      }
      
      spinner.style.display = 'block';
      results.style.display = 'none';
      
      // Simulate processing time
      setTimeout(function() {
        generateSearchFormulas();
        spinner.style.display = 'none';
        results.style.display = 'block';
        
        // Show email capture form
        if (emailCapture) emailCapture.style.display = 'block';
        
        // Scroll to results
        results.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 1200);
    });
    
    // Track email capture form submission
    const emailForm = document.querySelector('#emailCapture form');
    if (emailForm && typeof gtag === 'function') {
      emailForm.addEventListener('submit', function() {
        gtag('event', 'tool_email_capture', {
          'page_location': window.location.href
        });
      });
    }
    
    // Track individual input fields
    const inputFields = document.querySelectorAll('#jobRole, #alternativeTitle, #location, #industry');
    if (typeof gtag === 'function') {
      inputFields.forEach(function(field) {
        field.addEventListener('blur', function() {
          if (this.value.trim() !== '') {
            gtag('event', 'search_parameter_entered', {
              'parameter_type': this.id,
              'has_value': 'true'
            });
          }
        });
      });
    }
    
    function generateSearchFormulas() {
      // Get input values
      const jobRole = document.getElementById('jobRole').value.trim() || "product designer";
      const alternativeTitles = document.getElementById('alternativeTitle').value.trim();
      const location = document.getElementById('location').value.trim() || "Lagos";
      const industry = document.getElementById('industry').value.trim();
      const experience = document.getElementById('experience').value;
      const exclusions = document.getElementById('exclusions').value.trim();
      const recentOnly = document.getElementById('recentOnly').checked;
      
      // Process input values
      const jobTitles = alternativeTitles ? 
          `("${jobRole}" OR "${alternativeTitles.split(',').map(t => t.trim()).join('" OR "')}")` : 
          `"${jobRole}"`;
      
      const locations = location.includes(',') ? 
          `(${location.split(',').map(l => `"${l.trim()}"`).join(' OR ')})` : 
          `"${location}"`;
      
      const industries = industry ? 
          industry.split(',').map(i => `"${i.trim()}"`).join(' OR ') : 
          '';
      
      const industryString = industry ? 
          `(${industries})` : 
          '';
      
      // Experience level terms
      let experienceTerms = '';
      let experienceExclusions = '';
      
      switch(experience) {
          case 'entry':
              experienceTerms = '("entry level" OR "junior" OR "associate")';
              experienceExclusions = '-"senior" -"lead" -"manager" -"5+ years" -"7+ years"';
              break;
          case 'mid':
              experienceTerms = '("mid level" OR "intermediate" OR "2+ years" OR "3+ years")';
              experienceExclusions = '-"senior" -"lead" -"director" -"head" -"7+ years" -"10+ years"';
              break;
          case 'senior':
              experienceTerms = '("senior" OR "lead" OR "principal" OR "5+ years" OR "7+ years")';
              experienceExclusions = '-"junior" -"entry level" -"associate"';
              break;
      }
      
      // Recent only terms
      const recentTerms = recentOnly ? '("last week" OR "last month" OR "recent" OR "new" OR "2023" OR "2024")' : '';
      
      // Exclusion terms
      const exclusionTerms = exclusions ? 
          exclusions.split(',').map(e => `-"${e.trim()}"`).join(' ') : 
          '';
      
      // Generate the search formulas
      const linkedinSearch = `${jobTitles} ${locations} ${industryString ? industryString : ''} ${experienceTerms} ${exclusionTerms} ${experienceExclusions}`;
      
      const googleSearch = `site:(linkedin.com OR indeed.com OR glassdoor.com) ${jobTitles} ${locations} ${industryString ? industryString : ''} ${experienceTerms} ${recentOnly ? recentTerms : ''} ${exclusionTerms}`;
      
      const companySearch = `site:(*.com/careers OR *.com/jobs OR *.io/careers) -site:linkedin.com -site:indeed.com ${jobTitles} ${locations} ${industryString ? industryString : ''} ${recentOnly ? recentTerms : ''} ${exclusionTerms}`;
      
      const fundingSearch = `("recently funded" OR "series A" OR "series B" OR "seed funding" OR "raised") ${industryString ? industryString : ''} ${locations} ${recentOnly ? '("2023" OR "2024")' : ''} ${jobTitles}`;
      
      // Display the results
      document.getElementById('linkedin-result').textContent = linkedinSearch.trim();
      document.getElementById('google-result').textContent = googleSearch.trim();
      document.getElementById('company-result').textContent = companySearch.trim();
      document.getElementById('funding-result').textContent = fundingSearch.trim();
    }
  }
});