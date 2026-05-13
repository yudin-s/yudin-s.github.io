(function () {
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

  document.addEventListener('DOMContentLoaded', bindPortfolioFilters);
  document.addEventListener('click', function (event) {
    if (event.target.closest && event.target.closest('.portfolio_filter')) {
      bindPortfolioFilters();
    }
  });

  new MutationObserver(bindPortfolioFilters).observe(document.documentElement, {
    childList: true,
    subtree: true
  });
}());
