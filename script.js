/**
 * ARIA NOOR LUXURY WEDDING & EVENT PLANNER
 * Interactive Vanilla JavaScript Engine
 * Features: Mobile Navigation, Scrollspy, Counters, Skill Bars,
 *           Portfolio Filter, Testimonial Carousel, Accessible Modal,
 *           Back to Top, Ambient Petals, and Semantic Form Validation.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ==========================================================================
     1. CONSTANTS & DOM REFERENCES
     ========================================================================== */
  const siteHeader = document.getElementById('siteHeader');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const primaryNav = document.getElementById('primaryNav');
  const navLinks = document.querySelectorAll('.nav-link');
  const backToTopBtn = document.getElementById('backToTopBtn');
  const currentYearSpan = document.getElementById('currentYear');
  const petalsContainer = document.getElementById('petalsContainer');

  // Set Copyright Year
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  /* ==========================================================================
     2. FLOATING AMBIENT PETALS GENERATOR
     ========================================================================== */
  function initAmbientPetals() {
    if (!petalsContainer) return;
    const petalCount = 18;
    const colors = [
      'radial-gradient(circle, #fbdce0 0%, #f6bcc4 80%, rgba(217, 136, 149, 0.3) 100%)',
      'radial-gradient(circle, #ffe6eb 0%, #f7cad0 80%, rgba(248, 215, 218, 0.4) 100%)',
      'radial-gradient(circle, #fff3e6 0%, #fcd5ce 80%, rgba(212, 175, 55, 0.25) 100%)'
    ];

    for (let i = 0; i < petalCount; i++) {
      const petal = document.createElement('div');
      petal.classList.add('petal');

      // Randomize petal properties
      const size = Math.floor(Math.random() * 14) + 10; // 10px - 24px
      const leftPos = Math.random() * 100; // 0% - 100%
      const duration = Math.random() * 9 + 8; // 8s - 17s
      const delay = Math.random() * 8; // 0s - 8s
      const colorBg = colors[Math.floor(Math.random() * colors.length)];

      petal.style.width = `${size}px`;
      petal.style.height = `${size * 1.3}px`;
      petal.style.left = `${leftPos}vw`;
      petal.style.background = colorBg;
      petal.style.animationDuration = `${duration}s`;
      petal.style.animationDelay = `${delay}s`;

      petalsContainer.appendChild(petal);
    }
  }

  /* ==========================================================================
     3. STICKY NAVBAR & MOBILE MENU TOGGLE
     ========================================================================== */
  function toggleMobileMenu(forceClose = false) {
    if (!mobileMenuBtn || !primaryNav) return;
    
    const isCurrentlyOpen = primaryNav.classList.contains('is-open');
    const shouldOpen = forceClose ? false : !isCurrentlyOpen;

    if (shouldOpen) {
      primaryNav.classList.add('is-open');
      mobileMenuBtn.classList.add('active');
      mobileMenuBtn.setAttribute('aria-expanded', 'true');
    } else {
      primaryNav.classList.remove('is-open');
      mobileMenuBtn.classList.remove('active');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
    }
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMobileMenu();
    });
  }

  // Close mobile menu when a nav link is clicked
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      toggleMobileMenu(true);
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (primaryNav && primaryNav.classList.contains('is-open')) {
      if (!primaryNav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        toggleMobileMenu(true);
      }
    }
  });

  /* ==========================================================================
     4. ACTIVE SCROLLSPY & STICKY HEADER SHADOW
     ========================================================================== */
  const sections = document.querySelectorAll('main > section[id]');

  function handleScrollSpyAndHeader() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    // Header sticky shadow
    if (siteHeader) {
      if (scrollY > 40) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    }

    // Back to top button visibility
    if (backToTopBtn) {
      if (scrollY > 450) {
        backToTopBtn.classList.add('is-visible');
      } else {
        backToTopBtn.classList.remove('is-visible');
      }
    }

    // Scrollspy to set active nav link
    let currentSectionId = '';
    const scrollPosition = scrollY + 150;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        currentSectionId = section.getAttribute('id');
      }
    });

    if (currentSectionId) {
      navLinks.forEach((link) => {
        const href = link.getAttribute('href');
        if (href === `#${currentSectionId}`) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }
  }

  window.addEventListener('scroll', handleScrollSpyAndHeader, { passive: true });
  handleScrollSpyAndHeader(); // Initial run

  // Back to top button click handler
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* ==========================================================================
     5. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
     ========================================================================== */
  const revealElements = document.querySelectorAll('.reveal-item');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback if browser lacks IntersectionObserver
    revealElements.forEach((el) => el.classList.add('revealed'));
  }

  /* ==========================================================================
     6. ANIMATED NUMERICAL STAT COUNTERS
     ========================================================================== */
  const statsCounters = document.querySelectorAll('.stat-counter');
  let countersAnimated = false;

  function runCountersAnimation() {
    if (countersAnimated) return;
    countersAnimated = true;

    statsCounters.forEach((counter) => {
      const target = parseInt(counter.getAttribute('data-target'), 10);
      const suffix = counter.getAttribute('data-suffix') || '';
      const duration = 2000; // ms
      const startTime = performance.now();

      function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing out quadratic
        const easeOutQuad = 1 - (1 - progress) * (1 - progress);
        const currentVal = Math.floor(easeOutQuad * target);

        counter.textContent = `${currentVal}${suffix}`;

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = `${target}${suffix}`;
        }
      }

      requestAnimationFrame(updateCounter);
    });
  }

  const statsGrid = document.getElementById('statsGrid');
  if (statsGrid && 'IntersectionObserver' in window) {
    const statsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          runCountersAnimation();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });

    statsObserver.observe(statsGrid);
  } else if (statsGrid) {
    runCountersAnimation();
  }

  /* ==========================================================================
     7. ANIMATED SKILL BARS
     ========================================================================== */
  const skillBars = document.querySelectorAll('.skill-bar-fill');
  const skillsContainer = document.getElementById('skillsContainer');
  let skillsAnimated = false;

  function animateSkillBars() {
    if (skillsAnimated) return;
    skillsAnimated = true;

    skillBars.forEach((bar) => {
      const progress = bar.getAttribute('data-progress');
      bar.style.width = `${progress}%`;
    });
  }

  if (skillsContainer && 'IntersectionObserver' in window) {
    const skillsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateSkillBars();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    skillsObserver.observe(skillsContainer);
  } else if (skillsContainer) {
    animateSkillBars();
  }

  /* ==========================================================================
     8. PORTFOLIO FILTERING (DOM MANIPULATION)
     ========================================================================== */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const selectedFilter = btn.getAttribute('data-filter');

      // Update active state on buttons
      filterButtons.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      // Filter project cards
      projectCards.forEach((card) => {
        const cardCategory = card.getAttribute('data-category');

        if (selectedFilter === 'all' || cardCategory === selectedFilter) {
          card.classList.remove('is-hidden');
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 40);
        } else {
          card.classList.add('is-hidden');
        }
      });
    });
  });

  /* ==========================================================================
     9. TESTIMONIALS CAROUSEL (AUTO + MANUAL SLIDER)
     ========================================================================== */
  const carouselTrack = document.getElementById('carouselTrack');
  const slides = document.querySelectorAll('.testimonial-slide');
  const prevBtn = document.getElementById('carouselPrevBtn');
  const nextBtn = document.getElementById('carouselNextBtn');
  const dotBtns = document.querySelectorAll('.dot-btn');
  
  let currentSlide = 0;
  let carouselInterval = null;
  const slideCount = slides.length;
  const slideDuration = 6000; // 6s per slide

  function showSlide(index) {
    if (index >= slideCount) {
      currentSlide = 0;
    } else if (index < 0) {
      currentSlide = slideCount - 1;
    } else {
      currentSlide = index;
    }

    slides.forEach((slide, idx) => {
      if (idx === currentSlide) {
        slide.classList.add('active');
        slide.removeAttribute('aria-hidden');
      } else {
        slide.classList.remove('active');
        slide.setAttribute('aria-hidden', 'true');
      }
    });

    dotBtns.forEach((dot, idx) => {
      if (idx === currentSlide) {
        dot.classList.add('active');
        dot.setAttribute('aria-selected', 'true');
      } else {
        dot.classList.remove('active');
        dot.setAttribute('aria-selected', 'false');
      }
    });
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  function prevSlide() {
    showSlide(currentSlide - 1);
  }

  function startCarouselTimer() {
    stopCarouselTimer();
    carouselInterval = setInterval(nextSlide, slideDuration);
  }

  function stopCarouselTimer() {
    if (carouselInterval) {
      clearInterval(carouselInterval);
      carouselInterval = null;
    }
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      startCarouselTimer();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      startCarouselTimer();
    });
  }

  dotBtns.forEach((dot) => {
    dot.addEventListener('click', () => {
      const slideIndex = parseInt(dot.getAttribute('data-slide'), 10);
      showSlide(slideIndex);
      startCarouselTimer();
    });
  });

  // Pause on hover / focus
  const carouselWrapper = document.getElementById('testimonialCarousel');
  if (carouselWrapper) {
    carouselWrapper.addEventListener('mouseenter', stopCarouselTimer);
    carouselWrapper.addEventListener('mouseleave', startCarouselTimer);
    carouselWrapper.addEventListener('focusin', stopCarouselTimer);
    carouselWrapper.addEventListener('focusout', startCarouselTimer);
  }

  // Keyboard navigation for carousel
  if (carouselWrapper) {
    carouselWrapper.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
        startCarouselTimer();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
        startCarouselTimer();
      }
    });
  }

  // Initial carousel start
  if (slides.length > 0) {
    showSlide(0);
    startCarouselTimer();
  }

  /* ==========================================================================
     10. ACCESSIBLE PROJECT DETAILS MODAL
     ========================================================================== */
  const projectModal = document.getElementById('projectModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalTitle = document.getElementById('modalTitle');
  const modalCategory = document.getElementById('modalCategory');
  const modalMeta = document.getElementById('modalMeta');
  const modalDesc = document.getElementById('modalDesc');
  const modalHighlightsList = document.getElementById('modalHighlightsList');
  const modalEmblem = document.getElementById('modalEmblem');
  const detailButtons = document.querySelectorAll('.btn-card-details');

  // Rich database for projects
  const projectsData = {
    'project-1': {
      title: 'The Royal Botanical Baraat & Walima',
      category: 'Weddings & Cultural Ceremonies',
      emblem: '👑',
      location: '📍 Serene Margalla Hills Estate',
      guests: '👥 650 Guests',
      desc: 'An opulent 2-day wedding celebration uniting botanical luxury with rich cultural heritage. Featuring custom hand-carved floral mandaps, an enchanted tunnel entrance lined with 5,000 heirloom garden roses, floating candle chandeliers, and synchronized folk orchestra performances.',
      highlights: [
        'Custom emerald & champagne silk staging with heirloom fresh rose backdrop',
        'Multi-course Mughal banquet curated for 650 guests with live artisan chaat counters',
        'Comprehensive 14-member day-of logistics team managing VIP arrivals and protocol',
        'Drone cinematics capturing dusk fireworks over the scenic Margalla backdrop'
      ]
    },
    'project-2': {
      title: 'Starlit Sunset Engagement Soirée',
      category: 'Engagements & Intimate Celebrations',
      emblem: '✨',
      location: '📍 Lakeview Glass Pavilion',
      guests: '👥 120 Guests',
      desc: 'An intimate, sunset-infused engagement party centered on delicate romance. Guests were treated to bespoke signature mocktails by the lake, an acoustic live string trio, and a floating acrylic arch draped in soft blush ranunculus and ivory hydrangeas.',
      highlights: [
        'Floating mirrored water runway reflecting warm sunset hues',
        'Acoustic string quartet and personalized love-song playlist',
        'Artisanal grazing tables featuring imported cheeses, macaron towers, and edible flowers',
        'Golden hour portrait direction for the newly engaged couple'
      ]
    },
    'project-3': {
      title: 'Opulent Rose Garden Glasshouse Vows',
      category: 'Luxury Weddings',
      emblem: '🌸',
      location: '📍 The Glass Manor Estate',
      guests: '👥 320 Guests',
      desc: 'A dreamlike greenhouse fairytale brought indoors. Cascading blush wisteria hung from glass rafters while antique candelabras illuminated custom embroidered velvet tablescapes for an unforgettable dinner dance.',
      highlights: [
        'Ceiling-suspended floral chandeliers with fairy light fibers',
        'Bespoke 5-tier gold foil and raspberry-pistachio confection',
        'Curated 4-course French-fusion plated dinner with table wine pairings',
        'Indoor cold sparkler send-off under starlit glass roofs'
      ]
    },
    'project-4': {
      title: 'Lumina Global Annual Leadership Gala',
      category: 'Corporate Celebrations',
      emblem: '🌟',
      location: '📍 Grand Meridian Ballroom',
      guests: '👥 480 Guests',
      desc: 'A high-stakes international corporate gala honoring executive pioneers. Integrated modern architectural florals with high-tech projection mapping, synchronized intelligent lighting, and seamless diplomatic seating protocols.',
      highlights: [
        'State-of-the-art 3D projection mapping stage with custom keynote graphics',
        'Seamless multi-course banquet flow coordinated down to the minute',
        'VIP protocol security management and executive green rooms',
        'Eco-responsible event execution with 100% compostable florals repurposed'
      ]
    },
    'project-5': {
      title: 'Bohemian Sunset Mehndi & Sangeet',
      category: 'Weddings & Cultural Ceremonies',
      emblem: '🪔',
      location: '📍 Whispering Pines Orchard',
      guests: '👥 260 Guests',
      desc: 'A riot of festive colors, joyful laughter, and musical celebration. Designed with vibrant marigold canopies, hand-painted Moroccan tile dance platforms, henna artisan lounge tents, and live street-food carts.',
      highlights: [
        'Custom 360-degree round dance amphitheater for competitive bridal party dances',
        'Interactive henna & bangles bazaar for international attendees',
        'Authentic live tandoor and karahi food stations cooked fresh on site',
        'Bespoke ambient lighting with over 400 brass lanterns and fairy canopies'
      ]
    },
    'project-6': {
      title: 'Sapphire Tech Summit & Awards Dinner',
      category: 'Corporate Celebrations',
      emblem: '💼',
      location: '📍 Coastal Grand Ballroom',
      guests: '👥 220 Guests',
      desc: 'An elite gathering of global tech leaders and founders. Focused on modern minimalism, sleek slate-and-gold place settings, bespoke acoustic tuning for keynote speeches, and an unforgettable five-star dinner service.',
      highlights: [
        'Minimalist architectural floral centerpieces with geometric brass accents',
        'Crystal-clear surround audio and low-glare presentation video walls',
        'Personalized executive gifting lounges and calligraphy place cards',
        'Post-summit jazz cocktail lounge with coastal panoramic views'
      ]
    }
  };

  let previousActiveElement = null;

  function openProjectModal(projectId) {
    const data = projectsData[projectId];
    if (!data || !projectModal) return;

    previousActiveElement = document.activeElement;

    modalTitle.textContent = data.title;
    modalCategory.textContent = data.category;
    modalEmblem.textContent = data.emblem;
    modalMeta.textContent = `${data.location} • ${data.guests}`;
    modalDesc.textContent = data.desc;

    // Populate highlights
    modalHighlightsList.innerHTML = '';
    data.highlights.forEach((item) => {
      const li = document.createElement('li');
      li.textContent = item;
      modalHighlightsList.appendChild(li);
    });

    projectModal.classList.add('is-open');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Focus close button for accessibility
    setTimeout(() => {
      modalCloseBtn.focus();
    }, 100);
  }

  function closeProjectModal() {
    if (!projectModal) return;
    projectModal.classList.remove('is-open');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    if (previousActiveElement) {
      previousActiveElement.focus();
    }
  }

  detailButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const modalId = btn.getAttribute('data-modal');
      openProjectModal(modalId);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeProjectModal);
  }

  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) {
        closeProjectModal();
      }
    });

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && projectModal.classList.contains('is-open')) {
        closeProjectModal();
      }
    });
  }

  /* ==========================================================================
     11. FORM VALIDATION & ACCESSIBILITY LOGIC (CRUCIAL)
     ========================================================================== */
  const inquiryForm = document.getElementById('weddingInquiryForm');
  const formSuccessBanner = document.getElementById('formSuccessBanner');
  const successClientName = document.getElementById('successClientName');
  const dismissSuccessBtn = document.getElementById('dismissSuccessBtn');

  // Input elements
  const clientNameInput = document.getElementById('clientName');
  const clientEmailInput = document.getElementById('clientEmail');
  const clientPhoneInput = document.getElementById('clientPhone');
  const eventTypeSelect = document.getElementById('eventType');
  const eventDateInput = document.getElementById('eventDate');
  const guestCountInput = document.getElementById('guestCount');
  const eventVisionInput = document.getElementById('eventVision');

  // Set minimum event date to tomorrow
  if (eventDateInput) {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    const tomorrowStr = today.toISOString().split('T')[0];
    eventDateInput.setAttribute('min', tomorrowStr);
  }

  // Dismiss button for success banner
  if (dismissSuccessBtn && formSuccessBanner) {
    dismissSuccessBtn.addEventListener('click', () => {
      formSuccessBanner.setAttribute('hidden', '');
    });
  }

  /**
   * Helper function to show field error
   */
  function setFieldError(inputEl, errorId, message) {
    const errorEl = document.getElementById(errorId);
    if (!inputEl || !errorEl) return;

    inputEl.classList.add('is-invalid');
    inputEl.setAttribute('aria-invalid', 'true');
    errorEl.textContent = message;
  }

  /**
   * Helper function to clear field error
   */
  function clearFieldError(inputEl, errorId) {
    const errorEl = document.getElementById(errorId);
    if (!inputEl || !errorEl) return;

    inputEl.classList.remove('is-invalid');
    inputEl.removeAttribute('aria-invalid');
    errorEl.textContent = '';
  }

  // Attach live input/change validation to clear errors as user fixes them
  if (clientNameInput) {
    clientNameInput.addEventListener('input', () => {
      if (clientNameInput.value.trim().length >= 3) {
        clearFieldError(clientNameInput, 'clientNameError');
      }
    });
  }

  if (clientEmailInput) {
    clientEmailInput.addEventListener('input', () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(clientEmailInput.value.trim())) {
        clearFieldError(clientEmailInput, 'clientEmailError');
      }
    });
  }

  if (clientPhoneInput) {
    clientPhoneInput.addEventListener('input', () => {
      const phoneRegex = /^[0-9+\s\-()]{7,20}$/;
      if (phoneRegex.test(clientPhoneInput.value.trim())) {
        clearFieldError(clientPhoneInput, 'clientPhoneError');
      }
    });
  }

  if (eventTypeSelect) {
    eventTypeSelect.addEventListener('change', () => {
      if (eventTypeSelect.value !== '') {
        clearFieldError(eventTypeSelect, 'eventTypeError');
      }
    });
  }

  if (eventDateInput) {
    eventDateInput.addEventListener('change', () => {
      if (eventDateInput.value !== '') {
        clearFieldError(eventDateInput, 'eventDateError');
      }
    });
  }

  if (guestCountInput) {
    guestCountInput.addEventListener('input', () => {
      const val = parseInt(guestCountInput.value, 10);
      if (!isNaN(val) && val >= 10 && val <= 2500) {
        clearFieldError(guestCountInput, 'guestCountError');
      }
    });
  }

  if (eventVisionInput) {
    eventVisionInput.addEventListener('input', () => {
      if (eventVisionInput.value.trim().length >= 10) {
        clearFieldError(eventVisionInput, 'eventVisionError');
      }
    });
  }

  // Form submission validation
  if (inquiryForm) {
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;
      let firstInvalidElement = null;

      // 1. Validate Full Name
      const nameVal = clientNameInput ? clientNameInput.value.trim() : '';
      if (!nameVal) {
        setFieldError(clientNameInput, 'clientNameError', 'Please enter your full name or couple names.');
        isValid = false;
        if (!firstInvalidElement) firstInvalidElement = clientNameInput;
      } else if (nameVal.length < 3) {
        setFieldError(clientNameInput, 'clientNameError', 'Name must be at least 3 characters in length.');
        isValid = false;
        if (!firstInvalidElement) firstInvalidElement = clientNameInput;
      } else {
        clearFieldError(clientNameInput, 'clientNameError');
      }

      // 2. Validate Email
      const emailVal = clientEmailInput ? clientEmailInput.value.trim() : '';
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailVal) {
        setFieldError(clientEmailInput, 'clientEmailError', 'Please enter your contact email address.');
        isValid = false;
        if (!firstInvalidElement) firstInvalidElement = clientEmailInput;
      } else if (!emailPattern.test(emailVal)) {
        setFieldError(clientEmailInput, 'clientEmailError', 'Please enter a valid email address (e.g. name@domain.com).');
        isValid = false;
        if (!firstInvalidElement) firstInvalidElement = clientEmailInput;
      } else {
        clearFieldError(clientEmailInput, 'clientEmailError');
      }

      // 3. Validate Phone Number
      const phoneVal = clientPhoneInput ? clientPhoneInput.value.trim() : '';
      const phonePattern = /^[0-9+\s\-()]{7,20}$/;
      if (!phoneVal) {
        setFieldError(clientPhoneInput, 'clientPhoneError', 'Please enter your phone or WhatsApp number.');
        isValid = false;
        if (!firstInvalidElement) firstInvalidElement = clientPhoneInput;
      } else if (!phonePattern.test(phoneVal)) {
        setFieldError(clientPhoneInput, 'clientPhoneError', 'Please enter a valid phone number (digits, +, hyphens allowed).');
        isValid = false;
        if (!firstInvalidElement) firstInvalidElement = clientPhoneInput;
      } else {
        clearFieldError(clientPhoneInput, 'clientPhoneError');
      }

      // 4. Validate Event Type
      const typeVal = eventTypeSelect ? eventTypeSelect.value : '';
      if (!typeVal) {
        setFieldError(eventTypeSelect, 'eventTypeError', 'Please choose the celebration type from the dropdown.');
        isValid = false;
        if (!firstInvalidElement) firstInvalidElement = eventTypeSelect;
      } else {
        clearFieldError(eventTypeSelect, 'eventTypeError');
      }

      // 5. Validate Event Date
      const dateVal = eventDateInput ? eventDateInput.value : '';
      if (!dateVal) {
        setFieldError(eventDateInput, 'eventDateError', 'Please select an estimated date for your celebration.');
        isValid = false;
        if (!firstInvalidElement) firstInvalidElement = eventDateInput;
      } else {
        clearFieldError(eventDateInput, 'eventDateError');
      }

      // 6. Validate Guest Count
      const guestVal = guestCountInput ? parseInt(guestCountInput.value, 10) : NaN;
      if (isNaN(guestVal) || guestCountInput.value.trim() === '') {
        setFieldError(guestCountInput, 'guestCountError', 'Please enter your anticipated guest count.');
        isValid = false;
        if (!firstInvalidElement) firstInvalidElement = guestCountInput;
      } else if (guestVal < 10) {
        setFieldError(guestCountInput, 'guestCountError', 'Minimum guest count is 10 guests.');
        isValid = false;
        if (!firstInvalidElement) firstInvalidElement = guestCountInput;
      } else if (guestVal > 2500) {
        setFieldError(guestCountInput, 'guestCountError', 'For mega celebrations exceeding 2,500 guests, please contact us directly.');
        isValid = false;
        if (!firstInvalidElement) firstInvalidElement = guestCountInput;
      } else {
        clearFieldError(guestCountInput, 'guestCountError');
      }

      // 7. Validate Vision / Message
      const visionVal = eventVisionInput ? eventVisionInput.value.trim() : '';
      if (!visionVal) {
        setFieldError(eventVisionInput, 'eventVisionError', 'Please share a brief note about your celebration vision.');
        isValid = false;
        if (!firstInvalidElement) firstInvalidElement = eventVisionInput;
      } else if (visionVal.length < 10) {
        setFieldError(eventVisionInput, 'eventVisionError', 'Please provide a little more detail (at least 10 characters).');
        isValid = false;
        if (!firstInvalidElement) firstInvalidElement = eventVisionInput;
      } else {
        clearFieldError(eventVisionInput, 'eventVisionError');
      }

      // If invalid, focus the first bad field to aid keyboard and screen reader users
      if (!isValid && firstInvalidElement) {
        firstInvalidElement.focus();
        return;
      }

      // If Valid: Show Success Message & Reset Form
      if (isValid) {
        const rawName = clientNameInput.value.trim();
        const displayName = rawName.split(' ')[0] || rawName;

        if (successClientName) {
          successClientName.textContent = displayName;
        }

        if (formSuccessBanner) {
          formSuccessBanner.removeAttribute('hidden');
          formSuccessBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        // Reset form inputs
        inquiryForm.reset();

        // Clear all inline error states
        clearFieldError(clientNameInput, 'clientNameError');
        clearFieldError(clientEmailInput, 'clientEmailError');
        clearFieldError(clientPhoneInput, 'clientPhoneError');
        clearFieldError(eventTypeSelect, 'eventTypeError');
        clearFieldError(eventDateInput, 'eventDateError');
        clearFieldError(guestCountInput, 'guestCountError');
        clearFieldError(eventVisionInput, 'eventVisionError');
      }
    });
  }

  // Initialize petals background
  initAmbientPetals();
});
