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