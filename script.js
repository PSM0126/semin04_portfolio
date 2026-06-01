// ===========================
// Navigation
// ===========================
const navbar = document.getElementById('navbar');
const navLinks = document.getElementById('navLinks');
const hamburger = document.getElementById('hamburger');
const allNavLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  updateActiveLink();
});

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.addEventListener('click', (e) => {
  if (e.target.classList.contains('nav-link')) {
    navLinks.classList.remove('open');
  }
});

function updateActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPos = window.scrollY + 100;

  sections.forEach(section => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-link[href="#${id}"]`);

    if (link) {
      if (scrollPos >= top && scrollPos < bottom) {
        allNavLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
}

// ===========================
// Smooth scroll for all anchors
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===========================
// Intersection Observer - Fade-up animations
// ===========================
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

function observeFadeElements() {
  const elements = document.querySelectorAll(
    '.about-card, .timeline-item, .skill-category, .project-card, .exp-item, .career-card, .contact-card, .resume-download'
  );

  elements.forEach((el, index) => {
    el.classList.add('fade-up');
    el.style.transitionDelay = `${(index % 4) * 80}ms`;
    fadeObserver.observe(el);
  });
}

// ===========================
// Skill bar animation
// ===========================
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fills = entry.target.querySelectorAll('.skill-fill');
      fills.forEach(fill => {
        setTimeout(() => {
          fill.classList.add('animated');
        }, 200);
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

function observeSkills() {
  const skillSection = document.getElementById('skills');
  if (skillSection) {
    skillObserver.observe(skillSection);
  }
}

// ===========================
// Typing animation for hero badge
// ===========================
function typingEffect() {
  const badge = document.querySelector('.hero-badge');
  if (!badge) return;

  const text = badge.textContent.trim();
  badge.style.opacity = '1';
}

// ===========================
// Parallax for hero blobs
// ===========================
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const blob1 = document.querySelector('.blob1');
  const blob2 = document.querySelector('.blob2');

  if (blob1) blob1.style.transform = `translateY(${scrolled * 0.15}px)`;
  if (blob2) blob2.style.transform = `translateY(${-scrolled * 0.1}px)`;
});

// ===========================
// Mouse glow effect on glass cards
// ===========================
document.querySelectorAll('.glass-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(99,102,241,0.06), rgba(255,255,255,0.03))`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.background = '';
  });
});

// ===========================
// Counter animation for hero stats
// ===========================
function animateCounter(el, target, suffix = '') {
  const isText = isNaN(parseInt(target));
  if (isText) return;

  const num = parseInt(target);
  const duration = 1000;
  const start = performance.now();

  const tick = (now) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * num);
    el.textContent = current + suffix;
    if (progress < 1) requestAnimationFrame(tick);
    else el.textContent = target + suffix;
  };
  requestAnimationFrame(tick);
}

// ===========================
// Init
// ===========================
document.addEventListener('DOMContentLoaded', () => {
  observeFadeElements();
  observeSkills();
  typingEffect();

  // Animate stats on load
  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        heroObserver.disconnect();
      }
    });
  });

  const hero = document.querySelector('.hero');
  if (hero) heroObserver.observe(hero);

  // Add glass-card mouse effect to dynamically added cards
  document.querySelectorAll('.glass-card').forEach(card => {
    if (!card._glowAttached) {
      card._glowAttached = true;
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(99,102,241,0.07), rgba(255,255,255,0.03))`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.background = '';
      });
    }
  });

  console.log('%c🚀 Portfolio by Semin', 'color: #6366f1; font-size: 16px; font-weight: bold;');
});
