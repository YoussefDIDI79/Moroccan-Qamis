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
  const productName = typeof product.name === 'object' 
    ? product.name[lang.current] 
    : product.name;
  
  const productDesc = typeof product.description === 'object'
    ? product.description[lang.current]
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

  const productName = typeof product.name === 'object' 
    ? product.name[lang.current] 
    : product.name;
  
  const productDesc = typeof product.description === 'object'
    ? product.description[lang.current]
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
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
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

// Smooth scroll for anchor links
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
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
    AOS.init({
      duration: 800,
      once: true,
      offset: 100
    });
  }

  // Initialize Swiper
  if (typeof Swiper !== 'undefined') {
    initSwipers();
  }
});
