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

  // Internationalization (i18n) Logic
  const btnBg = document.getElementById('lang-bg');
  const btnEn = document.getElementById('lang-en');
  
  function setLanguage(lang) {
    localStorage.setItem('language', lang);
    
    // Toggle active classes on buttons
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
  }

  // Check saved language or default to 'bg'
  const savedLang = localStorage.getItem('language') || 'bg';
  setLanguage(savedLang);

  // Event Listeners for Language Switch
  btnBg.addEventListener('click', () => setLanguage('bg'));
  btnEn.addEventListener('click', () => setLanguage('en'));

  // Contact / Demo Form Handler
  const demoForm = document.getElementById('demoForm');
  const formSuccess = document.getElementById('formSuccess');
  if (demoForm) {
    demoForm.addEventListener('submit', (e) => {
      e.preventDefault(); // Prevent actual form submission to keep it static
      
      const submitBtn = demoForm.querySelector('button[type="submit"]');
      const currentLang = localStorage.getItem('language') || 'bg';
      
      submitBtn.innerText = currentLang === 'bg' ? 'Изпращане...' : 'Sending...';
      submitBtn.disabled = true;

      // Simulate a network request
      setTimeout(() => {
        demoForm.reset();
        submitBtn.innerText = currentLang === 'bg' ? 'Изпрати Заявка' : 'Submit Request';
        submitBtn.disabled = false;
        
        // Show success message
        formSuccess.style.display = 'block';
        setTimeout(() => {
          formSuccess.style.display = 'none';
        }, 5000);
      }, 1000);
    });
  }
});
