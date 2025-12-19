// Particle System
class ParticleSystem {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.init();
  }

  init() {
    this.canvas.classList.add('particle-canvas');
    document.querySelector('.bg-layer').appendChild(this.canvas);
    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.createParticles();
    this.animate();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createParticles() {
    const count = Math.floor((this.canvas.width * this.canvas.height) / 20000);
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.5 + 0.2
      });
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.particles.forEach(particle => {
      particle.x += particle.speedX;
      particle.y += particle.speedY;

      if (particle.x < 0 || particle.x > this.canvas.width) particle.speedX *= -1;
      if (particle.y < 0 || particle.y > this.canvas.height) particle.speedY *= -1;

      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(58, 242, 255, ${particle.opacity})`;
      this.ctx.fill();
    });

    requestAnimationFrame(() => this.animate());
  }
}

// Scroll Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const animateOnScroll = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Card 3D Tilt Effect - Optimized
function initCardTilt() {
  const cards = document.querySelectorAll('.card');
  
  cards.forEach(card => {
    let isHovering = false;
    
    card.addEventListener('mouseenter', () => {
      isHovering = true;
    });
    
    card.addEventListener('mousemove', (e) => {
      if (!isHovering) return;
      
      requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px) scale(1.02)`;
      });
    });
    
    card.addEventListener('mouseleave', () => {
      isHovering = false;
      card.style.transform = '';
    });
  });
}

// Counter Animation - Optimized
function animateCounter(element, target, duration = 2000, decimals = 0) {
  const start = 0;
  const startTime = performance.now();
  
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Ease out cubic for smooth deceleration
    const easeProgress = 1 - Math.pow(1 - progress, 3);
    const current = start + (target - start) * easeProgress;
    
    element.textContent = decimals > 0 ? current.toFixed(decimals) : Math.floor(current);
    
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = decimals > 0 ? target.toFixed(decimals) : target;
    }
  }
  
  requestAnimationFrame(update);
}

// Typing Effect
function typeWriter(element, text, speed = 50) {
  let i = 0;
  element.textContent = '';
  
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// Stats Counter on Scroll
function initStatsCounter() {
  const stats = document.querySelectorAll('.stat');
  
  stats.forEach(stat => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !stat.classList.contains('counted')) {
          stat.classList.add('counted');
          const target = parseFloat(stat.dataset.value || '6.6');
          animateCounter(stat, target, 2000, 1);
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(stat);
  });
}

// Stat Box Counter on Scroll
function initStatBoxCounters() {
  const statNumbers = document.querySelectorAll('.stat-number');
  
  statNumbers.forEach(statNum => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !statNum.classList.contains('counted')) {
          statNum.classList.add('counted');
          const target = parseInt(statNum.dataset.target || '0');
          animateCounter(statNum, target, 2500, 0);
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(statNum);
  });
}

// Progress Bar Animation
function initProgressBars() {
  const progressFills = document.querySelectorAll('.progress-fill');
  
  progressFills.forEach(fill => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !fill.classList.contains('animated')) {
          fill.classList.add('animated');
          const progress = fill.dataset.progress || '100';
          setTimeout(() => {
            fill.style.width = progress + '%';
          }, 200);
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(fill);
  });
}

// Glitch Effect
function addGlitchEffect() {
  const title = document.querySelector('.hero-left h1');
  
  setInterval(() => {
    if (Math.random() > 0.95) {
      title.classList.add('glitch');
      setTimeout(() => title.classList.remove('glitch'), 200);
    }
  }, 3000);
}

// Smooth Scroll - Enhanced
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Mobile Menu Toggle - Enhanced
function initMobileMenu() {
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const body = document.body;
  
  if (menuToggle && navMenu) {
    // Toggle menu on button click
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isActive = menuToggle.classList.contains('active');
      
      if (isActive) {
        closeMenu();
      } else {
        openMenu();
      }
    });
    
    // Close menu when clicking on nav links
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeMenu();
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (menuToggle.classList.contains('active') && 
          !menuToggle.contains(e.target) && 
          !navMenu.contains(e.target)) {
        closeMenu();
      }
    });
    
    // Prevent menu clicks from closing
    navMenu.addEventListener('click', (e) => {
      e.stopPropagation();
    });
    
    function openMenu() {
      menuToggle.classList.add('active');
      navMenu.classList.add('active');
      body.style.overflow = 'hidden';
    }
    
    function closeMenu() {
      menuToggle.classList.remove('active');
      navMenu.classList.remove('active');
      body.style.overflow = '';
    }
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menuToggle.classList.contains('active')) {
        closeMenu();
      }
    });
  }
}

// Navigation Active State
function updateNavigation() {
  const scrollPosition = window.scrollY;
  const topBar = document.querySelector('.top-bar');
  
  if (scrollPosition > 100) {
    topBar.classList.add('scrolled');
  } else {
    topBar.classList.remove('scrolled');
  }
  
  // Update scroll progress bar
  updateScrollProgress();
}

// Scroll Progress Bar
function updateScrollProgress() {
  const scrollProgress = document.getElementById('scrollProgress');
  if (!scrollProgress) return;
  
  const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (window.scrollY / windowHeight) * 100;
  
  scrollProgress.style.transform = `scaleX(${scrolled / 100})`;
}

// Mouse Trail Effect
let mouseTrail = [];
function createMouseTrail(e) {
  const trail = document.createElement('div');
  trail.classList.add('mouse-trail');
  trail.style.left = e.clientX + 'px';
  trail.style.top = e.clientY + 'px';
  document.body.appendChild(trail);
  
  setTimeout(() => trail.remove(), 1000);
  
  mouseTrail.push(trail);
  if (mouseTrail.length > 20) {
    const old = mouseTrail.shift();
    if (old && old.parentNode) old.remove();
  }
}

// Card Hover Sound Effect (Visual feedback)
function initCardInteractions() {
  const cards = document.querySelectorAll('.card');
  
  cards.forEach((card, index) => {
    card.addEventListener('mouseenter', () => {
      card.style.setProperty('--hover-delay', `${index * 50}ms`);
      
      // Add ripple effect
      const ripple = document.createElement('div');
      ripple.classList.add('ripple');
      card.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
    });
  });
}

// Achievement Badge Animation
function initAchievements() {
  const badges = document.querySelectorAll('.achievement-badge');
  
  badges.forEach((badge, index) => {
    setTimeout(() => {
      badge.classList.add('unlocked');
    }, index * 200 + 1000);
  });
}

// Loading Animation
function initLoadingSequence() {
  const loader = document.querySelector('.loader');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('fade-out');
      setTimeout(() => loader.remove(), 500);
    }, 1500);
  }
}

// Parallax Effect - Enhanced
let lastScrollTop = 0;
function initParallax() {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const scrollDirection = scrolled > lastScrollTop ? 'down' : 'up';
    lastScrollTop = scrolled;
    
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    parallaxElements.forEach(element => {
      const speed = element.dataset.parallax || 0.5;
      const yPos = -(scrolled * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
  }, { passive: true });
}

// Initialize Everything
document.addEventListener('DOMContentLoaded', () => {
  // Initialize particle system
  new ParticleSystem();
  
  // Animate elements on scroll
  document.querySelectorAll('.card, .hero-left, .hero-badge, .section-title').forEach(el => {
    el.classList.add('animate-on-scroll');
    animateOnScroll.observe(el);
  });
  
  // Initialize features
  initMobileMenu();
  initCardTilt();
  initStatsCounter();
  initStatBoxCounters();
  initProgressBars();
  initCardInteractions();
  initAchievements();
  initSmoothScroll();
  initParallax();
  addGlitchEffect();
  initLoadingSequence();
  
  // Event listeners with throttling
  let scrollTimeout;
  window.addEventListener('scroll', () => {
    if (scrollTimeout) {
      window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(() => {
      updateNavigation();
    });
  }, { passive: true });
  
  let lastTrailTime = 0;
  document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastTrailTime > 100 && Math.random() > 0.85) {
      createMouseTrail(e);
      lastTrailTime = now;
    }
  });
  
  // Add fade-in to body
  document.body.classList.add('loaded');
  
  console.log('🎮 Final Strike - All systems operational');
  console.log('⚡ Performance optimized for 60fps');
  console.log('🎯 Interactive elements loaded');
  console.log('🎢 Smooth scrolling enabled');
});

// Web3Forms Contact Form Handler with better error handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  const submitBtn = document.getElementById('submitBtn');
  
  // Check for success parameter in URL
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('success') === 'true') {
    showNotification("✅ Success! Your message has been sent successfully.", "success");
    // Remove success parameter from URL
    window.history.replaceState({}, document.title, window.location.pathname);
  }
  
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const originalText = submitBtn.textContent;

    // Validate form
    const name = formData.get('name');
    const email = formData.get('email');
    const topic = formData.get('topic');
    const message = formData.get('message');

    if (!name || !email || !topic || !message) {
      showNotification("⚠️ Please fill in all required fields.", "error");
      return;
    }

    // Update button state
    submitBtn.innerHTML = '<span style="display: inline-flex; align-items: center; gap: 8px;"><span style="display: inline-block; width: 16px; height: 16px; border: 2px solid currentColor; border-top-color: transparent; border-radius: 50%; animation: spin 0.6s linear infinite;"></span> Sending...</span>';
    submitBtn.disabled = true;

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        showNotification("✅ Success! Your message has been sent successfully.", "success");
        contactForm.reset();
        submitBtn.innerHTML = '✓ Message Sent!';
        
        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
        }, 3000);
      } else {
        throw new Error(data.message || "Failed to send message");
      }

    } catch (error) {
      showNotification("❌ Error: " + error.message, "error");
      console.error("Form submission error:", error);
      
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  });
}

// Notification system for form feedback
function showNotification(message, type = 'success') {
  // Remove existing notification if any
  const existingNotif = document.querySelector('.form-notification');
  if (existingNotif) {
    existingNotif.remove();
  }

  // Create notification element
  const notification = document.createElement('div');
  notification.className = 'form-notification glass';
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 30px;
    padding: 20px 30px;
    background: ${type === 'success' ? 'rgba(58, 242, 255, 0.15)' : 'rgba(255, 52, 93, 0.15)'};
    border: 2px solid ${type === 'success' ? 'var(--cyan)' : 'var(--red)'};
    border-radius: 12px;
    color: var(--text-primary);
    font-size: 16px;
    font-weight: 600;
    z-index: 10000;
    backdrop-filter: blur(22px);
    -webkit-backdrop-filter: blur(22px);
    box-shadow: 0 10px 40px ${type === 'success' ? 'rgba(58, 242, 255, 0.3)' : 'rgba(255, 52, 93, 0.3)'};
    animation: slideInRight 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  `;
  notification.textContent = message;
  
  document.body.appendChild(notification);

  // Auto remove after 5 seconds
  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.4s ease-out';
    setTimeout(() => notification.remove(), 400);
  }, 5000);
}

// Add notification animations to CSS
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  @keyframes slideInRight {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }

  .btn-primary:disabled {
    cursor: not-allowed !important;
    transform: none !important;
  }

  @media (max-width: 640px) {
    .form-notification {
      right: 20px !important;
      left: 20px !important;
      top: 80px !important;
      font-size: 14px !important;
      padding: 16px 20px !important;
    }
  }
`;
document.head.appendChild(notificationStyles);

document.addEventListener('keydown', (e) => {
  konamiCode.push(e.key);
  konamiCode = konamiCode.slice(-10);
  
  if (konamiCode.join(',') === konamiSequence.join(',')) {
    document.body.classList.add('konami-mode');
    setTimeout(() => document.body.classList.remove('konami-mode'), 5000);
  }
});
