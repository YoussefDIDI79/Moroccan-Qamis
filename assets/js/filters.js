const filters = {
  category: 'all',
  priceRange: [0, 300],
  size: 'all',
  color: 'all',
  sortBy: 'featured',

  apply(productsList) {
    let filtered = [...productsList];

    // Category filter
    if (this.category !== 'all') {
      filtered = filtered.filter(p => p.category === this.category);
    }

    // Price filter
    filtered = filtered.filter(p => 
      p.price >= this.priceRange[0] && p.price <= this.priceRange[1]
    );

    // Size filter
    if (this.size !== 'all') {
      filtered = filtered.filter(p => p.sizes.includes(this.size));
    }

    // Color filter
    if (this.color !== 'all') {
      filtered = filtered.filter(p => p.colors.includes(this.color));
    }

    // Sort
    switch (this.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => {
          const nameA = typeof a.name === 'object' ? a.name.en : a.name;
          const nameB = typeof b.name === 'object' ? b.name.en : b.name;
          return nameA.localeCompare(nameB);
        });
        break;
      case 'featured':
      default:
        filtered.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return 0;
        });
    }

    return filtered;
  },

  reset() {
    this.category = 'all';
    this.priceRange = [0, 300];
    this.size = 'all';
    this.color = 'all';
    this.sortBy = 'featured';
    
    // Reset UI
    const categoryBtns = document.querySelectorAll('.category-filter');
    categoryBtns.forEach(btn => btn.classList.remove('active'));
    document.querySelector('[data-category="all"]')?.classList.add('active');
    
    const priceSlider = document.querySelector('#price-range');
    if (priceSlider) priceSlider.value = 300;
    
    const sizeSelect = document.querySelector('#size-filter');
    if (sizeSelect) sizeSelect.value = 'all';
    
    const colorSelect = document.querySelector('#color-filter');
    if (colorSelect) colorSelect.value = 'all';
    
    const sortSelect = document.querySelector('#sort-select');
    if (sortSelect) sortSelect.value = 'featured';
  },

  init() {
    // Category filters
    document.querySelectorAll('.category-filter').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.category-filter').forEach(b => 
          b.classList.remove('active')
        );
        e.currentTarget.classList.add('active');
        this.category = e.currentTarget.dataset.category;
        renderProducts();
      });
    });

    // Price range
    const priceSlider = document.querySelector('#price-range');
    const priceValue = document.querySelector('#price-value');
    if (priceSlider) {
      priceSlider.addEventListener('input', (e) => {
        const value = parseInt(e.target.value);
        this.priceRange = [0, value];
        if (priceValue) priceValue.textContent = `$0 - $${value}`;
        renderProducts();
      });
    }

    // Size filter
    const sizeSelect = document.querySelector('#size-filter');
    if (sizeSelect) {
      sizeSelect.addEventListener('change', (e) => {
        this.size = e.target.value;
        renderProducts();
      });
    }

    // Color filter
    const colorSelect = document.querySelector('#color-filter');
    if (colorSelect) {
      colorSelect.addEventListener('change', (e) => {
        this.color = e.target.value;
        renderProducts();
      });
    }

    // Sort
    const sortSelect = document.querySelector('#sort-select');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        this.sortBy = e.target.value;
        renderProducts();
      });
    }

    // Reset button
    const resetBtn = document.querySelector('#reset-filters');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        this.reset();
        renderProducts();
      });
    }
  }
};
