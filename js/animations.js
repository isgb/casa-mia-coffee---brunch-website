(function () {
  'use strict';

  var revealEls = document.querySelectorAll('[data-reveal]');

  if ('IntersectionObserver' in window && revealEls.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: '0px 0px -60px 0px' }
    );
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // Arrastre horizontal para carruseles (menú y galería social)
  document.querySelectorAll('[data-drag-scroll]').forEach(function (track) {
    var isDown = false;
    var startX = 0;
    var scrollStart = 0;

    function start(x) {
      isDown = true;
      startX = x;
      scrollStart = track.scrollLeft;
      track.classList.add('is-dragging');
    }
    function move(x) {
      if (!isDown) return;
      track.scrollLeft = scrollStart - (x - startX);
    }
    function end() {
      isDown = false;
      track.classList.remove('is-dragging');
    }

    track.addEventListener('mousedown', function (e) { start(e.pageX); });
    window.addEventListener('mouseup', end);
    window.addEventListener('mousemove', function (e) { move(e.pageX); });

    track.addEventListener('touchstart', function (e) { start(e.touches[0].pageX); }, { passive: true });
    track.addEventListener('touchend', end);
    track.addEventListener('touchmove', function (e) { move(e.touches[0].pageX); }, { passive: true });
  });
})();
