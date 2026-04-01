/* ===================================================
   HEMALATHA GUTHURTHI — PORTFOLIO JAVASCRIPT
=================================================== */

// ============================================================
// 1. CUSTOM CURSOR
// ============================================================
const cursor       = document.getElementById('cursor');
const cursorFollow = document.getElementById('cursor-follower');

let mouseX = 0, mouseY = 0;
let followX = 0, followY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

// Smooth follower with requestAnimationFrame
function animateFollower() {
  followX += (mouseX - followX) * 0.12;
  followY += (mouseY - followY) * 0.12;
  cursorFollow.style.left = followX + 'px';
  cursorFollow.style.top  = followY + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

// Hovering state
const hoverTargets = document.querySelectorAll(
  'a, button, .tech-item, .project-card, .social-icon, .social-btn, .btn, input, textarea, .timeline-content'
);
hoverTargets.forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('hovering');
    cursorFollow.classList.add('hovering');
  });
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('hovering');
    cursorFollow.classList.remove('hovering');
  });
});

// Hide cursor on mobile
if ('ontouchstart' in window) {
  cursor.style.display = 'none';
  cursorFollow.style.display = 'none';
}

// ============================================================
// 2. NAVBAR — Scroll & Active Link
// ============================================================
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  // Scrolled class
  navbar.classList.toggle('scrolled', window.scrollY > 50);

  // Scroll-to-top visibility
  const scrollBtn = document.getElementById('scroll-top');
  scrollBtn.classList.toggle('visible', window.scrollY > 400);

  // Active nav link
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
});

// ============================================================
// 3. HAMBURGER MENU
// ============================================================
const hamburger = document.getElementById('hamburger');
const navLinksContainer = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinksContainer.classList.toggle('open');
  hamburger.classList.toggle('open');
});

// Close mobile menu on link click
navLinksContainer.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinksContainer.classList.remove('open');
    hamburger.classList.remove('open');
  });
});

// ============================================================
// 4. TYPING EFFECT
// ============================================================
const typedEl = document.getElementById('typed-text');
const phrases = [
  'Software Developer',
  'Java Web Developer',
  'Machine Learning Enthusiast',
  'Full Stack Developer',
  'Problem Solver'
];
let phraseIndex = 0;
let charIndex   = 0;
let isDeleting  = false;
let typingSpeed = 90;

function typeEffect() {
  const currentPhrase = phrases[phraseIndex];

  if (isDeleting) {
    typedEl.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedEl.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === currentPhrase.length) {
    isDeleting = true;
    typingSpeed = 1800; // Pause at end
  } else if (isDeleting && charIndex === 0) {
    isDeleting  = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    typingSpeed = 300; // Pause before new phrase
  } else {
    typingSpeed = isDeleting ? 45 : 90;
  }

  setTimeout(typeEffect, typingSpeed);
}
typeEffect();

// ============================================================
// 5. HERO PARTICLES
// ============================================================
const particleContainer = document.getElementById('hero-particles');
const PARTICLE_COUNT = 50;

for (let i = 0; i < PARTICLE_COUNT; i++) {
  const p = document.createElement('div');
  p.className = 'particle';

  const size = Math.random() * 3 + 1;
  const posX = Math.random() * 100;
  const duration = Math.random() * 15 + 10;
  const delay = Math.random() * 15;
  const opacity = Math.random() * 0.6 + 0.2;
  const isBlue = Math.random() > 0.5;

  p.style.cssText = `
    width:${size}px; height:${size}px;
    left:${posX}%;
    bottom:${Math.random() * 20}%;
    animation-duration:${duration}s;
    animation-delay:-${delay}s;
    opacity:${opacity};
    background:${isBlue ? 'var(--accent-blue)' : 'var(--accent-purple)'};
    box-shadow:0 0 4px ${isBlue ? 'var(--accent-blue)' : 'var(--accent-purple)'};
  `;
  particleContainer.appendChild(p);
}

// ============================================================
// 6. SCROLL REVEAL — Intersection Observer
// ============================================================
const revealEls = document.querySelectorAll(
  '.glass-card, .section-header, .tech-item, .project-card, .timeline-item, .reveal'
);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Stagger children if needed
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

revealEls.forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// ============================================================
// 7. SKILL BAR ANIMATION
// ============================================================
const skillFills = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fill   = entry.target;
      const target = fill.getAttribute('data-width');
      fill.style.width = target + '%';
      skillObserver.unobserve(fill);
    }
  });
}, { threshold: 0.2 });

skillFills.forEach(fill => skillObserver.observe(fill));

// ============================================================
// 8. TIMELINE REVEAL
// ============================================================
const timelineItems = document.querySelectorAll('.timeline-item');

const timelineObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      timelineObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

timelineItems.forEach(item => timelineObserver.observe(item));

// ============================================================
// 9. CONTACT FORM
// ============================================================
const contactForm = document.getElementById('contact-form');
const submitBtn   = document.getElementById('submit-btn');
const successMsg  = document.getElementById('form-success');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Loading state
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  submitBtn.disabled = true;

  // Simulate async (replace with actual fetch/EmailJS)
  setTimeout(() => {
    submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
    submitBtn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
    successMsg.classList.add('visible');
    contactForm.reset();

    setTimeout(() => {
      submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
      submitBtn.style.background = '';
      submitBtn.disabled = false;
      successMsg.classList.remove('visible');
    }, 4000);
  }, 1800);
});

// ============================================================
// 10. SCROLL TO TOP BUTTON
// ============================================================
document.getElementById('scroll-top').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ============================================================
// 11. SMOOTH SCROLL for nav links
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 72; // navbar height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ============================================================
// 12. PARALLAX HERO BG GRID
// ============================================================
const heroBgGrid = document.querySelector('.hero-bg-grid');
window.addEventListener('mousemove', (e) => {
  if (heroBgGrid) {
    const x = (e.clientX / window.innerWidth - 0.5) * 12;
    const y = (e.clientY / window.innerHeight - 0.5) * 12;
    heroBgGrid.style.transform = `translate(${x}px, ${y}px)`;
  }
});

// ============================================================
// 13. NAVBAR STAGGER (entrance animation)
// ============================================================
window.addEventListener('load', () => {
  document.querySelectorAll('.nav-link').forEach((link, i) => {
    link.style.animationDelay = `${i * 0.1}s`;
  });
});
