// =========================================================
// PORTOFOLIO — MAULIDTA YUWANDA FRONIKA
// Interaksi: menu mobile, reveal saat scroll, tahun footer
// =========================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Intro: efek transisi bom sebelum nama muncul ---------- */
  const introOverlay = document.getElementById('introOverlay');
  const heroIntro = document.querySelector('.hero-intro');
  const prefersReducedMotionEarly = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (introOverlay && !prefersReducedMotionEarly) {
    document.body.style.overflow = 'hidden';

    // Sebar partikel hati ke segala arah secara acak, masing-masing berputar saat terbang
    const burst = document.getElementById('bombBurst');
    const particleCount = 22;
    for (let i = 0; i < particleCount; i++) {
      const angle = (360 / particleCount) * i + (Math.random() * 12 - 6);
      const rad = (angle * Math.PI) / 180;
      const distance = 130 + Math.random() * 210;
      const px = Math.cos(rad) * distance;
      const py = Math.sin(rad) * distance;
      const rotate = (Math.random() > 0.5 ? 1 : -1) * (140 + Math.random() * 220);
      const size = 12 + Math.random() * 10;

      const particle = document.createElement('span');
      particle.className = 'bomb-particle';
      particle.style.setProperty('--px', `${px}px`);
      particle.style.setProperty('--py', `${py}px`);
      particle.style.setProperty('--pr', `${rotate}deg`);
      particle.style.fontSize = `${size}px`;
      particle.style.animationDuration = `${1.4 + Math.random() * 0.6}s`;
      particle.style.animationDelay = `${1.68 + Math.random() * 0.1}s`;
      burst.appendChild(particle);
    }

    // Kepulan asap yang mengembang & naik perlahan setelah ledakan
    const smokeLayer = document.getElementById('bombSmokeLayer');
    const smokeCount = 12;
    for (let i = 0; i < smokeCount; i++) {
      const sx = (Math.random() * 160 - 80); // pergeseran horizontal acak
      const sy = -(150 + Math.random() * 190); // naik ke atas
      const sscale = 2.4 + Math.random() * 1.8;
      const duration = 2.4 + Math.random() * 1.1;
      const delay = 1.72 + Math.random() * 0.22;

      const smoke = document.createElement('span');
      smoke.className = 'bomb-smoke';
      smoke.style.setProperty('--sx', `${sx}px`);
      smoke.style.setProperty('--sy', `${sy}px`);
      smoke.style.setProperty('--sscale', sscale.toFixed(2));
      smoke.style.animationDuration = `${duration}s`;
      smoke.style.animationDelay = `${delay}s`;
      smokeLayer.appendChild(smoke);
    }

    // Getaran layar singkat tepat saat ledakan terjadi
    setTimeout(() => {
      introOverlay.classList.add('shake');
      setTimeout(() => introOverlay.classList.remove('shake'), 600);
    }, 1680);

    const FUSE_MS = 1700;   // durasi bom "berdetak" (slow-motion) sebelum meledak
    const REVEAL_DELAY = FUSE_MS + 550;  // nama muncul di tengah kepulan asap & hati yang beterbangan
    const FADE_START = FUSE_MS + 1450;   // overlay mulai memudar, beri waktu efek terlihat penuh
    const CLEANUP_MS = FADE_START + 950; // overlay benar-benar dilepas dari halaman

    setTimeout(() => {
      if (heroIntro) heroIntro.classList.add('is-in');
    }, REVEAL_DELAY);

    setTimeout(() => {
      introOverlay.classList.add('intro-hide');
      document.body.style.overflow = '';
    }, FADE_START);

    setTimeout(() => {
      introOverlay.remove();
    }, CLEANUP_MS);
  } else if (introOverlay) {
    // Hormati preferensi "reduce motion": langsung tampilkan tanpa animasi bom
    introOverlay.remove();
    if (heroIntro) heroIntro.classList.add('is-in');
  }

  /* ---------- Tahun footer otomatis ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Toggle menu mobile ---------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('is-open');
    });

    // Tutup menu saat salah satu link ditekan (untuk mobile)
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('is-open');
      });
    });
  }

  /* ---------- Animasi reveal saat elemen masuk layar ---------- */
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -60px 0px'
    });

    revealEls.forEach((el, i) => {
      // Sedikit jeda bertahap agar transisi terasa lebih halus
      el.style.transitionDelay = `${Math.min(i % 4, 3) * 0.08}s`;
      observer.observe(el);
    });
  } else {
    // Fallback bila IntersectionObserver tidak tersedia
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  /* ---------- Navbar: bayangan halus saat discroll ---------- */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const onScroll = () => {
      if (window.scrollY > 20) {
        navbar.style.boxShadow = '0 8px 24px -18px rgba(178, 51, 104, 0.4)';
      } else {
        navbar.style.boxShadow = 'none';
      }
      // Tutup menu mobile secara otomatis begitu halaman mulai digulir,
      // supaya dropdown tidak "menempel" di layar (perbaikan bug Safari iOS)
      if (navLinks && navLinks.classList.contains('is-open')) {
        navLinks.classList.remove('is-open');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Efek hujan glitter & bintang kecil ---------- */
  const glitterLayer = document.getElementById('glitterLayer');
  if (glitterLayer && !prefersReducedMotion) {
    const glitterChars = ['✦', '✧', '⋆', '·', '✩'];

    const spawnGlitter = () => {
      const piece = document.createElement('span');
      piece.className = 'glitter-piece';
      piece.textContent = glitterChars[Math.floor(Math.random() * glitterChars.length)];

      const startX = Math.random() * 100; // posisi horizontal (%)
      const size = 0.6 + Math.random() * 1.2; // rem
      const duration = 6 + Math.random() * 7; // detik
      const drift = (Math.random() - 0.5) * 120; // px pergeseran horizontal

      piece.style.left = `${startX}%`;
      piece.style.fontSize = `${size}rem`;
      piece.style.setProperty('--drift', `${drift}px`);
      piece.style.animationDuration = `${duration}s`;

      glitterLayer.appendChild(piece);

      // Bersihkan elemen setelah animasi selesai agar DOM tetap ringan
      piece.addEventListener('animationend', () => piece.remove());
    };

    // Munculkan glitter secara berkala
    setInterval(spawnGlitter, 400);
    // Isi awal agar layar tidak kosong saat halaman pertama dimuat
    for (let i = 0; i < 12; i++) {
      setTimeout(spawnGlitter, i * 150);
    }
  }

  /* ---------- Efek cursor glitch pink menyala ---------- */
  const supportsFineCursor = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  if (supportsFineCursor && !prefersReducedMotion) {
    let lastSpawn = 0;
    const spawnInterval = 35; // ms, jaga performa

    window.addEventListener('mousemove', (e) => {
      const now = performance.now();
      if (now - lastSpawn < spawnInterval) return;
      lastSpawn = now;

      const dot = document.createElement('span');
      dot.className = 'cursor-glitch';
      dot.style.setProperty('--x', `${e.clientX}px`);
      dot.style.setProperty('--y', `${e.clientY}px`);
      dot.style.setProperty('--gx', `${4 + Math.random() * 6}px`);
      dot.style.setProperty('--gy', `${4 + Math.random() * 6}px`);

      document.body.appendChild(dot);
      dot.addEventListener('animationend', () => dot.remove());
    }, { passive: true });
  }

  /* ---------- Form kontak: kirim via aplikasi email pengunjung (mailto) ---------- */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    const GMAIL_TUJUAN = 'maulidtayuwandafronika@gmail.com';

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nama = document.getElementById('senderName').value.trim();
      const emailPengirim = document.getElementById('senderEmail').value.trim();
      const pesan = document.getElementById('senderMessage').value.trim();

      if (!nama || !emailPengirim || !pesan) return;

      const subjek = `Pesan dari Portofolio — ${nama}`;
      const isi =
        `Nama: ${nama}\n` +
        `Email: ${emailPengirim}\n\n` +
        `Pesan:\n${pesan}`;

      const mailtoLink =
        `mailto:${GMAIL_TUJUAN}` +
        `?subject=${encodeURIComponent(subjek)}` +
        `&body=${encodeURIComponent(isi)}`;

      // Membuka aplikasi/klien email default pengunjung dengan isi yang sudah terisi
      window.location.href = mailtoLink;
    });
  }

});
