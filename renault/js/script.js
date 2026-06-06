// ============================================
//  AUTOHAUS S+K — INTERACTIONS
// ============================================

(() => {
  'use strict';

  // ---- HEADER SCROLL EFFECT ----
  const header = document.getElementById('siteHeader');
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
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
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

  // ---- SCROLL-REVEAL ----
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.10, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // ---- SMOOTH ANCHOR SCROLL ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const id = this.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const headerH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h'), 10) || 72;
      window.scrollTo({ top: target.offsetTop - headerH, behavior: 'smooth' });
    });
  });

  // ---- PARALLAX HERO ----
  const heroBg = document.querySelector('.hero-main .hero-bg');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y < window.innerHeight) {
        heroBg.style.transform = `translateY(${y * 0.28}px) scale(${1 + y * 0.0002})`;
      }
    }, { passive: true });
  }

  // ---- FINANZIERUNGSRECHNER ----
  const preisEl      = document.getElementById('preis');
  const anzahlungEl  = document.getElementById('anzahlung');
  const zinsEl       = document.getElementById('zins');
  const preisOut     = document.getElementById('preisOut');
  const anzahlungOut = document.getElementById('anzahlungOut');
  const zinsOut      = document.getElementById('zinsOut');
  const calcRate     = document.getElementById('calcRate');
  const calcDetail   = document.getElementById('calcDetail');
  const laufzeitBtns = document.getElementById('laufzeitBtns');

  if (preisEl && calcRate) {
    let laufzeit = 36;

    const fmt = n => n.toLocaleString('de-DE') + ' €';
    const fmtPct = v => v.toFixed(1).replace('.', ',') + ' %';

    const calcMonthlyRate = (principal, annualRate, months) => {
      if (principal <= 0) return 0;
      const r = annualRate / 100 / 12;
      if (r === 0) return principal / months;
      return principal * (r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
    };

    const update = () => {
      const preis     = +preisEl.value;
      const anzahlung = +anzahlungEl.value;
      const zins      = +zinsEl.value;
      const principal = Math.max(0, preis - anzahlung);
      const rate      = calcMonthlyRate(principal, zins, laufzeit);

      preisOut.textContent     = fmt(preis);
      anzahlungOut.textContent = fmt(anzahlung);
      zinsOut.textContent      = fmtPct(zins);

      calcRate.textContent   = Math.round(rate).toLocaleString('de-DE') + ' €';
      calcDetail.textContent =
        `Finanzierungsbetrag: ${fmt(principal)} · ${laufzeit} Monate · ${fmtPct(zins)} p.a.`;
    };

    [preisEl, anzahlungEl, zinsEl].forEach(el => el.addEventListener('input', update));

    laufzeitBtns.querySelectorAll('.laufzeit-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        laufzeitBtns.querySelectorAll('.laufzeit-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        laufzeit = +btn.dataset.months;
        update();
      });
    });

    update();
  }

  // ---- PROBEFAHRT-FORMULAR ----
  // Formspree: nach Registrierung auf formspree.io die eigene Form-ID hier eintragen
  const FORMSPREE_ID = 'YOUR_FORM_ID';

  const form = document.getElementById('probefahrtForm');
  const formSuccess = document.getElementById('formSuccess');

  if (form) {
    const required = ['vorname', 'nachname', 'email', 'modell'];

    const validateField = id => {
      const el = document.getElementById(id);
      const valid = el.value.trim() !== '' && (id !== 'email' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value));
      el.classList.toggle('error', !valid);
      return valid;
    };

    required.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('blur', () => validateField(id));
    });

    form.addEventListener('submit', async e => {
      e.preventDefault();
      const allValid = required.every(id => validateField(id));
      if (!allValid) return;

      const btn = form.querySelector('[type="submit"]');
      btn.textContent = 'WIRD GESENDET …';
      btn.disabled = true;
      formSuccess.textContent = '';
      formSuccess.style.color = '';

      const useFormspree = FORMSPREE_ID !== 'YOUR_FORM_ID';

      try {
        if (useFormspree) {
          const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
            method: 'POST',
            body: new FormData(form),
            headers: { 'Accept': 'application/json' }
          });
          if (!res.ok) throw new Error('send_failed');
        } else {
          await new Promise(r => setTimeout(r, 900));
        }

        form.reset();
        formSuccess.textContent = '✓ Anfrage gesendet! Wir melden uns innerhalb von 24 Stunden.';
        setTimeout(() => { formSuccess.textContent = ''; }, 7000);
      } catch {
        formSuccess.style.color = '#e55';
        formSuccess.textContent = '⚠ Fehler beim Senden. Bitte rufen Sie uns an: +49 40 7679596-0';
      } finally {
        btn.textContent = 'TERMIN ANFRAGEN';
        btn.disabled = false;
      }
    });
  }

})();
