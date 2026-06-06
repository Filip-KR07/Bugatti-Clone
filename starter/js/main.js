/* ============================================
   STARTER JS
   A single strict-mode IIFE. State is driven by
   CSS classes toggled from here. Behaviours:
   1. Header scroll effect (.scrolled)
   2. Mobile menu toggle (.open)
   3. Scroll reveal via IntersectionObserver (.visible)
   4. Smooth anchor scrolling with header offset
   ============================================ */
(() => {
  'use strict';

  /* --- 1. Header scroll effect --- */
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* --- 2. Mobile menu toggle --- */
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(open));
    });
  }

  /* --- 3. Scroll reveal --- */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach((el) => io.observe(el));
  } else {
    // No IO support → just show everything
    revealEls.forEach((el) => el.classList.add('visible'));
  }

  /* --- 4. Smooth anchor scrolling with header offset --- */
  const headerH = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue('--header-h'),
    10
  ) || 0;
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (id === '#' || id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - headerH;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();
