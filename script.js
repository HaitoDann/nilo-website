(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var body = document.body;

  /* ---- Écran d'intro (clic sur le logo pour entrer) ---- */
  var intro = document.getElementById('intro');
  if (intro) {
    body.classList.add('intro-open');
    var introLogo = intro.querySelector('.intro-logo');
    var ripple = intro.querySelector('.intro-ripple');
    var entered = false;

    var enter = function () {
      if (entered) return;
      entered = true;
      if (introLogo) introLogo.classList.add('press');
      if (ripple) { ripple.classList.remove('go'); void ripple.offsetWidth; ripple.classList.add('go'); }
      var wait = reduce ? 0 : 360;
      setTimeout(function () {
        intro.classList.add('hide');
        body.classList.remove('intro-open');
        setTimeout(function () {
          if (intro && intro.parentNode) intro.parentNode.removeChild(intro);
        }, reduce ? 0 : 650);
      }, wait);
    };

    if (introLogo) introLogo.addEventListener('click', enter);
  }

  /* ---- Menu mobile ---- */
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
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
  var toTop = document.querySelector('.to-top');
  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (header) header.classList.toggle('scrolled', y > 40);
    if (toTop) toTop.classList.toggle('show', y > 600);
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

    // Effet en cascade sur les groupes marqués [data-stagger]
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

  /* ---- Année courante ---- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
