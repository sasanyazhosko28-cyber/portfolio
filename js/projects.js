// ===== State =====
let activeFilter = 'All';

// ===== Render Functions =====
function renderProjects(filter) {
  const grid = document.getElementById('projectsGrid');
  if (!grid) return;

  const lang = window.__app.getLang();
  const filtered = filter && filter !== 'All'
    ? projects.filter(p => p.category === filter)
    : projects;

  grid.innerHTML = filtered.map(project => `
    <div class="project-card fade-in" data-project-id="${project.id}">
      <h3 class="project-card__title">${project.title[lang]}</h3>
      <p class="project-card__desc">${project.desc[lang]}</p>
      <div class="project-card__tags">
        ${project.tags.map(tag => `<span class="project-card__tag">${tag}</span>`).join('')}
      </div>
      <div class="project-card__links">
        ${project.links.map(link => `<a href="${link.url}" target="_blank" rel="noopener" class="project-card__link">${link.label} →</a>`).join('')}
      </div>
      <button class="project-card__details-btn btn btn--ghost btn--small" data-project-id="${project.id}">
        ${i18n[lang].modalDetail} →
      </button>
    </div>
  `).join('');

  // Attach click listeners for detail buttons
  grid.querySelectorAll('.project-card__details-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.dataset.projectId;
      const project = projects.find(p => p.id === id);
      if (project) openProjectModal(project);
    });
  });

  // Attach click on whole card
  grid.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.dataset.projectId;
      const project = projects.find(p => p.id === id);
      if (project) openProjectModal(project);
    });
    card.style.cursor = 'pointer';
  });

  // Re-observe fade-in elements via shared observer
  grid.querySelectorAll('.fade-in').forEach(el => window.__app.observeElement(el));
}

function openProjectModal(project) {
  const lang = window.__app.getLang();
  const linksHtml = project.links.length > 0
    ? project.links.map(l => `<a href="${l.url}" target="_blank" rel="noopener" class="btn btn--primary btn--small">${l.label} →</a>`).join('')
    : `<span class="modal__no-links">${lang === 'en' ? 'No links yet' : 'Ссылок пока нет'}</span>`;

  const html = `
    <div class="modal__project">
      <h2 class="modal__project-title">${project.title[lang]}</h2>
      <div class="modal__project-tags">
        ${project.tags.map(tag => `<span class="project-card__tag">${tag}</span>`).join('')}
      </div>
      <p class="modal__project-desc">${project.detail[lang]}</p>
      <div class="modal__project-links">
        <h4>${i18n[lang].modalLinks}</h4>
        <div class="modal__project-links-list">${linksHtml}</div>
      </div>
    </div>
  `;
  window.__app.openModal(html);
}

function renderSkills() {
  const grid = document.getElementById('skillsGrid');
  if (!grid) return;

  const lang = window.__app.getLang();

  grid.innerHTML = skills.map(skill => `
    <div class="skill-card fade-in">
      <span class="skill-card__icon">${skill.icon}</span>
      <span class="skill-card__label">${skill.label[lang]}</span>
    </div>
  `).join('');

  grid.querySelectorAll('.fade-in').forEach(el => window.__app.observeElement(el));
}

function renderFilters() {
  const container = document.getElementById('projectsFilters');
  if (!container) return;

  const lang = window.__app.getLang();
  const categories = ['All', ...new Set(projects.map(p => p.category))];

  container.innerHTML = categories.map(cat => `
    <button class="filter-btn ${activeFilter === cat ? 'filter-btn--active' : ''}" data-filter="${cat}">
      ${i18n[lang]['filter' + cat] || cat}
    </button>
  `).join('');

  container.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      activeFilter = btn.dataset.filter;
      renderFilters();
      renderProjects(activeFilter);
    });
  });
}

function renderEducation() {
  const container = document.getElementById('educationGrid');
  if (!container) return;

  const lang = window.__app.getLang();

  container.innerHTML = education.map(item => `
    <div class="edu-card fade-in">
      <div class="edu-card__icon">${item.type === 'edu' ? '🎓' : '📜'}</div>
      <div class="edu-card__content">
        <h3 class="edu-card__title">${item.title[lang]}</h3>
        <p class="edu-card__desc">${item.desc[lang]}</p>
        <span class="edu-card__date">${item.date[lang]}</span>
      </div>
    </div>
  `).join('');

  container.querySelectorAll('.fade-in').forEach(el => window.__app.observeElement(el));
}

// ===== i18n UI Update =====
function updateUILanguage() {
  const lang = window.__app.getLang();
  const t = i18n[lang];

  // Nav
  const navLinks = document.querySelectorAll('.nav__link');
  const navItems = ['about', 'experience', 'projects', 'skills', 'contact'];
  navLinks.forEach((link, i) => {
    if (navItems[i]) link.textContent = t.nav[i];
  });

  // Hero
  document.querySelector('.hero__badge').innerHTML = `<span class="hero__badge-dot"></span>${t.heroBadge}`;
  document.querySelector('.hero__label').textContent = t.heroLabel;
  document.querySelector('.hero__desc').textContent = t.heroDesc;
  document.querySelector('.hero__actions .btn--primary').textContent = t.heroBtnWork;
  document.querySelector('.hero__actions .btn--ghost').textContent = t.heroBtnTalk;

  const statusItems = document.querySelectorAll('.hero__status-item span:last-child');
  if (statusItems[0]) statusItems[0].textContent = t.statusBeer;
  if (statusItems[1]) statusItems[1].textContent = t.statusAI;
  if (statusItems[2]) statusItems[2].textContent = t.statusPower;

  // About
  document.querySelectorAll('.section__number')[0].textContent = '01';
  document.querySelectorAll('.section__title')[0].textContent = t.aboutTitle;
  const aboutTexts = document.querySelectorAll('.about__text');
  if (aboutTexts[0]) aboutTexts[0].innerHTML = t.aboutP1;
  if (aboutTexts[1]) aboutTexts[1].innerHTML = t.aboutP2;
  if (aboutTexts[2]) aboutTexts[2].innerHTML = t.aboutP3;

  const statLabels = document.querySelectorAll('.about__stat-label');
  if (statLabels[0]) statLabels[0].textContent = t.statYears;
  if (statLabels[1]) statLabels[1].textContent = t.statProjects;
  if (statLabels[2]) statLabels[2].textContent = t.statBench;

  // Interests
  document.querySelectorAll('.section__number')[1].textContent = '02';
  document.querySelectorAll('.section__title')[1].textContent = t.interestsTitle;
  const interestTitles = document.querySelectorAll('.interest-card__title');
  const interestDescs = document.querySelectorAll('.interest-card__desc');
  if (interestTitles[0]) interestTitles[0].textContent = t.interest1Title;
  if (interestDescs[0]) interestDescs[0].textContent = t.interest1Desc;
  if (interestTitles[1]) interestTitles[1].textContent = t.interest2Title;
  if (interestDescs[1]) interestDescs[1].textContent = t.interest2Desc;
  if (interestTitles[2]) interestTitles[2].textContent = t.interest3Title;
  if (interestDescs[2]) interestDescs[2].textContent = t.interest3Desc;

  // Experience
  document.querySelectorAll('.section__number')[2].textContent = '03';
  document.querySelectorAll('.section__title')[2].textContent = t.expTitle;
  const expDates = document.querySelectorAll('.timeline__date');
  const expTitles = document.querySelectorAll('.timeline__title');
  const expDescs = document.querySelectorAll('.timeline__desc');
  if (expDates[0]) expDates[0].textContent = t.exp1Date;
  if (expTitles[0]) expTitles[0].textContent = t.exp1Title;
  if (expDescs[0]) expDescs[0].textContent = t.exp1Desc;
  if (expDates[1]) expDates[1].textContent = t.exp2Date;
  if (expTitles[1]) expTitles[1].textContent = t.exp2Title;
  if (expDescs[1]) expDescs[1].textContent = t.exp2Desc;
  if (expDates[2]) expDates[2].textContent = t.exp3Date;
  if (expTitles[2]) expTitles[2].textContent = t.exp3Title;
  if (expDescs[2]) expDescs[2].textContent = t.exp3Desc;

  // Projects
  document.querySelectorAll('.section__number')[3].textContent = '04';
  document.querySelectorAll('.section__title')[3].textContent = t.projectsTitle;
  document.querySelectorAll('.section__desc')[0].textContent = t.projectsDesc;

  // Skills
  document.querySelectorAll('.section__number')[4].textContent = '05';
  document.querySelectorAll('.section__title')[4].textContent = t.skillsTitle;
  document.querySelectorAll('.section__desc')[1].textContent = t.skillsDesc;

  // Education
  document.querySelectorAll('.section__number')[5].textContent = '06';
  document.querySelectorAll('.section__title')[5].textContent = t.educationTitle;

  // Contact
  document.querySelectorAll('.section__number')[6].textContent = '07';
  document.querySelectorAll('.section__title')[6].textContent = t.contactTitle;
  document.querySelectorAll('.section__desc')[2].innerHTML = t.contactDesc;
  document.querySelector('.contact__btn').textContent = t.contactBtn;

  // Footer
  const footerText = document.querySelector('.footer p');
  if (footerText) footerText.innerHTML = `© 2026 Maxim Tishin. ${t.footer} <span class="heart">♥</span> and 🍺`;

  // Re-render dynamic content
  renderFilters();
  renderProjects(activeFilter);
  renderSkills();
  renderEducation();
}

// ===== Listen for language changes =====
document.addEventListener('languageChanged', () => {
  updateUILanguage();
});

// ===== Init =====
document.addEventListener('DOMContentLoaded', () => {
  updateUILanguage();
});