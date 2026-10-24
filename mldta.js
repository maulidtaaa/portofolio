/* ORBITA interaction layer. All content is sourced from portfolio-data.js. */
(() => {
  'use strict';

  const DATA = window.ORBITA_DATA;
  if (!DATA) {
    console.error('ORBITA_DATA belum dimuat. Pastikan portfolio-data.js dimuat sebelum mldta.js.');
    return;
  }

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
  const html = document.documentElement;
  const body = document.body;
  const state = {
    theme: 'night',
    activePlanet: null,
    activeCertificateIndex: 0,
    introTimer: null,
    toastTimer: null,
    scrollTicking: false,
    starFrame: null,
    starLastTime: 0,
    stars: [],
    starWidth: 0,
    starHeight: 0,
    starDpr: 1,
    certificateExpanded: false
  };

  const escapeHTML = (value = '') => String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

  const safeURL = (value = '') => {
    const url = String(value).trim();
    if (!url) return '';
    if (/^(https?:\/\/|mailto:)/i.test(url)) return url;
    return '';
  };

  function showToast(message) {
    const toast = $('#toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('is-visible');
    window.clearTimeout(state.toastTimer);
    state.toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 2600);
  }

  function setTheme(theme, persist = true) {
    const nextTheme = theme === 'morning' ? 'morning' : 'night';
    state.theme = nextTheme;
    html.dataset.theme = nextTheme;
    const button = $('#themeToggle');
    if (button) {
      const morningAction = nextTheme === 'night';
      const label = morningAction ? 'Beralih ke tema pagi' : 'Beralih ke tema malam';
      button.setAttribute('aria-label', label);
      button.setAttribute('title', label);
    }
    const themeColor = $('meta[name="theme-color"]');
    if (themeColor) themeColor.setAttribute('content', nextTheme === 'night' ? '#080b17' : '#edf7f8');
    if (persist) {
      try { localStorage.setItem('orbita-theme', nextTheme); } catch (_) { /* storage mungkin diblokir */ }
    }
  }

  function initTheme() {
    let savedTheme = 'night';
    try {
      const candidate = localStorage.getItem('orbita-theme');
      if (candidate === 'morning' || candidate === 'night') savedTheme = candidate;
    } catch (_) { /* tema malam menjadi default sesi ini */ }
    setTheme(savedTheme, false);
    $('#themeToggle')?.addEventListener('click', () => {
      setTheme(state.theme === 'night' ? 'morning' : 'night');
      showToast(state.theme === 'night' ? 'Tema Night Galaxy aktif.' : 'Tema Morning Earth aktif.');
    });
  }

  function closeIntro() {
    const intro = $('#intro');
    if (!intro || intro.hidden) return;
    window.clearTimeout(state.introTimer);
    intro.classList.add('is-leaving');
    try { sessionStorage.setItem('orbita-intro-seen', '1'); } catch (_) { /* tidak mengganggu navigasi */ }
    window.setTimeout(() => {
      intro.hidden = true;
      intro.classList.remove('is-leaving');
    }, reducedMotionQuery.matches ? 20 : 650);
  }

  function initIntro() {
    const intro = $('#intro');
    if (!intro) return;
    let seen = false;
    try { seen = sessionStorage.getItem('orbita-intro-seen') === '1'; } catch (_) { seen = true; }
    if (!seen && !reducedMotionQuery.matches) {
      intro.hidden = false;
      state.introTimer = window.setTimeout(closeIntro, 2400);
    }
    $('#launchIntro')?.addEventListener('click', closeIntro);
    $('#skipIntro')?.addEventListener('click', closeIntro);
  }

  function initMobileNav() {
    const button = $('#menuToggle');
    const nav = $('#mainNav');
    if (!button || !nav) return;

    const closeMenu = () => {
      nav.classList.remove('is-open');
      button.setAttribute('aria-expanded', 'false');
      button.setAttribute('aria-label', 'Buka menu');
      body.classList.remove('menu-open');
    };
    const openMenu = () => {
      nav.classList.add('is-open');
      button.setAttribute('aria-expanded', 'true');
      button.setAttribute('aria-label', 'Tutup menu');
      body.classList.add('menu-open');
    };

    button.addEventListener('click', () => {
      if (button.getAttribute('aria-expanded') === 'true') closeMenu();
      else openMenu();
    });
    $$('.nav-link', nav).forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('click', event => {
      if (button.getAttribute('aria-expanded') !== 'true') return;
      if (!nav.contains(event.target) && !button.contains(event.target)) closeMenu();
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 850) closeMenu();
    }, { passive: true });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') closeMenu();
    });
  }

  function renderSkills() {
    const root = $('#skillsGrid');
    if (!root) return;
    root.innerHTML = DATA.skills.map((skill, index) => `
      <article class="skill-card reveal" data-delay="${index % 4}" style="--skill-glow:${index === 1 ? 'rgba(171, 141, 255, .18)' : index === 2 ? 'rgba(246, 169, 138, .18)' : index === 3 ? 'rgba(191, 227, 123, .15)' : 'rgba(111, 215, 246, .18)'}">
        <div class="skill-card__top"><span class="skill-card__number">CAP / ${escapeHTML(skill.number)}</span><span class="skill-card__icon" aria-hidden="true">${escapeHTML(skill.icon)}</span></div>
        <span class="skill-card__subtitle">${escapeHTML(skill.subtitle)}</span>
        <h3>${escapeHTML(skill.title)}</h3>
        <p>${escapeHTML(skill.description)}</p>
        <div class="skill-card__tags">${skill.skills.map(tag => `<span class="skill-tag">${escapeHTML(tag)}</span>`).join('')}</div>
      </article>`).join('');
  }

  function renderEducation() {
    const root = $('#educationTimeline');
    if (!root) return;
    root.innerHTML = DATA.education.map((item, index) => `
      <article class="education-item reveal" data-delay="${index % 3}">
        <span class="education-item__dot" aria-hidden="true"></span>
        <div><span class="education-item__period">${escapeHTML(item.period)}</span><p class="education-item__stage">${escapeHTML(item.stage)}</p></div>
        <div><h3>${escapeHTML(item.title)}</h3><p class="education-item__program">${escapeHTML(item.program)}</p><p class="education-item__description">${escapeHTML(item.description)}</p><span class="education-item__status ${item.status === 'NOW' ? 'education-item__status--now' : ''}">${escapeHTML(item.status === 'NOW' ? 'CURRENT ORBIT' : 'COMPLETED')}</span></div>
      </article>`).join('');
  }

  function projectArtwork(project) {
    if (project.image) {
      return `<img class="project-card__image" src="${escapeHTML(project.image)}" alt="${escapeHTML(project.imageAlt || project.title)}" loading="lazy">`;
    }
    return `<div class="project-art ${escapeHTML(project.imageStyle)}" role="img" aria-label="${escapeHTML(project.imageAlt || project.title)}"></div>`;
  }

  function renderProjects() {
    const root = $('#projectsGrid');
    if (!root) return;
    root.innerHTML = DATA.projects.map((project, index) => {
      const placeholder = project.state === 'placeholder';
      const link = safeURL(project.url);
      const buttonLabel = placeholder ? 'Siapkan proyek' : 'Detail proyek';
      return `
        <article class="project-card ${placeholder ? 'project-card--placeholder' : ''} reveal" data-delay="${index % 3}">
          <div class="project-card__visual ${escapeHTML(project.imageStyle || '')}">
            ${projectArtwork(project)}
            <div class="project-card__topline"><span class="project-card__number">PROJECT / ${escapeHTML(project.number)}</span><span class="project-card__state">${placeholder ? 'RESERVED SLOT' : escapeHTML(project.year)}</span></div>
          </div>
          <div class="project-card__body">
            <p class="project-card__category">${escapeHTML(project.type)}</p>
            <h3>${escapeHTML(project.title)}</h3>
            <p class="project-card__description">${escapeHTML(project.cardText)}</p>
            <div class="project-card__stack">${project.stack.map(tag => `<span>${escapeHTML(tag)}</span>`).join('')}</div>
            <div class="project-card__footer"><small>${placeholder ? 'CONTENT IN PROGRESS' : escapeHTML(project.role.toUpperCase())}</small>
              <div class="project-card__actions"><button class="project-card__action" type="button" data-project-detail="${escapeHTML(project.id)}">${buttonLabel} <span aria-hidden="true">↗</span></button>${link ? `<a class="project-card__action" href="${escapeHTML(link)}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHTML(project.urlLabel)}: ${escapeHTML(project.title)}">${escapeHTML(project.urlLabel)} <span aria-hidden="true">↗</span></a>` : ''}</div>
            </div>
          </div>
        </article>`;
    }).join('');
    root.addEventListener('click', event => {
      const button = event.target.closest('[data-project-detail]');
      if (!button) return;
      openProjectDialog(button.dataset.projectDetail, button);
    });
  }

  function renderExperiences() {
    const root = $('#experienceGrid');
    if (!root) return;
    const experiences = DATA.experiences.slice(0, 5);
    root.innerHTML = experiences.map((item, index) => `
      <article class="experience-card reveal" data-delay="${index % 3}">
        <div class="experience-card__image-wrap"><img class="experience-card__image" src="${escapeHTML(item.image)}" alt="${escapeHTML(item.imageAlt)}" loading="lazy"><span class="experience-card__id">EXP / ${String(index + 1).padStart(2, '0')}</span></div>
        <div class="experience-card__body"><p class="experience-card__type">${escapeHTML(item.type)}</p><h3>${escapeHTML(item.title)}</h3><p class="experience-card__period">${escapeHTML(item.period)}</p><p class="experience-card__description">${escapeHTML(item.description)}</p><div class="experience-card__tags">${item.tags.map(tag => `<span>${escapeHTML(tag)}</span>`).join('')}</div></div>
      </article>`).join('');
    const count = $('#experienceCount');
    if (count) count.textContent = String(experiences.length).padStart(2, '0');
  }

  function certificateButtonMarkup(item, index, extraClass = '') {
    return `<button class="certificate-card ${extraClass}" type="button" data-certificate-index="${index}" aria-label="Lihat ${escapeHTML(item.title)} ukuran penuh">
      <span class="certificate-card__image-wrap"><img class="certificate-card__image" src="${escapeHTML(item.image)}" alt="${escapeHTML(item.imageAlt)}" loading="lazy"></span>
      <span class="certificate-card__body"><span class="certificate-card__category">${escapeHTML(item.category.toUpperCase())}</span><strong>${escapeHTML(item.title)}</strong><small>${escapeHTML(item.date)}</small></span>
    </button>`;
  }

  function renderCertificates() {
    const featureRoot = $('#certificateFeature');
    const galleryRoot = $('#certificateGallery');
    if (!featureRoot || !galleryRoot) return;
    const featureIndex = DATA.certificates.findIndex(item => item.id === 'cert-10');
    const feature = DATA.certificates[featureIndex >= 0 ? featureIndex : 0];
    const index = featureIndex >= 0 ? featureIndex : 0;
    featureRoot.innerHTML = `
      <button class="certificate-feature__image-wrap" type="button" data-certificate-index="${index}" aria-label="Buka ${escapeHTML(feature.title)} ukuran penuh"><img class="certificate-feature__image" src="${escapeHTML(feature.image)}" alt="${escapeHTML(feature.imageAlt)}" loading="lazy"></button>
      <div class="certificate-feature__content"><p class="eyebrow">FEATURED DOCUMENT / ${escapeHTML(feature.category.toUpperCase())}</p><h3>${escapeHTML(feature.title)}</h3><p class="certificate-feature__issuer">${escapeHTML(feature.issuer)}</p><p class="certificate-feature__date">${escapeHTML(feature.date)}</p><p class="certificate-feature__desc">Salah satu catatan dari perjalanan belajar dan kegiatan inovasi. Pilih dokumen untuk melihat gambar aslinya dengan lebih jelas.</p><button class="certificate-feature__open" type="button" data-certificate-index="${index}">Buka dokumen <span aria-hidden="true">↗</span></button></div>`;

    const remaining = DATA.certificates.map((item, i) => ({ item, i })).filter(entry => entry.i !== index);
    galleryRoot.innerHTML = remaining.map((entry, visibleIndex) => {
      const hidden = visibleIndex >= 8;
      return certificateButtonMarkup(entry.item, entry.i, hidden ? 'certificate-card--extra' : '')
        .replace('<button ', `<button ${hidden ? 'hidden ' : ''}`);
    }).join('');
    const counter = $('#certificateCount');
    if (counter) counter.textContent = String(DATA.certificates.length).padStart(2, '0');
    if (galleryRoot.querySelectorAll('.certificate-card').length + 1 !== DATA.certificates.length) {
      console.warn('Pemeriksaan jumlah sertifikat: pastikan setiap objek data dirender satu kali di galeri dan satu kali sebagai fitur unggulan.');
    }

    const showMoreButton = $('#showAllCertificates');
    if (showMoreButton) showMoreButton.addEventListener('click', () => {
      state.certificateExpanded = !state.certificateExpanded;
      $$('.certificate-card--extra', galleryRoot).forEach(card => { card.hidden = !state.certificateExpanded; });
      showMoreButton.innerHTML = state.certificateExpanded ? 'Tampilkan lebih sedikit <span aria-hidden="true">↑</span>' : 'Lihat semua dokumen <span aria-hidden="true">↗</span>';
      if (state.certificateExpanded) showToast('Seluruh dokumen ditampilkan.');
    });
    $('#openAllAchievements')?.addEventListener('click', () => {
      state.certificateExpanded = true;
      $$('.certificate-card--extra', galleryRoot).forEach(card => { card.hidden = false; });
      if (showMoreButton) showMoreButton.innerHTML = 'Tampilkan lebih sedikit <span aria-hidden="true">↑</span>';
      galleryRoot.scrollIntoView({ behavior: reducedMotionQuery.matches ? 'auto' : 'smooth', block: 'start' });
    });

    const openFromGallery = event => {
      const button = event.target.closest('[data-certificate-index]');
      if (!button) return;
      openLightbox(Number(button.dataset.certificateIndex), button);
    };
    featureRoot.addEventListener('click', openFromGallery);
    galleryRoot.addEventListener('click', openFromGallery);
  }

  function openLightbox(index, opener) {
    const dialog = $('#lightbox');
    if (!dialog || !DATA.certificates.length) return;
    state.activeCertificateIndex = (index + DATA.certificates.length) % DATA.certificates.length;
    dialog.dataset.returnFocus = opener ? 'yes' : 'no';
    updateLightbox();
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open', '');
    $('#closeLightbox')?.focus();
  }

  function updateLightbox() {
    const item = DATA.certificates[state.activeCertificateIndex];
    if (!item) return;
    const image = $('#lightboxImage');
    image.src = item.image;
    image.alt = item.imageAlt;
    $('#lightboxTitle').textContent = item.title;
    $('#lightboxDescription').textContent = `${item.issuer} · ${item.date}`;
    $('#lightboxCounter').textContent = `ARCHIVE / ${String(state.activeCertificateIndex + 1).padStart(2, '0')} OF ${String(DATA.certificates.length).padStart(2, '0')}`;
  }

  function stepLightbox(direction) {
    state.activeCertificateIndex = (state.activeCertificateIndex + direction + DATA.certificates.length) % DATA.certificates.length;
    updateLightbox();
  }

  function closeLightbox() {
    const dialog = $('#lightbox');
    if (!dialog) return;
    if (typeof dialog.close === 'function' && dialog.open) dialog.close();
    else dialog.removeAttribute('open');
  }

  function initLightbox() {
    $('#closeLightbox')?.addEventListener('click', closeLightbox);
    $('#previousImage')?.addEventListener('click', () => stepLightbox(-1));
    $('#nextImage')?.addEventListener('click', () => stepLightbox(1));
    $('#lightbox')?.addEventListener('click', event => {
      if (event.target === event.currentTarget) closeLightbox();
    });
    $('#lightbox')?.addEventListener('close', () => {
      const active = document.activeElement;
      if (active && active.id !== 'lightbox') return;
      const candidate = $(`[data-certificate-index="${state.activeCertificateIndex}"]`);
      candidate?.focus({ preventScroll: true });
    });
    document.addEventListener('keydown', event => {
      const dialog = $('#lightbox');
      if (!dialog?.open) return;
      if (event.key === 'ArrowRight') { event.preventDefault(); stepLightbox(1); }
      if (event.key === 'ArrowLeft') { event.preventDefault(); stepLightbox(-1); }
    });
  }

  function openProjectDialog(projectId, opener) {
    const project = DATA.projects.find(item => item.id === projectId);
    const dialog = $('#projectDialog');
    if (!project || !dialog) return;
    $('#projectDialogCategory').textContent = `PROJECT CASE FILE / ${project.number}`;
    $('#projectDialogTitle').textContent = project.title;
    $('#projectDialogDescription').textContent = project.description;
    $('#projectDialogRole').textContent = project.role;
    $('#projectDialogStack').textContent = project.stack.join(' · ');
    const actionRoot = $('#projectDialogActions');
    const url = safeURL(project.url);
    actionRoot.innerHTML = url
      ? `<a class="button button--primary" href="${escapeHTML(url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(project.urlLabel || 'Buka proyek')} <span aria-hidden="true">↗</span></a><button class="button button--ghost" type="button" data-dialog-close> Kembali ke portofolio </button>`
      : `<button class="button button--primary" type="button" data-dialog-close>Siap diisi nanti <span aria-hidden="true">↗</span></button>`;
    dialog.dataset.opener = opener ? 'project' : '';
    dialog._returnTo = opener || null;
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open', '');
    $('#closeProjectDialog')?.focus();
  }

  function closeProjectDialog() {
    const dialog = $('#projectDialog');
    if (!dialog) return;
    const opener = dialog._returnTo;
    if (typeof dialog.close === 'function' && dialog.open) dialog.close();
    else dialog.removeAttribute('open');
    opener?.focus({ preventScroll: true });
  }

  function initProjectDialog() {
    $('#closeProjectDialog')?.addEventListener('click', closeProjectDialog);
    $('#projectDialogActions')?.addEventListener('click', event => {
      if (event.target.closest('[data-dialog-close]')) closeProjectDialog();
    });
    $('#projectDialog')?.addEventListener('click', event => {
      if (event.target === event.currentTarget) closeProjectDialog();
    });
  }

  function initPlanetNavigation() {
    const panel = $('#planetPortal');
    const closeButton = $('#closePlanetPortal');
    let lastPlanetButton = null;

    function closePanel(returnFocus = false) {
      if (!panel || panel.hidden) return;
      panel.hidden = true;
      $$('.planet-node').forEach(button => button.classList.remove('is-selected'));
      if (returnFocus) lastPlanetButton?.focus({ preventScroll: true });
      state.activePlanet = null;
    }

    function showPlanet(planet, button) {
      if (!panel || !planet) return;
      state.activePlanet = planet.id;
      lastPlanetButton = button;
      $$('.planet-node').forEach(node => {
        const active = node.dataset.planet === planet.id;
        node.classList.toggle('is-selected', active);
        node.setAttribute('aria-pressed', String(active));
      });
      $('#portalKicker').textContent = `ORBIT ${planet.number} / ${planet.category}`;
      $('#portalTitle').textContent = planet.name;
      $('#portalDescription').textContent = planet.summary;
      const portalLink = $('#portalLink');
      portalLink.href = `#${planet.section}`;
      portalLink.innerHTML = `Buka bagian <span aria-hidden="true">↗</span>`;
      panel.hidden = false;
      closeButton?.focus({ preventScroll: true });
      panel.querySelector('a')?.addEventListener('click', () => closePanel(false), { once: true });
    }

    $$('.planet-node').forEach(button => {
      button.setAttribute('aria-pressed', 'false');
      button.addEventListener('click', () => {
        const planet = DATA.planets.find(item => item.id === button.dataset.planet);
        if (state.activePlanet === button.dataset.planet && panel && !panel.hidden) {
          closePanel();
          return;
        }
        showPlanet(planet, button);
      });
    });
    closeButton?.addEventListener('click', () => closePanel(true));
    $$('#planetIndexGrid [data-planet-link]').forEach(link => {
      link.addEventListener('click', () => {
        const planet = DATA.planets.find(item => item.id === link.dataset.planetLink);
        $$('.planet-node').forEach(node => {
          const active = node.dataset.planet === link.dataset.planetLink;
          node.classList.toggle('is-selected', active);
          node.setAttribute('aria-pressed', String(active));
        });
        state.activePlanet = planet?.id || null;
      });
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && panel && !panel.hidden) closePanel(true);
    });
  }

  async function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    let copied = false;
    try { copied = document.execCommand('copy'); } catch (_) { copied = false; }
    textarea.remove();
    return copied;
  }

  function initCopyEmail() {
    $('#copyEmail')?.addEventListener('click', async () => {
      const feedback = $('#copyFeedback');
      try {
        const copied = await copyText(DATA.profile.email);
        if (copied) {
          if (feedback) feedback.textContent = 'Alamat email berhasil disalin.';
          showToast('Alamat email tersalin.');
        } else {
          if (feedback) feedback.textContent = `Salin manual: ${DATA.profile.email}`;
          showToast('Clipboard tidak tersedia. Alamat email ditampilkan di bawah tombol.');
        }
      } catch (_) {
        if (feedback) feedback.textContent = `Salin manual: ${DATA.profile.email}`;
        showToast('Clipboard tidak tersedia. Silakan salin alamat email secara manual.');
      }
    });
  }

  function initScrollProgress() {
    const bar = $('#scrollProgressBar');
    if (!bar) return;
    const update = () => {
      state.scrollTicking = false;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const percent = scrollable > 0 ? Math.min(100, Math.max(0, (window.scrollY / scrollable) * 100)) : 0;
      bar.style.width = `${percent}%`;
    };
    const requestUpdate = () => {
      if (!state.scrollTicking) {
        state.scrollTicking = true;
        window.requestAnimationFrame(update);
      }
    };
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate, { passive: true });
    update();
  }

  function initScrollReveal() {
    const revealItems = $$('.reveal');
    if (!('IntersectionObserver' in window) || reducedMotionQuery.matches) {
      revealItems.forEach(item => item.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { root: null, rootMargin: '0px 0px -7% 0px', threshold: 0.05 });
    revealItems.forEach(item => observer.observe(item));
  }

  function initActiveNavigation() {
    const navLinks = $$('.nav-link');
    const sectionIds = navLinks.map(link => link.getAttribute('href')).filter(href => href && href.startsWith('#'));
    const sections = sectionIds.map(id => $(id)).filter(Boolean);
    if (!('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      navLinks.forEach(link => link.classList.toggle('is-active', link.getAttribute('href') === `#${visible.target.id}`));
    }, { rootMargin: '-30% 0px -55% 0px', threshold: [0, .1, .25, .5] });
    sections.forEach(section => observer.observe(section));
  }

  function initPointerParallax() {
    const visual = $('#solarSystem');
    const heroVisual = $('.hero__visual');
    if (!visual || !heroVisual || !finePointerQuery.matches || reducedMotionQuery.matches) return;
    let raf = null;
    let latest = null;
    heroVisual.addEventListener('pointermove', event => {
      const rect = heroVisual.getBoundingClientRect();
      latest = {
        x: ((event.clientX - rect.left) / rect.width - .5) * -7,
        y: ((event.clientY - rect.top) / rect.height - .5) * -7
      };
      if (raf !== null) return;
      raf = requestAnimationFrame(() => {
        if (latest) {
          visual.style.setProperty('--parallax-x', `${latest.x.toFixed(2)}px`);
          visual.style.setProperty('--parallax-y', `${latest.y.toFixed(2)}px`);
        }
        raf = null;
      });
    }, { passive: true });
    heroVisual.addEventListener('pointerleave', () => {
      visual.style.setProperty('--parallax-x', '0px');
      visual.style.setProperty('--parallax-y', '0px');
    }, { passive: true });
  }

  function resizeStarfield() {
    const canvas = $('#starfield');
    if (!canvas) return;
    state.starDpr = Math.min(window.devicePixelRatio || 1, window.innerWidth < 600 ? 1.25 : 1.6);
    state.starWidth = window.innerWidth;
    state.starHeight = window.innerHeight;
    canvas.width = Math.floor(state.starWidth * state.starDpr);
    canvas.height = Math.floor(state.starHeight * state.starDpr);
    canvas.style.width = `${state.starWidth}px`;
    canvas.style.height = `${state.starHeight}px`;
    const context = canvas.getContext('2d');
    if (!context) return;
    context.setTransform(state.starDpr, 0, 0, state.starDpr, 0, 0);
    const areaFactor = Math.max(.55, Math.min(1.1, (state.starWidth * state.starHeight) / (1440 * 900)));
    const amount = Math.round((state.starWidth < 600 ? 65 : 105) * areaFactor);
    state.stars = Array.from({ length: amount }, () => ({
      x: Math.random() * state.starWidth,
      y: Math.random() * state.starHeight,
      r: Math.random() * 1.15 + .22,
      alpha: Math.random() * .5 + .16,
      twinkle: Math.random() * 1.5 + .25,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * .45 + .08
    }));
    drawStars(0, true);
  }

  function drawStars(delta, staticOnly = false) {
    const canvas = $('#starfield');
    const context = canvas?.getContext('2d');
    if (!context) return;
    context.clearRect(0, 0, state.starWidth, state.starHeight);
    state.stars.forEach(star => {
      if (!staticOnly && !reducedMotionQuery.matches && !document.hidden) {
        star.phase += delta * .0007 * star.twinkle;
        star.y += star.speed * delta * .002;
        if (star.y > state.starHeight + 2) {
          star.y = -2;
          star.x = Math.random() * state.starWidth;
        }
      }
      const alpha = star.alpha * (.7 + Math.sin(star.phase) * .3);
      context.beginPath();
      context.fillStyle = `rgba(195, 222, 255, ${alpha})`;
      context.arc(star.x, star.y, star.r, 0, Math.PI * 2);
      context.fill();
    });
  }

  function animateStars(time) {
    if (document.hidden || reducedMotionQuery.matches) {
      state.starFrame = null;
      drawStars(0, true);
      return;
    }
    const delta = state.starLastTime ? Math.min(60, time - state.starLastTime) : 16;
    state.starLastTime = time;
    drawStars(delta);
    state.starFrame = requestAnimationFrame(animateStars);
  }

  function initStarfield() {
    const canvas = $('#starfield');
    if (!canvas || !canvas.getContext) return;
    try {
      resizeStarfield();
      if (!reducedMotionQuery.matches) state.starFrame = requestAnimationFrame(animateStars);
      window.addEventListener('resize', () => {
        resizeStarfield();
        if (!reducedMotionQuery.matches && !document.hidden && state.starFrame === null) {
          state.starLastTime = 0;
          state.starFrame = requestAnimationFrame(animateStars);
        }
      }, { passive: true });
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          if (state.starFrame !== null) cancelAnimationFrame(state.starFrame);
          state.starFrame = null;
        } else if (!reducedMotionQuery.matches && state.starFrame === null) {
          state.starLastTime = 0;
          state.starFrame = requestAnimationFrame(animateStars);
        }
      });
      reducedMotionQuery.addEventListener?.('change', event => {
        if (event.matches) {
          if (state.starFrame !== null) cancelAnimationFrame(state.starFrame);
          state.starFrame = null;
          drawStars(0, true);
        } else if (!document.hidden && state.starFrame === null) {
          state.starLastTime = 0;
          state.starFrame = requestAnimationFrame(animateStars);
        }
      });
    } catch (error) {
      // Starfield bersifat dekoratif. Jika canvas gagal, latar CSS tetap digunakan.
      canvas.hidden = true;
      console.warn('Starfield tidak tersedia:', error);
    }
  }

  function initImageFallbacks() {
    document.addEventListener('error', event => {
      const image = event.target;
      if (!(image instanceof HTMLImageElement) || image.dataset.fallbackApplied === 'true') return;
      image.dataset.fallbackApplied = 'true';
      image.classList.add('image-unavailable');
      image.alt = image.alt ? `${image.alt} (gambar tidak tersedia)` : 'Gambar tidak tersedia';
      if (image.classList.contains('certificate-feature__image')) {
        image.closest('.certificate-feature__image-wrap')?.classList.add('is-image-unavailable');
      }
    }, true);
  }

  function initGlobalEscape() {
    document.addEventListener('keydown', event => {
      if (event.key !== 'Escape') return;
      const panel = $('#planetPortal');
      if (panel && !panel.hidden) {
        panel.hidden = true;
        $$('.planet-node').forEach(button => button.classList.remove('is-selected'));
        state.activePlanet = null;
      }
    });
  }

  function initFooterYear() {
    const year = $('#currentYear');
    if (year) year.textContent = String(new Date().getFullYear());
  }

  function init() {
    body.classList.add('js-ready');
    initTheme();
    initIntro();
    initMobileNav();
    renderSkills();
    renderEducation();
    renderProjects();
    renderExperiences();
    renderCertificates();
    initLightbox();
    initProjectDialog();
    initPlanetNavigation();
    initCopyEmail();
    initScrollProgress();
    initScrollReveal();
    initActiveNavigation();
    initPointerParallax();
    initStarfield();
    initImageFallbacks();
    initGlobalEscape();
    initFooterYear();

    // Pemeriksaan invariant penting saat pengembangan.
    if (DATA.planets.length !== 8) console.error(`PRD meminta 8 planet, tetapi data menemukan ${DATA.planets.length}.`);
    if (DATA.experiences.length !== 5) console.error(`PRD meminta tepat 5 pengalaman, tetapi data menemukan ${DATA.experiences.length}.`);
    if (DATA.certificates.length !== 13) console.warn(`PRD sumber berisi 13 dokumen. Data saat ini berjumlah ${DATA.certificates.length}.`);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
