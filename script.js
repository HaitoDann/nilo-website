(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var body = document.body;

  /* ---- Version dynamique depuis GitHub Releases ---- */
  fetch('https://api.github.com/repos/HaitoDann/Nilo-releases/releases/latest')
    .then(function (r) { return r.json(); })
    .then(function (data) {
      var tag = data.tag_name; // ex. "v0.16.0"
      if (!tag) return;
      var ver = tag.replace(/^v/, '');
      var base = 'https://github.com/HaitoDann/Nilo-releases/releases/download/' + tag + '/';
      var setup    = base + 'Nilo_' + ver + '_x64-setup.exe';
      var portable = base + 'Nilo_' + ver + '_x64_portable.exe';

      document.querySelectorAll('[data-dl="setup"]').forEach(function (el) { el.href = setup; });
      document.querySelectorAll('[data-dl="portable"]').forEach(function (el) { el.href = portable; });
      document.querySelectorAll('[data-dl-version]').forEach(function (el) {
        el.textContent = 'Version ' + ver + ' · Windows 10/11 · 64 bits';
      });
    })
    .catch(function () {
      // Fallback : les liens pointent déjà vers /releases/latest
      document.querySelectorAll('[data-dl-version]').forEach(function (el) {
        el.textContent = 'Windows 10/11 · 64 bits';
      });
    });

  /* ---- Menu mobile ---- */
  var toggle = document.querySelector('.nav-toggle');
  var links  = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---- Barre de navigation + bouton retour en haut (au scroll) ---- */
  var header = document.querySelector('.site-header');
  var toTop  = document.querySelector('.to-top');
  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (header) header.classList.toggle('scrolled', y > 40);
    if (toTop)  toTop.classList.toggle('show', y > 600);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (toTop) {
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    });
  }

  /* ---- Apparition au scroll (fade + slide) ---- */
  if (!reduce && 'IntersectionObserver' in window) {
    body.classList.add('js-reveal');

    var revealEls = Array.prototype.slice.call(document.querySelectorAll('.reveal'));

    document.querySelectorAll('[data-stagger]').forEach(function (group) {
      Array.prototype.slice.call(group.children).forEach(function (child, i) {
        child.classList.add('reveal');
        child.style.transitionDelay = (i * 70) + 'ms';
        revealEls.push(child);
      });
    });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ---- Vague animée : couper si mouvement réduit ---- */
  if (reduce) {
    var waveAnim = document.getElementById('waveAnim');
    if (waveAnim && waveAnim.parentNode) waveAnim.parentNode.removeChild(waveAnim);
  }

  /* ---- Année courante ---- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
