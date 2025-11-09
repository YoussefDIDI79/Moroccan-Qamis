// Form validation utilities
const formValidation = {
  validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  },

  validatePhone(phone) {
    const re = /^[\d\s\-\+\(\)]+$/;
    return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
  },

  validateRequired(value) {
    return value.trim() !== '';
  },

  showError(input, message) {
    const formGroup = input.closest('.form-group');
    if (!formGroup) return;

    formGroup.classList.add('error');
    
    let errorEl = formGroup.querySelector('.error-message');
    if (!errorEl) {
      errorEl = document.createElement('span');
      errorEl.className = 'error-message';
      formGroup.appendChild(errorEl);
    }
    errorEl.textContent = message;
  },

  clearError(input) {
    const formGroup = input.closest('.form-group');
    if (!formGroup) return;

    formGroup.classList.remove('error');
    const errorEl = formGroup.querySelector('.error-message');
    if (errorEl) errorEl.remove();
  },

  validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');

    inputs.forEach(input => {
      this.clearError(input);

      if (!this.validateRequired(input.value)) {
        this.showError(input, 'This field is required');
        isValid = false;
        return;
      }

      if (input.type === 'email' && !this.validateEmail(input.value)) {
        this.showError(input, 'Please enter a valid email address');
        isValid = false;
        return;
      }

      if (input.type === 'tel' && !this.validatePhone(input.value)) {
        this.showError(input, 'Please enter a valid phone number');
        isValid = false;
        return;
      }
    });

    return isValid;
  }
};

// Contact form handler
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      if (!formValidation.validateForm(contactForm)) {
        return;
      }

      // Simulate form submission
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      setTimeout(() => {
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }, 1500);
    });
  }

  // Newsletter form handler
  const newsletterForms = document.querySelectorAll('.newsletter-form');
  newsletterForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const emailInput = form.querySelector('input[type="email"]');
      formValidation.clearError(emailInput);

      if (!formValidation.validateEmail(emailInput.value)) {
        formValidation.showError(emailInput, 'Please enter a valid email');
        return;
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = '...';

      setTimeout(() => {
        alert('Thank you for subscribing!');
        form.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }, 1000);
    });
  });

  // Checkout form handler
  const checkoutForm = document.getElementById('checkout-form');
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      if (!formValidation.validateForm(checkoutForm)) {
        return;
      }

      const submitBtn = checkoutForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Processing...';

      setTimeout(() => {
        alert('Order placed successfully! Order ID: #' + Math.floor(Math.random() * 100000));
        cart.clear();
        window.location.href = 'index.html';
      }, 2000);
    });
  }

  // Real-time validation
  document.querySelectorAll('input, textarea, select').forEach(input => {
    input.addEventListener('blur', () => {
      if (input.hasAttribute('required')) {
        formValidation.clearError(input);
        
        if (!formValidation.validateRequired(input.value)) {
          formValidation.showError(input, 'This field is required');
        } else if (input.type === 'email' && !formValidation.validateEmail(input.value)) {
          formValidation.showError(input, 'Please enter a valid email');
        } else if (input.type === 'tel' && !formValidation.validatePhone(input.value)) {
          formValidation.showError(input, 'Please enter a valid phone number');
        }
      }
    });
  });
});
