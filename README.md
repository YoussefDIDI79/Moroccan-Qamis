# Moroccan Qamis E-Commerce Website

A fully responsive, bilingual (English/Arabic) e-commerce website for authentic Moroccan Qamis. Built with vanilla HTML, CSS, and JavaScript - no backend required.

## Features

### 🌐 Bilingual Support
- Complete English and Arabic translations
- RTL (Right-to-Left) layout for Arabic
- Language switcher with localStorage persistence
- Dynamic content translation using `data-i18n` attributes

### 🛒 E-Commerce Functionality
- Product catalog with filtering and sorting
- Shopping cart with localStorage persistence
- Product detail pages with size/color selection
- Checkout process with form validation
- Quick view modal for products

### 🎨 Modern Design
- Responsive design (mobile-first approach)
- AOS (Animate On Scroll) animations
- Swiper.js sliders for products and testimonials
- Clean, modern UI with Moroccan color palette
- Custom CSS variables for easy theming

### 📱 Pages Included
- **index.html** - Homepage with hero, features, categories, bestsellers
- **shop.html** - Product catalog with filters and sorting
- **product.html** - Individual product details
- **cart.html** - Shopping cart
- **checkout.html** - Checkout form
- **about.html** - About us page
- **contact.html** - Contact form
- **faq.html** - Frequently asked questions

## Project Structure

```
/moroccan-qamis/
│
├── index.html
├── shop.html
├── product.html
├── cart.html
├── checkout.html
├── about.html
├── contact.html
├── faq.html
│
├── /assets/
│   ├── /css/
│   │   ├── style.css          # Main styles
│   │   └── responsive.css     # Responsive breakpoints
│   ├── /js/
│   │   ├── main.js            # Core functionality
│   │   ├── lang.js            # Language system
│   │   ├── cart.js            # Shopping cart
│   │   ├── filters.js         # Product filtering
│   │   └── form-validation.js # Form validation
│   └── /img/
│       ├── hero/              # Hero images
│       ├── products/          # Product images
│       ├── patterns/          # Category images
│       └── icons/             # Icons and logos
│
└── /data/
    ├── translations.json      # All translations
    └── products.json          # Product database
```

## Installation & Setup

### 1. Clone or Download
```bash
git clone <repository-url>
cd moroccan-qamis
```

### 2. Add Images
Place your images in the following directories:
- `assets/img/hero/qamis.jpg` - Hero background image
- `assets/img/products/qamis-1.jpg` through `qamis-8.jpg` - Product images
- `assets/img/patterns/classic.jpg`, `embroidered.jpg`, `modern.jpg`, `luxury.jpg` - Category images

**Image Recommendations:**
- Hero: 1920x1080px (landscape)
- Products: 800x1200px (portrait, 3:4 ratio)
- Categories: 600x600px (square)

### 3. Local Development
Simply open `index.html` in a web browser. For best results, use a local server:

**Using Python:**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

**Using Node.js:**
```bash
npx http-server
```

**Using VS Code:**
Install the "Live Server" extension and click "Go Live"

## Deployment

### Option 1: Vercel (Recommended)
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

Or use the Vercel website:
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Deploy automatically

### Option 2: Netlify
1. Drag and drop the project folder to [netlify.com/drop](https://app.netlify.com/drop)
2. Or connect your GitHub repository for automatic deployments

### Option 3: GitHub Pages
1. Push code to GitHub
2. Go to Settings > Pages
3. Select branch and root folder
4. Save and wait for deployment

### Option 4: Any Static Host
Upload all files to any static hosting service (AWS S3, Firebase Hosting, etc.)

## Customization

### Colors
Edit CSS variables in `assets/css/style.css`:
```css
:root {
  --primary: #2A7C5B;      /* Main green */
  --secondary: #D4AF37;    /* Gold */
  --accent: #C41E3A;       /* Red */
  --background: #F5F5DC;   /* Beige */
  --text-dark: #2C3E50;    /* Dark text */
  --text-light: #7F8C8D;   /* Light text */
}
```

### Products
Edit `data/products.json` to add/modify products:
```json
{
  "id": 1,
  "name": { "en": "Product Name", "ar": "اسم المنتج" },
  "price": 89.99,
  "image": "assets/img/products/product.jpg",
  "category": "classic",
  "sizes": ["S", "M", "L", "XL"],
  "colors": ["white", "black"],
  "description": { "en": "Description", "ar": "الوصف" },
  "featured": true,
  "bestseller": true
}
```

### Translations
Edit `data/translations.json` to modify or add translations.

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Dependencies (CDN)
- Font Awesome 6.5.0
- Swiper.js (latest)
- AOS (Animate On Scroll) 2.3.1
- Google Fonts (Playfair Display, Lato, Cairo)

## Performance Tips
1. Optimize images (use WebP format, compress)
2. Enable CDN caching
3. Minify CSS/JS for production
4. Use lazy loading for images
5. Enable gzip compression on server

## Features to Add (Future)
- [ ] Backend integration (Node.js/PHP)
- [ ] Payment gateway (Stripe/PayPal)
- [ ] User authentication
- [ ] Order tracking
- [ ] Product reviews
- [ ] Wishlist functionality
- [ ] Search functionality
- [ ] Newsletter integration

## License
This project is open source and available under the MIT License.

## Support
For questions or issues, please contact: info@moroccanqamis.com

---

**Built with ❤️ for preserving Moroccan heritage**
