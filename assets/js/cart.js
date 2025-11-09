const cart = {
  items: JSON.parse(localStorage.getItem('cart')) || [],

  save() {
    localStorage.setItem('cart', JSON.stringify(this.items));
    this.updateBadge();
  },

  add(productId, size = 'M', color = 'default', quantity = 1) {
    const item = this.items.find(i => 
      i.id === productId && i.size === size && i.color === color
    );
    
    if (item) {
      item.qty += quantity;
    } else {
      this.items.push({ 
        id: productId, 
        size, 
        color, 
        qty: quantity 
      });
    }
    
    this.save();
    this.showNotification('Product added to cart!');
  },

  remove(index) {
    this.items.splice(index, 1);
    this.save();
    this.renderCart();
  },

  updateQuantity(index, newQty) {
    if (newQty <= 0) {
      this.remove(index);
    } else {
      this.items[index].qty = newQty;
      this.save();
      this.renderCart();
    }
  },

  clear() {
    this.items = [];
    this.save();
  },

  getTotal() {
    return this.items.reduce((total, item) => {
      const product = products.find(p => p.id === item.id);
      return total + (product ? product.price * item.qty : 0);
    }, 0);
  },

  getCount() {
    return this.items.reduce((count, item) => count + item.qty, 0);
  },

  updateBadge() {
    const badge = document.querySelector('.cart-count');
    if (badge) {
      const count = this.getCount();
      badge.textContent = count;
      badge.style.display = count > 0 ? 'flex' : 'none';
    }
  },

  showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => notification.classList.add('show'), 10);
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    }, 2000);
  },

  async renderCart() {
    const cartContainer = document.querySelector('.cart-items');
    const cartEmpty = document.querySelector('.cart-empty');
    const cartSummary = document.querySelector('.cart-summary');
    
    if (!cartContainer) return;
    
    if (this.items.length === 0) {
      if (cartEmpty) cartEmpty.style.display = 'block';
      if (cartSummary) cartSummary.style.display = 'none';
      cartContainer.innerHTML = '';
      return;
    }
    
    if (cartEmpty) cartEmpty.style.display = 'none';
    if (cartSummary) cartSummary.style.display = 'block';
    
    // Load products if not already loaded
    if (typeof products === 'undefined' || products.length === 0) {
      await loadProducts();
    }
    
    cartContainer.innerHTML = this.items.map((item, index) => {
      const product = products.find(p => p.id === item.id);
      if (!product) return '';
      
      const productName = typeof product.name === 'object' 
        ? product.name[lang.current] 
        : product.name;
      
      return `
        <div class="cart-item">
          <img src="${product.image}" alt="${productName}">
          <div class="cart-item-details">
            <h3>${productName}</h3>
            <p class="cart-item-meta">
              ${lang.get('product.size')}: ${item.size} | 
              ${lang.get('product.color')}: ${item.color}
            </p>
            <p class="cart-item-price">$${product.price.toFixed(2)}</p>
          </div>
          <div class="cart-item-quantity">
            <button onclick="cart.updateQuantity(${index}, ${item.qty - 1})">-</button>
            <input type="number" value="${item.qty}" min="1" 
              onchange="cart.updateQuantity(${index}, parseInt(this.value))">
            <button onclick="cart.updateQuantity(${index}, ${item.qty + 1})">+</button>
          </div>
          <div class="cart-item-total">
            <p>$${(product.price * item.qty).toFixed(2)}</p>
            <button class="remove-btn" onclick="cart.remove(${index})">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
      `;
    }).join('');
    
    // Update summary
    const subtotal = this.getTotal();
    const shipping = subtotal > 100 ? 0 : 10;
    const total = subtotal + shipping;
    
    const subtotalEl = document.querySelector('.cart-subtotal');
    const shippingEl = document.querySelector('.cart-shipping');
    const totalEl = document.querySelector('.cart-total');
    
    if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    if (shippingEl) shippingEl.textContent = shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;
  }
};

// Initialize cart on page load
document.addEventListener('DOMContentLoaded', () => {
  cart.updateBadge();
  
  // Render cart if on cart page
  if (document.querySelector('.cart-items')) {
    cart.renderCart();
  }
});
