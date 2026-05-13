(function () {
  var currentGallery = [];
  var currentIndex = 0;

  function applyFilter(filter) {
    var items = document.querySelectorAll('.portfolio_items .single_item');
    items.forEach(function (item) {
      item.style.display = filter === '*' || item.matches(filter) ? '' : 'none';
    });
  }

  function bindPortfolioFilters() {
    var filters = document.querySelectorAll('.portfolio_filter li');
    if (!filters.length) return;
    filters.forEach(function (filter) {
      if (filter.dataset.bound === 'true') return;
      filter.dataset.bound = 'true';
      filter.addEventListener('click', function () {
        filters.forEach(function (item) { item.classList.remove('select-cat'); });
        filter.classList.add('select-cat');
        applyFilter(filter.getAttribute('data-filter') || '*');
      });
      filter.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          filter.click();
        }
      });
    });
  }

  function getGalleryLinks(activeLink) {
    var links = Array.prototype.slice.call(document.querySelectorAll('.portfolio_items .single_item'))
      .filter(function (item) { return window.getComputedStyle(item).display !== 'none'; })
      .map(function (item) { return item.querySelector('.image-link'); })
      .filter(Boolean);

    if (!links.length) {
      links = Array.prototype.slice.call(document.querySelectorAll('.portfolio_items .image-link'));
    }

    if (activeLink && links.indexOf(activeLink) === -1) {
      links.unshift(activeLink);
    }

    return links;
  }

  function getLinkData(link) {
    var item = link.closest('.single_item');
    var img = item && item.querySelector('img');
    var title = item && item.querySelector('h3');
    return {
      src: link.getAttribute('href'),
      title: title ? title.textContent.trim() : '',
      alt: img ? img.getAttribute('alt') || '' : ''
    };
  }

  function renderLightbox() {
    var link = currentGallery[currentIndex];
    if (!link) return;

    var data = getLinkData(link);
    var modal = document.querySelector('.mfp-wrap.portfolio-lightbox');
    var img = modal && modal.querySelector('.mfp-img');
    var title = modal && modal.querySelector('.mfp-title');
    var counter = modal && modal.querySelector('.mfp-counter');

    if (!modal || !img || !title || !counter) return;

    img.src = data.src;
    img.alt = data.alt || data.title || 'Portfolio image';
    title.textContent = data.title;
    counter.textContent = (currentIndex + 1) + ' of ' + currentGallery.length;
  }

  function closeLightbox() {
    var wrap = document.querySelector('.mfp-wrap.portfolio-lightbox');
    var bg = document.querySelector('.mfp-bg.portfolio-lightbox');
    if (wrap) wrap.remove();
    if (bg) bg.remove();
    document.documentElement.classList.remove('mfp-ready');
    document.body.classList.remove('mfp-zoom-out-cur');
  }

  function moveLightbox(step) {
    if (!currentGallery.length) return;
    currentIndex = (currentIndex + step + currentGallery.length) % currentGallery.length;
    renderLightbox();
  }

  function openLightbox(link) {
    currentGallery = getGalleryLinks(link);
    currentIndex = Math.max(0, currentGallery.indexOf(link));
    closeLightbox();

    var bg = document.createElement('div');
    bg.className = 'mfp-bg portfolio-lightbox mfp-ready';

    var wrap = document.createElement('div');
    wrap.className = 'mfp-wrap portfolio-lightbox mfp-close-btn-in mfp-auto-cursor mfp-ready';
    wrap.setAttribute('tabindex', '-1');
    wrap.setAttribute('role', 'dialog');
    wrap.setAttribute('aria-modal', 'true');
    wrap.setAttribute('aria-label', 'Portfolio image preview');
    wrap.innerHTML = [
      '<div class="mfp-container mfp-image-holder mfp-s-ready">',
      '<div class="mfp-content">',
      '<div class="mfp-figure">',
      '<button title="Close (Esc)" type="button" class="mfp-close" aria-label="Close">x</button>',
      '<figure>',
      '<img class="mfp-img" src="" alt="">',
      '<figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption>',
      '</figure>',
      '</div>',
      '</div>',
      '<button title="Previous" type="button" class="mfp-arrow mfp-arrow-left" aria-label="Previous image"></button>',
      '<button title="Next" type="button" class="mfp-arrow mfp-arrow-right" aria-label="Next image"></button>',
      '</div>'
    ].join('');

    document.body.appendChild(bg);
    document.body.appendChild(wrap);
    document.documentElement.classList.add('mfp-ready');
    document.body.classList.add('mfp-zoom-out-cur');
    renderLightbox();
    wrap.focus();
  }

  function bindPortfolioImages() {
    document.querySelectorAll('.portfolio_items .work-inner img').forEach(function (img) {
      if (img.dataset.lightboxBound === 'true') return;
      img.dataset.lightboxBound = 'true';
      img.setAttribute('role', 'button');
      img.setAttribute('tabindex', '0');
      img.style.cursor = 'zoom-in';
      img.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          var link = img.closest('.work-inner').querySelector('.image-link');
          if (link) openLightbox(link);
        }
      });
    });
  }

  function bindPortfolioUi() {
    bindPortfolioFilters();
    bindPortfolioImages();
  }

  document.addEventListener('click', function (event) {
    if (!event.target.closest) return;

    var imageLink = event.target.closest('.image-link');
    var portfolioCard = event.target.closest('.portfolio_items .work-inner');
    if (imageLink || portfolioCard) {
      if (event.target.closest('.work-overlay .link')) return;
      var link = imageLink || portfolioCard.querySelector('.image-link');
      if (link) {
        event.preventDefault();
        openLightbox(link);
      }
      return;
    }

    if (event.target.closest('.mfp-close') || event.target.classList.contains('mfp-bg')) {
      event.preventDefault();
      closeLightbox();
      return;
    }

    if (event.target.closest('.mfp-arrow-left')) {
      event.preventDefault();
      moveLightbox(-1);
      return;
    }

    if (event.target.closest('.mfp-arrow-right')) {
      event.preventDefault();
      moveLightbox(1);
      return;
    }

    if (event.target.closest('.portfolio_filter')) {
      bindPortfolioUi();
    }
  });
  document.addEventListener('keydown', function (event) {
    if (!document.querySelector('.mfp-wrap.portfolio-lightbox')) return;
    if (event.key === 'Escape') closeLightbox();
    if (event.key === 'ArrowLeft') moveLightbox(-1);
    if (event.key === 'ArrowRight') moveLightbox(1);
  });

  document.addEventListener('DOMContentLoaded', bindPortfolioUi);

  new MutationObserver(bindPortfolioUi).observe(document.documentElement, {
    childList: true,
    subtree: true
  });
}());
