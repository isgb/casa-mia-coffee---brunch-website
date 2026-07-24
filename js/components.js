(function () {
  'use strict';

  // Acordeón — horario / preguntas frecuentes
  document.querySelectorAll('[data-accordion]').forEach(function (accordion) {
    var items = accordion.querySelectorAll('.accordion-item');
    items.forEach(function (item) {
      var trigger = item.querySelector('.accordion-trigger');
      if (!trigger) return;
      trigger.addEventListener('click', function () {
        var isOpen = item.classList.contains('is-open');
        items.forEach(function (other) { other.classList.remove('is-open'); });
        if (!isOpen) item.classList.add('is-open');
      });
    });
  });

  // Lightbox de galería
  var gallery = document.querySelector('[data-lightbox-gallery]');
  var lightbox = document.getElementById('galleryLightbox');
  if (gallery && lightbox) {
    var items = Array.prototype.slice.call(gallery.querySelectorAll('.gallery-item'));
    var lightboxImg = lightbox.querySelector('.lightbox-img');
    var closeBtn = lightbox.querySelector('.lightbox-close');
    var prevBtn = lightbox.querySelector('.lightbox-prev');
    var nextBtn = lightbox.querySelector('.lightbox-next');
    var currentIndex = -1;
    var lastTrigger = null;

    function showImage(index) {
      var img = items[index].querySelector('img');
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      currentIndex = index;
    }

    function openLightbox(index, trigger) {
      lastTrigger = trigger;
      showImage(index);
      lightbox.classList.add('is-open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.classList.add('lightbox-open');
      closeBtn.focus();
    }

    function closeLightbox() {
      lightbox.classList.remove('is-open');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('lightbox-open');
      if (lastTrigger) lastTrigger.focus();
    }

    function showNext() { showImage((currentIndex + 1) % items.length); }
    function showPrev() { showImage((currentIndex - 1 + items.length) % items.length); }

    items.forEach(function (item, index) {
      item.addEventListener('click', function () { openLightbox(index, item); });
    });

    closeBtn.addEventListener('click', closeLightbox);
    nextBtn.addEventListener('click', showNext);
    prevBtn.addEventListener('click', showPrev);

    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', function (e) {
      if (!lightbox.classList.contains('is-open')) return;
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowRight') showNext();
      else if (e.key === 'ArrowLeft') showPrev();
    });
  }

  // Formulario de contacto — validación simple sin backend conectado
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var status = form.querySelector('.form-status');
      var required = form.querySelectorAll('[required]');
      var valid = true;
      required.forEach(function (field) {
        if (!field.value.trim()) valid = false;
      });
      if (!status) return;
      if (valid) {
        status.textContent = 'Gracias por escribirnos. Te responderemos muy pronto por correo o Instagram.';
        status.classList.add('is-success');
        form.reset();
      } else {
        status.textContent = 'Por favor completa los campos obligatorios antes de enviar.';
        status.classList.remove('is-success');
      }
    });
  }
})();
