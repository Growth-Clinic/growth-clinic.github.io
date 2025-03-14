// Enhanced search.js without time filtering parameters
// Simplified to focus on the most effective search parameters

// New function to create a comprehensive startup insights search
function generateStartupInsightsSearch(jobRole, alternativeTitles, locationTerms, industry) {
    // Process job titles for the search
    const jobTitles = alternativeTitles ? 
      `(${jobRole} OR ${alternativeTitles.split(',').map(t => t.trim()).join(' OR ')})` : 
      jobRole;
    
    // Create a string with industry terms if provided
    const industryString = industry ? industry.trim() : '';
    
    // Location processing
    const locationTerm = locationTerms.trim();
    
    // Generate base search for recent funding and growth signals
    let search = '';
    
    // Include specific tech news sources for better results
    const techNewsSources = [
      'site:techcrunch.com', 
      'site:techcabal.com', 
      'site:nairametrics.com',
      'site:disrupt-africa.com', 
      'site:sifted.eu',
      'site:eu-startups.com',
      'site:techinasia.com',
      'site:e27.co'
    ];
    
    // Create the source string based on location to prioritize relevant sources
    let sourceString = '';
    if (locationTerm.toLowerCase().includes('africa') || 
        locationTerm.toLowerCase().includes('nigeria') || 
        locationTerm.toLowerCase().includes('lagos')) {
      // Prioritize African tech news sources
      sourceString = `(${techNewsSources.slice(1, 4).join(' OR ')})`;
    } else if (locationTerm.toLowerCase().includes('europe')) {
      // Prioritize European tech news sources
      sourceString = `(${techNewsSources.slice(4, 6).join(' OR ')})`;
    } else if (locationTerm.toLowerCase().includes('asia')) {
      // Prioritize Asian tech news sources
      sourceString = `(${techNewsSources.slice(6, 8).join(' OR ')})`;
    } else {
      // Use all sources with global ones first
      sourceString = `(${techNewsSources.join(' OR ')})`;
    }
    
    // Growth signals that indicate hiring potential
    const growthSignals = [
      'funding', 
      'raised capital',
      'investment',
      'series A',
      'series B',
      'seed round',
      'expanding team',
      'new office',
      'product launch',
      'expansion'
    ];
    
    // Put it all together in a more targeted search
    search = `${sourceString} ${locationTerm} ${industryString} ${jobTitles} (${growthSignals.join(' OR ')})`;
    
    return search.trim();
  }

document.addEventListener('DOMContentLoaded', function() {
    // Enhanced parameters database - keeping only what's most effective
    const enhancedSearchParams = {
      // ATS job boards to search specifically
      atsBoards: {
        lever: 'jobs.lever.co',
        greenhouse: 'boards.greenhouse.io',
        workable: 'apply.workable.com',
        ashby: 'jobs.ashbyhq.com',
        smartrecruiters: 'jobs.smartrecruiters.com',
        jobvite: 'jobs.jobvite.com',
        recruitee: 'careers.recruitee.com'
      },
      
      // Company stages with corresponding signals
      companyStages: {
        early: ['startup', 'seed funding', 'series A', 'early stage', 'recently founded'],
        growth: ['series B', 'series C', 'growth stage', 'scaling', 'expanding team'],
        established: ['enterprise', 'public company', 'established', 'large organization']
      },
      
      // Location restriction patterns (for filtering non-truly remote jobs)
      locationRestrictions: [
        "must be located in",
        "must reside in",
        "candidates must be based in",
        "only hiring in",
        "remote (",
        "remote -",
        "remote within",
        "work authorization required",
        "must be authorized to work in",
        "eligible to work in",
        "right to work in",
        "timezone requirement",
        "timezone:",
        "EST|PST|CST|MST required"
      ],
      
      // Hiring signals based on company news
      hiringSignals: [
        'recently funded',
        'series A',
        'series B',
        'series C',
        'seed funding',
        'raised',
        'expanding team',
        'growing team',
        'scaling operations',
        'opening new office',
        'launching new product'
      ],
      
      // Exclusion terms for various roles and job types
      exclusionTerms: {
        common: ['freelance', 'contract', 'part-time', 'internship', 'temporary', 'volunteer'],
        tech: ['senior', 'lead', 'architect', 'director', 'head of', 'principal'],
        junior: ['senior', 'lead', 'principal', 'head', 'chief', 'director', '5+ years', '7+ years'],
        mid: ['junior', 'entry level', 'associate', 'intern', 'director', 'VP', 'head', '10+ years'],
        senior: ['junior', 'entry level', 'associate', 'intern', 'assistant']
      }
    };
    
    // Enhanced formula generation function - removed time filtering
    function generateEnhancedSearchFormulas() {
      // Get basic input values from existing fields
      const jobRole = document.getElementById('jobRole').value.trim() || "product designer";
      const alternativeTitles = document.getElementById('alternativeTitle').value.trim();
      const location = document.getElementById('location').value.trim() || "Lagos";
      const industry = document.getElementById('industry').value.trim();
      const experience = document.getElementById('experience').value;
      const exclusions = document.getElementById('exclusions').value.trim();
      
      // Get new input values from enhanced fields
      const companyStage = document.getElementById('companyStage')?.value || '';
      const atsSearch = document.getElementById('atsSearch')?.value || 'all';
      const trueRemoteOnly = document.getElementById('trueRemoteOnly')?.checked || false;
      const hiringSignals = document.getElementById('hiringSignals')?.value || '';
      
      // Process job titles
      const jobTitles = alternativeTitles ? 
        `("${jobRole}" OR "${alternativeTitles.split(',').map(t => t.trim()).join('" OR "')}")` : 
        `"${jobRole}"`;
      
      // Process locations with enhanced remote handling
      let locationTerms = '';
      if (location.toLowerCase().includes('remote') && trueRemoteOnly) {
        // For truly remote searches, include "remote" but exclude location restrictions
        locationTerms = `"remote" -"${enhancedSearchParams.locationRestrictions.join('" -"')}"`;
      } else {
        // Regular location search
        locationTerms = location.includes(',') ? 
          `(${location.split(',').map(l => `"${l.trim()}"`).join(' OR ')})` : 
          `"${location}"`;
      }
      
      // Process industry with enhanced context
      const industryString = industry ? 
        `(${industry.split(',').map(i => `"${i.trim()}"`).join(' OR ')})` : 
        '';
      
      // Enhanced experience level terms
      let experienceTerms = '';
      let experienceExclusions = '';
      
      switch(experience) {
        case 'entry':
          experienceTerms = '("entry level" OR "junior" OR "associate" OR "graduate" OR "0-2 years")';
          experienceExclusions = enhancedSearchParams.exclusionTerms.junior.map(term => `-"${term}"`).join(' ');
          break;
        case 'mid':
          experienceTerms = '("mid level" OR "intermediate" OR "2-5 years" OR "2+ years" OR "3+ years")';
          experienceExclusions = enhancedSearchParams.exclusionTerms.mid.map(term => `-"${term}"`).join(' ');
          break;
        case 'senior':
          experienceTerms = '("senior" OR "lead" OR "principal" OR "5+ years" OR "7+ years" OR "experienced")';
          experienceExclusions = enhancedSearchParams.exclusionTerms.senior.map(term => `-"${term}"`).join(' ');
          break;
      }
      
      // Enhanced exclusion terms
      const userExclusionTerms = exclusions ? 
        exclusions.split(',').map(e => `-"${e.trim()}"`).join(' ') : 
        '';
      
      // Common exclusions that apply to all searches
      const commonExclusionTerms = enhancedSearchParams.exclusionTerms.common
        .filter(term => !exclusions.includes(term))
        .map(term => `-"${term}"`).join(' ');
      
      // Company stage terms
      let companyStageTerms = '';
      if (companyStage) {
        const stageKeywords = enhancedSearchParams.companyStages[companyStage];
        if (stageKeywords) {
          companyStageTerms = `(${stageKeywords.map(term => `"${term}"`).join(' OR ')})`;
        }
      }
      
      // Hiring signals terms
      let hiringSignalTerms = '';
      if (hiringSignals) {
        let signalKeywords = [];
        
        if (hiringSignals === 'funding') {
          signalKeywords = ['recently funded', 'series A', 'series B', 'seed funding', 'raised'];
        } else if (hiringSignals === 'growing') {
          signalKeywords = ['expanding team', 'growing team', 'scaling operations', 'hiring spree'];
        } else if (hiringSignals === 'new_product') {
          signalKeywords = ['launching product', 'new product', 'product launch', 'expansion'];
        }
        
        hiringSignalTerms = signalKeywords.length ? 
          `(${signalKeywords.map(term => `"${term}"`).join(' OR ')})` : 
          '';
      }
      
      // Generate enhanced LinkedIn search formula
      const linkedinSearch = [
        jobTitles,
        locationTerms,
        industryString,
        experienceTerms,
        companyStageTerms,
        hiringSignalTerms,
        experienceExclusions,
        userExclusionTerms,
        commonExclusionTerms
      ].filter(Boolean).join(' ');
      
      // Generate Google search formula with ATS-specific targeting
      let googleSearch = '';
      if (atsSearch === 'all') {
        // Target all major job boards
        const allSites = Object.values(enhancedSearchParams.atsBoards);
        googleSearch = `site:(${allSites.join(' OR ')}) ${jobTitles} ${locationTerms} ${industryString || ''} ${experienceTerms} ${companyStageTerms || ''} ${userExclusionTerms || ''}`;
      } else if (atsSearch === 'company') {
        // Target only company career pages
        googleSearch = `site:(*.com/careers OR *.com/jobs OR *.io/careers OR *.co/careers) -site:linkedin.com -site:indeed.com ${jobTitles} ${locationTerms} ${industryString || ''} ${companyStageTerms || ''} ${userExclusionTerms || ''}`;
      } else {
        // Target specific ATS boards chosen by user
        googleSearch = `site:${enhancedSearchParams.atsBoards[atsSearch]} ${jobTitles} ${locationTerms} ${industryString || ''} ${experienceTerms} ${companyStageTerms || ''} ${userExclusionTerms || ''}`;
      }
      
      // Generate enhanced company career pages search
      const companySearch = `site:(*.com/careers OR *.com/jobs OR *.io/careers OR *.co/careers OR *.net/careers) -site:linkedin.com -site:indeed.com -site:glassdoor.com ${jobTitles} ${locationTerms} ${industryString || ''} ${companyStageTerms || ''} ${userExclusionTerms || ''}`;
      
      // Generate enhanced funding search with more specific signals and tech news sources
      const fundingSearch = generateStartupInsightsSearch(jobRole, alternativeTitles, location, industry);
      
      // Display the results
      document.getElementById('linkedin-result').textContent = linkedinSearch.trim();
      document.getElementById('google-result').textContent = googleSearch.trim();
      document.getElementById('company-result').textContent = companySearch.trim();
      document.getElementById('startup-insights-result').textContent = fundingSearch.trim();
    }
    
    // Find the generate button
    const generateBtn = document.getElementById('generateBtn');
    
    // If generate button exists, add new fields and set up the button
    if (generateBtn) {
      // First, check if we've already enhanced the form to avoid duplicates
      if (!document.getElementById('companyStage')) {
        try {
          // Create a custom stylesheet for our enhanced elements
          const style = document.createElement('style');
          style.textContent = `
            /* Match width and styling of original form elements */
            .tool-container .form-group,
            .tool-container .switch-container {
              width: 100%;
              max-width: 100%;
            }
            
            /* Fix excessive width */
            .enhanced-fields-container {
              width: 100%;
              max-width: 100%;
            }
            
            /* Ensure labels and text align with original form */
            .enhanced-fields-container .form-group {
              margin-bottom: 2rem;
            }
            
            /* Ensure consistent spacing */
            .enhanced-fields-container {
              margin-bottom: 1rem;
            }
            
            /* Move the original fields below the enhanced fields */
            .original-fields-container {
              margin-top: 1rem;
            }
            
            /* Hide the recentOnly checkbox and the time period field */
            #recentOnlyContainer, #timePeriodContainer {
              display: none !important;
            }
          `;
          document.head.appendChild(style);
          
          // Create the original form elements container
          const originalFieldsContainer = document.createElement('div');
          originalFieldsContainer.className = 'original-fields-container';
          
          // Get the existing form fields
          const existingFields = document.querySelectorAll('.tool-container .form-group');
          const recentOnlySwitch = document.querySelector('.switch-container');
          
          // Remove the recentOnly checkbox - as requested
          if (recentOnlySwitch) {
            recentOnlySwitch.id = 'recentOnlyContainer';
          }
          
          // Create a container for all our new fields
          const newFieldsContainer = document.createElement('div');
          newFieldsContainer.className = 'enhanced-fields-container';
          
          // Add the new fields HTML - removed time period dropdown
          newFieldsContainer.innerHTML = `
            <div class="form-group">
              <label for="companyStage">Company Stage (Optional)</label>
              <select id="companyStage">
                <option value="">Any Stage</option>
                <option value="early">Early Stage / Startup</option>
                <option value="growth">Growth Stage</option>
                <option value="established">Established / Enterprise</option>
              </select>
              <p class="hint">Target companies at a specific growth stage</p>
            </div>
            
            <div class="form-group">
              <label for="atsSearch">ATS-Specific Search</label>
              <select id="atsSearch">
                <option value="all" selected>All Job Boards</option>
                <option value="lever">Lever</option>
                <option value="greenhouse">Greenhouse</option>
                <option value="workable">Workable</option>
                <option value="ashby">Ashby</option>
                <option value="smartrecruiters">SmartRecruiters</option>
                <option value="jobvite">Jobvite</option>
                <option value="recruitee">Recruitee</option>
                <option value="company">Company Career Pages Only</option>
              </select>
              <p class="hint">Target specific applicant tracking systems</p>
            </div>
            
            <div class="form-group">
              <label for="hiringSignals">Hiring Signals (Optional)</label>
              <select id="hiringSignals">
                <option value="">Any</option>
                <option value="funding">Recently Funded Companies</option>
                <option value="growing">Growing Teams</option>
                <option value="new_product">New Product Launches</option>
              </select>
              <p class="hint">Target companies showing strong hiring signals</p>
            </div>
            
            <div class="switch-container">
              <label class="switch">
                <input type="checkbox" id="trueRemoteOnly">
                <span class="slider"></span>
              </label>
              <span class="switch-label">Target truly remote jobs with no location restrictions</span>
            </div>
          `;
          
          // Find the tool container
          const toolContainer = document.querySelector('.tool-container');
          
          // Insert enhanced fields at the beginning of form
          if (toolContainer && existingFields.length > 0) {
            toolContainer.insertBefore(newFieldsContainer, existingFields[0]);
            console.log('Successfully added enhanced search fields');
          } else {
            console.error('Could not find the tool container');
          }
        } catch (error) {
          console.error('Error adding enhanced fields:', error);
        }
      } else {
        console.log('Enhanced fields already exist, skipping addition');
      }
      
      // Replace the generate button click handler to use our enhanced formula generator
      generateBtn.addEventListener('click', function() {
        // Track analytics
        if (typeof gtag === 'function') {
          gtag('event', 'search_formula_generated', {
            'page_location': window.location.href,
            'company_stage': document.getElementById('companyStage')?.value || 'not_set',
            'hiring_signals': document.getElementById('hiringSignals')?.value || 'not_set'
          });
        }
        
        // Get elements
        const spinner = document.getElementById('spinner');
        const results = document.getElementById('results');
        const emailCapture = document.getElementById('emailCapture');
        
        // Show spinner, hide results
        if (spinner) spinner.style.display = 'block';
        if (results) results.style.display = 'none';
        
        // Simulate processing time to make it feel more substantial
        setTimeout(function() {
          // Generate the enhanced search formulas
          generateEnhancedSearchFormulas();
          
          // Hide spinner, show results
          if (spinner) spinner.style.display = 'none';
          if (results) results.style.display = 'block';
          
          // Show email capture form
          if (emailCapture) emailCapture.style.display = 'block';
          
          // Scroll to results
          if (results) results.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 1200);
      });
    }
  });