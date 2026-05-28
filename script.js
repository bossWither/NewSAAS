document.addEventListener('DOMContentLoaded', () => {
  // Intersection Observer for scroll animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll('.fade-in-up');
  animatedElements.forEach(el => observer.observe(el));

  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mockup button interaction
  const mockupBtn = document.getElementById('mockupBtn');
  if (mockupBtn) {
    mockupBtn.addEventListener('click', function() {
      const currentLang = localStorage.getItem('language') || 'bg';
      const originalText = this.innerText;
      this.innerText = currentLang === 'bg' ? 'Генериране...' : 'Generating...';
      this.style.opacity = '0.8';
      
      setTimeout(() => {
        this.innerText = currentLang === 'bg' ? 'Копирано!' : 'Copied!';
        this.style.background = '#4caf50';
        
        setTimeout(() => {
          this.innerText = originalText;
          this.style.background = '';
          this.style.opacity = '1';
        }, 2000);
      }, 800);
    });
  }

  // ── Value Calculator ──────────────────────────────────────────────────────
  const aptSlider = document.getElementById('apt-slider');
  const aptVal    = document.getElementById('apt-val');
  const timeVal   = document.getElementById('time-val');
  const paperVal  = document.getElementById('paper-val');
  const priceVal  = document.getElementById('price-val');

  function updateCalculator() {
    if (!aptSlider) return;

    const apartments = parseInt(aptSlider.value);
    const lang = localStorage.getItem('language') || 'bg';

    // Apartment count label
    if (aptVal) aptVal.innerText = apartments;

    // Time saved (10 min per apartment)
    const totalMinutes = apartments * 10;
    const hours   = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    let timeText = '';
    if (lang === 'bg') {
      if (hours > 0)                    timeText += `${hours} час${hours > 1 ? 'а' : ''}`;
      if (hours > 0 && minutes > 0)     timeText += ' и ';
      if (minutes > 0 || hours === 0)   timeText += `${minutes} минути`;
    } else {
      if (hours > 0)                    timeText += `${hours} hour${hours > 1 ? 's' : ''}`;
      if (hours > 0 && minutes > 0)     timeText += ' and ';
      if (minutes > 0 || hours === 0)   timeText += `${minutes} minutes`;
    }
    if (timeVal) timeVal.innerText = timeText;

    // Paper saved (12 receipts per apartment per year)
    if (paperVal) paperVal.innerText = apartments * 12;

    // Price: €5 flat for up to 10 apartments, +€0.15 per apartment above 10
    let price = 5.00;
    if (apartments > 10) price += (apartments - 10) * 0.15;
    const premiumPrice = document.getElementById('premium-price');
    if (priceVal) {
      priceVal.innerText = lang === 'bg'
        ? `${price.toFixed(2)} €`
        : `€${price.toFixed(2)}`;
    }
    if (premiumPrice) {
      premiumPrice.innerText = lang === 'bg'
        ? `${price.toFixed(2)} €`
        : `€${price.toFixed(2)}`;
    }
  }

  if (aptSlider) {
    aptSlider.addEventListener('input', updateCalculator);
    // Run once on page load to set correct initial values
    updateCalculator();
  }

  // ── Internationalization (i18n) ───────────────────────────────────────────
  const btnBg = document.getElementById('lang-bg');
  const btnEn = document.getElementById('lang-en');
  
  function setLanguage(lang) {
    localStorage.setItem('language', lang);
    
    const langSwitch = document.getElementById('langSwitch');
    if (langSwitch) langSwitch.setAttribute('data-active', lang);

    if (lang === 'bg') {
      btnBg.classList.add('active');
      btnEn.classList.remove('active');
      document.documentElement.lang = 'bg';
    } else {
      btnEn.classList.add('active');
      btnBg.classList.remove('active');
      document.documentElement.lang = 'en';
    }

    // Replace text in elements with data-i18n attribute
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang] && translations[lang][key]) {
        el.innerText = translations[lang][key];
      }
    });

    // Re-run calculator so numbers and currency format update in new language
    updateCalculator();
  }

  // Check saved language or default to 'bg'
  const savedLang = localStorage.getItem('language') || 'bg';
  setLanguage(savedLang);

  btnBg.addEventListener('click', () => setLanguage('bg'));
  btnEn.addEventListener('click', () => setLanguage('en'));

  // ── Contact / Demo Form ───────────────────────────────────────────────────
  const demoForm    = document.getElementById('demoForm');
  const formSuccess = document.getElementById('formSuccess');
  if (demoForm) {
    demoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn  = demoForm.querySelector('button[type="submit"]');
      const currentLang = localStorage.getItem('language') || 'bg';
      
      submitBtn.innerText = currentLang === 'bg' ? 'Изпращане...' : 'Sending...';
      submitBtn.disabled = true;

      setTimeout(() => {
        demoForm.reset();
        submitBtn.innerText = currentLang === 'bg' ? 'Изпрати Заявка' : 'Submit Request';
        submitBtn.disabled = false;
        
        formSuccess.style.display = 'block';
        setTimeout(() => { formSuccess.style.display = 'none'; }, 5000);
      }, 1000);
    });
  }

  // ── FAQ Accordion ─────────────────────────────────────────────────────────
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all other items
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
      });

      // Toggle current item
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // ── Testimonials Carousel ───────────────────────────────────────────────────
  const track = document.getElementById('testimonialTrack');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  
  if (track && prevBtn && nextBtn) {
    const slides = Array.from(track.children);
    let currentIndex = 0;

    function updateCarousel() {
      const slideWidth = slides[0].getBoundingClientRect().width;
      track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }

    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateCarousel();
    });

    window.addEventListener('resize', updateCarousel);

    // Auto scroll
    let autoScroll = setInterval(() => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateCarousel();
    }, 5000);

    const carouselContainer = document.querySelector('.testimonials-carousel');
    if (carouselContainer) {
      carouselContainer.addEventListener('mouseenter', () => clearInterval(autoScroll));
      carouselContainer.addEventListener('mouseleave', () => {
        autoScroll = setInterval(() => {
          currentIndex = (currentIndex + 1) % slides.length;
          updateCarousel();
        }, 5000);
      });
    }
  }

  // ── Cookie Consent ──────────────────────────────────────────────────────────
  const cookieBanner = document.getElementById('cookie-banner');
  const acceptBtn = document.getElementById('cookie-accept');
  const declineBtn = document.getElementById('cookie-decline');

  if (cookieBanner && acceptBtn && declineBtn) {
    const hasConsent = localStorage.getItem('cookieConsent');
    if (!hasConsent) {
      setTimeout(() => {
        cookieBanner.classList.add('show');
      }, 2000);
    }

    const hideBanner = (consentValue) => {
      localStorage.setItem('cookieConsent', consentValue);
      cookieBanner.classList.remove('show');
    };

    acceptBtn.addEventListener('click', () => hideBanner('accepted'));
    declineBtn.addEventListener('click', () => hideBanner('declined'));
  }
});
