let products = [];

// Load products from JSON
async function loadProducts() {
  try {
    const response = await fetch('data/products.json');
    products = await response.json();
    return products;
  } catch (error) {
    console.error('Failed to load products:', error);
    return [];
  }
}

// Render product card
function renderProductCard(product) {
  const currentLang = (typeof lang !== 'undefined' && lang.current) || localStorage.getItem('lang') || 'en';
  
  const productName = typeof product.name === 'object' 
    ? product.name[currentLang] 
    : product.name;
  
  const productDesc = typeof product.description === 'object'
    ? product.description[currentLang]
    : product.description;

  return `
    <div class="product-card" data-aos="fade-up">
      <div class="product-image">
        <img src="${product.image}" alt="${productName}" loading="lazy">
        <div class="product-overlay">
          <button class="btn-icon" onclick="quickView(${product.id})" title="Quick View">
            <i class="fas fa-eye"></i>
          </button>
          <button class="btn-icon" onclick="addToCartQuick(${product.id})" title="Add to Cart">
            <i class="fas fa-shopping-cart"></i>
          </button>
        </div>
        ${product.featured ? '<span class="badge badge-featured">Featured</span>' : ''}
        ${product.bestseller ? '<span class="badge badge-bestseller">Bestseller</span>' : ''}
      </div>
      <div class="product-info">
        <h3 class="product-name">${productName}</h3>
        <p class="product-price">$${product.price.toFixed(2)}</p>
        <a href="product.html?id=${product.id}" class="btn btn-secondary btn-sm">View Details</a>
      </div>
    </div>
  `;
}

// Render products grid
function renderProducts(productsList = products, containerId = 'products-grid') {
  const container = document.getElementById(containerId);
  if (!container) return;

  let filtered = productsList;
  
  // Apply filters if on shop page
  if (typeof filters !== 'undefined') {
    filtered = filters.apply(productsList);
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="no-products">
        <i class="fas fa-search"></i>
        <p data-i18n="shop.noProducts"></p>
      </div>
    `;
    lang.update();
    return;
  }

  container.innerHTML = filtered.map(product => renderProductCard(product)).join('');
}

// Quick add to cart
function addToCartQuick(productId) {
  cart.add(productId);
}

// Quick view modal
function quickView(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const currentLang = (typeof lang !== 'undefined' && lang.current) || localStorage.getItem('lang') || 'en';
  
  const productName = typeof product.name === 'object' 
    ? product.name[currentLang] 
    : product.name;
  
  const productDesc = typeof product.description === 'object'
    ? product.description[currentLang]
    : product.description;

  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal-content">
      <button class="modal-close" onclick="this.closest('.modal').remove()">
        <i class="fas fa-times"></i>
      </button>
      <div class="modal-body">
        <div class="modal-image">
          <img src="${product.image}" alt="${productName}">
        </div>
        <div class="modal-info">
          <h2>${productName}</h2>
          <p class="price">$${product.price.toFixed(2)}</p>
          <p class="description">${productDesc}</p>
          <div class="product-options">
            <div class="option-group">
              <label data-i18n="product.size"></label>
              <select id="quick-size">
                ${product.sizes.map(size => `<option value="${size}">${size}</option>`).join('')}
              </select>
            </div>
            <div class="option-group">
              <label data-i18n="product.color"></label>
              <select id="quick-color">
                ${product.colors.map(color => `<option value="${color}">${color}</option>`).join('')}
              </select>
            </div>
          </div>
          <button class="btn btn-primary" onclick="addToCartFromModal(${product.id})">
            <i class="fas fa-shopping-cart"></i>
            <span data-i18n="product.addToCart"></span>
          </button>
        </div>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  lang.update();
  setTimeout(() => modal.classList.add('show'), 10);
  
  // Close on background click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.remove();
  });
}

function addToCartFromModal(productId) {
  const size = document.getElementById('quick-size')?.value || 'M';
  const color = document.getElementById('quick-color')?.value || 'default';
  cart.add(productId, size, color);
  document.querySelector('.modal')?.remove();
}

// Initialize Swiper sliders
function initSwipers() {
  // Bestsellers slider
  if (document.querySelector('.bestsellers-slider')) {
    new Swiper('.bestsellers-slider', {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        640: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 4,
        },
      },
    });
  }

  // Testimonials slider
  if (document.querySelector('.testimonials-slider')) {
    new Swiper('.testimonials-slider', {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      autoplay: {
        delay: 5000,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      },
    });
  }

  // Product images slider (product page)
  if (document.querySelector('.product-images-slider')) {
    new Swiper('.product-images-slider', {
      slidesPerView: 1,
      spaceBetween: 10,
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }
}

// Create Stats Section dynamically
function createStatsSection() {
  const section = document.createElement('section');
  section.className = 'section stats';
  section.innerHTML = `
    <div class="container">
      <div class="stats-grid">
        <div class="stat-card" data-aos="fade-up">
          <div class="stat-value"><span class="counter" data-target="5000">0</span>+</div>
          <div class="stat-label">Happy Customers</div>
        </div>
        <div class="stat-card" data-aos="fade-up" data-aos-delay="100">
          <div class="stat-value"><span class="counter" data-target="12">0</span>+</div>
          <div class="stat-label">Years of Craft</div>
        </div>
        <div class="stat-card" data-aos="fade-up" data-aos-delay="200">
          <div class="stat-value"><span class="counter" data-target="30">0</span>+</div>
          <div class="stat-label">Unique Designs</div>
        </div>
        <div class="stat-card" data-aos="fade-up" data-aos-delay="300">
          <div class="stat-value"><span class="counter" data-target="50">0</span>+</div>
          <div class="stat-label">Countries Shipped</div>
        </div>
      </div>
    </div>
  `;
  return section;
}

// Create Gallery Section dynamically
function createGallerySection() {
  const section = document.createElement('section');
  section.className = 'section gallery';
  section.innerHTML = `
    <div class="container">
      <h2 class="section-title">Inspired Gallery</h2>
      <div class="gallery-grid">
        <div class="gallery-item" data-aos="zoom-in"><img src="https://images.unsplash.com/photo-1622519407650-3df9883f76e6?w=600&h=800&fit=crop&auto=format" alt="Gallery 1" loading="lazy"></div>
        <div class="gallery-item" data-aos="zoom-in" data-aos-delay="50"><img src="https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&h=800&fit=crop&auto=format" alt="Gallery 2" loading="lazy"></div>
        <div class="gallery-item" data-aos="zoom-in" data-aos-delay="100"><img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&h=800&fit=crop&auto=format" alt="Gallery 3" loading="lazy"></div>
        <div class="gallery-item" data-aos="zoom-in" data-aos-delay="150"><img src="https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=600&h=800&fit=crop&auto=format" alt="Gallery 4" loading="lazy"></div>
        <div class="gallery-item" data-aos="zoom-in" data-aos-delay="200"><img src="https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?w=600&h=800&fit=crop&auto=format" alt="Gallery 5" loading="lazy"></div>
        <div class="gallery-item" data-aos="zoom-in" data-aos-delay="250"><img src="https://images.unsplash.com/photo-1603252109303-2751441dd157?w=600&h=800&fit=crop&auto=format" alt="Gallery 6" loading="lazy"></div>
      </div>
    </div>
  `;
  return section;
}

// Floating buttons (WhatsApp and Back-to-top)
function injectFloatingButtons() {
  // WhatsApp
  if (!document.querySelector('.float-whatsapp')) {
    const wa = document.createElement('a');
    wa.href = 'https://wa.me/212600123456?text=Hello!%20I%27m%20interested%20in%20your%20Moroccan%20Qamis%20collection';
    wa.className = 'float-whatsapp';
    wa.target = '_blank';
    wa.rel = 'noopener noreferrer';
    wa.setAttribute('aria-label', 'Contact us on WhatsApp');
    wa.innerHTML = '<i class="fab fa-whatsapp"></i>';
    document.body.appendChild(wa);
    console.log('WhatsApp button added successfully');
  }

  // Back to top
  if (!document.getElementById('back-to-top')) {
    const btn = document.createElement('button');
    btn.id = 'back-to-top';
    btn.className = 'back-to-top';
    btn.setAttribute('aria-label', 'Back to top');
    btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    document.body.appendChild(btn);

    const toggle = () => {
      if (window.scrollY > 400) btn.classList.add('show');
      else btn.classList.remove('show');
    };
    window.addEventListener('scroll', toggle, { passive: true });
    toggle();
  }
}

// Counter animation
function initCounters() {
  const counters = document.querySelectorAll('.counter');
  if (counters.length === 0) return;
  const speed = 800; // ms
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target') || '0', 10);
        const start = performance.now();
        function update(now) {
          const progress = Math.min((now - start) / speed, 1);
          el.textContent = Math.floor(progress * target).toLocaleString();
          if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.3 });
  counters.forEach(c => obs.observe(c));
}

// Smooth scroll for anchor links and page init
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });
  }

  // Initialize AOS
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 800, once: true, offset: 100 });
  }

  // Initialize Swiper
  if (typeof Swiper !== 'undefined') {
    initSwipers();
  }

  // Inject new sections into homepage (before Bestsellers if present)
  try {
    const bestsellersSection = document.querySelector('[data-i18n="bestsellers.title"]')?.closest('section');
    if (bestsellersSection) {
      const stats = createStatsSection();
      const gallery = createGallerySection();
      bestsellersSection.parentNode.insertBefore(stats, bestsellersSection);
      bestsellersSection.parentNode.insertBefore(gallery, bestsellersSection);
    }
  } catch (e) { /* no-op */ }

  // Floating actions and counters
  injectFloatingButtons();
  initCounters();

  // Refresh AOS after dynamic content
  if (typeof AOS !== 'undefined' && AOS.refreshHard) {
    AOS.refreshHard();
  }
});
