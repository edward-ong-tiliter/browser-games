  // Filter + search
  const searchInput = document.getElementById('search');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const gameCards = document.querySelectorAll('.game-card');
  let activeFilter = 'all';

  function applyFilters() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    gameCards.forEach(card => {
      const text = card.textContent.toLowerCase();
      const category = card.closest('.category-section');
      const catType = category ? category.dataset.category : '';
      
      const matchesSearch = searchTerm === '' || text.includes(searchTerm);
      const matchesFilter = activeFilter === 'all' || catType === activeFilter;
      
      card.classList.toggle('hidden', !(matchesSearch && matchesFilter));
    });

    // Show/hide category sections based on visible children
    document.querySelectorAll('.category-section').forEach(section => {
      const visible = Array.from(section.querySelectorAll('.game-card')).some(c => !c.classList.contains('hidden'));
      section.style.display = visible ? '' : 'none';
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.dataset.filter;
      applyFilters();
    });
  });

  searchInput.addEventListener('input', applyFilters);

  // Quick pick cards scroll to game
  document.querySelectorAll('.qp-card').forEach(card => {
    card.addEventListener('click', () => {
      const target = document.getElementById(card.dataset.target);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        target.style.borderColor = 'var(--accent)';
        setTimeout(() => target.style.borderColor = '', 2000);
      }
    });
  });

  // Category collapse/expand
  window.toggleCategory = function(header) {
    const section = header.closest('.category-section');
    section.classList.toggle('collapsed');
    header.classList.toggle('collapsed');
  };

  // Scroll-to-top button
  const scrollBtn = document.getElementById('scrollTop');
  window.addEventListener('scroll', () => {
    scrollBtn.classList.toggle('show', window.scrollY > 400);
  });

  // Apply filters on load
  applyFilters();
