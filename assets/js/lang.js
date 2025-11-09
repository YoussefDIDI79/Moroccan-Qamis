let translations = {};

const lang = {
  current: localStorage.getItem('lang') || 'en',

  async init() {
    try {
      const response = await fetch('data/translations.json');
      translations = await response.json();
      this.switch(this.current);
    } catch (error) {
      console.error('Failed to load translations:', error);
    }
  },

  switch(newLang) {
    this.current = newLang;
    document.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
    localStorage.setItem('lang', newLang);
    
    // Update active language button
    document.querySelectorAll('.lang-switch').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === newLang);
    });
    
    this.update();
  },

  update() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const keys = el.dataset.i18n.split('.');
      let text = translations[this.current];
      
      keys.forEach(k => {
        if (text) text = text[k];
      });
      
      if (text) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = text;
        } else {
          el.textContent = text;
        }
      }
    });
  },

  get(key) {
    const keys = key.split('.');
    let text = translations[this.current];
    
    keys.forEach(k => {
      if (text) text = text[k];
    });
    
    return text || key;
  }
};

// Initialize language switcher
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.lang-switch').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      lang.switch(e.currentTarget.dataset.lang);
    });
  });
  
  lang.init();
});
