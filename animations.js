// Animated counter for statistics
function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = Math.ceil(target);
      clearInterval(timer);
    } else {
      element.textContent = Math.ceil(current);
    }
  }, 16);
}

// Scroll reveal animation
function revealOnScroll() {
  const reveals = document.querySelectorAll('.project-card, .skill-category, .blog-card');
  
  reveals.forEach(element => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 100;
    
    if (elementTop < windowHeight - elementVisible) {
      element.classList.add('active');
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }
  });
}

// Parallax effect for hero section
function parallaxEffect() {
  const hero = document.querySelector('.hero-banner');
  if (hero) {
    const scrolled = window.pageYOffset;
    const rate = scrolled * 0.5;
    hero.style.transform = `translate3d(0px, ${rate}px, 0px)`;
  }
}

// Magnetic button effect
function addMagneticEffect() {
  const buttons = document.querySelectorAll('.btn, .nav-link');
  
  buttons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    
    button.addEventListener('mouseleave', () => {
      button.style.transform = 'translate(0, 0)';
    });
  });
}

// Smooth reveal for hero elements
function heroReveal() {
  const heroTitle = document.querySelector('.hero-title');
  const heroSubtitle = document.querySelector('.hero-subtitle');
  const heroImage = document.querySelector('.hero-image');
  
  if (heroTitle) {
    setTimeout(() => {
      heroTitle.style.opacity = '1';
      heroTitle.style.transform = 'translateY(0)';
    }, 100);
  }
  
  if (heroSubtitle) {
    setTimeout(() => {
      heroSubtitle.style.opacity = '1';
      heroSubtitle.style.transform = 'translateY(0)';
    }, 300);
  }
  
  if (heroImage) {
    setTimeout(() => {
      heroImage.style.opacity = '1';
      heroImage.style.transform = 'scale(1)';
    }, 500);
  }
}

// Floating effect for skill categories
function addFloatingEffect() {
  const skills = document.querySelectorAll('.skill-category');
  
  skills.forEach((skill, index) => {
    const delay = index * 0.5;
    skill.style.animation = `float 3s ease-in-out ${delay}s infinite`;
  });
}

// Add shimmer effect on project cards
function addShimmerEffect() {
  const cards = document.querySelectorAll('.project-card, .blog-card');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      const shimmer = card.querySelector('::before');
      if (shimmer) {
        shimmer.style.left = '100%';
      }
    });
    
    card.addEventListener('mouseleave', () => {
      const shimmer = card.querySelector('::before');
      if (shimmer) {
        shimmer.style.left = '-100%';
      }
    });
  });
}

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
  if (!element) return;
  
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

// Initialize all animations
document.addEventListener('DOMContentLoaded', () => {
  // Run hero animations
  heroReveal();
  
  // Add magnetic effect to buttons
  setTimeout(() => addMagneticEffect(), 500);
  
  // Add floating effect
  setTimeout(() => addFloatingEffect(), 1000);
  
  // Initial scroll reveal check
  revealOnScroll();
  
  // About page specific animations
  if (document.querySelector('#quarto-content')) {
    initAboutPageAnimations();
  }
});

// Event listeners
window.addEventListener('scroll', () => {
  revealOnScroll();
  // parallaxEffect(); // Disabled per user preference
});

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Add page transition effect
window.addEventListener('beforeunload', () => {
  document.body.style.opacity = '0';
  document.body.style.transform = 'scale(0.98)';
});

// About page specific animations
function initAboutPageAnimations() {
  // Animate sections on scroll
  const sections = document.querySelectorAll('#quarto-content > section, #quarto-content > div');
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 100);
      }
    });
  }, observerOptions);
  
  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'all 0.6s ease-out';
    observer.observe(section);
  });
  
  // Add highlight effect to experience/education items
  const listItems = document.querySelectorAll('#quarto-content ul li');
  listItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-20px)';
    
    setTimeout(() => {
      item.style.transition = 'all 0.5s ease-out';
      item.style.opacity = '1';
      item.style.transform = 'translateX(0)';
    }, 300 + (index * 50));
  });
  
  // Add sparkle effect on skill hover
  const skills = document.querySelectorAll('#quarto-content strong');
  skills.forEach(skill => {
    skill.addEventListener('mouseenter', () => {
      createSparkle(skill);
    });
  });
  
  // Progress bar animation for sections
  animateProgressBars();
}

// Create sparkle effect
function createSparkle(element) {
  const sparkle = document.createElement('span');
  sparkle.textContent = '✨';
  sparkle.style.cssText = `
    position: absolute;
    font-size: 12px;
    pointer-events: none;
    animation: sparkleFloat 1s ease-out forwards;
    z-index: 100;
  `;
  
  const rect = element.getBoundingClientRect();
  sparkle.style.left = `${rect.left + rect.width / 2}px`;
  sparkle.style.top = `${rect.top}px`;
  
  document.body.appendChild(sparkle);
  
  setTimeout(() => sparkle.remove(), 1000);
}

// Animate progress bars (visual representation of experience/expertise)
function animateProgressBars() {
  const sections = document.querySelectorAll('#quarto-content h2');
  
  sections.forEach((section, index) => {
    // Skip the first h2 (Hi! I'm Chikire) to avoid overlapping with profile image
    if (index === 0) return;
    
    const bar = document.createElement('div');
    bar.style.cssText = `
      position: absolute;
      bottom: -5px;
      left: 0;
      height: 2px;
      width: 0;
      background: linear-gradient(90deg, #b88fb5, #c9a8c6);
      transition: width 1s ease-out;
    `;
    
    section.style.position = 'relative';
    section.appendChild(bar);
    
    setTimeout(() => {
      bar.style.width = '100%';
    }, 500 + (index * 200));
  });
}

// Cursor trail effect (subtle data particles)
let particles = [];
const maxParticles = 20;

document.addEventListener('mousemove', (e) => {
  if (particles.length < maxParticles && Math.random() > 0.9) {
    createParticle(e.clientX, e.clientY);
  }
});

function createParticle(x, y) {
  const particle = document.createElement('div');
  particle.style.cssText = `
    position: fixed;
    width: 4px;
    height: 4px;
    background: rgba(184, 143, 181, 0.6);
    border-radius: 50%;
    pointer-events: none;
    left: ${x}px;
    top: ${y}px;
    z-index: 9999;
    animation: particleFade 1s ease-out forwards;
  `;
  
  document.body.appendChild(particle);
  particles.push(particle);
  
  setTimeout(() => {
    particle.remove();
    particles = particles.filter(p => p !== particle);
  }, 1000);
}

// Add particle fade animation dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes particleFade {
    0% {
      opacity: 1;
      transform: translate(0, 0) scale(1);
    }
    100% {
      opacity: 0;
      transform: translate(0, 20px) scale(0);
    }
  }
  
  @keyframes sparkleFloat {
    0% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
    100% {
      opacity: 0;
      transform: translateY(-30px) scale(1.5);
    }
  }
`;
document.head.appendChild(style);
