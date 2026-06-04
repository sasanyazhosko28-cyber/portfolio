// ===== Cursor Glow Follower =====
const cursorGlow = document.getElementById('cursorGlow');

document.addEventListener('mousemove', (e) => {
  cursorGlow.style.left = e.clientX + 'px';
  cursorGlow.style.top = e.clientY + 'px';
});

document.addEventListener('mouseleave', () => {
  cursorGlow.style.opacity = '0';
});

document.addEventListener('mouseenter', () => {
  cursorGlow.style.opacity = '1';
});

// ===== Particles =====
const canvas = document.getElementById('particlesCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
let mouseX = -1000;
let mouseY = -1000;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.3;
    this.speedY = (Math.random() - 0.5) * 0.3;
    this.opacity = Math.random() * 0.4 + 0.1;
    this.hue = Math.random() > 0.5 ? 140 : 180;
  }

  update() {
    const dx = mouseX - this.x;
    const dy = mouseY - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 150) {
      const force = (150 - dist) / 150;
      this.x -= dx * force * 0.01;
      this.y -= dy * force * 0.01;
    }

    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
      this.reset();
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.hue === 140
      ? `rgba(0, 230, 118, ${this.opacity})`
      : `rgba(0, 188, 212, ${this.opacity * 0.7})`;
    ctx.fill();
  }
}

const particleCount = Math.min(80, Math.floor(window.innerWidth * 0.05));
for (let i = 0; i < particleCount; i++) {
  particles.push(new Particle());
}

function drawConnections() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 120) {
        const opacity = (1 - dist / 120) * 0.12;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(0, 230, 118, ${opacity})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  drawConnections();
  requestAnimationFrame(animateParticles);
}

animateParticles();

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// ===== Burger Menu =====
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

burger.addEventListener('click', () => {
  burger.classList.toggle('burger--active');
  nav.classList.toggle('nav--open');
  document.body.classList.toggle('no-scroll');
});

document.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('burger--active');
    nav.classList.remove('nav--open');
    document.body.classList.remove('no-scroll');
  });
});

// ===== Header Scroll Shadow =====
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  header.classList.toggle('header--scrolled', window.scrollY > 50);
});

// ===== Intersection Observer for Fade-In =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in--visible');
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

// Observe initial elements
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

document.querySelectorAll('.section, .hero, .about__stat, .interest-card, .timeline__item, .project-card, .skill-card').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// ===== Animated Counters =====
function animateCounters() {
  const counters = document.querySelectorAll('.about__stat-number');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const max = parseInt(target.dataset.count);
        let current = 0;
        const increment = Math.ceil(max / 60);
        const duration = 2000;
        const stepTime = duration / (max / increment);

        const timer = setInterval(() => {
          current += increment;
          if (current >= max) {
            target.textContent = max + '+';
            clearInterval(timer);
          } else {
            target.textContent = current;
          }
        }, stepTime);

        counterObserver.unobserve(target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));
}

animateCounters();

// ===== Parallax on Scroll =====
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const heroContent = hero.querySelector('.hero__content');
  const heroVisual = hero.querySelector('.hero__visual');

  if (heroContent && scrolled < window.innerHeight) {
    heroContent.style.setProperty('--parallax-y', `${scrolled * 0.05}px`);
  }
  if (heroVisual && scrolled < window.innerHeight) {
    heroVisual.style.setProperty('--parallax-y', `${scrolled * -0.05}px`);
  }
});

// ===== Smooth reveal for timeline items =====
document.querySelectorAll('.timeline__item').forEach((item, index) => {
  item.style.setProperty('--item-delay', `${index * 0.15}s`);
});

// ===== Theme Toggle =====
const themeToggle = document.getElementById('themeToggle');
let isDark = localStorage.getItem('theme') !== 'light';

function applyTheme() {
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  if (themeToggle) {
    themeToggle.textContent = isDark ? '☀️' : '🌙';
    themeToggle.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
  }
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    isDark = !isDark;
    applyTheme();
  });
}

applyTheme();

// ===== Modal System =====
const modalOverlay = document.getElementById('modalOverlay');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');

function openModal(html) {
  modalBody.innerHTML = html;
  modalOverlay.classList.add('modal--open');
  document.body.classList.add('no-scroll');
}

function closeModal() {
  modalOverlay.classList.remove('modal--open');
  document.body.classList.remove('no-scroll');
}

if (modalClose) {
  modalClose.addEventListener('click', closeModal);
}

if (modalOverlay) {
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// ===== Language Toggle =====
const langToggle = document.getElementById('langToggle');
let currentLang = localStorage.getItem('lang') || 'en';

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  document.documentElement.setAttribute('lang', lang);
  if (langToggle) {
    langToggle.textContent = lang === 'en' ? 'RU' : 'EN';
  }
  // Dispatch event for other scripts to react
  document.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
}

if (langToggle) {
  langToggle.addEventListener('click', () => {
    setLang(currentLang === 'en' ? 'ru' : 'en');
  });
}

// ===== Shared App Namespace =====
// Provides a single point of access for cross-file dependencies,
// eliminating fragile global variable coupling.
window.__app = {
  getLang: () => currentLang,
  openModal,
  closeModal,
  setLang,
  observeElement: (el) => observer.observe(el)
};

// ===== Init =====
// Initialize language AFTER the shared namespace is set up.
// This ensures projects.js can read currentLang via __app.getLang()
// when its DOMContentLoaded handler fires.
setLang(currentLang);