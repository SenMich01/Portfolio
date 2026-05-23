// ── NAV SCROLL EFFECT ──────────────────────────────────────
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

// ── BURGER / MOBILE MENU ───────────────────────────────────
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');
let menuOpen = false;

burger.addEventListener('click', () => {
  menuOpen = !menuOpen;
  mobileMenu.classList.toggle('open', menuOpen);
  document.body.style.overflow = menuOpen ? 'hidden' : '';

  const spans = burger.querySelectorAll('span');
  if (menuOpen) {
    spans[0].style.transform = 'translateY(7px) rotate(45deg)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    menuOpen = false;
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
    const spans = burger.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  });
});

// ── REVEAL ON SCROLL ───────────────────────────────────────
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger children within same parent
      const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal:not(.visible)'));
      const idx = siblings.indexOf(entry.target);
      const delay = Math.min(idx * 80, 320);

      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);

      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

revealEls.forEach(el => revealObserver.observe(el));

// ── ACTIVE NAV LINK ────────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => a.style.color = '');
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active && !active.classList.contains('nav-cta')) {
        active.style.color = '#e8a000';
      }
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

// ── HERO PARALLAX (subtle) ─────────────────────────────────
const heroGlow = document.querySelector('.hero-glow');
const heroBg = document.querySelector('.hero-bg-grid');

window.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;
  if (heroGlow) {
    heroGlow.style.transform = `translate(${x}px, ${y}px)`;
  }
  if (heroBg) {
    heroBg.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  }
}, { passive: true });

// ── SMOOTH OFFSET SCROLL (fixed nav) ──────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});
