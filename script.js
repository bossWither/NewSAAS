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

  // Observe all elements with fade-in-up class
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
  const mockupBtn = document.querySelector('.mockup-btn');
  if (mockupBtn) {
    mockupBtn.addEventListener('click', function() {
      const originalText = this.innerText;
      this.innerText = 'Generating...';
      this.style.opacity = '0.8';
      
      setTimeout(() => {
        this.innerText = 'Copied to clipboard!';
        this.style.background = '#4caf50';
        
        setTimeout(() => {
          this.innerText = originalText;
          this.style.background = '';
          this.style.opacity = '1';
        }, 2000);
      }, 800);
    });
  }
});
