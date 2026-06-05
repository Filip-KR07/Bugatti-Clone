// ============================================
//  BUGATTI CLONE — INTERACTIONS
// ============================================

(() => {
  'use strict';

  // ---- HEADER SCROLL EFFECT ----
  const header = document.getElementById('siteHeader');
  const onScroll = () => {
    if (window.scrollY > 60) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---- FULLSCREEN MENU ----
  const menuToggle  = document.getElementById('menuToggle');
  const menuClose   = document.getElementById('menuClose');
  const menuOverlay = document.getElementById('menuOverlay');

  const openMenu = () => {
    menuOverlay.classList.add('open');
    menuOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };
  const closeMenu = () => {
    menuOverlay.classList.remove('open');
    menuOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  menuToggle.addEventListener('click', openMenu);
  menuClose.addEventListener('click', closeMenu);
  menuOverlay.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
  });

  // ---- SCROLL-REVEAL ANIMATIONS ----
  const reveals = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

  reveals.forEach(el => io.observe(el));

  // ---- SMOOTH ANCHOR LINKS (already covered by CSS scroll-behavior, but add offset) ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target || this.getAttribute('href') === '#') return;
      e.preventDefault();
      const headerH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h'), 10) || 72;
      window.scrollTo({
        top: target.offsetTop - headerH,
        behavior: 'smooth'
      });
    });
  });

  // ---- PARALLAX HERO BG (gentle) ----
  const heroBg = document.querySelector('.hero-fkp .hero-bg');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y < window.innerHeight) {
        heroBg.style.transform = `translateY(${y * 0.3}px) scale(${1 + y * 0.0002})`;
      }
    }, { passive: true });
  }

  // ---- SHOP: add-to-cart counter ----
  const cartCount = document.querySelector('.cart-count');
  if (cartCount) {
    let count = 0;
    document.querySelectorAll('.btn-cart').forEach(btn => {
      btn.addEventListener('click', () => {
        count += 1;
        cartCount.textContent = count;
        btn.textContent = 'Hinzugefügt ✓';
        setTimeout(() => { btn.textContent = 'In den Warenkorb'; }, 1200);
      });
    });
  }

  // ---- SHOP: category chip active state ----
  const chips = document.querySelectorAll('.shop-chip');
  chips.forEach(chip => {
    chip.addEventListener('click', e => {
      e.preventDefault();
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
    });
  });

})();
